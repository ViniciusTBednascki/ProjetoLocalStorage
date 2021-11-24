var user = {
    email: ""
}
var cart = []

if(window.localStorage.getItem("user") == null) {
    window.location.href = "../auth"
}else {
    user = JSON.parse(window.localStorage.getItem("user"))
    if(user.email == "") {
        window.location.href = "../auth"
    }
}

if(window.localStorage.getItem("cart") == null) {
    window.localStorage.setItem("cart", JSON.stringify(cart))
}else {
    cart = JSON.parse(window.localStorage.getItem("cart"))
}

function mountPaymentButton() {
        let content = ''
        content += '<a class="purchase-button" href="../payment/">'
        content += '<span>PAGAMENTO</span>'
        content += '</a>'

        if(document.querySelector(".purchase-button") == null) {
            if(cart.length > 0) {
                document.querySelector(".main").innerHTML += content
            }
        } else {
            if(cart.length == 0) {
                let button = document.querySelector(".purchase-button")
                button.parentElement.removeChild(button)
            }
        }
}

function updatedTotal(total) {
    let content = `<span>TOTAL: R$${total}</span>`

    document.querySelector(".total-price").innerHTML = content
}

function mountCart() {
    document.querySelector("div.products").innerHTML = ""
    let total = 0
    
    cart.forEach((product, index) => {
        total += product[0].price * product[1]

        let content = ''
        content += '<div class="cart-product">'
        content += '<div class="product-img">'
        content += `<img src="../../img/${product[0].img}">`
        content += '</div>'
        content += '<div class="product-description">'
        content += '<div class="product-title">'
        content += `<span>${product[0].title}</span>`
        content += '</div>'
        content += '<div class="product-price">'
        content += `<span>R$ ${product[0].price}</span>`
        content += '</div>'
        content += '</div>'
        content += '<div class="product-control">'
        content += '<div class="quantity">'
        content += `<i class="icon-minus" onclick="increase(${index}, false)"></i>`
        content += '<div class="number">'
        content += `<span>${product[1]}</span>`
        content += '</div>'
        content += `<i class="icon-plus" onclick="increase(${index}, true)"></i>`
        content += '</div>'
        content += `<div class="clear" onclick="clearProduct(${index})">`
        content += '<i class="icon-cancel"></i>'
        content += '</div>'
        content += '</div>'
        content += '</div>'

        document.querySelector("div.products").innerHTML += content
    })

    updatedTotal(total)

    mountPaymentButton()
}

function increase(index, increase) {
    if(increase) {
        cart[index][1]++
    } else {
        if(cart[index][1] > 1) {cart[index][1]--}
    }
    
    window.localStorage.setItem("cart", JSON.stringify(cart))
    mountCart()
}

function clearProduct(index) {
    cart.splice(index, 1)
    
    window.localStorage.setItem("cart", JSON.stringify(cart))
    mountCart()
}

function logout() {
    window.localStorage.removeItem("user")
    window.localStorage.removeItem("cart")
    window.location.href = "../auth"
}

mountCart()