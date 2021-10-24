document.addEventListener('DOMContentLoaded', () => {
    const updBtn = document.getElementById('updatePos'); // Получение кнопки для обновления
    const countVehicels = document.getElementById('countVehicels'); // Получение ссылки на ползунок
    const enableStreets = document.getElementById('useStreets'); // Получение 

    // Получение координат машин или запрос на новые данные
    const getPosVehicles = (e = false) => sendReq('GET', e !== false ? 'refreshRoutes' : 'locations', getCoords);
    updBtn.addEventListener('click', getPosVehicles); // Обработчик для кнопки обновить

    let map = L.map('map').setView([52.5990, 39.5679], 12); // Инициализация карты
    L.tileLayer('https://{s}.tile.osm.org/{z}/{x}/{y}.png').addTo(map); // Задание слоя Array.from(маски.children.forEach(el => el.remove()))   // Функция для рендера иконок гаражей
    const renderGarages = coords => L.marker(coords,{icon:L.icon({iconUrl:'./img/garage.svg',iconSize:[30,80],popupAnchor:[-3,-76]})}).addTo(map);
    const renderRoad = (coords, color) => map.fitBounds(L.polyline(coords, {'color': color}).addTo(map).getBounds()); // Функция для рендера дорог
    
    // Рендерит на карте технику
    const renderVehicles = (coords, type) =>
        L.marker(coords,{icon:L.icon({iconUrl:'./img/'+getPicture(type)+'.png',iconSize:[60,45],popupAnchor:[-3,-76]})}).addTo(map);

    function getPicture(type) { // Определяет тип машину и подбирает картинку для неё
        return 1;
    }
    
    function clearMap() { // Очистка карты
        const tmp31 = document.getElementsByClassName('leaflet-marker-pane')[0];
        const tmp32 = document.getElementsByClassName('leaflet-overlay-pane')[0];

        Array.from(tmp31.children).forEach(el => el.remove());
        if(tmp32.childElementCount !== 0) Array.from(tmp32.children[0].children).forEach(el => el.remove());
    }

    // function getVehicles(data) { // Получает названия машин
    //     data.forEach(el => routes[el.id].name = el.name);
    // }

    const getCoords = data => data.forEach(el => renderVehicles(el.pos)); // Получает текущие координаты машин   

    function getRandomColor() {
        let letters = '0123456789ABCDEF', color = '#';
        for (let i = 0; i < 6; i++) color += letters[Math.floor(Math.random() * 16)];
        return color;
    }

    function renderRoadVehicles(data) { // Получает маршруты и их ID
        data.forEach(el1 => {
            let tmp = getRandomColor();
            el1.streets.forEach(e => L.polyline(e, {'color': tmp}).addTo(map))
        });
        getPosVehicles(); // Получение позиций машин
        // updBtn.classList.remove('hide');
        // sendReq('GET', 'vehicles', getVehicles); // Получение наименований машин
    }

    countVehicels.onchange = e => start(e.target.value, enableStreets.checked); // При изменении ползунка - перерендерить всё
    enableStreets.onchange = e => start(countVehicels.value, e.target.checked); // При изменении ползунка - перерендерить всё

    function start(count, mode) {
        clearMap(); // Очистка карты
        
        coordGarage.forEach(el => renderGarages(el)); // Отрисовка гаражей

        if (mode) sendReq('GET', 'streets', roads =>
            roads.forEach(road => renderRoad(road.geometry.coordinates, 'blue'))); // Получение и отрисовка дорог

        sendReq('GET', 'routes', renderRoadVehicles, count); // Получение маршрутов    
    }

    start(countVehicels.value, enableStreets.checked);
    
    
    // function updateCurLoc(data) { // Обновляет координаты машин (передвигает машины)
        
    // }

    // let server = new EventSource(SERVERHOST + 'locationsStream');
    
    // server.open = () =>  // Отладка
    // server.onmessage = msg => console.log(JSON.parse(msg.data)); // Отладка
    // // позже заменить на: updateCurLoc(JSON.parse(msg.data));

    // server.onerror = err => console.error(err);
});
