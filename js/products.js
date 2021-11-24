var user = {
    email: ""
}
var productList = [
    {
    "id": 0,
    "title": "Anel de Prata",
    "img": "silver_ring.png",
    "price": 350.00,
    },
    {
    "id": 1,
    "title": "Anel de Ouro",
    "img": "golden_rings.png",
    "price": 500.00,
    },
    {
    "id": 2,
    "title": "Anel de Diamante",
    "img": "diamond_ring.png",
    "price": 700.00,
    },
    {
    "id": 3,
    "title": "Anel de Prata",
    "img": "silver.webp",
    "price": 250.00,
    }
]
var cart = []

if(window.localStorage.getItem("cart") == null) {
    window.localStorage.setItem("cart", JSON.stringify(cart))
}else {
    cart = JSON.parse(window.localStorage.getItem("cart"))
}

if(window.localStorage.getItem("productList") == null) {
    window.localStorage.setItem("productList", JSON.stringify(productList))
}else {
    productList = JSON.parse(window.localStorage.getItem("productList"))
}



function updateCartButton() {
    let cartNum = 0;
    
    cart.forEach(product => {
        cartNum += product[1]
    })

    var cartButtonContent = `<span>CARRINHO (${cartNum})</span><i class="icon-basket"></i>`
    document.querySelector(".cart-button").innerHTML = cartButtonContent
}

function mountList() {
    document.querySelector("div.products").innerHTML = ""
    
    productList.forEach(product => {

        let content = ''
        content += '<div class="card">'
        content += '<div class="card-img">'
        content += `<img src="../../img/${product.img}">`
        content += '</div>'
        content += '<div class="card-description">'
        content += `<span>${product.title}</span>`
        content += '</div>'
        content += '<div class="card-price">'
        content += `<span>R$ ${product.price}</span>`
        content += '</div>'
        if(cart.some(cartProduct => cartProduct[0].id == product.id)) {
            content += `<div class="card-button purchased">`
        }else {
            content += `<div class="card-button" onclick="addToCart('${product.id}')">`
        }
        content += '<span>Comprar</span>'
        content += '</div>'
        content += '</div>'

        document.querySelector("div.products").innerHTML += content

        updateCartButton()
    })
}

function addToCart(id) {
    productList.forEach(product => {
        if(product.id == id) {
            cart.push([product, 1])
        }
    })

    window.localStorage.setItem("cart", JSON.stringify(cart))

    mountList()
}

function logout() {
    window.localStorage.removeItem("user")
    window.localStorage.removeItem("cart")
    window.location.href = "../auth"
}

mountList()