document.addEventListener('DOMContentLoaded',function() {
//Change background color
document.getElementById('changecolor').addEventListener('click', function() {document.body.style.backgroundColor = 'blue';});




//Change picture
document.getElementById('changepicture').addEventListener('click', function() {this.src = '../img/elliecomo2.jpeg';});

});