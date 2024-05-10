#define trigger 3
#define echo 4

#define trigger_1 5
#define echo_1 6

float d1,d;
int motorPin1 = 8;  // Motor A input 1
int motorPin2 = 9;  // Motor A input 2


void setup() {
  // put your setup code here, to run once:
pinMode(trigger,OUTPUT);
pinMode(echo,INPUT);
pinMode(trigger_1,OUTPUT);
pinMode(echo_1,INPUT);

pinMode(motorPin1, OUTPUT);
  pinMode(motorPin2, OUTPUT);
  

  // Initialize motor as stopped
  digitalWrite(motorPin1, LOW);
  digitalWrite(motorPin2, LOW);
  
Serial.begin(9600);

}
int flag=0;

void loop() 
{
d=distance();
//Serial.print("Distance: ");
//Serial.print(d);
//Serial.println(" cm");
if(d<20)
{
  Serial.println("Dustbin Open");
  if(flag==0){
    lidOpen();
    flag = 1;
  }
}
else
{
  Serial.println("Dustbin Closed");
  if(flag == 1){
    lidclose();
    flag = 0;
  }
}
delay(500);
d1=level();
//Serial.print("Level: ");
//Serial.print(d1);
//Serial.println(" cm");
if(d1<5)
{
  Serial.println("XXXXX-----------Warning------------XXXXXX");
}
else
{
  Serial.print("");
}
delay(500);
}

void lidOpen(){
  // Forward motion
  digitalWrite(motorPin1, HIGH);
  digitalWrite(motorPin2, LOW);
  Serial.println("clockwise");

  delay(2000);  // Run forward for 2 seconds

  // Stop
  digitalWrite(motorPin1, LOW);
  digitalWrite(motorPin2, LOW);
    Serial.println("off");

  delay(1000);  // Pause for 1 second

}

void lidclose(){
  // Reverse motion
  
  digitalWrite(motorPin1, LOW);
  digitalWrite(motorPin2, HIGH);
    // Set motor speed, 255 is maximum
  Serial.println("anticlock wise");

  delay(3000);  // Run in reverse for 2 seconds

  // Stop
  digitalWrite(motorPin1, LOW);
  digitalWrite(motorPin2, LOW);
    // Stop the motor
  Serial.println("off");
  delay(1000);  // Pause for 1 second
}

float distance()
{
digitalWrite(trigger,0);
delayMicroseconds(10);
digitalWrite(trigger,1);
delayMicroseconds(10);
digitalWrite(trigger,0);
float t=pulseIn(echo,HIGH);
return (0.017*t);  
}

float level()
{
digitalWrite(trigger_1,0);
delayMicroseconds(10);
digitalWrite(trigger_1,1);
delayMicroseconds(10);
digitalWrite(trigger_1,0);
float t1=pulseIn(echo_1,HIGH);
return (0.017*t1);  
}
