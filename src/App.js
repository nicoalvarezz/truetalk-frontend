import Login from "./pages/login/Login"
import Register from "./pages/register/Register"
import Home from "./pages/home/Home"
import Profile from "./pages/profile/Profile"
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Outlet,
  Navigate,
} from "react-router-dom"
import Navbar from "./components/navbar/Navbar"
import RightBar from "./components/rightbar/RightBar"
import LeftBar from "./components/leftbar/LeftBar"
import "./style.scss"
import { useContext } from "react"
import { DarkModeContext } from "./context/darkModeContext"

function App() {

  // Temporal logic
  const currentUser = true

  const {darkMode} = useContext(DarkModeContext)

  const Layout = () => {
    return (
        <div className={`theme-${darkMode ? "dark" : "light"}`}>
          <Navbar />
          <div style={{display: "flex"}}>
            <LeftBar />
            <div style={{flex:6}}>
              <Outlet />
            </div>
            <RightBar />
          </div>
        </div>
    )
  }

  // Temporal logic
  const ProtectedRoute = ({children}) => {
    if (!currentUser) {
      return <Navigate to="/login" />
    }

    return children;
  }

  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <ProtectedRoute>
          <Layout />
        </ProtectedRoute>
      ),
      children: [
        {
          path: "/",
          element: <Home />
        },
        {
          path: "/profile/:id",
          element: <Profile />
        }
      ]
    },
    {
      path: "/login",
      element: <Login />
    },
    {
      path: "/register",
      element: <Register />
    }
  ])
    return (
      <div>
        <RouterProvider router={router} />
      </div>
    )
  }
  
export default App;
