import React, { useContext } from "react";
import { Context } from "../store/appContext";
import { Card } from "../component/card";
import "../../styles/home.css";


export const Home = () => {
	const { store, actions } = useContext(Context);
	return (
		<div className="text-center mt-3 p-3 container">
		<h1 className="mb-3">Characters</h1>
		<div className="d-flex overflow-auto m-3 p-3">
		{
			store.characters.map((character) => {
				return <Card key={character.id} item={character} cardType="character" cardWidth="12rem"/>
			})
		}
		<button className="btn btn-warning text-white" onClick={()=> actions.getAllCharacters()}>Load More</button>
		</div>
		<h1 className="mt-3 mb-3 p-3">Episodes</h1>
		<div className="d-flex overflow-auto m-3 p-3">
		{
			store.episodes.map((episode) => {
				return <Card key={episode.id} item={episode} cardType="episode" cardWidth="12rem"/>
			})
		}
		<button className="btn btn-warning text-white" onClick={()=> actions.getAllEpisodes()}>Load More</button>
		</div>
		<h1 className="mt-3 mb-3 p-3">Locations</h1>
		<div className="d-flex overflow-auto m-3 p-3">
		{
			store.locations.map((location) => {
				return <Card key={location.id} item={location} cardType="location" cardWidth="12rem"/>
			})
		}
		<button className="btn btn-warning text-white" onClick={()=> actions.getAllLocations()}>Load More</button>
		</div>
		
		
	</div>)
;}
