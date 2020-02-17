// initialize a map object and set up a center and zoom level
let mymap = L.map("mapid").setView([40.7, -94.5], 4);

// create a street tile layer based on Leatlet by mapbox API 
let streetsTile = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    accessToken: API_KEY});

// add 'greymap' tile layer to mymap
streetsTile.addTo(mymap);
