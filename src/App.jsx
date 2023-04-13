import "./App.css";
import { BrowserRouter, Routes, Route, NavLink } from "react-router-dom";
import { HomeView } from "./views/home.view.jsx";
import { PokemonView } from "./views/pokemon.view";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomeView />} />
        <Route path="/pokemon.view/:id" element={<PokemonView />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
