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
  world = new World('ARScene');
}


function draw() {
  if (!found) {
    for (let i = 0; i < markers.length; i++) {
      if (markers[i].isVisible()) {
        const thisMarker = markers[i];
        world.clearDrawingCanvas();
        found = true;

        thisMarker.executeFound();
      }
    }
  }
}

function showModal(artwork) {
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
span.onclick = function () {
  removeAudio();
  modal.style.display = "none";
  found = false;
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
  if (event.target == modal) {
    removeAudio();
    modal.style.display = "none";
  }
}

function showPopup(e) {
  e.firstChild.classList.toggle('show');
}

function removeAudio() {
  const removeAudio = document.getElementById('audioBox');
  removeAudio.parentNode.removeChild(removeAudio);
}

function matchMarkers(callback) {
  $.ajax({
    url: "markers.json",
    async: true,
    dataType: "json",
    success: function (data) {
      for (let i = 0; i < data.length; i++) {
        const currentObj = data[i];
        const toAdd = {};

        for (const key in currentObj) {
          toAdd[key] = currentObj[key];
        }

        const marker = world.getMarker("" + toAdd.id);
        marker.data = toAdd;
        marker.onFound = callback;
        markers.push(marker);
      }
      console.log(document.getElementById("ARScene"));
    }
  });
}