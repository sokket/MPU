document.addEventListener('DOMContentLoaded', () => {
    // Адресс PHP сервера: https://mpu2021.herokuapp.com/
    // адресс для дорог: https://gis-api.admlr.lipetsk.ru/api/v1/roads/regionallist
    // адресс для трасс: https://gis-api.admlr.lipetsk.ru/api/v1/roads/federallist
    // result.features.filter(data => typeof(data.properties.name) === 'string' && data.properties.name.includes('Липецк, ') && data);

    let map = L.map('map').setView([52.5990, 39.5679], 12);
    L.tileLayer('https://{s}.tile.osm.org/{z}/{x}/{y}.png').addTo(map);

    const coordGarage = [ // Координаты гаражей
        [52.6055795, 39.52249936], // Липецк
        [52.6389125, 39.53994646], // Липецк
        [52.60469729740339, 38.48343237969811], // Елец
        [52.60272342632745, 38.48057850930626]  // Елец
    ]; 

    // Функция для рендера иконок гаражей
    const renderGarages = coords => L.marker(coords,{icon:L.icon({iconUrl:'./garage.svg',iconSize:[30,80],popupAnchor:[-3,-76]})}).addTo(map);
    const renderRoad = coords => map.fitBounds(L.polyline(coords, {color: 'blue'}).addTo(map).getBounds()); // Функция для рендера дорог
    
    coordGarage.forEach(el => renderGarages(el)); // Отрисовка гаражей
    roads.forEach(road => renderRoad(road.geometry.coordinates)); // Отрисовка дорог

    /*
    Код для отрисовки линий по координатам

    let latlngs = [ [52.6169, 39.5767], [52.6046, 39.5960] ];
    map.fitBounds(L.polyline(latlngs, {color: 'red'}).addTo(map).getBounds());

    */
});