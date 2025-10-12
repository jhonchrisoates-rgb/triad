// === GLOBAL VARIABLES ===
let selectedSize = ''; 
const productName = "TRIAD WINRE Oversized T-Shirt"; 
const productPrice = 750; // Ginawa nating number para sa computation
const messengerLinkBase = "https://m.me/janjan.oates"; 

// === FUNCTION 1: Para sa pagpili ng Size ===
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

// === FUNCTION 2: Para sa Quantity +/- ===
function changeQuantity(amount) {
    const input = document.getElementById('quantity-input');
    let quantity = parseInt(input.value);
    
    quantity += amount;
    if (quantity < 1) {
        quantity = 1; 
    }
    input.value = quantity;
}


// === CORE LOGIC: SAVE AND REDIRECT (Tinatawag ng BUY IT NOW sa winre-shirt.html) ===
function saveOrderAndRedirectToCheckout() {
    const quantity = document.getElementById('quantity-input').value;
    
    if (selectedSize === '') {
        alert("Pumili po muna ng SIZE bago mag-checkout!"); 
        return false; // HINDI MAGRE-REDIRECT
    }
    
    const total = productPrice * parseInt(quantity);
    
    // I-store ang order details sa browser (LOCAL STORAGE)
    const orderItem = {
        name: productName,
        size: selectedSize,
        qty: quantity,
        price: productPrice,
        total: total
    };
    
    localStorage.setItem('orderItem', JSON.stringify(orderItem));
    
    // Ipagpapatuloy ang redirect sa checkout.html dahil nasa <a> tag na ang href
    return true; 
}


// === FINAL CHECKOUT LOGIC: Magse-send ng Order sa Messenger (Tinatawag ng Pay button sa checkout.html) ===
function createFinalOrderMessage() {
    // 1. Kukunin ang item details mula sa LocalStorage
    const order = JSON.parse(localStorage.getItem('orderItem'));
    
    // 2. Kukunin ang Delivery Details mula sa form
    const firstName = document.getElementById('first-name-input').value;
    const lastName = document.getElementById('last-name-input').value;
    const address = document.getElementById('address-input').value;
    const barangay = document.getElementById('barangay-input').value;
    const phone = document.getElementById('phone-input').value;

    // 3. Validation: Tiyakin na pinunan ang mga kritikal na field
    if (!firstName || !address || !phone) {
        alert("Paki-fill up po muna ang First Name, Address, at Phone Number para sa delivery.");
        return;
    }

    // 4. Pagbuo ng Order Message
    const message = `FINAL ORDER:\n\nITEM: ${order.name} | Size: ${order.size} | Qty: ${order.qty}\nTOTAL: ₱${order.total}.00 (COD)\n\nDELIVERY DETAILS:\nName: ${firstName} ${lastName}\nAddress: ${address}, ${barangay}\nPhone: ${phone}\nPayment: COD\n\nPaki-confirm po ang order at shipping fee. Salamat!`;
    
    const encodedMessage = encodeURIComponent(message);
    const messengerLink = `${messengerLinkBase}?text=${encodedMessage}`;
    
    // 5. I-open ang link at i-clear ang order details
    window.open(messengerLink, '_blank');
    localStorage.removeItem('orderItem'); 
}