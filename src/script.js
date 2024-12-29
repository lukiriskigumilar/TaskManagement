//start logic save user data
if (document.getElementById('userForm')) {
    const userForm = document.getElementById('userForm');

    userForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const name = userForm.elements['name'].value;
        const role = userForm.elements['role'].value;

        if (!name || !role) {
            alert('PLease fill in all fields')
            return;
        }

        localStorage.setItem('userName', name);
        localStorage.setItem('userRole', role);

        window.location.href = 'home.html';
    });
}
//end of save data user 

// start show data user logic
window.onload = function () {
    // Ambil data dari localStorage
    const userName = localStorage.getItem('userName');
    const userRole = localStorage.getItem('userRole');

    // Ambil elemen dengan ID userAndRole
    const userAndRole = document.getElementById('userAndRole');

    // Cek apakah data ada di localStorage
    if (userName && userRole) {
        // Tampilkan data jika ada
        userAndRole.textContent = `Hello, ${userName} You are logged in as 
        ${userRole} let’s get things done!`;
    } else {
        // Tampilkan pesan jika data tidak ada
        userAndRole.textContent = 'User not logged in';
    }
};
//end show data logic user

//start time logib
function updateTime() {
    const now = new Date();

    //ambil waktu
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');

    //ambil hari dalam tanggal 
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const dayName = days[now.getDay()];
    const date = now.toLocaleDateString('en-US', {
        day: 'numeric',
        month: 'long',
    });

    //update element html 
    const timeElement = document.getElementById('time');
    const secondsElement = document.getElementById('seconds');
    const dateElement = document.getElementById('date');

    // Perbarui waktu
    timeElement.childNodes[0].nodeValue = `${hours}:${minutes} `; // Update hanya teks jam dan menit
    secondsElement.textContent = seconds; // Update detik
    dateElement.textContent = `${dayName}, ${date}`; // Update tanggal


}
// Jalankan fungsi setiap detik
setInterval(updateTime, 1000);

// Panggil pertama kali saat halaman dimuat
updateTime();
//end logic time date



// start logic hide and show content
// ambil element tombol dan content
const ongoingbtn = document.querySelectorAll('.ongoingbtn');
const donebtn = document.querySelectorAll('.donebtn');
const newbtn = document.querySelectorAll('.newbtn');
const ongoingContent = document.getElementById('ongoingContent');
const doneContent = document.getElementById('doneContent');
const newContent = document.getElementById('newContent');

//fungsi untuk menampilkan konten1 dan hide 2 dan 3  content
ongoingbtn.forEach(button => { // Loop melalui setiap tombol
    button.addEventListener('click', () => {
        ongoingContent.classList.remove('hidden');
        doneContent.classList.add('hidden');
        newContent.classList.add('hidden');


        // Hapus style dari semua tombol ongoing
        donebtn.forEach(btn => {
            btn.classList.remove('bg-secondaryColor', 'font-bold', 'text-white');
        });
        newbtn.forEach(btn => {
            btn.classList.remove('bg-secondaryColor', 'font-bold', 'text-white');
        });
        // tambahkan style ke tombol yang di klik
        button.classList.add('bg-secondaryColor', 'font-bold', 'text-white');

        donebtn.classList.remove('bg-secondaryColor', 'font-bold', 'text-white');
    });
});



donebtn.forEach(button => { // Loop melalui setiap tombol
    button.addEventListener('click', () => {
        doneContent.classList.remove('hidden');
        ongoingContent.classList.add('hidden');
        newContent.classList.add('hidden');

        // Hapus style dari semua tombol ongoing
        ongoingbtn.forEach(btn => {
            btn.classList.remove('bg-secondaryColor', 'font-bold', 'text-white');
        });
        newbtn.forEach(btn => {
            btn.classList.remove('bg-secondaryColor', 'font-bold', 'text-white');
        });
        // tambahkan style ke tombol yang di klik
        button.classList.add('bg-secondaryColor', 'font-bold', 'text-white');

        ongoingbtn.classList.remove('bg-secondaryColor', 'font-bold', 'text-white');
    });
});

newbtn.forEach(button => { // Loop melalui setiap tombol
    button.addEventListener('click', () => {
        newContent.classList.remove('hidden');
        doneContent.classList.add('hidden');
        ongoingContent.classList.add('hidden');



        // Hapus style dari semua tombol ongoing
        donebtn.forEach(btn => {
            btn.classList.remove('bg-secondaryColor', 'font-bold', 'text-white');
        });
        ongoingbtn.forEach(btn => {
            btn.classList.remove('bg-secondaryColor', 'font-bold', 'text-white');
        });
        // tambahkan style ke tombol yang di klik
        button.classList.add('bg-secondaryColor', 'font-bold', 'text-white');

        donebtn.classList.remove('bg-secondaryColor', 'font-bold', 'text-white');
    });
});




