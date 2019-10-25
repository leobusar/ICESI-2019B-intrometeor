import React, { Component } from  'react';
import { Meteor } from 'meteor/meteor'
import { TasksCollection } from '../../api/tasks'

class Task extends Component {

    toggleChecked(){
        console.log(this.props.task)
        // TasksCollection.update(this.props.task._id, 
        //         {$set: {status: !this.props.task.status}} )
        Meteor.call("task.update", this.props.task._id, !this.props.task.status )        
    }

    deleteTask(){
       // TasksCollection.remove(this.props.task._id)
       Meteor.call("task.remove", this.props.task._id )        
      
    }

    render() {
        const taskClass =  this.props.task.status? 'ended': '';

        return (
            <li className={taskClass+" my-3"}>
                <button className="btn btn-danger btn-sm mr-3" onClick={this.deleteTask.bind(this)}>
                    delete
                </button>

                <input type="checkbox" 
                    readOnly
                    checked= {!!this.props.task.status}
                    onClick= {this.toggleChecked.bind(this)}
                />
                <span > {this.props.task.text} </span>
            </li>
        )
    }
}

export default Task;