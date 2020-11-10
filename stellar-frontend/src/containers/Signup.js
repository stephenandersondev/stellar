import React from 'react'


export default class Signup extends React.Component{
    render(){
        return(
            <form onSubmit={(this.props.signup)}>
                <input type='text' placeholder="Choose a username" />
                <input type='text' placeholder='Create a password'/>
                <input type='submit' value='submit'/>
            </form>
        )
    }
}