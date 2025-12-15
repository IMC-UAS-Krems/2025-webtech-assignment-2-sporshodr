
var cart = [];


var buttons = document.getElementsByClassName("add-to-cart");
for (var i = 0; i < buttons.length; i++) {
buttons[i].addEventListener("click", function () {
    var name = this.getAttribute("data-name");
    var price = parseFloat(this.getAttribute("data-price"));
    addToCart(name, price);
});
}


function addToCart(name, price) {
var existingItem = cart.find(function (item) {
    return item.name === name;
});

if (existingItem) {
    existingItem.quantity++;
    existingItem.total = existingItem.quantity * price;
} else {
    cart.push({ name: name, quantity: 1, price: price, total: price });
}
updateCartDisplay();
}

function updateCartDisplay() {
var tableBody = document.getElementById("cartTableBody");
tableBody.innerHTML = "";

var totalNetto = 0;
var totalItems = 0;
var discount = 0;
var totalTax = 0;
var totalBrutto = 0;

cart.forEach(function (item) {
    totalNetto += item.total;
    totalItems += item.quantity;

    var row = document.createElement("tr");
    row.innerHTML =
    "<td>" +
    item.name +
    "</td>" +
    "<td>" +
    item.quantity +
    "</td>" +
    "<td>" +
    item.price.toFixed(2) +
    "</td>" +
    "<td>" +
    item.total.toFixed(2) +
    "</td>";
    tableBody.appendChild(row);

    

});

if (totalItems >=3){
        discount = totalNetto * 0.10;
    }

var discountedNetto = totalNetto - discount;
totalTax = discountedNetto * 0.2;
totalBrutto = discountedNetto + totalTax;

document.getElementById("totalNetto").innerText = totalNetto.toFixed(2);
document.getElementById("totalTax").innerText = totalTax.toFixed(2);
document.getElementById("totalBrutto").innerText = totalBrutto.toFixed(2);
document.getElementById("discountAmount").innerText = discount.toFixed(2);
}


function submitCheckout() {
const form = document.getElementById("checkoutForm");
if (form.checkValidity()) {
    form.reset();
    const checkoutModal = bootstrap.Modal.getInstance(document.getElementById("checkoutModal"));
    checkoutModal.hide();
    const offcanvasElement = document.getElementById("offcanvasCart");
    const offcanvasInstance = bootstrap.Offcanvas.getInstance(offcanvasElement);
    if (offcanvasInstance) {
      offcanvasInstance.hide();
    }
    document.getElementById("confirmTotal").innerText = document.getElementById("totalBrutto").innerText;

    document.getElementById("confirmationMessage").classList.remove("d-none");
} else {
    alert("Please fill out all required fields.");
}
}
