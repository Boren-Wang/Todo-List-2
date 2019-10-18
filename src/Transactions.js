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

class UpTransaction extends jsTPS_Transaction {
    constructor(todoList, key, app) {
        super()
        this.todoList = todoList
        this.key = key
        this.app = app
    }

    doTransaction() {
        this.app.setState(prevState => {
            let items = this.todoList.items
            // console.log(items)
            for(let i=0; i<items.length; i++){
              if(items[i].key===this.key){
                this.app.swap(items, i, i-1)
                break;
              }
            }
            // console.log(items)
      
            let updatedTodoLists = prevState.todoLists
            for(let i=0; i<updatedTodoLists.length; i++){
              if(updatedTodoLists[i].key===this.todoList.key){
                updatedTodoLists[i]=this.todoList
              }
            }
      
            return {
              todoLists: updatedTodoLists
            }
          })
    }

    undoTransaction() {
        this.app.setState(prevState => {
            let items = this.todoList.items
            // console.log(items)
            for(let i=0; i<items.length; i++){
              if(items[i].key===this.key){
                this.app.swap(items, i, i+1)
                break;
              }
            }
            // console.log(items)
      
            let updatedTodoLists = prevState.todoLists
            for(let i=0; i<updatedTodoLists.length; i++){
              if(updatedTodoLists[i].key===this.todoList.key){
                updatedTodoLists[i]=this.todoList
              }
            }
      
            return {
              todoLists: updatedTodoLists
            }
        })
    }
}

class DownTransaction extends jsTPS_Transaction {
    constructor(todoList, key, app) {
        super()
        this.todoList = todoList
        this.key = key
        this.app = app
    }

    doTransaction() {
        this.app.setState(prevState => {
            let items = this.todoList.items
            // console.log(items)
            for(let i=0; i<items.length; i++){
              if(items[i].key===this.key){
                this.app.swap(items, i, i+1)
                break;
              }
            }
            // console.log(items)
      
            let updatedTodoLists = prevState.todoLists
            for(let i=0; i<updatedTodoLists.length; i++){
              if(updatedTodoLists[i].key===this.todoList.key){
                updatedTodoLists[i]=this.todoList
              }
            }
      
            return {
              todoLists: updatedTodoLists
            }
          })
    }

    undoTransaction() {
        this.app.setState(prevState => {
            let items = this.todoList.items
            // console.log(items)
            for(let i=0; i<items.length; i++){
              if(items[i].key===this.key){
                this.app.swap(items, i, i-1)
                break;
              }
            }
            // console.log(items)
      
            let updatedTodoLists = prevState.todoLists
            for(let i=0; i<updatedTodoLists.length; i++){
              if(updatedTodoLists[i].key===this.todoList.key){
                updatedTodoLists[i]=this.todoList
              }
            }
      
            return {
              todoLists: updatedTodoLists
            }
          })
    }
}

class RemoveTransaction extends jsTPS_Transaction {
    constructor(todoList, index, app) {
        super()
        this.todoList = todoList
        this.index = index
        this.app = app
        this.item = {}
    }

    doTransaction() {
        this.app.setState(prevState => {
            let items = this.todoList.items
            this.item = items[this.index]
            items.splice(this.index, 1)
            let updatedTodoLists = prevState.todoLists
            for(let i=0; i<updatedTodoLists.length; i++){
                if(updatedTodoLists[i].key===this.todoList.key){
                updatedTodoLists[i]=this.todoList
                }
            }

            return {
                todoLists: updatedTodoLists
            }
        })
    }

    undoTransaction() {
        this.app.setState(prevState => {
            let items = this.todoList.items
            items.splice(this.index, 0, this.item)
            let updatedTodoLists = prevState.todoLists
            for(let i=0; i<updatedTodoLists.length; i++){
                if(updatedTodoLists[i].key===this.todoList.key){
                updatedTodoLists[i]=this.todoList
                }
            }

            return {
                todoLists: updatedTodoLists
            }
        })
    }
}

