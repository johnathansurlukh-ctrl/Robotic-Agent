'use client'
import { useState, useRef, useEffect } from 'react'
import { Bot, X, Send, User, Phone, ChevronDown, Sparkles } from 'lucide-react'

interface Message {
  from: 'bot' | 'user'
  text: string
  time: string
  showHuman?: boolean
}

// ─── Math evaluator (safe — no eval) ──────────────────────────────────────────
function calcMath(raw: string): string | null {
  // strip words, keep digits + operators + parens + decimal + spaces
  let expr = raw
    .replace(/×/g, '*').replace(/÷/g, '/').replace(/[xX]\s*(\d)/g, '*$1')
    .replace(/[^0-9+\-*/.() %]/g, ' ').trim()
  if (!expr || !/\d/.test(expr)) return null
  // percentage: "20% of 500" or "20%"
  const pctOf = expr.match(/(\d+\.?\d*)\s*%\s*of\s*(\d+\.?\d*)/i)
  if (pctOf) {
    const res = (parseFloat(pctOf[1]) / 100) * parseFloat(pctOf[2])
    return `🧮 ${pctOf[1]}% of ${pctOf[2]} = **${res}**`
  }
  try {
    // Use Function constructor so it runs in strict mode without window access
    // eslint-disable-next-line @typescript-eslint/no-implied-eval
    const result = new Function(`"use strict"; return (${expr})`)() as number
    if (typeof result !== 'number' || !isFinite(result)) return null
    const display = Number.isInteger(result) ? result : parseFloat(result.toFixed(6))
    return `🧮 ${expr.trim()} = **${display}**`
  } catch {
    return null
  }
}

