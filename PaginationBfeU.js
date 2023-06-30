import '../styles/Tod.css';
import ReactPaginate from 'react-paginate';
import { useState, useEffect, useRef } from 'react';
import { useLocalState } from '../util/useLocalState';
import { complex } from 'framer-motion';

const PaginationBfeU = ({setPage, maxItems}) => {
    const [activePage, setActivePage] = useLocalState(0, "activePageBfeU");
    useEffect(() => {
        const value = JSON.parse("["+localStorage.getItem("activePageBfeU")+"]");
            return activePage !== 0? 
            setActivePage(value) : setActivePage([0]);
            }
                , [maxItems]);

    const handlePageClick = (e) => {
        setPage(e.selected);
        setActivePage(e.selected);
    }
return (
    <ReactPaginate 
                    breakLabel={"..."}
                    nextLabel={">>"}
                    previousLabel={"<<"} 
                    pageCount={maxItems}
                    marginPagesDisplayed={3}
                    pageRangeDisplayed={5}
                    onPageChange={handlePageClick}
                    containerClassName={"pagination justify-content-center"}
                    pageClassName={"page-item"}
                    pageLinkClassName={"page-link"}
                    previousClassName={"page-item"}
                    previousLinkClassName={"page-link"}
                    nextClassName={"page-item"}
                    nextLinkClassName={"page-link"}
                    breakClassName={"page-item"}
                    breakLinkClassName={"page-link"}
                    activeClassName={"page-item active"}
                    forcePage={activePage[0]}
                    />
)
}
export default PaginationBfeU