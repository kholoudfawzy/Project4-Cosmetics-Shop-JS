let userInfo = document.querySelector ("#user_info")
let userD = document.querySelector ("#user")
let links = document.querySelector ("#links")

if (localStorage.getItem("fristname")){
    links.remove()
    userInfo.style.display = "flex"
    userD.innerHTML = localStorage.getItem("fristname") + " " + localStorage.getItem("lastname")
}
let logOutBtn = document.querySelector("#logout")
if (logOutBtn) {
    logOutBtn.addEventListener("click", function(){
        localStorage.clear();
        setTimeout(() => {
            window.location = "login.html";
        } , 1500)
    })
}
