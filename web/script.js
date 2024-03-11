// a default starting location, doesn't really matter
let lat = 51.505;
let lng = -0.09;

// make a blank map and add some tiles
let map = L.map('map').setView([lat, lng], 4);
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

let ourData = [];

function getData() {
    fetch('data/data.csv')
    .then(response => response.text())
    .then(data => {
        const rows = data.split('\n');
        rows.forEach(row => {
            ourData.push(row.split(','));
        });
        writeTable(ourData);
        drawMarkers(ourData);
        console.log(ourData);
    });
}

function drawMarkers(data) {
    data.forEach(row => {
        console.log(row);
        L.marker([+row[0], +row[1]]).bindPopup(`data: ${row[2]}`).addTo(map);
    });
} 

function writeTable(data) {
    const table = document.createElement('table');
    data.forEach(row => {
        const tr = document.createElement('tr');
        row.forEach(column => {
            const td = document.createElement('td');
            td.textContent = column;
            tr.appendChild(td);
        });
        table.appendChild(tr);
        document.getElementById('data').appendChild(table);
    });
}

getData();