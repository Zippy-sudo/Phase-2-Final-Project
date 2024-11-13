import NavBar from "../components/NavBar";
import App from "../components/App";

function Home() {
    return (
        <div className="home">
           <header>
            <NavBar />
           </header> 
            <h1> Welcome to Game Search </h1>
            <App />
        </div>
    )
}

export default Home;