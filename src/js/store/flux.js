const getState = ({ getStore, getActions, setStore }) => {
	

	return {
		store: {
			characters: [],
			type: [],
			ids: [],
			episodes: [],
			locations: [],
			nextCharacterURL: "https://rickandmortyapi.com/api/character",
			nextEpisodeURL: "https://rickandmortyapi.com/api/episode",
			nextLocationURL: "https://rickandmortyapi.com/api/location",
			favorites:  localStorage.getItem("favorites") ? JSON.parse(localStorage.getItem("favorites")) : []
			

		},
		actions: {
			
			getAllCharacters: async () => {
				const response = await fetch (getStore().nextCharacterURL);
				const data = await response.json();
				setStore({characters: [...getStore().characters,...data.results], nextCharacterURL: data.info.next})
				
			},
			
			getAllEpisodes: async () => {
				const response = await fetch (getStore().nextEpisodeURL);
				const data = await response.json();
				setStore({episodes: [...getStore().episodes,...data.results], nextEpisodeURL: data.info.next})

			},

			getAllLocations: async () => {
				const response = await fetch (getStore().nextLocationURL);
				const data = await response.json();
				setStore({locations: [...getStore().locations,...data.results], nextLocationURL: data.info.next})

			},

			setFavorites: (newFav, hearted) => {
				const favorites = getStore()?.favorites || []
				if(hearted) {
					setStore({favorites:[...getStore().favorites, newFav]})
					// console.log(newFav)
				} else {
					const updatedFavorites = favorites.filter((oldFav) => oldFav !== newFav)
					console.log(updatedFavorites)
					setStore({favorites: updatedFavorites})
					
					// console.log(getStore().favorites)
					
				}
				
				localStorage.setItem("favorites", JSON.stringify(getStore().favorites))
			},

		}
	};
};

export default getState;