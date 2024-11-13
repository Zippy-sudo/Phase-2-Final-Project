import React, { useState } from 'react'

function Search({ inputType, searchInput, searchSelect, HandleNameFormSubmit, HandleSearchInputFormSubmit, HandleSearchSelectChange, HandleSearchInputChange, HandleInputChange, searchValue }) {

    const [buttonState, setButtonState] = useState(false);

    function HandleSearchClick() {
        setButtonState(!buttonState);
    }

    return (
        <div className='searchDiv'>
            {buttonState ? <>
                <div className='formDiv'>
                    <select required className="filter" value={searchSelect} onChange={(event) => HandleSearchSelectChange(event)}>
                        <option value="all">All</option>
                        <option value="genre">Genre</option>
                        <option value="developer">Developer</option>
                        <option value="release-date" >Release Year</option>
                    </select>
                    <form onSubmit={(event) => HandleSearchInputFormSubmit(event)}>
                        {inputType ?  <input type='number' minLength="4" maxLength="4" value={searchInput} onChange={(event) => HandleSearchInputChange(event)} />:  <input type='text' value={searchInput} onChange={(event) => HandleSearchInputChange(event)} />}
                        <button type='submit' >SEARCH</button>
                    </form>
                </div>
                <button className='otherSearch' onClick={HandleSearchClick}>Back</button>
            </>
                : <>
                    <div>
                        <form onSubmit={(event) => HandleNameFormSubmit(event)}>
                            <input type='text' placeholder='Name of Game' value={searchValue} onChange={HandleInputChange} />
                        </form>
                    </div>
                    <button className='otherSearch' onClick={HandleSearchClick}>Search by Other Information</button>
                </>
            }
        </div>
    )
}

export default Search