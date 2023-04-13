import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import "../App.css";

export function PokemonView(props) {
  let [item, setItem] = useState([]);
  let [types, setTypes] = useState();
  let [weaknesses, setWeaknesses] = useState();
  let [nextEvolution, setNextEvolution] = useState();
  let [finalEvolution, setFinalEvolution] = useState();
  let { id } = useParams();

  function getPokemon() {
    fetch(
      "https://raw.githubusercontent.com/Biuni/PokemonGO-Pokedex/master/pokedex.json"
    )
      .then((res) => res.json())
      .then((data) => {
        setItem(data.pokemon[id - 1]);
        setTypes(data.pokemon[id-1].type.join(', '))
        setWeaknesses(data.pokemon[id-1].weaknesses.join(', '))
        setNextEvolution(data.pokemon[id-1].next_evolution[0].name)
        setFinalEvolution(data.pokemon[id-1].next_evolution[1].name)
      });
  }
  useEffect(() => {
    getPokemon();
  }, []);

  return (
    <div className="individual-pokemon-page">
      <h1>{item.name}</h1>
      <img src={item.img} />
      <p>{item.num}</p>
      <ul>
        <li>Average Spawn Rate: {item.avg_spawns}</li>
        <li>Candy: {item.candy}</li>
        <li>Candy Count: {item.candy_count}</li>
        <li>Height: {item.height}</li>
        <li>Spawn Chance: {item.spawn_chance}</li>
        <li>Spawn Time: {item.spawn_time}</li>
        <li>Type: {types}</li>
        <li>Weaknesses: {weaknesses}</li>
        <li>Evolutions: {nextEvolution} {finalEvolution}</li>
      </ul>
      <Link to="/">
      <button type="submit">Back To Main Page</button>
      </Link>
    </div>
  );
}
