import React, { Component } from 'react'
import './App.css'
import Keyboard from './components/Keyboard'
import Screen from './components/Screen'

const getId = key => {
  if (/[+\-x/=]/.test(key)) {
    const desc = {
      '+': 'addition',
      '-': 'substraction',
      'x': 'multiplication',
      '/': 'division',
      '=': 'equal',
    }
    return `key_${desc[key]}`
  }
  return `key_${key}`
}

class App extends Component {
  state = {
    currentValue: 0,
    op: x => x,
    decimalPosition: 0,
  }

  handleKey = key => {
    const { currentValue, op, decimalPosition } = this.state
    let newValue = 0
    let newOp = x => x
    let newDecimalPosition = 0
    if (/\d/.test(key)) {
      if (decimalPosition === 0) {
        newValue = currentValue * 10 + Number.parseInt(key)
      } else {
        newValue = currentValue + decimalPosition * Number.parseInt(key)
        newDecimalPosition = decimalPosition * 0.1
      }
      newOp = op
    } else if (/[+\-x/]/.test(key)) {
      const ops = {
        '+': a => b => a + b,
        '-': a => b => a - b,
        'x': a => b => a * b,
        '/': a => b => a / b,
      }
      const value = op(currentValue)
      newOp = ops[key](value)
    } else if (key === '=') {
      newValue = op(currentValue)
    } else if (key === '.' && decimalPosition === 0) {
      newValue = currentValue
      newDecimalPosition = .1
    }
    this.setState({
      currentValue: newValue,
      op: newOp,
      decimalPosition: newDecimalPosition,
    })
  }

  render () {
    const keys = [
      [ 'clear', '/' ],
      [ '7', '8', '9', 'x' ],
      [ '4', '5', '6', '-' ],
      [ '1', '2', '3', '+' ],
      [ '0', '.', '=' ],
    ]

    return (
      <div className="App">
        <Screen value={this.state.currentValue}/>
        <Keyboard keys={keys} getId={getId} click={this.handleKey}/>
      </div>
    )
  }
}

export default App
