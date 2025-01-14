let sectionContainer = document.querySelector('.container');
let addTodoBtn = document.querySelector('.create-btn');
let todoForm = document.querySelector('.todo-list-container');
let closeTodoForm = document.querySelector('.close-btn');
let tableContainer = document.querySelector('.table-body-container');
let totalListItems = document.querySelector('.total-list');
let deleteForm = '';
let date = new Date();
let today = date.toLocaleDateString();

// Input validation
let todoInput = document.querySelectorAll('.todo-input');
let submitBtn = document.getElementById('todo-submit');

// Event Listeners
addTodoBtn.addEventListener('click', toggleForm);
closeTodoForm.addEventListener('click', closeForm)

// Functions

// Post list item to the server. 
submitBtn.addEventListener('submit', async (event) => {
    event.preventDefault();
    const url = 'http://localhost:3000/todo-items';
    let todoTitle = document.getElementById('todo-title').value;
    let todoDesc = document.getElementById('todo-desc').value;
    let dueDate = document.getElementById('todo-date').value;

    // Post
    if(todoTitle === '' || todoDesc === '' || dueDate === '')
        {
            alert('All Fields are required!');

        } else {

        let validTodoItems = {todoTitle: todoTitle, todoDesc: todoDesc,dueDate: dueDate };

        try {
            const response = await axios.post (url, validTodoItems)
                if (response) {
                    window.location.replace('http://127.0.0.1:5555/frontend/public/todo.html');
                    console.log(response);
                } 
            } catch (error) {
                console.log(error);
            }
// return products
    todoTitle.value = '';
    todoDesc.value = '';
    dueDate.value = '';
        };
});

// List items
const getListItems = () => {      
    // Fetch the data from the backend
    fetch('http://localhost:3000/todo-items').then((res) => res.json()).then((data) => {

        //Data is object with an Array FindDailyItem.
        let allItems = data.findDailyItem;
        createTodo(allItems);

        
        

        // if(allItems.length < 1)
        // {
        //     totalListItems.innerText = 'You have no Tasks'; // of list items.
        // } else if(allItems.length === 1)
        // {
        //     totalListItems.innerText = `${allItems.length} TASK`;
        // } else if(allItems.length > 1)
        // {
        //     totalListItems.innerText = `${allItems.length} TASKS`;
        // }








        
//         allItems.map((todoList) => {

// //         const allElements = () => {

// //             deleteForm = document.createElement('form');
// //             let editForm = document.createElement('form');

// //             let deleteBtn = document.createElement('button');
// //             let deleteIcon = document.createElement('i');

// //             let editBtn = document.createElement('button');
// //             let editIcon = document.createElement('a');
// //             // editIcon.setAttribute('');

// //             let divider = document.createElement('hr');
// //             let tableItemsContainer = document.createElement('div');
// //             let action = document.createElement('div');
// //             let tableItemsTitle = document.createElement('div');
// //             let tableItemsInfo = document.createElement('div');
// //             let todoTitle = document.createElement('strong');
// //             let todoDesc = document.createElement('strong');

// //             let dueDate = document.createElement('strong');
// //             let dateCreated = document.createElement('strong');

// // // Add Classes to the arrays
// //             // Buttons
// //             deleteBtn.setAttribute('submit', 'delete');
// //             deleteBtn.classList.add('delete-btn');
// //             deleteIcon.classList.add('material-icons');
// //             deleteIcon.innerText = 'delete';

// //             editBtn.setAttribute('submit', 'edit');
// //             editBtn.classList.add('edit-btn');
// //             editIcon.classList.add('material-icons');
// //             editIcon.innerText = 'edit';

// //             // Items
// //             divider.classList.add('container-divider');
// //             action.classList.add('action');
// //             tableItemsContainer.classList.add('table-items');
// //             tableItemsTitle.classList.add('table-items-title');
// //             tableItemsInfo.classList.add('table-items-info')
// //             todoTitle.classList.add('todo-title');
// //             todoDesc.classList.add('todo-desc');
// //             dueDate.classList.add('due-date');
            
// // // Append Elements to the container
// //             deleteBtn.append(deleteIcon)
// //             deleteForm.appendChild(deleteBtn);

// //             editBtn.append(editIcon)
// //             editForm.appendChild(editBtn);

// //             action.appendChild(deleteForm);
// //             action.appendChild(editForm);
// //             tableItemsTitle.appendChild(todoTitle);
// //             tableItemsTitle.appendChild(todoDesc);
// //             tableItemsInfo.appendChild(dateCreated);
// //             tableItemsInfo.appendChild(dueDate);

// //             tableItemsContainer.appendChild(action);
// //             tableItemsContainer.appendChild(tableItemsTitle);
// //             tableItemsContainer.appendChild(tableItemsInfo);
// //             tableContainer.appendChild(tableItemsContainer);
// //             tableContainer.appendChild(divider);

// //     //Iteration   
// //             todoTitle.innerText = todoList.todoTitle;
// //             todoDesc.innerText = todoList.todoDesc;
// //             dueDate.innerText = todoList.dueDate;
// //             dateCreated.innerText = today;
// //             };

//         allElements();
//         });

    });
};
const createTodo = (data) => {
    console.log(data);
    document.getElementById('todo-table').innerHTML += `<div class="todo-table-header">
    <div class="todo-table-header-title">
        <strong class="action">Action</strong>
        <strong class="title">Title</strong>
        <strong class="table-desc">Description</strong>
    </div>
    <div class="todo-table-header-items">
        <strong>Date Created
            <i class="material-icons">unfold_more</i>
        </strong>
        <strong>Due Date
            <i class="material-icons">unfold_more</i>
        </strong>
    </div>
</div>`;
    data.map((item) => {
        document.getElementById('table-body-container').innerHTML += `
        <div class="table-items">
            <div class="table-items-title">
                <div class="action">
                    <a href="edit.html?id=${ item._id }" >Edit</a>
                    <button onclick="removeItem('${item._id}')">Delete</button>
                </div>
                <p>${ item.todoTitle }</p>
                <p>${ item.todoDesc }</p>
            </div>

            <div class="table-items-info">
                <p>${ today }</p>
                <p>${ item.dueDate } </p>
            </div>
        </div>
        `
        

    });
}

const removeItem = (id) => {
    fetch('http://localhost:3000/todo-items/'+id, {
        method: 'DELETE',
    })
    .then(res => res.json())
    .then(res => console.log(res));
    location.reload();
}
// Form Modal
function toggleForm() {
    if(addTodoBtn)
    {
        todoForm.classList.add('open');
    } else
    {
        todoForm.classList.remove('open')
    }
   
}

// Close Modal
function closeForm() {
    if(closeTodoForm)
    {
        todoForm.classList.remove('open')
    } 
}


getListItems();
