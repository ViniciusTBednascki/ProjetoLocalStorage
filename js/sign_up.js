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

function sign_up() {
    let inputDivs = document.querySelectorAll(".form .form-input")
    let inputValues = []
    let registredEmail = true, passwordConfirmed = false
    let registerUser = {
        name: "",
        email: "",
        password: ""
    }

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
            switch (input.placeholder) {
                case "Nome":
                    registerUser.name = input.value
                    break;
            
                case "Email":
                    registredEmail = users.some(user => user.email == input.value)

                    if(!registredEmail) {
                        registerUser.email = input.value
                    } else {
                        registerUser.email = ""
                        inputDiv.classList.add("error")
                        input.classList.add("error")
                    }
                    
                    break;
            
                case "Senha":
                    registerUser.password = input.value

                    break;
            
                case "Confirmar Senha":
                    if(registerUser.password == input.value) {
                        passwordConfirmed = true
                    }else {
                        registerUser.password = ""
                        inputDiv.classList.add("error")
                        input.classList.add("error")
                    }
                    break;
            
                default:
                    break;
            }     
        }
    }
    console.log(registerUser)
    if(!registredEmail && passwordConfirmed) {
        users.push(registerUser)
        window.localStorage.setItem("users", JSON.stringify(users))
        window.location.href = "../auth"
    }
}