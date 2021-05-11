let getItems = JSON.parse(localStorage.getItem("items"));

order();
total();

function getTotal () {
    return new Promise((r) => r(getItems)) 
  }

async function total() {
  let response = await getTotal();
  let totaux = 0;
  for (let i in response) {
    totaux += parseInt(response[i].total, 10);
    document.querySelectorAll(".total")[i].textContent = response[i].total + "€";
    document.getElementById("total_order").textContent = totaux + "€";
  }
}

function order() {
  for (let i in getItems) {
  let index = parseInt(i, 10) + 1; 
  document.getElementById("table_order").innerHTML += `
  <tr>
    <th scope="row">${index}</th>
    <td>${getItems[i].name}</td>
    <td>${getItems[i].color}</td>
    <td>
      <input type="number" min="1" step="1" value="${
        getItems[i].quantity
      }" id="${i}" class="form-control" style="max-width: 200px">
    </td>
    <td>${getItems[i].price}€</td>
    <td class="total">
      ${getItems[i].total}€
    </td>
  </tr>
  `;
}

document.querySelectorAll("input").forEach(qte => {
    qte.addEventListener("keyup", (e) => {
      if(e.currentTarget.value === "0")
        e.currentTarget.value = "1";
      let id = e.currentTarget.id;
      getItems[id].quantity = e.currentTarget.value;
      getItems[id].total = getItems[id].quantity * getItems[id].price;
      localStorage.setItem("items", JSON.stringify(getItems));
      total();
    });
  }); 
}
