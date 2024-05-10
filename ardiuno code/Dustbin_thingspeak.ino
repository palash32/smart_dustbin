
#include "ThingSpeak.h" //install library for thing speak
#include <ESP8266WiFi.h>
#include<SoftwareSerial.h>
SoftwareSerial ard(5,4);
char ssid[] = "Swapnil Jana";
char pass[] = "swapnil123";
      
WiFiClient  client;


unsigned long myChannelNumber = 2457414;
const char * myWriteAPIKey = "ZAA7S74YL1R03SLD";


String myStatus = "Writing Data";



void setup() 

{
  Serial.begin(115200);  //Initialize serial
  ard.begin(115200);
  delay(100);
  WiFi.mode(WIFI_STA);   
  ThingSpeak.begin(client);  // Initialize ThingSpeak

 Serial.print("Attempting to connect to WiFi: ");
    Serial.println(ssid);
    WiFi.hostname("Smart_Dustbin");
    delay(1000);
    WiFi.begin(ssid, pass);
    while(WiFi.status() != WL_CONNECTED)
    {
      Serial.print(".");
      delay(500);     
    } 
    Serial.println("\nConnected.");

}
String x="";
void loop() 
{
  if(ard.available())
  {
    x = ard.readStringUntil('\n'); 
  }
  Serial.println(x);
  // Connect or reconnect to WiFi
  if(WiFi.status() != WL_CONNECTED)
  {
    Serial.print("Reconnecting to WiFi: ");
    WiFi.begin(ssid, pass);
    while(WiFi.status() != WL_CONNECTED)
    {
      Serial.print(".");
      delay(500);     
    } 
    Serial.println("\nConnected.");
  }
  int i = x.length();
  char x_new[i];
  x.toCharArray(x_new,i);
  int d = atoi(x_new);
  
Serial.println(d);
  int d1 = map(d,0,200,100,0);
Serial.println(d1);
  ThingSpeak.setField(1,d1);
    
  if(x == 200)
  {
    Serial.println("Channel update successful.");
  }
  else
  {
    Serial.println("Problem updating channel. HTTP error code " + String(x));
  }
 
  delay(5000); 
}
