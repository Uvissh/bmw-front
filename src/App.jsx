

import './App.css'
import { BrowserRouter,Routes,Route } from 'react-router-dom'
import Body from './components/Body'
import Login from './components/Login'
import Profile from './components/profile'
import { Provider } from 'react-redux'
import appstore from './utils/appstore'
import Feed from './components/Feed'
import Connections from './components/Connections'
import Request from './components/Request'



function App() {
  return (
<>
<Provider  store ={appstore}>
<BrowserRouter basename=  "/">
<Routes>
  <Route path = "/" element={<Body/>}>
    <Route path ="/login"element ={<Login/>}/>
  <Route path ="/" element={<Feed/>}/>
    <Route path ="/profile" element ={<Profile/>}/>
    <Route path ="/connections" element={<Connections/>}/>
    <Route path ="/requests" element ={<Request/>}/> 



  
  
  </Route>

  </Routes>


</BrowserRouter>
</Provider>


</>

  )
}

export default App



