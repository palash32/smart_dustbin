#include <TinyGPS++.h>
#include <SoftwareSerial.h>
#include "ThingSpeak.h"
#include <ESP8266WiFi.h>

/*
  This sample sketch demonstrates connecting an ESP8266 to a GPS Neo-6M
  and sending latitude and longitude data to ThingSpeak.
*/

const int RXPin = 3, TXPin = 1;
const uint32_t GPSBaud = 9600;

// Replace with your WiFi credentials
const char* ssid = "Swapnil Jana";
const char* password = "swapnil123";

unsigned long myChannelNumber = 2457414;
const char * myWriteAPIKey = "ZAA7S74YL1R03SLD"; // Replace with your ThingSpeak write API key

// The TinyGPS++ object
TinyGPSPlus gps;
WiFiClient client;

// The serial connection to the GPS device
SoftwareSerial ss(RXPin, TXPin);

void setup() {
  Serial.begin(115200);
  ss.begin(GPSBaud);

  Serial.println(F("DeviceExample.ino"));
  Serial.println(F("Connecting ESP8266 to GPS Neo-6M and ThingSpeak"));
  Serial.print(F("Testing TinyGPS++ library v. ")); Serial.println(TinyGPSPlus::libraryVersion());
  Serial.println();

  Serial.print("Connecting to WiFi: ");
  Serial.println(ssid);
  WiFi.begin(ssid, password);
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }
  Serial.println("");
  Serial.println("WiFi connected");
  Serial.println("IP address: ");
  Serial.println(WiFi.localIP());

  ThingSpeak.begin(client); // Initialize ThingSpeak connection (assuming WiFi is connected)

  // Check for valid GPS data after startup (optional)
  if (millis() > 5000 && gps.charsProcessed() < 10) {
    Serial.println(F("No GPS detected: Check wiring."));
  }
}

void loop() {
  // Read data from GPS and display/send if valid
  while (ss.available() > 0) {
    if (gps.encode(ss.read())) {
      displayInfo();
    }
  }

  delay(20000); // Adjust data upload interval as needed
}

void displayInfo() {
  if (gps.location.isValid()) {
    double latitude = gps.location.lat();
    double longitude = gps.location.lng();

    String latbuf;
    latbuf += (String(latitude, 6));
    Serial.println(latbuf);

    String longbuf;
    longbuf += (String(longitude, 6));
    Serial.println(longbuf);

    // Update ThingSpeak fields with valid GPS data
    ThingSpeak.setField(1, latbuf);
    ThingSpeak.setField(2, longbuf);
    ThingSpeak.writeFields(myChannelNumber, myWriteAPIKey);
    Serial.println("Data sent to ThingSpeak");
  } else {
    Serial.println("GPS data invalid");
  }
}
