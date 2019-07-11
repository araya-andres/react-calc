import React from 'react'
import Row from './Row'

import './Keyboard.css'

const keyboard = ({keys}) =>
  <div className='keyboard'>
    {keys.map((keys, i) => <Row key={i} keys={keys}/>)}
  </div>

export default keyboard
