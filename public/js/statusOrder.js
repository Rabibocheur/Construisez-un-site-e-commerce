(() => {
  const orderId = new URL(location.href).searchParams.get("orderId");
  document.querySelector(".card-text").textContent = orderId;
})();
