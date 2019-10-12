import React, { Component } from 'react'
import PropTypes from 'prop-types';

export class ItemScreen extends Component {
    constructor(props) {
        super(props)
        this.state={
            key: this.props.todoItem.key,
            description: this.props.todoItem.description,
            assigned_to: this.props.todoItem.assigned_to,
            due_date: this.props.todoItem.due_date,
            completed: this.props.todoItem.completed
        }
        this.handleChangeInput = this.handleChangeInput.bind(this)
    }

    handleChangeInput(event) {
        const{name, value, type} = event.target
        if(type==="checkbox"){
            this.setState(prevState => ({
                completed: !prevState.completed
            }))
        } else {
            this.setState({
                [name]: value
            })
        }
        
    }
    render() {
        // let description 
        // let assignedTo 
        // let dueDate 
        // let completed
        // if(this.props.itemScreen==="CREATE"){
        //     description = ""
        //     assignedTo = ""
        //     dueDate = ""
        //     completed = false
        // } else if(this.props.itemScreen==="EDIT"){
        //     description = ""
        //     assignedTo = ""
        //     dueDate = ""
        //     completed = false
        // }
        return (
            <div id="todo_item">
                <div id="item_heading">Item</div>
                <div id="item_form_container">
                    <label id="item_description_prompt" className="item_prompt">Description:</label>
                    <input id="item_description_textfield" name="description" className="item_input" type="text" value={this.state.description} onChange={this.handleChangeInput}></input>

                    <label id="item_assigned_to_prompt" className="item_prompt">Assigned To:</label>
                    <input id="item_assigned_to_textfield" name="assigned_to" className="item_input" type="text" value={this.state.assigned_to} onChange={this.handleChangeInput}></input>

                    <label id="item_due_date_prompt" className="item_prompt">Due Date:</label>
                    <input id="item_due_date_picker" name="due_date" className="item_input" type="date" value={this.state.due_date} onChange={this.handleChangeInput}></input>

                    <label id="item_completed_prompt" className="item_prompt">Completed:</label>
                    <div id="item_completed_checkbox_wrapper" className="item_input">
                        <input id="item_completed_checkbox" name="completed" type="checkbox" checked={this.state.completed} onChange={this.handleChangeInput}></input>
                    </div>

                    <button id="item_form_submit_button" onClick={()=>this.props.handleSubmit(this.state)}>Submit</button>
                    <button id="item_form_cancel_button" onClick={this.props.handleCancel}>Cancel</button>
                </div>
            </div>
        )
    }
}

ItemScreen.propTypes = {
    currentScreen: PropTypes.string.isRequired,
    todoItem: PropTypes.object.isRequired
}

export default ItemScreen
