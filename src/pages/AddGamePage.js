import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom';
import NavBar from '../components/NavBar'
import { HandleSaveClick } from '../components/App';
import { v4 as uuidv4} from "uuid"

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
  const [moreInfo, setMoreInfo] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [allowSave, setAllowSave] = useState(false);

  useEffect(() => {
    if(newTitle !== "" && newDescription !== "" && newDeveloper !== "" && newGenre !== "" && newPublisher !== "" && newPlatform !== "" && newReleaseYear !== "" && newThumbnail !== "") {
      setAllowSave(true)
    }
  },[newDescription,newDeveloper,newGenre,newPlatform,newPublisher,newReleaseYear,newThumbnail,newTitle])

  const currentObj = {
    title: newTitle,
    thumbnail: newThumbnail,
    short_description: newDescription,
    genre: newGenre,
    platform: newPlatform,
    publisher: newPublisher,
    developer: newDeveloper,
    release_date: newReleaseYear,
  }

  function HandleMoreInfoClick() {
    setMoreInfo(!moreInfo);
  }

  function HandleShowPreview() {
    setShowPreview(!showPreview);
  }

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
      <div className='showPreviewDiv'>
        <label>Show Preview</label>
        <input type='checkbox' className='showPreview' onChange={() => HandleShowPreview()}></input>
      </div>
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
            <button type='submit'>Submit</button>
          </div>
        </form>
      </div>
      {showPreview ?
        <div className='previewDiv'>
          <h2>Preview</h2>
          <div className='gamecard'>
            <h1 className='gamecardtitle'>{newTitle}</h1>
            <img className='gamecardimg' src={newThumbnail} title={newTitle} alt={newTitle} />
            <div className='infodiv'>
              <p className='gamecardgenre'>{newGenre}</p>
              <p className='gamecarddescription'>{newDescription}</p>
              {moreInfo ?
                <div>
                  <p> Publisher :</p>
                  <p className='gamecardgenre'>{newPublisher}</p>
                  <p>Platform:</p>
                  <p className='gamecardgenre'>{newPlatform}</p>
                  <div className='buttonDiv'>
                    {allowSave ? 
                    <NavLink className="navlinkButton" to="/savedGames"  id={uuidv4()} onClick={(event) => HandleSaveClick(currentObj)}>Save</NavLink>
                    : null}
                    <button onClick={HandleMoreInfoClick}>Back</button>
                  </div>
                </div> :
                <button onClick={HandleMoreInfoClick}>More Info</button>
              }
            </div>
          </div>
        </div>
        : null}
    </div>
  )
}

export default AddGamePage