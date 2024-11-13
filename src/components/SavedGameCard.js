import React from 'react'

function SavedGameCard({ id, platform, publisher, showMoreInfo, HandleMoreInfoClick, HandleDeleteClick }) {

    return (
        <>
            {showMoreInfo ?
                <>
                    <p> Publisher :</p>
                    <p className='gamecardgenre'>{publisher}</p>
                    <p>Platform:</p>
                    <p className='gamecardgenre'>{platform}</p>
                    <div className='buttonDiv'>
                        <button onClick={HandleMoreInfoClick}>Back</button>
                        <button id={id} onClick={(event) => HandleDeleteClick(event)}>DELETE</button>
                    </div>
                </> :
                <button onClick={HandleMoreInfoClick}>More Info</button>
            }
        </>
    )
}

export default SavedGameCard