// ─── Knowledge base ────────────────────────────────────────────────────────────
const KB: { keys: string[]; answer: string; human?: boolean }[] = [
  // ── Store / company info ──────────────────────────────────────────────────
  { keys: ['what is robokit', 'about robokit', 'who are you', 'what do you do', 'about this store', 'about this website', 'about this shop'],
    answer: '🤖 **RoboKit** is India\'s premier online store for robotics hardware!\n\nWe sell sensors, microcontrollers, motors, project kits, and everything an engineering student or school needs to build robots — with wiring diagrams, sample code, and dedicated support included.\n\n📍 Based in Pune, Maharashtra | GST: 27AABCR1234A1Z5' },

  { keys: ['who are you', 'what are you', 'are you a bot', 'are you ai', 'are you human', 'are you real', 'what is robobot'],
    answer: '👋 I\'m **RoboBot** — RoboKit\'s AI assistant! I can answer questions about products, shipping, pricing, coupons, robotics concepts, business terms, and even do math for you.\n\nI\'m not a human, but I can get a real person on the line if you need one!' },

  { keys: ['what can you do', 'what can you help', 'help me with', 'capabilities', 'features'],
    answer: '🌟 Here\'s what I can help you with:\n\n• 📦 **Shopping** — products, pricing, compatibility\n• 🚚 **Orders** — shipping, tracking, returns\n• 💳 **Payments** — UPI, cards, COD, PayPal\n• 🏫 **Bulk/Schools** — quotes, GST invoices\n• 🔧 **Technical** — wiring, code, Arduino, ESP32\n• 📖 **Definitions** — any robotics or business term\n• 🧮 **Math** — just type any calculation!\n\nJust ask away in plain English!' },

  // ── Business / commerce definitions ──────────────────────────────────────
  { keys: ['what is bulk order', 'what is bulk', 'bulk order mean', 'bulk purchase', 'bulk buying', 'bulk quantity'],
    answer: '📦 A **bulk order** means buying a large quantity of products at once — usually 5 or more units.\n\nAt RoboKit, bulk orders get special discounts:\n• 5–9 units → 10–15% off\n• 10–24 units → 20–25% off\n• 25+ units → 30–40% off\n\nSchools and colleges use bulk orders to set up robotics labs. Fill the form at **/bulk-quote** to get a custom quote!' },

  { keys: ['what is quotation', 'what is a quote', 'what is a quotient', 'what is quotient', 'quotation mean', 'what does quotation mean'],
    answer: '📄 A **quotation** (or quote) is a formal document that lists the price of products/services before you commit to buying.\n\nFor example: a school requests a quotation for 30 Arduino kits — we send back a document showing item-wise prices, discounts, GST, and the total amount.\n\nYou can request one from us at **/bulk-quote**.\n\n💡 *Note: In maths, a **quotient** is the result of division — e.g. 10 ÷ 2 = **5** (5 is the quotient).*' },

  { keys: ['what is gst', 'gst mean', 'what is tax invoice', 'what is a tax invoice', 'what is invoice', 'what is an invoice'],
    answer: '🧾 **GST** (Goods and Services Tax) is India\'s unified indirect tax on goods and services.\n\nA **GST Invoice** is an official bill that includes:\n• Seller & buyer details\n• Product description & HSN code\n• Price, GST rate (typically 18%), and total amount\n\nRoboKit\'s GST number is **27AABCR1234A1Z5**. Every order gets a GST invoice — essential for schools claiming reimbursement.' },

  { keys: ['what is purchase order', 'what is a po', 'purchase order mean'],
    answer: '📋 A **Purchase Order (PO)** is a document a school/company sends to a supplier (like RoboKit) saying: "We want to buy X items at Y price."\n\nIt\'s legally binding and lets institutions make purchases without paying immediately. We accept POs from schools and colleges — WhatsApp us at +91 98765 43210 to arrange.' },

  { keys: ['what is cod', 'what is cash on delivery', 'cod meaning'],
    answer: '💵 **COD (Cash on Delivery)** means you pay in cash when the package arrives at your doorstep — no online payment needed!\n\nRoboKit offers COD for orders under **₹2,000** within India. Select "Cash on Delivery" at checkout.' },

  { keys: ['what is mrp', 'what is maximum retail price', 'mrp mean'],
    answer: '🏷️ **MRP (Maximum Retail Price)** is the highest price at which a product can be legally sold in India. It\'s printed on the packaging.\n\nAt RoboKit, we often sell below MRP and offer additional coupon discounts on top.' },

  { keys: ['what is emi', 'what is emi payment', 'emi meaning', 'pay in installments'],
    answer: '💳 **EMI (Equated Monthly Instalment)** is splitting a payment into equal monthly parts.\n\nCurrently RoboKit doesn\'t offer EMI directly, but you can use credit cards with EMI options from your bank at checkout.' },

  { keys: ['what is warranty', 'what is guarantee', 'warranty mean', 'guarantee mean'],
    answer: '🛡️ A **warranty** is a promise from the seller that a product will work properly for a set period.\n\nIf it fails due to a manufacturing defect during the warranty period, the seller repairs or replaces it for free.\n\nRoboKit provides a **6-month warranty** on all products against manufacturing defects.' },

  // ── Robotics / tech definitions ───────────────────────────────────────────
  { keys: ['what is arduino', 'what is arduino uno', 'arduino explain', 'explain arduino'],
    answer: '💡 **Arduino** is an open-source electronics platform with a simple microcontroller and a beginner-friendly programming environment.\n\nYou write code (called a "sketch") in C/C++ and upload it to the board via USB. It then controls whatever you connect — LEDs, motors, sensors, displays, etc.\n\nPerfect for students and beginners! We stock Arduino Uno, Nano, Mega, and compatible boards starting from ₹349.' },

  { keys: ['what is esp32', 'what is esp8266', 'esp32 explain', 'explain esp32'],
    answer: '📶 **ESP32** is a powerful, low-cost microcontroller with built-in **WiFi and Bluetooth**.\n\nUnlike Arduino Uno, it can connect to the internet natively — making it perfect for IoT projects, smart home automation, and cloud-connected robots.\n\nWe stock ESP32, ESP8266, and NodeMCU boards starting from ₹249.' },

  { keys: ['what is raspberry pi', 'raspberry pi explain', 'explain raspberry pi', 'rpi vs arduino'],
    answer: '🍓 **Raspberry Pi** is a tiny, credit-card-sized computer that runs a full Linux OS.\n\nUnlike Arduino (a microcontroller), it has a processor, RAM, and storage — you can run Python programs, connect a camera, stream video, and much more.\n\nBest for advanced projects that need more computing power.' },

  { keys: ['what is a sensor', 'sensor meaning', 'explain sensor', 'types of sensors'],
    answer: '🔭 A **sensor** is an electronic device that detects changes in the physical environment and converts them into electrical signals.\n\nCommon types:\n• **Ultrasonic** — measures distance (like a bat\'s sonar)\n• **DHT11/22** — measures temperature & humidity\n• **IR** — detects objects nearby using infrared light\n• **LDR** — detects light intensity\n• **MPU6050** — measures tilt/rotation/acceleration\n\nWe stock 50+ sensor types starting from ₹79!' },

  { keys: ['what is servo', 'what is a servo motor', 'servo motor meaning', 'servo vs dc motor'],
    answer: '⚙️ A **servo motor** is a motor with built-in position control — you tell it an exact angle (0° to 180°) and it moves precisely there.\n\nPerfect for: robot arms, steering mechanisms, grippers.\n\nPopular models: **SG90** (mini, ₹149) and **MG996R** (heavy duty, ₹349). Both work with Arduino and have sample code on our site.' },

  { keys: ['what is stepper motor', 'stepper motor meaning', 'stepper vs servo'],
    answer: '🔩 A **stepper motor** moves in precise fixed steps (e.g. 1.8° per step).\n\nUnlike servo motors, they can rotate continuously and hold position without feedback sensors. Perfect for 3D printers, CNC machines, and precise robotic movements.\n\nWe stock NEMA17 (for 3D printers) and 28BYJ-48 (for beginners) with L298N/ULN2003 drivers.' },

  { keys: ['what is motor driver', 'motor driver meaning', 'why use motor driver', 'what is l298n', 'what is l293d'],
    answer: '🔌 A **motor driver** is a circuit that lets a microcontroller (like Arduino) control motors safely.\n\nArduino pins output only ~40mA, but motors need much more current. A motor driver acts as a power amplifier.\n\n**L298N** — controls 2 DC motors, handles 2A per channel (₹149)\n**L293D Shield** — plugs directly onto Arduino, controls 4 motors (₹249)' },

  { keys: ['what is iot', 'internet of things meaning', 'iot explain'],
    answer: '📶 **IoT (Internet of Things)** means connecting everyday devices to the internet so they can send/receive data.\n\nExamples: Smart home switches, soil moisture sensors that text you, robots you control from your phone.\n\nFor IoT projects we recommend **ESP32** boards + our IoT sensors. We even have a full **IoT Robot Kit** (₹1,849) that connects to the cloud!' },

  { keys: ['what is pwm', 'pwm meaning', 'pulse width modulation'],
    answer: '📊 **PWM (Pulse Width Modulation)** is a technique where a digital pin rapidly switches ON and OFF to simulate an analog voltage.\n\nExample: 50% duty cycle on a 5V pin = ~2.5V effectively. Used to:\n• Control motor speed\n• Dim LEDs\n• Control servo angle\n\nArduino has 6 PWM pins (marked with ~).' },

  { keys: ['what is i2c', 'what is spi', 'what is uart', 'i2c meaning', 'serial protocol'],
    answer: '🔗 These are **communication protocols** — ways for chips to talk to each other:\n\n• **I2C** — uses 2 wires (SDA + SCL), connects multiple devices on same bus. Used by OLED displays, MPU6050.\n• **SPI** — uses 4 wires, faster than I2C. Used by SD cards, some displays.\n• **UART** — 2 wires (TX + RX), simple serial communication. Used by GPS, Bluetooth modules.' },

  { keys: ['what is pid', 'pid controller', 'pid meaning'],
    answer: '📐 **PID (Proportional-Integral-Derivative)** is a control algorithm used to make systems reach a target accurately.\n\nExample: A line follower robot uses PID to stay perfectly on the line at high speed without wobbling.\n\nP = reacts to current error\nI = corrects past accumulated error\nD = predicts future error\n\nAll our robot project kits include PID code examples!' },

  { keys: ['what is breadboard', 'how does breadboard work', 'breadboard meaning'],
    answer: '🔧 A **breadboard** is a reusable board for building circuits without soldering.\n\nIt has rows of holes connected internally — you push component legs and wires in to make connections. The middle columns are independent rows; the outer rails (+/−) are for power.\n\nPerfect for prototyping before making a permanent PCB.' },

  { keys: ['what is pcb', 'printed circuit board', 'pcb meaning'],
    answer: '🟢 A **PCB (Printed Circuit Board)** is a board with copper tracks printed on it to permanently connect electronic components.\n\nArduino itself is a PCB! When you\'re done prototyping on a breadboard, you design a PCB to make it compact and permanent.\n\nWe sell blank PCBs and perfboards for final builds.' },

  { keys: ['what is bom', 'bill of materials', 'bom meaning'],
    answer: '📋 A **BOM (Bill of Materials)** is a list of all components needed to build a project — with quantities and prices.\n\nEvery project on RoboKit has an interactive BOM on its page. You can tick items you already own and add only the missing ones to your cart!' },

  { keys: ['what is ldr', 'ldr meaning', 'light dependent resistor'],
    answer: '💡 An **LDR (Light Dependent Resistor)** is a resistor whose resistance changes based on light intensity.\n\nIn bright light → low resistance\nIn darkness → high resistance\n\nUsed in: automatic street lights, light-following robots, darkness sensors. Available at RoboKit for ₹15.' },

  { keys: ['what is relay', 'relay module meaning', 'what is a relay'],
    answer: '⚡ A **relay** is an electrically controlled switch — a small signal from Arduino can control a high-power circuit (like 230V AC appliances).\n\nUsed in: home automation, switching heavy loads, industrial control. We stock 1-channel and 4-channel relay modules starting at ₹99.' },

  { keys: ['what is bluetooth', 'hc-05', 'hc-06', 'bluetooth module'],
    answer: '📡 **Bluetooth** lets two devices communicate wirelessly over short range (~10m).\n\n**HC-05/HC-06** are cheap Bluetooth modules that plug into Arduino\'s UART pins. Pair with a phone app to control robots wirelessly — like our Bluetooth Car Kit!\n\nAvailable at RoboKit from ₹199.' },

  // ── Shipping & orders ──────────────────────────────────────────────────────
  { keys: ['ship', 'deliver', 'arrive', 'dispatch', 'how long', 'how many days', 'when will i get', 'how fast', 'free ship'],
    answer: '📦 We ship all over India!\n\n• **Standard:** 3–5 business days (free above ₹999)\n• **Express:** 1–2 days (+₹199)\n• **Next Day:** available in select cities (+₹499)\n\nYou\'ll get a tracking link via SMS/email once dispatched.' },

  { keys: ['return', 'refund', 'replace', 'exchange', 'damaged', 'wrong item', 'money back', 'broken product'],
    answer: '↩️ We have a **7-day hassle-free return policy**.\n\nIf you received a wrong or damaged item, WhatsApp us at +91 98765 43210 with:\n1. Your order ID\n2. A photo of the issue\n\nReplacements are processed within 2–3 business days.' },

  { keys: ['track', 'order status', 'where is my order', 'track order', 'tracking number', 'delhivery'],
    answer: '🔍 Track your order at **/tracking** — enter your order ID and email.\n\nYou\'ll also receive a Delhivery tracking number by SMS/email once shipped.',
    human: true },

  { keys: ['cancel order', 'cancel my order', 'how to cancel'],
    answer: '❌ To cancel an order, please contact us **immediately** after placing it — once dispatched we can\'t cancel.\n\nWhatsApp us at +91 98765 43210 with your order ID. Our team responds within 2 hours during business hours.',
    human: true },

  // ── Products ──────────────────────────────────────────────────────────────
  { keys: ['arduino', 'uno', 'nano', 'mega', 'atmega', 'microcontroller board'],
    answer: '✅ We stock **Arduino Uno, Nano, Mega, Pro Mini** and compatible clones starting from ₹299.\n\nAll come with wiring diagrams and Arduino IDE sample code. Visit Shop → Boards & Controllers.' },

  { keys: ['esp32', 'esp8266', 'nodemcu', 'wifi board', 'wireless board'],
    answer: '📶 We stock **ESP32, ESP8266, NodeMCU, and Wemos** boards from ₹249.\n\nAll include WiFi + Bluetooth, 3.3V logic, and 34+ GPIO pins. Great for IoT and smart home projects!' },

  { keys: ['raspberry pi', 'rpi', 'single board computer'],
    answer: '🍓 We stock Raspberry Pi accessories, HATs, and compatible sensors with Python code examples. Check the Shop → Raspberry Pi section.' },

  { keys: ['sensor', 'ultrasonic', 'hc-sr04', 'ir', 'infrared', 'ldr', 'dht11', 'dht22', 'temperature', 'humidity', 'mpu6050', 'gyro', 'moisture', 'gas', 'smoke', 'flame', 'colour', 'color'],
    answer: '🔭 We stock 50+ sensors:\n\n• **Distance:** HC-SR04 (₹99), IR proximity (₹79)\n• **Environment:** DHT11 (₹79), DHT22 (₹149), MQ gas sensors (₹89)\n• **Motion:** PIR (₹99), MPU6050 (₹199)\n• **Light:** LDR (₹15), colour sensor (₹299)\n\nShop → Sensors for the full range!' },

  { keys: ['motor', 'servo', 'stepper', 'gear motor', 'dc motor', 'bo motor', 'sg90', 'mg996', 'nema', 'actuator', 'wheels'],
    answer: '⚙️ Full motor range:\n\n• **DC/Gear/BO motors** from ₹79\n• **Servo SG90** ₹149 | **MG996R** ₹349\n• **Stepper 28BYJ-48** ₹149 | **NEMA17** ₹699\n• **Motor Drivers:** L298N ₹149, L293D Shield ₹249' },

  { keys: ['kit', 'project kit', 'complete kit', 'robot kit', 'starter kit', 'line follower', 'obstacle', 'robotic arm', 'bluetooth car', 'iot robot', 'ai robot'],
    answer: '🤖 Complete project kits — everything included:\n\n• **Line Follower Robot** — ₹799 (Beginner)\n• **Obstacle Avoidance Robot** — ₹999 (Beginner)\n• **Bluetooth Car** — ₹1,199 (Intermediate)\n• **Robotic Arm Kit** — ₹2,499 (Intermediate)\n• **IoT Robot (ESP32)** — ₹1,849 (Advanced)\n• **AI Vision Robot** — ₹3,299 (Advanced)\n\nEach includes BOM, wiring diagram, code, and step-by-step guide!' },

  { keys: ['breadboard', 'jumper wire', 'jumper', 'wire', 'resistor', 'capacitor', 'led', 'transistor', 'proto', 'component'],
    answer: '🔧 Yes! We stock all prototyping basics:\n\n• Breadboards (mini ₹39, full ₹79)\n• Jumper wire sets ₹49\n• Resistor kits (600pcs) ₹99\n• LED assortments ₹49\n• Capacitor, transistor packs\n• Perfboards & copper clad PCBs' },

  { keys: ['battery', 'lipo', '18650', 'power bank', 'adapter', 'charger', 'voltage regulator', '7805', 'buck', 'boost'],
    answer: '🔋 Power supplies we stock:\n\n• Li-Po 1000mAh 3.7V ₹299\n• 18650 cell + holder ₹199\n• 9V battery + connector ₹49\n• 5V/2A USB adapter ₹149\n• TP4056 charging module ₹39\n• LM7805 voltage regulator ₹15\n• Buck/boost converter modules ₹79' },

  { keys: ['lcd', 'oled', 'display', 'screen', '16x2', '128x64', 'i2c lcd', 'tft', 'seven segment', '7 segment'],
    answer: '📺 Display modules available:\n\n• **LCD 16×2** ₹99 (+ I2C adapter ₹49)\n• **OLED 0.96″ I2C** ₹199\n• **TFT 2.4″ colour** ₹349\n• **7-Segment 4-digit** ₹99\n\nAll include wiring guides + sample code.' },

  { keys: ['relay', 'relay module', '1 channel', '4 channel', 'ac control', 'home automation'],
    answer: '⚡ We stock relay modules:\n\n• 1-channel relay module ₹99\n• 4-channel relay module ₹199\n• 8-channel relay module ₹349\n\nPerfect for controlling AC appliances with Arduino/ESP32.' },

  { keys: ['bluetooth module', 'hc-05', 'hc-06', 'wireless', 'rf module', '433mhz', 'nrf24'],
    answer: '📡 Wireless communication modules:\n\n• **HC-05 Bluetooth** ₹199 (master+slave)\n• **HC-06 Bluetooth** ₹149 (slave only)\n• **433MHz RF pair** ₹149\n• **NRF24L01** ₹99 (2.4GHz, longer range)' },

  // ── Pricing & coupons ──────────────────────────────────────────────────────
  { keys: ['coupon', 'promo', 'voucher', 'discount code', 'offer', 'deal', 'save', 'any code', 'get discount'],
    answer: '🎁 Active coupon codes:\n\n• **ROBO10** — 10% off any order\n• **FIRST15** — 15% off your first order\n• **SCHOOL20** — 20% off educational orders\n• **SAVE100** — ₹100 flat off (min ₹999)\n• **SUMMER25** — 25% off (max ₹500 savings)\n\nEnter at checkout. Only one code per order.' },

  { keys: ['price', 'cost', 'how much', 'cheap', 'affordable', 'rate', 'mrp', 'pricing'],
    answer: '💰 Price ranges:\n\n• Sensors: **₹79 – ₹499**\n• Boards: **₹299 – ₹2,499**\n• Motors: **₹79 – ₹699**\n• Project kits: **₹799 – ₹3,299**\n• Bulk: up to **40% off**\n\nUse **ROBO10** for 10% off. Free shipping above ₹999!' },

  // ── Payments ──────────────────────────────────────────────────────────────
  { keys: ['pay', 'payment', 'upi', 'gpay', 'phonepe', 'paytm', 'credit card', 'debit card', 'net banking', 'cod', 'cash on delivery', 'paypal'],
    answer: '💳 Payment options:\n\n🇮🇳 **India:** UPI (GPay, PhonePe, Paytm), Cards, Net Banking, COD (orders under ₹2,000)\n🌍 **International:** PayPal, Credit/Debit Card\n\nAll online payments secured with 256-bit SSL.' },

  // ── Technical help ─────────────────────────────────────────────────────────
  { keys: ['wiring', 'diagram', 'pinout', 'how to connect', 'schematic', 'circuit', 'which pin'],
    answer: '🔌 Every product has a **Wiring tab** with free PDF diagrams for Arduino, ESP32, and Raspberry Pi.\n\nProduct page → Wiring tab → Download PDF' },

  { keys: ['sample code', 'example code', 'code example', 'library', 'sketch', '.ino', 'how to program', 'how to code', 'programming'],
    answer: '💻 Free sample code in the **Code tab** on every product page!\n\n• Arduino (.ino) sketches\n• ESP32 code\n• Python examples\n• Library download links\n\nClick "Download Full Code Pack" for all files.' },

  { keys: ['compatible', 'work with', 'does it work', 'will it work', 'supported', 'support'],
    answer: '✅ Compatibility is listed on every product page in the "Compatible With" section.\n\nMost sensors work with Arduino, ESP32, and Raspberry Pi. Check the Wiring tab for board-specific diagrams.' },

  // ── Institutional / schools ────────────────────────────────────────────────
  { keys: ['bulk', 'school', 'college', 'institution', 'lab', 'gst invoice', 'tax invoice', 'quotation', 'quote', 'classroom', 'atl', 'tinkering', 'workshop facilitation'],
    answer: '🏫 We love institutional orders!\n\n• Up to **40% discount** on 5+ units\n• **GST tax invoice** for reimbursement\n• Delivery in 2–4 business days\n• Dedicated account manager\n• Workshop facilitation available\n\nRequest a quote at **/bulk-quote** or WhatsApp +91 98765 43210.' },

  // ── Contact / support ─────────────────────────────────────────────────────
  { keys: ['contact', 'support', 'reach', 'email', 'phone', 'whatsapp', 'where are you', 'address', 'office', 'location', 'pune'],
    answer: '📞 Contact us:\n\n• **WhatsApp:** +91 98765 43210 (9am–8pm IST, Mon–Sat)\n• **Email:** support@robokit.in\n• **Office:** Pune, Maharashtra\n• **GST:** 27AABCR1234A1Z5\n\nFastest response is via WhatsApp!' },

  // ── Other features ────────────────────────────────────────────────────────
  { keys: ['loyalty', 'points', 'reward', 'earn', 'cashback', 'badges'],
    answer: '⭐ Loyalty program:\n\n• Earn **1 point per ₹100** spent\n• Redeem points for discounts\n• Unlock skill badges at **/badges**\n• Points shown in the header bar' },

  { keys: ['subscription', 'monthly', 'subscription box', 'monthly kit', 'recurring'],
    answer: '📬 Monthly Subscription Boxes:\n\n• **Starter** ₹499/mo — 3–4 beginner parts\n• **Builder** ₹999/mo — 5–6 parts + project guide\n• **Pro** ₹1,999/mo — 8–10 advanced parts\n\nCancel anytime at **/subscription**.' },

  { keys: ['refer', 'referral', 'invite', 'affiliate', 'earn money', 'refer a friend'],
    answer: '👥 Referral program: share your unique link and earn **₹100 credit** for every friend who orders above ₹500.\n\nGet your link at **/referral**.' },

  { keys: ['beginner', 'start', 'new', 'first time', 'learn', 'starter', 'no experience', 'for kids', 'getting started'],
    answer: '🌱 Best starting points:\n\n1. **Starter Kit** ₹599 — absolute beginners\n2. **Line Follower Robot Kit** ₹799 — most popular first project\n3. **Learning Hub** — free tutorials at /learning-hub\n\nNo prior experience needed. Everything is included!' },

  { keys: ['international', 'outside india', 'usa', 'uk', 'dubai', 'uae', 'canada', 'abroad', 'usd', 'eur', 'gbp', 'foreign'],
    answer: '🌍 Yes, we ship internationally!\n\n• Prices auto-show in your local currency (USD, EUR, GBP, AED…)\n• Shipping: 7–14 business days\n• Payment: PayPal or international card\n• Import duties are buyer\'s responsibility' },

  { keys: ['track', 'order status', 'where is my', 'tracking'],
    answer: '🔍 Track your order at **/tracking** — enter your order ID and email. You\'ll also receive a tracking SMS/email once shipped.',
    human: true },

  { keys: ['warranty', 'guarantee', 'defect', 'not working', 'dead on arrival', 'fake', 'genuine', 'original', 'quality'],
    answer: '🛡️ All products are genuine and tested before shipping. **6-month warranty** on all items against manufacturing defects.\n\nIf something\'s not working, WhatsApp us with your order ID + a short video.' },

  { keys: ['final year', 'fyp', 'semester project', 'mini project', 'major project', 'engineering project', 'btech', 'diploma'],
    answer: '🎓 RoboKit is the go-to for engineering projects!\n\n• Complete kits with BOM\n• Wiring diagrams included\n• Sample code to save time\n• GST invoice for institutional purchase\n• WhatsApp technical support\n\nSee all project kits at **/projects**' },

  { keys: ['how to order', 'how to buy', 'how do i buy', 'place order', 'add to cart', 'checkout process'],
    answer: '🛒 Ordering steps:\n\n1. Search or browse the shop\n2. Click **Add to Cart**\n3. Open cart → **Proceed to Checkout**\n4. Enter address & choose delivery speed\n5. Apply coupon code (optional)\n6. Choose payment & confirm\n\nOrder confirmation email arrives instantly!' },
]

