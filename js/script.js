document.addEventListener('DOMContentLoaded', () => {
    let vehicels = [], map = L.map('map').setView([52.5990, 39.5679], 12);
    L.tileLayer('https://{s}.tile.osm.org/{z}/{x}/{y}.png').addTo(map); // Задание слоя маски - обычный

    // Функция для рендера иконок гаражей
    const renderGarages = coords => L.marker(coords,{icon:L.icon({iconUrl:'./garage.svg',iconSize:[30,80],popupAnchor:[-3,-76]})}).addTo(map);
    const renderRoad = coords => map.fitBounds(L.polyline(coords, {color: 'blue'}).addTo(map).getBounds()); // Функция для рендера дорог
    
    coordGarage.forEach(el => renderGarages(el));                   // Отрисовка гаражей
    roads.forEach(road => renderRoad(road.geometry.coordinates));   // Отрисовка дорог

    function renderRoadVehicles(data) { // Получает маршруты и их ID
        data.forEach(el => vehicels[el.id] = map.fitBounds(L.polyline(el.points, {color: 'green'}).addTo(map).getBounds()));
        console.log(vehicels); // Отладка
    }

    sendReq('GET', 'routes', renderRoadVehicles); // Получение маршрутов

    let server = new EventSource(SERVERHOST + 'locationsStream');
    server.open = () => console.log('SSE connected'); // Отладка
    server.onmessage = msg => console.log(JSON.parse(msg.data));
    // позже заменить на: updateCurLoc(JSON.parse(msg.data));

    server.onerror = err => console.error(err);
});

/*
Код для отрисовки линий по координатам

let latlngs = [ [52.6169, 39.5767], [52.6046, 39.5960] ];
map.fitBounds(L.polyline(latlngs, {color: 'red'}).addTo(map).getBounds());

*/