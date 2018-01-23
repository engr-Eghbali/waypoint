
var lchecker=1;
$(window).load(function() {

	$("#loading").fadeOut(800);

  $(window).ready(function(){
      
      $("#menu").show(2250);

     
      });

});

      
     
     var waypts= [];
     var directionsService;//
     var directionsDisplay;//
     var map;

    


     function way() {
       // setDelay(500); 
         directionsService = new google.maps.DirectionsService;
         directionsDisplay = new google.maps.DirectionsRenderer;
      
        directionsDisplay.setMap(map);

      
          calculateAndDisplayRoute(directionsService, directionsDisplay);
      
      }

      function calculateAndDisplayRoute(directionsService, directionsDisplay) {
      
      
        directionsService.route({
          origin: waypts[0].location,
          destination: waypts[1].location,
          waypoints: waypts,
          optimizeWaypoints: true,
          travelMode: 'DRIVING'
        }, function(response, status) {
            
          if (status ==google.maps.DirectionsStatus.OK) {
           
            directionsDisplay.setDirections(response);
            var route = response.routes[0];
            var summaryPanel = document.getElementById('directions-panel');
            summaryPanel.innerHTML = '';
            // For each route, display summary information.
            for (var i = 0; i < route.legs.length; i++) {
              var routeSegment = i + 1;
              summaryPanel.innerHTML += '<b>Route Segment: ' + routeSegment +
                  '</b><br>';
              summaryPanel.innerHTML += route.legs[i].start_address + ' to ';
              summaryPanel.innerHTML += route.legs[i].end_address + '<br>';
              summaryPanel.innerHTML += route.legs[i].distance.text + '<br><br>';
            }
          } else {
            window.alert('خطا ' + status);
          }
        });
      }


      var p2 = document.createElement("P");
            var textnode = document.createTextNode(" مبدا،مقصد و سپس مسیرهای دلخواه را به ترتیب اضافه کنید");
            p2.appendChild(textnode);
            document.getElementById("routs").appendChild(p2);

            navigator.geolocation.getCurrentPosition(initMap,onError);

      function onError(error){
        alert("the code is " + error.code + ". \n" + "message: " + error.message);
    }

      function initMap(position) {
       
        
        var longitude = position.coords.longitude;
        var latitude = position.coords.latitude;
        var latLong = new google.maps.LatLng(latitude, longitude);

              
       
         map = new google.maps.Map(document.getElementById('map'), {
            zoom: 13,
            center:latLong// {lat: 31.85, lng: 51.25}
        });
        var card = document.getElementById('pac-card');
        var input = document.getElementById('pac-input');
        var types = document.getElementById('type-selector');
        var strictBounds = document.getElementById('strict-bounds-selector');
        var address = '';

        map.controls[google.maps.ControlPosition.TOP_RIGHT].push(card);

        var marker = new google.maps.Marker({
          position: latLong,
          map: map,
          title: 'Your Position'
        });
    

        var autocomplete = new google.maps.places.Autocomplete(input);

        // Bind the map's bounds (viewport) property to the autocomplete object,
        // so that the autocomplete requests use the current map bounds for the
        // bounds option in the request.
      
  
  
        autocomplete.bindTo('bounds', map);

        var infowindow = new google.maps.InfoWindow();
        var infowindowContent = document.getElementById('infowindow-content');
        infowindow.setContent(infowindowContent);
     

        autocomplete.addListener('place_changed', function() {
          infowindow.close();
        
          var place = autocomplete.getPlace();
          if (!place.geometry) {
            // User entered the name of a Place that was not suggested and
            // pressed the Enter key, or the Place Details request failed.
            window.alert("جزئیات موجود نیست: '" + place.name + "'");
            return;
          }
          
         
         // place.geometry.viewport
         //  and
         // place.geometry.location
         //   if you need!
        

         
          if (place.address_components) {
            address = [
              (place.address_components[0] && place.address_components[0].short_name || ''),
              (place.address_components[1] && place.address_components[1].short_name || ''),
              (place.address_components[2] && place.address_components[2].short_name || '')
            ].join(' ');
          }
         
         
         
            

          //info window stuff
         // infowindowContent.children['place-icon'].src = place.icon;
         // infowindowContent.children['place-name'].textContent = place.name;
         // infowindowContent.children['place-address'].textContent = address;
         // infowindow.open(map, marker);
        });
        document.getElementById('add').addEventListener('click', function() {
          
         
             

           


           while(address=="");
            waypts.push({
              location:address,
              stopover: true
            });
      
            var node = document.createElement("LI");
            var textnode = document.createTextNode(address);
            node.appendChild(textnode);
            document.getElementById("routs").appendChild(node);
            
        });
        document.getElementById('run').addEventListener('click', function() {
          if(waypts.length<3){
            alert("ابتدا مبدا سپس مقصد و حداقل یک مسیر دیگر وارد کنید.")
          }else{
            way();
          }
      
        
            
        });
      
        document.getElementById('rst').addEventListener('click', function() {
          
      
          location.reload(true);
              
          });
       
      
       
      }
       var flg=1;
      $( "#float" ).click(function() {
        if(flg==0){

          $("#bar").animate({
            
            height:"2%",
            right:"0%",
            bottom:"0%"
          },1000);



          $( "#layer1" ).hide( 1500 );
          $( "#pac-card" ).hide( 1300 );
          $("#menu").show(1800);
          flg=1;
         
        }else{
          $("#menu").hide(800);
          $( "#layer1" ).show( 1500 );
          $( "#pac-card" ).show( 1300 );

          flg=0;
        }
             
 

});

function goright(){
  $("#bar").animate({
       right:"-96%"
       
     },800);
    
     goup();
     // call next function here - process(grapes); and so on...
   
}


function firstpos(){
  $("#bar").animate({
 bottom:"100%"
   
 },800);

 setTimeout(function(){
   showthings();
 },800);
}

function goup(){
 
$("#bar").animate({
  height:"100%"
   
 },800);



 setTimeout(
   function(){
   firstpos();
   },400);
    
   
}

function showthings(){

  $("#menu").hide(800);
          $( "#layer1" ).show( 800 );
          $( "#pac-card" ).show( 800 );
          flg=0;


}

$( "#menu" ).click(function() {
  if(flg==1){
    
goright();

         
  }
});

