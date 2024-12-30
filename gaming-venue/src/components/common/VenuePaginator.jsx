import React from 'react'

const VenuePaginator = ({ currentPage, totalPages, onPageChange }) => {
    const pageNums = Array.from({length : totalPages}, (_, i) => i + 1)
  return (
    <nav>
        <ul className='pagination, justify-content-center'>
            {pageNums.map((pageNum) => (
                <li key={pageNum}
                    className={`page-item ${currentPage === pageNum ? "active" : "" }`}>
                        <button className='page-link' onClick={() => onPageChange(pageNum)}>
                            {pageNum}
                        </button>

                </li>
            ))}

        </ul>
      
    </nav>
  )
}

export default VenuePaginator
