var cities = [{
  "city": "London",
  "description":"London, the capital of England and the United Kingdom, is a 21st-century city with history stretching back to Roman times. At its centre stand the imposing Houses of Parliament, the iconic ‘Big Ben’ clock tower and Westminster Abbey, site of British monarch coronations. Across the Thames River, the London Eye observation wheel provides panoramic views of the South Bank cultural complex, and the entire city."
},
{
  "city": "New York",
  "description": "New York City comprises 5 boroughs sitting where the Hudson River meets the Atlantic Ocean. At its core is Manhattan, a densely populated borough that’s among the world’s major commercial, financial and cultural centers. Its iconic sites include skyscrapers such as the Empire State Building and sprawling Central Park. Broadway theater is staged in neon-lit Times Square"
},
{
  "city": "Rome",
  "description":"Rome, Italy’s capital, is a sprawling, cosmopolitan city with nearly 3,000 years of globally influential art, architecture and culture on display. Ancient ruins such as the Forum and the Colosseum evoke the power of the former Roman Empire. Vatican City, headquarters of the Roman Catholic Church, has St. Peter’s Basilica and the Vatican Museums, which house masterpieces such as Michelangelo’s Sistine Chapel frescoes."
}];

var activeCity='London';
var description=null;
startTime();
function populateSelect(){
var dropmenu = document.getElementById('selection');
for (var i = 0; i < cities.length; i++) {
  dropmenu.innerHTML= dropmenu.innerHTML + '<option value="' + cities[i]['city'] + '">'+cities[i]['city']+'</option>';
    }
    addListener(dropmenu);

}
function addListener(dropmenu){
  dropmenu.addEventListener('change', populateDescription);
}

function populateDescription(event){
var cityName= document.getElementById('cityName');
var cityDescr= document.getElementById('cityDescr');
  for (var i = 0; i < cities.length; i++) {
    if (event.target.value == cities[i].city){
      activeCity = cities[i].city;
      cityName.innerHTML= cities[i].city;
      cityDescr.innerHTML= cities[i].description;


    }
  }
  changeImage();
populateMap();
showWeather();



}






function changeImage() {
    var imgs = document.getElementsByClassName("imgSelected");
    for (var i = 0; i < imgs.length; i++) {
      imgs[i].src = activeCity +i +'.jpg';
    }

  }



  var slideIndex = 0;
  showSlides();

  function showSlides() {
      var i;
      var slides = document.getElementsByClassName("mySlides");
      var dots = document.getElementsByClassName("dot");
      for (i = 0; i < slides.length; i++) {
         slides[i].style.display = "none";
      }
      slideIndex++;
      if (slideIndex > slides.length) {slideIndex = 1}
      for (i = 0; i < dots.length; i++) {
          dots[i].className = dots[i].className.replace(" active", "");
      }
      slides[slideIndex-1].style.display = "block";
      dots[slideIndex-1].className += " active";
      setTimeout(showSlides, 2000); // Change image every 2 seconds
  }


  function populateWeather(weather){
  var weatherdescription= document.getElementById('temp');
  var weatherMain= document.getElementById('wDescr');
  weatherdescription.innerHTML= weather.main.temp + ' ℃' ;
  weatherMain.innerHTML= weather.weather[0].main;
  }


function populateMap(){
if (activeCity== 'London') {
  initMap();
}else if (activeCity == 'Rome') {
  Rome();

}else if (activeCity== 'New York') {
  NewYork();

}
}


function initMap() {
        map = new google.maps.Map(document.getElementById('mapDiv'), {
          center: {lat: 51.5073509, lng: -0.1277583},
          zoom: 8
        });
}
function Rome() {
        map = new google.maps.Map(document.getElementById('mapDiv'), {
          center: {lat: 41.9027835, lng: 12.4963655},
          zoom: 8
        });
}
function NewYork() {
        map = new google.maps.Map(document.getElementById('mapDiv'), {
          center: {lat: 40.7127753, lng: -74.0059728},
          zoom: 8
        });
}



function showWeather(){
  var request = new XMLHttpRequest();
request.open('GET', 'http://api.openweathermap.org/data/2.5/weather?q='+ activeCity + '&units=metric'+'&APPID=632b700a4464bbf76d0bfd48fd7e7194', true);

request.onload = function() {
  if (request.status >= 200 && request.status < 400) {
  var weather= JSON.parse(request.responseText);  // Success!
console.log( JSON.parse(request.responseText));
console.log( activeCity);

populateWeather(weather);
  } else {
    // We reached our target server, but it returned an error

  }
};

request.onerror = function() {
  // There was a connection error of some sort
};

request.send();

}


function startTime() {
    var today = new Date();
    var h = today.getHours();
    var h1 =  h + 1 ;
    var h5 = h-5;
    var hr = today.getHours();
    var m = today.getMinutes();
    var s = today.getSeconds();
    m = checkTime(m);
    s = checkTime(s);
    var t = setTimeout(startTime, 500);
    var weekday = new Array(7);
    weekday[0] = "Sun ";
    weekday[1] = "Mon ";
    weekday[2] = "Tue ";
    weekday[3] = "Wed ";
    weekday[4] = "Thu ";
    weekday[5] = "Fri ";
    weekday[6] = "Sat ";
    var day = weekday[today.getDay()];
    var month = new Array (12);
    month[0] = "Jan ";
    month[1] = "Feb ";
    month[2] = "Mar ";
    month[3] = "Apr ";
    month[4] = "May ";
    month[5] = "Jun ";
    month[6] = "Jul ";
    month[7] = "Aug ";
    month[8] = "Sep ";
    month[9] = "Oct ";
    month[10] = "Nov ";
    month[11] = "Dec ";
    var month = month[today.getMonth()];
    var date = today.getDate();
    var year = today.getFullYear();
    if (activeCity=='London') {
      document.getElementById("time").innerHTML = day + month+ date+ " " + year + " "+ " "+h + ":" + m + ":" + s;
    }else if (activeCity=='Rome') {
      document.getElementById("time").innerHTML = day + month+ date+ " " + year + " "+ " "+h1 + ":" + m + ":" + s;
    }else if (activeCity == 'New York') {
      document.getElementById("time").innerHTML = day + month+ date+ " " + year + " "+ " "+h5 + ":" + m + ":" + s;
    }
}
function checkTime(i) {
    if (i < 10) {i = "0" + i};  // add zero in front of numbers < 10
    return i;
}



showWeather();
populateSelect();
