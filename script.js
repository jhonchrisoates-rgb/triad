// Global Variables (Baguhin ito kung gagawa ng ibang product page)
let selectedSize = ''; 
const productName = "XTIG WINRE Oversized T-Shirt"; 
const productPrice = "₱750.00 PHP";
const messengerID = "janjan.oates"; // Ang inyong FB Username

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
function createOrderLink() {
    const quantity = document.getElementById('quantity-input').value;
    
    // Validation: Tiyakin na pumili ng size
    if (selectedSize === '') {
        alert("Pumili po muna ng SIZE bago mag-order!"); 
        return; 
    }
    
    // Buuin ang order message
    const message = `Gusto ko pong umorder ng ${productName}. Details: Size ${selectedSize}, Quantity ${quantity}, Price ${productPrice}. Paki-confirm po ng order ko.`;
    
    // Gawing URL-friendly ang mensahe
    const encodedMessage = encodeURIComponent(message);

    const messengerLink = `https://m.me/${messengerID}?text=${encodedMessage}`;

    // I-open ang Messenger sa bagong tab
    window.open(messengerLink, '_blank');
}