import React from 'react';
import './index.css';

export default class ToDoList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            input: "",
            items: [],
            isCompleted: 0
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({
            input: event.target.value
        });
    }

    handleSubmit(event) {
        event.preventDefault();
        if (this.state.input === "") {
            return;
        }

        this.setState({
            input: "",
            items: [...this.state.items, {name: this.state.input, isCompleted: false}]
        });
    }

    isMoreThanOneTask(taskCount) {
        let item;
        if (taskCount === 1) {
            item = "item";
        } else {
            item = "items";
        }
        return item;
    }

    getActionButtons() {
        const taskCount = this.state.items.length;
        const activeTaskCount = this.getActiveItems().length;

        if (taskCount > 0) {
            return <div className="mr_action">
                <div className="mr_itemCount" >{activeTaskCount} {this.isMoreThanOneTask(activeTaskCount) } left</div>
                <div className="mr_actionButtons">
                    <button className="mr_actionButton" onClick={() => this.setState({isCompleted: 0})}>All</button>
                    <button className="mr_actionButton" onClick={() => this.setState({isCompleted: 2})}>Active</button>
                    <button className="mr_actionButton" onClick={() => this.setState({isCompleted: 1})}>Completed</button>
                </div>
                {this.isCompletedTask()}
            </div>
        }
    }

    isCompletedTask() {
        if (this.getCompletedItems().length > 0) {
            return <button className="mr_clearCompleted" onClick={() => this.clearCompletedTasks()}>Clear completed</button>
        }
    }

    clearCompletedTasks() {
        this.setState({
            items: this.state.items.filter(item => {
                return !item.isCompleted;
            })
        });
    }

    getActiveItems() {
        return this.state.items.filter(item => {
            return !item.isCompleted;
        });
    }

    getCompletedItems() {
        return this.state.items.filter(item => {
            return item.isCompleted;
        });
    }

    getItems() {
        if (this.state.isCompleted === 0 ) {
            return this.state.items;
        } else if (this.state.isCompleted === 1) {
            return this.getCompletedItems();
        } else {
            return this.getActiveItems();
        }
    }

    closeTask(index) {
        this.state.items.splice(index, 1);

        this.setState({
            items: this.state.items
        });
    }

    cloneItems() {
        return JSON.parse(JSON.stringify(this.state.items))
    }

    toggleCompletedTask(index) {
        const items = this.cloneItems();
        items[index].isCompleted = !items[index].isCompleted;

        this.setState({
            items
        });
    }

    getTask() {
        return this.getItems().map((item, index) => {
            return <li className="mr_item" key={index} >
                <input className="mr_toggleItem"  type="checkbox" readOnly checked={item.isCompleted} id={index} onClick={() => {this.toggleCompletedTask(index)}}/>
                <label className="mr_taskName" htmlFor={index}><div>{item.name}</div></label>
                <button className="mr_closeTask" onClick={() => this.closeTask(index)}/>
            </li>
        });
    }

    toggleAllTasks(isCompleted) {
        const items = this.cloneItems();
        items.forEach(item => item.isCompleted = isCompleted);

        this.setState({
            items
        });
    }

    chooseAllTasks() {
        if (this.getActiveItems().length > 0){
            this.toggleAllTasks(true);
        } else {
            this.toggleAllTasks(false);
        }
    }

    isChecked() {
        return this.state.items.length > 0 && this.getActiveItems().length === 0;
    }

    getToggleAllButton() {
        if (this.state.items.length > 0) {
            return <div>
                <input className="mr_toggleAllItem" id="toggle-all" type="checkbox" readOnly checked={this.isChecked()} onClick={() => this.chooseAllTasks()} />
                <label htmlFor="toggle-all"/>
            </div>
        }
    }

    render() {
        return (
            <div className="mr_list">
                <div className="mr_listHeader">todos</div>
                <div className="mr_toDo">
                    {this.getToggleAllButton()}
                    <form className="mr_toDoField" autoComplete="off" onSubmit={this.handleSubmit}>
                        <input className="mr_newTask" id="toggle" placeholder="What needs to be done?" value={this.state.input} onChange={this.handleChange} />
                    </form>

                    <ul>
                        {this.getTask()}
                    </ul>
                    {this.getActionButtons()}
                </div>
            </div>
        );
    }
}
