import React, { Component } from 'react'
import CardList from '../components/CardList'
//import { robots } from './robots'
import SearchBox from '../components/SearchBox'
import Scroll from '../components/Scroll'

class App extends Component {
    constructor(){
        super()
        this.state={
            robots:[],
            searchField:''
        }
    }

    componentDidMount(){
        fetch('https://jsonplaceholder.typicode.com/users')
            .then(response=>{
                return response.json()
            })
            .then(
                users=>{this.setState({robots: users})}
            )
    }
    onSearchChange = (event)=>{
        this.setState({searchField: event.target.value})  
    }
    
    render(){
        const {robots,searchField} = this.state
        const filterRobots = this.state.robots.filter(robot =>{
            return robot.name.toLowerCase().includes(searchField.toLowerCase())
        })
        
       return !robots.length ?
             <h1 className='tc white'>Loading...</h1>
        
        :(
                <div className='tc'>
                    <h1>Robofriends</h1>
                    <SearchBox searchChange={this.onSearchChange}/>
                    <Scroll>
                        <CardList robots={filterRobots}/>
                    </Scroll>
                </div>
              
        )
    }
}

export default App