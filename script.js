document.addEventListener("DOMContentLoaded", () => {

    /* =========================
       CART SYSTEM
    ========================= */
    let cart = [];

    const cartIcon = document.querySelector(".cart-icon");
    const cartSidebar = document.querySelector(".cart-sidebar");
    const cartOverlay = document.querySelector(".cart-overlay");
    const closeCart = document.querySelector(".close-cart");
    const cartItemsContainer = document.querySelector(".cart-items");

    /* =========================
       SIDEBAR OPEN / CLOSE
    ========================= */
    cartIcon?.addEventListener("click", () => {
        cartSidebar.classList.add("active");
        cartOverlay.classList.add("active");
    });

    function closeSidebar() {
        cartSidebar.classList.remove("active");
        cartOverlay.classList.remove("active");
    }

    closeCart?.addEventListener("click", closeSidebar);
    cartOverlay?.addEventListener("click", closeSidebar);

    /* =========================
       ADD TO CART
    ========================= */
    document.querySelectorAll(".add-to-cart").forEach(btn => {
        btn.addEventListener("click", () => {

            const name = btn.dataset.name;
            const price = Number(btn.dataset.price);

            const existing = cart.find(item => item.name === name);

            if (existing) {
                existing.qty++;
            } else {
                cart.push({
                    name,
                    price,
                    qty: 1
                });
            }

            renderCart();
        });
    });

    /* =========================
       RENDER CART
    ========================= */
    function renderCart() {
        if (!cartItemsContainer) return;

        cartItemsContainer.innerHTML = "";

        cart.forEach((item, index) => {
            cartItemsContainer.innerHTML += `
                <div class="cart-card">
                    <div class="cart-info">
                        <h3>${item.name}</h3>

                        <div class="quantity-row">
                            <button onclick="decreaseItem(${index})">−</button>
                            <span>${item.qty}</span>
                            <button onclick="increaseItem(${index})">+</button>
                        </div>
                    </div>

                    <div class="cart-right">
                        <h4>Rs ${item.price * item.qty}</h4>

                        <button onclick="removeItem(${index})">
                            <i class="fa-solid fa-trash"></i>
                        </button>
                    </div>
                </div>
            `;
        });

        updateTotal();
    }

    /* =========================
       CART ACTIONS
    ========================= */
    window.removeItem = function(index) {
        cart.splice(index, 1);
        renderCart();
    };

    window.increaseItem = function(index) {
        cart[index].qty++;
        renderCart();
    };

    window.decreaseItem = function(index) {
        if (cart[index].qty > 1) {
            cart[index].qty--;
        } else {
            cart.splice(index, 1);
        }
        renderCart();
    };

    /* =========================
       TOTAL PRICE
    ========================= */
    function updateTotal() {
        const total = cart.reduce((sum, item) => {
            return sum + item.price * item.qty;
        }, 0);

        const totalEl = document.querySelector(".total-row h3");
        if (totalEl) {
            totalEl.textContent = "Rs " + total.toLocaleString();
        }
    }

});