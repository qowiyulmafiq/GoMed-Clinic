// Data dokter berdasarkan spesialis
const dataDokter = {
    "Umum": [
        { nama: "Dr. Rakha", jadwal: ["Senin 08:00-12:00", "Selasa 14.00-18.00", "Rabu 12:00-14:00"] },
        { nama: "Dr. Budi", jadwal: ["Senin 12.00-16.00", "Selasa 10:00-14:00", "Kamis 12:00-16:00"] },
        { nama: "Dr. Citra", jadwal: ["Rabu 08:00-12:00", "Jumat 08:00-12:00", "Sabtu 10:00-14:00"] },
        { nama: "Dr. Messi", jadwal: ["Sabtu 14:00-18:00", "Minggu 09:00-13:00", "Senin 14:00-18:00"] }
    ],
    "Gigi": [
        { nama: "Dr. Dina", jadwal: ["Senin 10:00-14:00", "Kamis 08:00-12:00"] },
        { nama: "Dr. Eko", jadwal: ["Selasa 12:00-16:00", "Jumat 14:00-18:00"] },
        { nama: "Dr. Fanny", jadwal: ["Rabu 08:00-12:00", "Sabtu 12:00-16:00"] }
    ],
    "Anak": [
        { nama: "Dr. Gina", jadwal: ["Senin 08:00-12:00", "Kamis 14:00-18:00"] },
        { nama: "Dr. Hadi", jadwal: ["Selasa 10:00-14:00", "Jumat 10:00-14:00"] },
        { nama: "Dr. Indra", jadwal: ["Rabu 12:00-16:00", "Sabtu 08:00-12:00"] }
    ],
    "Kebidanan & Kandungan":[
        { nama: "Dr. Ratna", jadwal: ["Senin 08:00-12:00","Kamis 14:00-18.00"]},
        { nama: "Dr. Kartika", jadwal:["Selasa 10:00-14:00", "Jumat 10:00-14:00"]},
        { nama: "Dr. Kurnia", jadwal: ["Rabu 12:00-16:00", "Sabtu 08:00-12:00"] }
    ]
};


//fungsi pergantian page pada halaman media
let currentPage = 1;
const totalPages = 3;

function showPage(page) {
    
    for (let i = 1; i <= totalPages; i++) {
        document.getElementById(`media-page-${i}`).style.display = 'none';
    }
    
    document.getElementById(`media-page-${page}`).style.display = 'flex';

    updatePagination();
    
    document.getElementById('prev-btn').disabled = (page === 1);
    document.getElementById('next-btn').disabled = (page === totalPages);
}

function changePage(direction) {
    currentPage += direction;
    if (currentPage < 1) currentPage = 1;
    if (currentPage > totalPages) currentPage = totalPages;
    showPage(currentPage);
}

function goToPage(page) {
    currentPage = page;
    showPage(currentPage);
}

function updatePagination() {
    const indicators = document.getElementById('page-indicators');
    indicators.innerHTML = ''; 

    for (let i = 1; i <= totalPages; i++) {
        const pageButton = document.createElement('button');
        pageButton.textContent = i;
        pageButton.onclick = () => goToPage(i);

        if (i === currentPage) {
            pageButton.classList.add('active'); 
        }
    indicators.appendChild(pageButton);
    }
}

// Inisialisasi Halaman Pertama
showPage(currentPage);



//Fungsi mencari jadwal dokter pada halaman jadwal
function isiDokter() {
    const spesialis = document.getElementById("spesialis").value;
    const dropdownDokter = document.getElementById("dokter");

    // Kosongkan dropdown
    dropdownDokter.innerHTML = "<option value=''>-- Pilih Dokter --</option>";
    document.getElementById("hasil").innerHTML = ""; // Kosongkan hasil

    // Isi dokter sesuai spesialis
    if (spesialis && dataDokter[spesialis]) {
        const dokterSaatIni = dataDokter[spesialis];
        dokterSaatIni.forEach(dokter => {
            const option = document.createElement("option");
            option.value = dokter.nama;
            option.textContent = dokter.nama;
            dropdownDokter.appendChild(option);
        });
    }
}
// Menampilkan jadwal dokter dalam tabel
function tampilkanJadwal() {
    const spesialis = document.getElementById("spesialis").value;
    const dokterNama = document.getElementById("dokter").value;
    const hasilDiv = document.getElementById("hasil");

    if (!spesialis || !dokterNama) {
        hasilDiv.innerHTML = "<p style='color: red;'>Pilih spesialis dan dokter terlebih dahulu!</p>";
        return;
    }

    // Cari dokter dan tampilkan jadwal
    const dokter = dataDokter[spesialis].find(d => d.nama === dokterNama);

    if (dokter) {
        let tabelJadwal = `
            <table>
                <thead>
                    <tr>
                        <th>Hari</th>
                        <th>Jam</th>
                    </tr>
                </thead>
                <tbody>`
        
        dokter.jadwal.forEach(jadwal => {
            tabelJadwal += `
                <tr>
                    <td>${jadwal.split(" ")[0]}</td>
                    <td>${jadwal.split(" ")[1]}</td>
                </tr>`
        })

        tabelJadwal += "</tbody></table>";
        hasilDiv.innerHTML = tabelJadwal;
    }
}

