import React, { Component } from  'react';

class Task extends Component {

    render() {
        return (
            <li>
                {this.props.task.text}
            </li>
        )
    }
}

export default Task;