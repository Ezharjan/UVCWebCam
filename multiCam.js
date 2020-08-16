// 获取页面视频元素
var video = document.getElementById('video');
var video1 = document.getElementById('video1');
// var img = document.getElementById('img');



navigator.mediaDevices.enumerateDevices().then(getMyDevices).catch(handleError);




// 遍历所有的设备，包括视频和音频设备，找出 RGB相机设备。 
function getMyDevices(deviceInfos) {

    let constraints = new Array(2);

    let id = 0;


    for (let i = 0; i !== deviceInfos.length; ++i) {

        let deviceInfo = deviceInfos[i];

        console.log("device info: " + Object.keys(deviceInfo));

        if (deviceInfo.kind === 'videoinput') {

            console.log("$$$$$");
            console.log("label: " + deviceInfo.label);

            // if (deviceInfo.label.search("RGB") !== -1) {
            //if (deviceInfo.label.search("Full HD webcam") !== -1) {
            console.log(id + " --- deviceID is ###: " + deviceInfo.deviceId);
            constraints[id] = {
                video: {
                    deviceId: deviceInfo.deviceId
                },
                // audio: true,
                video: { width: 1280, height: 720 }
            };
            id = id + 1;
            //}
        } else {
            console.log('stranger detected: ' + deviceInfo.kind)
        }
    }



    // console.log(constraints[0]);
    navigator.mediaDevices.getUserMedia(constraints[0]).
        then(getStreamFromCamA).catch(handleError);
    navigator.mediaDevices.getUserMedia(constraints[1]).
        then(getStreamFromCamB).catch(handleError);

}





function getStreamFromCamA(stream) {
    console.log("camera A is running");
    window.stream = stream; // make stream available to console
    video.srcObject = stream;
    video.play();
}



function getStreamFromCamB(stream2) {
    console.log("camera B is running");
    window.stream = stream2; // make stream available to console
    video1.srcObject = stream2;
    video1.play();
    // img.src = stream2.data;
}



















function handleError(error) {
    console.log('Error: ', error);
}


















// var id = setInterval(function () {
//     console.log("drawing...");

//     draw(id)
// }, 24);


function draw(id) {
    localStorage.interval_id = id;
    let canvas = document.querySelector('canvas');
    canvas.getContext('2d').drawImage(video1, 0, 0, canvas.width, canvas.height);
}
