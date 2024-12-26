if (document.getElementById('userForm')){
    const userForm = document.getElementById('userForm');

userForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = userForm.elements['name'].value;
    const role = userForm.elements['role'].value;

    if(!name || !role){
        alert('PLease fill in all fields')
        return;
    }

    localStorage.setItem('userName', name); 
    localStorage.setItem('userRole', role);

    window.location.href = 'home.html';
});
}


window.onload = function() {
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

function updateTime(){
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


// ambil element tombol dan content
const ongoingbtn = document.getElementById('ongoinbtn');
const donebtn = document.getElementById('donebtn');
const newtaskbtn = document.getElementById('newtaskbtn'); 
const ongoingContent = document.getElementById('ongoingContent');
const doneContent = document.getElementById('doneContent');
const newtaskContent = document.getElementById('newtaskContent');





