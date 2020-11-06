import React, { Component } from 'react';
class LeftArrow extends Component {
  render() {
    return(
      <div className='backArrow' onClick={this.props.goToPrevSlide}>
        <button value="left">Left</button>
      </div>
    )
  }
}
export default LeftArrow;