//save add new task

function savNewTask(event) { // Tambahkan parameter event
    event.preventDefault(); // Pindahkan ini ke awal fungsi
    const taskName = document.getElementById('taskName').value;
    const priorityTask = document.getElementById('priorityTask').value;
    const deadlineDate = document.getElementById('deadlineDate').value;
    const [date, time] = deadlineDate.split('T');
    const taskId = 'task' + new Date().getTime();

    const taskData = {
        id: taskId,
        taskName: taskName,
        priorityTask: priorityTask,
        date: date,
        time: time,
    };

    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.push(taskData);
    localStorage.setItem('tasks', JSON.stringify(tasks));

    alert("task added");
    setTimeout(() => {
        const ongoingContent = document.getElementById('ongoingContent');
        const newContent = document.getElementById('newContent');
        const ongoingbtn = document.querySelectorAll('.ongoingbtn');
        const newbtn = document.querySelectorAll('.newbtn');

        newContent.classList.add('hidden');
        ongoingContent.classList.remove('hidden');
        updateOngoingTasks();
        newbtn.forEach(btn => {
            btn.classList.remove('bg-secondaryColor', 'font-bold', 'text-white');
        });
        ongoingbtn.forEach(btn => {
            btn.classList.add('bg-secondaryColor', 'font-bold', 'text-white');
        });
        updateTaskStatus();
        updateOngoingTasks();

    })
    document.getElementById('taskForm').reset(); // Reset form setelah submit
}

// Pasang event listener *di luar* fungsi savNewTask
document.getElementById('taskForm').addEventListener('submit', savNewTask);





