import React from 'react'
import Key from './Key'

import './Row.css'

const row = ({keys, click}) =>
  <div className='row'>
    {keys.map(key => <Key key={key.id} {...key} click={click}/>)}
  </div>

export default row
