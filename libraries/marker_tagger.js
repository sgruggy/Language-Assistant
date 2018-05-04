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

        toAdd.htmlElement = createMarkerElement("ARScene", "artwork", toAdd.id);
        const marker = world.getMarker("" + toAdd.id);
        marker.data = toAdd;
        marker.onFound = callback;
        markers.push(marker);
      }
    }
  });
}

function Marker(id, world, data) {
  if (data) {
    this.data = data;
  }
  // store a reference to the world
  this.worldRef = world;

  // create a tag reference for this entity
  this.tag = document.getElementById(id);

  // setup a "children" array
  this.children = [];

  // child management
  this.addChild = function (child) {
    // append to our child array
    this.children.push(child);

    // give this child a reference to the world
    child.worldRef = this.worldRef;

    // append to our DOM element
    this.tag.appendChild(child.tag);
  }

  this.removeChild = function (child) {
    // first ensure that the item is actually a child
    var isChild = false;
    for (var i = 0; i < this.children.length; i++) {
      if (this.children[i] == child) {
        isChild = true;
        break;
      }
    }

    if (isChild) {
      this.children.splice(i, 1);
      this.tag.removeChild(child.tag);
    }
  }

  this.getChildren = function () {
    var returnChildren = [];
    for (var i = 0; i < this.children.length; i++) {
      returnChildren.push(this.children[i]);
    }

    return returnChildren;
  }

  this.isVisible = function () {
    return this.tag.object3D.visible;
  }

  this.getScreenPosition = function () {
    var renderer = this.worldRef.scene.renderer;
    var camera = this.worldRef.scene.camera;
    var vector = new THREE.Vector3();
    var widthHalf = 0.5 * renderer.getSize().width;
    var heightHalf = 0.5 * renderer.getSize().height;

    this.tag.object3D.updateMatrixWorld();
    vector.setFromMatrixPosition(this.tag.object3D.matrixWorld);
    vector.project(camera);

    vector.x = ((vector.x * widthHalf) + widthHalf) / this.worldRef.canvasFactor;
    vector.y = (-(vector.y * heightHalf) + heightHalf) / this.worldRef.canvasFactor;

    return {
      x: vector.x,
      y: vector.y
    };
  }

  this.executeFound = function () {
    this.onFound(this.data);
  }
}