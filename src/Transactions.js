import {jsTPS, jsTPS_Transaction} from "./lib/jsTPS.js"
class NameChangeTransaction extends jsTPS_Transaction{
    constructor(newName, oldName, app) {
        super()
        this.newName = newName
        this.oldName = oldName
        this.app = app
    }

    doTransaction() {
        this.app.setState(prevState => {
            let updatedTodoLists = prevState.todoLists
            let currentList = prevState.currentList
            for(let i=0; i<updatedTodoLists.length; i++){
              if(updatedTodoLists[i].key === currentList.key){
                updatedTodoLists[i].name = this.newName
                break;
              }
            }
            return {
              todoLists: updatedTodoLists
            }
        })
    }

    undoTransaction() {
        this.app.setState(prevState => {
            let updatedTodoLists = prevState.todoLists
            let currentList = prevState.currentList
            for(let i=0; i<updatedTodoLists.length; i++){
              if(updatedTodoLists[i].key === currentList.key){
                updatedTodoLists[i].name = this.oldName
                break;
              }
            }
            return {
              todoLists: updatedTodoLists
            }
        })
    }

    getSummary() {
        return "Change name from " + this.oldName + " to " + this.newName;
    }
}

class OwnerChangeTransaction extends jsTPS_Transaction{
    constructor(newOwner, oldOwner, app) {
        super()
        this.newOwner = newOwner
        this.oldOwner = oldOwner
        this.app = app
    }

    doTransaction() {
        this.app.setState(prevState => {
            let updatedTodoLists = prevState.todoLists
            let currentList = prevState.currentList
            for(let i=0; i<updatedTodoLists.length; i++){
              if(updatedTodoLists[i].key === currentList.key){
                updatedTodoLists[i].owner = this.newOwner
                break;
              }
            }
            return {
              todoLists: updatedTodoLists
            }
        })
    }

    undoTransaction() {
        this.app.setState(prevState => {
            let updatedTodoLists = prevState.todoLists
            let currentList = prevState.currentList
            for(let i=0; i<updatedTodoLists.length; i++){
              if(updatedTodoLists[i].key === currentList.key){
                updatedTodoLists[i].owner = this.oldOwner
                break;
              }
            }
            return {
              todoLists: updatedTodoLists
            }
        })
    }

    getSummary() {
        return "Change owner from " + this.oldOwner + " to " + this.newOwner;
    }
}

export {
    NameChangeTransaction,
    OwnerChangeTransaction
}