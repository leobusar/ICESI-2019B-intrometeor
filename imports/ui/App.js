import React, { Component } from  'react';
import { withTracker } from  'meteor/react-meteor-data'
import { TasksCollection } from  '../api/tasks'
import Task from './components/Task'

class App extends Component {
/*    getTasks(){
        return [
            {_id: 1,  text: "Web Plus Project Schema"},
            {_id: 2,  text: "Web Plus Project Frontend"},
            {_id: 3,  text: "Web Plus Project Backend"}            
        ];
    }
*/
    renderTasks(){
 /*       return  this.getTasks().map( task => (
            <Task key={task._id} task={task} />
        ))
 */
            return this.props.tasks.map( task => (
                <Task key={task._id} task={task} />
            ))          
    }

    handleSubmit (e){
        e.preventDefault(); 

        let  text = this.refs.textInput.value.trim();
        TasksCollection.insert({
            text, 
            createAt: new Date(),
            status: false
        })
        this.refs.textInput.value =""
        console.log(text);
    }

    render() {
        return (
            <div className="container">
                <header>
                    <h1> ToDo List</h1>
                    <form className="newtask" onSubmit={this.handleSubmit.bind(this)}>
                        <input type="text" ref="textInput"
                                placeholder="Add new task" />
                    </form>
                </header>
                <ul>
                    {this.renderTasks()}
                </ul>
            </div>
        )
    }

}

//export default App;
export  default withTracker ( () => {
    return {
        tasks: TasksCollection.find({}, {sort: {createAt: -1}}).fetch(),
    }
})(App)