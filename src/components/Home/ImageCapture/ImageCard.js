import { useState } from 'react'
import useInitialMount from '../../../hooks/useInitialMount'
import sharedAxios from '../../../services/httpService'
import { AxiosError } from 'axios'

function ImageCard({ imageName, handleClose }) {
  const [imageData, setImageData] = useState('')
  const [loading, setLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [modelResponse, setModelResponse] = useState({})
  const [queryingModel, setQueryingModel] = useState(false)
  const [modelErrorMessage, setModelErrorMessage] = useState('')
  const tableHeaders = Object.keys(modelResponse).filter(
    (key) => key !== 'img_name' && key !== 'pred_class'
  )

  async function loadImage() {
    setErrorMessage('')
    setLoading(true)
    try {
      const { data } = await sharedAxios.get(`images/${imageName}`)
      if (data) {
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

  async function queryAIModel() {
    if (!imageData) {
      alert('Please wait until the image has finished loading')
    }

    setModelErrorMessage('')
    setQueryingModel(true)
    setModelResponse({})
    try {
      const { data } = await sharedAxios.post('predictions/', {
        imageName,
        imageData: imageData.substring(
          imageData.indexOf(';base64,') + ';base64'.length + 1
        ),
      })
      setModelResponse(data)
    } catch (err) {
      console.error(err)
      if (err instanceof AxiosError && err.response?.data?.error) {
        setModelErrorMessage(err.response.data.error)
      } else {
        setModelErrorMessage(
          'An error occurred while trying to query the model'
        )
      }
    } finally {
      setQueryingModel(false)
    }
  }

  useInitialMount(loadImage)

  return (
    <div
      className="p-8 shadow-2xl bg-slate-100 absolute top-1/2 left-1/2 
      -translate-x-1/2 -translate-y-1/2 min-w-60 max-w-screen-md"
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
            className="max-w-full mx-auto max-h-[60vh]"
            src={imageData}
            alt="An upload from your collection"
          />
          <button
            onClick={queryAIModel}
            className="bg-blue-500 text-white w-full mt-4 
          hover:text-slate-800"
          >
            Query AI Model
          </button>
          {queryingModel && (
            <p className="animate-pulse font-medium mt-3">Querying model...</p>
          )}
          {modelErrorMessage && (
            <p className="text-red-500 font-medium mt-3">{modelErrorMessage}</p>
          )}
          {!!tableHeaders.length && (
            <div>
              <p className="mb-1 mt-3 font-medium text-lg">Model Response:</p>
              <div className="max-w-full overflow-x-auto p-2">
                <table>
                  <thead>
                    <tr>
                      {tableHeaders.map((key) => (
                        <th
                          className="p-1 border-2 whitespace-nowrap"
                          key={key}
                        >
                          {key.charAt(0).toUpperCase() +
                            key.split('_').join(' ').substring(1)}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      {tableHeaders.map((key) => {
                        const value = modelResponse[key]
                        return (
                          <td className="p-1 border-2" key={key}>
                            {typeof value === 'number'
                              ? (value * 100).toFixed(2) + '%'
                              : value}
                          </td>
                        )
                      })}
                    </tr>
                  </tbody>
                </table>
              </div>
              {modelResponse['pred_class'] && (
                <p className="font-medium mt-3">
                  Prediction: {modelResponse['pred_class']}
                </p>
              )}
            </div>
          )}
        </>
      )}
    </div>
  )
}

export default ImageCard
