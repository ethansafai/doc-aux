import { useState } from 'react'
import useInitialMount from '../../../hooks/useInitialMount'
import sharedAxios from '../../../services/httpService'
import { AxiosError } from 'axios'

function ImageCard({ imageName, handleClose }) {
  const [imageData, setImageData] = useState('')
  const [loading, setLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  async function loadImage() {
    setErrorMessage('')
    setLoading(true)
    try {
      const { data } = await sharedAxios.get(`images/${imageName}`)
      if (data) {
        data.imageData =
          'data:image/' + data.imageData.slice(data.imageData.indexOf('/') + 1)
        console.log(data)
        setImageData(data.imageData)
      }
    } catch (err) {
      console.error(err)
      if (err instanceof AxiosError && err.response?.data?.error) {
        setErrorMessage(err.response.data.error)
      } else {
        setErrorMessage('An error occurred while trying to load the image')
      }
    } finally {
      setLoading(false)
    }
  }

  useInitialMount(loadImage)

  return (
    <div
      className="p-8 shadow-2xl bg-slate-100 absolute top-1/2 left-1/2 
      -translate-x-1/2 -translate-y-1/2 min-w-60"
    >
      <div className="flex mb-2 items-center justify-between">
        <p className="text-xl font-bold">Image:</p>
        <button className="text-lg" onClick={handleClose}>
          Close
        </button>
      </div>
      {loading && <p className="animate-pulse font-medium">Loading image...</p>}
      {errorMessage && (
        <p className="text-red-500 font-medium">{errorMessage}</p>
      )}
      {imageData && (
        <>
          <p className="font-medium text-lg mb-2 italic">{imageName}</p>
          <img
            className="max-w-screen-md mx-auto max-h-[60vh]"
            src={imageData}
            alt="An upload from your collection"
          />
          <button
            className="bg-blue-500 text-white w-full mt-4 
          hover:text-slate-800"
          >
            Query AI Model
          </button>
        </>
      )}
    </div>
  )
}

export default ImageCard
