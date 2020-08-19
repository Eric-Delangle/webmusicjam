import React, { useEffect, useState } from 'react';
import StylesApi from '../services/StylesApi';
import Pagination from "../components/Pagination";
import { Link  } from 'react-router-dom';



const StylesPage = (props) => {

    const [styles, setStyles] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 1;

    // Récuperation des styles. 
    async function fetchStyles() {
        try {
            const styles = await StylesApi.findAll();
            setStyles(styles);
            console.log(styles);

        } catch (error) {
            console.log(error.response);
        }

    };

    useEffect(() => {

        fetchStyles();

    }, []);

    // La pagination des données se fait grâce au composant pagination
    //Gestion du changement de page
    const handlePageChange = page => setCurrentPage(page);

    // Pagination des données.
    const paginatedFullStyles = styles.length > itemsPerPage ? Pagination.getData(
        styles,
        currentPage,
        itemsPerPage
    ) : styles;

// stocker l'id d'un membre pour voir son profil

//const userId =() =>  window.localStorage.setItem("id", item.id);

    return (
        <>
            {paginatedFullStyles.map(style => (

                <div className="container mt-0 bg-primary " key={style.id}>
                    <table className="table table-hover">
                        <thead>
                            <tr>
                                <th scope="col">Style</th>
                                <th scope="col">Membre</th>
                                <th scope="col">Ville</th>
                                <th scope="col">Instrument(s)</th>
                                <th scope="col"></th>
                            </tr>
                        </thead>
                        <tbody>
                            {style.user && style.user.map(item => (
                               
                                <tr className="table-primary">

                                    <th>{style.name}</th>
                                    <td >{item.firstName} {item.lastName}</td>
                                    <td>{item.city}</td>

                                    {item.instrument && item.instrument.map(instru =>
                                        <td key={style.id}>
                                            {instru.name}
                                        </td>
                                        
                                    )}

                                    <td>
                                        <Link to={"/users/" + item.id} onClick={() =>  window.localStorage.setItem("id", item.id)} className="btn btn-sm btn-info">
                                            Profil
                                    </Link></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ))}

            {itemsPerPage < styles.length && (
                <Pagination currentPage={currentPage} itemsPerPage={itemsPerPage} length={styles.length} onPageChanged={handlePageChange} />
            )}

        </>
    );
}

export default StylesPage;



