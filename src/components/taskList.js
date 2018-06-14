import React from 'react';
import SingleTask from './singleTask';

class TaskList extends React.Component {
    render(){
        const tasks = this.props.tasks.map((task, i) => {
            return <SingleTask
                task={task}
                onTaskChange={this.props.onTaskChange}
                onTaskDelete={this.props.onTaskDelete}
                key={i} />
        });

        return (
            <ul className="task-list">
                {tasks}
            </ul>
        );
    }
}

export default TaskList;
