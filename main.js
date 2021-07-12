video = "";

status = "";

objects = [];

function preload(){
    video = createVideo("video.mp4");
    video.hide();
}

function setup(){
    canvas = createCanvas(430,330);
    canvas.center();
}

function start(){
    objectDetector = ml5.objectDetector('cocossd',modelLoaded);
    document.getElementById("status").innerHTML = "Status - Detecting Objects";
}

function modelLoaded(){
    console.log("Model Loaded");
    status = true;
    video.loop();
    video.speed(1);
    video.volume(0);
}

function draw(){
    image(video,0,0,430,330);

    if (status != ""){
        objectDetector.detect(video,gotResult);

        for (i = 0; i < objects.length; i++) {
            document.getElementById("status").innerHTML = "Detecting Objects";
            document.getElementById("numberOfObjects").innerHTML = "Number Of Objects Detected Are:" + objects.length;
    
            fill("purple");
    
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label + " " + percent + "%",objects[i].x + 15,objects[i].y + 15);
            noFill();
            stroke("purple");
            rect(objects[i].x,objects[i].y,objects[i].width,objects[i].height);
        }
    }
}

function gotResult(error,results){
    if (error){
        console.log(error);
    }else{
        console.log(results);
        objects = results;
    }
}