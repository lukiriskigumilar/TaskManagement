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




