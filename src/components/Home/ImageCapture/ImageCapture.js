import { useContext, useRef, useState } from 'react'
import { UserContext } from '../../../context/AppContext'
import sharedAxios from '../../../services/httpService'
import { AxiosError } from 'axios'
import ImageList from './ImageList'

function ImageCapture() {
  const { user } = useContext(UserContext)
  const [file, setFile] = useState('')
  const [loading, setLoading] = useState(false)
  const [loadingImages, setLoadingImages] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const base64Ref = useRef('')
  const fileNameRef = useRef('')
  const [images, setImages] = useState([])

  async function loadUserImages() {
    setLoadingImages(true)
    try {
      const { data } = await sharedAxios.get('images/')
      if (Array.isArray(data)) {
        setImages(data)
      }
    } catch (err) {
      console.error(err)
    } finally {
      setLoadingImages(false)
    }
  }

  async function convertToBase64(file) {
    return new Promise((resolve) => {
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onloadend = () => {
        resolve(reader.result)
      }
    })
  }

  async function handleFileChange(e) {
    const file = e.target.files[0]
    base64Ref.current = await convertToBase64(file)
    fileNameRef.current = file.name
    setFile(URL.createObjectURL(file))
  }

  function handleClearFile() {
    setFile('')
    base64Ref.current = ''
    fileNameRef.current = ''
  }

  async function handleSubmit() {
    if (!base64Ref.current) {
      alert('You have not selected an image')
      return
    }

    setErrorMessage('')
    setLoading(true)
    try {
      const data = {
        imageName: fileNameRef.current,
        imageData: base64Ref.current,
      }
      await sharedAxios.post('images/', data)
      loadUserImages()
    } catch (err) {
      console.error(err)
      if (err instanceof AxiosError) {
        setErrorMessage(err.response?.data?.error ?? 'An error occurred')
      } else {
        setErrorMessage('An error occurred')
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex flex-col gap-4 px-5 pt-5 w-full">
      <p className="text-xl md:text-2xl font-bold">
        Welcome, <span className="text-cyan-700">Dr. {user.lastName}!</span>
      </p>
      <div
        className="border border-blue-600 w-full rounded-md shadow-md flex 
        flex-col gap-3 p-5 bg-blue-200"
      >
        <div className="flex space-x-6">
          {file && (
            <button
              className="bg-red-200 p-2 rounded-md w-1/3"
              onClick={handleClearFile}
            >
              Clear Image
            </button>
          )}
          <label
            htmlFor="cameraFile"
            className="bg-slate-100 p-2 rounded-md cursor-pointer shadow-md 
          font-medium hover:bg-gray-100 transition-all duration-150
          ease-in-out w-1/3 text-center"
          >
            Capture Image
          </label>
          <input
            id="cameraFile"
            type="file"
            accept="image/*"
            capture="camera"
            className="hidden"
            onChange={handleFileChange}
          />
          <label
            htmlFor="file"
            className="bg-slate-100 p-2 rounded-md cursor-pointer shadow-md 
          font-medium hover:bg-gray-100 transition-all duration-150
          ease-in-out w-1/3 text-center"
          >
            Upload Image
          </label>
          <input
            id="file"
            type="file"
            className="hidden"
            onChange={handleFileChange}
          />
        </div>
        {file && (
          <>
            <img src={file} alt="/" className="overflow-auto self-start" />
            <button
              onClick={handleSubmit}
              className="bg-slate-100 w-1/3 p-2 rounded-md"
            >
              Submit
            </button>
            {loading && (
              <p className="animate-pulse font-medium text-slate-500">
                Uploading image...
              </p>
            )}
            {errorMessage && (
              <p className="text-red-500 font-medium">{errorMessage}</p>
            )}
          </>
        )}
      </div>
      <ImageList
        loadUserImages={loadUserImages}
        images={images}
        loadingImages={loadingImages}
      />
    </div>
  )
}

export default ImageCapture
