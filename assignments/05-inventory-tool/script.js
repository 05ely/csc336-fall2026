// Emma E.
// Assignment 5

/* test img for easier copy paste
    https://media.licdn.com/dms/image/v2/C4E12AQE7CKkgYRmBoA/article-inline_image-shrink_1500_2232/article-inline_image-shrink_1500_2232/0/1553160482164?e=1792627200&v=beta&t=eARxFx7CArZQpHfbTQRWfbaRRxOuV39ISrBmHUJtn0Q
*/

// products --------------------------------------------------------------------------------------------------------------
let starterProducts = [
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


// (JSON.stringify then JSON.parse quick way to make a copy)
function copyStarterProducts() {
    return JSON.parse(JSON.stringify(starterProducts));
}


let products = copyStarterProducts();
let localStorageKey = "products";


// setup ----------------------------------------------------------------------------------------------------------------

let cart = [];

let currentCategory = "all";
let currentSort = "default";

let controls = document.querySelector("#controls");
let productList = document.querySelector("#productList");
let cartItems = document.querySelector("#cartItems");
let cartTotal = document.querySelector("#cartTotal");
let cartButtons = document.querySelector("#cartButtons");

let productForm = document.querySelector("#productDataForm");
let categoryInputField = document.querySelector("#categoryInputField");
let newCategoryField = document.querySelector("#newCategoryField");
let newCategoryInputField = document.querySelector("#newCategoryInputField");
let formMsg = document.querySelector("#formMsg");
let resetButton = document.querySelector("#resetButton");

let addProductPopup = document.querySelector("#addProductPopup");
let addProductButton = document.querySelector("#addProductButton");
let closeButton = document.querySelector("#closeButton");
let storeMsg = document.querySelector("#storeMsg");


// controls ------------------------------------------------------------------------------------------------------------

let categoryLabel = document.createElement("span");
categoryLabel.innerHTML = "Category: ";
controls.append(categoryLabel);

// catgeories (poulate later)
let categorySelect = document.createElement("select");
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

    // textContent (not innerHTML) now cause owner input
    let nameHeading = document.createElement("h3");
    nameHeading.textContent = product.name;
    cardDiv.append(nameHeading);

    let priceParagraph = document.createElement("p");
    priceParagraph.innerHTML = "$" + product.price.toFixed(2);
    cardDiv.append(priceParagraph);

    // again textContent (not innerHTML) now bc owner input
    let descriptionParagraph = document.createElement("p");
    descriptionParagraph.textContent = product.description;
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
        // textcontent again
        itemParagraph.textContent = item.name + " - $" + item.price.toFixed(2) + " ";

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

// new function for handling categories since owner can put new categories in
function updateCategories() {
    // this portion used to be at the top
    // only thing that rlly changed is prouct.category instead of just category
    let categories = [];
    products.forEach(function(product) {
        if (categories.includes(product.category) === false) {
            categories.push(product.category);
        }
    });

    categorySelect.innerHTML = "";
    categoryInputField.innerHTML = "";

    let allOption = document.createElement("option");
    allOption.value = "all";
    allOption.innerHTML = "all";
    categorySelect.append(allOption);

    let blankOption = document.createElement("option");
    blankOption.value = "";
    blankOption.innerHTML = "Choose a category";
    categoryInputField.append(blankOption);

    categories.forEach(function(category) {
        let filterOption = document.createElement("option");
        filterOption.value = category;
        filterOption.textContent = category;
        categorySelect.append(filterOption);

        let formOption = document.createElement("option");
        formOption.value = category;
        formOption.textContent = category;
        categoryInputField.append(formOption);
    });

    let newCategoryOption = document.createElement("option");
    newCategoryOption.value = "newCategory";
    newCategoryOption.innerHTML = "+ Add new category...";
    categoryInputField.append(newCategoryOption);

    categorySelect.value = currentCategory;
}

// new
function updateNewCategoryField() {
    if (categoryInputField.value === "newCategory") {
        newCategoryField.classList.remove("hidden");
        newCategoryInputField.required = true;
    } else {
        newCategoryField.classList.add("hidden");
        newCategoryInputField.required = false;
        newCategoryInputField.value = "";
    }
}

// new
function saveProducts() {
    // localStorage can only hold strings so JSON.stringify
    let jsonStringProducts = JSON.stringify(products);
    localStorage.setItem(localStorageKey, jsonStringProducts);
}

//new
function showFormMsg(text, type) {
    let msgElement = formMsg;
    if (type === "success") {
        msgElement = storeMsg;
    }
    msgElement.textContent = text;
    msgElement.className = type;
}

// new, opens new product popup
function openProduct() {
    formMsg.textContent = "";
    formMsg.className = "";
    addProductPopup.classList.add("open");
}

// new, closes new product popup
function closeProduct() {
    addProductPopup.classList.remove("open");
    formMsg.textContent = "";
    formMsg.className = "";
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


// new
categoryInputField.addEventListener("change", function() {
    updateNewCategoryField();
});

addProductButton.addEventListener("click", openProduct); // new
closeButton.addEventListener("click", closeProduct); // new

// new, add new prouct
productForm.addEventListener("submit", (event) => {
    event.preventDefault(); // dont reload page on submit

    // FormData takes (name, value) pairs from inputs name attr
    let productFormData = new FormData(productForm);

    // selected isnt a field in the form so it has to be stated here
    let newProduct = { selected: false };
    productFormData.forEach((value, name) => {
        newProduct[name] = value;
    });

    newProduct.price = Number(newProduct.price); // .value is a string, so price should be turned back into a #
    newProduct.name = newProduct.name.trim();
    newProduct.description = newProduct.description.trim();

    if (newProduct.category === "newCategory") {
        newProduct.category = newCategoryInputField.value.trim().toLowerCase();
    }

    if (newProduct.category === "") {
        showFormMsg("Please type a name for the new category.", "error");
        return;
    }

    if (newProduct.category === "all") {
        showFormMsg("\"all\" is already used by the category filter. Please pick a different category name.", "error");
        return;
    }

    // no two products should have same name (ignoring capital letters)
    let matchingProducts = products.filter(function(product) {
        return product.name.toLowerCase() === newProduct.name.toLowerCase();
    });

    if (matchingProducts.length > 0) {
        showFormMsg("There is already a product named \"" + newProduct.name + "\". Please pick a different name.", "error");
        return;
    }


    products.push(newProduct);
    saveProducts();
    currentCategory = "all";
    updateCategories();
    showProducts();
    productForm.reset();
    updateNewCategoryField();
    closeProduct();
    showFormMsg("Added \"" + newProduct.name + "\" to the store!", "success");
});

// new, reset store button
resetButton.addEventListener("click", () => {
    localStorage.removeItem(localStorageKey);
    products = copyStarterProducts();
    cart = [];

    currentCategory = "all";
    updateCategories();

    showProducts();
    showCart();
    updateAddSelectedButton();

    productForm.reset();
    updateNewCategoryField();
    showFormMsg("Store has been reset to the starter products.", "success");
});


// main ------------------------------------------------------------------------------------------------------

// once browser is finished reading entire HTML page, load saved products & draw the page
document.addEventListener("DOMContentLoaded", (event) => {
    // "getItem hands back the saved STRING from localStorage" from 10/9 ex
    let localStorageData = localStorage.getItem(localStorageKey);

    if (localStorageData !== null) {
        // Parse the string back into a real array of product objects
        products = JSON.parse(localStorageData);
        // keep everything unselected upon load/reload
        products.forEach(function(product) {
            product.selected = false;
        });
    }

    updateCategories();
    showProducts();
    showCart();
});