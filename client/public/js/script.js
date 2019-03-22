//Background slider color

var bgc = document.getElementsByClassName("slider-wrapper"),
    label = document.querySelectorAll(".wrapper label");


for (var i = 0; i < label.length; i++) {
    label[i].addEventListener("click",function () {
        var img = this.getAttribute("for");
        var colorImg = document.getElementById(img).dataset.bgc;
        setTimeout(function () {
            bgc[0].style.backgroundColor = colorImg;
        },300);
    });
}

//Auth popover
var button = document.getElementById("auth-popover-button"),
    popover = document.getElementById("auth-popover");

button.addEventListener("mouseover",() => {
    popover.style.display = "inherit";
});
popover.addEventListener("mouseout",() => {
    popover.style.display = "none";
});

//Auth onglet
var btnAuth = document.querySelectorAll(".auth-body-type button");
for (let i = 0; i < btnAuth.length; i++) {
    btnAuth[i].addEventListener("click",function () {
        let authChoice = this.dataset.type;
        let authChoiceDiv = document.getElementsByClassName(authChoice)[0];
        for (let i = 0; i < btnAuth.length; i++) {
            btnAuth[i].classList.remove("clicked");
            let authToHide = btnAuth[i].dataset.type;
            authToHide = document.getElementsByClassName(authToHide)[0];
            authToHide.style.display = "none";
        }
        this.classList.add("clicked");
        authChoiceDiv.style.display = "block";
    });
}

//Input effect

var input = document.getElementsByClassName("effect");
for (let i = 0; i < input.length; i++) {
    input[i].addEventListener("focus",function () {
        console.log(this);
        this.dataset.placeholder = this.getAttribute("placeholder");
        this.setAttribute("placeholder","");
    });
    input[i].addEventListener("focusout",function () {
        var inputSelect = this;
        setTimeout(function () {
            inputSelect.setAttribute("placeholder",inputSelect.dataset.placeholder);
        },130);
    });
}
