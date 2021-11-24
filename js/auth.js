var users = []
var user = {
    email: ""
}

if(window.localStorage.getItem("user") == null) {
    window.localStorage.setItem("user", JSON.stringify(user))
}else {
    user = JSON.parse(window.localStorage.getItem("user"))
    if(user.email != "") { window.location.href = "../products" }
}

if(window.localStorage.getItem("users") == null) {
    window.localStorage.setItem("users", JSON.stringify(users))
}else {
    users = JSON.parse(window.localStorage.getItem("users"))
}

function login() {
    let inputDivs = document.querySelectorAll(".form .form-input")
    let inputValues = []
    let registredEmail, correctPassword

    let input = ""
    for(inputDiv of inputDivs) {
        inputDiv.className = "form-input"

        input = inputDiv.querySelector("input")
        inputValues.push(input.value)
        input.className = ""

        if(input.value == "") {
            inputDiv.classList.add("error")
            input.classList.add("error")
        }else {
            if(input.placeholder == "Email") {
                registredEmail = users.some(user => user.email == input.value)
                if(registredEmail) {
                    user.email = input.value
                } else {
                    user.email = ""
                    inputDiv.classList.add("error")
                    input.classList.add("error")
                }
            }

            if(input.placeholder == "Senha" && registredEmail) {                
                let registredUser = users.find(registredUser => registredUser.email == user.email)
                if(registredUser.password == input.value) {
                    correctPassword = true
                } else {
                    inputDiv.classList.add("error")
                    input.classList.add("error")
                }
            }            
        }
    }

    if(correctPassword) {
        window.localStorage.setItem("user", JSON.stringify(user))
        window.location.href = "../products"
    }
}