import React, { Component } from 'react';
import testTodoListData from './TestTodoListData.json'
import HomeScreen from './components/home_screen/HomeScreen'
import ItemScreen from './components/item_screen/ItemScreen'
import ListScreen from './components/list_screen/ListScreen'
import {jsTPS} from "./lib/jsTPS.js"
import {NameChangeTransaction, OwnerChangeTransaction} from "./Transactions.js"

const AppScreen = {
  HOME_SCREEN: "HOME_SCREEN",
  LIST_SCREEN: "LIST_SCREEN",
  ITEM_SCREEN: "ITEM_SCREEN"
}

const ItemSortCriteria = {
  SORT_BY_TASK_INCREASING: "sort_by_task_increasing",
  SORT_BY_TASK_DECREASING: "sort_by_task_decreasing",
  SORT_BY_DUE_DATE_INCREASING: "sort_by_due_date_increasing",
  SORT_BY_DUE_DATE_DECREASING: "sort_by_due_date_decreasing",
  SORT_BY_STATUS_INCREASING: "sort_by_status_increasing",
  SORT_BY_STATUS_DECREASING: "sort_by_status_decreasing"
};

let tps = new jsTPS()

class App extends Component {
  state = {
    currentScreen: AppScreen.HOME_SCREEN,
    todoLists: testTodoListData.todoLists,
    currentList: null,
    itemScreen: "",
    todoItem: null,
    currentItemSortCriteria: "",
  }

  handleChangeName(event) {
    const newName = event.target.value
    const oldName = this.state.currentList.name
    tps.addTransaction(new NameChangeTransaction(newName, oldName, this))
    // this.setState(prevState => {
    //   let updatedTodoLists = prevState.todoLists
    //   let currentList = prevState.currentList
    //   for(let i=0; i<updatedTodoLists.length; i++){
    //     if(updatedTodoLists[i].key === currentList.key){
    //       updatedTodoLists[i].name = newName
    //       break;
    //     }
    //   }
    //   return {
    //     todoLists: updatedTodoLists
    //   }
    // })
  }

  handleChangeOwner(event) {
    const newOwner = event.target.value
    const oldOwner = this.state.currentList.owner
    tps.addTransaction(new OwnerChangeTransaction(newOwner, oldOwner, this))
    // this.setState(prevState => {
    //   let updatedTodoLists = prevState.todoLists
    //   let currentList = prevState.currentList
    //   for(let i=0; i<updatedTodoLists.length; i++){
    //     if(updatedTodoLists[i].key === currentList.key){
    //       updatedTodoLists[i].owner = newOwner
    //       break;
    //     }
    //   }
    //   return {
    //     todoLists: updatedTodoLists
    //   }
    // })
  }

