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
  return `key_${key in desc ? desc[key] : key}`
}

class App extends Component {
  initialState = {
    currentValue: 0,
    op: x => x,
    decimalPosition: 0,
    decimals: 0,
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
    let { currentValue, decimalPosition, decimals } = this.state
    currentValue += decimalPosition * n
    decimalPosition *= 0.1
    decimals++
    this.setState({ currentValue, decimalPosition, decimals })
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
    decimals: 0,
  })

  handleClear = () => this.setState(this.initialState)

  getNumberHandler = key => {
    const n = Number.parseInt(key)
    return () => {
      if (this.state.decimalPosition === 0) {
        this.handleInteger(n)
      } else {
        this.handleDecimal(n)
      }
    }
  }

  getOperatorHandler = key => {
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
        decimals: 0,
      })
    }
  }

  getHandler = key => {
    if (/\d/.test(key)) {
      return this.getNumberHandler(key)
    } else if (/[+\-x/]/.test(key)) {
      return this.getOperatorHandler(key)
    } else if (key === '=') {
      return this.handleEq
    } else if (key === '.' ) {
      return this.handleDot
    } else if (key === 'clear') {
      return this.handleClear
    }
  }

  render () {
    const { currentValue, decimals } = this.state
    const value = decimals > 0
      ? currentValue.toFixed(decimals)
      : currentValue
    return (
      <div className="App">
        <Screen value={value}/>
        <Keyboard keys={this.keys}/>
      </div>
    )
  }
}

export default App
