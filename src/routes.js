import HomePage from "./pages/HomePage"
import SavedGamesPage from "./pages/SavedGamesPage";
import AddGamePage from "./pages/AddGamePage";
import ErrorPage from "./pages/ErrorPage";

const routes = [
    {
        path: "/",
        element: <HomePage />,
        errorElement: <ErrorPage />
    },
    {
        path: "/addGame",
        element: <AddGamePage />,
        errorElement: <ErrorPage />
    },
    {
        path: "/savedGames",
        element: <SavedGamesPage />,
        errorElement: <ErrorPage />
    }
];

export default routes;