class AddTransaction extends jsTPS_Transaction {
    constructor(item, app) {
        super()
        this.item = item
        this.app = app
    }

    doTransaction() {
        this.app.setState(prevState => {
            prevState.currentList.items.push(this.item)
            let updatedTodoLists = prevState.todoLists
            for(let i=0; i<updatedTodoLists.length; i++){
                if(updatedTodoLists[i].key === prevState.currentList.key){
                updatedTodoLists[i] = prevState.currentList
                break
                }
            }
            return {
                todoLists: updatedTodoLists
            }
        })
    }

    undoTransaction() {
        this.app.setState(prevState => {
            prevState.currentList.items.pop()
            let updatedTodoLists = prevState.todoLists
            for(let i=0; i<updatedTodoLists.length; i++){
                if(updatedTodoLists[i].key === prevState.currentList.key){
                updatedTodoLists[i] = prevState.currentList
                break
                }
            }
            return {
                todoLists: updatedTodoLists
            }
        })
    }
}

class EditTransaction extends jsTPS_Transaction {
    constructor(item, app) {
        super()
        this.newItem = item
        this.app = app
        this.oldItem = {}
    }

    doTransaction() {
        this.app.setState(prevState => {
            for(let i=0; i<prevState.currentList.items.length; i++){
                if(prevState.currentList.items[i].key===this.newItem.key){
                    this.oldItem = prevState.currentList.items[i]
                    prevState.currentList.items[i] = this.newItem
                    // console.log(item)
                    // console.log(prevState.currentList.items)
                    break
                }
            }
            
            let updatedTodoLists = prevState.todoLists
            for(let i=0; i<updatedTodoLists.length; i++){
              if(updatedTodoLists[i].key === prevState.currentList.key){
                updatedTodoLists[i] = prevState.currentList
                break
              }
            }
      
            return {
              todoLists: updatedTodoLists
            }
        })
    }

    undoTransaction() {
        this.app.setState(prevState => {
            for(let i=0; i<prevState.currentList.items.length; i++){
                if(prevState.currentList.items[i].key===this.newItem.key){
                    prevState.currentList.items[i] = this.oldItem
                    // console.log(item)
                    // console.log(prevState.currentList.items)
                    break
                }
            }
            
            let updatedTodoLists = prevState.todoLists
            for(let i=0; i<updatedTodoLists.length; i++){
              if(updatedTodoLists[i].key === prevState.currentList.key){
                updatedTodoLists[i] = prevState.currentList
                break
              }
            }
      
            return {
              todoLists: updatedTodoLists
            }
        })
    }
}

class SortTransaction extends jsTPS_Transaction {
  constructor(sortingCriteria, app) {
    super()
    this.sortingCriteria = sortingCriteria
    this.app = app
    this.oldItems = {}
  }

  doTransaction() {
    this.app.setState({
      currentItemSortCriteria: this.sortingCriteria
    })
    this.app.setState(prevState=>{
      this.oldItems = prevState.currentList.items.slice()
      // console.log(this.oldItems)
      prevState.currentList.items.sort(this.app.compare.bind(this.app))
      // console.log(prevState.currentList.items)
      let updatedTodoLists = prevState.todoLists
      for(let i=0; i<updatedTodoLists.length; i++){
        if(updatedTodoLists[i].key===prevState.currentList) {
          updatedTodoLists[i] = prevState.currentList
        }
      }
      return updatedTodoLists
    })
  }

  undoTransaction() {
    this.app.setState(prevState=>{
      prevState.currentList.items = this.oldItems.slice()
      let updatedTodoLists = prevState.todoLists
      for(let i=0; i<updatedTodoLists.length; i++){
        if(updatedTodoLists[i].key===prevState.currentList) {
          updatedTodoLists[i] = prevState.currentList
        }
      }
      return updatedTodoLists
    })
  }
}

export {
    NameChangeTransaction,
    OwnerChangeTransaction,
    UpTransaction,
    DownTransaction,
    RemoveTransaction,
    AddTransaction,
    EditTransaction,
    SortTransaction
}