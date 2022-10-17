import React, { Component } from 'react'

export default class Clock extends Component {

constructor(props) {
  super(props)

  this.state = {
     seconds: 0,
     minuets: 0,
     start: false,
     stop: false,
  }
}

 runTimer = () => {
    setInterval(() => {
      if (this.state.seconds != 59) {
        this.setState({
          seconds: this.state.seconds += 1
        })
      } else {
        this.setState({
          minuets: this.state.minuets += 1,
          seconds: this.setState.seconds = 0
        })
      }
    }, 1000);
}

  render() {
    this.runTimer()
    return (
      <div>
        <div className="TimeDisplay"> 
          <h1> time {this.state.minuets} : {this.state.seconds} </h1>
        </div>
      </div>
    )
  }
}
