// Add GeoJSON data URL
jsonDataURL="https://raw.githubusercontent.com/susiexia/Mapping_Earthquakes/Mapping_GeoJSON_LineStrings/torontoRoutes.json"


// create a light tile layer based on Leatlet by mapbox style API 
let light = L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/light-v10',
    accessToken: API_KEY});

    // create another tile layer for dark
let dark = L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/dark-v10',
    accessToken: API_KEY});


let baseMaps = {
    "light_Mode": light,
    "dark_Mode": dark
}
// initialize a map object 
let mymap = L.map("mapid", {
            center:[30,30],
            zoom: 1,
            layers:[dark]
});


L.control.layers(baseMaps).addTo(mymap);

// Grabbing, parsing and add GeoJSON data(FeatureCollection) on map object
// turn each feature into a marker on the map using pointToLayer
d3.json(jsonDataURL).then((data) =>{
    L.geoJSON(data,{
        style:{
            "color":"yellow",
            "weight":2
        },
        onEachFeature: function (feature, layer) {
            return layer.bindPopup("<h2> Airline: " +feature.properties.airline+"</h2><hr><h3> Destination: "+ feature.properties.dst +"</h3>")
        }
    }).addTo(mymap);
})
