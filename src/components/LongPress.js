import React from 'react'
import PropTypes from 'prop-types'


export default class LongPress extends React.Component {
  static propTypes = {
    onLongPress: PropTypes.func.isRequired,
    longPressDuration: PropTypes.number,
  }
  
  static defaultProps = {
    longPressDuration: 500,
  }

  render = () => {
    const { onLongPress, longPressDuration, ...other } = this.props;
    return (
      <div
        onMouseDown={this.onTouchStart}
        onTouchStart={this.onTouchStart}
        onMouseUp={this.onTouchEnd}
        onTouchCancel={this.onTouchEnd}
        onTouchEnd={this.onTouchEnd}
        {...other } />
    )
  }

  onTouchStart = () => {
    this.start = new Date();
    this.ended = false;
    this.timeout = setTimeout(this.onEnd, this.props.longPressDuration)
  }

  onTouchEnd = () => {
    clearTimeout(this.timeout)
    this.onEnd();
  }

  onEnd = () => {
    if (this.ended) return
    this.ended = true;
    const isLongPressed = new Date().getTime() - this.start.getTime() > this.props.longPressDuration
    if (!isLongPressed) return  
    this.vibrate();
    setTimeout(() => this.props.onLongPress(), 100)
  }

  vibrate() {
    if(navigator.vibrate){
      navigator.vibrate([30]);
    }
  }

  componentWillUnmount() {
    clearTimeout(this.timeout)
  }



}