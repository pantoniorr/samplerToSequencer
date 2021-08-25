
//Buffer
var pitchNew = 1;
var timePosL=0;
var timePosR=0;
var oldtimePosL=0;
var oldtimePosR=0;
const maxSecsPerSample = 10;
var audioCtx = new (window.AudioContext || window.webkitAudioContext)();

var audioBuffer = audioCtx.createBuffer(1, audioCtx.sampleRate * maxSecsPerSample, audioCtx.sampleRate);

var audioBuffer1 = audioCtx.createBuffer(1, audioCtx.sampleRate * maxSecsPerSample, audioCtx.sampleRate);
var audioBuffer2 = audioCtx.createBuffer(1, audioCtx.sampleRate * maxSecsPerSample, audioCtx.sampleRate);
var audioBuffer3 = audioCtx.createBuffer(1, audioCtx.sampleRate * maxSecsPerSample, audioCtx.sampleRate);
var audioBuffer4 = audioCtx.createBuffer(1, audioCtx.sampleRate * maxSecsPerSample, audioCtx.sampleRate);
var audioBuffer5 = audioCtx.createBuffer(1, audioCtx.sampleRate * maxSecsPerSample, audioCtx.sampleRate);
var audioBuffer6 = audioCtx.createBuffer(1, audioCtx.sampleRate * maxSecsPerSample, audioCtx.sampleRate);
var audioBuffer7 = audioCtx.createBuffer(1, audioCtx.sampleRate * maxSecsPerSample, audioCtx.sampleRate);
var audioBuffer8 = audioCtx.createBuffer(1, audioCtx.sampleRate * maxSecsPerSample, audioCtx.sampleRate);

var oldmyRawDataInit = 0;
var oldmyRawDataEnd = 0;
var myRawDataInit = 0;
var myRawDataEnd = 0;
var startTime = 0;
var endTime;
var timeDiff =0.5;
var stateCounting = false;
var myBpm = 120;





//Plots
const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
ctx.canvas.width  = 0.5*window.innerWidth;
ctx.canvas.height = 0.25*window.innerHeight;
const dpr = 1;
const padding = 20;
canvas.width = canvas.offsetWidth * dpr;
canvas.height = (canvas.offsetHeight + padding * 2) *dpr;
ctx.scale(dpr, 0.75*dpr);
ctx.translate(0, canvas.offsetHeight / 2 + padding);

var filteredData = [];
var rawData;
const samples = 512;
var audioChunks = [];
var tempData;

var clickState = 0;
var posOnCanvX = 0;
var posOnCanvY = 0;
var realPosOnCanvX = 0;
var realPosOnCanvY = 0;
var initDraw = 0; 
var endDraw = 0;


var audioUrl='';
var audioContext = new AudioContext();

const drawAudio = url => {
      fetch(url)
       .then(response => response.arrayBuffer())
       .then(arrayBuffer => audioContext.decodeAudioData(arrayBuffer))
        .then(audioBuffer => draw(normalizeData(filterData(audioBuffer))));
};

const filterData = audioBuffer => {
  rawData = audioBuffer.getChannelData(0);

  const blockSize = Math.floor(rawData.length / samples); // samples for each window
  const filteredData = [];
  for (let i = 0; i < samples; i++) {
    let blockStart = blockSize * i; // first sample for each block
    let sum = 0;
    for (let j = 0; j < blockSize; j++) {
      sum = sum + Math.abs(rawData[blockStart + j]); // samples sum for each block
    }
    filteredData.push(sum / blockSize); // avg = samples sum/block size the sum
  }
  return filteredData;
};

/*
Data Plot
 */
const normalizeData = filteredData => {
    const multiplier = Math.pow(Math.max(...filteredData), -1);
    return filteredData.map(n => n * multiplier);
}

var div = document.getElementById('myPics'), x1 = 0, y1 = 0, x2 = 0, y2 = 0;
function reCalc() {
    var x3 = Math.min(x1,x2);
    var x4 = Math.max(x1,x2);
    var y3 = Math.min(y1,y2);
    var y4 = Math.max(y1,y2);
    div.style.left = x3 + 'px';
    div.style.top = y3 + 'px';
    div.style.width = x4 - x3 + 'px';
    div.style.height = y4 - y3 + 'px';
}

