let fristName = document.getElementById("fristname")
let lastName = document.getElementById("lastname")
let email = document.getElementById("email")
let password = document.getElementById("password")

let register_btn = document.getElementById("sign_up")

register_btn.addEventListener ("click" , function (e){
    e.preventDefault()
    if (fristName.value ==="" || lastName.value ==="" || email.value ==="" || password.value ===""){
        alert("Please fill all required data")
    } else {
        localStorage.setItem("fristname" , fristName.value);
        localStorage.setItem("lastname" , lastName.value);
        localStorage.setItem("email" , email.value);
        localStorage.setItem("password" , password.value);

        setTimeout ( () => {
            window.location = "login.html"
        } , 1500);
        window.alert("Your account created successfully.")
    }

})