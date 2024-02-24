import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { UserContext } from '../context/AppContext'

const formItemCss = 'p-2 my-2 border border-gray-300 rounded w-full max-w-xs'

function Login() {
  const { setUser } = useContext(UserContext)
  const navigate = useNavigate()
  const [emailAddress, setEmailAddress] = useState('')
  const [password, setPassword] = useState('')

  function handleSubmit(e) {
    e.preventDefault()

    // TODO: remove static data once backend API is implemented
    setUser({
      firstName: 'Ethan',
      lastName: 'Safai',
      emailAddress: emailAddress,
      city: 'Los Angeles',
    })

    setEmailAddress('')
    setPassword('')

    // if (success) {
    navigate('/')
    // }
  }

  return (
    <div
      className="flex flex-col items-center justify-center gap-10 -mt-[64px]
     h-screen min-h-fit pt-[70px]"
    >
      <h1 className="text-3xl font-bold text-black text-center">
        Welcome to DocAux
      </h1>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 w-full items-center px-2 md:px-0"
      >
        <input
          value={emailAddress}
          onChange={(e) => setEmailAddress(e.target.value)}
          type="email"
          placeholder="Email"
          className={formItemCss}
          required={true}
        />
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          placeholder="Password"
          className={formItemCss}
          required={true}
        />
        <button className="w-40">Submit</button>
      </form>
      <p>
        Don't have an account?{' '}
        <Link to="/signup" className="text-blue-500">
          Sign Up
        </Link>
      </p>
    </div>
  )
}

export default Login
