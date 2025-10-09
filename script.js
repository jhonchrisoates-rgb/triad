// Global Variables (Baguhin ito kung gagawa ng ibang product page)
let selectedSize = ''; 
const productName = "TRIAD WINRE Oversized T-Shirt"; 
const productPrice = "₱750.00 PHP";
const messengerID = "janjan.oates"; // Ang inyong FB Username
const messengerLink = `https://m.me/${messengerID}?text=${encodedMessage}`;
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
    
    // Iwasan na maging negative ang quantity at maging 10 ang maximum (Pwede itong baguhin)
    quantity += amount;
    if (quantity < 1) {
        quantity = 1; 
    }
    if (quantity > 10) {
        quantity = 10;
    }
    input.value = quantity;
}

// FUNCTION 3: Ang gagawa ng Messenger Link at magre-redirect
// FUNCTION 3: Ang gagawa ng Messenger Link at magre-redirect
function createOrderLink() {
    // ... (Validation at Quantity code) ...

    const quantity = document.getElementById('quantity-input').value; 
    
    // ... (Validation code) ...
    
    // Ang mensahe na may order details
    const message = `Gusto ko pong umorder ng ${productName}. Details: Size ${selectedSize}, Quantity ${quantity}, Price ${productPrice}. Paki-confirm po ng order ko.`;
    
    const encodedMessage = encodeURIComponent(message);
    
    // BAGUHIN ANG FINAL LINK CONSTRUCTION DITO:
    // Pagsasamahin ang Base link at ang text parameter
    const finalOrderLink = `${messengerLinkBase}?text=${encodedMessage}`;
    
    // I-open ang link
    window.open(finalOrderLink, '_blank');
}