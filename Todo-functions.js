// Get all todos from localStorage
const getTodos = function(){
    let todos = localStorage.getItem('todos')
    if(todos === null){
        return []
    } else{
        return JSON.parse(todos)
    }
}

// Get completed todos number
const getCompletedTodosNum = function(arr){
    let num = 0
    arr.forEach(function(todo){
        if(todo.completed){
            ++num
        }
    })
    return num
}

// show up all todos on screen after getting them out of the local storage
const renderTodos = function(){
    todoList.innerHTML = ''
    todoArr.forEach((element, index) => {
        todoList.appendChild(createDOM(element, index))
    })
    completedTasksNum.textContent = getCompletedTodosNum(todoArr)
    taskNum.textContent = todoArr.length - getCompletedTodosNum(todoArr)
}

// Create DOM
const createDOM = function(element, index){
    // Todo item main container.
    const todoElement = document.createElement('div')
    todoElement.classList.add('todoItem')

    // Checkbox for completed todos.
    const checkboxContainer = document.createElement('span')
    checkboxContainer.classList.add('completed')

    // Checkbox input
    const checkbox = document.createElement('input')
    checkbox.setAttribute('type', 'checkbox')
    checkbox.classList.add('completedchck')
    checkbox.checked = element.completed
    
    checkboxContainer.appendChild(checkbox)
    todoElement.appendChild(checkboxContainer)
    
    // Todo text span
    const todoText = document.createElement('span')
    todoText.classList.add('todoText')
    if(element.text.length>0){
        todoText.textContent = element.text
    } else {
        todoText.textContent = 'Undefined'
    }
    
    checkbox.addEventListener('change', function(){
        todoArr[index].completed = (!todoArr[index].completed)
        saveChanges(todoArr)   // Save changes to local storage
        renderTodos()
    })

    todoElement.appendChild(todoText)

    // Delete button span
    const del = document.createElement('span')
    del.classList.add('deleteBtn')
    del.innerHTML = '<i class="fas fa-trash"></i>'
    
    del.addEventListener('click', function() {
        removeTodo(index)
    })

    todoElement.appendChild(del)

    return todoElement
}


// remove all todos
const clearAll = function(){
    todoArr = []
    localStorage.clear('todos')
    renderTodos()
}

// remove todo once click on the delete button
const removeTodo = function(index){
    todoArr.splice(index, 1)
    saveChanges(todoArr)
    renderTodos()
}

// Save any changes happened to todoArr list
const saveChanges = function(todoArr){
    localStorage.setItem('todos', JSON.stringify(todoArr))
}