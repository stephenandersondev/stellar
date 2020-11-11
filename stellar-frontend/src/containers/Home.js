import React from 'react'
import SearchBar from '../components/SearchBar.js'
import Carousel from 'react-elastic-carousel'
import DetailDisplay from '../components/DetailsDisplay.js'
import Card from '../components/Card.js'
import Logo from '../assets/img/stellar-logo.png'
import { Container, Image } from 'react-bootstrap'


export default class Home extends React.Component {

    constructor() {
        super()
        this.state = {
            detailDisplay: false,
            detailsItem: []
        }
    }

    displayDetails = (resource) => {
        this.setState({
            detailDisplay: true,
            detailsItem: resource.data
        })
    }

    exitDisplay = () => {
        this.setState({
            detailDisplay: false
        })
    }

    render() {

        let returnItems

        this.props.results.length == 0 || this.props.results.results.collection.items.length == 0 ? returnItems = [] : returnItems = this.props.results.results.collection.items

        const breakPoints = [
            { width: 1, itemsToShow: 1 },
            { width: 500, itemsToShow: 2 },
            { width: 768, itemsToShow: 3 },
            { width: 1200, itemsToShow: 4 }
        ]

        return (
            <div className='home-screen' style={{
                background: `url(${this.props.apodImg}) no-repeat center center
            fixed`, backgroundRepeat: "no-repeat", backgroundSize: "cover", height: "100vh"
            }}>
                <Container align="center">
                    <Container className="search-logo">
                        <Image src={Logo} alt="Logo" width="auto" height="200" />
                        <SearchBar searchChange={this.props.searchChange} />
                    </Container>
                    <Carousel className="carousel" breakPoints={breakPoints} disableArrowsOnEnd={true}>
                        {returnItems.filter(item => item.links).map(item => <Card
                        displayDetails={this.displayDetails}
                         item={item} />)}
                    </Carousel>
                    <DetailDisplay
                    className="details-display"
                    item={this.state.detailsItem}
                    exitDisplay={this.exitDisplay}
                    visible={this.state.detailDisplay}
                      />
                </Container>
            </div >
        )
    }
}
