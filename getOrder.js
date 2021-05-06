function getOrder() {
  let getItems = JSON.parse(localStorage.getItem("items"));
  const tableOrder = document.getElementById("table_order");

  for (let i = 0; i < getItems.length; i++) {
    tableOrder.innerHTML += `
    <tr>
      <th scope="row">${i + 1}</th>
      <td>${getItems[i].nom}</td>
      <td>
        <input type="number" value="${
          getItems[i].quantite
        }" id="quantity" class="form-control w-50">
      </td>
      <td>${getItems[i].prix}€</td>
      <td>${getItems[i].total}€</td>
    </tr>
    `;

    document.querySelectorAll("#quantity")[i].addEventListener("change", () => {
      getItems[i].quantite = document.querySelectorAll("#quantity")[i].value;
      getItems[i].total = getItems[i].quantite * getItems[i].prix;
      localStorage.setItem("items", JSON.stringify(getItems));
    });
  }
}
getOrder();
