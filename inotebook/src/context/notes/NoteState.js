import NoteContext from "./NoteContext";
import { useState } from "react";

const NoteState = (props) => {
  const host = "http://localhost:5000";
  const initialNote = [];
    
    const [notes, setNotes] = useState(initialNote);
    
    //Add getNotes
    const getNotes = async () => {
    //API Call for database
      const response = await fetch(`${host}/api/notes/fetchallnotes`, {
        method: "GET", // *GET, POST, PUT, DELETE, etc.
        headers: {
          "Content-Type": "application/json",
          // 'Content-Type': 'application/x-www-form-urlencoded',
          "auth-token":
            localStorage.getItem('token'),
        },
      });
      const json = await response.json();
      setNotes(json);


    //Logic to fetch Notes
  } 
    //Add note
    const addNote = async (title, description, tag) => {
    //API Call for database modification
      const response = await fetch(`${host}/api/notes/addnote`, {
        method: "POST", // *GET, POST, PUT, DELETE, etc.
        headers: {
          "Content-Type": "application/json",
          // 'Content-Type': 'application/x-www-form-urlencoded',
          "auth-token":
            localStorage.getItem('token'),
        },
        body: JSON.stringify({title, description, tag}), // body data type must match "Content-Type" header
      });
  const Note = await response.json();
  //Logic to add Note
  setNotes(notes.concat(Note));        
  } 
  
  //Delete note
  const deleteNote =async (id) => {
    //API Call for database modification
     const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
        method: "DELETE", // *GET, POST, PUT, DELETE, etc.
        headers: {
          "Content-Type": "application/json",
          // 'Content-Type': 'application/x-www-form-urlencoded',
          "auth-token":
            localStorage.getItem('token'),
        },
     });
    
    const json = response.json();
    console.log(json);

    //Logic to Delete Note
    const delNote = notes.filter((notes) => {
      return notes._id !== id;
    })
    setNotes(delNote);
    console.log('Note deleted with id = ' + id);
  }
  

  //Edit Note
  const editNote = async (id, title, description, tag) => {
    //API Call for database modification
     const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
        method: "PATCH", // *GET, POST, PUT, DELETE, etc.
        headers: {
          "Content-Type": "application/json",
          // 'Content-Type': 'application/x-www-form-urlencoded',
          "auth-token":
            localStorage.getItem('token'),
        },
        body: JSON.stringify({title, description, tag}), // body data type must match "Content-Type" header
      });
    const json = response.json();
    
    //Logic tot Edit Note
    let newNote = JSON.parse(JSON.stringify(notes));
      for (let index = 0; index < newNote.length; index++) {
        const element = newNote[index];
        if (element._id === id) {
          newNote[index].title = title;
          newNote[index].description = description;
          newNote[index].tag = tag
          setNotes(newNote);
          break;
        }
    }
    }
    return (
      <NoteContext.Provider value={{ notes, getNotes, addNote, deleteNote, editNote }}>
        {" "}
        {props.children}{" "}
      </NoteContext.Provider>
    );
}

export default NoteState;