const elements = {
  name: document.querySelector("#name"),
  email: document.querySelector("#email"),
  button: document.querySelector("#miBoton"),
};

const checkFields = () => {
  elements.button.disabled = !elements.name.value || !elements.email.value;
};

elements.email.addEventListener("input", checkFields);
checkFields();

((d) => {
  const [$form, $loader, $response] = d.querySelectorAll(".newsletter-form, .newsletter-form-loader, .newsletter-form-response");
  const showMessage = (message) => {
    $response.innerHTML = message;
    setTimeout(() => {
      $response.innerHTML = "";
    }, 3000);
  };

  $form.addEventListener("submit", (e) => {
    e.preventDefault();
    $loader.classList.remove("loader");
    fetch("https://formsubmit.co/ajax/cislas5294@gmail.com", {
      method: "POST",
      body: new FormData(e.target),
    })
      .then((res) => (res.ok ? res.json() : Promise.reject(res)))
      .then((json) => {
        console.log(json);
        $form.reset();
        showMessage("Gracias! Prometemos no ser tan pesados 😀");
      })
      .catch((err) => {
        console.log(err);
        let message = err.statusText || "Ocurrio un error al enviar, intenta nuevamente";
        showMessage(`Error ${err.status}: ${message}`);
      })
      .finally(() => {
        $loader.classList.add("loader");
        elements.button.disabled = true
      });
  });
})(document);
