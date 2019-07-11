import React from 'react'
import Row from './Row'

import './Keyboard.css'

const keyboard = ({keys, getId, click}) =>
  <div className='keyboard'>
    {keys.map((keys, i) => <Row key={i} keys={keys} getId={getId} click={click}/>)}
  </div>

export default keyboard
