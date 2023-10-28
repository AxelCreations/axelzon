import Image from 'next/image';
import Link from 'next/link';
import logo from '/public/next.svg';

const Footer = () => {
  return (
    <footer className="bg-secondary p-10 text-secondary-content">
      <div className="footer m-auto max-w-7xl flex justify-center items-center">
      <Link href="/" className='btn btn-ghost flex justify-center items-center'>
        <Image className='block' src={logo} height={40} width={120} alt='AxelZon logo' />
      </Link>
      </div>
    </footer>
  )
}

export default Footer;