const draw = normalizedData => {

  const canvas = document.querySelector("canvas");
  const ctx = canvas.getContext("2d");
  ctx.canvas.width  = 0.5*window.innerWidth;
  ctx.canvas.height = 0.25*window.innerHeight;
  const dpr = 1;
  const padding = 20;
  canvas.width = canvas.offsetWidth * dpr;
  canvas.height = (canvas.offsetHeight + padding * 2) *dpr;
  
  
  ctx.scale(dpr, 0.75*dpr);
  ctx.translate(0, canvas.offsetHeight / 2 + padding); 

  // draw the line segments
  const width = canvas.offsetWidth / normalizedData.length;
  for (let i = 0; i < normalizedData.length; i++) {
    const x = width * i;
    let height = normalizedData[i] * canvas.offsetHeight - padding;
    if (height < 0) {
        height = 0;
    } else if (height > canvas.offsetHeight / 2) {
        height = height > canvas.offsetHeight / 2;
    }
    drawLineSegment(ctx, x, height, width, (i + 1) % 2);
  }
};

function writeMessage(canvas, message, posOnCanvX, posOnCanvY) {
        var context = canvas.getContext('2d');
        //context.clearRect(0, 0, canvas.width, canvas.height);
        context.font = '12pt Garamond, Georgia, serif';
        context.fillStyle = 'white';
        context.fillText(message, posOnCanvX, posOnCanvY);
      };

const drawLineSegment = (ctx, x, height, width, isEven) => {

  ctx.lineWidth = 1; // line thickness
  ctx.strokeStyle = "#99cbff"; // line color
  ctx.beginPath();
  height = isEven ? height : -height;
  ctx.moveTo(x, 0);
  ctx.lineTo(x, height);
  ctx.arc(x + width / 2, height, width / 2, Math.PI, 0, isEven);
  ctx.lineTo(x + width, 0);
  ctx.stroke();
};
      
/* mouse Position */
function getMousePos() {
            
            canvas.addEventListener('click', evt => {
            clickState =(clickState + 1)%2;
            const rect = canvas.getBoundingClientRect();
            posOnCanvX =  Math.abs(Math.round(100*(evt.clientX-rect.x)/ctx.canvas.width));
            posOnCanvY = Math.abs(Math.round(100*(evt.clientY-rect.y)/ctx.canvas.height - 50));
            var message = posOnCanvX + ' , ' + posOnCanvY;
            realPosOnCanvX = evt.clientX-rect.x;
            realPosOnCanvY = evt.clientY-rect.y-ctx.canvas.height/2;
            if (clickState == 1){
                  initDraw = realPosOnCanvX;
                  //console.log(clickState, initDraw, endDraw);
                      //this.clearRect(0, 0, this.canvas.width, this.canvas.height);
                      if(audioUrl){
                   drawAudio(audioUrl);}
                 }
            else {
                  endDraw =realPosOnCanvX;
                  clickState == 1;
                  //console.log(clickState, initDraw, endDraw);
                  drawLine(ctx, initDraw, 0, endDraw, 0);
                  drawLine(ctx, initDraw, 0.65*ctx.canvas.height, endDraw, 0.65*ctx.canvas.height);
                  drawLine(ctx, initDraw, 0, initDraw, 0.65*ctx.canvas.height);
                  drawLine(ctx, endDraw, 0, endDraw, 0.65*ctx.canvas.height);
                }
            
                
                          });
    
};


