import React from 'react'

import './Key.css'

const key = ({label, id, click}) =>
  <div className='key' id={id} onClick={() => click(label)}>{label}</div>

export default key
