#include <Bridge.h>
#include <SpacebrewYun.h>

// create a variable of type SpacebrewYun and initialize it with the constructor
SpacebrewYun sb = SpacebrewYun("YunLamp", "Im a lovely YunLamp");

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