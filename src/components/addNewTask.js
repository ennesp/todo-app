import React from 'react';

class AddNewTask extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            inputText: ''
        }

        this.onInputTextChange = this.onInputTextChange.bind(this);
        this.handleAddingNewTask = this.handleAddingNewTask.bind(this);
    }

    render(){
        return (
            <form className="add-new-task" onSubmit={this.handleAddingNewTask}>
                <input type="text" id="task-name" value={this.state.inputText} placeholder="Add new task" onChange={this.onInputTextChange} />
                <button type="submit" >+</button>
            </form>
        );
    }

    onInputTextChange(e){
        this.setState({inputText: e.target.value});
    }

    handleAddingNewTask(e){
        e.preventDefault();
        const task = document.getElementById('task-name');
        if(task.value == ''){
            return;
        }
        this.props.addNewTask(task.value);
        this.setState({inputText: ''});
    }

}

export default AddNewTask;
