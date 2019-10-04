var funcForGenearateString = require("randomstring");

var name = funcForGenearateString.generate({
  length: 12,
  charset: 'numeric'
});

//console.log(name);

function wrapper (a,b) {
  var c = a + b;
  return new Promise((resolve, reject) => {
    if(c>10) {
      resolve("Uspeshen promis zbirot e nad 10. zbir = " + c);
    }
    reject("Error zbirot vi e = " + c + ", a treba da e nad 10");
  });  
}

async function sum(){
  try {
    var sum = await wrapper(0,5);
    //var result = await wraper2(sum);n
    console.log(sum);
  
  } catch (error) {
    console.log(error);
  }
}

sum();
