import React, { useEffect, useState } from 'react'
import GameCard from './GameCard'
import { v4 as uuidv4 } from "uuid"

function SavedGames() {

  const baseUrl = "http://localhost:4000"

  const [savedGames, setSavedGames] = useState([])

  useEffect(() => {
    fetch(`${baseUrl}/Saved_Games`)
      .then(resp => resp.json())
      .then(ans => setSavedGames(ans))
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
          .then(ans => setSavedGames(ans))
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
      {savedGamesList}
    </div>
  )
}

export default SavedGames