const SERVERHOST = 'https://routing.typex.one/api/v1/'; // Базовый адресс сервера

const coordGarage = [ // Координаты гаражей
    [52.6055795, 39.52249936],              // Липецк
    [52.6389125, 39.53994646],              // Липецк
    [52.60469729740339, 38.48343237969811], // Елец
    [52.60272342632745, 38.48057850930626]  // Елец
];

function sendReq(method, mode, callback) { // Функция для стандартного сетевого взаимодействия
    const xhr = new XMLHttpRequest();
    xhr.open(method, SERVERHOST + mode, true);
    xhr.addEventListener('readystatechange', () => xhr.readyState === xhr.DONE && callback(JSON.parse(xhr.response)));
    xhr.send();
}

let routes = []; // Массив для машин