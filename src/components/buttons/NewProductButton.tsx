import Link from "next/link";

type NewProductButtonProps = {
  className?: string;
}

const NewProductButton = ( { className }: NewProductButtonProps ) => {
  return (
    <Link href='/add-product' className={`btn btn-secondary ${className}`}>
      <span>
        <svg xmlns="http://www.w3.org/2000/svg" height="1.25rem" viewBox="0 0 512 512" fill="currentColor">
          <path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM232 344V280H168c-13.3 0-24-10.7-24-24s10.7-24 24-24h64V168c0-13.3 10.7-24 24-24s24 10.7 24 24v64h64c13.3 0 24 10.7 24 24s-10.7 24-24 24H280v64c0 13.3-10.7 24-24 24s-24-10.7-24-24z" />
        </svg>
      </span>
      <span>Add Product</span>
    </Link>
  )
}

export default NewProductButton;