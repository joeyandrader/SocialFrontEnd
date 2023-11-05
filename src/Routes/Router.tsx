
import { createBrowserRouter } from "react-router-dom"
import Login from "../Pages/Login/Login";
import Register from "../Pages/Register/Register";
import App from "../App";
import Home from "../Pages/Home/Home";
import { RequireAuth } from "./RequireAuth";


const Router = createBrowserRouter([
    { path: "/login", element: <Login /> },
    { path: "/register", element: <Register /> },
    {
        element: <App />,
        children: [
            { path: "/", element: <RequireAuth><Home /></RequireAuth> }
        ]
    }
]);

export default Router