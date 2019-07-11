import React, { Component } from 'react'
import './App.css'
import Keyboard from './components/Keyboard'
import Screen from './components/Screen'

const getId = key => {
  const desc = {
    '+': 'addition',
    '-': 'substraction',
    'x': 'multiplication',
    '/': 'division',
    '=': 'equal',
  }
  return key in desc
    ? `key_${desc[key]}`
    : `key_${key}`
}

class App extends Component {
  initialState = {
    currentValue: 0,
    op: x => x,
    decimalPosition: 0,
  }

  state = this.initialState

  constructor(props) {
    super(props)
    this.keys = [
      [ 'clear', '/' ],
      [ '7', '8', '9', 'x' ],
      [ '4', '5', '6', '-' ],
      [ '1', '2', '3', '+' ],
      [ '0', '.', '=' ],
    ].map(row => row.map(label => ({
      label,
      id: getId(label),
      click: this.getHandler(label),
    })))
  }

  handleInteger = n => {
    const currentValue = this.state.currentValue * 10 + n
    this.setState({ currentValue })
  }

  handleDecimal = n => {
    let { currentValue, decimalPosition } = this.state
    currentValue += decimalPosition * n
    decimalPosition *= 0.1
    this.setState({ currentValue, decimalPosition })
  }

  handleNumber = key => {
    const n = Number.parseInt(key)
    return () => {
      if (this.state.decimalPosition === 0) {
        this.handleInteger(n)
      } else {
        this.handleDecimal(n)
      }
    }
  }

  handleOperator = key => {
    const ops = {
      '+': x => y => x + y,
      '-': x => y => x - y,
      'x': x => y => x * y,
      '/': x => y => x / y,
    }
    return () => {
      this.setState({
        currentValue: 0,
        op: ops[key](this.state.op(this.state.currentValue)),
        decimalPosition: 0,
      })
    }
  }

  handleDot = () => {
    if (this.state.decimalPosition === 0) {
      this.setState({ decimalPosition: .1 })
    }
  }

  handleEq = () => this.setState({
    currentValue: this.state.op(this.state.currentValue),
    op: x => x,
    decimalPosition: 0,
  })

  handleClear = () => this.setState(this.initialState)

  getHandler = key => {
    if (/\d/.test(key)) {
      return this.handleNumber(key)
    } else if (/[+\-x/]/.test(key)) {
      return this.handleOperator(key)
    } else if (key === '=') {
      return this.handleEq
    } else if (key === '.' ) {
      return this.handleDot
    } else if (key === 'clear') {
      return this.handleClear
    }
  }

  render () {
    return (
      <div className="App">
        <Screen value={this.state.currentValue}/>
        <Keyboard keys={this.keys}/>
      </div>
    )
  }
}

export default App
