
function logout() {
    window.localStorage.removeItem("user")
    window.localStorage.removeItem("cart")
    window.location.href = "../auth"
}