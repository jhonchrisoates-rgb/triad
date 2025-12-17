// ============================
// GLOBAL VARIABLES
// ============================
let selectedSize = '';
const messengerLinkBase = "https://m.me/triadclothingph";

// REQUIRED PRODUCT DATA (dapat galing sa HTML)
let productName = window.productName || '';
let productPrice = window.productPrice || 0;


// ============================
// SIZE SELECTION
// ============================
function selectSize(size) {
    selectedSize = size;

    const buttons = document.querySelectorAll('.size-btn');
    buttons.forEach(btn => btn.classList.remove('selected'));

    const activeBtn = Array.from(buttons).find(
        btn => btn.innerText.trim() === size
    );

    if (activeBtn) {
        activeBtn.classList.add('selected');
    }
}


// ============================
// QUANTITY CONTROL
// ============================
function changeQuantity(amount) {
    const input = document.getElementById('quantity-input');
    let quantity = parseInt(input.value, 10) || 1;

    quantity += amount;
    if (quantity < 1) quantity = 1;

    input.value = quantity;
}


// ============================
// SAVE ORDER & REDIRECT
// ============================
function saveOrderAndRedirectToCheckout() {
    const quantity = parseInt(
        document.getElementById('quantity-input').value,
        10
    );

    if (!selectedSize) {
        alert("Pumili po muna ng SIZE bago mag-checkout!");
        return false;
    }

    if (!productName || !productPrice) {
        alert("Product error. Please refresh the page.");
        return false;
    }

    const total = productPrice * quantity;

    const orderItem = {
        name: productName,
        size: selectedSize,
        qty: quantity,
        price: productPrice,
        total: total
    };

    localStorage.setItem('orderItem', JSON.stringify(orderItem));
    return true; // allow redirect
}


// ============================
// FINAL CHECKOUT → MESSENGER
// ============================
function createFinalOrderMessage() {
    const order = JSON.parse(localStorage.getItem('orderItem'));

    if (!order) {
        alert("Walang order na nakita. Bumalik po sa product page.");
        return;
    }

    const firstName = document.getElementById('first-name-input').value.trim();
    const lastName = document.getElementById('last-name-input').value.trim();
    const address = document.getElementById('address-input').value.trim();
    const barangay = document.getElementById('barangay-input').value.trim();
    const phone = document.getElementById('phone-input').value.trim();

    if (!firstName || !address || !phone) {
        alert("Paki-fill up ang First Name, Address, at Phone Number.");
        return;
    }

    const message = 
`FINAL ORDER

ITEM: ${order.name}
Size: ${order.size}
Quantity: ${order.qty}
TOTAL: ₱${order.total}.00 (COD)

DELIVERY DETAILS:
Name: ${firstName} ${lastName}
Address: ${address}, ${barangay}
Phone: ${phone}

Payment: COD

Paki-confirm po ang order at shipping fee. Salamat!`;

    const messengerLink = 
        `${messengerLinkBase}?text=${encodeURIComponent(message)}`;

    window.open(messengerLink, '_blank');
    localStorage.removeItem('orderItem');
}
