import { useUser } from "@clerk/clerk-react"
import { Outlet, Navigate } from "react-router-dom"
import Header from "./components/custom/Header.jsx"

function App() {
  const {user, isLoaded, isSignedIn} = useUser()
  
  if (!isLoaded) {
    return null; 
  }
  
  if (!isSignedIn) {
    return <Navigate to="/auth/sign-in" />;
  }
  
  return (
    <>
      <Header/>
      <Outlet />
    </>
  )
}

export default App
