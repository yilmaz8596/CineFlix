import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Home } from "./pages/Home";
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";
import { EmailVerification } from "./pages/EmailVerification";
import { PrivateRoute } from "./components/PrivateRoute";

const router = createBrowserRouter([
  {
    path: "/",
    element: <PrivateRoute />,
    children: [{ index: true, element: <Home /> }],
  },
  { path: "/login", element: <Login /> },
  { path: "/register", element: <Register /> },
  { path: "/verify-email/:token", element: <EmailVerification /> },
]);

function App() {
  return (
    <>
      <RouterProvider router={router} />;
      <ToastContainer />
    </>
  );
}

export default App;
