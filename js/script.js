//array untuk menampung todo
let todos = [];

function addTodo() { 
    //mendapatkan value dari form
    const todoInput = document.getElementById("todo-input");
    const todoDate = document.getElementById("todo-date");
    const todoListBody = document.getElementById('todo-list-body');
    
    //validasi input
    if (validateInput (todoInput.value, todoDate.value)) {
        let todo = {nama: todoInput.value, tanggal: todoDate.value, status: 'pending'};
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

    // TENTUKAN WARNA DAN TEKS BERDASARKAN STATUS
    let statusText;
    let statusClass;
        
    if (todo.status === 'completed') {
        statusText = 'Selesai';
        statusClass = 'bg-green-600'; // Warna hijau untuk selesai
    } else {
        statusText = 'Pending';
        statusClass = 'bg-yellow-600'; // Warna kuning untuk pending
    }

    // TENTUKAN LABEL TOMBOL
    const buttonText = todo.status === 'completed' ? 'Batalkan' : 'Selesaikan';
    const buttonClass = todo.status === 'completed' ? 'bg-orange-500 hover:bg-orange-600' : 'bg-green-500 hover:bg-green-600';
    const textDecorationClass = todo.status === 'completed' ? 'line-through text-slate-400' : '';

        todoList.innerHTML += `<tr id="todo-baris-${index}" class="hover:bg-slate-600 transition duration-150 ">
            
            <td class="px-3 py-4 whitespace-nowrap font-medium text-slate-200 ${textDecorationClass}">
                ${todo.nama}
            </td>
            
            <td class="px-3 py-4 whitespace-nowrap text-sm text-slate-400">
                ${todo.tanggal}
            </td>
            
            <td class="px-3 py-4 whitespace-nowrap">
                <span class="${statusClass} text-white text-xs font-bold px-2 py-1 rounded-full">
                    ${statusText} 
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
                    onclick="editTodo(${index})" 
                    class="bg-yellow-500 hover:bg-yellow-600 transition duration-150 rounded text-white text-xs px-2 py-1">
                    Edit
                </button>
                 <button 
                    type="button" 
                    onclick="toggleStatus(${index})" 
                    class="${buttonClass} hover:bg-green-600 transition duration-150 rounded text-white text-xs px-2 py-1">
                    ${buttonText}
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

function deleteTodo(index) {
    // 1. Validasi index
    if (index === undefined || index < 0 || index >= todos.length) {
        console.error("Index tugas tidak valid.");
        return; 
    }

    // 2. Hapus tugas dari array 'todos'
    // Metode splice(index, 1) menghapus 1 elemen mulai dari posisi 'index'
    todos.splice(index, 1);
    
    console.log(`Tugas pada index ${index} berhasil dihapus.`);

    // 3. Simpan array yang diperbarui ke Local Storage
    localStorage.setItem('todos', JSON.stringify(todos));

    // 4. Render ulang tabel
    renderTodo();
}

function editTodo(index) {
    //Dapatkan data tugas yang akan diedit
    const todoToEdit = todos[index]

    //Dapatkan elemen baris TR yang akan diubah
    const row = document.getElementById(`todo-baris-${index}`);

    //Periksa apakah baris ditemukan
    if (!row) return;

    //Ubah konten baris menjadi mode edit

    row.innerHTML = `
      <td class="px-3 py-4">
            <input type="text" id="edit-nama-${index}" 
                   value="${todoToEdit.nama}" 
                   class="bg-slate-800 border border-orange-400 text-slate-200 rounded p-1 w-full">
        </td>
        
        <td class="px-3 py-4">
            <input type="date" id="edit-tanggal-${index}" 
                   value="${todoToEdit.tanggal}" 
                   class="bg-slate-800 border border-orange-400 text-slate-200 rounded p-1 w-full">
        </td>
        
        <td class="px-3 py-4">
            <span class="text-sm text-slate-400">Editing...</span>
        </td>
        
        <td class="px-3 py-4 whitespace-nowrap">
            <button 
                type="button" 
                onclick="saveEdit(${index})" 
                class="bg-green-600 hover:bg-green-700 transition duration-150 rounded text-white text-xs px-2 py-1">
                Save
            </button>
            <button 
                type="button" 
                onclick="renderTodo()" // Kembali ke tampilan normal tanpa menyimpan
                class="bg-gray-500 hover:bg-gray-600 transition duration-150 rounded text-white text-xs px-2 py-1">
                Cancel
            </button>
        </td>
    `;
    return;
}

function toggleStatus(index) {
    // 1. Dapatkan tugas berdasarkan index
    const todo = todos[index];

    // 2. Ubah statusnya: 'pending' menjadi 'completed', atau sebaliknya
    if (todo.status === 'pending') {
        todo.status = 'completed';
    } else {
        todo.status = 'pending';
    }

    console.log(`Status tugas pada index ${index} diubah menjadi: ${todo.status}`);

    // 3. Simpan array yang diperbarui ke Local Storage
    localStorage.setItem('todos', JSON.stringify(todos));

    // 4. Render ulang tabel
    renderTodo();
}

function saveEdit(index) {
    // 1. Dapatkan nilai baru dari input form
    const newNama = document.getElementById(`edit-nama-${index}`).value;
    const newTanggal = document.getElementById(`edit-tanggal-${index}`).value;

    // 2. Validasi sederhana
    if (!newNama.trim() || !newTanggal) {
        alert("Nama tugas dan tanggal tidak boleh kosong.");
        return;
    }

    // 3. Perbarui array todos
    todos[index].nama = newNama;
    todos[index].tanggal = newTanggal;

    // 4. Simpan ke Local Storage
    localStorage.setItem('todos', JSON.stringify(todos));

    // 5. Render ulang tabel untuk menampilkan hasil edit
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