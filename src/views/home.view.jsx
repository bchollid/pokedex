import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { PokemonView } from "./pokemon.view";
import "../App.css";

export function HomeView() {
  let [pokemon, setPokemon] = useState([]);
  let [pokemonTypes, setPokemonTypes] = useState([]);
  let [pokemonWeaknesses, setPokemonWeaknesses] = useState([]);
  let [searchPokemon, setSearchPokemon] = useState("");
  let [searchPokemonType, setSearchPokemonType] = useState("");
  let [searchPokemonWeaknesses, setSearchPokemonWeaknesses] = useState("");


  function getPokemon() {
    fetch(
      "https://raw.githubusercontent.com/Biuni/PokemonGO-Pokedex/master/pokedex.json"
    )
      .then((res) => res.json())
      .then((data) => {
        setPokemon(data.pokemon);
        let pokemonTypesArray = data.pokemon.map((item) => 
             item.type[0]
        )
        data.pokemon.forEach((item) => 
             pokemonTypesArray.push(item.type[1])
        );
        let pokemonArrayFiltered = pokemonTypesArray.filter(x => x !== undefined);
       
        pokemonArrayFiltered.slice("");
       
        setPokemonTypes([...new Set(pokemonArrayFiltered)])
        
        let pokemonWeaknessesArray = data.pokemon.map((item) => 
             item.weaknesses[0]
        )
        data.pokemon.forEach((item) => 
             pokemonWeaknessesArray.push(item.weaknesses[1])
        );
        data.pokemon.forEach((item) => 
             pokemonWeaknessesArray.push(item.weaknesses[2])
        );
        let pokemonWeaknessesArrayFiltered = pokemonWeaknessesArray.filter(x => x !== undefined);
        pokemonWeaknessesArrayFiltered.slice("");
        setPokemonWeaknesses([...new Set(pokemonWeaknessesArrayFiltered)])   
      }
    )}

  useEffect(() => {
    getPokemon();
  }, []);

  let pokemonOverview = pokemon.map((items) => (
    <li key={items.id} className="pokemon">
        
        <Link to={`/pokemon.view/${items.id}`}>{items.name}</Link>
      <br></br>
      {items.num}
      <br></br>Type: {items.type.join(", ")}
      <br></br>Weaknesses: {items.weaknesses.join(", ")}
      <img className="pokemon-image" src={items.img} />
    </li>
  ));

  let pokemonTypesFilter = pokemonTypes.map((item, idx) => (
    <option key={item + idx} value={item}>
      {item}
    </option>
  ));

  let pokemonWeaknessesFilter = pokemonWeaknesses.map((item, idx) => (
    <option key={item + idx} value={item}>
      {item}
    </option>
  ));


  function filterPokemon(e){
    e.preventDefault();
    if(searchPokemon){
        setPokemon(
            pokemon.filter((creature) => creature.name==searchPokemon)
        )
    }
    if(searchPokemonType){
        setPokemon(
            pokemon.filter((creature) => creature.type[0] == searchPokemonType || creature.type[1] == searchPokemonType)
    )
    }
    if(searchPokemonWeaknesses){
        setPokemon(
                    pokemon.filter((creature) => creature.weaknesses[0] == searchPokemonWeaknesses || creature.weaknesses[1] == searchPokemonWeaknesses || creature.weaknesses[2] == searchPokemonWeaknesses)
        )
        }
   if(searchPokemonType && searchPokemonWeaknesses){
        setPokemon(
            pokemon.filter((creature) => (creature.type[0] == searchPokemonType || creature.type[1] == searchPokemonType) && (creature.weaknesses[0] == searchPokemonWeaknesses || creature.weaknesses[1] == searchPokemonWeaknesses || creature.weaknesses[2] == searchPokemonWeaknesses))
            )
    }
   if(searchPokemon && searchPokemonType && searchPokemonWeaknesses){
        setPokemon(
            pokemon.filter((creature) => creature.name==searchPokemon)
            )
    }
  }

  return (
    <div>
      <form id="search-form" onSubmit={filterPokemon}>
        <input
          type="text"
          value={searchPokemon}
          onChange={(e) => setSearchPokemon(e.target.value)}
        />
        <select
          name="filterByType"
          id="filterByType"
          value={searchPokemonType}
          onChange={(e) => setSearchPokemonType(e.target.value)}
        >
          <option value="">Filter By Type</option>
          {pokemonTypesFilter}
        </select>
        <select
          name="filterByType"
          id="filterByType"
          value={searchPokemonWeaknesses}
          onChange={(e) => setSearchPokemonWeaknesses(e.target.value)}
        >
          <option value="">Filter By Weaknesses</option>
          {pokemonWeaknessesFilter}
        </select>
        <input type="submit" />
        <button type="submit" onClick={(getPokemon)}>Reset</button>
      </form>
      <ul id="pokemon-overview">{pokemonOverview}</ul>
    </div>
  );
}
