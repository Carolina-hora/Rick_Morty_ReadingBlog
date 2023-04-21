const getState = ({ getStore, getActions, setStore }) => {
	

	return {
		store: {
			characters: [],
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

			setFavorites: (newFav) => {
				const favorites = getStore()?.favorites || []
				if(!favorites.includes(newFav)) {
					setStore({favorites:[...getStore().favorites, newFav]})
				} else {
					setStore({favorites: favorites.filter((oldFav) => oldFav !== newFav)})
				}
				localStorage.setItem("favorites", JSON.stringify(getStore().favorites))
			},

			// removeFavorites: (removedFav) => {
			// 	const updatedFavorites = getStore().favorites.filter((oldFav) => oldFav !== removedFav)
			// 	setStore({favorites: updatedFavorites})
			// 	localStorage.setItem("favorites", JSON.stringify(updatedFavorites))
			// }
		}
	};
};

export default getState;
