import React, { useEffect, useState } from 'react';
import StylesApi from '../services/StylesApi';
import Pagination from "../components/Pagination";
import { Link  } from 'react-router-dom';



const StylesPage = (props) => {

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;
    const [styles, setStyles] = useState([]);

    // Récuperation des données des styles pour l'affichage. 
    async function fetchStyles() {
        try {
            const styles = await StylesApi.findAll();
            setStyles(styles);

        } catch (error) {
            console.log(error.response);
        }
    }

    useEffect(() => {

        fetchStyles();

    }, []);

    // La pagination des données se fait grâce au composant pagination
    //Gestion du changement de page
    const handlePageChange = page => setCurrentPage(page);

    // Pagination des données.
    const paginatedStyles = styles.length > itemsPerPage ? Pagination.getData(
        styles,
        currentPage,
        itemsPerPage
    ) : styles;

    return (
        <>
            {paginatedStyles.map(style => (

                <div className="container mt-0 bg-primary " key={style.id}>
                 <p>{style.name}</p>
                </div>
            ))}

            {itemsPerPage < styles.length && (
                <Pagination currentPage={currentPage} itemsPerPage={itemsPerPage} length={styles.length} onPageChanged={handlePageChange} />
            )}

        </>
    );
}

export default StylesPage;



