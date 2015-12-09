[![Donate to support](http://www.koodit.it/macchie/donate_button.png)](http://www.paypal.me/macchie)

# YunLamp

A simple Ionic Application that controls an Arduino RGB Lamp using Spacebrew.cc

## Setup

Requirements to use this sapp:

##### Node.js (https://nodejs.org/download/)

##### npm (Node Package Manager, it comes with node.js installation)
Just in case, if you want to update to npm latest version:
```sh
$ sudo npm install npm -g
```

##### Cordova & Ionic Cli
To install both of them on your system just launch this command:
```sh
$ sudo npm install cordova ionic -g
```

## Cloning this Repo
To start editing this Ionic Project clone the repo or download the zip:

##### Cloning the Git
To clone this repo simply launch this command:

```sh
$ git clone https://github.com/imakkie/yunlamp
```

## Install NPM Dependencies
Once the repo is cloned or the zip is downloaded get in the **yunlamp** folder through your Terminal App and launch this command to install all needed dependencies:
```sh
$ npm install
```

## Deploy the sketch to Arduino
Inside this repo you will also find arduino_spacebrew.ino, thats the sketch you need to load on the board to make sure everything will work, this version is intended to work on the Arduino Yun Board.
Also you might want to connect your RGB Led Strip following this scheme.
You might notice differences from the arduino sketch and this scheme, in my case the RGB wires are plugged differently, in my sketch PIN3 is RED, PIN5 is GREEN and PIN6 is BLUE.
![led strip scheme](https://learn.adafruit.com/system/assets/assets/000/002/692/original/led_strips_ledstripfet.gif)

## Connect things up inside Spacebrew.cc
This version of the code works using the Spacebrew sandbox, for production cases you might want to host your own Spacebrew Server, follow the guides on Spacebrew websites for more infos.

##### The Spacebrew Sandbox
Open the Spacebrew Sandbox by visiting this link:
* Spacebrew Admin Sandbox (http://spacebrew.github.io/spacebrew/admin/admin.html?server=sandbox.spacebrew.cc)

##### Connect the App to the YunLamp
To connect your app to the lamp just link your YunLampController to the YunLamp like in this image:
![spacebrew links](http://www.koodit.it/macchie/spacebrew_yunlamp_link.png)

## Launching the App
After installing the needed dependencies you are done, launch your app with a simple
```sh
$ ionic serve
```
and enjoy! :)

## Testing the App with IonicView
You can also preview our beta app on your Ionic View by previewing this code: **5163c3c5**

## More info

* Cordova (https://cordova.apache.org)
* IonicFramework (http://ionicframework.com)
* CoffeeScript (http://coffeescript.org)
* Sass (http://sass-lang.com)
* Jade (http://jade-lang.com)
* Spacebrew (http://spacebrew.cc)

## Copyright
Copyright © [2015] Andrea Macchieraldo

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
