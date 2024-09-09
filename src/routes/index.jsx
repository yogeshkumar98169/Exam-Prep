import { createBrowserRouter, createRoutesFromElements, Route } from "react-router-dom";
import Home from "../components/Home.jsx";
import App from "../App.jsx";
import Test from "../components/Test.jsx"
import Add from "../components/Add.jsx"
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route path="/" element={<Home />}></Route>
      <Route path="test" element={<Test />}></Route>
      <Route path="add" element={<Add />}></Route>
    </Route>
  )
);

export default router;