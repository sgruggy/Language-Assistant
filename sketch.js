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
  matchMarkers(showModal);
  document.getElementById('defaultCanvas0').style.display = 'none';
  
  // create our world (this also creates a p5 canvas for us)
  world = new World('ARScene');

  // for (let i = 0; i < 5; i++) {
  //   const marker = world.getMarker("" + i);
  //   markers.push(marker);
  // }
}


function draw() {
  // erase the background

  // use the markers as identity controllers
  if (!found) {
    for (let i = 0; i < markers.length; i++) {
      if (markers[i].isVisible()) {
        const thisMarker = markers[i];
        world.clearDrawingCanvas();
        found = true;

        // const request = new XMLHttpRequest;
        // request.open('GET', "https://artworks1.herokuapp.com/" + i, true);
        // request.onload = function () {
        //   if (request.status >= 200 && request.status < 400) {
        //     const artwork = JSON.parse(request.responseText);
        //     showModal(artwork);

        //   } else {
        //     console.log("connection error");
        //   }
        // }

        // request.send();

        thisMarker.executeFound();
      }
    }
  }
}

function showModal(artwork){
  const modal_body = document.getElementById('modal-body');
  const audioBox = document.createElement('AUDIO');
  audioBox.setAttribute('controls', 'controls');
  audioBox.setAttribute('src', "audio/" + artwork.id + ".mp3");
  audioBox.id = "audioBox";
  modal_body.appendChild(audioBox);

  modal.style.display = "block";
  document.getElementById('title').innerHTML = artwork.name;
  document.getElementById('artist').innerHTML = artwork.artist + ", " + artwork.year;
  document.getElementById('pic').src = artwork.url;
  document.getElementById('transcript').innerHTML = artwork.transcript;  
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  removeAudio();
  modal.style.display = "none";
  found = false;
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {  
  if (event.target == modal) {
      removeAudio();    
      modal.style.display = "none";
  }
}

function showPopup(e) {
 e.firstChild.classList.toggle('show');
}

function removeAudio(){
  const removeAudio = document.getElementById('audioBox');
  removeAudio.parentNode.removeChild(removeAudio);
}

function matchMarkers(callback){
  $.ajax({
    url: "markers.json",
    async: true,
    dataType: "json",
    success: function(data){
      for(let i = 0; i < data.length; i++){
        const currentObj = data[i];
        const toAdd = {};

        for(const key in currentObj){
          toAdd[key] = currentObj[key];
        }

        toAdd.htmlElement = createMarkerElement("ARScene", "artwork", toAdd.id);
        const marker = world.getMarker("" + toAdd.id);
        marker.data = toAdd;
        marker.onFound = callback;
        console.log(marker.onFound);
        markers.push(marker);
      }
      console.log(document.getElementById('ARScene'));
    }
});
}

function createMarkerElement(parentId, className, id){
  const marker = document.createElement('a-marker');
  marker.id = id;
  marker.preset = "custom";
  marker.classList.add(className);
  marker.url = "markers/" + id + ".patt";
  document.getElementById(parentId).appendChild(marker);

  return marker;
}