const form = document.querySelector(".needs-validation");

(() => {
  const inputs = form.querySelectorAll("input");

  inputs.forEach((input) => {
    input.addEventListener("keyup", () => formValidation(input));
    input.addEventListener("change", () => formValidation(input));
  });

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    for (let input of inputs) {
      if (formValidation(input) == false) {
        throw "validation invalid";
      }
    }
    orderValidation();
  });
})();

function formValidation(input) {
  let regexp;
  let validInput;

  if (input.name == "firstName" || input.name == "lastName") {
    regexp = /^[A-Za-z-]{2,}$/;
  }
  if (input.name == "email") {
    regexp =
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  }
  if (input.name == "address") {
    regexp = /^[0-9]{1,3}[ ]+[a-zA-Z- ]+[ ]+[a-zA-Z- ]+$/;
  }
  if (input.name == "city") {
    regexp = /^[a-zA-Z0-9- ]{2,}$/;
  }
  if (input.name == "zip") {
    regexp = /^[0-9]{5}$/;
  }

  if (input.name == "terms") {
    validInput = inputValidation(input);
  } else {
    validInput = inputValidation(input, regexp);
  }

  if (validInput) {
    input.classList.remove("is-invalid");
    input.classList.add("is-valid");
  } else {
    input.classList.remove("is-valid");
    input.classList.add("is-invalid");
  }

  return validInput;
}

function inputValidation(inputName, regexp) {
  let isValid = false;

  if (inputName.name == "terms") {
    if (inputName.checked === true) isValid = true;
  } else {
    if (regexp.test(inputName.value)) isValid = true;
  }

  return isValid;
}

function orderValidation() {
  const products = JSON.parse(localStorage.getItem("items"));

  if (products != null && products.length > 0) {
    const product_id = products.map((product) => {
      return product.id;
    });

    const order = {
      contact: {
        firstName: form.firstName.value,
        lastName: form.lastName.value,
        address: form.address.value + " " + form.zip.value,
        city: form.city.value,
        email: form.email.value,
      },
      products: product_id,
    };

    postOrder(order);
  } else {
    document.querySelector(".toast").classList.add("show");
    document
      .querySelector(".btn-close[data-bs-dismiss='toast']")
      .addEventListener("click", function () {
        document.querySelector(".toast").classList.remove("show");
      });
  }
}

async function postOrder(order) {
  const init = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(order),
  };

  await getAPI("order", init)
    .then((response) => {
      localStorage.removeItem("items");
      window.location.href = `${window.location.origin}/validation.html?orderId=${response.orderId}`;
    })
    .catch(() => {
      alert(error);
    });
}
