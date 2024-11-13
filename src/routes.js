import HomePage from "./pages/HomePage"
import SavedGamesPage from "./pages/SavedGamesPage";
import AddGamePage from "./pages/AddGamePage";

const routes = [
    {
        path: "/",
        element: <HomePage />
    },
    {
        path: "/savedGames",
        element: <SavedGamesPage />
    }
];

export default routes;