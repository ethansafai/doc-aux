import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { UserContext } from '../context/AppContext'
import sharedAxios from '../services/httpService'
import { AxiosError } from 'axios'

const formItemCss = 'p-2 my-2 border border-gray-300 rounded w-full max-w-xs'

function Login() {
  const { setUser } = useContext(UserContext)
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [role, setRole] = useState('patient')
  const [loading, setLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  async function handleSubmit(e) {
    e.preventDefault()

    setLoading(true)
    setErrorMessage('')
    try {
      if (role !== 'doctor' && role !== 'patient') {
        throw new Error(`Invalid value for 'role': ${role}`)
      }

      const { data } = await sharedAxios.post('auth/login', {
        email,
        password,
        role,
      })

      if (data?.accessToken && data?.user) {
        setUser({ ...data.user, role })
        if (role === 'doctor') {
          localStorage.setItem('doctorAccessToken', data.accessToken)
          localStorage.setItem('doctor', JSON.stringify({ ...data.user, role }))
          navigate('/')
        } else {
          localStorage.setItem('patientAccessToken', data.accessToken)
          localStorage.setItem(
            'patient',
            JSON.stringify({ ...data.user, role })
          )
          navigate('/patient')
        }
      } else {
        throw new Error(`Unexpected data from server: ${data}`)
      }
    } catch (err) {
      if (err instanceof AxiosError) {
        setErrorMessage(err.response?.data?.error ?? 'An error occurred')
      } else {
        console.error(err)
        setErrorMessage('An error occurred')
      }
    } finally {
      setLoading(false)
      setEmail('')
      setPassword('')
    }
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
          value={email}
          onChange={(e) => setEmail(e.target.value)}
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
        <div className="flex items-center gap-3 mb-4">
          <p className="font-medium">I am a: </p>
          <select
            onChange={(e) => setRole(e.target.value)}
            className="px-2 py-1 rounded-md bg-slate-100 outline-none border
          border-blue-500"
          >
            <option value="patient">Patient</option>
            <option value="doctor">Doctor</option>
          </select>
        </div>
        <button className="w-40">Submit</button>
      </form>
      {loading && <p className="animate-pulse">Signing you in...</p>}
      {errorMessage && (
        <p className="text-red-500 font-medium">{errorMessage}</p>
      )}
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
