import { Outlet } from "react-router-dom"

function App() {
  

  return (
    <>
    <div className="flex justify-center bg-[#9a9999] w-screen min-h-screen">
      <Outlet/>
    </div>
    </>
  )
}

export default App
