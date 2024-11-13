import React, { useState } from 'react'
import NavBar from '../components/NavBar'

function AddGamePage() {

  const baseUrl = "https://phase-2-final-project-db.onrender.com";

  const [newTitle, setNewTitle] = useState("");
  const [newThumbnail, setNewThumbnail] = useState("");
  const [newGenre, setNewGenre] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [newPublisher, setNewPublisher] = useState("");
  const [newDeveloper, setNewDeveloper] = useState("");
  const [newPlatform, setNewPlatform] = useState("");
  const [newReleaseYear, setNewReleaseYear] = useState("");

  function HandleAddTitleInput(event) {
    setNewTitle(event.target.value);
  }

  function HandleAddThumbnailInput(event) {
    setNewThumbnail(event.target.value);
  }

  function HandleAddGenreInput(event) {
    setNewGenre(event.target.value);
  }

  function HandleAddDescriptionInput(event) {
    setNewDescription(event.target.value)
  }

  function HandleAddPublisherInput(event) {
    setNewPublisher(event.target.value)
  }

  function HandleAddDeveloperInput(event) {
    setNewDeveloper(event.target.value)
  }

  function HandleAddPlatformInput(event) {
    setNewPlatform(event.target.value)
  }

  function HandleAddReleaseYearInput(event) {
    setNewReleaseYear(event.target.value)
  }

  function HandleAddGameFormSubmit(event) {
    event.preventDefault();

    const newObject = {
      title: newTitle,
      thumbnail: newThumbnail,
      short_description: newDescription,
      genre: newGenre,
      platform: newPlatform,
      publisher: newPublisher,
      developer: newDeveloper,
      release_year: newReleaseYear
    }

    fetch(`${baseUrl}/games`, {
      method: "POST",
      headers: {
        "Content-Type": "Application/JSON"
      },
      body: JSON.stringify(newObject),
    })
      .then(resp => resp.json())
      .then(ans => {
        console.log("POST success", ans)
      })
      .catch(error => {
        alert("POST failed")
        console.log(error.message)
      })

    setNewTitle("");
    setNewThumbnail("");
    setNewDescription("");
    setNewGenre("");
    setNewPlatform("");
    setNewPublisher("");
    setNewDeveloper("");
    setNewReleaseYear("");
    
  }

  return (
    <div className='addGamePage'>
      <NavBar />
      <div className='addGameForm'>
        <form onSubmit={(event) => HandleAddGameFormSubmit(event)}>
          <p>Game Title:</p>
          <input required type='text' placeholder='Game Title' value={newTitle} onChange={(event) => HandleAddTitleInput(event)}></input>
          <p>Game Thumbnail:</p>
          <input required type='text' placeholder='Game Thumbnail' value={newThumbnail} onChange={(event) => HandleAddThumbnailInput(event)}></input>
          <p>Game Genre:</p>
          <input required type='text' placeholder='Game Genre' value={newGenre} onChange={(event) => HandleAddGenreInput(event)}></input>
          <p>Short Description:</p>
          <input required type='text' placeholder='Short Description' value={newDescription} onChange={(event) => HandleAddDescriptionInput(event)}></input>
          <p>Publisher:</p>
          <input required type='text' placeholder='Publisher' value={newPublisher} onChange={(event) => HandleAddPublisherInput(event)}></input>
          <p>Developer:</p>
          <input required type='text' placeholder='Developer' value={newDeveloper} onChange={(event) => HandleAddDeveloperInput(event)}></input>
          <p>Platform:</p>
          <input required type='text' placeholder='Platform' value={newPlatform} onChange={(event) => HandleAddPlatformInput(event)}></input>
          <p>Release Year:</p>
          <input required type='number' placeholder='Release Year' value={newReleaseYear} onChange={(event) => HandleAddReleaseYearInput(event)}></input>
          <div className='submitButton'>
            <button required type='submit'>Submit</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default AddGamePage