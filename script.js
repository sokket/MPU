document.addEventListener('DOMContentLoaded', () => {
    const updBtn = document.getElementById('updatePos');
    updBtn.addEventListener('click', refreshPosVehicles);

    let map = L.map('map').setView([52.5990, 39.5679], 12);
    L.tileLayer('https://{s}.tile.osm.org/{z}/{x}/{y}.png').addTo(map); // Задание слоя маски - обычный

    // Функция для рендера иконок гаражей
    const renderGarages = coords => L.marker(coords,{icon:L.icon({iconUrl:'./img/garage.svg',iconSize:[30,80],popupAnchor:[-3,-76]})}).addTo(map);
    const renderRoad = coords => map.fitBounds(L.polyline(coords, {color: 'blue'}).addTo(map).getBounds()); // Функция для рендера дорог
    
    coordGarage.forEach(el => renderGarages(el)); // Отрисовка гаражей

    // Рендерит на карте технику
    const renderVehicles = (coords, type) => L.marker(coords,{icon:L.icon({iconUrl:'./img/' + getPicture(type) + '.png',iconSize:[60,45],popupAnchor:[-3,-76]})}).addTo(map);

    
    sendReq('GET', 'streets', roads => roads.forEach(road => renderRoad(road.geometry.coordinates))); // Получение и отрисовка дорог

    function updateCurLoc(data) { // Обновляет координаты машин (передвигает машины)
        
    }

    refreshPosVehicles();

    // sendReq('GET', 'routes', renderRoadVehicles); // Получение маршрутов
    
    // let server = new EventSource(SERVERHOST + 'locationsStream');
    
    // server.open = () => updBtn.classList.remove('hide'); // Отладка
    // server.onmessage = msg => console.log(JSON.parse(msg.data)); // Отладка
    // // позже заменить на: updateCurLoc(JSON.parse(msg.data));

    // server.onerror = err => console.error(err);

    function getPicture(type) { // Определяет тип машину и подбирает картинку для неё
        return 1;
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
        data.forEach(el => {
            // routes[el.id].coords = el.pos;
            renderVehicles(el.pos);
        });
    }

    function renderRoadVehicles(data) { // Получает маршруты и их ID
        data.forEach(el => routes[el.id] = map.fitBounds(L.polyline(el.points, {color: 'green'}).addTo(map).getBounds()));
        console.log(routes); // Отладка
        sendReq('GET', 'vehicles', getVehicles); // Получение маршрутов
        refreshPosVehicles();
    }
});