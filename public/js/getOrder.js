(() => {
  const products = JSON.parse(localStorage.getItem("items"));
  getOrder(products);
})();

// Création du panier
function getOrder(products) {
  if (products === null || products.length === 0) {
    document.querySelector(".table").innerHTML = `
      <tr class="text-center">
        <td>Votre panier est vide</td>
      </tr>
    `;
  } else {
    showBasket(products);
  }
}

async function showBasket(products) {
  document.getElementById("table_order").innerHTML = "";
  for (let i = 0; i < products.length; i++) {
    let response = await getAPI(products[i].id);
    document.getElementById("table_order").innerHTML += `
      <tr>
        <th scope="row">${i + 1}</th>
        <td><img src="${response.imageUrl}" width="70"/></td>
        <td>${products[i].name}</td>
        <td>${products[i].color}</td>
        <td class="col-3">
          <input type="number" min="1" step="1" value="${
            products[i].quantity
          }" data-index-product="${i}" class="quantity-item form-control" style="max-width: 150px">
        </td>
        <td>${products[i].price / 100}€</td>
        <td class="total-item" data-index-product="${i}">
          ${products[i].total / 100}€
        </td>
        <td class="col-1">
          <a class="delete-item px-3" data-index-product="${i}"><i class="far fa-trash-alt"></i></a>
        </td>
      </tr>
      `;
  }
  refreshTotal(products);
  eventOrder(products);
}

// Calcul du prix total
function refreshTotal(products) {
  let total = 0;
  for (let i in products) total += parseInt(products[i].total, 10) / 100;
  document.getElementById("total_order").textContent = total + "€";
}

// update quantity
function setQuantity(event, products) {
  const id = event.currentTarget.dataset.indexProduct;
  if (event.currentTarget.value === "" || event.currentTarget.value === "0")
    event.currentTarget.value = "1";

  products[id].quantity = event.currentTarget.value;
  products[id].total = products[id].quantity * products[id].price;
  localStorage.setItem("items", JSON.stringify(products));
  showBasket(products);
}

// delete an item
function deleteItem(event, products) {
  products.splice(event.currentTarget.dataset.indexProduct, 1);
  localStorage.setItem("items", JSON.stringify(products));
  getOrder(products);
}

// Groupe d'évènement
function eventOrder(products) {
  for (let i = 0; i < products.length; i++) {
    document
      .querySelectorAll(".quantity-item")
      [i].addEventListener("change", (event) => setQuantity(event, products));
    document
      .querySelectorAll(".delete-item")
      [i].addEventListener("click", (event) => deleteItem(event, products));
  }
}
