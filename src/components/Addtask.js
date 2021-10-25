import React, { Component } from 'react'
import { Container } from 'react-bootstrap'
export class Addtask extends Component {
    constructor(props) {
        super(props)
        this.state = {
             task:"",priority:""
        }
    }


    handler = (event) =>{
        event.preventDefault()
        const {name,value} = event.target

        this.setState({[name]:value})
        console.log(value)
    }


    //for adding task
    addTask = () =>{
        let data = {"task":this.state.task,"priority":this.state.priority,"status":false}
        let todoData = JSON.parse(localStorage.getItem('todolist')) || []
        todoData.push(data)
        console.log(todoData)
        localStorage.setItem('todolist',JSON.stringify(todoData))
        window.location.replace('/addtask')
        
    }
 //for deleting task
    deleteTask = (id) =>{
        let todoData = JSON.parse(localStorage.getItem('todolist'))
        todoData.splice(id,1)
        localStorage.setItem('todolist',JSON.stringify(todoData))
        window.location.replace('/addtask')

    }


    //for task completion
    completeTask = (id) =>{
        let todoData = JSON.parse(localStorage.getItem('todolist'))
        todoData[id].status="true"
        localStorage.setItem('todolist',JSON.stringify(todoData))
        window.location.replace('/addtask')

    }

    //logout
    logOut=()=>{
        window.location.replace('/')
    }
    
    //Login form
    render() {
        let tableData = JSON.parse(localStorage.getItem("todolist")) || []
        return (
            <div>
                <Container className="container pb-6 ">
                
               <Container className="container-fliud  mt-4  text-light" id="todo">
                    <h2 className="text-center text-warning">Todo List</h2>
                    <button  className="btn btn-danger" onClick={this.logOut}>LOG OUT</button>
                <div className="mb-3 mx-5 mt-5 w-50">
                <label className="form-label ">Task</label>
                <input type="text" className="form-control w-25" name="task" value={this.state.task} onChange={this.handler} />
                <select className="form-select w-25 my-3 " name="priority" onChange={this.handler} aria-label="Default select example">
                <option selected>Priority</option>
                <option value="Highest">Highest</option>
                <option value="High">High</option>
                <option value="Average">Average</option>
                <option value="Low">Low</option>
                <option value="Lowest">Lowest</option>
                </select>
                <br/>
                <button type="button" onClick={this.addTask} className="btn btn-primary my-3">Add Task</button>
                </div>

                <div className="table-data">
                    <table className="table">
                        <thead>
                            <tr className="bg-dark text-light">
                                <th>Sr No.</th>
                                <th>Task</th>
                                <th>Priority</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {tableData.map((values,index) =>(
                                <tr className="bg-dark text-light">
                                    <td>{index+1}</td>
                                    <td>{values.status === "true"?<strike>{values.task}</strike>:values.task}</td>
                                    <td>{values.priority}</td>
                                    <td>
                                        <button onClick={()=>this.completeTask(index)}  className="btn btn-success mx-2">Complete</button>
                                        <button onClick={()=>this.deleteTask(index)} className="btn btn-danger">Delete</button>

                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                </div>
                </Container>
                </Container>
            </div>
        )
    }
}

export default Addtask



