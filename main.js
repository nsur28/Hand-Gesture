Webcam.set({
    width:350,
    height:300,
    image_format: 'png',
    png_quality: 90
});
prediction_1="";
prediction_2="";
camera= document.getElementById("camera");
Webcam.attach("#camera");
function take_snapshot(){
    Webcam.snap(function(data_uri){
        document.getElementById("result").innerHTML='<img id="capture_image" src="'+data_uri+'"/>'

    })
}
console.log('ml5 version: ', ml5.version);
classifier= ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/J9ziQ05tf/',modelLoaded)
function modelLoaded(){
    console.log('modelLoaded');
}
function speak(){
    var Synth= window.speechSynthesis;
    speak_data1="prediction 1 is   "+prediction_1;
    speak_data2="prediction 2 is   "+prediction_2;
    var utterThis= new SpeechSynthesisUtterance(speak_data1+speak_data2);
    Synth.speak(utterThis)
}
function check(){
    img=document.getElementById('capture_image');
    classifier.classify(img,gotResult);
}
function gotResult(error,results){
    if(error){
        console.log(error);
    }
    else{
        console.log(results);
        document.getElementById("result_gesture_name1").innerHTML=results[0].label;
        document.getElementById("result_gesture_name2").innerHTML=results[1].label;
        prediction_1=results[0].label;
        prediction_2=results[1].label;
        speak();
        if(results[0].label=="thumbs up"){
            document.getElementById("update_gesture1").innerHTML="&#128522;";
        }
        if(results[0].label=="thumbs in the middle"){
            document.getElementById("update_gesture1").innerHTML="&#128532;";
        }
        if(results[0].label=="thumbs down"){
            document.getElementById("update_gesture1").innerHTML="&#128548;";
        }
        if(results[1].label=="thumbs up"){
            document.getElementById("update_gesture2").innerHTML="&#128522;";
        }
        if(results[1].label=="thumbs in the middle"){
            document.getElementById("update_gesture2").innerHTML="&#128532;";
        }
        if(results[1].label=="thumbs down"){
            document.getElementById("update_gesture").innerHTML="&#128548;";
        }
    }
}