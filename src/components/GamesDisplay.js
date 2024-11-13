import React from 'react'
import GameCard from './GameCard'
import { v4 as uuidv4 } from "uuid"

function GamesDisplay({ gamesToDisplay, HandleShowMoreClick, HandleSaveCLick, HandleDeleteCLick, HandleShowLessClick }) {

  const gamesList = gamesToDisplay.map(game => {
    let { id, title, thumbnail, platform, game_url, developer, release_date, freetogame_profile_url, publisher, genre, short_description } = game;
    return <GameCard key={uuidv4()} id={id} game_url={game_url} developer={developer} release_date={release_date} freetogame_profile_url={freetogame_profile_url} title={title} thumbnail={thumbnail} platform={platform} publisher={publisher} genre={genre} short_description={short_description} HandleSaveCLick={HandleSaveCLick} />
  })

  return (
    <div className='gamesdisplay'>
      {gamesList}
      <div className='buttonDiv'>
        <button onClick={HandleShowMoreClick}>Show More</button>
        <button onClick={HandleShowLessClick}>Show Less</button>
      </div>
    </div>
  )
}

export default GamesDisplay