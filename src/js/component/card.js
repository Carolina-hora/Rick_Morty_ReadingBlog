import React, { useState, useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";
import { library, config } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as regularHeart } from '@fortawesome/free-regular-svg-icons';
import { faHeart as solidHeart } from '@fortawesome/free-solid-svg-icons';

// Add the required icons to the library
library.add(regularHeart, solidHeart);

import "../../styles/home.css";

export const Card = ({item, cardType, cardWidth}) => {
    const { store, actions } = useContext(Context);
    const [hearted, setHearted] = useState(false)
    const heartIcon = hearted ? solidHeart : regularHeart;
    const toggleHeart = () => {
        setHearted(!hearted);
        if(store.favorites.includes(item.name)) {
            store.favorites.filter((oldFav) => oldFav !== item.name);
        } else {
            actions.setFavorites(item.name)
        }
    }

    useEffect (() => {
        if(store.favorites.includes(item.name)) {
            setHearted(true)
        } else {
            setHearted (false)
        }
    }, [store.favorites])
    return (
        
            <div className="card mx-2" style={{minWidth: cardWidth}}>
                {item.gender ? <img src={item.image} className="card-img-top" alt="..." /> : null}
                <div className="card-body" style={{height: "250px", position: "relative"}}>
                    <h5 className="card-title">{item.name}</h5>
                    {item.gender ? <>
                    <p className="card-text text-start">Gender: {item.gender}</p>
                    <p className="card-text text-start">Status: {item.status}</p>
                    <p className="card-text text-start">Species: {item.species}</p> 
                    </> : item.dimension ? <>
                    <p className="card-text text-start">{item.dimension =="unknown" ? `Dimension ${item.dimension}`: item.dimension}</p>
                    <p className="card-text text-start">Type: {item.type}</p> 
                    </> :  <>
                    <p className="card-text text-start">Air Date: {item.air_date}</p>
                    <p className="card-text text-start">Episode: {item.episode}</p> 
                    </>}
                    <div className="d-flex justify-content-evenly" style={{position: "absolute", bottom: "10px", right: "5px", width: "100%"}}>
                    <button href="#" className="btn btn-white" onClick={() => {
                        actions.setFavorites(item.name)
                        toggleHeart()
                    }}>
                            <FontAwesomeIcon icon={heartIcon} />
                    </button>
                    <Link to ={"/single/"+ cardType + "/" + item.id  }>
                    <button href="#" className="btn btn-primary">Read More</button>
                    </Link>
                    </div> 
                    
                </div>
            </div>
        )
        ;
}

export default Card