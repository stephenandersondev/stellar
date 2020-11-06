import React from 'react'
import SearchBar from '../components/SearchBar.js'
import Carousel from '../components/Carousel.js'


export default class Home extends React.Component{

    render(){
        return(
            <div className='home-screen' style={{backgroundImage: `url(${this.props.apodImg})`}}>
                <SearchBar searchChange={this.props.searchChange}/>
                <Carousel results={this.props.results} />
            </div>
        )
    }
}
