// Add GeoJSON data URL of USGS PAST 7 DAYS earthquake 
jsonDataURL="https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson"


// create two tile layer based on Leatlet by mapbox style API 
let street = L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    accessToken: API_KEY});

let satelliteStreets = L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/satellite-streets-v11',
    accessToken: API_KEY});

//create overlays layer group instance
let overlayGroup = new L.layerGroup();

// define an object of base layer group
let baseMaps = {
    "Streets": street,
    "Satellite": satelliteStreets
};
// define an object of loverlay, always visible
let overlays ={
    "Earthquakes": overlayGroup
};


// initialize a map object 
let mymap = L.map("mapid", {
    center:[39.5,-98.5],
    zoom: 3,
    layers:[street]  // default visible basemap
});
// add overlayGroup on map instantiation
overlayGroup.addTo(mymap);

// layers controller, allow users to change which layers are visible
L.control.layers(baseMaps, overlays).addTo(mymap);




// Grabbing, parsing and add GeoJSON data(FeatureCollection) on map object as geoJSON layer
d3.json(jsonDataURL).then((data) =>{
    L.geoJSON(data,{
        //set the style for each circleMarker, pass the magnitude into two separate functions
        // to calculate the color and radius.
        style: function (feature) {
            return {
                opacity: 1,
                fillOpacity: 1,
                fillColor: getColor(feature.properties.mag), // use function instead a single color
                color: "#000000",  // black
                radius: getRadius(feature.properties.mag),
                stroke: true,
                weight: 0.5
            }
        },
        //turn each feature into a circleMarker on the map using pointToLayer
        pointToLayer: function (feature, latlng) {
            
            return L.circleMarker(latlng)
            .bindPopup("<h2> Earthquake Magnitude: " +feature.properties.mag+"</h2><hr><h3> Location: "+ feature.properties.place +"</h3>")
        }
    }).addTo(overlayGroup);  // add geoJSON layer on overlays group

    //overlayGroup.addTo(mymap);
});

// This function determines the fillcolor of circleMarkers based on magtitude
function getColor(magnitude) {
    if (magnitude > 5) {              //magnitude > 5 ? return "#EA2C2C" :
        return "#ea2c2c";
      }
      if (magnitude > 4) {
        return "#ea822c";
      }
      if (magnitude > 3) {
        return "#ee9c00";
      }
      if (magnitude > 2) {
        return "#eecc00";
      }
      if (magnitude > 1) {
        return "#d4ee00";
      }
      return "#98ee00";
};

// This function determines the radius of the earthquake marker based on its magnitude.
// Earthquakes with a magnitude of 0 will be plotted with a radius of 1.
function getRadius(magnitude) {
    if (magnitude === 0) {return 1}
    return magnitude *4;
};


// create a legend control object
let legend = L.control({
            position: "bottomright"
});

// add details on legend layer
legend.onAdd = function () {
        // create a new HTML tag
        let div = L.DomUtil.create("div", "legend");  // first tag, second are classes
        // create two arrays ready to legend 
        const magnitudes = [0,1,2,3,4,5];
        const colorBox = [];
        // Loop through intervals of magnitudes to generate a label with a colored square for each interval.
        for (var i=0; i<magnitudes.length; i++) {
            // write content into html
            div.innerHTML += "<i style='background: "+getColor(magnitudes[i] +1)+"'</i>" +
                            magnitudes[i] + (magnitudes[i+1] ? "-" +magnitudes[i+1] +"<br>" : "+");
        };
        return div;
};

// add legend on map
legend.addTo(mymap);