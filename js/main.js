/**
 * Kiran Rajeev - Portfolio Script
 * Orchestrates Hero Micro-Animations, Sticky Nav, Timeline Signal Flow,
 * Project Filters, Technical Case Study Modals, and Resume Viewer.
 */
//Mobile navigation enabled

document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  // ==========================================================================
  // 1. HERO MICRO-ANIMATION ORCHESTRATION (~1s total duration)
  // ==========================================================================
  const seqElements = document.querySelectorAll('.seq-hidden');
  setTimeout(() => {
    seqElements.forEach((el) => {
      el.classList.add('seq-visible');
    });
  }, 100);

  // ==========================================================================
  // 2. STICKY NAVIGATION & ACTIVE LINK TRACKING
  // ==========================================================================
  const header = document.querySelector('.site-header');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');
  const menuToggle = document.getElementById('menuToggle');
  const navMenu = document.getElementById('navMenu');

  function handleScroll() {
    const scrollY = window.pageYOffset;

    // Compact navbar transition
    if (scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }

    // Active link highlighting
    let currentId = '';
    sections.forEach((sec) => {
      const top = sec.offsetTop - 120;
      const height = sec.offsetHeight;
      if (scrollY >= top && scrollY < top + height) {
        currentId = sec.getAttribute('id');
      }
    });

    navLinks.forEach((link) => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${currentId}`) {
        link.classList.add('active');
      }
    });

    // Timeline moving orange signal line
    updateTimelineBus();
  }

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll(); // Initial run

  // Mobile menu toggle
  if (menuToggle && navMenu) {
    menuToggle.addEventListener('click', () => {
      const isOpen = navMenu.classList.toggle('open');
      menuToggle.classList.toggle('active');
      menuToggle.setAttribute('aria-expanded', isOpen);
    });

    // Close when clicking nav links
    navLinks.forEach((link) => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('open');
        menuToggle.classList.remove('active');
        menuToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // ==========================================================================
  // 3. VERTICAL TIMELINE SIGNAL LINE TRACKING
  // ==========================================================================
  const timelineContainer = document.querySelector('.timeline-container');
  const timelineBusActive = document.querySelector('.timeline-bus-active');

  function updateTimelineBus() {
    if (!timelineContainer || !timelineBusActive) return;

    const rect = timelineContainer.getBoundingClientRect();
    const windowHeight = window.innerHeight;
    const containerHeight = timelineContainer.offsetHeight;

    // Calculate how far down the timeline container is in the viewport
    const startOffset = windowHeight * 0.75;
    const relativeY = startOffset - rect.top;

    let progress = (relativeY / containerHeight) * 100;
    progress = Math.max(0, Math.min(100, progress));

    timelineBusActive.style.height = `${progress}%`;

    // Highlight node when signal passes it
    const nodes = timelineContainer.querySelectorAll('.timeline-node');
    nodes.forEach((node) => {
      const nodeRect = node.getBoundingClientRect();
      if (nodeRect.top < windowHeight * 0.7) {
        node.classList.add('active');
      } else {
        node.classList.remove('active');
      }
    });
  }

  // ==========================================================================
  // 4. PROJECT CATEGORY FILTERING
  // ==========================================================================
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      filterBtns.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');

      projectCards.forEach((card) => {
        const categories = card.getAttribute('data-categories') || '';
        if (filter === 'all' || categories.toLowerCase().includes(filter.toLowerCase())) {
          card.style.display = 'flex';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, 20);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'translateY(12px)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 200);
        }
      });
    });
  });

  // ==========================================================================
  // 5. PROJECT CASE STUDY DATA & MODAL INTERACTION
  // ==========================================================================
  const projectCaseStudies = {
    '1': {
      number: '01',
      title: 'METAL SORTING MACHINE',
      platform: 'Allen-Bradley MicroLogix 1400 PLC',
      overview: 'Automated material detection and sorting system using PLC-based control to differentiate metallic from non-metallic parts on a sorting conveyor.',
      technology: 'Allen-Bradley MicroLogix 1400 PLC, RS-232, DF1 Protocol, Ladder Logic, Proximity & Capacitive Sensors.',
      implementation: [
        'Designed and implemented an automated metal sorting system using an Allen-Bradley MicroLogix 1400 PLC.',
        'Developed ladder logic for automated material detection, sequential timing, and pneumatic/mechanical sorting operations.',
        'Configured serial communication between PLC and external devices using RS-232 with DF1 protocol.',
        'Integrated capacitive and proximity sensors to detect and differentiate metallic and non-metallic items reliably.'
      ],
      communication: 'RS-232 Serial Interface utilizing DF1 full-duplex protocol for controller-to-device telemetry and parameter configuration.',
      keyComponents: 'Allen-Bradley MicroLogix 1400, Inductive Proximity Sensor, Capacitive Proximity Sensor, Conveyor Drive Relay, Pneumatic Sorter Solenoid.',
      contribution: 'Authored complete Ladder Logic routines in RSLogix 500, wired 24V DC sensor circuits, calibrated capacitive sensing threshold, and verified DF1 communication.',
      schematicSvg: `
        <svg viewBox="0 0 680 180" width="100%" height="auto" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="680" height="180" fill="#F8F6F0" rx="4"/>
          <!-- Conveyor Line -->
          <line x1="60" y1="120" x2="620" y2="120" stroke="#111215" stroke-width="3"/>
          <line x1="60" y1="130" x2="620" y2="130" stroke="#9C978B" stroke-width="1.5" stroke-dasharray="4 4"/>
          <!-- Rollers -->
          <circle cx="80" cy="125" r="8" fill="#111215"/>
          <circle cx="240" cy="125" r="8" fill="#111215"/>
          <circle cx="440" cy="125" r="8" fill="#111215"/>
          <circle cx="600" cy="125" r="8" fill="#111215"/>
          <!-- Inductive Sensor -->
          <rect x="200" y="50" width="80" height="36" rx="3" fill="#FFFFFF" stroke="#111215" stroke-width="1.5"/>
          <text x="240" y="68" font-family="JetBrains Mono" font-size="9" font-weight="700" text-anchor="middle" fill="#111215">INDUCTIVE SENSOR</text>
          <text x="240" y="79" font-family="JetBrains Mono" font-size="7" text-anchor="middle" fill="#FF5500">METALLIC DETECT</text>
          <line x1="240" y1="86" x2="240" y2="118" stroke="#FF5500" stroke-width="1.5" stroke-dasharray="2 2"/>
          <!-- Capacitive Sensor -->
          <rect x="320" y="50" width="85" height="36" rx="3" fill="#FFFFFF" stroke="#111215" stroke-width="1.5"/>
          <text x="362" y="68" font-family="JetBrains Mono" font-size="9" font-weight="700" text-anchor="middle" fill="#111215">CAPACITIVE SENSOR</text>
          <text x="362" y="79" font-family="JetBrains Mono" font-size="7" text-anchor="middle" fill="#FF5500">NON-METALLIC</text>
          <line x1="362" y1="86" x2="362" y2="118" stroke="#FF5500" stroke-width="1.5" stroke-dasharray="2 2"/>
          <!-- PLC Controller -->
          <rect x="460" y="30" width="160" height="60" rx="4" fill="#FFFFFF" stroke="#FF5500" stroke-width="2"/>
          <text x="540" y="54" font-family="Space Grotesk" font-size="11" font-weight="700" text-anchor="middle" fill="#111215">MICROLOGIX 1400</text>
          <text x="540" y="68" font-family="JetBrains Mono" font-size="8" text-anchor="middle" fill="#6C707E">RS-232 / DF1 PROTOCOL</text>
          <text x="540" y="80" font-family="JetBrains Mono" font-size="7.5" font-weight="600" text-anchor="middle" fill="#FF5500">LADDER LOGIC ROUTINE</text>
          <!-- Wiring lines to PLC -->
          <path d="M280 68 H460" stroke="#111215" stroke-width="1.5" stroke-dasharray="3 3"/>
          <path d="M405 68 H460" stroke="#111215" stroke-width="1.5" stroke-dasharray="3 3"/>
          <!-- Sorting Diverter -->
          <path d="M480 120 L510 145" stroke="#FF5500" stroke-width="3" stroke-linecap="round"/>
          <text x="530" y="152" font-family="JetBrains Mono" font-size="8" font-weight="600" fill="#FF5500">SORTING FLAP</text>
        </svg>
      `
    },
    '2': {
      number: '02',
      title: 'AUTOMATIC MAINS FAILURE (AMF)',
      platform: 'Allen-Bradley MicroLogix 1400 PLC & Wonderware InTouch',
      overview: 'Miniature automated mains/generator switching system providing seamless power transfer between utility mains and backup generation.',
      technology: 'Allen-Bradley MicroLogix 1400 PLC, Relay Logic, 24V DC Switching, Bus Coupler, Wonderware InTouch SCADA.',
      implementation: [
        'Designed and developed a miniature Automatic Mains Failure system using an Allen-Bradley MicroLogix 1400 PLC.',
        'Implemented relay logic and 24V DC switching for automated mains/generator control.',
        'Used a bus coupler for load sharing and integrated control components for reliable switching without brownouts.',
        'Interfaced the system with Wonderware InTouch SCADA for real-time monitoring, state change alarming, and data logging.'
      ],
      communication: 'SCADA telemetry connection linking MicroLogix controller to Wonderware InTouch workstation via serial/Ethernet driver.',
      keyComponents: 'MicroLogix 1400, 24V DC Power Relays, Bus Coupler, Contactor Interlocks, Mains Voltage Sensor, Gen-set Starter Circuit.',
      contribution: 'Configured automated switching state machine in Ladder Logic, wired interlocked contactor relays to prevent back-feeding, and built InTouch SCADA visual mimics.',
      schematicSvg: `
        <svg viewBox="0 0 680 180" width="100%" height="auto" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="680" height="180" fill="#F8F6F0" rx="4"/>
          <!-- Utility Mains -->
          <rect x="50" y="30" width="130" height="50" rx="3" fill="#FFFFFF" stroke="#111215" stroke-width="1.5"/>
          <text x="115" y="52" font-family="Space Grotesk" font-size="10" font-weight="700" text-anchor="middle" fill="#111215">UTILITY MAINS</text>
          <text x="115" y="66" font-family="JetBrains Mono" font-size="8" text-anchor="middle" fill="#6C707E">230V AC SENSING</text>
          <!-- Backup Generator -->
          <rect x="50" y="100" width="130" height="50" rx="3" fill="#FFFFFF" stroke="#111215" stroke-width="1.5"/>
          <text x="115" y="122" font-family="Space Grotesk" font-size="10" font-weight="700" text-anchor="middle" fill="#111215">GEN-SET BACKUP</text>
          <text x="115" y="136" font-family="JetBrains Mono" font-size="8" text-anchor="middle" fill="#FF5500">AUTO-START RELAY</text>
          <!-- PLC Controller & AMF Logic -->
          <rect x="250" y="50" width="180" height="80" rx="4" fill="#FFFFFF" stroke="#FF5500" stroke-width="2"/>
          <text x="340" y="78" font-family="Space Grotesk" font-size="11" font-weight="700" text-anchor="middle" fill="#111215">MICROLOGIX 1400</text>
          <text x="340" y="93" font-family="JetBrains Mono" font-size="8.5" text-anchor="middle" fill="#FF5500">24V DC RELAY SWITCHING</text>
          <text x="340" y="108" font-family="JetBrains Mono" font-size="8" text-anchor="middle" fill="#6C707E">BUS COUPLER INTERLOCK</text>
          <!-- Links from power to PLC -->
          <path d="M180 55 H250" stroke="#111215" stroke-width="1.5"/>
          <path d="M180 125 H250" stroke="#FF5500" stroke-width="1.5" stroke-dasharray="3 3"/>
          <!-- Load Center -->
          <rect x="500" y="65" width="130" height="50" rx="3" fill="#111215"/>
          <text x="565" y="88" font-family="Space Grotesk" font-size="10" font-weight="700" text-anchor="middle" fill="#FBF9F5">CRITICAL LOAD</text>
          <text x="565" y="101" font-family="JetBrains Mono" font-size="8" text-anchor="middle" fill="#FF5500">CONTINUOUS FEED</text>
          <path d="M430 90 H500" stroke="#111215" stroke-width="2.5"/>
          <!-- SCADA Monitored Tag -->
          <text x="340" y="150" font-family="JetBrains Mono" font-size="8" font-weight="600" text-anchor="middle" fill="#6C707E">↕ WONDERWARE INTOUCH SCADA LOGGING</text>
        </svg>
      `
    },
    '3': {
      number: '03',
      title: 'BATCHING PROCESS AUTOMATION',
      platform: 'Siemens S7-1200, TIA Portal & WinCC Unified',
      overview: 'Automated recipe-based batching and agitation process control with multi-ingredient dosing, load cell feedback, and WinCC Unified supervision.',
      technology: 'Siemens S7-1200 DC/DC/DC PLC, TIA Portal, WinCC Unified, Ladder Logic, Load Cell Inputs, Solenoid Valves, Agitator Drive.',
      implementation: [
        'Developed an automated batching process using a Siemens S7-1200 DC/DC/DC PLC and ladder logic in TIA Portal.',
        'Implemented weight-based batching of city water, QR, and KM products into the main mixing tank according to predefined proportions.',
        'Programmed a 3-minute agitator operation after achieving the required batch proportion before transferring material to filling lines.',
        'Designed WinCC Unified HMI for real-time monitoring, process visualization, alarm indication, and data logging.'
      ],
      communication: 'PROFINET industrial Ethernet linking Siemens S7-1200 CPU with WinCC Unified operator station.',
      keyComponents: 'Siemens S7-1200 CPU 1214C DC/DC/DC, TIA Portal v17, WinCC Unified Runtime, Weight Transmitter / Load Cells, Digital Dosing Solenoid Valves, Agitator VFD / Motor.',
      contribution: 'Designed sequential batching state machine, calibrated analog weighing inputs, developed WinCC Unified graphic mimics with dynamic fill levels and animated alarms.',
      schematicSvg: `
        <svg viewBox="0 0 680 180" width="100%" height="auto" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="680" height="180" fill="#F8F6F0" rx="4"/>
          <!-- Steps sequence -->
          <!-- 01 INPUT -->
          <rect x="40" y="60" width="95" height="55" rx="3" fill="#FFFFFF" stroke="#111215" stroke-width="1.5"/>
          <text x="87" y="82" font-family="Space Grotesk" font-size="10" font-weight="700" text-anchor="middle" fill="#111215">01 INPUT</text>
          <text x="87" y="96" font-family="JetBrains Mono" font-size="7.5" text-anchor="middle" fill="#6C707E">WATER / QR / KM</text>
          <!-- Arrow -->
          <line x1="135" y1="87" x2="165" y2="87" stroke="#FF5500" stroke-width="2"/>
          <polygon points="165,87 157,83 157,91" fill="#FF5500"/>
          <!-- 02 WEIGHING -->
          <rect x="170" y="60" width="95" height="55" rx="3" fill="#FFFFFF" stroke="#111215" stroke-width="1.5"/>
          <text x="217" y="82" font-family="Space Grotesk" font-size="10" font-weight="700" text-anchor="middle" fill="#111215">02 WEIGHING</text>
          <text x="217" y="96" font-family="JetBrains Mono" font-size="7.5" text-anchor="middle" fill="#FF5500">LOAD CELLS</text>
          <!-- Arrow -->
          <line x1="265" y1="87" x2="295" y2="87" stroke="#FF5500" stroke-width="2"/>
          <polygon points="295,87 287,83 287,91" fill="#FF5500"/>
          <!-- 03 MIXING -->
          <rect x="300" y="60" width="95" height="55" rx="3" fill="#FFFFFF" stroke="#111215" stroke-width="1.5"/>
          <text x="347" y="82" font-family="Space Grotesk" font-size="10" font-weight="700" text-anchor="middle" fill="#111215">03 MIXING</text>
          <text x="347" y="96" font-family="JetBrains Mono" font-size="7.5" text-anchor="middle" fill="#6C707E">PROPORTIONS</text>
          <!-- Arrow -->
          <line x1="395" y1="87" x2="425" y2="87" stroke="#FF5500" stroke-width="2"/>
          <polygon points="425,87 417,83 417,91" fill="#FF5500"/>
          <!-- 04 AGITATION -->
          <rect x="430" y="60" width="95" height="55" rx="3" fill="#FFFFFF" stroke="#FF5500" stroke-width="2"/>
          <text x="477" y="82" font-family="Space Grotesk" font-size="10" font-weight="700" text-anchor="middle" fill="#111215">04 AGITATION</text>
          <text x="477" y="96" font-family="JetBrains Mono" font-size="7.5" font-weight="700" text-anchor="middle" fill="#FF5500">3-MIN TIMER</text>
          <!-- Arrow -->
          <line x1="525" y1="87" x2="555" y2="87" stroke="#FF5500" stroke-width="2"/>
          <polygon points="555,87 547,83 547,91" fill="#FF5500"/>
          <!-- 05 FILLING -->
          <rect x="560" y="60" width="80" height="55" rx="3" fill="#111215"/>
          <text x="600" y="84" font-family="Space Grotesk" font-size="10" font-weight="700" text-anchor="middle" fill="#FBF9F5">05 FILLING</text>
          <text x="600" y="98" font-family="JetBrains Mono" font-size="7.5" text-anchor="middle" fill="#FF5500">LINE DISPATCH</text>
          <!-- Platform Tag -->
          <text x="340" y="145" font-family="JetBrains Mono" font-size="8.5" font-weight="600" text-anchor="middle" fill="#111215">SIEMENS S7-1200 | TIA PORTAL | WINCC UNIFIED HMI</text>
        </svg>
      `
    },
    '4': {
      number: '04',
      title: 'CONTROLLER-TO-CONTROLLER COMMUNICATION',
      platform: 'Schneider M340 PAC & Modicon M221',
      overview: 'Industrial controller-to-controller networking over Modbus TCP/IP implementing master-slave data exchange with explicit communication function blocks.',
      technology: 'Schneider Electric PAC M340, Modicon M221 PLC, Modbus TCP/IP, READ_VAR, WRITE_VAR Function Blocks, Ethernet Switches.',
      implementation: [
        'Configured communication between Schneider PAC M340 and Modicon M221 PLC using READ_VAR and WRITE_VAR function blocks.',
        'Configured PAC M340 as the Master and Modicon M221 as the Slave controller.',
        'Established Master-Slave communication over Modbus TCP/IP for controller-to-controller data exchange and status synchronization.'
      ],
      communication: 'Modbus TCP/IP protocol over 100BASE-TX Ethernet infrastructure utilizing port 502 with structured request/response management.',
      keyComponents: 'Schneider Modicon M340 PAC, Modicon M221 Compact PLC, Industrial Ethernet Switch, EcoStruxure Control Expert, Machine Expert Basic.',
      contribution: 'Mapped 16-bit register memory spaces between PAC and PLC, parameterized communication address tables, implemented timeout and retry management in logic.',
      schematicSvg: `
        <svg viewBox="0 0 680 180" width="100%" height="auto" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="680" height="180" fill="#F8F6F0" rx="4"/>
          <!-- Master Node -->
          <rect x="80" y="45" width="180" height="90" rx="4" fill="#FFFFFF" stroke="#111215" stroke-width="2"/>
          <text x="170" y="75" font-family="Space Grotesk" font-size="12" font-weight="700" text-anchor="middle" fill="#111215">SCHNEIDER M340</text>
          <rect x="120" y="85" width="100" height="20" rx="2" fill="#111215"/>
          <text x="170" y="99" font-family="JetBrains Mono" font-size="9" font-weight="700" text-anchor="middle" fill="#FFFFFF">MASTER NODE</text>
          <text x="170" y="122" font-family="JetBrains Mono" font-size="8" text-anchor="middle" fill="#FF5500">READ_VAR / WRITE_VAR</text>
          <!-- Bus line -->
          <line x1="260" y1="90" x2="420" y2="90" stroke="#FF5500" stroke-width="3" stroke-dasharray="6 4" class="signal-path-active"/>
          <!-- Communication Badge -->
          <rect x="290" y="65" width="100" height="24" rx="3" fill="#FFFFFF" stroke="#FF5500" stroke-width="1.5"/>
          <text x="340" y="81" font-family="JetBrains Mono" font-size="8.5" font-weight="700" text-anchor="middle" fill="#FF5500">MODBUS TCP/IP</text>
          <!-- Slave Node -->
          <rect x="420" y="45" width="180" height="90" rx="4" fill="#FFFFFF" stroke="#111215" stroke-width="2"/>
          <text x="510" y="75" font-family="Space Grotesk" font-size="12" font-weight="700" text-anchor="middle" fill="#111215">MODICON M221</text>
          <rect x="460" y="85" width="100" height="20" rx="2" fill="#EAE6DC"/>
          <text x="510" y="99" font-family="JetBrains Mono" font-size="9" font-weight="700" text-anchor="middle" fill="#111215">SLAVE NODE</text>
          <text x="510" y="122" font-family="JetBrains Mono" font-size="8" text-anchor="middle" fill="#6C707E">%MW REGISTER BANK</text>
        </svg>
      `
    },
    '5': {
      number: '05',
      title: 'SMART FUEL SYSTEM',
      platform: 'IoT & QR Payment Platform',
      overview: 'IoT-enabled automated petrol pump dispensing telemetry and transaction interface reducing customer wait times and eliminating manual intervention.',
      technology: 'IoT Controller, QR Payment Gateway, Real-Time Telemetry, Dispensing Flow Sensor, Solenoid Cut-off Valve.',
      implementation: [
        'Developed an IoT-based smart fuel system enabling real-time communication between users and petrol pump operations.',
        'Implemented a QR-based payment interface to improve transaction transparency and reduce customer waiting time.',
        'Focused on improving system security, user convenience, and interaction between the user and fuel dispensing system.'
      ],
      communication: 'Secure wireless MQTT / HTTP telemetry connecting pump microcontroller to cloud transaction database and mobile QR payment interface.',
      keyComponents: 'IoT Processing Unit, QR Scanner/Display, Flow Meter Pulse Sensor, Fuel Relay Valve, Cloud Backend API.',
      contribution: 'Engineered sensor-to-cloud telemetry flow, designed payment verification handshake prior to valve actuation, and ensured precise volume cut-off.',
      schematicSvg: `
        <svg viewBox="0 0 680 180" width="100%" height="auto" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="680" height="180" fill="#F8F6F0" rx="4"/>
          <!-- User / QR Interface -->
          <rect x="60" y="55" width="130" height="70" rx="4" fill="#FFFFFF" stroke="#111215" stroke-width="1.5"/>
          <text x="125" y="85" font-family="Space Grotesk" font-size="11" font-weight="700" text-anchor="middle" fill="#111215">USER INTERFACE</text>
          <text x="125" y="102" font-family="JetBrains Mono" font-size="8.5" font-weight="600" text-anchor="middle" fill="#FF5500">QR PAYMENT</text>
          <!-- Link to Cloud -->
          <path d="M190 90 H270" stroke="#FF5500" stroke-width="2" stroke-dasharray="4 3"/>
          <!-- IoT Controller -->
          <rect x="270" y="45" width="150" height="90" rx="4" fill="#FFFFFF" stroke="#FF5500" stroke-width="2"/>
          <text x="345" y="75" font-family="Space Grotesk" font-size="12" font-weight="700" text-anchor="middle" fill="#111215">IoT CONTROLLER</text>
          <text x="345" y="93" font-family="JetBrains Mono" font-size="8" text-anchor="middle" fill="#6C707E">REAL-TIME TELEMETRY</text>
          <text x="345" y="110" font-family="JetBrains Mono" font-size="8" font-weight="600" text-anchor="middle" fill="#FF5500">AUTH &amp; FLOW LOGIC</text>
          <!-- Link to Dispenser -->
          <path d="M420 90 H490" stroke="#111215" stroke-width="2"/>
          <!-- Pump Dispenser -->
          <rect x="490" y="55" width="140" height="70" rx="4" fill="#111215"/>
          <text x="560" y="85" font-family="Space Grotesk" font-size="11" font-weight="700" text-anchor="middle" fill="#FFFFFF">DISPENSER</text>
          <text x="560" y="102" font-family="JetBrains Mono" font-size="8.5" text-anchor="middle" fill="#FF5500">PULSE SENSOR &amp; VALVE</text>
        </svg>
      `
    },
    '6': {
      number: '06',
      title: 'IMAGE DENOISING USING MACHINE LEARNING',
      platform: 'Python, TensorFlow, PyTorch, OpenCV & Django',
      overview: 'Deep learning pipeline integrating CNN-based noise classification and a Patch-Based U-Net architecture for multi-noise restoration with verified PSNR gain.',
      technology: 'Python, TensorFlow, Keras, PyTorch, OpenCV, Django, CNN Classifier, Patch-Based U-Net, PSNR, SSIM, FSIM, NPS Metrics.',
      implementation: [
        'Developed machine learning-based image denoising solutions for Gaussian, Salt & Pepper, Speckle, and Uniform noise.',
        'Built an end-to-end image denoising web application using Django and OpenCV.',
        'Designed a CNN-based noise classification pipeline for five distinct noise types.',
        'Implemented a Patch-Based U-Net architecture using TensorFlow/Keras.',
        'Integrated PSNR, SSIM, FSIM, and NPS quality evaluation metrics.',
        'Achieved up to 16.61 dB PSNR improvement on test datasets.'
      ],
      communication: 'REST API service built in Django receiving noisy image buffers and dispatching tensor tensors to U-Net model.',
      keyComponents: 'CNN Noise Classifier, Patch Extraction & Reassembly Module, U-Net Generator with Skip Connections, Image Quality Assessment Suite.',
      contribution: 'Implemented patch-based tensor inference pipeline, trained classification model across multiple synthetic noise distributions, and engineered full Django web interface.',
      schematicSvg: `
        <svg viewBox="0 0 680 180" width="100%" height="auto" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="680" height="180" fill="#F8F6F0" rx="4"/>
          <!-- Noisy Image -->
          <rect x="50" y="60" width="100" height="60" rx="3" fill="#FFFFFF" stroke="#111215" stroke-width="1.5"/>
          <text x="100" y="85" font-family="Space Grotesk" font-size="10" font-weight="700" text-anchor="middle" fill="#111215">NOISY IMAGE</text>
          <text x="100" y="100" font-family="JetBrains Mono" font-size="7.5" text-anchor="middle" fill="#6C707E">5 NOISE TYPES</text>
          <!-- Arrow -->
          <line x1="150" y1="90" x2="190" y2="90" stroke="#FF5500" stroke-width="2"/>
          <!-- CNN Classifier -->
          <rect x="190" y="50" width="125" height="80" rx="4" fill="#FFFFFF" stroke="#111215" stroke-width="1.5"/>
          <text x="252" y="80" font-family="Space Grotesk" font-size="11" font-weight="700" text-anchor="middle" fill="#111215">CNN CLASSIFIER</text>
          <text x="252" y="96" font-family="JetBrains Mono" font-size="8" text-anchor="middle" fill="#FF5500">NOISE DETECTION</text>
          <!-- Arrow -->
          <line x1="315" y1="90" x2="355" y2="90" stroke="#FF5500" stroke-width="2"/>
          <!-- U-Net Architecture -->
          <rect x="355" y="45" width="150" height="90" rx="4" fill="#FFFFFF" stroke="#FF5500" stroke-width="2"/>
          <text x="430" y="75" font-family="Space Grotesk" font-size="12" font-weight="700" text-anchor="middle" fill="#111215">PATCH U-NET</text>
          <text x="430" y="93" font-family="JetBrains Mono" font-size="8" text-anchor="middle" fill="#6C707E">SKIP CONNECTIONS</text>
          <text x="430" y="112" font-family="JetBrains Mono" font-size="8" font-weight="700" text-anchor="middle" fill="#FF5500">RESTORATION</text>
          <!-- Arrow -->
          <line x1="505" y1="90" x2="545" y2="90" stroke="#FF5500" stroke-width="2"/>
          <!-- Restored Image -->
          <rect x="545" y="55" width="95" height="70" rx="3" fill="#111215"/>
          <text x="592" y="85" font-family="Space Grotesk" font-size="10" font-weight="700" text-anchor="middle" fill="#FFFFFF">RESTORED</text>
          <text x="592" y="103" font-family="JetBrains Mono" font-size="8" font-weight="700" text-anchor="middle" fill="#FF5500">+16.61 dB PSNR</text>
        </svg>
      `
    },
    '7': {
      number: '07',
      title: 'ELECTRONIC MEDICINE DISPENSER',
      platform: 'ESP32, C/C++ & Arduino IoT Cloud',
      overview: 'Automated healthcare dispenser scheduling and dispensing dual-dosage medication (solid pills & liquids) with optical compliance verification and IoT alerts.',
      technology: 'ESP32 Microcontroller, C/C++, Arduino IoT Cloud, Wi-Fi 802.11 b/g/n, IR Sensors, Servo Motors, 12V Water Pump, Flow Sensor, Piezo Buzzer.',
      implementation: [
        'Designed and developed an automated medicine dispenser using ESP32 for scheduled dispensing of solid pills and liquid dosages.',
        'Integrated Arduino IoT Cloud and Wi-Fi for remote medication monitoring, user alerts, and real-time telemetry.',
        'Implemented compliance tracking using IR sensors and piezo buzzers to verify intake and trigger missed-dose alerts.',
        'Interfaced servo motors, water pump motor, and flow-rate sensor using C/C++ in Arduino IDE.'
      ],
      communication: 'Wi-Fi connectivity connecting ESP32 to Arduino IoT Cloud via TLS encryption for remote parameter sync and caregiver alert triggers.',
      keyComponents: 'ESP32 DevKit V1, SG90 Micro Servos (Solid Dispensing), DC Submersible Pump (Liquid Dispensing), Hall Effect Flow Meter, IR Beam Break Sensor, Piezo Buzzer.',
      contribution: 'Wrote firmware state machines in Embedded C++, configured scheduled dispensing tasks, calibrated liquid volumetric dosing, and programmed cloud dashboard callbacks.',
      schematicSvg: `
        <svg viewBox="0 0 680 180" width="100%" height="auto" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="680" height="180" fill="#F8F6F0" rx="4"/>
          <!-- ESP32 Core Controller -->
          <rect x="250" y="45" width="180" height="90" rx="4" fill="#FFFFFF" stroke="#FF5500" stroke-width="2"/>
          <text x="340" y="75" font-family="Space Grotesk" font-size="12" font-weight="700" text-anchor="middle" fill="#111215">ESP32 MICROCONTROLLER</text>
          <text x="340" y="93" font-family="JetBrains Mono" font-size="8.5" text-anchor="middle" fill="#FF5500">WI-FI &amp; ARDUINO IoT CLOUD</text>
          <text x="340" y="112" font-family="JetBrains Mono" font-size="8" text-anchor="middle" fill="#6C707E">C/C++ SCHEDULING FIRMWARE</text>
          <!-- Left side: Solid Pill Mechanism -->
          <rect x="50" y="45" width="140" height="40" rx="3" fill="#FFFFFF" stroke="#111215" stroke-width="1.5"/>
          <text x="120" y="65" font-family="Space Grotesk" font-size="9" font-weight="700" text-anchor="middle" fill="#111215">SOLID PILL ROTOR</text>
          <text x="120" y="77" font-family="JetBrains Mono" font-size="7.5" text-anchor="middle" fill="#6C707E">SERVO MOTOR INTERFACE</text>
          <path d="M190 65 H250" stroke="#111215" stroke-width="1.5"/>
          <!-- Left side: Liquid Mechanism -->
          <rect x="50" y="95" width="140" height="40" rx="3" fill="#FFFFFF" stroke="#111215" stroke-width="1.5"/>
          <text x="120" y="115" font-family="Space Grotesk" font-size="9" font-weight="700" text-anchor="middle" fill="#111215">LIQUID DOSAGE</text>
          <text x="120" y="127" font-family="JetBrains Mono" font-size="7.5" text-anchor="middle" fill="#6C707E">WATER PUMP + FLOW SENSOR</text>
          <path d="M190 115 H250" stroke="#111215" stroke-width="1.5"/>
          <!-- Right side: Compliance Tracking -->
          <rect x="490" y="45" width="140" height="40" rx="3" fill="#FFFFFF" stroke="#111215" stroke-width="1.5"/>
          <text x="560" y="65" font-family="Space Grotesk" font-size="9" font-weight="700" text-anchor="middle" fill="#111215">IR BEAM SENSOR</text>
          <text x="560" y="77" font-family="JetBrains Mono" font-size="7.5" text-anchor="middle" fill="#FF5500">INTAKE VERIFICATION</text>
          <path d="M430 65 H490" stroke="#FF5500" stroke-width="1.5"/>
          <!-- Right side: User Alerts -->
          <rect x="490" y="95" width="140" height="40" rx="3" fill="#111215"/>
          <text x="560" y="115" font-family="Space Grotesk" font-size="9" font-weight="700" text-anchor="middle" fill="#FFFFFF">BUZZER &amp; TELEMETRY</text>
          <text x="560" y="127" font-family="JetBrains Mono" font-size="7.5" text-anchor="middle" fill="#FF5500">MISSED DOSE ALERT</text>
          <path d="M430 115 H490" stroke="#111215" stroke-width="1.5"/>
        </svg>
      `
    }
  };

  const caseStudyModal = document.getElementById('caseStudyModal');
  const modalCloseBtn = document.getElementById('modalCloseBtn');
  const modalNumber = document.getElementById('modalNumber');
  const modalTitle = document.getElementById('modalTitle');
  const modalPlatform = document.getElementById('modalPlatform');
  const modalSchematic = document.getElementById('modalSchematic');
  const modalOverview = document.getElementById('modalOverview');
  const modalTech = document.getElementById('modalTech');
  const modalImplementation = document.getElementById('modalImplementation');
  const modalCommunication = document.getElementById('modalCommunication');
  const modalComponents = document.getElementById('modalComponents');
  const modalContribution = document.getElementById('modalContribution');

  let lastActiveElement = null;

  function openCaseStudy(projectId) {
    const data = projectCaseStudies[projectId];
    if (!data) return;

    lastActiveElement = document.activeElement;

    modalNumber.textContent = `PROJECT // ${data.number}`;
    modalTitle.textContent = data.title;
    modalPlatform.textContent = data.platform;
    modalSchematic.innerHTML = data.schematicSvg;
    modalOverview.textContent = data.overview;
    modalTech.textContent = data.technology;
    modalCommunication.textContent = data.communication;
    modalComponents.textContent = data.keyComponents;
    modalContribution.textContent = data.contribution;

    modalImplementation.innerHTML = '';
    data.implementation.forEach((item) => {
      const li = document.createElement('li');
      li.textContent = item;
      modalImplementation.appendChild(li);
    });

    caseStudyModal.classList.add('open');
    document.body.style.overflow = 'hidden';
    modalCloseBtn.focus();
  }

  function closeCaseStudy() {
    caseStudyModal.classList.remove('open');
    document.body.style.overflow = '';
    if (lastActiveElement) {
      lastActiveElement.focus();
    }
  }

  // Open on card or view button click
  projectCards.forEach((card) => {
    const projectId = card.getAttribute('data-project-id');
    card.addEventListener('click', (e) => {
      openCaseStudy(projectId);
    });

    const trigger = card.querySelector('.view-case-study');
    if (trigger) {
      trigger.addEventListener('click', (e) => {
        e.stopPropagation();
        openCaseStudy(projectId);
      });
    }
  });

  if (modalCloseBtn) {
    modalCloseBtn.addEventListener('click', closeCaseStudy);
  }

  if (caseStudyModal) {
    caseStudyModal.addEventListener('click', (e) => {
      if (e.target === caseStudyModal) {
        closeCaseStudy();
      }
    });
  }

  // Keyboard accessibility
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      if (caseStudyModal && caseStudyModal.classList.contains('open')) {
        closeCaseStudy();
      }
      if (resumeModal && resumeModal.classList.contains('open')) {
        closeResumeModal();
      }
    }
  });

  // ==========================================================================
  // 6. RESUME PREVIEW MODAL
  // ==========================================================================
  const resumeModal = document.getElementById('resumeModal');
  const resumeCloseBtn = document.getElementById('resumeCloseBtn');
  const openResumeBtns = document.querySelectorAll('.open-resume-btn');

  function openResumeModal(e) {
    if (e) e.preventDefault();
    if (resumeModal) {
      resumeModal.classList.add('open');
      document.body.style.overflow = 'hidden';
    }
  }

  function closeResumeModal() {
    if (resumeModal) {
      resumeModal.classList.remove('open');
      document.body.style.overflow = '';
    }
  }

  openResumeBtns.forEach((btn) => {
    btn.addEventListener('click', openResumeModal);
  });

  if (resumeCloseBtn) {
    resumeCloseBtn.addEventListener('click', closeResumeModal);
  }

  if (resumeModal) {
    resumeModal.addEventListener('click', (e) => {
      if (e.target === resumeModal) {
        closeResumeModal();
      }
    });
  }

  // ==========================================================================
  // 7. CONTACT FORM SUBMISSION
  // ==========================================================================
  const contactForm = document.getElementById('contactForm');
  const formStatus = document.getElementById('formStatus');

  if (contactForm && formStatus) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const submitBtn = contactForm.querySelector('button[type="submit"]');
      const originalText = submitBtn.textContent;

      submitBtn.textContent = 'TRANSMITTING...';
      submitBtn.disabled = true;

      setTimeout(() => {
        submitBtn.textContent = 'TRANSMITTED ✓';
        formStatus.style.display = 'block';
        formStatus.textContent = 'Thank you for your message. Signal received. Kiran will follow up shortly.';
        contactForm.reset();

        setTimeout(() => {
          submitBtn.textContent = originalText;
          submitBtn.disabled = false;
        }, 3000);
      }, 700);
    });
  }
});
