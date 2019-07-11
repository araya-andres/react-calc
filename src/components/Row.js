import React from 'react'
import Key from './Key'

import './Row.css'

const row = ({keys, getId, click}) =>
  <div className='row'>
    {keys.map(key => <Key key={key} id={getId(key)} label={key} click={click}/>)}
  </div>

export default row
