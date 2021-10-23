const SERVERHOST = '/api/v1/'; // Базовый адресс сервера

const coordGarage = [ // Координаты гаражей
    [52.6055795, 39.52249936],              // Липецк
    [52.6389125, 39.53994646],              // Липецк
    [52.60469729740339, 38.48343237969811], // Елец
    [52.60272342632745, 38.48057850930626]  // Елец
];

function sendReq(method, mode, callback) { // Функция для стандартного сетевого взаимодействия
    const xhr = new XMLHttpRequest();
    xhr.open(method, SERVERHOST + mode, true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.responseType = 'json';
    xhr.addEventListener('readystatechange', () => xhr.readyState === xhr.DONE && callback(JSON.parse(xhr.response)));
    xhr.send();
}

function refreshPosVehicles(e = false) { // Получение координат машин или запрос на новые данные
    sendReq('GET', e !== false ? 'refreshRoutes' : 'locations', getCoords);
    console.log('Запрос/Обновление позиций машин');
}

function getVehicles(data) { // Получает названия машин
    data.forEach(el => routes[el.id].name = el.name);
    console.log(routes); // Отладка
}

function getCoords(data) { // Получает текущие координаты машин
    data.forEach(el => routes[el.id].coords = el.pos);
    console.log(routes); // Отладка
}

function renderRoadVehicles(data) { // Получает маршруты и их ID
    data.forEach(el => routes[el.id] = map.fitBounds(L.polyline(el.points, {color: 'green'}).addTo(map).getBounds()));
    console.log(routes); // Отладка
    sendReq('GET', 'vehicles', getVehicles); // Получение маршрутов
    refreshPosVehicles();
}