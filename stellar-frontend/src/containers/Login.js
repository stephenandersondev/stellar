import React from 'react'


export default class Login extends React.Component{
    render(){
        return(
            <form onSubmit={(this.props.login)}>
                <input type='text' placeholder="username" />
                <input type='text' placeholder='password'/>
                <input type='submit' value='submit'/>
            </form>
        )
    }
}