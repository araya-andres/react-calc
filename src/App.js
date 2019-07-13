import React, { Component } from 'react'
import Keyboard from './components/Keyboard'
import Screen from './components/Screen'

/**
 * Generate a class id for the given key label
 * @param {string} key A key label
 * @return {string} The class id
 */
function getId (key) {
  const desc = {
    '+': 'addition',
    '-': 'substraction',
    'x': 'multiplication',
    '/': 'division',
    '=': 'equal',
  }
  return `key_${key in desc ? desc[key] : key}`
}

/** App **/
class App extends Component {
  constructor(props) {
    super(props)

    this.initialState = {
      currentValue: '0',
      op: x => x,
      dot: false,
      overwrite: true,
    }

    this.state = this.initialState

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

  /**
   * Evaluate the current operation
   * @return The result of the current operation
   */
  eval = () => this.state.op(parseFloat(this.state.currentValue))

  /**
   * Handle a digit key
   * @param {string} digit A digit
   */
  handleDigit = digit => {
    let { currentValue, overwrite } = this.state
    if (overwrite) {
      currentValue = digit
      overwrite = digit === '0'
    } else {
      currentValue += digit
    }
    this.setState({ currentValue, overwrite })
  }

  /** Handle the dot key */
  handleDot = () => {
    if (!this.state.dot) {
      this.setState({
        currentValue: this.state.currentValue + '.',
        dot: true,
        overwrite: false
      })
    }
  }

  /** Handle the equal key */
  handleEq = () => this.setState({
    ...this.initialState,
    currentValue: this.eval().toString(),
  })

  /** Handle the clear key */
  handleClear = () => this.setState(this.initialState)

  /**
   * Return the handler function for the given operator
   * @param {string} op Arithmetic operator
   * @return {function} A handler function
   */
  getOperatorHandler = op => {
    const ops = {
      '+': x => y => x + y,
      '-': x => y => x - y,
      'x': x => y => x * y,
      '/': x => y => x / y,
    }
    return () => {
      this.setState({
        ...this.initialState,
        op: ops[op](this.eval()),
      })
    }
  }

  /**
   * Return the handler function for the given key label
   * @param {string} key The key label
   * @return {function} A handler function
   */
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

  /** Render the calculator */
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
