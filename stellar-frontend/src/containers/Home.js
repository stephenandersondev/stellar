import React from 'react'
import SearchBar from '../components/SearchBar.js'
import Carousel from 'react-elastic-carousel'
import Card from '../components/Card.js'


export default class Home extends React.Component{

    render(){
        
        let returnItems

        this.props.results.length == 0 || this.props.results.results.collection.items.length == 0 ? returnItems=[] : returnItems = this.props.results.results.collection.items 
        
        const breakPoints = [
            {width: 1, itemsToShow: 1},
            {width: 500, itemsToShow: 2},
            {width: 768, itemsToShow: 3},
            {width: 1200, itemsToShow: 4}
        ]
        
        // console.log(returnItems.filter(item=>item.links))

        return(
            <div className='home-screen' style={{background: `url(${this.props.apodImg}) no-repeat center center
            fixed`, backgroundRepeat:"no-repeat", backgroundSize:"cover", height:"100vh"}}>
                <SearchBar searchChange={this.props.searchChange}/>
                <Carousel breakPoints={breakPoints}>
                    {returnItems.filter(item=>item.links).map(item => <Card item={item} />)}
                </Carousel>
            </div>
        )
    }
}