// ─── Conversational patterns ───────────────────────────────────────────────────
const GREETINGS = ['hi', 'hello', 'hey', 'hii', 'helo', 'howdy', 'namaste', 'hola', 'bonjour', 'good morning', 'good evening', 'good afternoon', 'sup', 'yo', 'hai', 'hiya', 'heya', 'greetings', 'what\'s up', 'whats up', 'wassup']
const THANKS     = ['thank', 'thanks', 'thx', 'ty', 'thnx', 'grateful', 'appreciate']
const POSITIVE   = ['great', 'perfect', 'awesome', 'helpful', 'amazing', 'wonderful', 'excellent', 'brilliant', 'nice', 'cool', 'got it', 'understand', 'okay', 'ok', 'sounds good', 'makes sense']
const HOW_ARE    = ['how are you', 'how r u', 'how are u', 'how\'s it going', 'hows it going', 'you doing', 'how do you do', "what's up", 'all good']
const JOKES      = ['tell me a joke', 'joke', 'make me laugh', 'funny', 'lol', 'lmao', 'haha', 'rofl']
const BORED      = ['bored', 'boring', 'entertain me', 'nothing to do']

// Only escalate for very specific account/order issues
const HUMAN_NEEDED = ['cancel my order', 'i need to cancel', 'wrong order received', 'not delivered yet', 'still not received', 'fraud', 'cheat', 'dispute', 'lawsuit', 'legal action', 'refund my money', 'custom pcb', 'oem deal']

