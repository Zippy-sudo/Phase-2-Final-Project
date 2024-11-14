import NavBar from "../components/NavBar";
import { useRouteError } from "react-router-dom";

function ErrorPage() {
    const error = useRouteError();
    console.error(error);

    return (
        <>
        <header>
            <NavBar />
        </header>
        <main>
            <h1>Mr. Stark I don't feel so good...</h1>
        </main>
        </>
    )
}

export default ErrorPage