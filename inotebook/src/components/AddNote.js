import React, { useContext, useState } from "react";
import NoteContext from "../context/notes/NoteContext";

const AddNote = (props) => {
  const context = useContext(NoteContext);
  const { addNote } = context;
  const [note, setNote] = useState({ title: "", description: "", tag: "default" });

  const onchange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };

  const SubmitNote = (e) => {
    e.preventDefault();
    addNote(note.title, note.description, note.tag);
    setNote({
      id: "",
      title: "",
      description: "",
      tag: "",
    });
    props.showAlert("Note added successfully", 'success')
  };
  return (
    <div
      className="rounded-3 px-3 py-1 bg-gradient mt-5"
      style={{ background: "rgb(148 239 255)" }}
    >
      <div className="container my-3">
        <h1>iNotebook</h1>
        <h2>Add a Note</h2>
        <form className="my-3">
          <div className="mb-3">
            <label htmlFor="title" className="form-label">
              Title
            </label>
            <input
              type="text"
              className="form-control"
              id="title"
              name="title"
              aria-describedby="title"
              onChange={onchange}
              value={note.title}
            />
            <div id="title" className="form-text">
              Enter note title to identify it quickly.
            </div>
          </div>
          <div className="mb-3">
            <label htmlFor="description" className="form-label">
              Description
            </label>
            <input
              type="text"
              className="form-control"
              id="description"
              name="description"
              onChange={onchange}
              value={note.description}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="tag" className="form-label">
              Tag
            </label>
            <input
              type="text"
              className="form-control"
              id="tag"
              name="tag"
              onChange={onchange}
              value={note.tag}
            />
          </div>
          <div className="text-center">
            <button
              type="submit"
              className="btn btn-warning px-3"
              onClick={SubmitNote}
            >
              Add Note
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddNote;
