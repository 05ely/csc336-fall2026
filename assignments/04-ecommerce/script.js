// Emma E.
// Assignment 4

// Products --------------------------------------------------------------------------------------------------------------
let products = [
    {
        name: "Disney Tote Bag",
        price: 30.49,
        description: "Disney World Epcot Tote bag.",
        image: "imgs/epcotTote.jpg",
        category: "bag",
        selected: false
    },
    {
        name: "Doc Marten Mules",
        price: 35.99,
        description: "Black suede vintage Doc Marten mules. Women's size 8.",
        image: "imgs/docMartens.jpg",
        category: "shoe",
        selected: false
    },
    {
        name: "Kate Spade Purse",
        price: 78.99,
        description: "Purple, all-leather crossbody, with two interior pockets and zipper close.",
        image: "imgs/kateSpadePurse.jpg",
        category: "bag",
        selected: false
    },
    {
        name: "Lego Hamster Set",
        price: 12.99,
        description: "Lego-Creator hamster, 166 pieces.",
        image: "imgs/legoHamster.jpg",
        category: "toy",
        selected: false
    },
    {
        name: "Bliss Tubing Mascara",
        price: 16.59,
        description: "Brown tubing mascara.",
        image: "imgs/blissMascara.jpg",
        category: "makeup",
        selected: false
    },
    {
        name: "Henckels Knife Set",
        price: 179.99,
        description: "Henckels Knife Set with storage block, twelve-piece.",
        image: "imgs/knifeSet.jpg",
        category: "home",
        selected: false
    },
    {
        name: "Ikea Lamp",
        price: 44.99,
        description: "STRALA LED floor lamp, matchstick-shaped wood.",
        image: "imgs/lamp.jpg",
        category: "home",
        selected: false
    }
];


// setup ----------------------------------------------------------------------------------------------------------------

let cart = [];

let currentCategory = "all";
let currentSort = "default";

let controls = document.querySelector("#controls");
let productList = document.querySelector("#productList");
let cartItems = document.querySelector("#cartItems");
let cartTotal = document.querySelector("#cartTotal");
let cartButtons = document.querySelector("#cartButtons");


// controls ------------------------------------------------------------------------------------------------------------

let categoryLabel = document.createElement("span");
categoryLabel.innerHTML = "Category: ";
controls.append(categoryLabel);

// categories -- populate dropdown from available products
let allProductCategories = products.map(function(product) {
    return product.category;
});

let categories = ["all"];
allProductCategories.forEach(function(category) {
    if (categories.includes(category) === false) {
        categories.push(category);
    }
});

let categorySelect = document.createElement("select");
categories.forEach(function(category) {
    let option = document.createElement("option");
    option.value = category;
    option.innerHTML = category;
    categorySelect.append(option);
});
controls.append(categorySelect);

// sorting
let sortLabel = document.createElement("span");
sortLabel.innerHTML = " Sort by: ";
controls.append(sortLabel);

let sortSelect = document.createElement("select");
let sortChoices = [
    { value: "default", label: "Default" },
    { value: "priceLow", label: "Price: Low to High" },
    { value: "priceHigh", label: "Price: High to Low" },
    { value: "name", label: "Name: A to Z" }
];
sortChoices.forEach(function(choice) {
    let option = document.createElement("option");
    option.value = choice.value;
    option.innerHTML = choice.label;
    sortSelect.append(option);
});
controls.append(sortSelect);

// selection
let addSelectedButton = document.createElement("button");
addSelectedButton.innerHTML = "Add Selected to Cart";
addSelectedButton.disabled = true;
controls.append(addSelectedButton);

// clear entire cart (technically in cart not in controls but wtv)
// (remove singular item from cart is in functions area below)
let clearCartButton = document.createElement("button");
clearCartButton.innerHTML = "Clear Cart";
clearCartButton.disabled = true;
cartButtons.append(clearCartButton);


// general functions ------------------------------------------------------------------------------------------------------

