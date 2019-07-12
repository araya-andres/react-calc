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
    currentValue: '0',
    op: x => x,
    dot: false,
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

  eval = () => this.state.op(parseFloat(this.state.currentValue))

  handleDigit = digit => {
    let { currentValue } = this.state
    if (currentValue !== '0') {
      currentValue += digit
    } else if (digit !== '0') {
      currentValue = digit
    }
    this.setState({ currentValue })
  }

  handleDot = () => {
    if (!this.state.dot) {
      const currentValue = this.state.currentValue + '.'
      this.setState({ currentValue, dot: true })
    }
  }

  handleEq = () => this.setState({
    currentValue: this.eval().toString(),
    op: x => x,
    dot: false,
  })

  handleClear = () => this.setState(this.initialState)

  getOperatorHandler = op => {
    const ops = {
      '+': x => y => x + y,
      '-': x => y => x - y,
      'x': x => y => x * y,
      '/': x => y => x / y,
    }
    return () => {
      this.setState({
        currentValue: '0',
        op: ops[op](this.eval()),
        dot: false,
      })
    }
  }

  getHandler = key => {
    if (/\d/.test(key)) {
      return this.handleDigit
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
    return (
      <div className="App">
        <Screen value={this.state.currentValue}/>
        <Keyboard keys={this.keys}/>
      </div>
    )
  }
}

export default App
