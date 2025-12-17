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
        alert("No order found.");
        return;
    }

    const firstName = document.getElementById('first-name-input').value.trim();
    const lastName = document.getElementById('last-name-input').value.trim();
    const address = document.getElementById('address-input').value.trim();
    const barangay = document.getElementById('barangay-input').value.trim();
    const phone = document.getElementById('phone-input').value.trim();
    const payment = document.querySelector('input[name="payment"]:checked').value;

    if (!firstName || !address || !phone) {
        alert("Please fill in required fields.");
        return;
    }

    const paymentNote = payment === 'GCash'
        ? 'GCash (Send payment screenshot after confirmation)'
        : 'Cash on Delivery';

    const message =
`FINAL ORDER

ITEM: ${order.name}
Size: ${order.size}
Qty: ${order.qty}

Subtotal: ₱${order.total}.00
Shipping: ₱${order.shipping}.00
TOTAL: ₱${order.grandTotal}.00

DELIVERY DETAILS:
Name: ${firstName} ${lastName}
Address: ${address}, ${barangay}
Phone: ${phone}

Payment Method: ${paymentNote}

Please confirm availability & shipping. Thank you!`;

    window.open(
        `${messengerLinkBase}?text=${encodeURIComponent(message)}`,
        '_blank'
    );

    localStorage.removeItem('orderItem');
}
