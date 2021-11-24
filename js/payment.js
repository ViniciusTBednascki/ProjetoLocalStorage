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
        console.log("Foi")
    }
}

function logout() {
    window.localStorage.removeItem("user")
    window.localStorage.removeItem("cart")
    window.location.href = "../auth"
}