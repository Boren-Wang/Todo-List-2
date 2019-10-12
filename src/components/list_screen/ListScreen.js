import React, { Component } from 'react'
import ListHeading from './ListHeading'
import ListItemsTable from './ListItemsTable'
import ListTrash from './ListTrash'
import ListModal from "./ListModal"
import PropTypes from 'prop-types';
import add from "../../images/AddItem.png"

export class ListScreen extends Component {
    state = {
        showModal: false,
    }
    toggleModal() {
        // alert("clicked!");
        this.setState(prevState => ({
            showModal: !prevState.showModal
        }));
    }
    handleClickNo() {
        // alert("Clicked!")
        this.setState({showModal: false})
    }

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
                <ListTrash onClick={this.toggleModal.bind(this)}/>
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
                />
                <div className="list_item_add_card">
                    <img id="list_item_add_card" src={add} onClick={()=>this.props.handleCreateItem(this.props.todoList)}></img>
                </div>
                <ListModal 
                    showModal={this.state.showModal}
                    handleClickYes={this.props.handleClickYes}
                    handleClickNo={this.handleClickNo.bind(this)} />
            </div>
        )
    }
}

export default ListScreen
