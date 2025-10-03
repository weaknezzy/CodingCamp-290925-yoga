//array untuk menampung todo
let todos = [];
function addTodo() { 

    //mendapatkan value dari form
    const todoInput = document.getElementById("todo-input");
    const todoDate = document.getElementById("todo-date");

    //validasi input
    if (validateInput (todoInput.value, todoDate.value)) {
        let todo = {nama: todoInput.value, tanggal: todoDate.value};
        todos.push(todo);
        console.log(todos);

    //perbarui todo list
    renderTodo();
    }
}

//Fungsi menambah todo dari form
function renderTodo() { 

    //mendapatkan id todo-list
    const todoList = document.getElementById("todo-list");

    //mengosongkan todo-list
    todoList.innerHTML = "";
    
    //menambahkan todo
    todos.forEach((todo,index) => {
        todoList.innerHTML += `<li class="border p-2 mb-2 flex justify-between items-center">
            <div>
                <p class="font-bold">${todo.nama}</p>
                <p class="text-sm text-gray-500">${todo.tanggal}</p>
            </div>
            <button type="button" onclick ="deleteTodo(${index})" class="bg-red-500 rounded text-white p-1">Hapus</button>
        </li>`;
    });
}


function deleteAllTodo() { 
    todos = [];
    
    renderTodo();
}

function filterTodo() { }

//validasi input
function validateInput(todo, date) { 
    //cek jika input kosong
    if (todo === '' || date === '') {
        //jika kosong tampilkan alert
        alert("Isi dengan lengkap dahulu form nya!");
        return false;
    }
    //jika tidak kosong maka diproses
    return true;
}