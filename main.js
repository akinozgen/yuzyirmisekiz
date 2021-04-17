import './style.css'
import queue from './queue';

window.target = 128000000000;
window.timeout = 1000;
const app = document.querySelector('#app');

const prepareWorkers = () => {

  window.target--;
 
  queue.enqueue(function ({p}) {
    return new Promise((resolve, reject) => {
      app.append('💸');
      app.querySelector('h1').innerText = String(p).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      setTimeout(() => {
        resolve(1);
      }, window.timeout);
    });
  }, { p: (128000000000 - window.target) });

};

const loop = setInterval(() => {
  prepareWorkers();
  if (window.target <= 0) clearInterval(loop);
}, 1);

app.querySelector('#speed').addEventListener('input', (e) => {
  let i = 1000 - parseInt(e.target.value);
  
  window.timeout = i;
});

queue.startQueue(0);
