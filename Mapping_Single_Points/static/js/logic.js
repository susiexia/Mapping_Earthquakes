// initialize a map object and set up a center and zoom level
let mymap = L.map("mapid").setView([40.7, -94.5], 4);


// add a marker to map for Bay Area
var LAmarker = L.marker([37.33, -121.88]).addTo(mymap);


// create a street tile layer based on Leatlet by mapbox style API 

let streetsTile = L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    accessToken: API_KEY});

// add 'greymap' tile layer to map object
streetsTile.addTo(mymap);