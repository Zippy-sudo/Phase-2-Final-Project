import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import SavedGameCard from './SavedGameCard';

function GameCard({ id, title, thumbnail, platform, game_url, developer, release_date, freetogame_profile_url, publisher, genre, short_description, HandleSaveCLick, HandleDeleteClick}) {

    let currentObj = { id, title, thumbnail, platform, game_url, developer, release_date, freetogame_profile_url, publisher, genre, short_description}

    let currentLocation = useLocation();

    const [showMoreInfo, setShowMoreInfo] = useState(false);
    const [isSavedGames, setIsSavedGames] = useState(false);

    useEffect(() => {
        if (currentLocation.pathname === "/savedGames") {
            setIsSavedGames(true);
        } else setIsSavedGames(false);
    }, [currentLocation.pathname])

    function HandleMoreInfoClick() {
        setShowMoreInfo(!showMoreInfo);
    }

    return (
        <div className='gamecard'>
            <h1 className='gamecardtitle'>{title}</h1>
            <img className='gamecardimg' src={thumbnail} title={title} alt={title} />
            <div className='infodiv'>
                <p className='gamecardgenre'>{genre}</p>
                <p className='gamecarddescription'>{short_description}</p>
                {isSavedGames ? <SavedGameCard id={id} platform={platform} publisher={publisher} showMoreInfo={showMoreInfo} HandleMoreInfoClick={HandleMoreInfoClick} HandleDeleteClick={HandleDeleteClick} />
                    :
                    <>
                        {showMoreInfo ?
                            <>
                                <p> Publisher :</p>
                                <p className='gamecardgenre'>{publisher}</p>
                                <p>Platform:</p>
                                <p className='gamecardgenre'>{platform}</p>
                                <div className='buttonDiv'>
                                <button id={id} onClick={(event) => HandleSaveCLick(currentObj)}>Save</button>
                                <button onClick={HandleMoreInfoClick}>Back</button>
                                </div>
                            </> :
                            <button onClick={HandleMoreInfoClick}>More Info</button>
                        }
                    </>
                }
            </div >

        </div >
    )
}

export default GameCard