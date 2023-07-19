import React from 'react'
const About = () => {
  return (
    <div className="container mt-5">
      <h1>
        Here at <strong>iNoteBook</strong> we provide one stop for all your
        personal notes.
      </h1>
      <h2>Easy to use and secured so that your notes remains safe.</h2>
      <br />
      <br />
      <h3>
        <p>How To Use-:</p>
        <ul>
          <li>
            <strong>Add Note </strong>: Here you can add new notes.
            <p>Just add title, description and tag. You good to go.</p>
          </li>
          <li>
            <p>
              <strong>Update Note</strong> : Here you can update an existing
              note by clicking on the edit icon in the note
            </p>
          </li>
          <li>
            <p>
              <strong>Delete Note</strong> : Here you can delete an existing
              note by clicking on the trash icon int note.
            </p>
            <p className="text-danger">
              <strong>Warning</strong> : Once deleted note cannot be re-obtain.
            </p>
          </li>
        </ul>
      </h3>
    </div>
  );
}

export default About
