const btn = document.querySelector('.btn1');
const submit = document.querySelector('form button');
const form = document.getElementById('form');
let x, count,rozdile;

btn.addEventListener('click', () => {
    x = document.querySelectorAll('.form');

    count = (x[0].value * 1) + (x[1].value * 2) + (x[2].value * 5) + (x[3].value * 10) + (x[4].value * 20) + (x[5].value * 50) + 
    (x[6].value * 100) + (x[7].value * 200) + (x[8].value * 500) + (x[9].value * 1000) + (x[10].value * 2000) + (x[11].value * 5000);

 rozdile = x[12].value; 


celkem.value = count;
rozdil.value = rozdile - count;
form.style.display = "block";

state.value =  (rozdile - count > 0) ? "V plusu" : "V mínusu";



});







