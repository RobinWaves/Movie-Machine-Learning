// Create a map object
var myMap = L.map("map-id", {
    center: [10.00, 34.00],
    zoom: 3
  });
  
  // Add a tile layer
  L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
    tileSize: 512,
    maxZoom: 18,
    zoomOffset: -1,
    id: "mapbox/streets-v11",
    accessToken: API_KEY
  }).addTo(myMap);


// Creates a green marker with the video camera icon
var icons = {
  TOPONE: L.ExtraMarkers.icon({
    icon: "icon ion-videocamera",
    iconColor: "white",
    markerColor: "blue",
    shape: "circle"
  }),

  TOP: L.ExtraMarkers.icon({
    icon: "icon ion-videocamera",
    iconColor: "white",
    markerColor: "green",
    shape: "circle"
  }),

  MID: L.ExtraMarkers.icon({
    icon: "icon ion-videocamera",
    iconColor: "white",
    markerColor: "yellow",
    shape: "circle"
  }),

  LOW: L.ExtraMarkers.icon({
    icon: "icon ion-videocamera",
    iconColor: "white",
    markerColor: "red",
    shape: "circle"
  })
};
// var movieMarker = L.ExtraMarkers.icon({
//     icon: "icon ion-videocamera",
//     iconColor: "white",
//     markerColor: "green",
//     shape: "circle"
//   });


d3.json('/api/similarity_scores').then(function(data, err) {
    d3.json('/static/js/countries.json').then(function(country_data) {
        if (err) throw err;
        // console.log(data);
        
        var country_list = [];
    
        for (i=0; i < country_data.length; i++)
        {
            //console.log(country_data[i]);
            country_name = country_data[i].name;
            lat = country_data[i].latlng[0];
            lng = country_data[i].latlng[1];
            //console.log(lat, lng);
            var country_info 
            country_info = {'country_name' : country_name, 'lat': lat, 'lng': lng};
            country_list.push(country_info);
        };//end of for loop

        //console.log(country_list);

        for (var i=0; i < data.length; i++) {
            console.log(data[i]);
            countryName = data[i].country_language_x;
            console.log('countryName: ' + countryName)
            country_index = country_list.findIndex(country => country.country_name == countryName)
            //console.log(country_index)
            //console.log(country_list[country_index])

            if (i%2 == 0) {
            lat = country_list[country_index].lat + (i*.05);//(Math.cbrt(i));//(.25*i));
            lng = country_list[country_index].lng - (i*.05);}//(Math.cbrt(i));//(.25*i)); 

            else {
              lat = country_list[country_index].lat - (i*.05);//(Math.cbrt(i));//(.25*i));
              lng = country_list[country_index].lng - (i*.08);//(Math.cbrt(i));//(.25*i));  
            }
            
            //Different colors depending on how similar 
            if (i == 0) {
              icon=icons['TOPONE'];
            }
            else if (i > 0 && i<= 5 ) {
              icon = icons['TOP'];
            }
            else if (i > 5 && i < 11) {
              icon = icons['MID'];
            }
            else {
              icon = icons['LOW'];
            };

            //Add markers
            //if (countryName !== "United States") {
            if (data[i].international == 1) {
            L.marker([lat, lng], {icon: icon})
                .bindPopup("<h4><b>#" + (i+1) + ": " + data[i].title 
                + "</h4><hr><h7><b>Country Origin: </b>" + countryName
                + "<br><b>Production Companies: </b>"  + data[i].production_companies
                + "<br><b>Release Date: </b>" + data[i].release_date
                + "<br><b>Genre: </b>" + data[i].genres
                + "<br><br><b>Summary: </b>" + data[i].overview + "</h7>")
                .addTo(myMap); }


        }//end for loop

    }) //end d3.json
}); //end d3.json

//console.log(country_list.findIndex(country => country.country_name = "United States"))