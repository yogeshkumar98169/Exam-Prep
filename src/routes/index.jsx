import { createBrowserRouter, createRoutesFromElements, Route } from "react-router-dom";
import Idioms from "../components/Idioms.jsx";
import OneWord from "../components/OneWord.jsx";
import Vocab from "../components/Vocab.jsx";
import Home from "../components/Home.jsx";
import App from "../App.jsx";
import CurrentAffair from "../components/CurrentAffair.jsx";

const router=createBrowserRouter(
    createRoutesFromElements(
        <Route path="/" element={<App/>}>
            <Route path="/" element={<Home/>}></Route>
            <Route path="idioms" element={<Idioms/>}></Route>
            <Route path="one-word" element={<OneWord/>}></Route>
            <Route path="vocab" element={<Vocab/>}></Route>
            <Route path="current" element={<CurrentAffair/>}></Route>
        </Route>
    )
)

export default router;