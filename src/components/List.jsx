import React, { useContext, useEffect } from 'react'
import RestaurantFinder from '../apis/RestaurantFinder'
import { RestaurantsContext } from '../context/RestaurantsContext'
import { useNavigate } from "react-router-dom"

const List = () => {

  const {restaurants, setRestaurants} = useContext(RestaurantsContext)
  
  let navigate = useNavigate() 
  
  const getData = async () => {
    try {
      const response = await RestaurantFinder.get('/')
      setRestaurants(response.data)
    } catch(err) {
      console.error(err.message)
    }
  }

  const handleDelete = async id => {
    try {
      await RestaurantFinder.delete(`/${id}`)
      setRestaurants(restaurants.filter(restaurant => restaurant.id !== id))
    } catch(err) {
      console.error(err.message)
    }
  }

  const handleUpdate = id => {
    navigate(`/api/v1/restaurants/${id}/update`)
  }
  
  useEffect(() => {
    getData()
  },[])

  return (
    <div className='list-group'>
      <table className='table table-hover table-dark'>
        <thead>
          <tr className='bg-primary'>
            <th scope='col'>Restaurant</th>
            <th scope='col'>Location</th>
            <th scope='col'>Price Range</th>
            <th scope='col'>Ratings</th>
            <th scope='col'>Edit</th>
            <th scope='col'>Delete</th>
          </tr>
        </thead>
        <tbody>
          {restaurants.map((restaurant) => {
            return(
              <tr key={restaurant.id}>
                <td>{restaurant.name}</td>
                <td>{restaurant.location}</td>
                <td>{"$".repeat(restaurant.price_range)}</td>
                <td>*****</td>
                <td>
                  <button onClick={() => handleUpdate(restaurant.id)} className='btn btn-warning'>Update</button>
                </td>
                <td>
                  <button onClick={() => handleDelete(restaurant.id)} className='btn btn-danger'>Delete</button>
                </td>
              </tr>
            )
          })}
        {/* <tr>
          <td>Joao Porquinho</td>
          <td>Prudente</td>
          <td>$$$</td>
          <td>*****</td>
          <td><button className='btn btn-warning'>Update</button></td>
          <td><button className='btn btn-danger'>Delete</button></td>
        </tr> */}
        </tbody>
      </table>
    </div>
  )
}

export default List