var user = {
    email: ""
}

if(window.localStorage.getItem("user") == null) {
    window.location.href = "../auth"
}else {
    user = JSON.parse(window.localStorage.getItem("user"))
    if(user.email == "") {
        window.location.href = "../auth"
    }
}

if(window.localStorage.getItem("cart") == null) {
    window.location.href = "../products"
}else {
    cart = JSON.parse(window.localStorage.getItem("cart"))
    if(cart.length == 0) {
        window.location.href = "../products"
    }
}

function changeToPurchasedPage() {
    let content  = ''

    content += '<a class="return-button" href="../products/">'
    content += '<i class="icon-left-open"></i><span>VOLTAR</span>'
    content += '</a>'
    content += '<h1 class="purchased">COMPRA FINALIZADA</h1>'
    content += '<h2 class="purchased">Caso queira fazer mais uma compra clique em "VOLTAR".'
    content += '<br>Caso contrário, clique em "SAIR" e volte sempre!</h2>'

    document.querySelector("div.main").innerHTML = content
}

function mountPaymentCart() {
    let totalCart = 0;
    let cartNum = 0;
    
    cart.forEach(product => {
        cartNum += product[1]
    })

    let content = `<h3>Carrinho <span class="price contrast"><i class="icon-basket"></i>${cartNum}</span></h3>`
    document.querySelector("div.container.cart").innerHTML = content
    
    let totalProduct = 0
    cart.forEach(product => {
        totalProduct = product[0].price * product[1]
        totalCart += totalProduct

        content = `<p><span>${product[0].title} (${product[1]})</span> <span class="price">R$${totalProduct}</span></p>`

        document.querySelector("div.container.cart").innerHTML += content
    })
    
    content = '<hr>'
    content += `<p>Total <span class="price contrast">R$${totalCart}</span></p>`
    document.querySelector("div.container.cart").innerHTML += content
}

function paying() {
    let inputs = document.querySelectorAll(".form input")
    let allFilled = true

    let label;
    for(input of inputs) {
        input.className = ""

        label = input.previousElementSibling
        label.className = ""

        if(input.value == "") {
            input.classList.add("error")
            label.classList.add("error")

            if(allFilled) { allFilled = false}
        }
    }

    if(allFilled) {
        window.localStorage.removeItem("cart")

        changeToPurchasedPage()
    }
}

function logout() {
    window.localStorage.removeItem("user")
    window.localStorage.removeItem("cart")
    window.location.href = "../auth"
}

mountPaymentCart()