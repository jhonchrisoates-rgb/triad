// === GLOBAL VARIABLES ===
let selectedSize = ''; 
// Tiyakin na ang inyong FB username ang ginagamit
const messengerLinkBase = "https://www.facebook.com/messages/t/janjan.oates"; 

// FUNCTION 1: Para sa pagpili ng Size
function selectSize(size) {
    selectedSize = size;
    // Visual Feedback: Para magbago ang kulay ng piniling button
    const buttons = document.querySelectorAll('.size-btn');
    buttons.forEach(btn => btn.classList.remove('selected'));
    
    const selectedButton = Array.from(buttons).find(btn => btn.innerText === size);
    if (selectedButton) {
        selectedButton.classList.add('selected');
    }
}

// FUNCTION 2: Para sa Quantity +/-
function changeQuantity(amount) {
    const input = document.getElementById('quantity-input');
    let quantity = parseInt(input.value);
    quantity += amount;
    if (quantity < 1) {
        quantity = 1; 
    }
    input.value = quantity;
}


// === BAGONG FUNCTION: I-save ang order details bago mag-checkout ===
function saveOrderDetails() {
    // Kinukuha ang data mula sa HTML (Tiyakin na tama ito sa bawat Product Page)
    const productName = "XTIG ORIGINALS - WINRE"; 
    const unitPrice = 750; 
    
    const quantity = document.getElementById('quantity-input').value;
    
    if (selectedSize === '') {
        alert("Pumili po muna ng SIZE bago mag-checkout!"); 
        return; 
    }
    
    const total = unitPrice * parseInt(quantity);
    
    // Ini-store ang data sa browser (LocalStorage)
    const orderItem = {
        name: productName,
        size: selectedSize,
        qty: quantity,
        price: unitPrice,
        total: total
    };
    
    // Ini-store ang order details sa browser
    localStorage.setItem('orderItem', JSON.stringify(orderItem));
    
    // Ngayon, ang link sa winre-shirt.html ay awtomatikong magdadala sa checkout.html
    // Dahil ito ay naka-link na sa HTML <a> tag.
}


// === FINAL ORDER FUNCTION: Ito ang tinatawag ng Pay button sa checkout.html ===
function createFinalOrderMessage() {
    // Kukunin ang item details mula sa LocalStorage
    const order = JSON.parse(localStorage.getItem('orderItem'));
    
    // Kukunin ang Delivery Details mula sa form
    const firstName = document.getElementById('first-name-input').value;
    const lastName = document.getElementById('last-name-input').value;
    const address = document.getElementById('address-input').value;
    const barangay = document.getElementById('barangay-input').value;
    const phone = document.getElementById('phone-input').value;

    // Validation
    if (!firstName || !address || !phone) {
        alert("Paki-fill up po muna ang First Name, Address, at Phone Number para sa delivery.");
        return;
    }

    // Pagbuo ng Order Message
    const message = `FINAL ORDER:\n\nITEM: ${order.name} | Size: ${order.size} | Qty: ${order.qty}\nTOTAL: ₱${order.total}.00 (COD)\n\nDELIVERY DETAILS:\nName: ${firstName} ${lastName}\nAddress: ${address}, ${barangay}\nPhone: ${phone}\n\nPaki-confirm po ang order. Salamat!`;
    
    const encodedMessage = encodeURIComponent(message);
    const finalOrderLink = `${messengerLinkBase}?text=${encodedMessage}`;
    
    // I-open ang link at i-clear ang order details
    window.open(finalOrderLink, '_blank');
    localStorage.removeItem('orderItem'); // Clear ang order pagkatapos ma-send
}