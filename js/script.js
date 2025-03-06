let inputElem = document.querySelector('input')
let adding = document.querySelector('.add')
let todosElem = document.querySelector('.todos')
let deleteValue = document.querySelector('.delete__all')
let complate = document.querySelector('.complate')

let todos = []
adding.addEventListener('click', add__todo)
function add__todo(){
    let newTodoObg = {
        id : todos.length + 1,
        title : inputElem.value,
        complate : 'complete'
    }
    todos.push(newTodoObg)
    make__todo(todos)
    setlocalstrage(todos)
    // console.log(todos)

    inputElem.value = ''
}

function setlocalstrage(todoList){
    localStorage.setItem("todo", JSON.stringify(todoList))
}

function make__todo(List){
    // console.log(List)
    todosElem.innerHTML = ''

    List.forEach(function(obg){
        console.log(obg)

        let newDiv = document.createElement('div')
        newDiv.classList = 'todo__item'

        let newP = document.createElement('p')
        newP.innerHTML = obg.title
        newP.classList = obg.complate

        let newButtonTodo = document.createElement('div')
        newButtonTodo.classList = 'button__todo'

        let newComplateButton = document.createElement('button')
        newComplateButton.innerHTML = obg.complate
        newComplateButton.classList = 'complate'
        newComplateButton.setAttribute('onclick', 'complate__todo(' + obg.id + ')')

        let newDeleteButton = document.createElement('button')
        newDeleteButton.innerHTML = 'Delete'
        newDeleteButton.classList = 'delete'
        newDeleteButton.setAttribute('onclick', 'remove__todo(' + obg.id + ')')

        newButtonTodo.appendChild(newComplateButton)
        newButtonTodo.appendChild(newDeleteButton)

        newDiv.appendChild(newP)
        newDiv.appendChild(newButtonTodo)

        todosElem.appendChild(newDiv)
    })
}

function complate__todo(id){
    console.log(id)
    // let todoArray = JSON.parse(localStorage.getItem('todo'))
    const index = todos.findIndex(todo => todo.id === id)
    console.log(todos[index].complate)
    if (todos[index].complate === 'complete') {
        todos[index].complate = 'uncomplete';
        console.log('Marked as uncomplete');
    } else if (todos[index].complate === 'uncomplete') {
        todos[index].complate = 'complete';
        console.log('Marked as complete');
    }
    
    make__todo(todos)
    setlocalstrage(todos)
}

function remove__todo(id){
    // console.log(id)
    const index = todos.findIndex(todo => todo.id === id)
    console.log(todos[index])
    todos.splice(index, 1)

    make__todo(todos)
    setlocalstrage(todos)

}

window.addEventListener('load', local__todos)
function local__todos(){
    let localstrage__todos = JSON.parse(localStorage.getItem('todo'))
    if(localstrage__todos){
        todos = localstrage__todos
    }else{
        todos = []
    }

    make__todo(todos)
}

deleteValue.addEventListener('click', delete__todos)
function delete__todos(){
    todos = []
    make__todo(todos)
    localStorage.clear()
}