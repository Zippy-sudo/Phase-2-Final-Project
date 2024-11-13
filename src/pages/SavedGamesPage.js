import React from 'react'
import SavedGames from '../components/SavedGames'; 
import NavBar from '../components/NavBar';

function SavedGamesPage() {
  return (
    <div className='savedgames'>
      <NavBar />
      <h1 className='savedGamesH1'>Your Saved Games</h1>
      <SavedGames />
    </div>
  )
}

export default SavedGamesPage;