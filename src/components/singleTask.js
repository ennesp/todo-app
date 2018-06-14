import React from 'react';

class SingleTask extends React.Component {
    constructor(props){
        super(props);

        this.onCheckboxChange = this.onCheckboxChange.bind(this);
        this.handleDeleteTask = this.handleDeleteTask.bind(this);
        this.isEditing = this.isEditing.bind(this);
        this.onTaskEdit = this.onTaskEdit.bind(this);

        this.state = {
            isEditing: false
        };

    }

    render(){
        return(
            <li>
                <input type="checkbox" id={this.props.task.taskTitle} onChange={this.onCheckboxChange} checked={this.props.task.taskCompleted} />
                <label htmlFor={this.props.task.taskTitle} ></label>
                {this.renderTitle()}

                {this.renderButtons()}
            </li>
        );
    }

    renderTitle(){
        if(this.state.isEditing){
            return(
                <form onSubmit={this.onTaskEdit}>
                    <input type="text" ref="taskTitle" defaultValue={this.props.task.taskTitle} />
                </form>
            );
        }else{
            return <h3 className={this.props.task.taskCompleted ? 'completed-task' : ''} >{this.props.task.taskTitle}</h3>;
        }
    }

    renderButtons(){
        if(this.state.isEditing){
            return(
                <div className="action-buttons form-buttons">
                    <button className="save-task" onClick={this.onTaskEdit}>Save</button>
                    <button className="cancel-task" onClick={this.isEditing}>Cancel</button>
                </div>

            );
        }else{
            return(
                <div className="action-buttons">
                    <button className="edit-task" onClick={this.isEditing}></button>
                    <button className="remove-task" onClick={this.handleDeleteTask}></button>
                </div>
            );
        }
    }

    onTaskEdit(e){
        e.preventDefault();
        const newTitle = this.refs.taskTitle.value;
        this.props.onTaskChange(this.props.task, newTitle);
        this.setState({isEditing: !this.state.isEditing});
    }

    onCheckboxChange(e){
        //this.setState({completed: e.target.checked});
        this.props.onTaskChange(this.props.task);
    }

    handleDeleteTask(task){
        this.props.onTaskDelete(this.props.task);
    }

    isEditing(){
        this.setState({isEditing: !this.state.isEditing});
    }
}

export default SingleTask;
