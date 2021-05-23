const form = document.querySelector(".needs-validation");

(function () {
  const inputs = form.querySelectorAll("input");
  let inputAllValidation = [];

  inputs.forEach(input => {
    input
      .addEventListener('keyup', () => formValidation(input));
    input
      .addEventListener('change', () => formValidation(input));
  });

  form.addEventListener('submit', (e) => {
    for(let i in inputs){
      inputAllValidation[i] = formValidation(inputs[i]);
      if(inputAllValidation[i] == false){
        e.preventDefault();
        e.stopPropagation();
      }
    }
    orderValidation();
  });
     orderValidation();
})();

const formValidation = (input) => {
  let regexp;
  let validInput;

  if(input.name == "firstName" || input.name == "lastName"){
    regexp = /^[A-Za-z-]{2,}$/;
  }
  if(input.name == "email"){
    regexp = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  }
  if(input.name == "address"){
    regexp = /^[0-9]{1,3}[ ]+[a-zA-Z- ]+[ ]+[a-zA-Z- ]+$/;
  }
  if(input.name == "city"){
    regexp = /^[a-zA-Z0-9- ]{2,}$/; 
  }
  if(input.name == "zip"){
    regexp = /^[0-9]{5}$/;
  }

  if(input.name == "terms"){
    validInput = inputValidation(input);
  }else{
    validInput = inputValidation(input, regexp);
  }

  if(validInput){
    input.classList.remove("is-invalid");
    input.classList.add("is-valid");
  }else{
    input.classList.remove("is-valid");
    input.classList.add("is-invalid");
  }
  
  return validInput;
}

const inputValidation = (inputName, regexp) => {
  let isValid = false;

  if(inputName.name == "terms"){
    if(inputName.checked === true)
      isValid = true;
  }else{
    if(regexp.test(inputName.value))
      isValid = true;
  }

  return isValid;
}

async function orderValidation() {
  const product = JSON.parse(localStorage.getItem("items"));

  const products = Object.values(product).map((product) => {
    return product.id;
  })

  const order = {
    contact: {
      firstName: form.firstName.value,
      lastName: form.lastName.value,
      address: form.address.value + ' ' + form.zip.value,
      city: form.city.value,
      email: form.email.value,
    },
    products: products,
  }  

  const response = await fetch("http://localhost:3000/api/teddies/order", {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(order)
  });
  console.log(await response.json());
}