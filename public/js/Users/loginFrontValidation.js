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

  form.email.addEventListener("input", function () {
    validateInput(form.email);
  });

  form.password.addEventListener("input", function () {
    validateInput(form.password);
  });

  form.addEventListener("submit", function (event) {
    validateInput(form.email);
    validateInput(form.password);

    if (!form.checkValidity()) {
      event.preventDefault();
    }
  });
});
