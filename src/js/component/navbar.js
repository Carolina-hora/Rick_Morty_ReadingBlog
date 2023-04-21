import React, { useContext } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";

export const Navbar = () => {
	const { store, actions } = useContext(Context);
	return (
		<nav className="navbar navbar-light bg-light p-2">
			<Link to="/">
				<img src="https://upload.wikimedia.org/wikipedia/commons/b/b1/Rick_and_Morty.svg" className="ms-4 p-0 navbar-brand mb-0" style={{ width: "150px" }} />
			</Link>
			<div className="ml-auto">

				<div className="dropdown">
					<button className="btn btn-success dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
						Favorites {store.favorites.length}
					</button>
					<ul className="dropdown-menu dropdown-menu-end">
						{store.favorites.length > 0 ?
							<>{store.favorites.map((fav) => {
								return <li key={fav}><div className="d-flex align-items-center"><p className="dropdown-item">{fav}</p><button className="btn btn-white ms-auto" onClick={()=> {
									actions.setFavorites(fav)
								}}><i className="fas fa-trash-alt"></i></button></div></li>
							})}</> : <li><p className="dropdown-item">Add a favorite</p></li>}
					</ul>
				</div>

			</div>
		</nav>
	);
};
