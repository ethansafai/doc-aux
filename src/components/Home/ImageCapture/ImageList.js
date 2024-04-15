import { useState } from 'react'
import useInitialMount from '../../../hooks/useInitialMount'
import sharedAxios from '../../../services/httpService'
import { AxiosError } from 'axios'
import ImageCard from './ImageCard'

function ImageList({ loadUserImages, images, loadingImages }) {
  const [currentImageName, setCurrentImageName] = useState('')
  const [imageCardOpen, setImageCardOpen] = useState(false)

  async function deleteImage(imageName) {
    try {
      await sharedAxios.delete(`images/${imageName}`)
    } catch (err) {
      console.error(err)
      if (err instanceof AxiosError && err.response?.data?.error) {
        alert(err.response.data.error)
      } else {
        alert('An error occurred while trying to delete the image')
      }
    }
  }

  function handleShowImage(imageName) {
    setCurrentImageName(imageName)
    setImageCardOpen(true)
  }

  function handleCloseImageCard() {
    setCurrentImageName('')
    setImageCardOpen(false)
  }

  async function handleDelete(imageName) {
    await deleteImage(imageName)
    loadUserImages()
  }

  useInitialMount(loadUserImages)

  return (
    <div
      className="flex flex-col gap-1 min-w-52 bg-slate-100 p-5 rounded-lg
      shadow-md"
    >
      <p className="text-xl font-medium">Your Images:</p>
      {loadingImages ? (
        <p className="animate-pulse">Loading your images...</p>
      ) : !!images.length ? (
        <div className="flex flex-col gap-1">
          {imageCardOpen && (
            <ImageCard
              imageName={currentImageName}
              handleClose={handleCloseImageCard}
            />
          )}
          <input
            type="search"
            placeholder="Search 🔍"
            className="bg-slate-100 w-1/2 p-2 rounded-lg border-2 
            border-slate-500 my-1"
          />
          <div className="border border-slate-400 w-[98%] mx-auto my-3"></div>
          {images.map((imageName) => (
            <div key={imageName} className="text-lg flex items-center gap-2">
              <p
                className="text-blue-500 underline cursor-pointer"
                onClick={() => {
                  handleShowImage(imageName)
                }}
              >
                {imageName}
              </p>
              <div className="border border-slate-500 grow h-[1px]"></div>
              <button
                className="bg-red-400 text-white hover:bg-slate-600 my-1"
                onClick={() => {
                  handleDelete(imageName)
                }}
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      ) : (
        <p className="italic font-medium text-slate-500">
          No images to display
        </p>
      )}
    </div>
  )
}

export default ImageList
