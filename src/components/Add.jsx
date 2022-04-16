import React, {useContext, useState} from 'react'
import RestaurantFinder from '../apis/RestaurantFinder'
import { RestaurantsContext } from '../context/RestaurantsContext'

const Add = () => {
  
  const [name, setName] = useState("")
  const [location, setLocation] = useState("")
  const [price_range, setPrice_range] = useState("Price Range")
  const {addRestaurant} = useContext(RestaurantsContext)
  
  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await RestaurantFinder.post('/', {name, location, price_range})
      console.log(response.data[0])
      addRestaurant(response.data[0])
    } catch(err) {
      console.error(err.message)
    }
  }

  return (
    <div className='mb-4'>
      <form>
        <div className="form-row">
          <div className="col">
            <input value={name} onChange={e => setName(e.target.value)} type="text" className='form-control' placeholder='name'/>
          </div>
          <div className="col">
            <input value={location} onChange={e => setLocation(e.target.value)} type="text" className='form-control' placeholder='location'/>
          </div>
          <div className="col">
            <select value={price_range} onChange={e => setPrice_range(e.target.value)} className='custom-select'>
              <option disabled>Price Range</option>
              <option value="1">$</option>
              <option value="2">$$</option>
              <option value="3">$$$</option>
              <option value="4">$$$$</option>
              <option value="5">$$$$$</option>
            </select>
          </div>
        <button onClick={handleSubmit} type='button' className='btn btn-primary'>Add</button>
        </div>
      </form>
    </div>
  )
}

export default Add