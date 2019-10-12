import React, { Component } from 'react'
import ListItemCard from './ListItemCard'

export class ListItemsTable extends Component {
    render() {
        // console.log(this.props.todoList)
        return (
            <div id="list_items_container">
                <div className="list_item_header_card">
                    <div className="list_item_task_header">Task</div>
                    <div className="list_item_due_date_header">Due Date</div>
                    <div className="list_item_status_header">Status</div>
                </div>
                {
                    this.props.todoList.items.map((todoItem)=>(
                        <div onClick={()=>this.props.handleEditItem(todoItem)}>
                            <ListItemCard 
                                key={todoItem.key}
                                todoList={this.props.todoList}
                                listItem={todoItem}
                                handleClickUp={this.props.handleClickUp}
                                handleClickDown={this.props.handleClickDown}
                                handleClickRemove={this.props.handleClickRemove}
                            />
                        </div>     
                    ))
                }
            </div>
        )
    }
}

export default ListItemsTable
