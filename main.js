// getting all required elements
const inputBox = document.querySelector('.inputField input')
const addBtn = document.querySelector('.inputField button')
const todoList = document.querySelector('.todoList')
const clearBtn = document.querySelector('footer button')
const taskNum = document.querySelector('.tasksNum')
const completedTasksNum = document.querySelector('.CompletedTasks')

// get todos from local storage
let todoArr = getTodos()

// Render todos on the screen
renderTodos()

// Set the max letters entered in the input field.
inputBox.setAttribute('maxlength', '50')
inputBox.setAttribute('placeholder', 'Add your new todo (Max 50 letter)')
// In the mobile devices the maxlength and placeholder attributes will be overrided.
if(window.innerWidth<=500){
    inputBox.setAttribute('maxlength', '30')
    inputBox.setAttribute('placeholder', 'Add your new todo (Max 30 letter)')
}

// Add new todo
addBtn.addEventListener('click', function(){
    let userData = inputBox.value
    if(userData.trim()!=0){
        todoArr.push({
            id: uuidv4(),
            text: userData,
            completed: false
        })
        localStorage.setItem('todos', JSON.stringify(todoArr))
        renderTodos()
    }
    inputBox.value = ''
})

clearBtn.addEventListener('click', function(){
    clearAll()
})