// === GLOBAL VARIABLES ===
// Tiyakin na ang file na ito ay naka-link sa inyong winre-shirt.html bago mag </body>
let selectedSize = ''; 
const productName = "TRIAD WINRE Oversized T-Shirt"; 
const productPrice = "₱750.00 PHP";
// EKSKATONG Facebook Username/Link na natukoy natin
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
    
    // Iwasan na maging negative ang quantity
    quantity += amount;
    if (quantity < 1) {
        quantity = 1; 
    }
    input.value = quantity;
}


// === FUNCTION 3: Ang Smart Buy Button Logic ===
function createOrderLink() {
    const quantity = document.getElementById('quantity-input').value;
    
    // Validation: Tiyakin na pumili ng size
    if (selectedSize === '') {
        alert("Pumili po muna ng SIZE bago mag-order!"); 
        return; 
    }
    
    // Dito ginagamit ang backtick ( ` ) para mabuo ang mensahe kasama ang data
    const message = `Gusto ko pong umorder ng ${productName}. Details: Size ${selectedSize}, Quantity ${quantity}, Price ${productPrice}. Paki-confirm po ng order ko.`;
    
    // Ginagawang URL-friendly ang mensahe
    const encodedMessage = encodeURIComponent(message);
    
    // Dito binubuo ang final link gamit ang buong Facebook URL
    const finalOrderLink = `${messengerLinkBase}?text=${encodedMessage}`;
    
    // I-open ang link
    window.open(finalOrderLink, '_blank');
}
// Function na tatawagin ng BUY IT NOW button
function executeBuyNow() {
    const productName = "TRIAD ORIGINALS - WINRE"; 
    const unitPrice = 750; 
    
    const quantity = document.getElementById('quantity-input').value;
    
    if (selectedSize === '') {
        alert("Pumili po muna ng SIZE bago mag-checkout!"); 
        return false; // HINDI MAG-RE-REDIRECT
    }
    
    const total = unitPrice * parseInt(quantity);
    
    // I-store ang order details
    const orderItem = {
        name: productName,
        size: selectedSize,
        qty: quantity,
        price: unitPrice,
        total: total
    };
    
    localStorage.setItem('orderItem', JSON.stringify(orderItem));
    
    return true; // DITO LANG MAG-RE-REDIRECT ang <a> tag
}
// === FINAL ORDER FUNCTION: Ito ang tinatawag ng Pay button sa checkout.html ===
function saveOrderDetailsOnly() {
    // Kukunin ang item details mula sa LocalStorage
    const order = JSON.parse(localStorage.getItem('orderItem'));
    
    // Kukunin ang Delivery Details mula sa form
    const firstName = document.getElementById('first-name-input').value;
    const lastName = document.getElementById('last-name-input').value;
    const address = document.getElementById('address-input').value;
    const barangay = document.getElementById('barangay-input').value;
    const phone = document.getElementById('phone-input').value;

    // Validation: Tiyakin na pinunan ang mga kritikal na field
    if (!firstName || !address || !phone) {
        alert("Paki-fill up po muna ang First Name, Address, at Phone Number para sa delivery.");
        return;
    }

    // Pagbuo ng Order Message (Gamit ang backticks)
    const message = `FINAL ORDER:\n\nITEM: ${order.name} | Size: ${order.size} | Qty: ${order.qty}\nTOTAL: ₱${order.total}.00 (COD)\n\nDELIVERY DETAILS:\nName: ${firstName} ${lastName}\nAddress: ${address}, ${barangay}\nPhone: ${phone}\nPayment: COD\n\nPaki-confirm po ang order at shipping fee. Salamat!`;
    
    const encodedMessage = encodeURIComponent(message);
    const messengerLink = `https://www.facebook.com/messages/t/janjan.oates?text=${encodedMessage}`;
    
    // I-open ang link at i-clear ang order details
    window.open(messengerLink, '_blank');
    
    // Opsyonal: I-clear ang order para walang duplicate
    localStorage.removeItem('orderItem'); 
    
    // Opsyonal: Maaari niyo itong i-redirect sa "Thank You" page
    // window.location.href = 'index.html'; 
}