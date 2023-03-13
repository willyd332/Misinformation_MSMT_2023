import React from 'react'
import {ThumbUp} from '@material-ui/icons'
import './FacebookCounter.css'

const FacebookCounter = ({counters, onClick}) => {
  const formatNumber = (count) => {
    return Intl.NumberFormat('pt-br', {
      notation: "compact",
      maximumFractionDigits: 1
    }).format(count);
  }

  return (
    <div className='counterContainer' onClick={onClick}>
      <ThumbUp color={counters === 0 ? 'disabled' : 'primary'} fontSize="small"/>
      <span className='counterLikes'>{formatNumber(counters)}</span>
    </div>
  )
}

export default FacebookCounter