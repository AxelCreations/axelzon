import Link from "next/link";


type PaginationBarProps = {
  currentPage: number;
  totalPages: number;
  className?: string;
}

const PaginationBar = ({ currentPage, totalPages, className }: PaginationBarProps) => {
  const maxPage = Math.min(totalPages, Math.max(currentPage + 4, 10))
  const minPage = Math.max(1, Math.min(currentPage - 5, maxPage - 9));

  const numberedPageItems: JSX.Element[] = [];

  for (let page = minPage; page <= maxPage; page++) {
    numberedPageItems.push(
      <Link
        href={`?page=${page}`}
        key={page}
        className={`join-item btn btn-primary ${currentPage === page ? 'btn-active pointer-events-none' : ''}`}
      >
        {page}
      </Link>
    );
  }

  return (
    <div className={`py-5 sm:py-14 ${className}`}>
      <div className="join hidden sm:block">
        {numberedPageItems}
      </div>
      <div className="join block sm:hidden">
        {currentPage > 1 &&
          <Link href={`?page=${currentPage - 1}`} className="btn btn-primary join-item">
            {'<--'}
          </Link>
        }
        <button className="join-item btn btn-primary btn-active pointer-events.none">{` Page ${currentPage}/${totalPages}`}</button>
        {currentPage < totalPages &&
          <Link href={`?page=${currentPage + 1}`} className="btn btn-primary join-item">
            {'-->'}
          </Link>
        }
      </div>
    </div>
  )
}

export default PaginationBar;