const JOKES_LIST = [
  'Why did the robot fail its driving test? It kept making too many left turns — it only knew `turnLeft()`! 😄',
  'How many Arduino pins does it take to change a light bulb? Just one, but you\'ll spend 2 hours debugging the code! 💡',
  'Why don\'t robots ever get lost? They always follow the line! 🤖',
  'What do you call a robot that always procrastinates? A pro-cras-tin-8-or! ⏳',
  'I told my Arduino a joke about undefined variables. It said: "ERROR: joke not declared in this scope." 😂',
]
let jokeIdx = 0

// ─── Main response function ────────────────────────────────────────────────────
function getResponse(input: string): { text: string; showHuman: boolean } {
  const q = input.toLowerCase().trim()
  if (!q || q.length < 1) return { text: 'Go ahead, ask me anything! 😊', showHuman: false }

  // ── Math ──
  const mathResult = calcMath(q)
  if (mathResult) return { text: mathResult, showHuman: false }

  // ── Greetings ──
  if (GREETINGS.some(g => q === g || q.startsWith(g + ' ') || q.startsWith(g + '!') || q.startsWith(g + ',')))
    return { text: '👋 Hi there! I\'m **RoboBot**, RoboKit\'s AI assistant. Ask me anything — products, prices, shipping, coupon codes, robotics definitions, or even maths! 🤖', showHuman: false }

  // ── How are you ──
  if (HOW_ARE.some(h => q.includes(h)))
    return { text: '😊 I\'m doing great, thanks for asking! I\'m always ready to help. What can I do for you today?', showHuman: false }

  // ── Thanks ──
  if (THANKS.some(t => q.includes(t)))
    return { text: '😊 You\'re welcome! Happy to help anytime. Anything else you\'d like to know?', showHuman: false }

  // ── Positive acknowledgement ──
  if (POSITIVE.some(p => q === p || q.startsWith(p)))
    return { text: '😄 Glad that helped! Anything else I can assist you with?', showHuman: false }

  // ── Jokes ──
  if (JOKES.some(j => q.includes(j)) || BORED.some(b => q.includes(b))) {
    const joke = JOKES_LIST[jokeIdx % JOKES_LIST.length]
    jokeIdx++
    return { text: joke, showHuman: false }
  }

  // ── Goodbye ──
  if (['bye', 'goodbye', 'see you', 'cya', 'take care', 'later', 'ttyl'].some(b => q.includes(b)))
    return { text: '👋 Goodbye! Come back anytime — happy building! 🤖⚡', showHuman: false }

  // ── Definitely needs human ──
  if (HUMAN_NEEDED.some(t => q.includes(t)))
    return { text: '🙋 This one needs a real person. Our support team will sort it out quickly for you!', showHuman: true }

  // ── Score-based KB match ──
  let best: (typeof KB)[0] | null = null
  let bestScore = 0
  for (const entry of KB) {
    let score = 0
    for (const key of entry.keys) {
      if (q.includes(key)) score += key.split(' ').length
    }
    if (score > bestScore) { bestScore = score; best = entry }
  }
  if (best && bestScore > 0) return { text: best.answer, showHuman: best.human ?? false }

  // ── Smart fallback — no escalation for random questions ──
  // Try to detect question type and give a useful response
  if (q.includes('what is') || q.includes('what are') || q.includes('explain') || q.includes('define') || q.includes('meaning of') || q.includes('mean'))
    return { text: `🤔 I don't have specific info on that term, but I'm happy to help!\n\nYou can try asking about:\n• Any robotics/electronics component\n• Business terms (GST, invoice, quotation, bulk order)\n• How our store works\n• Or any calculation!\n\nFor very specific questions, our team is on WhatsApp 24/7.`, showHuman: false }

  if (q.includes('can you') || q.includes('do you') || q.includes('have you') || q.includes('are you'))
    return { text: `I might be able to help! Could you rephrase that a bit more specifically?\n\nFor example:\n• "Do you have ultrasonic sensors?"\n• "Can I pay with UPI?"\n• "Do you ship to Dubai?"`, showHuman: false }

  // Generic helpful fallback — no human escalation
  return {
    text: '🤖 I\'m not sure about that specific thing, but here\'s what I can answer:\n\n• Product questions (sensors, motors, boards, kits)\n• Shipping, returns, tracking\n• Coupons & pricing\n• Tech definitions (Arduino, ESP32, servo, I2C…)\n• Business terms (GST, bulk order, quotation…)\n• Any maths calculation\n\nJust ask in plain English and I\'ll do my best! 😊',
    showHuman: false,
  }
}

