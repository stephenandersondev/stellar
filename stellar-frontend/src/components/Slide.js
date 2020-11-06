import { Component } from 'react';

class Slide extends Component {

    constructor(props) {
        super(props);
        this.state = {
            landing: []
        };
    }

    componentDidMount() {
        this.setState({
            landing: this.props.results
        })
    }

    render() {
        return(
            <section>
            {
            this.state.landing.map((s, index) =>
                <div className={
                index === this.props.activeIndex ? 'active' : 'slide'}
                key={index}>
                    <h1>{s.title}</h1>
                    <p>{s.description}</p>
                </div>
            ) }
            </section>
        )
    }
}
  export default Slide;