// build card from products
function addProductToPage(product) {
    let cardDiv = document.createElement("div");
    cardDiv.classList.add("card");

    if (product.selected === true) {
        cardDiv.classList.add("selected");
    }

    if (product.image !== "") {
        let imageElement = document.createElement("img");
        imageElement.src = product.image;
        cardDiv.append(imageElement);
    }

    let nameHeading = document.createElement("h3");
    nameHeading.innerHTML = product.name;
    cardDiv.append(nameHeading);

    let priceParagraph = document.createElement("p");
    priceParagraph.innerHTML = "$" + product.price.toFixed(2);
    cardDiv.append(priceParagraph);

    let descriptionParagraph = document.createElement("p");
    descriptionParagraph.innerHTML = product.description;
    cardDiv.append(descriptionParagraph);

    let checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = product.selected;
    checkbox.addEventListener("change", function() {
        product.selected = checkbox.checked;
        cardDiv.classList.toggle("selected");
        updateAddSelectedButton();
    });
    cardDiv.append(checkbox);

    let checkboxLabel = document.createElement("span");
    checkboxLabel.innerHTML = " Select";
    cardDiv.append(checkboxLabel);

    let addButton = document.createElement("button");
    addButton.innerHTML = "Add to Cart";
    addButton.addEventListener("click", function() {
        cart.push(product);
        showCart();
    });
    cardDiv.append(addButton);

    productList.append(cardDiv);
}

// updates product area
function showProducts() {
    productList.innerHTML = "";

    let visibleProducts = products.filter(function(product) {
        if (currentCategory === "all") {
            return true;
        }
        return product.category === currentCategory;
    });

    if (currentSort === "priceLow") {
        visibleProducts.sort(function(a, b) {
            return a.price - b.price;
        });
    }
    if (currentSort === "priceHigh") {
        visibleProducts.sort(function(a, b) {
            return b.price - a.price;
        });
    }
    if (currentSort === "name") {
        visibleProducts.sort(function(a, b) {
            if (a.name < b.name) {
                return -1;
            }
            if (a.name > b.name) {
                return 1;
            }
            return 0;
        });
    }

    visibleProducts.forEach(addProductToPage);
}

// updates cart area
function showCart() {
    cartItems.innerHTML = "";

    if (cart.length === 0) {
        let emptyParagraph = document.createElement("p");
        emptyParagraph.innerHTML = "Your cart is empty.";
        cartItems.append(emptyParagraph);
    }

    cart.forEach(function(item, index) {
        let itemParagraph = document.createElement("p");
        itemParagraph.innerHTML = item.name + " - $" + item.price.toFixed(2) + " ";

        let removeButton = document.createElement("button");
        removeButton.innerHTML = "Remove";
        removeButton.addEventListener("click", function() {
            removeFromCart(index);
        });
        itemParagraph.append(removeButton);

        cartItems.append(itemParagraph);
    });

    let prices = cart.map(function(item) {
        return item.price;
    });

    let total = 0;
    prices.forEach(function(price) {
        total = total + price;
    });

    let itemWord = "items";
    if (cart.length === 1) {
        itemWord = "item";
    }

    cartTotal.innerHTML = "Total: $" + total.toFixed(2) + " (" + cart.length + " " + itemWord + ")";

    if (cart.length === 0) {
        clearCartButton.disabled = true;
    } else {
        clearCartButton.disabled = false;
    }
}

// empties + updates cart
function clearCart() {
    cart = [];
    showCart();
}

// removes item, then updates cart
function removeFromCart(index) {
    cart.splice(index, 1); // starting at index, remove 1 item
    showCart();
}


// updates selection button
function updateAddSelectedButton() {
    let selectedProducts = products.filter(function(product) {
        return product.selected === true;
    });

    if (selectedProducts.length === 0) {
        addSelectedButton.disabled = true;
        addSelectedButton.innerHTML = "Add Selected to Cart";
    } else {
        addSelectedButton.disabled = false;
        if (selectedProducts.length === 1) {
            addSelectedButton.innerHTML = "Add 1 Item to Cart";
        } else {
            addSelectedButton.innerHTML = "Add " + selectedProducts.length + " Items to Cart";
        }
    }
}


// event listeners  ------------------------------------------------------------------------------------------------------

addSelectedButton.addEventListener("click", function() {
    let selectedProducts = products.filter(function(product) {
        return product.selected === true;
    });

    selectedProducts.forEach(function(product) {
        cart.push(product);
        product.selected = false;
    });

    showCart();
    showProducts();
    updateAddSelectedButton();
});

clearCartButton.addEventListener("click", function() {
    clearCart();
});

categorySelect.addEventListener("change", function() {
    currentCategory = categorySelect.value;
    showProducts();
});

sortSelect.addEventListener("change", function() {
    currentSort = sortSelect.value;
    showProducts();
});


// main ------------------------------------------------------------------------------------------------------

showProducts();
showCart();