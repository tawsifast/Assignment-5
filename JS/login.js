const signInBtn = document.getElementById("sign-in-btn");

signInBtn.addEventListener("click", function(){
    const userName = document.getElementById("user-name");
    const userNameValue = userName.value;
    console.log(userNameValue);
    const inputPass = document.getElementById("input-pass");
    const inputPassValue = inputPass.value;
    console.log(inputPassValue);

    if(userNameValue == "admin" && inputPassValue == "admin123"){
        alert("Sign Successfull")
    }else{
        alert("Sign in Failed");
        return;
    }

})