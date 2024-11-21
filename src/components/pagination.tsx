'use client';
import React from "react";


const Pagination = ( p: any ) => {
    let totalPages = Math.ceil(p.total / 10);

    return (
        <>
            <div className="pagination">
                { p.page > 1 && (
                    <>
                        <div className="li" onClick={() => p.changePage(1)}>First</div>
                        <div className="li" onClick={() => p.changePage(parseInt(p.page)-1)}>&lt;</div>
                    </>
                )}
                <div className="li nb">Page {p.page} of {totalPages}</div>
                { p.page < totalPages && (
                    <>
                        <div className="li" onClick={() => p.changePage(parseInt(p.page)+1)}>&gt;</div>
                        <div className="li" onClick={() => p.changePage(totalPages)}>Last</div>
                    </>
                )}
            </div>
        </>
    )
}

export default Pagination;