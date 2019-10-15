import React, { Component } from 'react'
import ListHeading from './ListHeading'
import ListItemsTable from './ListItemsTable'
import ListTrash from './ListTrash'
import ListModal from "./ListModal"
import PropTypes from 'prop-types';
import add from "../../images/AddItem.png"

export class ListScreen extends Component {
    // state = {
    //     showModal: false,
    // }

    componentDidMount() {
        document.addEventListener('keydown', this.props.handleKeyPress);
    }
    
    componentWillUnmount() {
        document.removeEventListener('keydown', this.props.handleKeyPress);
    }

    // toggleModal() {
    //     // alert("clicked!");
    //     this.setState(prevState => ({
    //         showModal: !prevState.showModal
    //     }));
    // }

    getListName() {
        if (this.props.todoList) {
            let name = this.props.todoList.name;
            return name;
        }
        else
            return "";
    }
    getListOwner() {
        if (this.props.todoList) {
            let owner = this.props.todoList.owner;
            return owner;
        }
        else
            return "";
    }
    render() {
        return (
            <div id="todo_list">
                <ListHeading goHome={this.props.goHome} />
                <ListTrash onClick={this.props.toggleModal}/>
                <div id="list_details_container">
                    <div id="list_details_name_container" className="text_toolbar">
                        <span id="list_name_prompt">Name:</span>
                        <input 
                            value={this.getListName()} 
                            type="text" 
                            id="list_name_textfield" 
                            onChange={this.props.handleChangeName}/>
                    </div>
                    <div id="list_details_owner_container" className="text_toolbar">
                        <span id="list_owner_prompt">Owner:</span>
                        <input 
                            value={this.getListOwner()}
                            type="text" 
                            id="list_owner_textfield" 
                            onChange={this.props.handleChangeOwner}/>
                    </div>
                </div>
                <ListItemsTable 
                    todoList={this.props.todoList}
                    handleClickUp={this.props.handleClickUp}
                    handleClickDown={this.props.handleClickDown}
                    handleClickRemove={this.props.handleClickRemove}
                    handleEditItem={this.props.handleEditItem}
                    processSortItemsByTask={this.props.processSortItemsByTask}
                    processSortItemsByDueDate={this.props.processSortItemsByDueDate}
                    processSortItemsByStatus={this.props.processSortItemsByStatus}
                />
                <div className="list_item_add_card">
                    <img id="list_item_add_card" src={add} onClick={()=>this.props.handleCreateItem(this.props.todoList)}></img>
                </div>
                <ListModal 
                    showModal={this.props.showModal}
                    handleClickYes={this.props.handleClickYes}
                    handleClickNo={this.props.handleClickNo} />
            </div>
        )
    }
}

export default ListScreen
