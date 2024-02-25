import LeftSideBar from './LeftSideBar'
import RightSideBar from './RightSideBar'

function Home({ children }) {
  return (
    <div className="flex justify-between flex-1">
      <LeftSideBar />
      {children}
      <RightSideBar />
    </div>
  )
}

export default Home
