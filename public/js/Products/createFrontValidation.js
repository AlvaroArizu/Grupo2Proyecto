document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("form");

  function setValid(input) {
    input.classList.add("is-valid");
    input.classList.remove("is-invalid");
  }

  function setInvalid(input) {
    input.classList.add("is-invalid");
    input.classList.remove("is-valid");
  }

  function validateInput(input) {
    if (input.checkValidity()) {
      setValid(input);
    } else {
      setInvalid(input);
    }
  }

  form.name.addEventListener("input", function () {
    validateInput(form.name);
  });

  form.price.addEventListener("input", function () {
    validateInput(form.price);
  });

  form.description.addEventListener("input", function () {
    validateInput(form.description);
  });

  form.addEventListener("submit", function (event) {
    validateInput(form.name);
    validateInput(form.price);
    validateInput(form.description);

    if (!form.checkValidity()) {
      event.preventDefault();
    }
  });
});
