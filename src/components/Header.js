import { Link } from 'react-router-dom'
import { ClipboardIcon } from '@heroicons/react/outline'

function Header() {
  return (
    <header
      className="p-4 bg-white shadow-md sticky top-0 flex justify-center 
      items-center gap-2"
    >
      <ClipboardIcon className="h-6 w-6 mt-[2px]" />
      <Link
        to="/"
        className="no-underline text-2xl font-semibold text-center text-black 
      visited:text-black block"
      >
        DocAux
      </Link>
    </header>
  )
}

export default Header
