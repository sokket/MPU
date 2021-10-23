document.addEventListener('DOMContentLoaded', () => {
    // Адресс PHP сервера: https://mpu2021.herokuapp.com/
    // адресс для дорог: https://gis-api.admlr.lipetsk.ru/api/v1/roads/regionallist
    // адресс для трасс: https://gis-api.admlr.lipetsk.ru/api/v1/roads/federallist
    // result.features.filter(data => typeof(data.properties.name) === 'string' && data.properties.name.includes('Липецк, ') && data);

    let map = L.map('map').setView([52.5886, 39.5662], 13);
    map.setView([52.5886, 39.5662], 12);
    L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png',
        {attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'}).addTo(map);

    const coordGarage = [ // Координаты гаражей
        [52.6055795, 39.52249936], // Липецк
        [52.6389125, 39.53994646], // Липецк
        [52.60469729740339, 38.48343237969811], // Елец
        [52.60272342632745, 38.48057850930626]  // Елец
    ]; 

    coordGarage.forEach(el => L.marker(el).addTo(map)); // Рендер точек гаражей

    /*
    Код для отрисовки линий по координатам

    let latlngs = [ [52.6169, 39.5767], [52.6046, 39.5960] ];
    map.fitBounds(L.polyline(latlngs, {color: 'red'}).addTo(map).getBounds());

    */
});