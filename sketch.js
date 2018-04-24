// create a variable to hold our world object
var world;

//modal variables
const modal = document.getElementById('myModal');
// Get the <span> element that closes the modal
const span = document.getElementsByClassName("close")[0];

// create variables to hold our markers
const markers = [];
let found = false;

function setup() {
  document.getElementById('defaultCanvas0').style.display = 'none';
  
  // create our world (this also creates a p5 canvas for us)
  world = new World('ARScene');

  // grab a reference to our two markers that we set up on the HTML side (connect to it using its 'id')
  for (let i = 0; i < 5; i++) {
    const marker = world.getMarker("" + i);
    markers.push(marker);
  }
}


function draw() {
  // erase the background

  // use the markers as identity controllers
  if (!found) {
    for (let i = 0; i < markers.length; i++) {
      if (markers[i].isVisible()) {
        world.clearDrawingCanvas();
        found = true;

        fill(255);
        textSize(50);
        textAlign(CENTER);

        const request = new XMLHttpRequest;
        request.open('GET', "https://artworks1.herokuapp.com/" + i, true);
        request.onload = function () {
          if (request.status >= 200 && request.status < 400) {
            const artwork = JSON.parse(request.responseText);
            showModal(artwork);

          } else {
            console.log("connection error");
          }
        }

        request.send();
      }
    }
  }
}

function showModal(artwork){
  modal.style.display = "block";
  document.getElementById('title').innerHTML = artwork.name;
  document.getElementById('artist').innerHTML = artwork.artist + ", " + artwork.year;
  document.getElementById('pic').src = artwork.url;
  document.getElementById('transcript').innerHTML = artwork.transcript;
  const audioBox = document.getElementById('audioBox');
  const audio = document.createElement('source');
  audio.src = "audio/" + artwork.id + ".mp3";
  audio.type = "audio/mpeg";
  audioBox.appendChild(audio);
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
  found = false;
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
      modal.style.display = "none";
  }
}

function myFunction(e) {
 e.firstChild.classList.toggle('show');
}