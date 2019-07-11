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
    if (this.state.decimalPosition === 0) {
      this.handleInteger(n)
    } else {
      this.handleDecimal(n)
    }
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

  handleClear = () => this.setState({
    currentValue: 0,
    op: x => x,
    decimalPosition: 0,
  })

  handleKey = key => {
    if (/\d/.test(key)) {
      this.handleNumber(key)
    } else if (/[+\-x/]/.test(key)) {
      this.handleOperator(key)
    } else if (key === '=') {
      this.handleEq()
    } else if (key === '.' ) {
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
      click: this.handleKey,
    })))

    return (
      <div className="App">
        <Screen value={this.state.currentValue}/>
        <Keyboard keys={keys} />
      </div>
    )
  }
}

export default App
