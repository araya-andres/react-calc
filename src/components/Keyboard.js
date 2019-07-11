import React from 'react'
import Row from './Row'

import './Keyboard.css'

const keyboard = ({keys, click}) =>
  <div className='keyboard'>
    {keys.map((keys, i) => <Row key={i} keys={keys} click={click}/>)}
  </div>

export default keyboard
