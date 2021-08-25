# samplerToSequencer
_Sample, edit, sequence_

Author: Antonio Orrù

University project: "Advanced Coding Tools and Methodologies", by Prof. Francesco Bruschi, Prof. Vincenzo Rana, Politecnico di Milano - M.Sc. Music and Acoustic Engineering

webSite: https://notanumber01.altervista.org/index.html

Youtube demo: __



_Overview_

**samplerToSequencer** is a creative tool that allows you to create samples sequences by capturing the audio stream from your interface. It is intended to be a fun tool mostly to experiment by recording random sounds and using them to create original sound patterns. 


_Technical aspects_:

The current version is implemented as an HTML page, relying on a CSS stylesheet and JS scripts. The two main blocks are splitted into two different JS files which implement the sampler and the sequencer parts. The sampler is based on two elements: the recorder and the editor. The recorder has been implemented using the MediaRecorder and the Recording/Stop/Play states are managed by asynchronous promises. Once the input audio stream has been recorded, an averaged version of the incoming waveform is plotted on a Canvas. A second Canva overlaps the first one in order to manage the user selection of the part of the waveform and its plot. 
The editor acts on the audioBuffer in order to use the selected samples and play them forwards (or in reverse) at the selected speed (from 1.5x up to 0.5x).
It also manages the saving process into one of the eigth AudioBuffers which are then used by the Sequencer.
The Sequencer relies on the Tone.js Web Audio framework for the implementation of the time grid (8 beats), the management of BPM and the samples triggering. This part of the code also handles the creation of the graphic objects in the DOM for the 8x8 matrix of the sequencer itself.

_Stability issues and further improvements_:

Tested on Chrome 92.0.4515.159 in macOS High Sierra.

Further improvements might include:

DSP implementations: OLA family based algorithms for time stretching or pitch shifting of the samples, HPF, LPF and Reverb effects;

Clock stability and sync with external DAWs or MIDI/OSC platforms;

General UI improvements;

More steps of the sequencer;

A more precise selection of the waveform;

Export the audio render.


_Notes and Credits_:

The knob implementation has been made by KnobMan (https://github.com/g200kg/input-knobs).

The idea behind the sequencer starts from this project: https://medium.com/geekculture/creating-a-step-sequencer-with-tone-js-32ea3002aaf5



