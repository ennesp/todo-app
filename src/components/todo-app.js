import React, { Component } from 'react';

import AddNewTask from './addNewTask';
import TaskList from './taskList';

var TASKS = [];

if(localStorage["todoTasks"]){
    TASKS = JSON.parse(localStorage["todoTasks"]);
    console.log('1');
}else{
    TASKS = [];
    console.log('2');
}

export default class TodoApp extends Component {
    constructor(props){
        super(props);

        this.state = {
            tasks: TASKS,
            error: ''
        };

        this.updateTaskList = this.updateTaskList.bind(this);
        this.updateTask = this.updateTask.bind(this);
        this.deleteTask = this.deleteTask.bind(this);
    }
    render() {
        return (
            <div className="app-container">
                <h1 className="title">Simple ToDo App</h1>

                <AddNewTask
                    addNewTask={this.updateTaskList} />
                <br/>
                {this.renderError()}
                <TaskList
                    tasks={TASKS}
                    onTaskChange={this.updateTask}
                    onTaskDelete={this.deleteTask} />
            </div>
        );
    }

    renderError(){
        if(!this.state.error){
            return;
        }

        return (
            <div className="error">
                <p>{this.state.error}</p>
            </div>
        );
    }

    updateTaskList(task){
        if(TASKS.filter((t) => t.taskTitle.toLowerCase() === task.toLowerCase()).length > 0) {
            this.setState({error: 'Task already exists.'});
            return;
        }
        TASKS.push({taskTitle: task, taskCompleted: false});
        this.setState({tasks: TASKS});
        this.setState({error: null});
        localStorage["todoTasks"] = JSON.stringify(TASKS);
    }

    updateTask(task, newTitle){
        const i = this.state.tasks.findIndex((obj) => obj.taskTitle===task.taskTitle);
        const title = newTitle;
        if(!newTitle){
            newTitle = task.taskTitle;
            TASKS[i].taskCompleted = !TASKS[i].taskCompleted;
            this.setState({tasks: TASKS});
            localStorage["todoTasks"] = JSON.stringify(TASKS);
        }

        if(task.taskTitle == newTitle){
            return;
        }

        if(title && TASKS.filter((t) => t.taskTitle.toLowerCase() === newTitle.toLowerCase()).length > 0) {
            this.setState({error: 'Task already exists.'});
            return;
        }

        TASKS[i].taskTitle = newTitle;
        this.setState({tasks: TASKS});
        this.setState({error: null});
        localStorage["todoTasks"] = JSON.stringify(TASKS);
    }

    deleteTask(task){
        const i = this.state.tasks.findIndex((obj) => obj.taskTitle===task.taskTitle);

        TASKS.splice(i, 1);
        localStorage["todoTasks"] = JSON.stringify(TASKS);
        this.setState({tasks: TASKS});
        console.log(TASKS);

    }
}
