# samplerToSequencer
_Sample, edit, sequence_

Author: Antonio Orrù
University project: "Advanced Coding Tools and Methodologies", by Prof. Francesco Bruschi, Prof. Vincenzo Rana, Politecnico di Milano - M.Sc. Music and Acoustic Engineering
webSite: https://notanumber01.altervista.org/index.html
Youtube demo: __



Overview

**samplerToSequencer** is a creative tool that allows you to create samples sequences by capturing the audio stream from your interface. It is intended to . One parrot is controlled by the user, the other by the computer. The user plays a melody: after a measure, the computer responds with an imitation of it, in the form of a canon. Based on the quality of the user’s melody, and its interaction with the computer generated one, the other parrot is either attracted or repelled. The goal of the game is to have the two parrots to kiss and flee together.

The canon is a contrapuntal technique in which a melody acts as a subject (leader), to which one or more other voices respond, after a certain time, by imitation (follower). The imitation may be at the unison, or at a given interval (e.g. canon at the III). The imitation motion may be parallel, preserving the original intervals, or similar, scaling them by some factor. The canon may be inverse, in that intervals in the imitation are the vertical mirror image of those in the original melody, and it may be backwards, in that mirroring is performed horizontally in time. Other constraints are available, but not implemented in the current version of the game. By definition, the game is based on the canon in two voices.

The user may choose between three tuning systems: pythagorean tuning, in which frequency ratios are composed of powers of 2 and 3; 5-limit just intonation, which extends pythagorean tuning to powers of 5; equal temperament, in which frequency ratios are expressed as powers of the 12-th root of 2.

The user may select a tonal reference (by means of key, octave and alteration) and a modal scale; they may also intervene directly on the signature. The resulting scale, spanning across two octaves, is invariantly mapped over the computer keyboard or a parallel MIDI device.

The temporal scan is dynamic and may be changed in real time. A metronome option is available.

At the beginning of the game, the counter-chant responds after a 4/4 measure. At every measure, the performance is evaluated and, based on the score, the follower parrot may move towards or away from the leader, thus shortening or extending the measure by a quarter note. When the measure is reduced to zero, the user wins, and the two chants are parallel and detached from rhythm. When the follower moves further back from the initial position, the user loses and is left singing alone.

_Technical aspects_:

The current version is implemented as an HTML page, relying on a CSS stylesheet and JS scripts. The two main blocks are splitted into two different JS files which implement the sampler and the sequencer parts. The sampler is based on two elements: the recorder and the editor. The recorder has been implemented using the MediaRecorder and the Recording/Stop/Play states are managed by asynchronous promises. Once the input audio stream has been recorded, an averaged version of the incoming waveform is plotted on a Canvas. A second Canva overlaps the first one in order to manage the user selection of the part of the waveform and its plot. 
The editor acts on the audioBuffer in order to use the selected samples and play them forwards (or in reverse) at the selected speed (from 1.5x up to 0.5x).
It also manages the saving process into one of the eigth AudioBuffers which are then used by the Sequencer.
The Sequencer relies on the Tone.js Web Audio framework for the implementation of the time grid (8 beats), the management of BPM and the samples triggering. This part of the code also handles the creation of the graphic objects in the DOM for the 8x8 matrix of the sequencer itself.

_
Stability issues and further improvements_:
Tested on Chrome 92.0.4515.159 in macOS High Sierra.
The clock stability needs to be improved.
Further improvements might include:
-DSP implementations: OLA family based algorithms for time stretching or pitch shifting of the samples, HPF and LPF;
-



