window.SOLUTION_DATA = {
  scenarios: {
    retail: {
      label: 'Retail Store A',
      short: 'Retail',
      icon: '▦',
      strap: 'Shopper journey · HVAC · Energy · Facility management',
      description: 'Connect the customer journey with building operations—from passing traffic and entry conversion to comfort, energy and checkout experience.',
      modules: ['people', 'hvac', 'energy', 'facility']
    },
    restaurant: {
      label: 'Restaurant B',
      short: 'Restaurant',
      icon: '◒',
      strap: 'HVAC · Energy · Cold chain · Leakage · Kitchen equipment',
      description: 'Protect food quality and equipment uptime while coordinating comfort, kitchen loads, refrigeration and cold-chain exceptions.',
      modules: ['hvac', 'energy', 'facility', 'cold']
    },
    fitness: {
      label: 'Fitness Center C',
      short: 'Fitness',
      icon: '⌁',
      strap: 'Occupancy · IAQ · HVAC · Energy · Facility management',
      description: 'Balance member comfort and energy use with occupancy-aware HVAC, indoor air quality and equipment-condition visibility.',
      modules: ['people', 'hvac', 'energy', 'facility', 'iaq']
    }
  },
  modules: {
    people: {
      name: 'People sensing',
      icon: '◎',
      question: 'How do people move from passing traffic to checkout?',
      promise: 'Connect traffic, conversion, dwell and queue context.',
      zones: [
        {
          name:'Storefront',
          image:'assets/people-sensing/storefront.jpg',
          source:'https://www.milesight.com/solution/iot-people-sensing-in-retail',
          sourceLabel:'Official retail solution scene',
          devices:['vs361'],
          installLabel:'VS361 · storefront window',
          pin:{x:31,y:62},
          raw:[
            {label:'Passers-by',value:'2,840',note:'Storefront traffic count'},
            {label:'Entries',value:'842',note:'Matched entrance count'}
          ],
          calculated:[
            {label:'Entry conversion',value:'29.6%',note:'842 ÷ 2,840'},
            {label:'Peak passing hour',value:'17:00–18:00',note:'From hourly records'}
          ],
          action:'Compare passing traffic with actual entries to assess storefront conversion, campaign impact and site potential.'
        },
        {
          name:'Entrance',
          image:'assets/people-sensing/entrance.jpg',
          source:'https://www.milesight.com/solution/iot-people-sensing-in-retail',
          sourceLabel:'Official retail solution scene',
          devices:['vs125','vs13x'],
          installLabel:'VS125 / VS13X · above entrance',
          pin:{x:49,y:20},
          raw:[
            {label:'In count',value:'842',note:'Selected period'},
            {label:'Out count',value:'731',note:'Selected period'},
            {label:'Staff detections',value:'64',note:'Reference filter input'}
          ],
          calculated:[
            {label:'Net movement',value:'+111',note:'842 − 731'},
            {label:'Visitor entries',value:'778',note:'842 − 64 staff'},
            {label:'Peak entry rate',value:'118 / h',note:'From hourly records'}
          ],
          action:'Review traffic peaks and visitor mix, filter staff where supported, and align opening hours or staffing to demand.'
        },
        {
          name:'Shop floor',
          image:'assets/people-sensing/shop-floor.jpg',
          source:'https://www.milesight.com/solution/iot-people-sensing-in-retail',
          sourceLabel:'Official retail solution scene',
          devices:['vs13x','vs125'],
          installLabel:'VS13X / VS125 · ceiling zone',
          pin:{x:57,y:18},
          raw:[
            {label:'Zone visits',value:'1,268',note:'All configured zones'},
            {label:'Total dwell',value:'11,032 min',note:'Summed visit duration'},
            {label:'Top-zone visits',value:'431',note:'Fresh-food zone'}
          ],
          calculated:[
            {label:'Average dwell',value:'08:42',note:'11,032 ÷ 1,268'},
            {label:'Top-zone share',value:'34.0%',note:'431 ÷ 1,268'},
            {label:'Layout signal',value:'High interest',note:'Compare with sales data'}
          ],
          action:'Use zone traffic, dwell and heat-map context to refine layout, merchandising and shift allocation.'
        },
        {
          name:'Checkout',
          image:'assets/people-sensing/checkout.jpg',
          source:'https://www.milesight.com/solution/iot-people-sensing-in-retail',
          sourceLabel:'Official retail solution scene',
          devices:['vs121','vs13x'],
          installLabel:'VS121 / VS13X · queue area',
          pin:{x:45,y:20},
          raw:[
            {label:'Queue length',value:'4 people',note:'Current observation'},
            {label:'Observed throughput',value:'45 / h',note:'Completed checkouts'},
            {label:'Open counters',value:'2',note:'Current capacity'}
          ],
          calculated:[
            {label:'Estimated wait',value:'05:20',note:'4 ÷ 45 per hour'},
            {label:'Load per counter',value:'22.5 / h',note:'45 ÷ 2 counters'},
            {label:'Policy status',value:'Review',note:'Above 5-minute target'}
          ],
          action:'Trigger a local staffing review when queue length or calculated wait exceeds the approved service policy.'
        }
      ],
      products: ['vs361','vs125','vs13x','vs121'],
      action: 'Match staffing, layout and checkout capacity to observed traffic patterns.',
      quantity: 4
    },
    hvac: {
      name: 'HVAC control',
      icon: '❄',
      question: 'Can different HVAC systems follow one operating policy?',
      promise: 'Control by equipment type while verifying zone conditions.',
      zones: [
        {
          name:'VRF system',
          image:'assets/hvac-control/vrf.png',
          source:'https://www.milesight.com/iot/product/iot-controller/uc722',
          sourceLabel:'Official UC722 application scene',
          devices:['uc722'],
          installLabel:'UC722 · manager office / plant interface',
          pin:{x:76,y:26},
          raw:[
            {label:'Average zone temperature',value:'24.8°C',note:'Selected VRF group'},
            {label:'Occupied target',value:'23.4°C',note:'HQ operating policy'},
            {label:'Policy-compliant units',value:'637 / 640',note:'Schedule and setpoint check'}
          ],
          calculated:[
            {label:'Temperature deviation',value:'+1.4°C',note:'24.8 − 23.4'},
            {label:'Policy compliance',value:'99.5%',note:'637 ÷ 640'},
            {label:'Units to review',value:'3',note:'640 − 637'}
          ],
          action:'Apply schedules and grouped control across VRF zones, then focus the local team on the three units outside policy.'
        },
        {
          name:'RTU / 24 VAC',
          image:'assets/hvac-control/rtu.jpg',
          source:'https://www.milesight.com/solution/iot-advanced-hvac-management-in-us',
          sourceLabel:'Official HVAC solution scene',
          devices:['wt201','em320'],
          installLabel:'WT201 / WT211 ↔ EM320-TH · Milesight D2D',
          pin:{x:72,y:46},
          raw:[
            {label:'Zone temperature',value:'25.6°C',note:'EM320-TH reading sent to WT2x1 via Milesight D2D'},
            {label:'Cooling target',value:'23.5°C',note:'WT2x1 occupied setpoint'},
            {label:'Cooling runtime',value:'48 min / h',note:'Current operating hour'}
          ],
          calculated:[
            {label:'Temperature deviation',value:'+2.1°C',note:'25.6 − 23.5'},
            {label:'Cooling duty cycle',value:'80%',note:'48 ÷ 60 minutes'},
            {label:'Operating status',value:'Review',note:'High duty + unmet target'}
          ],
          action:'Use Milesight D2D for direct EM320-TH-to-WT201 / WT211 communication, so the thermostat can respond to the representative zone temperature without relying on cloud connectivity; flag sustained high duty cycles.'
        },
        {
          name:'Split / cassette',
          image:'assets/hvac-control/split-ac.jpg',
          source:'https://www.milesight.com/iot/product/iot-controller/uc701',
          sourceLabel:'Official UC701 installation scene',
          devices:['uc701'],
          installLabel:'UC701 IR control + CT operating feedback',
          pin:{x:66,y:45},
          raw:[
            {label:'Temperature 15 min ago',value:'26.7°C',note:'Zone record'},
            {label:'Current temperature',value:'26.1°C',note:'After cooling command'},
            {label:'Compressor current',value:'3.8 A',note:'CT feedback'}
          ],
          calculated:[
            {label:'Cooling response',value:'−0.6°C',note:'26.1 − 26.7'},
            {label:'Command verification',value:'Running',note:'Current detected after command'},
            {label:'Target gap',value:'+2.1°C',note:'26.1 − 24.0 target'}
          ],
          action:'Send the approved IR command, verify actual operation with current feedback and escalate when the room fails to recover.'
        },
        {
          name:'Fan coil unit',
          image:'assets/hvac-control/fcu.png',
          source:'https://www.milesight.com/iot/product/lorawan-sensor/wt303-wt304',
          sourceLabel:'Official WT30X application scene',
          devices:['wt30x','em320'],
          installLabel:'WT303 / WT304 + optional zone sensor',
          pin:{x:69,y:34},
          raw:[
            {label:'Zone temperature',value:'24.9°C',note:'Occupied retail zone'},
            {label:'Cooling target',value:'23.5°C',note:'Local operating policy'},
            {label:'Valve output',value:'62%',note:'Selected FCU control signal'}
          ],
          calculated:[
            {label:'Temperature deviation',value:'+1.4°C',note:'24.9 − 23.5'},
            {label:'Cooling demand',value:'62%',note:'Valve output as demand signal'},
            {label:'Comfort status',value:'Outside band',note:'Beyond ±1.0°C policy'}
          ],
          action:'Coordinate fan and valve control by zone, use local temperature feedback and compare comfort exceptions across locations.'
        }
      ],
      products: ['uc722','wt201','uc701','wt30x','em320'],
      action: 'Apply schedules, occupancy policies and exception handling without assuming one controller fits every HVAC type.',
      quantity: 3
    },
    energy: {
      name: 'Energy monitoring',
      icon: 'ϟ',
      question: 'Where is energy being used—and which loads should be off?',
      promise: 'Separate HVAC, lighting and appliance consumption while checking operating status.',
      zones: [
        {
          name:'Distribution panel',
          image:'selected-scene',
          source:'https://www.milesight.com/iot/product/lorawan-sensor/cth01',
          sourceLabel:'Official CTH01 product page',
          devices:['cth01','ct10x'],
          installLabel:'CTH01 at panel · CT1 / CT3 Series on equipment wiring',
          pin:{x:16,y:24},
          raw:[
            {label:'HVAC energy',value:'182 kWh',note:'Today · panel sub-load'},
            {label:'RTU operating current',value:'13.8 A',note:'CT installed on equipment wiring'},
            {label:'Monitored circuits',value:'12 / 12',note:'CTH01 multi-circuit view'}
          ],
          calculated:[
            {label:'HVAC share',value:'46%',note:'182 ÷ 395 kWh site total'},
            {label:'Load variance',value:'+15%',note:'Against comparable operating period'},
            {label:'After-hours runtime',value:'42 min',note:'Current detected after close'}
          ],
          action:'Use CTH01 to monitor up to 12 panel circuits, and install CT1 / CT3 Series directly on equipment wiring—such as an RTU—to isolate operating load and exceptions.'
        },
        {
          name:'Plug-in appliances',
          image:'selected-scene',
          source:'https://www.milesight.com/iot/product/lorawan-sensor/ws51x',
          sourceLabel:'Official WS51X product page',
          devices:['ws51x'],
          installLabel:'WS51X · appliance wall socket',
          pin:{x:69,y:47},
          raw:[
            {label:'Coffee machine',value:'12.4 kWh · ON',note:'Today'},
            {label:'UV sterilizer',value:'1.8 kWh · OFF',note:'Today'},
            {label:'Refrigerated cabinet',value:'38.6 kWh · ON',note:'Today'}
          ],
          calculated:[
            {label:'Tracked appliance energy',value:'52.8 kWh',note:'12.4 + 1.8 + 38.6'},
            {label:'Appliances on',value:'2 / 3',note:'Current switch state'},
            {label:'After-hours plug load',value:'3.2 kWh',note:'Loads recorded outside schedule'}
          ],
          action:'Use WS51X to monitor appliance consumption and switch state for loads such as coffee machines, UV sterilizers and refrigerated cabinets.'
        },
        {
          name:'Lighting',
          image:'selected-scene',
          source:'https://www.milesight.com/iot/product/lorawan-sensor/ws558',
          sourceLabel:'WS558 product page',
          devices:['ws558'],
          installLabel:'WS558 · lighting circuits',
          pin:{x:49,y:25},
          raw:[
            {label:'Lighting energy',value:'83 kWh',note:'Today'},
            {label:'Circuit status',value:'8 / 8 ON',note:'Current switch state'},
            {label:'Scheduled close',value:'22:00',note:'Store operating policy'}
          ],
          calculated:[
            {label:'Lighting share',value:'21%',note:'83 ÷ 395 kWh site total'},
            {label:'Circuits outside schedule',value:'2',note:'Still on after closing policy'},
            {label:'Avoidable after-hours use',value:'6.4 kWh',note:'Estimated from recorded runtime'}
          ],
          action:'Use WS558 to monitor lighting consumption, control approved circuits and verify that lights follow the store schedule.'
        }
      ],
      products: ['cth01','ct10x','ws51x','ws558'],
      action: 'Compare HVAC, lighting and appliance sub-loads across sites, investigate anomalies and verify switch states and schedules.',
      quantity: 5
    },
    facility: {
      name: 'Facility management',
      icon: '⌁',
      question: 'Can faults be found before they disrupt the site?',
      promise: 'Use equipment current, temperature, pressure and leakage signals to prioritize maintenance.',
      zones: [
        {
          name:'Equipment current',
          image:'assets/products/ct-series-installation.png',
          source:'https://www.milesight.com/iot/product/lorawan-sensor/ct10x',
          sourceLabel:'CT Series product page',
          devices:['ct10x'],
          installLabel:'CT1 / CT3 Series · RTU fan and compressor wiring',
          pin:{x:72,y:42},
          raw:[
            {label:'Compressor current',value:'13.8 A',note:'Current operating cycle'},
            {label:'Supply fan current',value:'4.1 A',note:'Current operating cycle'},
            {label:'Equipment state',value:'Running',note:'Current detected on both loads'}
          ],
          calculated:[
            {label:'Compressor variance',value:'+15%',note:'Against 12.0 A operating baseline'},
            {label:'Fan / compressor sequence',value:'Matched',note:'Both loads detected in expected order'},
            {label:'Maintenance status',value:'Review',note:'Sustained current above baseline'}
          ],
          action:'Use CT1 / CT3 Series on RTU fan and compressor wiring to detect operating state, compare current signatures and surface abnormal equipment behavior before failure.'
        },
        {
          name:'Temperature delta',
          image:'assets/ts302-duct-installation.png',
          source:'https://www.milesight.com/iot/product/lorawan-sensor/ts30x',
          sourceLabel:'Official TS30X product page',
          devices:['ts30x'],
          installLabel:'TS302 · supply / return duct and refrigerant pipe',
          pin:{x:53,y:34},
          raw:[
            {label:'Supply-air temperature',value:'14.2°C',note:'Duct probe'},
            {label:'Return-air temperature',value:'22.6°C',note:'Duct probe'},
            {label:'Refrigerant pipe temperature',value:'7.8°C',note:'Contact probe'}
          ],
          calculated:[
            {label:'Supply / return delta',value:'8.4°C',note:'22.6 − 14.2'},
            {label:'Pipe / supply approach',value:'6.4°C',note:'14.2 − 7.8'},
            {label:'Cooling response',value:'Within pattern',note:'Compare with equipment baseline'}
          ],
          action:'Use TS302 probe channels to compare supply air, return air and refrigerant-pipe temperature, then flag degraded cooling performance against the equipment baseline.'
        },
        {
          name:'Filter condition',
          image:'assets/facility-duct-filter.png',
          source:'https://www.milesight.com/iot/product/lorawan-sensor',
          sourceLabel:'Coming soon',
          devices:['pressure'],
          installLabel:'Coming soon · indoor HVAC duct across the air filter',
          pin:{x:57,y:55},
          raw:[
            {label:'Upstream pressure',value:'286 Pa',note:'Before filter'},
            {label:'Downstream pressure',value:'218 Pa',note:'After filter'},
            {label:'Clean-filter baseline',value:'42 Pa',note:'Recorded after replacement'}
          ],
          calculated:[
            {label:'Differential pressure',value:'68 Pa',note:'286 − 218'},
            {label:'Increase from baseline',value:'+26 Pa',note:'68 − 42'},
            {label:'Filter status',value:'Inspect',note:'Pressure drop above maintenance policy'}
          ],
          action:'Monitor pressure on both sides of the filter and create an inspection when differential pressure rises above the approved clean-filter baseline.'
        },
        {
          name:'Leak detection',
          image:'selected-scene',
          source:'https://www.milesight.com/iot/product/lorawan-sensor/em300-sld-zld',
          sourceLabel:'Official EM300-SLD / ZLD product page',
          devices:['leak'],
          installLabel:'EM300-SLD / ZLD · kitchen or HVAC equipment area',
          pin:{x:78,y:48},
          raw:[
            {label:'Leak status',value:'Dry',note:'Current sensor state'},
            {label:'Monitored area',value:'Kitchen / HVAC',note:'Selected installation zone'},
            {label:'Leak events today',value:'0',note:'No active event'}
          ],
          calculated:[
            {label:'Alarm state',value:'Normal',note:'No water detected'},
            {label:'Last status update',value:'4 min ago',note:'Latest uplink'},
            {label:'Response required',value:'No',note:'Continue monitoring'}
          ],
          action:'Detect water near kitchen or HVAC equipment early, alert the local team and verify the area before leakage damages equipment or interrupts operations.'
        }
      ],
      products: ['ct10x','ts30x','pressure','leak'],
      action: 'Route current, temperature, pressure and leakage exceptions into a repeatable inspection workflow.',
      quantity: 4
    },
    iaq: {
      name: 'Indoor air quality',
      icon: '≈',
      question: 'Is the fitness center keeping air fresh as activity changes?',
      promise: 'Connect member activity with CO₂, comfort, particle and VOC conditions to guide demand-based ventilation.',
      zones: [
        {
          name:'Training floor',
          image:'selected-scene',
          source:'https://www.milesight.com/iot/product/lorawan-sensor/am103-am103l',
          sourceLabel:'Milesight AM100 Series',
          devices:['am100'],
          installLabel:'AM103 / AM103L · occupied training zone',
          pin:{x:35,y:33},
          raw:[
            {label:'CO₂ concentration',value:'1,126 ppm',note:'Busy-period reading'},
            {label:'Air temperature',value:'23.7°C',note:'Training-floor condition'},
            {label:'Relative humidity',value:'54%',note:'Training-floor condition'}
          ],
          calculated:[
            {label:'Ventilation status',value:'Review',note:'CO₂ above selected operating target'},
            {label:'Comfort condition',value:'Within band',note:'Temperature and humidity policy'},
            {label:'Priority zone',value:'Cardio area',note:'Highest occupied zone'}
          ],
          action:'Use AM103 / AM103L to track temperature, humidity and CO₂ where member activity is concentrated, then increase fresh air or create a local action when the selected policy is exceeded.'
        },
        {
          name:'Particles & VOCs',
          image:'selected-scene',
          source:'https://www.milesight.com/iot/product/lorawan-sensor/am300',
          sourceLabel:'Milesight AM300 Series',
          devices:['am300'],
          installLabel:'AM308 / AM319 · studio and shared workout area',
          pin:{x:61,y:31},
          raw:[
            {label:'PM2.5',value:'18 µg/m³',note:'Current particle reading'},
            {label:'PM10',value:'34 µg/m³',note:'Current particle reading'},
            {label:'TVOC',value:'0.31 mg/m³',note:'Current VOC reading'}
          ],
          calculated:[
            {label:'Particle trend',value:'Stable',note:'No active rise detected'},
            {label:'VOC trend',value:'Recovering',note:'Down after cleaning period'},
            {label:'Zone comparison',value:'Studio highest',note:'Compared with selected gym zones'}
          ],
          action:'Use the selected AM300 model where particles and TVOC need to be monitored together; compare workout and studio zones to distinguish occupancy, cleaning and outdoor-air effects.'
        }
      ],
      products: ['am100','am300'],
      action: 'Use IAQ and occupancy context to review ventilation, comfort and energy trade-offs.',
      quantity: 2
    },
    cold: {
      name: 'Cold-chain monitoring',
      icon: '▣',
      isNew: true,
      question: 'Where did the temperature exception occur—and was the door opened?',
      promise: 'Connect static storage, display cabinets and in-transit monitoring.',
      zones: [
        {name:'Cold room',image:'assets/cold-room.png',source:'https://www.milesight.com/iot/product/lorawan-sensor/em320-th',sourceLabel:'EM Series temperature sensing',devices:['emcold'],installLabel:'EM300-TH / EM320-TH · cold-room wall',pin:{x:51,y:46},raw:[{label:'Air temperature',value:'3.2°C',note:'Current cold-room reading'},{label:'Relative humidity',value:'68%',note:'Current cold-room reading'},{label:'Approved range',value:'2–5°C',note:'Selected food-storage policy'}],calculated:[{label:'Temperature status',value:'Within range',note:'3.2°C inside 2–5°C policy'},{label:'Excursion duration',value:'0 min',note:'No active exception'},{label:'24-hour stability',value:'±0.4°C',note:'Observed temperature spread'}],action:'Use LoRaWAN EM300-TH / EM320-TH sensors for continuous temperature and humidity monitoring in static cold rooms and storage areas.'},
        {name:'Display cabinet',image:'assets/cold-cabinet.png',source:'https://www.milesight.com/iot/product/lorawan-sensor/ts30x',sourceLabel:'TS Series temperature sensing',devices:['coldprobe'],installLabel:'TS201 / TS30X · cabinet probe + door contact',pin:{x:69,y:31},raw:[{label:'Cabinet temperature',value:'6.8°C',note:'Flat probe inside cabinet'},{label:'Door state',value:'OPEN · 7 min',note:'Door-contact channel'},{label:'Local records',value:'10,248',note:'Stored measurements'}],calculated:[{label:'Temperature deviation',value:'+1.8°C',note:'6.8 − 5.0°C upper policy'},{label:'Door-open exposure',value:'7 min',note:'Current open event'},{label:'Audit record',value:'Ready',note:'Local history retained for export'}],action:'Use TS201 / TS30X probe sensing for cabinet temperature, pair the second channel with a door contact where required, and retain local records for audit review.'},
        {name:'Cold-chain transport',image:'assets/cold-truck.png',source:'https://www.milesight.com/iot/product/lorawan-sensor/ts60x',sourceLabel:'Official TS60X product page',devices:['ts60x'],installLabel:'TS60X · refrigerated vehicle cargo box',pin:{x:39,y:49},raw:[{label:'Cargo temperature',value:'4.1°C',note:'Current in-transit reading'},{label:'Door event',value:'CLOSED',note:'Last opened at 11:32'},{label:'Location',value:'Route 08 · Shenzhen',note:'Cellular location context'}],calculated:[{label:'Temperature status',value:'Within range',note:'4.1°C inside transport policy'},{label:'Door events today',value:'1',note:'Opening recorded during route'},{label:'Transport condition',value:'Normal',note:'No active tilt or shock exception'}],action:'Use TS60X over 4G LTE Cat.1 to monitor cargo temperature, location, door opening and handling events, with local buffering when the network is unavailable.'}
      ],
      products: ['emcold','coldprobe','ts60x'],
      action: 'Trace a temperature exception through location, door events and recovery—then retain the record.',
      quantity: 4
    }
  },
  products: {
    vs361:{model:'VS361',name:'Storefront Footfall Sensor',image:'assets/products/vs361.png',url:'https://www.milesight.com/iot/product/lorawan-sensor/vs361',use:'Tracks passing-traffic trends to support storefront conversion analysis.',status:'Official page'},
    vs125:{model:'VS125',name:'AI Stereo Vision People Counter',image:'assets/products/vs125.png',url:'https://www.milesight.com/iot/product/lorawan-sensor/vs125',use:'Entrance counting candidate; confirm the required analytics by model and deployment.',status:'Confirm model features'},
    vs13x:{model:'VS13X',name:'AI ToF People Counter',image:'assets/products/vs13x.svg',url:'https://www.milesight.com/iot/product/lorawan-sensor/vs133',use:'Supports entrance, regional counting, dwell and heat-map use cases by selected model.',status:'Confirm VS133 / VS135'},
    vs121:{model:'VS121',name:'AI Workplace Occupancy Sensor',image:'assets/products/vs121.svg',url:'https://www.milesight.com/iot/product/lorawan-sensor/vs121',use:'Occupancy and queue-area visibility candidate for operational review.',status:'Confirm placement'},
    uc722:{model:'UC722',name:'VRF Controller',image:'assets/products/uc722.svg',url:'https://www.milesight.com/iot/product/iot-controller/uc722',use:'Centralized control candidate for compatible VRF systems.',status:'Confirm brand compatibility'},
    wt201:{model:'WT201 / WT211',name:'Smart Thermostat',image:'assets/products/wt201.svg',url:'https://www.milesight.com/iot/product/lorawan-sensor/wt201',use:'Thermostat candidate for compatible 24 VAC HVAC equipment.',status:'Confirm wiring & sequence'},
    uc701:{model:'UC701',name:'LoRaWAN IR Controller',image:'assets/products/uc701.svg',url:'https://www.milesight.com/iot/product/iot-controller/uc701',use:'IR control candidate for compatible split or cassette air conditioners.',status:'CT feedback to confirm'},
    wt30x:{model:'WT30X',name:'Fan Coil Thermostat',image:'assets/products/wt30x.svg',url:'https://www.milesight.com/iot/product/lorawan-sensor/wt303-wt304',use:'Control candidate for compatible 2-pipe or 4-pipe fan-coil systems.',status:'Confirm WT303 / WT304'},
    em320:{model:'EM320-TH',name:'Temperature & Humidity Sensor',image:'assets/products/em320-th.svg',url:'https://www.milesight.com/iot/product/lorawan-sensor/em320-th',use:'Zone-temperature or cold-storage sensing candidate; placement must be validated.',status:'Confirm probe / placement'},
    emcold:{model:'EM300-TH / EM320-TH',name:'LoRaWAN Temperature & Humidity Sensors',image:'assets/products/em320-th.svg',url:'https://www.milesight.com/iot/product/lorawan-sensor/em320-th',use:'Static cold-room and refrigerated-storage temperature and humidity monitoring.',status:'Select by installation'},
    cth01:{model:'CTH01',name:'12-in-1 Current Transformer',image:'assets/products/cth01.svg',url:'https://www.milesight.com/iot/product/lorawan-sensor/cth01',use:'Multi-circuit current visibility for distribution panels.',status:'Current monitoring'},
    ct10x:{model:'CT1 / CT3 Series',name:'Smart Current Transformer',image:'assets/products/ct10x.svg',url:'https://www.milesight.com/iot/product/lorawan-sensor/ct10x',use:'Direct equipment-wire current monitoring for loads such as RTUs.',status:'Select by circuit requirement'},
    ws51x:{model:'WS51X',name:'Smart Wall Socket',image:'assets/products/ws51x.svg',url:'https://www.milesight.com/iot/product/lorawan-sensor/ws51x',use:'Plug-load monitoring and switching candidate for compatible appliances.',status:'Confirm regional version'},
    ws558:{model:'WS558',name:'Smart Light Controller',image:'assets/products/ws558.svg',url:'https://www.milesight.com/iot/product/lorawan-sensor/ws558',use:'Lighting energy monitoring and independent control for up to 8 compatible lighting circuits.',status:'Confirm wiring & regional version'},
    ts30x:{model:'TS301 / TS302',name:'LoRaWAN Temperature Sensor',image:'assets/products/ts30x.svg',url:'https://www.milesight.com/iot/product/lorawan-sensor/ts30x',use:'Probe-based temperature records; TS302 can support a second channel.',status:'Confirm probe combination'},
    coldprobe:{model:'TS201 / TS30X',name:'Probe Temperature Sensor',image:'assets/products/ts30x.svg',url:'https://www.milesight.com/iot/product/lorawan-sensor/ts30x',use:'Cold-cabinet probe monitoring with local records and optional door-state input by selected model.',status:'Select model & probe'},
    ts60x:{model:'TS60X',name:'Cellular Temperature Sensor',image:'assets/products/ts60x.svg',url:'https://www.milesight.com/iot/product/lorawan-sensor/ts60x',use:'In-transit temperature, location and event context over cellular.',status:'Confirm cellular plan'},
    am100:{model:'AM100 Series',name:'Essential Indoor Air Quality Sensor',image:'assets/products/am100.png',url:'https://www.milesight.com/iot/product/lorawan-sensor/am103-am103l',use:'AM102 monitors temperature and humidity; AM103 adds CO₂ for essential ventilation visibility.',status:'Select AM102 or AM103'},
    am300:{model:'AM300 Series',name:'Multi-Parameter Indoor Air Quality Sensor',image:'assets/products/am300.svg',url:'https://www.milesight.com/iot/product/lorawan-sensor/am300',use:'Multi-parameter IAQ family; select the model according to required CO₂, TVOC, particle and other measurements.',status:'Select AM300 model'},
    pressure:{model:'Coming soon',name:'Differential Pressure Sensor',image:'',url:'https://www.milesight.com/iot/product/lorawan-sensor',use:'Indoor HVAC duct pressure monitoring across the air filter.',status:'Coming soon'},
    leak:{model:'EM300-SLD / ZLD',name:'Spot / Zone Leakage Detection Sensor',image:'assets/products/em300-sld-zld.svg',url:'https://www.milesight.com/iot/product/lorawan-sensor/em300-sld-zld',use:'Leak detection for equipment areas using a spot probe or zone sensing cable.',status:'Official product'},
    ug65:{model:'UG65 / Gateway',name:'LoRaWAN Gateway',image:'assets/products/ug65.svg',url:'https://www.milesight.com/iot/product/lorawan-gateway/ug65',use:'Connectivity candidate; gateway count requires radio and backhaul validation.',status:'Coverage study required'}
  },
  automation: [
    {id:'close',title:'Close & pre-open routine',summary:'Verify that lights and HVAC are off after closing, then prepare key equipment before opening.',observe:'Schedules, plug loads and HVAC status',decide:'Compare actual state with the site operating policy',act:'Turn off approved loads or create a local action',verify:'Confirm state change and next-day readiness'},
    {id:'occupancy',title:'Demand-based HVAC control',summary:'Match HVAC output to operating hours, occupancy and zone conditions while protecting opening comfort.',observe:'Schedule, occupancy, zone temperature and equipment current',decide:'Select the approved operating mode for each period',act:'Pre-condition, modulate or set back HVAC output',verify:'Confirm comfort, runtime and after-hours shutdown'},
    {id:'maintenance',title:'Condition-based maintenance',summary:'Use compressor current, temperature differential and leakage events to surface maintenance risk.',observe:'Current, temperatures, leakage and optional pressure context',decide:'Compare with an equipment-specific baseline',act:'Create an inspection with likely causes',verify:'Record finding, repair and restored baseline'},
    {id:'benchmark',title:'Energy benchmarking',summary:'Compare 100 like-for-like locations and sub-load energy to find abnormal equipment or operating behavior.',observe:'CT, CTH, smart-socket and lighting-circuit data',decide:'Normalize and rank comparable locations',act:'Investigate high-load sites and reconcile bills',verify:'Measure the change after correction'},
    {id:'iaq',title:'IAQ & ventilation response',summary:'Use occupancy and AM-series CO₂ context to manage ventilation without ignoring energy impact.',observe:'CO₂, occupancy, temperature and fan state',decide:'Apply the approved IAQ and comfort policy',act:'Send an approved ventilation action through the HVAC controller or BAS',verify:'Confirm recovery and watch HVAC energy'},
    {id:'cold',title:'Cold-chain exception response',summary:'Connect temperature, door, location and handling events to the correct local response.',observe:'Temperature, humidity, door state, location and event history',decide:'Identify where the exception occurred and whether a door event explains it',act:'Route the correct inspection or product-protection action',verify:'Confirm recovery and retain the event record'},
    {id:'traffic',title:'Retail traffic analytics',summary:'Turn store traffic, dwell and movement patterns into staffing, layout, campaign and energy decisions.',observe:'Pass-by, entries, occupancy, dwell, zones and visitor paths',decide:'Find traffic peaks, conversion gaps and underused zones',act:'Adjust staffing, merchandising, campaigns and building schedules',verify:'Compare periods, zones and peer stores after each change'}
  ],
  pilotChecklist: [
    'HVAC type, brand, wiring and control sequence',
    'Panel circuits, conductor sizes and installation method',
    'Cold equipment, probe locations and audit requirements',
    'Store area, construction and radio coverage',
    'Application platform, interfaces and ownership',
    'Baseline, response workflow and acceptance metrics'
  ]
};
