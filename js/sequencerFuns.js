import classNames from "https://cdn.skypack.dev/classnames/bind";
//Buffers




var pitchNew = 1;
var timePosL=0;
var timePosR=0;
var oldtimePosL=0;
var oldtimePosR=0;



var oldmyRawDataInit = 0;
var oldmyRawDataEnd = 0;
var myRawDataInit = 0;
var myRawDataEnd = 0;
var startTime = 0;
var endTime;
var timeDiff =0.5;
var stateCounting = false;
var myBpm = 120;
//const setBpmButton = document.querySelector('#setBpm');
const notes = ["Sample 1", "Sample 2", "Sample 3", "Sample 4", "Sample 5", "Sample 6", "Sample 7", "Sample 8"];


var setBpmButton = document.querySelector('#setBpm');
var audioCtx = new (window.AudioContext || window.webkitAudioContext)();


function startCounting() {
    // later record end time
    endTime = new Date();
    stateCounting = true;
};
function stopCounting(){
startTime = new Date();
timeDiff = startTime - endTime;
stateCounting = false;
};
function bpmCount(){
    timeDiff /= 1000;
    myBpm = Math.round(60/timeDiff);
    if (myBpm < 20){
    myBpm = 20;
    };
    if (myBpm > 300){
    myBpm = 300;
    };
};

function song(time){
  //console.log(time);
};

const makeSynths = (count) => {
  const synths = [];
  for (let i = 0; i < count; i++) {
    let synth = new Tone.Loop(song, '8n');
    Tone.Transport.start();
    synth.start(0);
    synths.push(synth);
  }
  return synths;
};


const makeGrid = (notes) => {

  const rows = [];

  for (const note of notes) {
    const row = [];
    for (let i = 0; i < 8; i++) {
      row.push({
        note: note,
        isActive: false
      });
    }
    rows.push(row);
  }
  return rows;
};

const makeSequencer = () => {
  // grab the top level div from the DOM
  const sequencer = document.getElementById("sequencer");
  
  // iterate through the grid
  grid.forEach((row, rowIndex) => {
    
    // make a new div for each row
    const seqRow = document.createElement("div");
    seqRow.id = `rowIndex`;
    seqRow.className = "sequencer-row";
    
    // iterate through each note in the row
    row.forEach((note, noteIndex) => {
      
      // a new button for each note
      const button = document.createElement("button");
      button.className = "note"
      
      button.addEventListener("click", function(e) {
        
        handleNoteClick(rowIndex, noteIndex, e);
        
      });
      
      // each note is appended to the parent div
      seqRow.appendChild(button);
    });
    // each row is appended to the top level div
    sequencer.appendChild(seqRow);
  });
};

