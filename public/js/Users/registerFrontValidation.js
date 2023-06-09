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
  
    form.first_name.addEventListener("input", function () {
      validateInput(form.first_name);
    });
  
    form.last_name.addEventListener("input", function () {
      validateInput(form.last_name);
    });
  
    form.email.addEventListener("input", function () {
      validateInput(form.email);
    });
  
    form.password.addEventListener("input", function () {
      validateInput(form.password);
    });
  
    form.address.addEventListener("input", function () {
      validateInput(form.address);
    });
  
    form.addEventListener("submit", function (event) {
      validateInput(form.first_name);
      validateInput(form.last_name);
      validateInput(form.email);
      validateInput(form.password);
      validateInput(form.address);
  
      if (!form.checkValidity()) {
        event.preventDefault();
      }
    });
  });
  