import React, { Component } from 'react';
import testTodoListData from './TestTodoListData.json'
import HomeScreen from './components/home_screen/HomeScreen'
import ItemScreen from './components/item_screen/ItemScreen'
import ListScreen from './components/list_screen/ListScreen'

const AppScreen = {
  HOME_SCREEN: "HOME_SCREEN",
  LIST_SCREEN: "LIST_SCREEN",
  ITEM_SCREEN: "ITEM_SCREEN"
}

class App extends Component {
  state = {
    currentScreen: AppScreen.HOME_SCREEN,
    todoLists: testTodoListData.todoLists,
    currentList: null,
    itemScreen: "",
    todoItem: null
  }

  handleChangeName(event) {
    const newName = event.target.value
    this.setState(prevState => {
      let updatedTodoLists = prevState.todoLists
      let currentList = prevState.currentList
      for(let i=0; i<updatedTodoLists.length; i++){
        if(updatedTodoLists[i].key === currentList.key){
          updatedTodoLists[i].name = newName
          break;
        }
      }
      return {
        todoLists: updatedTodoLists
      }
    })
  }

  handleChangeOwner(event) {
    const newOwner = event.target.value
    this.setState(prevState => {
      let updatedTodoLists = prevState.todoLists
      let currentList = prevState.currentList
      for(let i=0; i<updatedTodoLists.length; i++){
        if(updatedTodoLists[i].key === currentList.key){
          updatedTodoLists[i].owner = newOwner
          break;
        }
      }
      return {
        todoLists: updatedTodoLists
      }
    })
  }

  handleClickYes() {
    this.setState(prevState => {
        let updatedTodoLists = prevState.todoLists
        for(let i=0; i<updatedTodoLists.length; i++){
            if(updatedTodoLists[i].key === prevState.currentList.key){
                updatedTodoLists.splice(i, 1)
            }
        }
        return {
            todoLists: updatedTodoLists
        }
    })
    this.goHome()
  }

  handleClickCreate() {
    let newList = {
        "key": this.state.todoLists.length,
        "name": "Unknown",
        "owner": "Unknown",
        "items": []
    }
    this.setState(prevState => {
      let updatedTodoLists = prevState.todoLists
      updatedTodoLists.unshift(newList)
      return {
        todoLists: updatedTodoLists
      }
    })
    this.loadList(newList)
  }

  handleClickUp(todoList, key, event) {
    // alert("clicked!")
    event.stopPropagation()
    this.setState(prevState => {
      let items = todoList.items
      console.log(items)
      for(let i=0; i<items.length; i++){
        if(items[i].key===key){
          this.swap(items, i, i-1)
          break;
        }
      }
      console.log(items)

      let updatedTodoLists = prevState.todoLists
      for(let i=0; i<updatedTodoLists.length; i++){
        if(updatedTodoLists[i].key===todoList.key){
          updatedTodoLists[i]=todoList
        }
      }

      return {
        todoLists: updatedTodoLists
      }
    })
  }

  handleClickDown(todoList, key, event) {
    // alert("clicked!")
    event.stopPropagation()
    console.log(todoList)
    console.log(key)
    this.setState(prevState => {
      let items = todoList.items
      // console.log(items)
      for(let i=0; i<items.length; i++){
        if(items[i].key===key){
          this.swap(items, i, i+1)
          break;
        }
      }
      // console.log(items)

      let updatedTodoLists = prevState.todoLists
      for(let i=0; i<updatedTodoLists.length; i++){
        if(updatedTodoLists[i].key===todoList.key){
          updatedTodoLists[i]=todoList
        }
      }

      return {
        todoLists: updatedTodoLists
      }
    })
  }

  swap(items, i, j) {
    const temp = items[i]
    items[i] = items[j]
    items[j] = temp
  }

  handleClickRemove(todoList, key, event) {
    // alert("clicked!")
    // console.log(todoList)
    // console.log(key)
    event.stopPropagation()
    this.setState(prevState => {
      let items = todoList.items
      for(let i=0; i<items.length; i++){
        if(items[i].key===key){
          items.splice(i, 1)
        }
      }

      // items=[]
      // todoList.items = []
      // items[0].description = "!!!"
      
      let updatedTodoLists = prevState.todoLists
      for(let i=0; i<updatedTodoLists.length; i++){
        if(updatedTodoLists[i].key===todoList.key){
          updatedTodoLists[i]=todoList
        }
      }

      return {
        todoLists: updatedTodoLists
      }
    })
  }

  handleCreateItem() {
    let item = {
      "key": this.state.currentList.items.length,
      "description": "",
      "due_date": "",
      "assigned_to": "",
      "completed": false
    }
    this.setState({
      itemScreen: "CREATE",
      todoItem: item
    })
    this.goItem()
  }
  
  handleEditItem(item) {
    // alert("clicked!")
    this.setState({
      itemScreen: "EDIT",
      todoItem: item
    })
    this.goItem()
  }

  handleSubmit(item) {
    this.setState(prevState => {
      if(prevState.itemScreen==="CREATE"){
        prevState.currentList.items.push(item)
      } else {
        for(let i=0; i<prevState.currentList.items.length; i++){
          if(prevState.currentList.items[i].key===item.key){
            prevState.currentList.items[i] = item
            // console.log(item)
            // console.log(prevState.currentList.items)
            break
          }
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
    this.loadList(this.state.currentList)
  }

  handleCancel() {
    this.loadList(this.state.currentList)
  }

  goHome = () => {
    this.setState({currentScreen: AppScreen.HOME_SCREEN});
    this.setState({currentList: null});
  }

  loadList = (todoListToLoad) => {
    this.setState({currentScreen: AppScreen.LIST_SCREEN});
    this.setState({currentList: todoListToLoad});
    console.log("currentList: " + this.state.currentList);
    console.log("currentScreen: " + this.state.currentScreen);
  }

  goItem() {
    this.setState({currentScreen: AppScreen.ITEM_SCREEN});
  }

  render() {
    switch(this.state.currentScreen) {
      case AppScreen.HOME_SCREEN:
        return <HomeScreen 
        loadList={this.loadList.bind(this)} 
        todoLists={this.state.todoLists}
        handleClickCreate={this.handleClickCreate.bind(this)} />;
      case AppScreen.LIST_SCREEN:            
        return <ListScreen
          goHome={this.goHome.bind(this)}
          todoList={this.state.currentList} 
          handleChangeName={this.handleChangeName.bind(this)}
          handleChangeOwner={this.handleChangeOwner.bind(this)}
          handleClickYes={this.handleClickYes.bind(this)}
          handleClickUp={this.handleClickUp.bind(this)}
          handleClickDown={this.handleClickDown.bind(this)}
          handleClickRemove={this.handleClickRemove.bind(this)}
          handleCreateItem={this.handleCreateItem.bind(this)}
          handleEditItem={this.handleEditItem.bind(this)}
          />;
      case AppScreen.ITEM_SCREEN:
        return <ItemScreen 
          itemScreen={this.state.itemScreen}
          todoItem={this.state.todoItem}
          handleSubmit={this.handleSubmit.bind(this)}
          handleCancel={this.handleCancel.bind(this)}
        />;
      default:
        return <div>ERROR</div>;
    }
  }
}

export default App;