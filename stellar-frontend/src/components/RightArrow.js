import React, { Component } from 'react';
class RightArrow extends Component {
  render() {
    return(
      <div className='backArrow' onClick={this.props.goToPrevSlide}>
        <button value="right">Right</button>
      </div>
    )
  }
}
export default RightArrow;