import { Link } from 'react-router-dom'

function Login() {
  // TODO: implement login screen (this is placeholder code)
  return (
    <div>
      <h1 className="text-lg font-bold text-red-500">This is a login screen</h1>
      <p>
        Don't have an account? <Link to="/signup">Sign Up</Link>
      </p>
    </div>
  )
}

export default Login
