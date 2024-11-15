import React, { useEffect, useState } from 'react'
import GameCard from './GameCard'
import { v4 as uuidv4 } from "uuid"

function SavedGames() {

  const baseUrl = "https://phase-2-final-project-db.onrender.com"

  const [savedGames, setSavedGames] = useState([])
  const [gamesPresent, setGamesPresent] = useState(false)

  useEffect(() => {
    fetch(`${baseUrl}/Saved_Games`)
      .then(resp => resp.json())
      .then(ans => {
        if (ans.length > 0) {
          setGamesPresent(true)
        }
        setSavedGames(ans)
      })
      .catch(error => {
        alert("Get failed")
        console.log(error.message)
      })
  }, [])

  function HandleDeleteClick(event) {
    fetch(`${baseUrl}/Saved_Games/${event.target.id}`, { method: "DELETE" })
      .then(resp => resp.json())
      .then((ans) => {
        console.log("DELETE successful", ans)
        fetch(`${baseUrl}/Saved_Games`)
          .then(resp => resp.json())
          .then(ans => {
            if (ans.length === 0) {
              setGamesPresent(false)
            }
            setSavedGames(ans)
      })
          .catch(error => {
            alert("GET failed")
            console.log(error.message)
          })
      })
      .catch(error => alert("Failed to DELETE"))
  }

  const savedGamesList = savedGames.map(object => {
    return <GameCard key={uuidv4()} id={object.id} title={object.title} thumbnail={object.thumbnail} short_description={object.short_description} genre={object.genre} platform={object.platform} publisher={object.publisher} HandleDeleteClick={HandleDeleteClick} />
  })

  return (
    <div className="gameCardDiv">
      {gamesPresent ? 
      <>
      {savedGamesList}
      </>
        : 
        <div className='none'>
          <p>No Saved Games found</p>
          <p>Refresh the page or add a game</p>
        </div>
      }
    </div>
  )
}

export default SavedGames