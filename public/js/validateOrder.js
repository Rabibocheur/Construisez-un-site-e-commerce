(function () {
  const forms = document.querySelector(".needs-validation");

  forms.addEventListener("submit", function (event) {
    if (!forms.checkValidity()) {
      event.preventDefault();
      event.stopPropagation();
      if()
    }


    forms.classList.add("was-validated");
  });
})();
