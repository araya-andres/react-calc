import React from 'react'
import Key from './Key'

import './Row.css'

const row = ({keys}) =>
  <div className='row'>
    {keys.map(key => <Key key={key.id} {...key}/>)}
  </div>

export default row
