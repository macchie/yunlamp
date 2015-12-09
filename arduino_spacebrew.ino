/*
  Spacebrew Range
 
 Demonstrates how to create a sketch that sends and receives analog
 range value to and from Spacebrew. Every time the state of the 
 potentiometer (or other analog input component) change a spacebrew
 message is sent. The sketch also accepts analog range messages from 
 other Spacebrew apps.

 Make sure that your Yun is connected to the internet for this example 
 to function properly.
 
 The circuit:
 - Potentiometer connected to Yun. Middle pin connected to analog pin A0, 
   other pins connected to 5v and GND pins.
 
 created 2013
 by Julio Terra
 
 This example code is in the public domain.
 
 More information about Spacebrew is available at: 
 http://spacebrew.cc/
 
 */

#include <Bridge.h>
#include <SpacebrewYun.h>

// create a variable of type SpacebrewYun and initialize it with the constructor
SpacebrewYun sb = SpacebrewYun("YunLamp", "Range sender and receiver");

// variable that holds the last potentiometer value
int last_value = 0;

int brightness = 1;

int power = 1;

// create variables to manage interval between each time we send a string
void setup() { 

  // start the serial port
  Serial.begin(57600);

  // for debugging, wait until a serial console is connected
  //delay(4000);
  // while (!Serial) { ; }

  // start-up the bridge
  Bridge.begin();

  // configure the spacebrew object to print status messages to serial
  sb.verbose(true);

  // configure the spacebrew publisher and subscriber
  // sb.addPublish("physical pot", "range");
  sb.addSubscribe("redLed", "range");
  sb.addSubscribe("greenLed", "range");
  sb.addSubscribe("blueLed", "range");

  // register the string message handler method 
  sb.onRangeMessage(handleRange);
  sb.onBooleanMessage(handleBoolean);

  // connect to cloud spacebrew server at "sandbox.spacebrew.cc"
  sb.connect("sandbox.spacebrew.cc"); 
} 


void loop() { 
  // monitor spacebrew connection for new data
  sb.monitor();

  // connected to spacebrew then send a new value whenever the pot value changes
  if ( sb.connected() ) {

  }
} 

// handler method that is called whenever a new string message is received 
void handleRange (String route, int value) {
  if (route == "redLed") {
    analogWrite(3, value*brightness*power);
  } else if (route == "greenLed") {
    analogWrite(5, value*brightness*power);
  } else if (route == "blueLed") {
    analogWrite(6, value*brightness*power);
  }
}

void handleBoolean (String route, boolean value) {
  
}