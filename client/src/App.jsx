import { StateContext } from './config/store'
import Routespath from './routes/Routespath'
import {Toaster} from 'react-hot-toast'



function App() {
  return (
    <StateContext>
      <Toaster/>
      <Routespath />
    </StateContext>
  )
}

export default App
