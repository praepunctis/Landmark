mapboxgl.accessToken = 'pk.eyJ1Ijoia2Zlc2xlciIsImEiOiJjazI3cG9jNTcwZ3VoM21sc3lhOHFtNnYzIn0.i6MLXYxFPfw96PdwMfIWnw';
var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/dark-v10',
    center: [-103.59179687498357, 40.66995747013945],
    zoom: 3
});


function submitForm(){
    var address = document.getElementById("address").value;

    const Http = new XMLHttpRequest();
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+ serialize(address) +'.json?types=address&access_token='+ mapboxgl.accessToken;
    Http.open("GET",url);
    Http.send();
    Http.onreadystatechange = (e) => {
        // call whatever function to update the map with new data
        // sample

        console.log( serialize(address) );
        console.log(mapboxgl.accessToken);
        console.log("***");
        console.log(Http.responseText);
        var x = 0;
        x = JSON.parse('{"type":"FeatureCollection","query":["santa"],"features":[{"id":"address.2777127089908054","type":"Feature","place_type":["address"],"relevance":1,"properties":{"accuracy":"street"},"text":"Santa Rosa Boulevard","place_name":"Santa Rosa Boulevard, Doncaster East Victoria 3109, Australia","center":[145.178146,-37.765812],"geometry":{"type":"Point","coordinates":[145.178146,-37.765812]},"context":[{"id":"locality.5630161037312860","wikidata":"Q5295495","text":"Doncaster East"},{"id":"postcode.12635326254513450","text":"3109"},{"id":"place.7068896531111320","wikidata":"Q3141","text":"Melbourne"},{"id":"region.10354338764038050","short_code":"AU-VIC","wikidata":"Q36687","text":"Victoria"},{"id":"country.3050683007346070","short_code":"au","wikidata":"Q408","text":"Australia"}]},{"id":"address.401651220436184","type":"Feature","place_type":["address"],"relevance":1,"properties":{"accuracy":"street"},"text":"Santarosa Street","place_name":"Santarosa Street, Colebee New South Wales 2761, Australia","center":[150.8571796,-33.7244547],"geometry":{"type":"Point","coordinates":[150.8571796,-33.7244547]},"context":[{"id":"locality.14750822858169760","text":"Colebee"},{"id":"postcode.9816177759266640","text":"2761"},{"id":"place.4960085988742460","wikidata":"Q3130","text":"Sydney"},{"id":"region.10849457265831280","short_code":"AU-NSW","wikidata":"Q3224","text":"New South Wales"},{"id":"country.3050683007346070","short_code":"au","wikidata":"Q408","text":"Australia"}]},{"id":"address.2902233331191242","type":"Feature","place_type":["address"],"relevance":1,"properties":{"accuracy":"street"},"text":"Santarosa Avenue","place_name":"Santarosa Avenue, Tarneit Victoria 3029, Australia","center":[144.6490093,-37.8467266],"geometry":{"type":"Point","coordinates":[144.6490093,-37.8467266]},"context":[{"id":"locality.16465363026367850","wikidata":"Q7686407","text":"Tarneit"},{"id":"postcode.13063936157867600","text":"3029"},{"id":"place.7068896531111320","wikidata":"Q3141","text":"Melbourne"},{"id":"region.10354338764038050","short_code":"AU-VIC","wikidata":"Q36687","text":"Victoria"},{"id":"country.3050683007346070","short_code":"au","wikidata":"Q408","text":"Australia"}]},{"id":"address.4747843698089450","type":"Feature","place_type":["address"],"relevance":1,"properties":{"accuracy":"street"},"text":"Santa Catalina Crescent","place_name":"Santa Catalina Crescent, Seaford Rise South Australia 5169, Australia","center":[138.4824468,-35.2006796],"geometry":{"type":"Point","coordinates":[138.4824468,-35.2006796]},"context":[{"id":"locality.17908285661520300","wikidata":"Q7440389","text":"Seaford Rise"},{"id":"postcode.7017836284635270","text":"5169"},{"id":"place.10281734113062160","wikidata":"Q5112","text":"Adelaide"},{"id":"region.10227158564642850","short_code":"AU-SA","wikidata":"Q35715","text":"South Australia"},{"id":"country.3050683007346070","short_code":"au","wikidata":"Q408","text":"Australia"}]},{"id":"address.6569340582465604","type":"Feature","place_type":["address"],"relevance":1,"properties":{"accuracy":"street"},"text":"Santa Cruz View","place_name":"Santa Cruz View, Point Cook Victoria 3030, Australia","center":[144.7434822,-37.8950444],"geometry":{"type":"Point","coordinates":[144.7434822,-37.8950444]},"context":[{"id":"locality.4307885032368650","wikidata":"Q7207994","text":"Point Cook"},{"id":"postcode.5120185980658060","text":"3030"},{"id":"place.7068896531111320","wikidata":"Q3141","text":"Melbourne"},{"id":"region.10354338764038050","short_code":"AU-VIC","wikidata":"Q36687","text":"Victoria"},{"id":"country.3050683007346070","short_code":"au","wikidata":"Q408","text":"Australia"}]}],"attribution":"NOTICE: © 2019 Mapbox and its suppliers. All rights reserved. Use of this data is subject to the Mapbox Terms of Service (https://www.mapbox.com/about/maps/). This response and the information it contains may not be retained. POI(s) provided by Foursquare."}');
        console.log(x.features[0].geometry.coordinates);
    }

    var xhr = new XMLHttpRequest();
    xhr.open("POST",'/submit', true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(JSON.stringify({
            latitude: 50,
            longitude: 100,
            name: document.getElementById("name").value,
            description: document.getElementById("description").value,
            image: null,
            n_ratings: 32,
            rating: 3.5,
            type: 1
    }));
    // axios.post('/submit',
    //     {
    //         'latitude': 50,
    //         'longitude': 100,
    //         'name': document.getElementById("name").value,
    //         'description': document.getElementById("description").value,
    //         'image': null,
    //         'n-rating': 32,
    //         'rating': 3.5,
    //         'type': 1
    // })
    // .then(
    // )
}
function serialize(str){
    str = str.toString().split(" ");
    var ser = str[0];
    for(var i = 1; i < str.length; i++){
        var temp = "%" + str[i];
        ser += temp;
    }
    console.log(ser);
    return ser;
}

function getPoints(){
    const Http = new XMLHttpRequest();
    const url = '/points';
    Http.open("GET",url);
    Http.send();

    Http.onreadystatechange = (e) => {
        // call whatever function to update the map with new data
        // sample
        console.log(Http.responseText);
    }
}

map.on('load', function() {
    // Add a new source from our GeoJSON data and set the
    // 'cluster' option to true. GL-JS will add the point_count property to your source data.
    map.addSource("earthquakes", {
        type: "geojson",
        // Point to GeoJSON data. This example visualizes all M1.0+ earthquakes
        // from 12/22/15 to 1/21/16 as logged by USGS' Earthquake hazards program.
        data: "https://docs.mapbox.com/mapbox-gl-js/assets/earthquakes.geojson",
        cluster: true,
        clusterMaxZoom: 14, // Max zoom to cluster points on
        clusterRadius: 50 // Radius of each cluster when clustering points (defaults to 50)
    });

    map.addLayer({
        id: "clusters",
        type: "circle",
        source: "earthquakes",
        filter: ["has", "point_count"],
        paint: {
            // Use step expressions (https://docs.mapbox.com/mapbox-gl-js/style-spec/#expressions-step)
            // with three steps to implement three types of circles:
            //   * Blue, 20px circles when point count is less than 100
            //   * Yellow, 30px circles when point count is between 100 and 750
            //   * Pink, 40px circles when point count is greater than or equal to 750
            "circle-color": [
                "step",
                ["get", "point_count"],
                "#05386B",
                100,
                "#379683",
                750,
                "#5CDB95"
            ],
            "circle-radius": [
                "step",
                ["get", "point_count"],
                20,
                100,
                30,
                750,
                40
            ]
        }
    });

    map.addLayer({
        id: "cluster-count",
        type: "symbol",
        source: "earthquakes",
        filter: ["has", "point_count"],
        layout: {
            "text-field": "{point_count_abbreviated}",
            "text-font": ["DIN Offc Pro Medium", "Arial Unicode MS Bold"],
            "text-size": 12
        }
    });

    map.addLayer({
        id: "unclustered-point",
        type: "circle",
        source: "earthquakes",
        filter: ["!", ["has", "point_count"]],
        paint: {
            "circle-color": "#05386B",
            "circle-radius": 4,
            "circle-stroke-width": 1,
            "circle-stroke-color": "#fff"
        }
    });

    // inspect a cluster on click
    map.on('click', 'clusters', function (e) {
        var features = map.queryRenderedFeatures(e.point, { layers: ['clusters'] });
        var clusterId = features[0].properties.cluster_id;
        map.getSource('earthquakes').getClusterExpansionZoom(clusterId, function (err, zoom) {
            if (err)
                return;

            map.easeTo({
                center: features[0].geometry.coordinates,
                zoom: zoom
            });
        });
    });

    map.on('mouseenter', 'clusters', function () {
        map.getCanvas().style.cursor = 'pointer';
    });
    map.on('mouseleave', 'clusters', function () {
        map.getCanvas().style.cursor = '';
    });
});


// var points = {
//   type: 'FeatureCollection',
//   features:[]
// }

// function add_point(latitude, longitude, name, description, image, n_ratings, rating, type) {
//   points.features.push(
//     {
//       type: 'Feature',
//       geometry: {
//         type: 'Point',
//         coordinates: [latitude, longitude]
//       },
//       properties: {
//         title: name,
//         description: description,
//         image: image,
//         n_ratings: n_ratings,
//         rating:rating,
//         type: type
//       }
//     }
//   )
// }