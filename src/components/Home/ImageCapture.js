import { useContext } from 'react'
import { UserContext } from '../../context/AppContext'

function ImageCapture() {
  const { user } = useContext(UserContext)

  return (
    <div className="flex flex-col gap-4 px-4 pt-4 w-full">
      {/* search bar on the right side */}
      <div className="flex justify-end">
        <input
          type="search"
          placeholder="🔍 Search"
          className="bg-gray-300 w-1/2 p-2 rounded-lg"
        />
      </div>

      <p className="text-xl md:text-2xl font-bold">
        Welcome, <span className="text-cyan-700">Dr. {user.lastName}!</span>
      </p>

      <div className="flex space-x-6">
        <button className="bg-gray-300 p-2 rounded-md">Capture Image</button>
        <button className="bg-gray-300 p-2 rounded-md">Upload Image</button>
      </div>

      <div>
        <img src="./images/image-capture-page.jpg" alt="/" />
      </div>

      <div className="flex justify-center space-x-10">
        <button className="bg-gray-300 p-2 rounded-md">Retake</button>
        <button className="bg-gray-300 p-2 rounded-md">Capture</button>
      </div>

      <div className="flex justify-end">
        <button className="bg-gray-300 w-1/3 p-2 rounded-md">Submit</button>
      </div>
    </div>
  )
}

export default ImageCapture
