import React, { useEffect, useState } from 'react';
import UsersApi from '../services/UsersApi';
import Pagination from "../components/Pagination";
import { Link  } from 'react-router-dom';



const MembersListPage = (props) => {


    
  //  const [styles, setStyles] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 4;
    const [users, setUsers] = useState([]);

    // Récuperation des données du membre pour l'affichage. 
    async function fetchUsers() {
        try {
            const users = await UsersApi.findAll();
            setUsers(users);

        } catch (error) {
            console.log(error.response);
        }

    }

    useEffect(() => {

        fetchUsers();

    }, []);

    console.log("merde");
    console.log(users);
    // La pagination des données se fait grâce au composant pagination
    //Gestion du changement de page
    const handlePageChange = page => setCurrentPage(page);

    // Pagination des données.
    const paginatedUsers = users.length > itemsPerPage ? Pagination.getData(
        users,
        currentPage,
        itemsPerPage
    ) : users;

    return (
        <>
            {paginatedUsers.map(user => (

                <div className="container mt-0 bg-primary text-center titre_background" key={user.id}>

                    <h3 className="titre_background">Style</h3>
                        {user.style && user.style.map( item => 
                        <p key={item.id}>{item.name}</p>
                        )}
          
                    <h3 className="titre_background">Membre</h3>
                        <div>
                            <p>{user.firstName}</p>
                            <p>{user.lastName}</p>
                        </div>
                            <h3 className="titre_background">Ville</h3>
                                <p>{user.city}</p>
                        
                            <h3 className="titre_background">Instrument(s)</h3>
                                {user.instrument && user.instrument.map( item => 
                                    <p key={item.id}>{item.name}</p>
                                )}
                                
                                <h3 className="titre_background">Année(s) de pratique</h3>
                                    <p>{user.experience} {user.experience < 2 ? "an" : "ans" }</p>
                                    
                                <Link to={"/users/" + user.id} onClick={() =>  window.localStorage.setItem("id", user.id)} className="btn btn-info">
                                            Profil
                                </Link>     
                    <hr/>
                </div>
            ))}
            {itemsPerPage < users.length && (
                <Pagination currentPage={currentPage} itemsPerPage={itemsPerPage} length={users.length} onPageChanged={handlePageChange} />
            )}
        </>
    );
}

export default MembersListPage;