function renderText(text: string) {
  return text.split('\n').map((line, i) => {
    const parts = line.split(/(\*\*[^*]+\*\*)/)
    return (
      <span key={i}>
        {parts.map((part, j) =>
          part.startsWith('**') ? <strong key={j}>{part.slice(2, -2)}</strong> : part
        )}
        {i < text.split('\n').length - 1 && <br />}
      </span>
    )
  })
}

function now() {
  return new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })
}

const QUICK = ['Shipping info', 'Coupon codes', 'Return policy', 'Arduino compatible?', 'Payment options', 'Project kits']

const INIT_MSG = '👋 Hi! I\'m **RoboBot** — your instant support assistant.\n\nAsk me anything about products, shipping, coupons, or compatibility. I answer most questions in seconds!'

export default function AIAssistant() {
  const [open, setOpen] = useState(false)
  // Use empty time initially to avoid SSR/client hydration mismatch
  const [messages, setMessages] = useState<Message[]>([
    { from: 'bot', text: INIT_MSG, time: '' },
  ])
  const [mounted, setMounted] = useState(false)
  const [input, setInput] = useState('')
  const [typing, setTyping] = useState(false)
  const bottomRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    setMounted(true)
    setMessages(prev => [{ ...prev[0], time: now() }])
  }, [])

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 100)
  }, [open])

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, typing])

  function sendMessage(text: string) {
    if (!text.trim()) return
    setMessages(prev => [...prev, { from: 'user', text: text.trim(), time: now() }])
    setInput('')
    setTyping(true)
    setTimeout(() => {
      const { text: reply, showHuman } = getResponse(text)
      setTyping(false)
      setMessages(prev => [...prev, { from: 'bot', text: reply, time: now(), showHuman }])
    }, 600 + Math.random() * 400)
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    sendMessage(input)
  }

  const showQuickReplies = messages.length <= 2 && !typing

  return (
    <>
      {open && (
        <div className="fixed bottom-28 right-6 z-[60] w-[370px] max-w-[calc(100vw-2rem)] bg-white dark:bg-gray-900 rounded-3xl shadow-2xl border border-gray-200 dark:border-gray-700 flex flex-col overflow-hidden"
          style={{ height: '540px' }}>

          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-5 py-4 flex items-center justify-between flex-shrink-0">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white/20 rounded-2xl flex items-center justify-center">
                <Bot size={22} className="text-white" />
              </div>
              <div>
                <div className="text-white font-bold text-sm">RoboBot AI</div>
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                  <span className="text-blue-100 text-xs">Online · Replies instantly</span>
                </div>
              </div>
            </div>
            <button onClick={() => setOpen(false)} className="p-1.5 rounded-full hover:bg-white/20 text-white transition-colors">
              <X size={18} />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4 bg-gray-50 dark:bg-gray-950">
            {messages.map((msg, i) => (
              <div key={i} className={`flex gap-2 ${msg.from === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                <div className={`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 ${msg.from === 'bot' ? 'bg-blue-600' : 'bg-gray-300 dark:bg-gray-600'}`}>
                  {msg.from === 'bot' ? <Bot size={14} className="text-white" /> : <User size={14} className="text-gray-600 dark:text-gray-300" />}
                </div>
                <div className={`max-w-[82%] flex flex-col gap-1 ${msg.from === 'user' ? 'items-end' : 'items-start'}`}>
                  <div className={`px-3.5 py-2.5 rounded-2xl text-sm leading-relaxed ${
                    msg.from === 'user'
                      ? 'bg-blue-600 text-white rounded-tr-sm'
                      : 'bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 border border-gray-100 dark:border-gray-700 rounded-tl-sm shadow-sm'
                  }`}>
                    {renderText(msg.text)}
                  </div>
                  <span className="text-[10px] text-gray-400 px-1">{msg.time}</span>
                  {msg.showHuman && msg.from === 'bot' && (
                    <a href="https://wa.me/919876543210" target="_blank" rel="noopener noreferrer"
                      className="flex items-center gap-1.5 text-xs text-blue-600 dark:text-blue-400 font-semibold hover:underline bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-800 px-3 py-1.5 rounded-xl transition-colors">
                      <Phone size={12} /> Talk to a real person
                    </a>
                  )}
                </div>
              </div>
            ))}

            {/* Typing */}
            {typing && (
              <div className="flex gap-2">
                <div className="w-7 h-7 rounded-full bg-blue-600 flex items-center justify-center flex-shrink-0">
                  <Bot size={14} className="text-white" />
                </div>
                <div className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 px-4 py-3 rounded-2xl rounded-tl-sm shadow-sm">
                  <div className="flex gap-1 items-center h-4">
                    {[0, 150, 300].map(delay => (
                      <span key={delay} className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: `${delay}ms` }} />
                    ))}
                  </div>
                </div>
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          {/* Quick replies */}
          {showQuickReplies && (
            <div className="px-4 py-2.5 flex gap-2 flex-wrap bg-white dark:bg-gray-900 border-t border-gray-100 dark:border-gray-800 flex-shrink-0">
              <p className="w-full text-[10px] text-gray-400 font-medium uppercase tracking-wide mb-0.5">Quick questions</p>
              {QUICK.map(qr => (
                <button key={qr} onClick={() => sendMessage(qr)}
                  className="text-xs px-3 py-1.5 bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-800 rounded-full hover:bg-blue-100 dark:hover:bg-blue-900 transition-colors font-medium">
                  {qr}
                </button>
              ))}
            </div>
          )}

          {/* Input */}
          <form onSubmit={handleSubmit} className="px-4 py-3 border-t border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900 flex items-center gap-2 flex-shrink-0">
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={e => setInput(e.target.value)}
              placeholder="Ask anything about products, shipping…"
              className="flex-1 px-4 py-2.5 text-sm bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-400 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <button type="submit" disabled={!input.trim()}
              className="w-10 h-10 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-200 dark:disabled:bg-gray-700 text-white rounded-xl flex items-center justify-center transition-colors flex-shrink-0">
              <Send size={16} />
            </button>
          </form>
        </div>
      )}

      {/* Trigger button — only render after mount to prevent hydration mismatch */}
      {!mounted ? null : <button onClick={() => setOpen(!open)} className="fixed bottom-6 right-24 z-[60] group flex items-center gap-2" aria-label="Open AI assistant" suppressHydrationWarning>
        {!open && (
          <span className="hidden group-hover:flex items-center bg-gray-900 dark:bg-white text-white dark:text-gray-900 text-xs font-semibold px-3 py-1.5 rounded-lg shadow-lg whitespace-nowrap mr-1">
            Ask RoboBot
          </span>
        )}
        <span className="relative flex items-center justify-center">
          {!open && <span className="absolute inline-flex h-14 w-14 rounded-full bg-blue-400 opacity-40 animate-ping" />}
          <span className={`relative flex items-center justify-center w-14 h-14 rounded-full shadow-lg ring-2 ring-white/30 transition-all duration-300 ${
            open ? 'bg-gray-700 hover:bg-gray-800 shadow-gray-500/40' : 'bg-blue-600 hover:bg-blue-700 shadow-blue-500/50 hover:scale-110'
          }`}>
            {open ? <ChevronDown size={24} className="text-white" /> : <Sparkles size={24} className="text-white" />}
          </span>
        </span>
      </button>}
    </>
  )
}
