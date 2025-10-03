//array untuk menampung todo
let todos = [];
function addTodo() { 

    //mendapatkan value dari form
    const todoInput = document.getElementById("todo-input");
    const todoDate = document.getElementById("todo-date");
    const todoListBody = document.getElementById('todo-list-body');


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
    const todoList = document.getElementById("todo-list-body");

    //mengosongkan todo-list
    todoList.innerHTML = "";
    
    //menambahkan todo ke table
    todos.forEach((todo,index) => {
        todoList.innerHTML += `<tr class="hover:bg-slate-600 transition duration-150 ">
            
            <td class="px-3 py-4 whitespace-nowrap font-medium text-slate-200">
                ${todo.nama}
            </td>
            
            <td class="px-3 py-4 whitespace-nowrap text-sm text-slate-400">
                ${todo.tanggal}
            </td>
            
            <td class="px-3 py-4 whitespace-nowrap">
                <span class="bg-yellow-600 text-white text-xs font-bold px-2 py-1 rounded-full">
                    Pending 
                </span>
            </td>
            
            <td class="px-3 py-4 whitespace-nowrap">
                <button 
                    type="button" 
                    onclick="deleteTodo(${index})" 
                    class="bg-red-500 hover:bg-red-600 transition duration-150 rounded text-white text-xs px-2 py-1">
                    Hapus
                </button>
                <button 
                    type="button" 
                    onclick="deleteTodo(${index})" 
                    class="bg-yellow-500 hover:bg-yellow-600 transition duration-150 rounded text-white text-xs px-2 py-1">
                    Edit
                </button>
                 <button 
                    type="button" 
                    onclick="deleteTodo(${index})" 
                    class="bg-green-500 hover:bg-green-600 transition duration-150 rounded text-white text-xs px-2 py-1">
                    Selesaikan
                </button>
            </td>
        </tr>
        `;
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