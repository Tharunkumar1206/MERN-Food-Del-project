import React, { useContext } from 'react'
import './FoodDisplay.css'
import { StoreContent } from '../../Context/StoreContext'
import FoodItem from '../FoodItem/FoodItem';


const FoodDisplay = ({category}) => {

    const {food_list} =useContext(StoreContent);

  return (
    <div className='food-display' id="food-display">
        <h>Top Dishes near you</h>
        <div className="food-display-list">
          {food_list.map((item,index)=>{

            if(category==="All" || category === item.category){
               return <FoodItem key={index} id={item._id} name={item.name} description={item.description} price={item.price} image={item.image} />
            }

          })}
        </div>
    </div>
  )
}

export default FoodDisplay
