import { Link } from 'react-router-dom'

function Header() {
  return (
    <header className="p-4 bg-white shadow-md mb-4 sticky top-0">
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
