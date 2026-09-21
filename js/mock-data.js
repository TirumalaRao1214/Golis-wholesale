/* ============================================================
   GOLIS Wholesale — mock-data.js
   Complete mock data layer. All entities seeded with realistic
   Indian wholesale market values. Persists to localStorage.
   ============================================================ */

const MockDB = {

  /* ──────────────────────────────────────────────────────────
     RAW SEED DATA
     ────────────────────────────────────────────────────────── */

  _users: [
    { id: 'U001', email: 'owner@golis.com',   password: 'owner123',   role: 'owner',   name: 'Ramaiah Goli',       mobile: '9848012345', refId: null },
    { id: 'U002', email: 'manager@golis.com', password: 'manager123', role: 'manager', name: 'Suresh Babu',        mobile: '9848056789', refId: null },
    { id: 'U003', email: 'farmer@golis.com',  password: 'farmer123',  role: 'farmer',  name: 'Venkatesh Reddy',    mobile: '9949101010', refId: 'F001' },
    { id: 'U004', email: 'vendor@golis.com',  password: 'vendor123',  role: 'vendor',  name: 'Sri Ram Traders',    mobile: '9848077777', refId: 'VN001' },
    { id: 'U005', email: 'labour@golis.com',  password: 'labour123',  role: 'labour',  name: 'Raju Kumar',         mobile: '9704201234', refId: 'L001' },
  ],

  _farmers: [
    { id: 'F001', name: 'Venkatesh Reddy',   mobile: '9949101010', village: 'Narasaraopet',  mandal: 'Narasaraopet', district: 'Guntur',   state: 'AP', aadhaar: '1234-5678-9012', bankAccount: '52010012345', ifsc: 'SBIN0014212', bankName: 'SBI', upi: 'venkat@upi', totalSupplyKg: 14200, totalSupplyValue: 426000, pendingPayable: 38500, joinedDate: '2023-04-10' },
    { id: 'F002', name: 'Krishna Rao',       mobile: '9849202020', village: 'Sattenapalle',  mandal: 'Sattenapalle', district: 'Guntur',   state: 'AP', aadhaar: '2345-6789-0123', bankAccount: '520100234', ifsc: 'SBIN0012345', bankName: 'SBI', upi: 'krishna@upi', totalSupplyKg: 9800, totalSupplyValue: 294000, pendingPayable: 21000, joinedDate: '2023-06-01' },
    { id: 'F003', name: 'Lakshmaiah',        mobile: '9440303030', village: 'Ponnur',        mandal: 'Ponnur',       district: 'Guntur',   state: 'AP', aadhaar: '3456-7890-1234', bankAccount: '620100456', ifsc: 'ANDB0001122', bankName: 'Andhra Bank', upi: 'lakshmaiah@upi', totalSupplyKg: 7400, totalSupplyValue: 207200, pendingPayable: 15500, joinedDate: '2023-08-15' },
    { id: 'F004', name: 'Nagaraju Palanki',  mobile: '9701404040', village: 'Tenali',        mandal: 'Tenali',       district: 'Guntur',   state: 'AP', aadhaar: '4567-8901-2345', bankAccount: '720100789', ifsc: 'CNRB0001234', bankName: 'Canara Bank', upi: 'nag.palanki@upi', totalSupplyKg: 11600, totalSupplyValue: 348000, pendingPayable: 0, joinedDate: '2023-03-20' },
    { id: 'F005', name: 'Siva Prasad',       mobile: '9948505050', village: 'Machilipatnam', mandal: 'Machilipatnam',district: 'Krishna',  state: 'AP', aadhaar: '5678-9012-3456', bankAccount: '820100101', ifsc: 'SBIN0009988', bankName: 'SBI', upi: 'siva.prasad@upi', totalSupplyKg: 6200, totalSupplyValue: 186000, pendingPayable: 9800, joinedDate: '2023-09-01' },
    { id: 'F006', name: 'Ramaiah Nelluri',   mobile: '9494606060', village: 'Ongole',        mandal: 'Ongole',       district: 'Prakasam', state: 'AP', aadhaar: '6789-0123-4567', bankAccount: '920100202', ifsc: 'BKID0006789', bankName: 'Bank of India', upi: 'ramaiah.n@upi', totalSupplyKg: 8900, totalSupplyValue: 267000, pendingPayable: 11200, joinedDate: '2023-07-05' },
    { id: 'F007', name: 'Govinda Raju',      mobile: '9951707070', village: 'Nellore',       mandal: 'Nellore',      district: 'Nellore',  state: 'AP', aadhaar: '7890-1234-5678', bankAccount: '102010303', ifsc: 'PUNB0123456', bankName: 'Punjab National Bank', upi: 'govinda.r@upi', totalSupplyKg: 5100, totalSupplyValue: 153000, pendingPayable: 7700, joinedDate: '2024-01-12' },
    { id: 'F008', name: 'Mallaiah Bondili',  mobile: '9000808080', village: 'Vinukonda',     mandal: 'Vinukonda',    district: 'Guntur',   state: 'AP', aadhaar: '8901-2345-6789', bankAccount: '112010404', ifsc: 'SBIN0011234', bankName: 'SBI', upi: 'mallaiah@upi', totalSupplyKg: 3300, totalSupplyValue: 99000, pendingPayable: 4400, joinedDate: '2024-02-18' },
  ],

  _vendors: [
    { id: 'VN001', businessName: 'Sri Ram Traders',          contactPerson: 'Ram Kishan',      mobile: '9848077777', email: 'sriram@traders.in',   city: 'Hyderabad',   state: 'TS', gst: '36AABCS1234Z1Z1', creditLimit: 500000, outstanding: 84000,  paymentTerms: 'Net 7',  joinedDate: '2023-02-14' },
    { id: 'VN002', businessName: 'Deccan Vegetables Pvt Ltd',contactPerson: 'Anjaiah Murthy',  mobile: '9000222333', email: 'deccan@veg.in',        city: 'Hyderabad',   state: 'TS', gst: '36AABCD5678Z2Z2', creditLimit: 1000000,outstanding: 215000, paymentTerms: 'Net 15', joinedDate: '2023-01-08' },
    { id: 'VN003', businessName: 'Chennai Fresh Mart',        contactPerson: 'Selvam K',        mobile: '9444123456', email: 'chennai@freshmart.in', city: 'Chennai',     state: 'TN', gst: '33AABCE1122Z3Z3', creditLimit: 750000, outstanding: 128000, paymentTerms: 'Net 10', joinedDate: '2023-05-20' },
    { id: 'VN004', businessName: 'Bangalore Greens',          contactPerson: 'Suresh Naik',     mobile: '9886001122', email: 'blr@greens.in',        city: 'Bangalore',   state: 'KA', gst: '29AABCF3344Z4Z4', creditLimit: 600000, outstanding: 56000,  paymentTerms: 'Net 7',  joinedDate: '2023-03-15' },
    { id: 'VN005', businessName: 'Mumbai Mandi Co.',          contactPerson: 'Anil Patel',      mobile: '9820456789', email: 'mumbai@mandi.in',      city: 'Mumbai',      state: 'MH', gst: '27AABCG5566Z5Z5', creditLimit: 1500000,outstanding: 342000, paymentTerms: 'Net 30', joinedDate: '2022-11-01' },
    { id: 'VN006', businessName: 'Vijaya Wholesale Hub',      contactPerson: 'Mohan Rao',       mobile: '9848099001', email: 'vijaya@wholesale.in',  city: 'Vijayawada',  state: 'AP', gst: '37AABCH7788Z6Z6', creditLimit: 400000, outstanding: 31500,  paymentTerms: 'Net 3',  joinedDate: '2023-09-22' },
  ],

  _vegetables: [
    { id: 'VG01', nameEn: 'Tomato',       nameTe: 'టమాటా',          unit: 'kg', grades: ['A','B','C'], currentBuyPrice: 32, currentSellPrice: 38, prevSellPrice: 35, available: 3200, emoji: '🍅' },
    { id: 'VG02', nameEn: 'Onion',        nameTe: 'ఉల్లిపాయ',       unit: 'kg', grades: ['A','B','C'], currentBuyPrice: 36, currentSellPrice: 44, prevSellPrice: 44, available: 4800, emoji: '🧅' },
    { id: 'VG03', nameEn: 'Potato',       nameTe: 'బంగాళాదుంప',    unit: 'kg', grades: ['A','B','C'], currentBuyPrice: 26, currentSellPrice: 32, prevSellPrice: 30, available: 5600, emoji: '🥔' },
    { id: 'VG04', nameEn: 'Brinjal',      nameTe: 'వంకాయ',          unit: 'kg', grades: ['A','B','C'], currentBuyPrice: 20, currentSellPrice: 26, prevSellPrice: 28, available: 1400, emoji: '🍆' },
    { id: 'VG05', nameEn: 'Cabbage',      nameTe: 'క్యాబేజీ',        unit: 'kg', grades: ['A','B'],     currentBuyPrice: 14, currentSellPrice: 18, prevSellPrice: 16, available: 2200, emoji: '🥬' },
    { id: 'VG06', nameEn: 'Cauliflower',  nameTe: 'కాలీఫ్లవర్',     unit: 'kg', grades: ['A','B'],     currentBuyPrice: 28, currentSellPrice: 35, prevSellPrice: 32, available: 980,  emoji: '🥦' },
    { id: 'VG07', nameEn: 'Carrot',       nameTe: 'క్యారెట్',        unit: 'kg', grades: ['A','B','C'], currentBuyPrice: 30, currentSellPrice: 38, prevSellPrice: 36, available: 1600, emoji: '🥕' },
    { id: 'VG08', nameEn: 'Green Chilli', nameTe: 'పచ్చిమిరపకాయ',  unit: 'kg', grades: ['A','B','C'], currentBuyPrice: 45, currentSellPrice: 56, prevSellPrice: 60, available: 820,  emoji: '🌶️' },
    { id: 'VG09', nameEn: "Lady's Finger",nameTe: 'బెండకాయ',        unit: 'kg', grades: ['A','B'],     currentBuyPrice: 24, currentSellPrice: 30, prevSellPrice: 28, available: 760,  emoji: '🌿' },
    { id: 'VG10', nameEn: 'Drumstick',    nameTe: 'మునగకాయ',        unit: 'kg', grades: ['A','B'],     currentBuyPrice: 42, currentSellPrice: 52, prevSellPrice: 48, available: 440,  emoji: '🌿' },
    { id: 'VG11', nameEn: 'Bottle Gourd', nameTe: 'సొరకాయ',         unit: 'kg', grades: ['A','B'],     currentBuyPrice: 10, currentSellPrice: 14, prevSellPrice: 14, available: 1800, emoji: '🥒' },
    { id: 'VG12', nameEn: 'Bitter Gourd', nameTe: 'కాకరకాయ',        unit: 'kg', grades: ['A','B'],     currentBuyPrice: 22, currentSellPrice: 28, prevSellPrice: 26, available: 620,  emoji: '🥒' },
    { id: 'VG13', nameEn: 'Ridge Gourd',  nameTe: 'బీరకాయ',         unit: 'kg', grades: ['A','B'],     currentBuyPrice: 16, currentSellPrice: 22, prevSellPrice: 20, available: 540,  emoji: '🥒' },
    { id: 'VG14', nameEn: 'Cucumber',     nameTe: 'దోసకాయ',         unit: 'kg', grades: ['A','B'],     currentBuyPrice: 12, currentSellPrice: 16, prevSellPrice: 16, available: 2400, emoji: '🥒' },
    { id: 'VG15', nameEn: 'Beans',        nameTe: 'చిక్కుడు',        unit: 'kg', grades: ['A','B','C'], currentBuyPrice: 38, currentSellPrice: 48, prevSellPrice: 44, available: 680,  emoji: '🫘' },
  ],

  _prices: [
    { id: 'PR01', vegId: 'VG01', date: '2026-09-21', buyPrice: 32, sellPrice: 38, change: 'up' },
    { id: 'PR02', vegId: 'VG02', date: '2026-09-21', buyPrice: 36, sellPrice: 44, change: 'neutral' },
    { id: 'PR03', vegId: 'VG03', date: '2026-09-21', buyPrice: 26, sellPrice: 32, change: 'up' },
    { id: 'PR04', vegId: 'VG04', date: '2026-09-21', buyPrice: 20, sellPrice: 26, change: 'down' },
    { id: 'PR05', vegId: 'VG05', date: '2026-09-21', buyPrice: 14, sellPrice: 18, change: 'up' },
    { id: 'PR06', vegId: 'VG06', date: '2026-09-21', buyPrice: 28, sellPrice: 35, change: 'up' },
    { id: 'PR07', vegId: 'VG07', date: '2026-09-21', buyPrice: 30, sellPrice: 38, change: 'up' },
    { id: 'PR08', vegId: 'VG08', date: '2026-09-21', buyPrice: 45, sellPrice: 56, change: 'down' },
    { id: 'PR09', vegId: 'VG09', date: '2026-09-21', buyPrice: 24, sellPrice: 30, change: 'up' },
    { id: 'PR10', vegId: 'VG10', date: '2026-09-21', buyPrice: 42, sellPrice: 52, change: 'up' },
    { id: 'PR11', vegId: 'VG11', date: '2026-09-21', buyPrice: 10, sellPrice: 14, change: 'neutral' },
    { id: 'PR12', vegId: 'VG12', date: '2026-09-21', buyPrice: 22, sellPrice: 28, change: 'up' },
    { id: 'PR13', vegId: 'VG13', date: '2026-09-21', buyPrice: 16, sellPrice: 22, change: 'up' },
    { id: 'PR14', vegId: 'VG14', date: '2026-09-21', buyPrice: 12, sellPrice: 16, change: 'neutral' },
    { id: 'PR15', vegId: 'VG15', date: '2026-09-21', buyPrice: 38, sellPrice: 48, change: 'up' },
  ],

  _purchases: [
    { id: 'PUR001', farmerId: 'F001', vegetableId: 'VG01', grade: 'A', qty: 800,  rate: 34, total: 27200,  date: '2026-09-15', bags: 16, vehicleNo: 'AP29AJ4567', paymentMode: 'Cash',         status: 'completed' },
    { id: 'PUR002', farmerId: 'F002', vegetableId: 'VG02', grade: 'A', qty: 1200, rate: 38, total: 45600,  date: '2026-09-15', bags: 24, vehicleNo: 'AP05BK1234', paymentMode: 'UPI',          status: 'completed' },
    { id: 'PUR003', farmerId: 'F003', vegetableId: 'VG03', grade: 'B', qty: 600,  rate: 24, total: 14400,  date: '2026-09-16', bags: 12, vehicleNo: 'AP29CL5678', paymentMode: 'Bank Transfer', status: 'completed' },
    { id: 'PUR004', farmerId: 'F004', vegetableId: 'VG08', grade: 'A', qty: 250,  rate: 46, total: 11500,  date: '2026-09-16', bags: 5,  vehicleNo: 'AP09DM2345', paymentMode: 'Cash',         status: 'completed' },
    { id: 'PUR005', farmerId: 'F005', vegetableId: 'VG04', grade: 'A', qty: 480,  rate: 22, total: 10560,  date: '2026-09-16', bags: 10, vehicleNo: 'AP11EN3456', paymentMode: 'UPI',          status: 'completed' },
    { id: 'PUR006', farmerId: 'F001', vegetableId: 'VG01', grade: 'B', qty: 420,  rate: 28, total: 11760,  date: '2026-09-17', bags: 9,  vehicleNo: 'AP29AJ4567', paymentMode: 'Cash',         status: 'completed' },
    { id: 'PUR007', farmerId: 'F006', vegetableId: 'VG05', grade: 'A', qty: 700,  rate: 15, total: 10500,  date: '2026-09-17', bags: 14, vehicleNo: 'AP15FN4567', paymentMode: 'Bank Transfer', status: 'completed' },
    { id: 'PUR008', farmerId: 'F007', vegetableId: 'VG07', grade: 'A', qty: 350,  rate: 32, total: 11200,  date: '2026-09-17', bags: 7,  vehicleNo: 'AP28GP5678', paymentMode: 'UPI',          status: 'completed' },
    { id: 'PUR009', farmerId: 'F002', vegetableId: 'VG02', grade: 'B', qty: 900,  rate: 33, total: 29700,  date: '2026-09-18', bags: 18, vehicleNo: 'AP05BK1234', paymentMode: 'Cash',         status: 'completed' },
    { id: 'PUR010', farmerId: 'F008', vegetableId: 'VG09', grade: 'A', qty: 200,  rate: 25, total: 5000,   date: '2026-09-18', bags: 4,  vehicleNo: 'AP29HQ6789', paymentMode: 'Cash',         status: 'completed' },
    { id: 'PUR011', farmerId: 'F003', vegetableId: 'VG06', grade: 'A', qty: 320,  rate: 30, total: 9600,   date: '2026-09-18', bags: 7,  vehicleNo: 'AP29CL5678', paymentMode: 'UPI',          status: 'completed' },
    { id: 'PUR012', farmerId: 'F004', vegetableId: 'VG15', grade: 'A', qty: 180,  rate: 40, total: 7200,   date: '2026-09-19', bags: 4,  vehicleNo: 'AP09DM2345', paymentMode: 'Bank Transfer', status: 'completed' },
    { id: 'PUR013', farmerId: 'F005', vegetableId: 'VG12', grade: 'A', qty: 240,  rate: 23, total: 5520,   date: '2026-09-19', bags: 5,  vehicleNo: 'AP11EN3456', paymentMode: 'Cash',         status: 'completed' },
    { id: 'PUR014', farmerId: 'F006', vegetableId: 'VG11', grade: 'A', qty: 600,  rate: 11, total: 6600,   date: '2026-09-19', bags: 12, vehicleNo: 'AP15FN4567', paymentMode: 'Cash',         status: 'completed' },
    { id: 'PUR015', farmerId: 'F001', vegetableId: 'VG13', grade: 'A', qty: 280,  rate: 17, total: 4760,   date: '2026-09-20', bags: 6,  vehicleNo: 'AP29AJ4567', paymentMode: 'UPI',          status: 'completed' },
    { id: 'PUR016', farmerId: 'F002', vegetableId: 'VG14', grade: 'A', qty: 800,  rate: 13, total: 10400,  date: '2026-09-20', bags: 16, vehicleNo: 'AP05BK1234', paymentMode: 'Cash',         status: 'completed' },
    { id: 'PUR017', farmerId: 'F007', vegetableId: 'VG10', grade: 'A', qty: 160,  rate: 43, total: 6880,   date: '2026-09-20', bags: 3,  vehicleNo: 'AP28GP5678', paymentMode: 'UPI',          status: 'completed' },
    { id: 'PUR018', farmerId: 'F003', vegetableId: 'VG01', grade: 'A', qty: 550,  rate: 33, total: 18150,  date: '2026-09-21', bags: 11, vehicleNo: 'AP29CL5678', paymentMode: 'Cash',         status: 'pending' },
    { id: 'PUR019', farmerId: 'F004', vegetableId: 'VG03', grade: 'A', qty: 900,  rate: 27, total: 24300,  date: '2026-09-21', bags: 18, vehicleNo: 'AP09DM2345', paymentMode: 'Bank Transfer', status: 'pending' },
    { id: 'PUR020', farmerId: 'F008', vegetableId: 'VG02', grade: 'A', qty: 500,  rate: 37, total: 18500,  date: '2026-09-21', bags: 10, vehicleNo: 'AP29HQ6789', paymentMode: 'UPI',          status: 'pending' },
  ],

  _arrivals: [
    { id: 'ARR001', farmerId: 'F001', vehicleNo: 'AP29AJ4567', vegetableId: 'VG01', expectedQty: 800,  arrivalDate: '2026-09-21', arrivalTime: '06:30', status: 'completed', notes: 'Good quality batch' },
    { id: 'ARR002', farmerId: 'F002', vehicleNo: 'AP05BK1234', vegetableId: 'VG02', expectedQty: 500,  arrivalDate: '2026-09-21', arrivalTime: '07:00', status: 'weighing',   notes: '' },
    { id: 'ARR003', farmerId: 'F003', vehicleNo: 'AP29CL5678', vegetableId: 'VG03', expectedQty: 900,  arrivalDate: '2026-09-21', arrivalTime: '07:15', status: 'arrived',    notes: 'Minor damage to some bags' },
    { id: 'ARR004', farmerId: 'F004', vehicleNo: 'AP09DM2345', vegetableId: 'VG04', expectedQty: 480,  arrivalDate: '2026-09-21', arrivalTime: '07:45', status: 'waiting',    notes: '' },
    { id: 'ARR005', farmerId: 'F005', vehicleNo: 'AP11EN3456', vegetableId: 'VG05', expectedQty: 700,  arrivalDate: '2026-09-21', arrivalTime: '08:00', status: 'waiting',    notes: '' },
    { id: 'ARR006', farmerId: 'F006', vehicleNo: 'AP15FN4567', vegetableId: 'VG06', expectedQty: 320,  arrivalDate: '2026-09-20', arrivalTime: '06:45', status: 'completed',  notes: '' },
    { id: 'ARR007', farmerId: 'F007', vehicleNo: 'AP28GP5678', vegetableId: 'VG07', expectedQty: 350,  arrivalDate: '2026-09-20', arrivalTime: '07:30', status: 'accepted',   notes: '' },
    { id: 'ARR008', farmerId: 'F008', vehicleNo: 'AP29HQ6789', vegetableId: 'VG09', expectedQty: 200,  arrivalDate: '2026-09-20', arrivalTime: '08:15', status: 'completed',  notes: '' },
    { id: 'ARR009', farmerId: 'F001', vehicleNo: 'AP29AJ4567', vegetableId: 'VG13', expectedQty: 280,  arrivalDate: '2026-09-20', arrivalTime: '09:00', status: 'completed',  notes: '' },
    { id: 'ARR010', farmerId: 'F002', vehicleNo: 'AP05BK1234', vegetableId: 'VG14', expectedQty: 800,  arrivalDate: '2026-09-19', arrivalTime: '07:00', status: 'completed',  notes: '' },
  ],

  _weighments: [
    { id: 'WGT001', arrivalId: 'ARR001', grossWt: 850,  tareWt: 50,  netWt: 800,  date: '2026-09-21', weighedBy: 'Suresh Babu', notes: '' },
    { id: 'WGT002', arrivalId: 'ARR006', grossWt: 345,  tareWt: 25,  netWt: 320,  date: '2026-09-20', weighedBy: 'Suresh Babu', notes: '' },
    { id: 'WGT003', arrivalId: 'ARR007', grossWt: 378,  tareWt: 28,  netWt: 350,  date: '2026-09-20', weighedBy: 'Suresh Babu', notes: '' },
    { id: 'WGT004', arrivalId: 'ARR008', grossWt: 215,  tareWt: 15,  netWt: 200,  date: '2026-09-20', weighedBy: 'Suresh Babu', notes: '' },
    { id: 'WGT005', arrivalId: 'ARR009', grossWt: 300,  tareWt: 20,  netWt: 280,  date: '2026-09-20', weighedBy: 'Suresh Babu', notes: '' },
    { id: 'WGT006', arrivalId: 'ARR010', grossWt: 832,  tareWt: 32,  netWt: 800,  date: '2026-09-19', weighedBy: 'Suresh Babu', notes: '' },
    { id: 'WGT007', arrivalId: 'ARR002', grossWt: 535,  tareWt: 35,  netWt: 500,  date: '2026-09-21', weighedBy: 'Suresh Babu', notes: 'In progress' },
    { id: 'WGT008', arrivalId: 'ARR003', grossWt: 0,    tareWt: 0,   netWt: 0,    date: '',           weighedBy: '',             notes: 'Pending' },
    { id: 'WGT009', arrivalId: 'ARR004', grossWt: 0,    tareWt: 0,   netWt: 0,    date: '',           weighedBy: '',             notes: 'Pending' },
    { id: 'WGT010', arrivalId: 'ARR005', grossWt: 0,    tareWt: 0,   netWt: 0,    date: '',           weighedBy: '',             notes: 'Pending' },
  ],

  _qualityChecks: [
    { id: 'QC001', weighmentId: 'WGT001', vegId: 'VG01', gradeA: 640, gradeB: 120, gradeC: 30, damaged: 10, rejected: 0,  total: 800, inspectedBy: 'Suresh Babu', date: '2026-09-21', remarks: 'Good quality' },
    { id: 'QC002', weighmentId: 'WGT002', vegId: 'VG06', gradeA: 280, gradeB: 35,  gradeC: 5,  damaged: 0,  rejected: 0,  total: 320, inspectedBy: 'Suresh Babu', date: '2026-09-20', remarks: '' },
    { id: 'QC003', weighmentId: 'WGT003', vegId: 'VG07', gradeA: 310, gradeB: 30,  gradeC: 10, damaged: 0,  rejected: 0,  total: 350, inspectedBy: 'Suresh Babu', date: '2026-09-20', remarks: '' },
    { id: 'QC004', weighmentId: 'WGT004', vegId: 'VG09', gradeA: 180, gradeB: 18,  gradeC: 2,  damaged: 0,  rejected: 0,  total: 200, inspectedBy: 'Suresh Babu', date: '2026-09-20', remarks: '' },
    { id: 'QC005', weighmentId: 'WGT005', vegId: 'VG13', gradeA: 240, gradeB: 32,  gradeC: 8,  damaged: 0,  rejected: 0,  total: 280, inspectedBy: 'Suresh Babu', date: '2026-09-20', remarks: '' },
    { id: 'QC006', weighmentId: 'WGT006', vegId: 'VG14', gradeA: 700, gradeB: 90,  gradeC: 10, damaged: 0,  rejected: 0,  total: 800, inspectedBy: 'Suresh Babu', date: '2026-09-19', remarks: '' },
    { id: 'QC007', weighmentId: 'WGT007', vegId: 'VG02', gradeA: 420, gradeB: 70,  gradeC: 10, damaged: 0,  rejected: 0,  total: 500, inspectedBy: 'Suresh Babu', date: '2026-09-21', remarks: 'Ongoing' },
    { id: 'QC008', weighmentId: 'WGT008', vegId: 'VG03', gradeA: 0,   gradeB: 0,   gradeC: 0,  damaged: 0,  rejected: 0,  total: 0,   inspectedBy: '',             date: '',           remarks: 'Pending' },
    { id: 'QC009', weighmentId: 'WGT009', vegId: 'VG04', gradeA: 0,   gradeB: 0,   gradeC: 0,  damaged: 0,  rejected: 0,  total: 0,   inspectedBy: '',             date: '',           remarks: 'Pending' },
    { id: 'QC010', weighmentId: 'WGT010', vegId: 'VG05', gradeA: 0,   gradeB: 0,   gradeC: 0,  damaged: 0,  rejected: 0,  total: 0,   inspectedBy: '',             date: '',           remarks: 'Pending' },
  ],

  _inventory: [
    { id: 'INV01', vegId: 'VG01', grade: 'A', opening: 1200, purchased: 1990, sold: 1500, damaged: 30,  wastage: 60,  closing: 1600 },
    { id: 'INV02', vegId: 'VG01', grade: 'B', opening: 400,  purchased: 540,  sold: 380,  damaged: 20,  wastage: 15,  closing: 525  },
    { id: 'INV03', vegId: 'VG02', grade: 'A', opening: 2200, purchased: 2120, sold: 1800, damaged: 40,  wastage: 80,  closing: 2400 },
    { id: 'INV04', vegId: 'VG02', grade: 'B', opening: 600,  purchased: 870,  sold: 520,  damaged: 30,  wastage: 20,  closing: 900  },
    { id: 'INV05', vegId: 'VG03', grade: 'A', opening: 3000, purchased: 1500, sold: 1200, damaged: 50,  wastage: 100, closing: 3150 },
    { id: 'INV06', vegId: 'VG04', grade: 'A', opening: 600,  purchased: 480,  sold: 480,  damaged: 20,  wastage: 10,  closing: 570  },
    { id: 'INV07', vegId: 'VG05', grade: 'A', opening: 900,  purchased: 700,  sold: 560,  damaged: 15,  wastage: 25,  closing: 1000 },
    { id: 'INV08', vegId: 'VG06', grade: 'A', opening: 300,  purchased: 320,  sold: 280,  damaged: 10,  wastage: 10,  closing: 320  },
    { id: 'INV09', vegId: 'VG07', grade: 'A', opening: 700,  purchased: 350,  sold: 300,  damaged: 10,  wastage: 10,  closing: 730  },
    { id: 'INV10', vegId: 'VG08', grade: 'A', opening: 200,  purchased: 250,  sold: 200,  damaged: 5,   wastage: 5,   closing: 240  },
    { id: 'INV11', vegId: 'VG09', grade: 'A', opening: 250,  purchased: 200,  sold: 180,  damaged: 5,   wastage: 5,   closing: 260  },
    { id: 'INV12', vegId: 'VG10', grade: 'A', opening: 100,  purchased: 160,  sold: 140,  damaged: 5,   wastage: 5,   closing: 110  },
    { id: 'INV13', vegId: 'VG11', grade: 'A', opening: 800,  purchased: 600,  sold: 500,  damaged: 15,  wastage: 25,  closing: 860  },
    { id: 'INV14', vegId: 'VG14', grade: 'A', opening: 1200, purchased: 800,  sold: 700,  damaged: 10,  wastage: 15,  closing: 1275 },
    { id: 'INV15', vegId: 'VG15', grade: 'A', opening: 300,  purchased: 180,  sold: 140,  damaged: 8,   wastage: 7,   closing: 325  },
  ],

  _orders: [
    { id: 'ORD-10231', vendorId: 'VN001', orderDate: '2026-09-14', deliveryDate: '2026-09-16', status: 'delivered',         total: 136400, notes: '' },
    { id: 'ORD-10232', vendorId: 'VN002', orderDate: '2026-09-15', deliveryDate: '2026-09-18', status: 'delivered',         total: 284600, notes: '' },
    { id: 'ORD-10233', vendorId: 'VN003', orderDate: '2026-09-15', deliveryDate: '2026-09-19', status: 'delivered',         total: 98400,  notes: '' },
    { id: 'ORD-10234', vendorId: 'VN004', orderDate: '2026-09-16', deliveryDate: '2026-09-18', status: 'dispatched',        total: 75200,  notes: '' },
    { id: 'ORD-10235', vendorId: 'VN005', orderDate: '2026-09-17', deliveryDate: '2026-09-22', status: 'inTransit',         total: 412000, notes: 'Large bulk order' },
    { id: 'ORD-10236', vendorId: 'VN006', orderDate: '2026-09-18', deliveryDate: '2026-09-19', status: 'delivered',         total: 44800,  notes: '' },
    { id: 'ORD-10237', vendorId: 'VN001', orderDate: '2026-09-19', deliveryDate: '2026-09-21', status: 'stockAllocated',    total: 88200,  notes: '' },
    { id: 'ORD-10238', vendorId: 'VN002', orderDate: '2026-09-19', deliveryDate: '2026-09-23', status: 'confirmed',         total: 156800, notes: '' },
    { id: 'ORD-10239', vendorId: 'VN003', orderDate: '2026-09-20', deliveryDate: '2026-09-22', status: 'preparing',         total: 62400,  notes: '' },
    { id: 'ORD-10240', vendorId: 'VN004', orderDate: '2026-09-20', deliveryDate: '2026-09-23', status: 'confirmed',         total: 93600,  notes: '' },
    { id: 'ORD-10241', vendorId: 'VN005', orderDate: '2026-09-21', deliveryDate: '2026-09-25', status: 'pending',           total: 325000, notes: '' },
    { id: 'ORD-10242', vendorId: 'VN006', orderDate: '2026-09-21', deliveryDate: '2026-09-22', status: 'pending',           total: 28400,  notes: '' },
    { id: 'ORD-10243', vendorId: 'VN001', orderDate: '2026-09-21', deliveryDate: '2026-09-23', status: 'pending',           total: 56700,  notes: '' },
    { id: 'ORD-10244', vendorId: 'VN002', orderDate: '2026-09-13', deliveryDate: '2026-09-17', status: 'partiallyFulfilled',total: 188400, notes: 'Green chilli short by 80 kg' },
    { id: 'ORD-10245', vendorId: 'VN003', orderDate: '2026-09-21', deliveryDate: '2026-09-24', status: 'loading',           total: 71200,  notes: '' },
  ],

  _orderItems: [
    // ORD-10231
    { id: 'OI001', orderId: 'ORD-10231', vegId: 'VG01', grade: 'A', qty: 1000, rate: 38, amount: 38000 },
    { id: 'OI002', orderId: 'ORD-10231', vegId: 'VG03', grade: 'A', qty: 1200, rate: 32, amount: 38400 },
    { id: 'OI003', orderId: 'ORD-10231', vegId: 'VG05', grade: 'A', qty: 1600, rate: 18, amount: 28800 },
    { id: 'OI004', orderId: 'ORD-10231', vegId: 'VG11', grade: 'A', qty: 2240, rate: 14, amount: 31360 },
    // ORD-10235
    { id: 'OI005', orderId: 'ORD-10235', vegId: 'VG01', grade: 'A', qty: 3000, rate: 38, amount: 114000 },
    { id: 'OI006', orderId: 'ORD-10235', vegId: 'VG02', grade: 'A', qty: 2000, rate: 44, amount: 88000 },
    { id: 'OI007', orderId: 'ORD-10235', vegId: 'VG03', grade: 'A', qty: 2500, rate: 32, amount: 80000 },
    { id: 'OI008', orderId: 'ORD-10235', vegId: 'VG04', grade: 'A', qty: 1500, rate: 26, amount: 39000 },
    { id: 'OI009', orderId: 'ORD-10235', vegId: 'VG08', grade: 'A', qty: 1625, rate: 56, amount: 91000 },
    // ORD-10241
    { id: 'OI010', orderId: 'ORD-10241', vegId: 'VG01', grade: 'A', qty: 2000, rate: 38, amount: 76000 },
    { id: 'OI011', orderId: 'ORD-10241', vegId: 'VG02', grade: 'A', qty: 1500, rate: 44, amount: 66000 },
    { id: 'OI012', orderId: 'ORD-10241', vegId: 'VG03', grade: 'A', qty: 2000, rate: 32, amount: 64000 },
    { id: 'OI013', orderId: 'ORD-10241', vegId: 'VG14', grade: 'A', qty: 2500, rate: 16, amount: 40000 },
    { id: 'OI014', orderId: 'ORD-10241', vegId: 'VG15', grade: 'A', qty: 1645, rate: 48, amount: 79000 },
    // ORD-10243 (vendor VN001 demo)
    { id: 'OI015', orderId: 'ORD-10243', vegId: 'VG01', grade: 'A', qty: 500,  rate: 38, amount: 19000 },
    { id: 'OI016', orderId: 'ORD-10243', vegId: 'VG07', grade: 'A', qty: 500,  rate: 38, amount: 19000 },
    { id: 'OI017', orderId: 'ORD-10243', vegId: 'VG15', grade: 'A', qty: 390,  rate: 48, amount: 18700 },
  ],

  _labour: [
    { id: 'L001', name: 'Raju Kumar',      mobile: '9704201234', workType: 'Loading',   dailyWage: 700, status: 'active', joinDate: '2023-01-15' },
    { id: 'L002', name: 'Srinivas Yadav',  mobile: '9494302345', workType: 'Loading',   dailyWage: 700, status: 'active', joinDate: '2023-02-10' },
    { id: 'L003', name: 'Bheem Raju',      mobile: '9703403456', workType: 'Loading',   dailyWage: 680, status: 'active', joinDate: '2023-03-05' },
    { id: 'L004', name: 'Narayana Swamy',  mobile: '9000504567', workType: 'Loading',   dailyWage: 700, status: 'active', joinDate: '2022-12-01' },
    { id: 'L005', name: 'Kishore Kumar',   mobile: '9848605678', workType: 'Unloading', dailyWage: 650, status: 'active', joinDate: '2023-04-20' },
    { id: 'L006', name: 'Mahesh Babu',     mobile: '9490706789', workType: 'Unloading', dailyWage: 650, status: 'active', joinDate: '2023-05-12' },
    { id: 'L007', name: 'Pavan Kalyan',    mobile: '9951807890', workType: 'Sorting',   dailyWage: 620, status: 'active', joinDate: '2023-06-01' },
    { id: 'L008', name: 'Tirupathi Rao',   mobile: '9494908901', workType: 'Sorting',   dailyWage: 620, status: 'active', joinDate: '2023-07-15' },
    { id: 'L009', name: 'Ganesh Murthy',   mobile: '9885009012', workType: 'Packing',   dailyWage: 600, status: 'active', joinDate: '2023-08-10' },
    { id: 'L010', name: 'Ramesh Chandra',  mobile: '9949110123', workType: 'Cleaning',  dailyWage: 600, status: 'active', joinDate: '2023-09-01' },
  ],

  _attendance: (() => {
    const records = [];
    const labourIds = ['L001','L002','L003','L004','L005','L006','L007','L008','L009','L010'];
    const dates = ['2026-09-15','2026-09-16','2026-09-17','2026-09-18','2026-09-19','2026-09-20','2026-09-21'];
    const statusPool = ['present','present','present','present','halfDay','absent','overtime'];
    let i = 0;
    dates.forEach(date => {
      labourIds.forEach(lid => {
        const s = statusPool[i % statusPool.length];
        records.push({
          id: `ATT${String(++i).padStart(3,'0')}`,
          labourId: lid,
          date,
          status: s,
          overtimeHours: s === 'overtime' ? 2 : 0,
          notes: ''
        });
      });
    });
    return records;
  })(),

  _vehicles: [
    { id: 'VH001', vehicleNo: 'AP29AJ4567', type: 'Pickup Truck', driverName: 'Subrahmanyam',  driverMobile: '9949501111', capacity: 2,  status: 'available',    notes: '' },
    { id: 'VH002', vehicleNo: 'AP05BK1234', type: 'Pickup Truck', driverName: 'Venkatramaiah', driverMobile: '9848502222', capacity: 2,  status: 'inUse',        notes: 'Assigned to ORD-10245' },
    { id: 'VH003', vehicleNo: 'AP09DM2345', type: 'Mini Truck',   driverName: 'Krishnamurthy', driverMobile: '9494503333', capacity: 5,  status: 'available',    notes: '' },
    { id: 'VH004', vehicleNo: 'AP11EN3456', type: 'Mini Truck',   driverName: 'Satyanarayana', driverMobile: '9703504444', capacity: 5,  status: 'inUse',        notes: 'Assigned to ORD-10234' },
    { id: 'VH005', vehicleNo: 'AP15FN4567', type: 'Tempo',        driverName: 'Raghavendra',   driverMobile: '9000505555', capacity: 1,  status: 'maintenance',  notes: 'Engine service' },
    { id: 'VH006', vehicleNo: 'AP28GP5678', type: 'Mini Truck',   driverName: 'Chandrasekhar', driverMobile: '9885506666', capacity: 5,  status: 'available',    notes: '' },
  ],

  _dispatches: [
    { id: 'DSP001', orderId: 'ORD-10231', vehicleId: 'VH001', vehicleNo: 'AP29AJ4567', driverName: 'Subrahmanyam',  from: 'Guntur Market', to: 'Hyderabad', dispatchDate: '2026-09-15', estimatedArrival: '2026-09-16', actualArrival: '2026-09-16', status: 'delivered' },
    { id: 'DSP002', orderId: 'ORD-10232', vehicleId: 'VH003', vehicleNo: 'AP09DM2345', driverName: 'Krishnamurthy', from: 'Guntur Market', to: 'Hyderabad', dispatchDate: '2026-09-16', estimatedArrival: '2026-09-18', actualArrival: '2026-09-18', status: 'delivered' },
    { id: 'DSP003', orderId: 'ORD-10233', vehicleId: 'VH006', vehicleNo: 'AP28GP5678', driverName: 'Chandrasekhar', from: 'Guntur Market', to: 'Chennai',   dispatchDate: '2026-09-16', estimatedArrival: '2026-09-19', actualArrival: '2026-09-19', status: 'delivered' },
    { id: 'DSP004', orderId: 'ORD-10234', vehicleId: 'VH004', vehicleNo: 'AP11EN3456', driverName: 'Satyanarayana', from: 'Guntur Market', to: 'Bangalore', dispatchDate: '2026-09-17', estimatedArrival: '2026-09-18', actualArrival: '',           status: 'dispatched' },
    { id: 'DSP005', orderId: 'ORD-10235', vehicleId: 'VH003', vehicleNo: 'AP09DM2345', driverName: 'Krishnamurthy', from: 'Guntur Market', to: 'Mumbai',    dispatchDate: '2026-09-18', estimatedArrival: '2026-09-22', actualArrival: '',           status: 'inTransit' },
    { id: 'DSP006', orderId: 'ORD-10236', vehicleId: 'VH001', vehicleNo: 'AP29AJ4567', driverName: 'Subrahmanyam',  from: 'Guntur Market', to: 'Vijayawada',dispatchDate: '2026-09-18', estimatedArrival: '2026-09-19', actualArrival: '2026-09-19', status: 'delivered' },
    { id: 'DSP007', orderId: 'ORD-10244', vehicleId: 'VH006', vehicleNo: 'AP28GP5678', driverName: 'Chandrasekhar', from: 'Guntur Market', to: 'Hyderabad', dispatchDate: '2026-09-14', estimatedArrival: '2026-09-17', actualArrival: '2026-09-17', status: 'delivered' },
    { id: 'DSP008', orderId: 'ORD-10245', vehicleId: 'VH002', vehicleNo: 'AP05BK1234', driverName: 'Venkatramaiah', from: 'Guntur Market', to: 'Chennai',   dispatchDate: '2026-09-21', estimatedArrival: '2026-09-24', actualArrival: '',           status: 'loading' },
  ],

  _payments: [
    { id: 'PAY001', partyId: 'F001', partyType: 'farmer', partyName: 'Venkatesh Reddy',    amount: 27200,  mode: 'Cash',         txnId: 'CASH-1501',  date: '2026-09-15', notes: 'Payment for PUR001' },
    { id: 'PAY002', partyId: 'F002', partyType: 'farmer', partyName: 'Krishna Rao',        amount: 45600,  mode: 'UPI',          txnId: 'UPI-150902', date: '2026-09-15', notes: 'Payment for PUR002' },
    { id: 'PAY003', partyId: 'VN001',partyType: 'vendor', partyName: 'Sri Ram Traders',    amount: 136400, mode: 'Bank Transfer',txnId: 'NEFT-1601',  date: '2026-09-16', notes: 'Receipt for ORD-10231' },
    { id: 'PAY004', partyId: 'F003', partyType: 'farmer', partyName: 'Lakshmaiah',         amount: 14400,  mode: 'Bank Transfer',txnId: 'NEFT-1701',  date: '2026-09-17', notes: 'Payment for PUR003' },
    { id: 'PAY005', partyId: 'VN002',partyType: 'vendor', partyName: 'Deccan Vegetables',  amount: 284600, mode: 'Bank Transfer',txnId: 'NEFT-1801',  date: '2026-09-18', notes: 'Receipt for ORD-10232' },
    { id: 'PAY006', partyId: 'F004', partyType: 'farmer', partyName: 'Nagaraju Palanki',   amount: 11500,  mode: 'Cash',         txnId: 'CASH-1901',  date: '2026-09-18', notes: 'Payment for PUR004' },
    { id: 'PAY007', partyId: 'VN003',partyType: 'vendor', partyName: 'Chennai Fresh Mart', amount: 98400,  mode: 'Bank Transfer',txnId: 'RTGS-1901',  date: '2026-09-19', notes: 'Receipt for ORD-10233' },
    { id: 'PAY008', partyId: 'F005', partyType: 'farmer', partyName: 'Siva Prasad',        amount: 10560,  mode: 'UPI',          txnId: 'UPI-190201', date: '2026-09-19', notes: 'Payment for PUR005' },
    { id: 'PAY009', partyId: 'F006', partyType: 'farmer', partyName: 'Ramaiah Nelluri',    amount: 10500,  mode: 'Bank Transfer',txnId: 'NEFT-2001',  date: '2026-09-20', notes: 'Payment for PUR007' },
    { id: 'PAY010', partyId: 'VN006',partyType: 'vendor', partyName: 'Vijaya Wholesale',   amount: 44800,  mode: 'Cash',         txnId: 'CASH-2001',  date: '2026-09-20', notes: 'Receipt for ORD-10236' },
    { id: 'PAY011', partyId: 'F007', partyType: 'farmer', partyName: 'Govinda Raju',       amount: 11200,  mode: 'UPI',          txnId: 'UPI-200301', date: '2026-09-20', notes: 'Payment for PUR008' },
    { id: 'PAY012', partyId: 'F002', partyType: 'farmer', partyName: 'Krishna Rao',        amount: 29700,  mode: 'Cash',         txnId: 'CASH-2101',  date: '2026-09-21', notes: 'Payment for PUR009' },
    { id: 'PAY013', partyId: 'F001', partyType: 'farmer', partyName: 'Venkatesh Reddy',    amount: 11760,  mode: 'UPI',          txnId: 'UPI-210201', date: '2026-09-21', notes: 'Payment for PUR006' },
    { id: 'PAY014', partyId: 'VN002',partyType: 'vendor', partyName: 'Deccan Vegetables',  amount: 100000, mode: 'Bank Transfer',txnId: 'NEFT-2101',  date: '2026-09-21', notes: 'Advance against ORD-10238' },
    { id: 'PAY015', partyId: 'F003', partyType: 'farmer', partyName: 'Lakshmaiah',         amount: 9600,   mode: 'UPI',          txnId: 'UPI-210301', date: '2026-09-21', notes: 'Payment for PUR011' },
    { id: 'PAY016', partyId: 'F004', partyType: 'farmer', partyName: 'Nagaraju Palanki',   amount: 7200,   mode: 'Cash',         txnId: 'CASH-2102',  date: '2026-09-21', notes: 'Payment for PUR012' },
    { id: 'PAY017', partyId: 'F008', partyType: 'farmer', partyName: 'Mallaiah Bondili',   amount: 5000,   mode: 'Cash',         txnId: 'CASH-2103',  date: '2026-09-21', notes: 'Payment for PUR010' },
    { id: 'PAY018', partyId: 'VN004',partyType: 'vendor', partyName: 'Bangalore Greens',   amount: 75200,  mode: 'Bank Transfer',txnId: 'NEFT-2102',  date: '2026-09-21', notes: 'Receipt for ORD-10234 (advance)' },
    { id: 'PAY019', partyId: 'F005', partyType: 'farmer', partyName: 'Siva Prasad',        amount: 5520,   mode: 'UPI',          txnId: 'UPI-210401', date: '2026-09-21', notes: 'Payment for PUR013' },
    { id: 'PAY020', partyId: 'F006', partyType: 'farmer', partyName: 'Ramaiah Nelluri',    amount: 6600,   mode: 'Cash',         txnId: 'CASH-2104',  date: '2026-09-21', notes: 'Payment for PUR014' },
  ],

  _ledgerEntries: [
    // Farmer F001 — Venkatesh Reddy
    { id: 'LED001', partyId: 'F001', partyType: 'farmer', date: '2026-09-15', description: 'Purchase PUR001 — Tomato A 800 kg', debit: 0,      credit: 27200,  balance: 27200,  refId: 'PUR001' },
    { id: 'LED002', partyId: 'F001', partyType: 'farmer', date: '2026-09-15', description: 'Payment — Cash',                      debit: 27200,  credit: 0,      balance: 0,      refId: 'PAY001' },
    { id: 'LED003', partyId: 'F001', partyType: 'farmer', date: '2026-09-17', description: 'Purchase PUR006 — Tomato B 420 kg', debit: 0,      credit: 11760,  balance: 11760,  refId: 'PUR006' },
    { id: 'LED004', partyId: 'F001', partyType: 'farmer', date: '2026-09-21', description: 'Payment — UPI',                       debit: 11760,  credit: 0,      balance: 0,      refId: 'PAY013' },
    { id: 'LED005', partyId: 'F001', partyType: 'farmer', date: '2026-09-20', description: 'Purchase PUR015 — Ridge Gourd A 280 kg',debit: 0,  credit: 4760,   balance: 4760,   refId: 'PUR015' },
    { id: 'LED006', partyId: 'F001', partyType: 'farmer', date: '2026-09-21', description: 'Purchase PUR018 — Tomato A 550 kg', debit: 0,      credit: 18150,  balance: 22910,  refId: 'PUR018' },
    // Farmer F002 — Krishna Rao
    { id: 'LED007', partyId: 'F002', partyType: 'farmer', date: '2026-09-15', description: 'Purchase PUR002 — Onion A 1200 kg',  debit: 0,      credit: 45600,  balance: 45600,  refId: 'PUR002' },
    { id: 'LED008', partyId: 'F002', partyType: 'farmer', date: '2026-09-15', description: 'Payment — UPI',                       debit: 45600,  credit: 0,      balance: 0,      refId: 'PAY002' },
    { id: 'LED009', partyId: 'F002', partyType: 'farmer', date: '2026-09-18', description: 'Purchase PUR009 — Onion B 900 kg',   debit: 0,      credit: 29700,  balance: 29700,  refId: 'PUR009' },
    { id: 'LED010', partyId: 'F002', partyType: 'farmer', date: '2026-09-21', description: 'Payment — Cash',                      debit: 29700,  credit: 0,      balance: 0,      refId: 'PAY012' },
    // Vendor VN001 — Sri Ram Traders
    { id: 'LED011', partyId: 'VN001', partyType: 'vendor', date: '2026-09-14', description: 'Order ORD-10231 invoiced',           debit: 136400, credit: 0,      balance: 136400, refId: 'ORD-10231' },
    { id: 'LED012', partyId: 'VN001', partyType: 'vendor', date: '2026-09-16', description: 'Payment received — NEFT',            debit: 0,      credit: 136400, balance: 0,      refId: 'PAY003' },
    { id: 'LED013', partyId: 'VN001', partyType: 'vendor', date: '2026-09-19', description: 'Order ORD-10237 invoiced',           debit: 88200,  credit: 0,      balance: 88200,  refId: 'ORD-10237' },
    { id: 'LED014', partyId: 'VN001', partyType: 'vendor', date: '2026-09-21', description: 'Order ORD-10243 invoiced',           debit: 56700,  credit: 0,      balance: 144900, refId: 'ORD-10243' },
    // Vendor VN002 — Deccan Vegetables
    { id: 'LED015', partyId: 'VN002', partyType: 'vendor', date: '2026-09-13', description: 'Order ORD-10244 invoiced (partial)', debit: 188400, credit: 0,      balance: 188400, refId: 'ORD-10244' },
    { id: 'LED016', partyId: 'VN002', partyType: 'vendor', date: '2026-09-15', description: 'Order ORD-10232 invoiced',           debit: 284600, credit: 0,      balance: 473000, refId: 'ORD-10232' },
    { id: 'LED017', partyId: 'VN002', partyType: 'vendor', date: '2026-09-18', description: 'Payment received — NEFT',            debit: 0,      credit: 284600, balance: 188400, refId: 'PAY005' },
    { id: 'LED018', partyId: 'VN002', partyType: 'vendor', date: '2026-09-19', description: 'Order ORD-10238 invoiced',           debit: 156800, credit: 0,      balance: 345200, refId: 'ORD-10238' },
    { id: 'LED019', partyId: 'VN002', partyType: 'vendor', date: '2026-09-21', description: 'Advance payment — NEFT',             debit: 0,      credit: 100000, balance: 245200, refId: 'PAY014' },
    // Vendor VN003 — Chennai Fresh Mart
    { id: 'LED020', partyId: 'VN003', partyType: 'vendor', date: '2026-09-15', description: 'Order ORD-10233 invoiced',           debit: 98400,  credit: 0,      balance: 98400,  refId: 'ORD-10233' },
    { id: 'LED021', partyId: 'VN003', partyType: 'vendor', date: '2026-09-19', description: 'Payment received — RTGS',            debit: 0,      credit: 98400,  balance: 0,      refId: 'PAY007' },
    { id: 'LED022', partyId: 'VN003', partyType: 'vendor', date: '2026-09-20', description: 'Order ORD-10239 invoiced',           debit: 62400,  credit: 0,      balance: 62400,  refId: 'ORD-10239' },
    { id: 'LED023', partyId: 'VN003', partyType: 'vendor', date: '2026-09-21', description: 'Order ORD-10245 invoiced',           debit: 71200,  credit: 0,      balance: 133600, refId: 'ORD-10245' },
    // Farmer F003
    { id: 'LED024', partyId: 'F003', partyType: 'farmer', date: '2026-09-16', description: 'Purchase PUR003 — Potato B 600 kg',  debit: 0,      credit: 14400,  balance: 14400,  refId: 'PUR003' },
    { id: 'LED025', partyId: 'F003', partyType: 'farmer', date: '2026-09-17', description: 'Payment — Bank Transfer',             debit: 14400,  credit: 0,      balance: 0,      refId: 'PAY004' },
    { id: 'LED026', partyId: 'F003', partyType: 'farmer', date: '2026-09-18', description: 'Purchase PUR011 — Cauliflower A 320 kg',debit: 0,   credit: 9600,   balance: 9600,   refId: 'PUR011' },
    { id: 'LED027', partyId: 'F003', partyType: 'farmer', date: '2026-09-21', description: 'Payment — UPI',                       debit: 9600,   credit: 0,      balance: 0,      refId: 'PAY015' },
    // Additional entries for other farmers/vendors
    { id: 'LED028', partyId: 'F004', partyType: 'farmer', date: '2026-09-16', description: 'Purchase PUR004 — Green Chilli A 250 kg',debit: 0, credit: 11500,  balance: 11500,  refId: 'PUR004' },
    { id: 'LED029', partyId: 'F004', partyType: 'farmer', date: '2026-09-18', description: 'Payment — Cash',                      debit: 11500,  credit: 0,      balance: 0,      refId: 'PAY006' },
    { id: 'LED030', partyId: 'F004', partyType: 'farmer', date: '2026-09-19', description: 'Purchase PUR012 — Beans A 180 kg',    debit: 0,      credit: 7200,   balance: 7200,   refId: 'PUR012' },
    { id: 'LED031', partyId: 'F004', partyType: 'farmer', date: '2026-09-21', description: 'Payment — Cash',                      debit: 7200,   credit: 0,      balance: 0,      refId: 'PAY016' },
    { id: 'LED032', partyId: 'VN004', partyType: 'vendor', date: '2026-09-16', description: 'Order ORD-10234 invoiced',           debit: 75200,  credit: 0,      balance: 75200,  refId: 'ORD-10234' },
    { id: 'LED033', partyId: 'VN004', partyType: 'vendor', date: '2026-09-21', description: 'Advance payment — NEFT',             debit: 0,      credit: 56000,  balance: 19200,  refId: 'PAY018' },
    { id: 'LED034', partyId: 'VN004', partyType: 'vendor', date: '2026-09-20', description: 'Order ORD-10240 invoiced',           debit: 93600,  credit: 0,      balance: 112800, refId: 'ORD-10240' },
    { id: 'LED035', partyId: 'VN005', partyType: 'vendor', date: '2026-09-17', description: 'Order ORD-10235 invoiced',           debit: 412000, credit: 0,      balance: 412000, refId: 'ORD-10235' },
    { id: 'LED036', partyId: 'VN005', partyType: 'vendor', date: '2026-09-21', description: 'Order ORD-10241 invoiced',           debit: 325000, credit: 0,      balance: 737000, refId: 'ORD-10241' },
    { id: 'LED037', partyId: 'VN006', partyType: 'vendor', date: '2026-09-18', description: 'Order ORD-10236 invoiced',           debit: 44800,  credit: 0,      balance: 44800,  refId: 'ORD-10236' },
    { id: 'LED038', partyId: 'VN006', partyType: 'vendor', date: '2026-09-20', description: 'Payment received — Cash',            debit: 0,      credit: 44800,  balance: 0,      refId: 'PAY010' },
    { id: 'LED039', partyId: 'VN006', partyType: 'vendor', date: '2026-09-21', description: 'Order ORD-10242 invoiced',           debit: 28400,  credit: 0,      balance: 28400,  refId: 'ORD-10242' },
    { id: 'LED040', partyId: 'F008', partyType: 'farmer', date: '2026-09-18', description: 'Purchase PUR010 — Lady\'s Finger A 200 kg',debit:0, credit: 5000, balance: 5000,   refId: 'PUR010' },
  ],

  _expenses: [
    { id: 'EXP001', category: 'Transport',   amount: 4500,  date: '2026-09-15', notes: 'Diesel for delivery vehicles' },
    { id: 'EXP002', category: 'Labour',      amount: 6300,  date: '2026-09-15', notes: '9 workers daily wages' },
    { id: 'EXP003', category: 'Labour',      amount: 6300,  date: '2026-09-16', notes: '9 workers daily wages' },
    { id: 'EXP004', category: 'Transport',   amount: 3800,  date: '2026-09-16', notes: 'Diesel + tolls' },
    { id: 'EXP005', category: 'Labour',      amount: 5600,  date: '2026-09-17', notes: '8 workers + half-day' },
    { id: 'EXP006', category: 'Electricity', amount: 1200,  date: '2026-09-17', notes: 'Cold storage unit' },
    { id: 'EXP007', category: 'Labour',      amount: 6300,  date: '2026-09-18', notes: '9 workers daily wages' },
    { id: 'EXP008', category: 'Transport',   amount: 5200,  date: '2026-09-18', notes: 'Long-haul Mumbai vehicle expenses' },
    { id: 'EXP009', category: 'Labour',      amount: 6300,  date: '2026-09-19', notes: '9 workers daily wages' },
    { id: 'EXP010', category: 'Miscellaneous',amount: 800,  date: '2026-09-19', notes: 'Bag repairs, packing material' },
    { id: 'EXP011', category: 'Labour',      amount: 5600,  date: '2026-09-20', notes: '8 workers + half-day' },
    { id: 'EXP012', category: 'Rent',        amount: 12000, date: '2026-09-20', notes: 'Monthly market yard rent (advance)' },
    { id: 'EXP013', category: 'Labour',      amount: 6300,  date: '2026-09-21', notes: '9 workers daily wages' },
    { id: 'EXP014', category: 'Transport',   amount: 2800,  date: '2026-09-21', notes: 'Local pickup runs' },
    { id: 'EXP015', category: 'Miscellaneous',amount: 1500, date: '2026-09-21', notes: 'Office supplies, weighing scale maintenance' },
  ],

  _loadingRecords: [
    { id: 'LDG001', orderId: 'ORD-10231', labourIds: ['L001','L002'], startTime: '2026-09-15T04:00', endTime: '2026-09-15T06:30', totalQty: 4320, labourCost: 1400, status: 'completed', notes: '' },
    { id: 'LDG002', orderId: 'ORD-10232', labourIds: ['L001','L002','L003'], startTime: '2026-09-16T03:30', endTime: '2026-09-16T07:00', totalQty: 6200, labourCost: 2100, status: 'completed', notes: '' },
    { id: 'LDG003', orderId: 'ORD-10233', labourIds: ['L004','L005'], startTime: '2026-09-16T04:00', endTime: '2026-09-16T06:00', totalQty: 2800, labourCost: 1350, status: 'completed', notes: '' },
    { id: 'LDG004', orderId: 'ORD-10234', labourIds: ['L002','L003'], startTime: '2026-09-17T05:00', endTime: '2026-09-17T07:30', totalQty: 2200, labourCost: 1400, status: 'completed', notes: '' },
    { id: 'LDG005', orderId: 'ORD-10235', labourIds: ['L001','L002','L003','L004'], startTime: '2026-09-18T02:00', endTime: '2026-09-18T07:00', totalQty: 10125, labourCost: 2800, status: 'completed', notes: 'Large Mumbai bulk load' },
    { id: 'LDG006', orderId: 'ORD-10245', labourIds: ['L001','L005'], startTime: '2026-09-21T05:00', endTime: '',                totalQty: 0,    labourCost: 0,    status: 'inProgress', notes: '' },
  ],

  _returns: [
    { id: 'RET001', type: 'vendor', partyId: 'VN002', orderId: 'ORD-10244', vegId: 'VG08', grade: 'A', qty: 80, reason: 'Damaged in transit', date: '2026-09-18', status: 'processed', creditNote: 4480 },
    { id: 'RET002', type: 'farmer', partyId: 'F003', purchaseId: 'PUR003',  vegId: 'VG03', grade: 'B', qty: 40, reason: 'Quality below standard', date: '2026-09-17', status: 'processed', debitNote: 960 },
  ],

  /* ──────────────────────────────────────────────────────────
     INIT — Load from localStorage or seed from raw data
     ────────────────────────────────────────────────────────── */
  init() {
    const stores = [
      '_users','_farmers','_vendors','_vegetables','_purchases','_arrivals',
      '_weighments','_qualityChecks','_inventory','_orders','_orderItems',
      '_labour','_attendance','_vehicles','_dispatches','_payments',
      '_ledgerEntries','_expenses','_prices','_loadingRecords','_returns'
    ];
    stores.forEach(store => {
      const key = `golis_${store}`;
      const saved = localStorage.getItem(key);
      if (!saved) {
        // Seed localStorage from raw data
        localStorage.setItem(key, JSON.stringify(this[store]));
      }
      // Always read from localStorage (single source of truth after init)
      this[store] = JSON.parse(localStorage.getItem(key));
    });
  },

  /* ──────────────────────────────────────────────────────────
     SAVE HELPER — persist a store back to localStorage
     ────────────────────────────────────────────────────────── */
  _persist(store) {
    localStorage.setItem(`golis_${store}`, JSON.stringify(this[store]));
  },

  /* ──────────────────────────────────────────────────────────
     GETTERS — return shallow copies
     ────────────────────────────────────────────────────────── */
  getUsers()         { return [...this._users]; },
  getFarmers()       { return [...this._farmers]; },
  getVendors()       { return [...this._vendors]; },
  getVegetables()    { return [...this._vegetables]; },
  getPurchases()     { return [...this._purchases]; },
  getArrivals()      { return [...this._arrivals]; },
  getWeighments()    { return [...this._weighments]; },
  getQualityChecks() { return [...this._qualityChecks]; },
  getInventory()     { return [...this._inventory]; },
  getOrders()        { return [...this._orders]; },
  getOrderItems(orderId) {
    return this._orderItems.filter(i => i.orderId === orderId);
  },
  getLabour()        { return [...this._labour]; },
  getAttendance(date) {
    if (!date) return [...this._attendance];
    return this._attendance.filter(a => a.date === date);
  },
  getVehicles()      { return [...this._vehicles]; },
  getDispatches()    { return [...this._dispatches]; },
  getPayments()      { return [...this._payments]; },
  getLedgerEntries(partyId) {
    if (!partyId) return [...this._ledgerEntries];
    return this._ledgerEntries.filter(e => e.partyId === partyId);
  },
  getExpenses()      { return [...this._expenses]; },
  getPrices()        { return [...this._prices]; },
  getLoadingRecords(){ return [...this._loadingRecords]; },
  getReturns()       { return [...this._returns]; },

  /* ──────────────────────────────────────────────────────────
     MUTATIONS — save, update, delete
     ────────────────────────────────────────────────────────── */
  saveRecord(store, record) {
    this[store].push(record);
    this._persist(store);
    return record;
  },
  updateRecord(store, id, updates) {
    const idx = this[store].findIndex(r => r.id === id);
    if (idx === -1) return null;
    this[store][idx] = { ...this[store][idx], ...updates };
    this._persist(store);
    return this[store][idx];
  },
  deleteRecord(store, id) {
    const idx = this[store].findIndex(r => r.id === id);
    if (idx === -1) return false;
    this[store].splice(idx, 1);
    this._persist(store);
    return true;
  },

  /* ──────────────────────────────────────────────────────────
     CONVENIENCE GETTERS
     ────────────────────────────────────────────────────────── */
  getFarmerById(id)    { return this._farmers.find(f => f.id === id) || null; },
  getVendorById(id)    { return this._vendors.find(v => v.id === id) || null; },
  getLabourById(id)    { return this._labour.find(l => l.id === id)  || null; },
  getVegetableById(id) { return this._vegetables.find(v => v.id === id) || null; },
  getOrderById(id)     { return this._orders.find(o => o.id === id) || null; },
  getUserByEmail(email){ return this._users.find(u => u.email === email) || null; },

  getInventoryByVegetable(vegId, grade) {
    if (grade) return this._inventory.find(i => i.vegId === vegId && i.grade === grade) || null;
    return this._inventory.filter(i => i.vegId === vegId);
  },

  /* ──────────────────────────────────────────────────────────
     BUSINESS LOGIC HELPERS
     ────────────────────────────────────────────────────────── */
  calculateInventoryClosing(vegId, grade) {
    const inv = this.getInventoryByVegetable(vegId, grade);
    if (!inv) return 0;
    return inv.opening + inv.purchased - inv.sold - inv.damaged - inv.wastage;
  },

  getTodayDashboardStats() {
    const today = new Date().toISOString().split('T')[0];
    const todayPurchases = this._purchases.filter(p => p.date === today);
    const todayOrders    = this._orders.filter(o => o.orderDate === today);
    const pendingOrders  = this._orders.filter(o => ['pending','confirmed','preparing','stockAllocated','loading'].includes(o.status));
    const todayExpenses  = this._expenses.filter(e => e.date === today);

    const purchaseTotal  = todayPurchases.reduce((s, p) => s + p.total, 0);
    const salesTotal     = todayOrders.reduce((s, o) => s + o.total, 0);
    const expenseTotal   = todayExpenses.reduce((s, e) => s + e.amount, 0);

    // 7-day sales trend
    const salesTrend = [];
    for (let i = 6; i >= 0; i--) {
      const d = new Date(); d.setDate(d.getDate() - i);
      const ds = d.toISOString().split('T')[0];
      const dayOrders = this._orders.filter(o => o.orderDate === ds);
      const dayPurchases = this._purchases.filter(p => p.date === ds);
      salesTrend.push({
        date: ds,
        sales: dayOrders.reduce((s, o) => s + o.total, 0),
        purchases: dayPurchases.reduce((s, p) => s + p.total, 0),
      });
    }

    return {
      todaySales:    salesTotal,
      todayPurchases: purchaseTotal,
      grossProfit:   salesTotal - purchaseTotal - expenseTotal,
      pendingOrders: pendingOrders.length,
      activeVendors: this._vendors.length,
      totalFarmers:  this._farmers.length,
      stockValue:    this._inventory.reduce((s, i) => {
        const veg = this.getVegetableById(i.vegId);
        return s + (veg ? i.closing * veg.currentSellPrice : 0);
      }, 0),
      labourCostToday: todayExpenses.filter(e => e.category === 'Labour').reduce((s, e) => s + e.amount, 0),
      salesTrend,
    };
  },

  getFarmerStats(farmerId) {
    const purchases = this._purchases.filter(p => p.farmerId === farmerId);
    const payments  = this._payments.filter(p => p.partyId === farmerId && p.partyType === 'farmer');
    const totalSupply = purchases.reduce((s, p) => s + p.total, 0);
    const totalPaid   = payments.reduce((s, p) => s + p.amount, 0);
    const pending     = totalSupply - totalPaid;
    const now = new Date();
    const monthStart = `${now.getFullYear()}-${String(now.getMonth()+1).padStart(2,'0')}`;
    const thisMonth  = purchases.filter(p => p.date.startsWith(monthStart)).reduce((s, p) => s + p.total, 0);
    const totalQty   = purchases.reduce((s, p) => s + p.qty, 0);
    return { totalSupplyValue: totalSupply, thisMonth, pendingPayment: pending, totalQuantity: totalQty, purchaseCount: purchases.length };
  },

  getVendorStats(vendorId) {
    const orders     = this._orders.filter(o => o.vendorId === vendorId);
    const payments   = this._payments.filter(p => p.partyId === vendorId && p.partyType === 'vendor');
    const totalOrders = orders.reduce((s, o) => s + o.total, 0);
    const totalPaid   = payments.reduce((s, p) => s + p.amount, 0);
    const today       = new Date().toISOString().split('T')[0];
    const todayOrders = orders.filter(o => o.orderDate === today).length;
    const pendingOrders = orders.filter(o => ['pending','confirmed','preparing'].includes(o.status)).length;
    return {
      todayOrders,
      pendingOrders,
      totalPurchases: totalOrders,
      outstanding: totalOrders - totalPaid,
    };
  },

  getLabourStats(labourId) {
    const worker     = this._labour.find(l => l.id === labourId);
    if (!worker) return {};
    const attendance = this._attendance.filter(a => a.labourId === labourId);
    const presentDays = attendance.filter(a => a.status === 'present').length;
    const halfDays    = attendance.filter(a => a.status === 'halfDay').length;
    const otHours     = attendance.filter(a => a.status === 'overtime').reduce((s, a) => s + (a.overtimeHours || 0), 0);
    const totalEarnings = (presentDays * worker.dailyWage) + (halfDays * worker.dailyWage * 0.5) + (otHours * 100);
    const now = new Date();
    const monthStart = `${now.getFullYear()}-${String(now.getMonth()+1).padStart(2,'0')}`;
    const monthAttendance = attendance.filter(a => a.date.startsWith(monthStart));
    const monthPresent    = monthAttendance.filter(a => a.status === 'present').length;
    const monthHalf       = monthAttendance.filter(a => a.status === 'halfDay').length;
    const monthEarnings   = (monthPresent * worker.dailyWage) + (monthHalf * worker.dailyWage * 0.5);
    return {
      dailyWage: worker.dailyWage,
      thisMonthEarnings: monthEarnings,
      pendingPayment: monthEarnings * 0.3, // demo: 30% outstanding
      totalEarnings,
    };
  },

  getManagerStats() {
    const today = new Date().toISOString().split('T')[0];
    const todayArrivals    = this._arrivals.filter(a => a.arrivalDate === today);
    const pendingWeighment = this._weighments.filter(w => w.netWt === 0).length;
    const ordersInProgress = this._orders.filter(o => ['confirmed','preparing','stockAllocated','loading'].includes(o.status)).length;
    const todayAttendance  = this._attendance.filter(a => a.date === today && a.status === 'present');
    const pendingDispatches= this._dispatches.filter(d => ['loading','dispatched','inTransit'].includes(d.status)).length;
    const todayPurchases   = this._purchases.filter(p => p.date === today).reduce((s, p) => s + p.total, 0);
    return {
      todayArrivals:    todayArrivals.length,
      pendingWeighment,
      ordersInProgress,
      labourPresent:    todayAttendance.length,
      todayPurchases,
      pendingDispatches,
    };
  },

  /* ──────────────────────────────────────────────────────────
     RESET — wipe localStorage and re-seed (dev utility)
     ────────────────────────────────────────────────────────── */
  reset() {
    const stores = [
      '_users','_farmers','_vendors','_vegetables','_purchases','_arrivals',
      '_weighments','_qualityChecks','_inventory','_orders','_orderItems',
      '_labour','_attendance','_vehicles','_dispatches','_payments',
      '_ledgerEntries','_expenses','_prices','_loadingRecords','_returns'
    ];
    stores.forEach(store => localStorage.removeItem(`golis_${store}`));
    this.init();
  },
};
