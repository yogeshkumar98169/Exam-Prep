import { createBrowserRouter, createRoutesFromElements, Route } from "react-router-dom";
import Idioms from "../components/Idioms.jsx";
import OneWord from "../components/OneWord.jsx";
import Vocab from "../components/Vocab.jsx";
import Home from "../components/Home.jsx";
import App from "../App.jsx";
import CurrentAffair from "../components/CurrentAffair.jsx";
import DisplayAll from "../components/DisplayAll.jsx";
import OneWordAll from "../components/DisplayAll/OneWord.jsx";
import IdiomsAll from "../components/DisplayAll/Idioms.jsx"
import CurrentAffairAll from "../components/DisplayAll/CurrentAffair.jsx"
import VocabAll from "../components/DisplayAll/Vocab.jsx"
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route path="/" element={<Home />}></Route>
      <Route path="idioms" element={<Idioms />}></Route>
      <Route path="one-word" element={<OneWord />}></Route>
      <Route path="vocab" element={<Vocab />}></Route>
      <Route path="current" element={<CurrentAffair />}></Route>
      <Route path="display-all" element={<DisplayAll />}>
        <Route path="" element={<IdiomsAll/>}></Route>
        <Route path="all-one-word" element={<OneWordAll />}></Route>
        <Route path="all-idioms" element={<IdiomsAll />}></Route>
        <Route path="all-vocab" element={<VocabAll />}></Route>
        <Route path="all-current" element={<CurrentAffairAll />}></Route>
      </Route>
    </Route>
  )
);

export default router;