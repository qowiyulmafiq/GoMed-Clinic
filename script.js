const jenisPasien = document.getElementById('jenis-pasien');
const rekamMedisGroup = document.getElementById('rekam-medis-group');
const formPasienBaru = document.getElementById('form-pasien-baru');

jenisPasien.addEventListener('change', function () {
    if (this.value === 'lama') {
        rekamMedisGroup.classList.remove('hidden');
        formPasienBaru.classList.add('hidden');
    } else {
        rekamMedisGroup.classList.add('hidden');
        formPasienBaru.classList.remove('hidden');
    }
});