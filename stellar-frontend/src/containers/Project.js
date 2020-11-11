import React from 'react'
import Board from '../components/Board.js'
import BoardCard from '../components/BoardCard.js'


export default class Project extends React.Component{
    render(){
        let project = this.props.project
        console.log(project)
        return(
            <div>
                <main className="flexbox">
                <Board id="board-1" className="board">
                    <BoardCard id="card-1" className="card" draggable="true">
                        <p>Card one</p>
                    </BoardCard>
                </Board>
                <Board id="board-2" className="board">
                    <BoardCard id="card-2" className="card" draggable="true">
                        <p>Card two</p>
                    </BoardCard>
                </Board>
                </main>
            </div>
        )
    }
}