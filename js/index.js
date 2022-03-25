window.addEventListener("load", () => {
  //location.reload();
  registerSW();
  console.log("Terminou de carregar.");
});

async function registerSW() {
  if ("serviceWorker" in navigator) {
    await navigator.serviceWorker
      .register("sw.js")
      .then(function (reg) {
        console.log(
          "[PWA Builder] - Service worker foi registrado para escopo: " +
            reg.scope
        );
      })
      .catch(function (error) {
        console.log(
          "[PWA Builder] ativo encontrado, não há necessidade de se registrar" +
            error
        );
      });
  }
}
