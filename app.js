document.addEventListener('DOMContentLoaded', () => {
    const products = [
        { label: 'Dell Latitude 3420 Laptop', price: 80000.00, qtyElement: document.getElementById('qty1') },
        { label: 'HP Dual Speaker Jet Black Laptop', price: 75000.00, qtyElement: document.getElementById('qty2') },
        { label: 'Lenovo IdeaPad Gaming 3', price: 65000.00, qtyElement: document.getElementById('qty3') },
        { label: 'Samsung Galaxy Book3 Pro 360', price: 30000.00, qtyElement: document.getElementById('qty4') },
        { label: 'Acer Aspire 1 A115-31-C2Y3', price: 85000.00, qtyElement: document.getElementById('qty5') },
        { label: '2022 Apple MacBook Pro', price: 146000.00, qtyElement: document.getElementById('qty6') }
    ];

    const carts = document.getElementById("carts");
    const total = document.getElementById("total");
    const cash = document.getElementById("cash");
    const change = document.getElementById("change");

    function addOrder() {
        carts.textContent = "";
        let totalPrice = 0;

        products.forEach(product => {
            const qty = parseFloat(product.qtyElement.value);
            if (!isNaN(qty) && qty > 0) {
                const order = `${qty} pc/s x ${product.label} - Php${(qty * product.price).toFixed(2)}\n`;
                carts.textContent += order;
                totalPrice += qty * product.price;
            }
        });

        total.value = '₱ ' + totalPrice.toFixed(2);
        calculateChange();
    }

    function calculateChange() {
        const totalPrice = parseFloat(total.value.replace('₱ ', ''));
        const cashTendered = parseFloat(cash.value);
        
        if (!isNaN(totalPrice) && !isNaN(cashTendered) && cashTendered >= totalPrice) {
            const changeAmount = cashTendered - totalPrice;
            change.value = '₱ ' + changeAmount.toFixed(2);
        } else {
            change.value = '';
        }
    }

    products.forEach(product => {
        product.qtyElement.addEventListener("keyup", addOrder);
        product.qtyElement.addEventListener("change", addOrder);
    });

    cash.addEventListener("keyup", calculateChange);
    cash.addEventListener("change", calculateChange);
});
