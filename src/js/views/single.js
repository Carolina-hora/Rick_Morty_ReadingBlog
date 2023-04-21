import React, { useState, useEffect, useContext } from "react";
import { Context } from "../store/appContext";
import PropTypes from "prop-types";
import { Link, useParams } from "react-router-dom";
import { Card } from "../component/card";





export const Single = () => {
	const params = useParams();
	const { store, actions } = useContext(Context);
	const [item, setItem] = useState([])
	const [characterEpisode, setCharacterEpisode] = useState([])

	useEffect(()=>{
		getSingleCharacter()
		getEpisodeCharacter();
	}, [])

	const getSingleCharacter = async () => {
		const response = await fetch ("https://rickandmortyapi.com/api/"+ params.thetype +"/"+ params.theid);
		const data = await response.json();
		setItem(data)

	}

	const getEpisodeCharacter = async () => {
		const response = await fetch ("https://rickandmortyapi.com/api/"+ params.thetype +"/"+ params.theid);
        const data = await response.json();
        let charactersInfo = []
        for(let i = 0; i < data.characters.length; i++) {
            const responseCharacters = await fetch(data.characters[i])
            const dataCharacter = await responseCharacters.json()
            charactersInfo.push(dataCharacter)

        }
        data.characters = charactersInfo
        setCharacterEpisode(data.characters)
		console.log(data.characters)


	}
	

	return (
		<div className="container">
			<h1>Name: {item.name}</h1>
			{Object.keys(item).map((itemKey, index)=>{
                if(itemKey =="characters") {
                    return <div className="d-flex overflow-auto">
                        {characterEpisode.characters.map((character)=> <Card key={character.id} item={character} cardType="character" cardWidth="8rem"/>)}
                    </div>
                }
                else if(typeof item[itemKey] !== "object")
                return <p key={index}> {itemKey}: {item[itemKey]}</p>
            })}


			{/* <p>Origin: {item.origin}</p>
			<p>Location: {item.location}</p>
			<p>Episode: {item.episode}</p> */}
		</div>
	);
};

Single.propTypes = {
	match: PropTypes.object
};
