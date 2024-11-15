import { useState, useEffect } from 'react';
import Search from './Search';
import GamesDisplay from './GamesDisplay';

const baseUrl = "https://phase-2-final-project-db.onrender.com"

function HandleSaveClick(object) {
  fetch(`${baseUrl}/Saved_Games`, {
    method: "POST",
    headers: {
      "Content-Type": "Application/JSON",
    },
    body: JSON.stringify(object)
  })
    .then(resp => resp.json())
    .then(ans => {
      console.log("POST success", ans)
    })
    .catch(error => alert("Failed to POST"))
}

function App() {

  const [gameList, setGamesList] = useState([]);
  const [gamesToDisplay, setGamesToDisplay] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [endDisplay, setEndDisplay] = useState(10);
  const [searchSelect, setSearchSelect] = useState("all");
  const [searchInput, setSearchInput] = useState("");
  const [inputType, setInputType] = useState(false);
  const [none, setNone] = useState(true);

  useEffect(() => {
    fetch(`${baseUrl}/games`)
      .then(resp => resp.json())
      .then(ans => {
        console.log("Get success", ans)
        setGamesList(ans)
        setGamesToDisplay(ans)
      })
      .catch(error => {
        alert("Get Failed")
        console.log(error.message)
      })
  }, [])

  function HandleInputChange(event) {
    setSearchValue(event.target.value);
  }

  function HandleNameFormSubmit(event) {
    event.preventDefault();

    const toDisplay = gameList.filter(gameObj => {
      return gameObj.title.toUpperCase().includes(searchValue.toUpperCase())
    })

    setGamesToDisplay(toDisplay);
    setSearchValue("")
  }

  function HandleSearchSelectChange(event) {
    setSearchSelect(event.target.value);
    if (event.target.value === "release-date") {
      setInputType(true)
    }
  }

  function HandleSearchInputChange(event) {
    setSearchInput(event.target.value);
  }

  function HandleSearchInputFormSubmit(event) {
    event.preventDefault();

    const isGenre = () => {
      const toDisplay = gameList.filter(gameObj => {
        return gameObj.genre.toUpperCase().includes(searchInput.toUpperCase());
      })
      setGamesToDisplay(toDisplay);
      setSearchSelect("all")
      setSearchInput("")
    }

    const isDeveloper = () => {
      const toDisplay = gameList.filter(gameObj => {
        return gameObj.developer.toUpperCase().includes(searchInput.toUpperCase());
      })
      setGamesToDisplay(toDisplay);
      setSearchSelect("all")
      setSearchInput("")
    }

    const isReleaseYear = () => {
      const toDisplay = gameList.filter((gameObj) => {
        return gameObj.release_date.slice(0, 4).includes(searchInput)
      })
      setGamesToDisplay(toDisplay);
      setSearchSelect("all")
      setSearchInput("")
    }

    if (searchSelect !== "") {
      if (searchSelect === "genre") {
        isGenre();
      } else if (searchSelect === "developer") {
        isDeveloper();
      } else {
        isReleaseYear();
      }
    } else setGamesToDisplay(gameList)
  }

  function HandleShowMoreClick() {
    setEndDisplay(endDisplay + 5);
  }

  function HandleShowLessClick() {
    if (endDisplay > 2) {
      setEndDisplay(endDisplay - 2)
    }
  }

  function HandleDeleteClick(id) {
    fetch(`${baseUrl}/Saved_Games/${id}`, {
      method: "DELETE",
    })
      .then(resp => resp.json())
      .then((ans) => {
        console.log("DELETE successful", ans)
      })
      .catch(error => alert("Failed to DELETE"))
  }


  const gamesToDisplayTrunc = gamesToDisplay.slice(0, endDisplay)

  useEffect(() => {
    if (gamesToDisplay.length === 0) {
      setNone(true)
    } else {
      setNone(false)
    }
  }, [gamesToDisplay])


  return (
    <div className="App">
      <Search inputType={inputType} searchInput={searchInput} searchSelect={searchSelect} HandleInputChange={HandleInputChange} HandleNameFormSubmit={HandleNameFormSubmit} HandleSearchSelectChange={HandleSearchSelectChange} HandleSearchInputChange={HandleSearchInputChange} HandleSearchInputFormSubmit={HandleSearchInputFormSubmit} searchValue={searchValue} />
      <p>{gamesToDisplay.length} results found</p>
      {none ?
        <div className='none'>
          <p>No results found re-check parameters or add a game you would like to see</p>
        </div>
        : <div>
          <GamesDisplay gamesToDisplay={gamesToDisplayTrunc} HandleShowMoreClick={HandleShowMoreClick} HandleShowLessClick={HandleShowLessClick} HandleSaveClick={HandleSaveClick} HandleDeleteCLick={HandleDeleteClick} />
        </div>}
    </div>
  );
}

export default App;
export { HandleSaveClick }