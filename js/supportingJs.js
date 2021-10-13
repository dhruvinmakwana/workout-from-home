function checkPass(){
    var pass = document.getElementById('psw').value;
    var rptPass = document.getElementById('psw-repeat').value;
    if(pass != rptPass){
        alert("Passwords do not match");
        return false;
    }
}