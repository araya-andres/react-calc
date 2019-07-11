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

  handleInteger = key => {
    const currentValue = this.state.currentValue * 10 + Number.parseInt(key)
    this.setState({ currentValue })
  }

  handleDecimal = key => {
    let { currentValue, decimalPosition } = this.state
    currentValue += decimalPosition * Number.parseInt(key)
    decimalPosition *= 0.1
    this.setState({ currentValue, decimalPosition })
  }

  handleOperator = key => {
    const ops = {
      '+': x => y => x + y,
      '-': x => y => x - y,
      'x': x => y => x * y,
      '/': x => y => x / y,
    }
    const value = this.state.op(this.state.currentValue)
    this.setState({
      currentValue: 0,
      op: ops[key](value),
      decimalPosition: 0,
    })
  }

  handleDot = () => this.setState({ decimalPosition: .1 })

  handleEq = () => this.setState({
    currentValue: this.state.op(this.state.currentValue),
    op: x => x,
    decimalPosition: 0,
  })

  handleClear = () => this.setState({
    currentValue: 0,
    op: x => x,
    decimalPosition: 0,
  })

  handleKey = key => {
    if (/\d/.test(key)) {
      if (this.state.decimalPosition === 0) {
        this.handleInteger(key)
      } else {
        this.handleDecimal(key)
      }
    } else if (/[+\-x/]/.test(key)) {
      this.handleOperator(key)
    } else if (key === '=') {
      this.handleEq()
    } else if (key === '.' && this.state.decimalPosition === 0) {
      this.handleDot()
    } else if (key === 'clear') {
      this.handleClear()
    }
  }

  render () {
    const keys = [
      [ 'clear', '/' ],
      [ '7', '8', '9', 'x' ],
      [ '4', '5', '6', '-' ],
      [ '1', '2', '3', '+' ],
      [ '0', '.', '=' ],
    ].map(row => row.map(label => ({
      label,
      id: getId(label),
    })))

    return (
      <div className="App">
        <Screen value={this.state.currentValue}/>
        <Keyboard keys={keys} click={this.handleKey}/>
      </div>
    )
  }
}

export default App
