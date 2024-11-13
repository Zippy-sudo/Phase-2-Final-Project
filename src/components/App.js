import { useState, useEffect } from 'react';
import Search from './Search';
import GamesDisplay from './GamesDisplay';

function App() {

  const baseUrl = "http://localhost:4000"

  const [gameList, setGamesList] = useState([]);
  const [gamesToDisplay, setGamesToDisplay] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [endDisplay, setEndDisplay] = useState(10);
  const [searchSelect, setSearchSelect] = useState("all");
  const [searchInput, setSearchInput] = useState("");
  const [inputType, setInputType] = useState(false);

  useEffect(() => {
    fetch(`${baseUrl}/games`)
      .then(resp => resp.json())
      .then(ans => {
        setGamesList(ans)
        setGamesToDisplay(ans)
      })
      .catch(error => {
        alert("Get failed")
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
    if(event.target.value === "release-date"){
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
        return gameObj.genre === searchInput
      })
      setGamesToDisplay(toDisplay);
      setSearchSelect("all")
      setSearchInput("")
    }

    const isDeveloper = () => {
      const toDisplay = gameList.filter(gameObj => {
        return gameObj.developer === searchInput
      })
      setGamesToDisplay(toDisplay);
      setSearchSelect("all")
      setSearchInput("")
    }

    const isReleaseYear = () => {
      const toDisplay = gameList.filter((gameObj) => {
        return gameObj.release_date.slice(0, 4) === searchInput
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

  console.log(gamesToDisplay, searchInput, searchSelect)
  const gamesToDisplayTrunc = gamesToDisplay.slice(0, endDisplay)

  return (
    <div className="App">
      <Search inputType={inputType} searchInput={searchInput} searchSelect={searchSelect} HandleInputChange={HandleInputChange} HandleNameFormSubmit={HandleNameFormSubmit} HandleSearchSelectChange={HandleSearchSelectChange} HandleSearchInputChange={HandleSearchInputChange} HandleSearchInputFormSubmit={HandleSearchInputFormSubmit} searchValue={searchValue} />
      <div>
        <GamesDisplay gamesToDisplay={gamesToDisplayTrunc} HandleShowMoreClick={HandleShowMoreClick} HandleShowLessClick={HandleShowLessClick} HandleSaveCLick={HandleSaveClick} HandleDeleteCLick={HandleDeleteClick} />
      </div>
    </div>
  );
}

export default App;
