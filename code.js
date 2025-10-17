 var title = document.querySelector("h1");
 //title.innerHTML= "This is title from code.js";
 
 //fetch the button from the DOM
 var button =document.querySelector("#CV");
 button.addEventListener("click",myfunction);
 function myfunction(){
    alert("Let me tell you more about me!");
 }
  var button =document.querySelector("#about_me");
 //button.addEventListener("click",myfunction);
 function myfunction(){
    alert("Let me tell you more about me!");
 }



 var mynode =document.createElement("div");
 mynode.id="work1_intro";
 mynode.innerHTML= "The work is exhibition";
 mynode.style.color="blue";
 mynode.addEventListener("click",welcomeToWork1);
 document.querySelector("#my_work1").appendChild(mynode);
 
function welcomeToWork1(){
    alert ("welcome to my work1");
    mynode.innerHTML="Thank you for visiting my work1";
}
 //button.appendChild(mynote); 