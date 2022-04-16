import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './routes/Home'
import DetailPage from './routes/DetailPage'
import UpdatePage from './routes/UpdatePage'
import { RestaurantsContextProvider } from './context/RestaurantsContext'

const App = () => {
  return (
    <RestaurantsContextProvider>
      <div className='container'>
       
      <Router>
      <Routes>
      <Route path='/api/v1/restaurants' element={<Home/>}/>
      <Route path='/api/v1/restaurants/:id/update' element={<UpdatePage/>}/>
      <Route path='/restaurants/:id' element={<DetailPage/>}/>
      </Routes>
    </Router>
    
    </div>
    </RestaurantsContextProvider>
  )
}

export default App