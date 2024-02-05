import Header from './components/Header'
import Signup from './components/Signup'
import AppContext from './context/AppContext'

function App() {
  return (
    <AppContext>
      <div className="bg-blue-100 min-h-screen">
        <Header />
        <Signup />
      </div>
    </AppContext>
  )
}

export default App
