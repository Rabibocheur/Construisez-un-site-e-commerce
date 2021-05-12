let getItems = JSON.parse(localStorage.getItem("items"));

getOrder();

async function getOrder() {
  let response = await getItems;
  let total = 0;
  for (let i in response) {
    total += parseInt(response[i].total, 10);
    document.getElementById("total_order").textContent = total + "€";

    document.getElementById("table_order").innerHTML += `
      <tr>
        <th scope="row">${parseInt(i, 10) + 1}</th>
        <td>${response[i].name}</td>
        <td>${response[i].color}</td>
        <td class="col-3">
          <input type="number" min="1" step="1" value="${
            response[i].quantity
          }" id="${i}" class="form-control" style="max-width: 150px">
        </td>
        <td>${response[i].price}€</td>
        <td>
          ${response[i].total}€
        </td>
        <td class="col-1">
        <a class="px-3">Supprimer</a>
        </td>
      </tr>
      `;
  }

  document.querySelectorAll("input").forEach((qte) => {
    qte.addEventListener("keyup", (e) => {
      if (e.currentTarget.value === "0") e.currentTarget.value = "1";
      let id = e.currentTarget.id;
      response[id].quantity = e.currentTarget.value;
      response[id].total = response[id].quantity * response[id].price;
      localStorage.setItem("items", JSON.stringify(response));
    });
  });
}