function drawLine(context, x1, y1, x2, y2) {
            context.beginPath();
            context.strokeStyle = 'white';
            context.lineWidth = 5;
            context.moveTo(x1, y1 - canvas.height/3);
            context.lineTo(x2, y2 - canvas.height/3);
            context.stroke();
            context.closePath();
          };



      const recordAudio = () =>
        new Promise(async resolve => {

          var stream = await navigator.mediaDevices.getUserMedia({ audio: true });
          const mediaRecorder = new MediaRecorder(stream);
         

          mediaRecorder.addEventListener('dataavailable', event => {
            audioChunks.push(event.data);
          });

          const start = () => {

            audioChunks = [];

            mediaRecorder.start();
          };

          const stop = () =>
            new Promise(resolve => {
              mediaRecorder.addEventListener('stop', () => {
                var audioBlob = new Blob(audioChunks);
                audioUrl = URL.createObjectURL(audioBlob);
                const audio = new Audio(audioUrl);
                const play = () => audio.play();
                resolve({ audioChunks, audioBlob, audioUrl, play });
              });

              mediaRecorder.stop();
            });

          resolve({ start, stop });
          
        });



      const sleep = time => new Promise(resolve => setTimeout(resolve, time));

      const recordButton = document.querySelector('#record');
      const stopButton = document.querySelector('#stop');
      const playButton = document.querySelector('#play');
      const editButton = document.querySelector('#edit');

      const saveButton1 = document.querySelector('#save1');
      const saveButton2 = document.querySelector('#save2');
      const saveButton3 = document.querySelector('#save3');
      const saveButton4 = document.querySelector('#save4');
      const saveButton5 = document.querySelector('#save5');
      const saveButton6 = document.querySelector('#save6');
      const saveButton7 = document.querySelector('#save7');
      const saveButton8 = document.querySelector('#save8');

      const playButton1 = document.querySelector('#play1');
      const playButton2 = document.querySelector('#play2');
      const playButton3 = document.querySelector('#play3');
      const playButton4 = document.querySelector('#play4');
      const playButton5 = document.querySelector('#play5');
      const playButton6 = document.querySelector('#play6');
      const playButton7 = document.querySelector('#play7');
      const playButton8 = document.querySelector('#play8');

      let recorder;
      let audio;

      recordButton.addEventListener('click', async () => {
        recordButton.setAttribute('disabled', true);
        stopButton.removeAttribute('disabled');
        playButton.setAttribute('disabled', true);
        editButton.setAttribute('disabled', true);

        saveButton1.setAttribute('disabled', true);
        saveButton2.setAttribute('disabled', true);
        saveButton3.setAttribute('disabled', true);
        saveButton4.setAttribute('disabled', true);
        saveButton5.setAttribute('disabled', true);
        saveButton6.setAttribute('disabled', true);
        saveButton7.setAttribute('disabled', true);
        saveButton8.setAttribute('disabled', true);

        playButton1.setAttribute('disabled', true);
        playButton2.setAttribute('disabled', true);
        playButton3.setAttribute('disabled', true);
        playButton4.setAttribute('disabled', true);
        playButton5.setAttribute('disabled', true);
        playButton6.setAttribute('disabled', true);
        playButton7.setAttribute('disabled', true);
        playButton8.setAttribute('disabled', true);
        if (!recorder) {
          recorder = await recordAudio();
        }
        recorder.start();
      });

      stopButton.addEventListener('click', async () => {
        recordButton.removeAttribute('disabled');
        stopButton.setAttribute('disabled', true);
        editButton.removeAttribute('disabled');
        playButton.removeAttribute('disabled');

        saveButton1.removeAttribute('disabled');
        saveButton2.removeAttribute('disabled');
        saveButton3.removeAttribute('disabled');
        saveButton4.removeAttribute('disabled');
        saveButton5.removeAttribute('disabled');
        saveButton6.removeAttribute('disabled');
        saveButton7.removeAttribute('disabled');
        saveButton8.removeAttribute('disabled');

        playButton1.removeAttribute('disabled');
        playButton2.removeAttribute('disabled');
        playButton3.removeAttribute('disabled');
        playButton4.removeAttribute('disabled');
        playButton5.removeAttribute('disabled');
        playButton6.removeAttribute('disabled');
        playButton7.removeAttribute('disabled');
        playButton8.removeAttribute('disabled');
        audio = await recorder.stop();
        drawAudio(audioUrl);
      });

      playButton.addEventListener('click', () => {
        audio.play();
      });

      editButton.addEventListener('click', () => {
        clickState = clickState + 1;

        if (clickState == 1 ){

          timePosL = initDraw;
          timePosR = endDraw;
 
          var reverse = 0;

          if (timePosL> timePosR){
              var tmp = timePosL;
              var tmp2 = timePosR;
              timePosL = tmp2;
              timePosR = tmp;
              reverse = 1;
          }};
         

         
        
    if ((oldtimePosR-oldtimePosL) < (timePosR-timePosL))
{
oldtimePosL=timePosL;
oldtimePosR=timePosR;
}
oldmyRawDataInit = Math.round((rawData.length * oldtimePosL) / (canvas.width));
oldmyRawDataEnd = Math.round((rawData.length * oldtimePosR) / (canvas.width));

  tempData = new Float32Array(oldmyRawDataEnd - oldmyRawDataInit); //new Float32Array(audioCtx.sampleRate * 10);
  myRawDataInit = Math.round((rawData.length * timePosL) / (canvas.width));
  myRawDataEnd = Math.round((rawData.length * timePosR) / (canvas.width));

  var message = myRawDataInit+ ', '+  myRawDataEnd + '/ '+ rawData.length;
    writeMessage(canvas, message);
  var i = 0;
 
  rawData.forEach(function(item, index, array) {
    if (index>=myRawDataInit && index <=myRawDataEnd){
      if(item != 'NaN'){
      tempData[i]=item;
      i=i+1;
    };
      };
    });
    if (reverse == 1)
      {
        //Problem here, it seems fixed
        
        var temporaryReverse = new Float32Array(oldmyRawDataEnd - oldmyRawDataInit);//tempData;
        for (let sampleFrames = 0; sampleFrames < tempData.length; sampleFrames++) 
        {
          temporaryReverse[sampleFrames] = tempData[tempData.length - sampleFrames];
        };
        tempData = temporaryReverse;
        reverse = 0;
        tempData[0] =0;
      };

  //Playing speed
  var x = document.getElementById("pitchVal").value;
  x /= 100;
  x += 0.5;
  pitchNew = x;

  //console.log(pitchNew);
  var temporaryPitch = new Float32Array(2*(oldmyRawDataEnd - oldmyRawDataInit));//tempData;
for (let sampleFrames = 0; sampleFrames < temporaryPitch.length; sampleFrames++) {
  temporaryPitch[sampleFrames] = 0;
}

for (let sampleFrames = 0; sampleFrames < tempData.length; sampleFrames++) 
        {
            var newIdx = Math.round(pitchNew*sampleFrames)
            temporaryPitch[newIdx] = tempData[sampleFrames];
        };

        /*to avoid zero samples artifacts*/
        if (x >= 1){
          var notZero = 0;
          for (let sampleFrames = 0; sampleFrames < temporaryPitch.length; sampleFrames++) 
                  {

                    
                    if (temporaryPitch[sampleFrames]!=0){
                      notZero = sampleFrames;
                    }
                    if (temporaryPitch[sampleFrames]==0){
                      temporaryPitch[sampleFrames]= temporaryPitch[notZero];
                    }
                  };
      };

tempData=new Float32Array(2*(oldmyRawDataEnd - oldmyRawDataInit));
tempData=temporaryPitch;
//fadeIn and fadeOut
for (let sampleFrames = 0; sampleFrames < tempData.length; sampleFrames++) 
        {
          if (sampleFrames<Math.round(tempData.length/100)){

            tempData[sampleFrames] = (sampleFrames/(tempData.length/100))*tempData[sampleFrames];
          }
          if (sampleFrames>tempData.length-Math.round(tempData.length/100)){

            tempData[sampleFrames] = (1-sampleFrames/(tempData.length-(tempData.length/100)))*tempData[sampleFrames];
          }
        };




audioBuffer.copyToChannel(new Float32Array(audioCtx.sampleRate * 10), 0, 0); 
//zero padding to avoid older samples to overlap to the new ones
audioBuffer.copyToChannel(tempData,0,0);

clickState = 0;


// AudioBufferSourceNode to play the AudioBuffer
var source = audioCtx.createBufferSource();

// buffer setting to the AudioBufferSourceNode
source.buffer = audioBuffer;

// AudioBufferSourceNode from source to dest

source.connect(audioCtx.destination);

// start the source playing
source.start();

    if ((oldtimePosR-oldtimePosL) < (timePosR-timePosL))
{
oldtimePosL=timePosL;
oldtimePosR=timePosR;
}
oldmyRawDataInit = Math.round((rawData.length * oldtimePosL) / (canvas.width));
oldmyRawDataEnd = Math.round((rawData.length * oldtimePosR) / (canvas.width));


//}; 
      
      });




      /*save buttons*/
      saveButton1.addEventListener('click', () => {
        audioBuffer1= audioCtx.createBuffer(1, tempData.length, audioCtx.sampleRate);
        audioBuffer1.copyToChannel(tempData,0,0);
        

      });
      saveButton2.addEventListener('click', () => {
       audioBuffer2= audioCtx.createBuffer(1, tempData.length, audioCtx.sampleRate);
       audioBuffer2.copyToChannel(tempData,0,0);

      });
      saveButton3.addEventListener('click', () => {
        audioBuffer3= audioCtx.createBuffer(1, tempData.length, audioCtx.sampleRate);
        audioBuffer3.copyToChannel(tempData,0,0);

      });
      saveButton4.addEventListener('click', () => {
        audioBuffer4= audioCtx.createBuffer(1, tempData.length, audioCtx.sampleRate);
        audioBuffer4.copyToChannel(tempData,0,0);


      });
      saveButton5.addEventListener('click', () => {
        audioBuffer5= audioCtx.createBuffer(1, tempData.length, audioCtx.sampleRate);
        audioBuffer5.copyToChannel(tempData,0,0);


      });
      saveButton6.addEventListener('click', () => {
        audioBuffer6 = audioCtx.createBuffer(1, tempData.length, audioCtx.sampleRate);
        audioBuffer6.copyToChannel(tempData,0,0);

      });
      saveButton7.addEventListener('click', () => {
        audioBuffer7 = audioCtx.createBuffer(1, tempData.length, audioCtx.sampleRate);
        audioBuffer7.copyToChannel(tempData,0,0);


      });
      saveButton8.addEventListener('click', () => {
        audioBuffer8 = audioCtx.createBuffer(1, tempData.length, audioCtx.sampleRate);
        audioBuffer8.copyToChannel(tempData,0,0);


      });
 
      

getMousePos();