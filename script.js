document.addEventListener('DOMContentLoaded', () => {
    const updBtn = document.getElementById('updatePos'); // Получение кнопки для обновления
    const AllColors = ['green', 'red', 'blue', 'orange', 'yellow', 'purple', 'grey', 'brown'];
    let usedColors = [];
    // Получение координат машин или запрос на новые данные
    const getPosVehicles = (e = false) => sendReq('GET', e !== false ? 'refreshRoutes' : 'locations', getCoords);
    updBtn.addEventListener('click', getPosVehicles); // Обработчик для кнопки обновить

    let map = L.map('map').setView([52.5990, 39.5679], 12); // Инициализация карты
    L.tileLayer('https://{s}.tile.osm.org/{z}/{x}/{y}.png').addTo(map); // Задание слоя маски - обычный

    // Функция для рендера иконок гаражей
    const renderGarages = coords => L.marker(coords,{icon:L.icon({iconUrl:'./img/garage.svg',iconSize:[30,80],popupAnchor:[-3,-76]})}).addTo(map);
    const renderRoad = (coords, color) => map.fitBounds(L.polyline(coords, {'color': color}).addTo(map).getBounds()); // Функция для рендера дорог
    
    // Рендерит на карте технику
    const renderVehicles = (coords, type) =>
        L.marker(coords,{icon:L.icon({iconUrl:'./img/'+getPicture(type)+'.png',iconSize:[60,45],popupAnchor:[-3,-76]})}).addTo(map);

    coordGarage.forEach(el => renderGarages(el)); // Отрисовка гаражей

    function getPicture(type) { // Определяет тип машину и подбирает картинку для неё
        return 1;
    }
    
    function getVehicles(data) { // Получает названия машин
        data.forEach(el => routes[el.id].name = el.name);
    }

    const getCoords = data => data.forEach(el => renderVehicles(el.pos)); // Получает текущие координаты машин   

    function getRandomColor() {
        let letters = '0123456789ABCDEF', color = '#';
        for (let i = 0; i < 6; i++) color += letters[Math.floor(Math.random() * 16)];
        return color;
    }

    function renderRoadVehicles(data) { // Получает маршруты и их ID
        data.forEach(el1=>{
            let tmp = getRandomColor();
            el1.streets.forEach(e => L.polyline(e, {'color': tmp}).addTo(map))
        });
        getPosVehicles(); // Получение позиций машин
        // sendReq('GET', 'vehicles', getVehicles); // Получение наименований машин
    }

    //sendReq('GET', 'streets', roads => roads.forEach(road => renderRoad(road.geometry.coordinates))); // Получение и отрисовка дорог

    sendReq('GET', 'routes', renderRoadVehicles, 102); // Получение маршрутов
    
    // function updateCurLoc(data) { // Обновляет координаты машин (передвигает машины)
        
    // }

    // let server = new EventSource(SERVERHOST + 'locationsStream');
    
    // server.open = () => updBtn.classList.remove('hide'); // Отладка
    // server.onmessage = msg => console.log(JSON.parse(msg.data)); // Отладка
    // // позже заменить на: updateCurLoc(JSON.parse(msg.data));

    // server.onerror = err => console.error(err);
});