#include <NewPing.h>

#define TRIGGER_PIN 51
#define ECHO_PIN 50
#define MAX_DISTANCE 200

NewPing sonar(TRIGGER_PIN, ECHO_PIN, MAX_DISTANCE);

void setup() {
  // put your setup code here, to run once:
Serial.begin(115200);
}

void loop() {
delay(1000);                     
Serial.print("Ping: ");
if(sonar.ping_cm() < 10){
Serial.println("Occupied");
  }
 else {
  Serial.println("Free");
  } 

}
