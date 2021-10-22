document.addEventListener('DOMContentLoaded', () => {
    // Адресс PHP сервера: https://mpu2021.herokuapp.com/
    // адресс для дорог: https://gis-api.admlr.lipetsk.ru/api/v1/roads/regionallist
    // адресс для трасс: https://gis-api.admlr.lipetsk.ru/api/v1/roads/federallist
    //result.features.filter(data => typeof(data.properties.name) === 'string' && data.properties.name.includes('Липецк, ') && data);
    const d = document;
    const map = d.getElementById('map');
    map.width = window.innerWidth;
    map.height = window.innerHeight;

});