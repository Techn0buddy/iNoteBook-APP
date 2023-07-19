const express = require('express');
const Notes = require("../models/Notes");
const { body, validationResult } = require("express-validator");
const router = express.Router();
const fetchUser = require("../middleware/fetchUser");

//Route1: Fetch all notes of the current user. Using GET: "/api/notes/fetchallnotes" . Require Login.
router.get('/fetchallnotes', fetchUser, async (req, res) => {

    try {
      //fetching all the notes of required user using middleware fetchuser.
      const notes = await Notes.find({ user: req.user.id });
      res.json(notes);
    } catch (err) {
      console.log(err.message);
      //status 500 internal server error.
      res.status(500).send("Internal Server Error");
    }
   
});

//Route2: Add new notes. Using POST: "/api/notes/addnote" . Require Login.
//Applying Validations using express-validator. 
router.post("/addnote", fetchUser, [
    body('title', `Please enter a title`).notEmpty(),
    body('description', `Please enter a description`).notEmpty(),
    
], async (req, res) => {
    try {
    //Storing all validation errors.
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
        }
    //Destructuring following data from request body.
      const { title, description, tag } = req.body;
      const note = new Notes({
        title,
        description,
        tag,
        user: req.user.id,
      });

    // Saving the note created and seding back to the response.
      const savedNote = await note.save();
      res.json(savedNote);
    } catch (err) {
      console.log(err.message);
      //status 500 internal server error.
      res.status(500).send("Internal Server Error");
    }
});

//Route3: Upadate notes of the current user. Using PATCH: "/api/notes/updatenote/:id" . Require Login.
router.patch('/updatenote/:id', fetchUser, async (req, res) => {

    try {
      //fetching all the notes of required user using middleware fetchuser.
        let note = await Notes.findById(req.params.id);
        if (!note) {
            return res.status(404).send("Not Found");
        }
        if (note.user.toString() !== req.user.id) {
            return res.status(401).send("Unauthorized Access");
        }

        const { title, description, tag } = req.body;
        const newNote = {};
        if (title) {
            newNote.title = title;
        }
        if (description) {
            newNote.description = description;
        }
        if (tag) {
            newNote.tag = tag;
        }

        note = await Notes.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true });
        res.json({note});
    } catch (err) {
      console.log(err.message);
      //status 500 internal server error.
      res.status(500).send("Internal Server Error");
    }
   
});
//Route4: Delete note of the current user. Using DELETE: "/api/notes/deletenote/:id" . Require Login.
router.delete('/deletenote/:id', fetchUser, async (req, res) => {

    try {
      //fetching all the notes of required user using middleware fetchuser.
      let note = await Notes.findById(req.params.id);
      if (!note) {
        return res.status(404).send("Not Found");
      }
      //Preveting unauthorised access and deletion.
      if (note.user.toString() !== req.user.id) {
          return res.status(401).send("Unauthorized Access");
      }

        note = await Notes.findByIdAndDelete(req.params.id);
        res.json({"Success" : "Note has been deleted", note:note});
    } catch (err) {
      console.log(err.message);
      //status 500 internal server error.
      res.status(500).send("Internal Server Error");
    }
   
});
module.exports = router;