  handleKeyPress(e) {
    if (e.keyCode === 90 && e.ctrlKey) { // control + z
        console.log(tps.getSummary())
        tps.undoTransaction()
        console.log(tps.getSummary())
    }
    else if(e.keyCode === 89 && e.ctrlKey) { // control + y
        console.log(tps.getSummary())
        tps.doTransaction()
        console.log(tps.getSummary())
    }
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
    if(event.target.className.includes("disabled")){
      return
    }
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
    if(event.target.className.includes("disabled")){
      return
    }
    // console.log(todoList)
    // console.log(key)
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

  /**
   * This method sorts the todo list items according to the provided sorting criteria.
   * 
   * @param {ItemSortCriteria} sortingCriteria Sorting criteria to use.
   */
  sortTasks(sortingCriteria) {
    this.setState({
      currentItemSortCriteria: sortingCriteria
    })
    this.setState(prevState=>{
      prevState.currentList.items.sort(this.compare.bind(this))
      let updatedTodoLists = prevState.todoLists
      for(let i=0; i<updatedTodoLists.length; i++){
        if(updatedTodoLists[i].key===prevState.currentList) {
          updatedTodoLists[i] = prevState.currentList
        }
      }
    })

    // alert("Sorted!!!");
  }

  /**
   * This method tests to see if the current sorting criteria is the same as the argument.
   * 
   * @param {ItemSortCriteria} testCriteria Criteria to test for.
   */
  isCurrentItemSortCriteria(testCriteria) {
      return this.state.currentItemSortCriteria === testCriteria;
  }

  compare(item1, item2) {

      // IF IT'S A DECREASING CRITERIA SWAP THE ITEMS
      if (this.isCurrentItemSortCriteria(ItemSortCriteria.SORT_BY_TASK_DECREASING)
          || this.isCurrentItemSortCriteria(ItemSortCriteria.SORT_BY_DUE_DATE_DECREASING)
          || this.isCurrentItemSortCriteria(ItemSortCriteria.SORT_BY_STATUS_DECREASING)) {
          let temp = item1;
          item1 = item2;
          item2 = temp;
      }
      // SORT BY ITEM DESCRIPTION
      if (this.isCurrentItemSortCriteria(ItemSortCriteria.SORT_BY_TASK_INCREASING)
          || this.isCurrentItemSortCriteria(ItemSortCriteria.SORT_BY_TASK_DECREASING)) {
          if (item1.description < item2.description)
              return -1;
          else if (item1.description > item2.description)
              return 1;
          else
              return 0;
      }

      // SORT BY DUE DATE
      if (this.isCurrentItemSortCriteria(ItemSortCriteria.SORT_BY_DUE_DATE_INCREASING)
          || this.isCurrentItemSortCriteria(ItemSortCriteria.SORT_BY_DUE_DATE_DECREASING)) {
          if (item1.due_date < item2.due_date)
              return -1;
          else if (item1.due_date > item2.due_date)
              return 1;
          else
              return 0;
      }

      // SORT BY COMPLETED
      else {
          if (item1.completed < item2.completed)
              return -1;
          else if (item1.completed > item2.completed)
              return 1;
          else
              return 0;
      }
  }

  /**
     * This function is called in response to when the user clicks
     * on the Task header in the items table.
     */
    processSortItemsByTask() {
      // IF WE ARE CURRENTLY INCREASING BY TASK SWITCH TO DECREASING
      if (this.isCurrentItemSortCriteria(ItemSortCriteria.SORT_BY_TASK_INCREASING)) {
          this.sortTasks(ItemSortCriteria.SORT_BY_TASK_DECREASING);
      }
      // ALL OTHER CASES SORT BY INCREASING
      else {
          this.sortTasks(ItemSortCriteria.SORT_BY_TASK_INCREASING);
      }
  }

  processSortItemsByDueDate() {
      // IF WE ARE CURRENTLY INCREASING BY DUE DATE SWITCH TO DECREASING
      if (this.isCurrentItemSortCriteria(ItemSortCriteria.SORT_BY_DUE_DATE_INCREASING)) {
          this.sortTasks(ItemSortCriteria.SORT_BY_DUE_DATE_DECREASING);
      }
      // ALL OTHER CASES SORT BY INCREASING
      else {
          this.sortTasks(ItemSortCriteria.SORT_BY_DUE_DATE_INCREASING);
      }
  }

  /**
   * This function is called in response to when the user clicks
   * on the Status header in the items table.
   */
  processSortItemsByStatus() {
      // IF WE ARE CURRENTLY INCREASING BY STATUS SWITCH TO DECREASING
      if (this.isCurrentItemSortCriteria(ItemSortCriteria.SORT_BY_STATUS_INCREASING)) {
          this.sortTasks(ItemSortCriteria.SORT_BY_STATUS_DECREASING);
      }
      // ALL OTHER CASES SORT BY INCRASING
      else {
          this.sortTasks(ItemSortCriteria.SORT_BY_STATUS_INCREASING);
      }
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
          processSortItemsByTask={this.processSortItemsByTask.bind(this)}
          processSortItemsByDueDate={this.processSortItemsByDueDate.bind(this)}
          processSortItemsByStatus={this.processSortItemsByStatus.bind(this)}
          handleKeyPress={this.handleKeyPress}
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