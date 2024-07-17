const API_URL = "http://localhost:8080/api/todo";

document.addEventListener('DOMContentLoaded', () => {
    fetchTodos();
})

const fetchTodos = () => {
    fetch(API_URL)
    .then(response => response.json())
    .then(todos => {
        const todoList = document.getElementById("todos");
        todoList.innerHTML = '';
        todos.forEach( todo => {
            const todoItem = document.createElement("li");
            todoItem.innerHTML = `
            <span>${todo.title}</span>
            <span>Status: ${todo.status}</span>
            <span>Created Date: ${new Date(todo.createdDate).toLocaleString()}</span>
            <button onclick = "editTodo(${todo.id})">Edit</button>
            <button class="delete-button" onclick="deleteTodo(${todo.id})">Delete</button>`;
            todoList.appendChild(todoItem);
        })
    })
    .catch(error => {
        console.error('Error fetching data: ', error);
    })
}

const createOrUpdateTodo = () => {
    const id = document.getElementById("todoId").value;
    const title = document.getElementById("todoTitle").value;
    const description = document.getElementById("todoDescription").value;
    const status = document.getElementById("todoStatus").value;
    const createdDate = new Date().toISOString();

    const todo = {
        title,
        description,
        status,
        createdDate
        };

        if(id){
            fetch(`${API_URL}/${id}`, {
                method: "PUT",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(todo)
            })
            .then(response => response.json())
            .then(() => {
                document.getElementById('todoId').value = '';
                fetchTodos();
            })
            .catch(error => console.error("Error updating todo: ", error));
        } else {
            fetch(API_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(todo)
            })
            .then(response => response.json())
            .then(() => {
                fetchTodos();
            })
            .catch(error => console.error('Error creating todo: ', error));
        }
}

const editTodo = (id) => {
    fetch(`${API_URL}/${id}`)
    .then(response => response.json())
    .then(todo => {
        document.getElementById('todoId').value = todo.id;
        document.getElementById('todoTitle').value = todo.title;
        document.getElementById('todoDescription').value = todo.description;
        document.getElementById('todoStatus').value = todo.status;
    })
    .catch(error => console.error('Error fetching todo: ', error));
}

const deleteTodo = (id) => {
    fetch(`${API_URL}/${id}`, {
        method: 'DELETE'
    })
    .then(() => {
        fetchTodos();
    })
    .catch(error => console.log('Error deleting todos', error));
}