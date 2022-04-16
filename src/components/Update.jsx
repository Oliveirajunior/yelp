import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import RestaurantFinder from '../apis/RestaurantFinder'
import { useNavigate } from 'react-router-dom'

const Update = (props) => {

  const {id} = useParams()
  const [name, setName] = useState("")
  const [location, setLocation] = useState("")
  const [price_range, setPrice_range] = useState("")
  let navigate = useNavigate()
 
  const getData = async() => {
    try {
      const response = await RestaurantFinder.get(`/${id}`)
      setName(response.data[0].name)
      setLocation(response.data[0].location)
      setPrice_range(response.data[0].price_range)
  
    } catch(err) {
      console.error(err.message)
    }
  }

  const handleSubmit = async e => {
    e.preventDefault()
    try {
      const response = await RestaurantFinder.put(`/${id}`, {name, location, price_range})
      console.log(response.data[0])
      navigate('/api/v1/restaurants/')
    } catch(err) {
      console.error(err.message)
    }
  }

  useEffect(() => {
    getData()
  },[])

  return (
    <div>
      <form>
        <div className="form-group">
        <label htmlFor='name'>Name</label>
        <input type="text" id='name' className='form-control' value={name} onChange={e => setName(e.target.value)}></input>
        </div>
        <div className="form-group">
        <label htmlFor='location'>Location</label>
        <input type="text" id='location' className='form-control' value={location} onChange={e => setLocation(e.target.value)}></input>
        </div>
        <div className="form-group">
        <label htmlFor='price_range'>Price Range</label>
        <input type="number" min="1" max="5" id='price_range' className='form-control' value={price_range} onChange={e => setPrice_range(e.target.value)}></input>
        </div>
        <button type="submit" onClick={handleSubmit} className='btn btn-primary'>Submit</button>
      </form>
    </div>
  )
}

export default Update