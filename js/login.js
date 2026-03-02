let email = document.getElementById("email")
let password = document.getElementById("password")
let loginBtn = document.getElementById("login")

let getEmail = localStorage.getItem("email")
let getPassword = localStorage.getItem("password")

loginBtn.addEventListener ("click" , function (e){
    e.preventDefault()
    if ( email.value ==="" || password.value ===""){
        alert("Please fill all required data")
    } else {
        if (( getEmail && getEmail.trim() === email.value.trim() && getPassword === password.value))
            {
                setTimeout(() => {
                    window.location= "index.html"
                }, 1500);
        } else {
            alert("Email or Password is wrong")
        }
    }
})