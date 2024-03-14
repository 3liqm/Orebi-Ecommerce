import React from 'react'
import loader from '../../assets/images/loading.svg'
import './Loader.css'

const Loader = () => {
  return (
     <div className='loader'>
        <img src={loader}/>
    </div>
  )
}

export default Loader