const handleNoteClick = (clickedRowIndex, clickedNoteIndex, e) => {
  grid.forEach((row, rowIndex) => {
    row.forEach((note, noteIndex) => {
      if (clickedRowIndex === rowIndex && clickedNoteIndex === noteIndex) {
        note.isActive = !note.isActive;
        e.target.className = classNames(
          "note", 
          { "note-is-active": !!note.isActive }, 
          { "note-not-active": !note.isActive }
        );
      }
    });
  });
};
var repeat;
var configLoop = () => {

  repeat = (time) => {
    grid.forEach((row, index) => {
      let synth = synths[index];
      let note = row[beat];
      if (note.isActive) {

        if (note.note == 'Sample 1' && index==0){
            Tone.start();
          var source = audioCtx.createBufferSource();
        source.buffer = audioBuffer1;
        source.connect(audioCtx.destination);
        source.start();
        };
        if (note.note == 'Sample 2'){
            Tone.start();
          var source = audioCtx.createBufferSource();
        source.buffer = audioBuffer2;
        source.connect(audioCtx.destination);
        source.start();
        };
        if (note.note == 'Sample 3'){
            Tone.start();
          var source = audioCtx.createBufferSource();
        source.buffer = audioBuffer3;
        source.connect(audioCtx.destination);
        source.start();
        };
        if (note.note == 'Sample 4'){
            Tone.start();
          var source = audioCtx.createBufferSource();
        source.buffer = audioBuffer4;
        source.connect(audioCtx.destination);
        source.start();
        };
        if (note.note == 'Sample 5'){
            Tone.start();
          var source = audioCtx.createBufferSource();
        source.buffer = audioBuffer5;
        source.connect(audioCtx.destination);
        source.start();
        };
        if (note.note == 'Sample 6'){

          Tone.start();
          var source = audioCtx.createBufferSource();
        source.buffer = audioBuffer6;
        source.connect(audioCtx.destination);
        source.start();
        };
        if (note.note == 'Sample 7'){
            Tone.start();
          var source = audioCtx.createBufferSource();
        source.buffer = audioBuffer7;
        source.connect(audioCtx.destination);
        source.start();
        };
        if (note.note == 'Sample 8'){
          Tone.start();
          var source = audioCtx.createBufferSource();
        source.buffer = audioBuffer8;
        source.connect(audioCtx.destination);
        source.start();
        };

      }
    });

    beat = (beat + 1) % 8;
  };

  Tone.Transport.bpm.value = myBpm;
  Tone.Transport.scheduleRepeat(repeat, "8n");


};
const configPlayButton = () => {
  const button = document.getElementById("play-button");
  button.addEventListener("click", (e) => {
    if (!started) {
      

      Tone.start();

      started = true;
    }

    if (playing) {
      e.target.innerText = "Play";
      Tone.Transport.stop();
      playing = false;
    } else {
      e.target.innerText = "Stop";
      Tone.Transport.start();
      playing = true;
    }
  });
};
function configSetBpm(){

    if (!stateCounting){
    startCounting();
    }
    else {
    stopCounting();
    bpmCount();
    Tone.Transport.bpm.rampTo(myBpm, 0.1);
    document.getElementById("bpmResult").innerHTML = myBpm;

    }
};

let grid = makeGrid(notes);
let beat = 0;
let playing = false;
let started = false;
const synths = makeSynths(8);
window.addEventListener("DOMContentLoaded", () => {
  configPlayButton();
  configLoop();
  makeSequencer();
});

playButton1.addEventListener('click', () => {
        var source = audioCtx.createBufferSource();
        source.buffer = audioBuffer1;
        source.connect(audioCtx.destination);
        source.start();

      });
      playButton2.addEventListener('click', () => {
        var source = audioCtx.createBufferSource();
        source.buffer = audioBuffer2;
        source.connect(audioCtx.destination);
        source.start();

      });
      playButton3.addEventListener('click', () => {
        var source = audioCtx.createBufferSource();
        source.buffer = audioBuffer3;
        source.connect(audioCtx.destination);
        source.start();

      });
      playButton4.addEventListener('click', () => {
        var source = audioCtx.createBufferSource();
        source.buffer = audioBuffer4;
        source.connect(audioCtx.destination);
        source.start();

      });
      playButton5.addEventListener('click', () => {
        var source = audioCtx.createBufferSource();
        source.buffer = audioBuffer5;
        source.connect(audioCtx.destination);
        source.start();
      });
      playButton6.addEventListener('click', () => {
       var source = audioCtx.createBufferSource();
        source.buffer = audioBuffer6;
        source.connect(audioCtx.destination);
        source.start();

      });
      playButton7.addEventListener('click', () => {
        var source = audioCtx.createBufferSource();
        source.buffer = audioBuffer7;
        source.connect(audioCtx.destination);
        source.start();

      });
      playButton8.addEventListener('click', () => {
       var source = audioCtx.createBufferSource();
        source.buffer = audioBuffer8;
        source.connect(audioCtx.destination);
        source.start();

      });
      setBpmButton.addEventListener('click', () => {
       configSetBpm();

      });