function updateTaskStatus() {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || []; // Ambil data dari localStorage

    tasks.forEach(task => {
        const deadline = new Date(`${task.date}T${task.time}`);
        const now = new Date();
        const diffTime = deadline - now;
        let timeMessage = '';
        let taskMissed = false;

        if (diffTime > 0) {
            const days = Math.floor(diffTime / (1000 * 60 * 60 * 24));
            const hours = Math.floor((diffTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((diffTime % (1000 * 60 * 60)) / (1000 * 60));
            timeMessage = `${days}D ${hours}H ${minutes}M to go`;
        } else {
            timeMessage = "Task Deadline Missed";
            taskMissed = true; // Tandai jika deadline sudah terlewat
        }

        if (!task.finished) {
            // Perbarui hanya jika nilai baru berbeda dari nilai saat ini
            if (task.timeMessage !== timeMessage) {
                task.timeMessage = timeMessage;
            }
            if (task.taskMissed !== taskMissed) {
                task.taskMissed = taskMissed;
            }

            // Simpan data tugas yang diperbarui ke localStorage
            localStorage.setItem('tasks', JSON.stringify(tasks));
        }
    });


}

// Panggil fungsi setiap menit
setInterval(updateTaskStatus, 60000); // Interval 60 detik (1 menit)

// Jalankan segera saat halaman dimuat
updateTaskStatus();

//autoupdate tamplilan per menit
setInterval(updateOngoingTasks, 60000)
updateOngoingTasks();

// Fungsi untuk memperbarui tampilan tugas
function updateOngoingTasks() {
    const tasksContainer = document.getElementById('tasksContainer');
    tasksContainer.innerHTML = ''; // Hapus konten lama

    // Ambil data dari localStorage
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];

    tasks.sort((a, b) => {
        const priorityOrder = { "High": 1, "Medium": 2, "Low": 3 };
    
        // 1. Sort by priority
        const priorityComparison = priorityOrder[a.priorityTask] - priorityOrder[b.priorityTask];
        if (priorityComparison !== 0) {
            return priorityComparison;
        }
    
        // 2. Sort by deadline (day and time) with the most upcoming tasks first
        const aDeadline = new Date(`${a.date}T${a.time}`).getTime();
        const bDeadline = new Date(`${b.date}T${b.time}`).getTime();
    
        // If the task is overdue, the task with the closer deadline comes first
        const deadlineComparison = aDeadline - bDeadline;
        if (deadlineComparison !== 0) {
            return deadlineComparison; // This will sort by the closest deadline
        }
    
        // 3. Sort by creation time (earlier tasks first)
        const aCreationTime = new Date(a.date + 'T' + a.time).getTime();
        const bCreationTime = new Date(b.date + 'T' + b.time).getTime();
        return aCreationTime - bCreationTime;
    });
    


    // Iterasi data tugas
    tasks.forEach(task => {
        const deadline = new Date(`${task.date}T${task.time}`);
        const now = new Date();
        const diffTime = deadline - now;



        //coba pilih warna untuk deadline 
        deadlineColor = ''
        if (task.timeMessage === "Task Deadline Missed") {
            deadlineColor = 'text-red-900'
        } else {
            deadlineColor = 'text-blue-900'
        }

        // Tentukan warna berdasarkan prioritas
        let taskClass = '';
        switch (task.priorityTask) {
            case 'High':
                taskClass = 'bg-taskHighColor';
                break;
            case 'Medium':
                taskClass = 'bg-taskMediumColor';
                break;
            case 'Low':
                taskClass = 'bg-taskLowColor';
                break;
            default:
                taskClass = 'bg-gray-200'; // Warna default jika prioritas tidak dikenal
        }

        //buat warna style prioritas task
        let taskClassPriority = '';
        switch (task.priorityTask) {
            case 'High':
                taskClassPriority = 'text-red-900';
                break;
            case 'Medium':
                taskClassPriority = 'text-yellow-900';
                break;
            case 'Low':
                taskClassPriority = 'text-blue-900';
                break;
            default:
                taskClassPriority = 'text-black'; // Warna default jika prioritas tidak dikenal
        }

        // Buat elemen HTML tugas
        const taskElement = document.createElement('div');
        taskElement.className = `w-auto lg:w-auto -mx-1 ${taskClass} block shadow-lg rounded-lg mb-4 lg:width-[120px]`;
        taskElement.innerHTML = `
            <div class="flex justify-between items-center pl-1 pr-1 py-2 lg:px-3">
                <p class="font-bold ${taskClassPriority}">${task.priorityTask} Priority</p>
                <p class="${deadlineColor} ${task.finished ? 'text-green-800' : ''}">${task.finished ? `${task.finishedAt} (Done)` : task.timeMessage}</p>
            </div>
            <hr>
            <div class="flex justify-between items-center pl-4 pr-1 gap-2 py-4">
                <p class=" ${deadlineColor} ${task.finished ? 'text-gray-500 line-through' : 'text-slate-950'}">${task.taskName}</p>
                <div class="flex flex-col">
                <input 
                type="checkbox" 
                class="finish-checkbox transform scale-150" 
                data-id="${task.id}" 
                ${task.finished ? 'checked' : ''} 
                ${(task.finished || task.taskMissed) ? 'disabled' : ''}
            />
            
                    <button class="bg-red-700 rounded-md text-white px-1 mt-2 delete-btn" data-id="${task.id}">Delete</button>
                </div>
            </div>
        `;
        tasksContainer.appendChild(taskElement);
    });

    // Fungsi untuk menyelesaikan tugas
document.querySelectorAll('.finish-checkbox').forEach(checkbox => {
    checkbox.addEventListener('change', event => {
        const taskId = event.target.dataset.id;
        const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        const taskIndex = tasks.findIndex(task => task.id === taskId);

        if (taskIndex !== -1 && !tasks[taskIndex].finished && !tasks[taskIndex].taskMissed) {
            const now = new Date();
            
            // Format waktu selesai
            const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
            const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
            const formattedDate = `${days[now.getDay()]}, ${now.getDate()} ${months[now.getMonth()]} ${String(now.getFullYear()).slice(-2)} ${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;
            
            // Tandai tugas sebagai selesai
            tasks[taskIndex].finished = true;
            tasks[taskIndex].finishedAt = formattedDate;

            // Perbarui ke localStorage
            localStorage.setItem('tasks', JSON.stringify(tasks));

            // Perbarui UI
            updateOngoingTasks();
        }
    });
});

    // Tambahkan event listener untuk tombol Finish dan Delete
    document.querySelectorAll('.delete-btn').forEach(btn => {
        btn.addEventListener('click', deleteTask);
    });


}

// Fungsi untuk menghapus tugas
function deleteTask(event) {
    const taskId = event.target.dataset.id;
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

    const confrimDelete = window.confirm("Are you sure you want to delete this task?");

    if (confrimDelete) {
        tasks = tasks.filter(task => task.id !== taskId);
        localStorage.setItem('tasks', JSON.stringify(tasks));
        updateOngoingTasks();
        alert("Task has been deleted")
    }
}




// Panggil fungsi ini untuk memperbarui data saat halaman dimuat
updateOngoingTasks();
