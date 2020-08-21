import React, { useEffect, useState } from 'react';
import UsersApi from '../services/UsersApi';
import Pagination from "../components/Pagination";
import { Link  } from 'react-router-dom';



const StylesPage = (props) => {

  //  const [styles, setStyles] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;
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
console.log(users)
    // La pagination des données se fait grâce au composant pagination
    //Gestion du changement de page
    const handlePageChange = page => setCurrentPage(page);

    // Pagination des données.
    const paginatedFullStyles = users.length > itemsPerPage ? Pagination.getData(
        users,
        currentPage,
        itemsPerPage
    ) : users;

    return (
        <>
            {paginatedFullStyles.map(style => (

                <div className="container mt-0 bg-primary " key={style.id}>
                    <table className="table table-hover">
                  
                        <tbody>
                               
                                <tr className="table-primary">
                                <th scope="col">Style:</th>
                                    {style.style && style.style.map( item => 
                                        <td  key={item.id}>{item.name}</td>
                                        )}
                                      
                                    </tr>
                                    <tr>
                                    <th scope="col">Membre:</th>
                                    <td >{style.firstName}   {style.lastName}</td>
                                    </tr>
                                    <tr>
                                    <th scope="col">Ville:</th>
                                    <td>{style.city}</td>
                                </tr>
                         <tr>
                         <th scope="col">Instrument(s):</th>
                                    {style.instrument && style.instrument.map( item => 
                                        <td key={item.id}>{item.name}</td>
                                        )}
                                        </tr>
                                        <tr>
                                 

                                    <td>
                                        <Link to={"/users/" + style.id} onClick={() =>  window.localStorage.setItem("id", style.id)} className="btn btn-sm btn-info">
                                            Profil
                                    </Link></td>
                                </tr>
                         
                        </tbody>
                    </table>
                </div>
            ))}

            {itemsPerPage < users.length && (
                <Pagination currentPage={currentPage} itemsPerPage={itemsPerPage} length={users.length} onPageChanged={handlePageChange} />
            )}

        </>
    );
}

export default StylesPage;



