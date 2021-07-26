let song1 = "", song2="";
let score_left_wrist=0,score_right_wrist=0;
let status1="", status2="";
var rightWristX = 0,rightWristY = 0;
var leftWristX = 0, leftWristY = 0;
function preload(){
	song1 = loadSound("music.mp3");
	song2 = loadSound("music2.mp3");
}
function setup() {
	canvas =  createCanvas(600, 500);
	canvas.center();
	video = createCapture(VIDEO);
	video.hide();
	poseNet = ml5.poseNet(video, modelLoaded);
	poseNet.on('pose', gotPoses);
}
function modelLoaded() {
  console.log('PoseNet Is Initialized');
}
function gotPoses(results){
	if(results.length > 0){
		console.log(results);
		score_right_wrist = results[0].pose.keypoints[10].score;
		score_left_wrist = results[0].pose.keypoints[9].score;
		console.log("score_left_wrist = " + score_left_wrist +" score_right_wrist = "+ score_right_wrist);

		rightWristX = results[0].pose.rightWrist.x;
		rightWristY = results[0].pose.rightWrist.y;
		console.log("rightWristX = " + rightWristX +" rightWristY = "+ rightWristY);

		leftWristX = results[0].pose.leftWrist.x - 10;
		leftWristY = results[0].pose.leftWrist.y + 20;
		console.log("leftWristX = " + leftWristX +" leftWristY = "+ leftWristY);
	}
}
function draw(){
	image(video, 0, 0, 600, 500);
	fill("#FF0000");
	stroke("#FF0000");
	status1 = song1.isPlaying();
	status2 = song2.isPlaying();
	if(score_left_wrist > 0.2){
		circle(leftWristX,leftWristY,20);
		song1.stop();
		if(status2 == false){
			song2.play();
			document.getElementById("song").innerHTML = "Playing - Peter pan song";
		}
	}

	if(score_right_wrist > 0.2){
		circle(rightWristX,rightWristY,20);
		song2.stop();
		if(status1 == false){
			song1.play();
			document.getElementById("song").innerHTML = "Playing - Harry Potter theme song";
		}
	}
}