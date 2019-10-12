import React, { Component } from 'react'
import up from "../../images/MoveUp.png"
import down from "../../images/MoveDown.png"
import remove from "../../images/RemoveItem.png"

export class ListItemCard extends Component {
    render() {
        // console.log(this.props.todoList)
        return (
            <div className='list_item_card'>
                <div className='list_item_card_description'>
                    {this.props.listItem.description}
                </div>
                <div className='list_item_card_assigned_to'>
                    Assigned To: <strong>{this.props.listItem.assigned_to}</strong>
                </div>
                <div className='list_item_card_due_date'>
                    {this.props.listItem.due_date}
                </div>
                <div className={this.props.listItem.completed ? "list_item_card_completed" : "list_item_card_not_completed"}>
                    {this.props.listItem.completed ? "Completed" : "Pending"}
                </div>

                <div className="list_item_card_toolbar">
                    <img className="list_item_card_button" src={up} onClick={(event) => this.props.handleClickUp(this.props.todoList, this.props.listItem.key, event)}></img>
                    <img className="list_item_card_button" src={down} onClick={(event) => this.props.handleClickDown(this.props.todoList, this.props.listItem.key, event)}></img>
                    <img className="list_item_card_button" src={remove} onClick={(event)=>this.props.handleClickRemove(this.props.todoList, this.props.listItem.key, event)}></img>
                </div> 
            </div>
        )
    }
}

export default ListItemCard
