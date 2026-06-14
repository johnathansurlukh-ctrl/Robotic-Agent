import { Project } from '@/types'

export const projects: Project[] = [
  {
    id: 'proj001',
    slug: 'line-follower-robot',
    name: 'Line Follower Robot',
    tagline: 'Build a robot that automatically follows a black line on white surface',
    image: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800&h=500&fit=crop',
    difficultyLevel: 'beginner',
    buildTime: '3–4 hours',
    skillsLearned: ['IR sensing', 'Motor control', 'Arduino basics', 'PID control (optional)'],
    components: [
      { productId: 'p003', productName: 'Arduino Uno R3', quantity: 1, price: 599, required: true },
      { productId: 'p007', productName: 'IR Sensor Module (×2)', quantity: 2, price: 78, required: true },
      { productId: 'p001', productName: 'L298N Motor Driver', quantity: 1, price: 149, required: true },
      { productId: 'p008', productName: 'BO Motor with Wheel (×2)', quantity: 2, price: 178, required: true },
      { productId: 'p009', productName: '2WD Robot Chassis', quantity: 1, price: 249, required: true },
      { productId: 'p-bat', productName: 'AA Battery Holder (4×AA)', quantity: 1, price: 49, required: true },
      { productId: 'p-wire', productName: 'Jumper Wires Pack', quantity: 1, price: 49, required: true },
    ],
    assemblySteps: [
      { step: 1, title: 'Assemble the Chassis', description: 'Mount motors to the chassis frame, attach wheels, and secure the battery holder underneath.' },
      { step: 2, title: 'Mount the Arduino', description: 'Place the Arduino Uno on the top layer of the chassis using standoffs.' },
      { step: 3, title: 'Wire the Motor Driver', description: 'Connect L298N IN1-IN4 pins to Arduino digital pins 5, 6, 10, 11. Connect motor outputs to both motors.' },
      { step: 4, title: 'Mount IR Sensors', description: 'Attach two IR sensors at the front bottom of the chassis, facing downward, 3cm apart.' },
      { step: 5, title: 'Wire IR Sensors', description: 'Connect IR sensor OUT pins to Arduino digital pins 2 and 3. Connect VCC and GND.' },
      { step: 6, title: 'Upload the Code', description: 'Upload the line follower code from the Learning Hub. Adjust sensor threshold if needed.' },
    ],
    codeSnippet: `void loop() {
  int leftSensor = digitalRead(2);
  int rightSensor = digitalRead(3);

  if (leftSensor == 0 && rightSensor == 0) {
    moveForward();  // On line
  } else if (leftSensor == 1 && rightSensor == 0) {
    turnRight();    // Drifted left
  } else if (leftSensor == 0 && rightSensor == 1) {
    turnLeft();     // Drifted right
  } else {
    stopMotors();   // Off line
  }
}`,
    troubleshootingTips: [
      'Robot not moving: Check motor driver connections and power supply',
      'Robot drifts to one side: Adjust IR sensor sensitivity potentiometers',
      'Robot overshoots turns: Reduce motor speed using PWM',
      'Sensors not detecting line: Adjust height (optimal 1–2cm from surface)',
    ],
    fullKitPrice: 1351,
    category: 'school',
    tags: ['arduino', 'motors', 'sensors', 'beginner'],
    featured: true,
  },
  {
    id: 'proj002',
    slug: 'obstacle-avoidance-robot',
    name: 'Obstacle Avoidance Robot',
    tagline: 'Build an autonomous robot that detects and avoids obstacles using ultrasonic sensor',
    image: 'https://images.unsplash.com/photo-1561144257-e32e8506e763?w=800&h=500&fit=crop',
    difficultyLevel: 'beginner',
    buildTime: '4–5 hours',
    skillsLearned: ['Ultrasonic sensing', 'Motor control', 'Autonomous navigation', 'Servo control'],
    components: [
      { productId: 'p003', productName: 'Arduino Uno R3', quantity: 1, price: 599, required: true },
      { productId: 'p002', productName: 'HC-SR04 Ultrasonic Sensor', quantity: 1, price: 49, required: true },
      { productId: 'p005', productName: 'SG90 Servo Motor', quantity: 1, price: 99, required: true },
      { productId: 'p001', productName: 'L298N Motor Driver', quantity: 1, price: 149, required: true },
      { productId: 'p009', productName: '4WD Robot Chassis', quantity: 1, price: 449, required: true },
      { productId: 'p-bat', productName: 'Li-Ion Battery Pack 7.4V', quantity: 1, price: 349, required: true },
      { productId: 'p-wire', productName: 'Jumper Wires Pack', quantity: 1, price: 49, required: false },
    ],
    assemblySteps: [
      { step: 1, title: 'Assemble 4WD Chassis', description: 'Mount all 4 motors and wheels onto the chassis. Secure battery holder.' },
      { step: 2, title: 'Mount Sensor Head', description: 'Attach servo motor to front of robot. Mount HC-SR04 on servo horn to allow left-right scanning.' },
      { step: 3, title: 'Wire Motor Driver', description: 'Connect all 4 motors to L298N outputs. Wire IN1-IN4 to Arduino.' },
      { step: 4, title: 'Wire Ultrasonic Sensor', description: 'Connect TRIG to pin 9, ECHO to pin 10.' },
      { step: 5, title: 'Wire Servo', description: 'Connect servo signal wire to pin 6.' },
      { step: 6, title: 'Upload & Test', description: 'Upload obstacle avoidance code. Test with obstacles at different distances.' },
    ],
    troubleshootingTips: [
      'Robot not avoiding obstacles: Check TRIG/ECHO pin connections',
      'Servo not scanning: Verify servo power supply (needs 5V)',
      'Motors running in wrong direction: Swap motor wire polarity in motor driver',
    ],
    fullKitPrice: 1743,
    category: 'school',
    tags: ['arduino', 'ultrasonic', 'autonomous', 'beginner'],
    featured: true,
  },
  {
    id: 'proj003',
    slug: 'bluetooth-controlled-robot',
    name: 'Bluetooth Controlled Car',
    tagline: 'Control your robot wirelessly from your smartphone via Bluetooth',
    image: 'https://images.unsplash.com/photo-1509966756634-9c23dd6e6815?w=800&h=500&fit=crop',
    difficultyLevel: 'beginner',
    buildTime: '3–4 hours',
    skillsLearned: ['Bluetooth communication', 'Serial communication', 'Motor control', 'Mobile app integration'],
    components: [
      { productId: 'p003', productName: 'Arduino Uno R3', quantity: 1, price: 599, required: true },
      { productId: 'p010', productName: 'HC-05 Bluetooth Module', quantity: 1, price: 179, required: true },
      { productId: 'p001', productName: 'L298N Motor Driver', quantity: 1, price: 149, required: true },
      { productId: 'p009', productName: '4WD Robot Chassis', quantity: 1, price: 449, required: true },
      { productId: 'p-bat', productName: 'Li-Ion Battery Pack 7.4V', quantity: 1, price: 349, required: true },
    ],
    assemblySteps: [
      { step: 1, title: 'Assemble Chassis', description: 'Complete the 4WD chassis assembly with motors and wheels.' },
      { step: 2, title: 'Mount Electronics', description: 'Mount Arduino and L298N on top of chassis using standoffs.' },
      { step: 3, title: 'Wire Motor Driver', description: 'Connect motors and Arduino control pins.' },
      { step: 4, title: 'Wire HC-05', description: 'Connect HC-05 TX→Arduino RX(pin0), HC-05 RX→Arduino TX(pin1) via 1kΩ voltage divider.' },
      { step: 5, title: 'Install App', description: 'Install "Arduino Bluetooth Controller" app on Android.' },
      { step: 6, title: 'Upload Code & Test', description: 'Upload code and pair smartphone. Use arrow buttons to control.' },
    ],
    troubleshootingTips: [
      'Bluetooth not pairing: Default PIN is 1234 or 0000',
      'Random movements: Check baud rate (9600 default)',
      'One motor not working: Check L298N enable pins',
    ],
    fullKitPrice: 1725,
    category: 'school',
    tags: ['bluetooth', 'wireless', 'smartphone', 'beginner'],
    featured: true,
  },
  {
    id: 'proj004',
    slug: 'robotic-arm-kit',
    name: 'Arduino Robotic Arm',
    tagline: 'Build a 4-DOF robotic arm controlled by potentiometers or mobile app',
    image: 'https://images.unsplash.com/photo-1507494924047-60b8ee826ca9?w=800&h=500&fit=crop',
    difficultyLevel: 'intermediate',
    buildTime: '6–8 hours',
    skillsLearned: ['Servo control', 'Inverse kinematics basics', 'Degrees of freedom', 'Control systems'],
    components: [
      { productId: 'p003', productName: 'Arduino Uno R3', quantity: 1, price: 599, required: true },
      { productId: 'p005', productName: 'SG90 Servo Motor (×4)', quantity: 4, price: 396, required: true },
      { productId: 'p-arm', productName: 'Robotic Arm Acrylic Frame', quantity: 1, price: 549, required: true },
      { productId: 'p-pot', productName: 'Potentiometer 10kΩ (×4)', quantity: 4, price: 40, required: true },
      { productId: 'p-psu', productName: '5V 3A Power Supply', quantity: 1, price: 249, required: true },
    ],
    assemblySteps: [
      { step: 1, title: 'Assemble Frame', description: 'Assemble acrylic arm frame pieces using M3 screws and standoffs.' },
      { step: 2, title: 'Mount Servos', description: 'Install 4 servo motors at each joint of the arm.' },
      { step: 3, title: 'Wire Servos', description: 'Connect servo signal wires to Arduino pins 3, 5, 6, 9.' },
      { step: 4, title: 'Wire Potentiometers', description: 'Connect 4 potentiometers to analog pins A0–A3 for manual control.' },
      { step: 5, title: 'Upload Code', description: 'Upload robotic arm control code. Calibrate servo positions.' },
    ],
    troubleshootingTips: [
      'Servo jitter: Use external 5V power supply, not Arduino 5V pin',
      'Arm not reaching position: Check servo mounting angles',
      'Arduino resetting: Insufficient power, use dedicated supply',
    ],
    fullKitPrice: 1833,
    category: 'college',
    tags: ['servo', 'arm', 'intermediate', 'kinematics'],
    featured: true,
  },
  {
    id: 'proj005',
    slug: 'iot-robot',
    name: 'IoT Smart Robot (ESP32)',
    tagline: 'Control your robot from anywhere in the world via WiFi and a web browser',
    image: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=800&h=500&fit=crop',
    difficultyLevel: 'intermediate',
    buildTime: '5–7 hours',
    skillsLearned: ['ESP32 WiFi', 'Web server', 'REST API', 'IoT basics', 'HTML/CSS basics'],
    components: [
      { productId: 'p004', productName: 'ESP32 Development Board', quantity: 1, price: 349, required: true },
      { productId: 'p001', productName: 'L298N Motor Driver', quantity: 1, price: 149, required: true },
      { productId: 'p009', productName: '4WD Robot Chassis', quantity: 1, price: 449, required: true },
      { productId: 'p002', productName: 'HC-SR04 Ultrasonic Sensor', quantity: 1, price: 49, required: false },
      { productId: 'p-bat', productName: 'Li-Ion Battery Pack 7.4V', quantity: 1, price: 349, required: true },
    ],
    assemblySteps: [
      { step: 1, title: 'Assemble Chassis', description: 'Build the 4WD chassis with all motors.' },
      { step: 2, title: 'Wire ESP32 to Motor Driver', description: 'Connect ESP32 GPIO pins to L298N IN1–IN4.' },
      { step: 3, title: 'Create Web Interface', description: 'Upload ESP32 code with embedded HTML control interface.' },
      { step: 4, title: 'Connect to WiFi', description: 'Configure WiFi credentials in code. Connect robot to your network.' },
      { step: 5, title: 'Control via Browser', description: 'Open robot\'s IP address in browser on any device.' },
    ],
    troubleshootingTips: [
      'Cannot connect to WiFi: Verify SSID and password, check 2.4GHz only',
      'Web page not loading: Use Serial monitor to get IP address',
      'Motors not responding: Check 3.3V→5V logic level shifters for L298N',
    ],
    fullKitPrice: 1345,
    category: 'college',
    tags: ['esp32', 'wifi', 'iot', 'web-server', 'intermediate'],
    featured: false,
  },
  {
    id: 'proj006',
    slug: 'ai-vision-robot',
    name: 'AI Vision Robot (OpenCV)',
    tagline: 'Build a robot that uses computer vision to detect objects, faces, and colors',
    image: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=800&h=500&fit=crop',
    difficultyLevel: 'advanced',
    buildTime: '10–15 hours',
    skillsLearned: ['Python', 'OpenCV', 'Raspberry Pi', 'Computer vision', 'ROS basics'],
    components: [
      { productId: 'p006', productName: 'Raspberry Pi 4 (4GB)', quantity: 1, price: 4999, required: true },
      { productId: 'p-cam', productName: 'Raspberry Pi Camera Module v2', quantity: 1, price: 1299, required: true },
      { productId: 'p001', productName: 'L298N Motor Driver', quantity: 1, price: 149, required: true },
      { productId: 'p009', productName: '4WD Robot Chassis', quantity: 1, price: 449, required: true },
      { productId: 'p-psu', productName: 'LiPo Battery 11.1V 3S', quantity: 1, price: 999, required: true },
      { productId: 'p-hat', productName: 'RPi Motor HAT', quantity: 1, price: 699, required: false },
    ],
    assemblySteps: [
      { step: 1, title: 'Set Up Raspberry Pi', description: 'Flash Raspberry Pi OS, enable camera and SSH.' },
      { step: 2, title: 'Install OpenCV', description: 'Install Python 3, OpenCV, and dependencies.' },
      { step: 3, title: 'Mount Camera', description: 'Attach RPi camera to front of robot chassis.' },
      { step: 4, title: 'Wire Motor Control', description: 'Connect RPi GPIO to L298N via level shifter.' },
      { step: 5, title: 'Write Vision Code', description: 'Implement object detection using OpenCV.' },
      { step: 6, title: 'Integrate Motion', description: 'Link vision output to motor control.' },
    ],
    troubleshootingTips: [
      'Camera not detected: Run vcgencmd get_camera to verify',
      'Low frame rate: Reduce resolution or use hardware-accelerated processing',
      'Pi overheating: Add heatsink and fan',
    ],
    fullKitPrice: 8594,
    category: 'college',
    tags: ['raspberry-pi', 'opencv', 'python', 'ai', 'advanced'],
    featured: false,
  },
]

export const getProjectBySlug = (slug: string) =>
  projects.find((p) => p.slug === slug)

export const getFeaturedProjects = () =>
  projects.filter((p) => p.featured)
