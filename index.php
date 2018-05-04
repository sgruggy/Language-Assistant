<!DOCTYPE html>
<html lang="en-us">

<head>
	<!-- A-Frame VR Library -->
	<script src="libraries/aframe.min.js"></script>

	<!-- ARToolKit for A-Frame VR Library -->
	<script src='libraries/aframe-ar.js'></script>

	<!-- P5 libraries -->
	<script language="javascript" type="text/javascript" src="libraries/p5.js"></script>
	<script language="javascript" type="text/javascript" src="libraries/p5.dom.min.js"></script>

	<!-- Craig's AFrameP5 AR library -->
	<script language="javascript" type="text/javascript" src="libraries/aframep5_ar.js"></script>

	<!-- <script>
		if (location.protocol != 'https:') {
			location.href = 'https:' + window.location.href.substring(window.location.protocol.length);
		}
	</script>> -->

	<link rel="stylesheet" type="text/css" href="index.css" />
</head>

<body>
	<!-- Define A-Frame VR Scene and set it up so that it will be manipulated through AR.js -->
	<a-scene id="ARScene" embedded arjs='sourceType: webcam; debugUIEnabled: false; detectionMode: mono;'>
		<!-- set up all of the AR markers we will be working with along with links to their 'pattern' files -->
		<!-- note that we aren't putting any geometry inside of marker here - we will do that in the p5 sketch -->
		
		<?php
		$myfile = fopen("markers.json", "r") or die("Unable to open file!");
		$decoded = json_decode(fread($myfile, filesize('markers.json')));

		for($i = 0; $i < sizeof($decoded); $i++){
			echo '<a-marker class="artwork" id="' . $i .'" preset="custom" url="markers/' . $i . '.patt"></a-marker>';
		}
		fclose($myfile);
		?>
		<!-- <a-marker class="artwork" id="0" preset="custom" url="markers/0.patt"></a-marker> -->
		
		
		
		<!-- <a-marker preset="custom" url="markers/0.patt"></a-marker> -->
		<!-- <script>
			const parent = document.getElementById('ARScene');
			const toAdd = document.createElement('a-marker');
			toAdd.id = "0";
			toAdd.url = "markers/0.patt";
			toAdd.preset = "custom";
			parent.appendChild(toAdd);
			console.log(parent);

		</script> -->
		<a-entity camera></a-entity>
	</a-scene>

	<!-- The Modal -->
	<div id="myModal" class="modal">

		<!-- Modal content -->
		<div class="modal-content">
			<div class="modal-header">
				<span class="close">&times;</span>
				<h2 id="title">Title</h2>
				<h4 id="artist">Author, year</h4>
			</div>
			<div class="modal-body" id="modal-body">
				<img id="pic" src="" />
				<p id="transcript">Transcript</p>
			</div>
		</div>

	</div>

	<script src="libraries/marker_tagger.js"></script>
	<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
	<script language="javascript" type="text/javascript" src="sketch.js"></script>

</body>

</html>