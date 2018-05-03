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
          markers.push(marker);
        }
      }
  });
}