var fft; // Global Variable for fft
var song; // Global Variable for the song
var button;// Global variable for the button

	function playSong(){ 
	if (song.isPlaying()) { // if audio is playing
		song.pause();//pause audio when button is pressed
	} else { // if audio is not playing
	song.play(); // play audio when button is pressed
	}
}
/*
Loads content within this function first. This ensures the song will start playing straight away.
*/
function preload(){
  song = loadSound ('migente.mp3');// loads song
}

function setup(){
	 createCanvas(windowWidth,windowHeight);// Make canvas be as tall and as wide as the window
	 colorMode(HSB);// set colour mode
	 button = createButton ('play');// creates a button named "play"
     button.mousePressed(playSong); // if mouse presses on the button, call the playSong function
     song.play(); // Plays assigned audio
     fft = new p5.FFT();// Initiates FFT object
     
}

function draw() {
	 background(0);// sets background to black
	 var spectrum = fft.analyze();// run the FFT analysis


 	var bass   = fft.getEnergy( "bass" ); // Local Variable, fft.getEnergy maps the different frequencies of the audio and returns values between 0 and 255
  	var treble = fft.getEnergy( "treble" );
  	var mid    = fft.getEnergy( "mid" ); 

  	var pieces = 70;//Local variable for the number of lines in the shape
  	var radius = 350;// Sets the circle's radius at 350.
 	translate (width/2, height/2);// Moves origin to the centre of the canvas
 	stroke (0);
  	strokeWeight(3);// Make lines appear thicker
	for( i = 0; i < pieces; i++ ) { // draws a line of each piece
  	rotate( TWO_PI / pieces ); // Rotates point of origin
  	stroke( i, 255, 255 ); // Draws gradient colour lines
    line( treble, radius/2, 0, radius )// These lines will have the treble values as their starting point
    stroke(255);// white lines
    line( mid, radius/2, 0, radius );// These lines have the mid frequency values as their starting points
    stroke(i,30,30); // sets colour 
    line( bass, mouseY, 0, radius ); // These lines are attached to the bass value and can also be manipulated according to the Y position of the mouse
    rect (bass,25,25,25); // These rectanges have the bass values as their upper left corner
    stroke(i, 255, 255)// sets lines to a gradient colour
    rect (5,mouseX,10,bass);// These rectangles can be manipulated according to the X position of the mouse and are also changing according to the values of the bass
    rect (5,mouseY,5,bass);// These rectangles can be manipulated according to the Y position of the mouse and are also changing according to the values of the bass
  	rect (treble,mouseY,5, 5);// These ractangles have the treble value as one of the parameters and can also be manipulated through mouse movement
}
  //console.log(mid);

  
}
