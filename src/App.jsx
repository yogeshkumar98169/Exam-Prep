import { Outlet } from "react-router-dom"
import Idioms from "./components/Idioms"

function App() {
  

  return (
    <>
    <div className="flex justify-center bg-[#9a9999] w-screen h-screen">
      <Outlet/>
    </div>
    </>
  )
}

export default App
