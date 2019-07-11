import React from 'react'

import './Key.css'

const key = ({id, label, click}) =>
  <div className='key' id={id} onClick={() => click(label)}>{label}</div>

export default key
