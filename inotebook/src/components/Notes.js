import React, { useContext, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import NoteContext from "../context/notes/NoteContext";
import NoteItem from "./NoteItem";

const Notes = (props) => {
  const context = useContext(NoteContext);
  const { notes, getNotes, editNote } = context;
  const [eNote, setNote] = useState({
    id: "",
    etitle: "",
    edescription: "",
    etag: "",
  });

  const onchange = (e) => {
    setNote({ ...eNote, [e.target.name]: e.target.value });
  };

  let navigate = useNavigate()

  const SubmitNote = (e) => {
    editNote(eNote.id, eNote.etitle, eNote.edescription, eNote.etag);
    props.showAlert("Notes updated successfully", "success")
    refClose.current.click();

  };
  const updateNote = (currNote) => {
    ref.current.click();
    setNote({id: currNote._id, etitle: currNote.title, edescription: currNote.description, etag: currNote.tag});
  }
  useEffect(() => {
    if (localStorage.getItem('token') !== null) {
      getNotes();
    }
    else {
      navigate('/greet');
    }
    // eslint-disable-next-line
  }, []);
  const ref = useRef(null)
  const refClose = useRef(null)
  return (
    <div>
      <button
        type="button"
        className="btn btn-primary d-none"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
        ref={ref}
      ></button>

      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div
            className="modal-content"
            style={{ background: "rgb(46 227 251)" }}
          >
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                Edit Note
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form className="my-3">
                <div className="mb-3">
                  <label htmlFor="etitle" className="form-label">
                    Title
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="etitle"
                    name="etitle"
                    aria-describedby="etitle"
                    onChange={onchange}
                    value={eNote.etitle}
                  />
                  <div id="etitle" className="form-text">
                    Enter note title to identify it quickly.
                  </div>
                </div>
                <div className="mb-3">
                  <label htmlFor="edescription" className="form-label">
                    Description
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="edescription"
                    name="edescription"
                    onChange={onchange}
                    value={eNote.edescription}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="etag" className="form-label">
                    Tag
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="etag"
                    name="etag"
                    onChange={onchange}
                    value={eNote.etag}
                  />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-danger"
                data-bs-dismiss="modal"
                ref={refClose}
              >
                Close
              </button>
              <button
                type="button"
                className="btn btn-warning"
                onClick={SubmitNote}
              >
                Update Note
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="row my-3">
        <h2>Your Notes</h2>
        <div className="container mx-2">
          {notes.length === 0 &&
            "No notes to display! " + "Start adding new notes."}
        </div>
        {notes.map((notes) => {
          return (
            <NoteItem
              key={notes._id}
              updateNote={() => {
                updateNote(notes);
              }}
              notes={notes}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Notes;
