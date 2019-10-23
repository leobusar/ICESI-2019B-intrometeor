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

    render() {
        return (
            <div className="container">
                <header>
                    <h1> ToDo List</h1>
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
        tasks: TasksCollection.find({}).fetch(),
    }
})(App)
