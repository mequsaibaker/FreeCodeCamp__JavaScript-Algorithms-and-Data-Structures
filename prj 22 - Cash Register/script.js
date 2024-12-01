const output = document.getElementById("change-due");
const priceText = document.getElementById("price");
const cashInDrawer = document.getElementById("cash-in-drawer");
const purchaseBtn = document.getElementById("purchase-btn");

let price = 1.87;
//cash in the drawer
let cid = [
  ["PENNY", 1.01],
  ["NICKEL", 2.05],
  ["DIME", 3.1],
  ["QUARTER", 4.25],
  ["ONE", 90],
  ["FIVE", 55],
  ["TEN", 20],
  ["TWENTY", 60],
  ["ONE HUNDRED", 100],
];

//coin values
const coins = {
  PENNY: 0.01,
  NICKEL: 0.05,
  DIME: 0.1,
  QUARTER: 0.25,
  ONE: 1,
  FIVE: 5,
  TEN: 10,
  TWENTY: 20,
  "ONE HUNDRED": 100,
};

//change to be given
const change = {
  PENNY: 0,
  NICKEL: 0,
  DIME: 0,
  QUARTER: 0,
  ONE: 0,
  FIVE: 0,
  TEN: 0,
  TWENTY: 0,
  "ONE HUNDRED": 0,
};

const resetChange = () => {
  for (let coin in change) {
    change[coin] = 0;
  }
};

const getTotalCashInDrawer = () => {
  return cid.reduce((sum, el) => (sum += el[1]), 0).toFixed(2);
};

const getTotalChange = () => {
  return Number(
    Object.values(change)
      .reduce((sum, num) => sum + num)
      .toFixed(2)
  );
};

const deductPrice = (amount) => {
  return Number((amount - price).toFixed(2));
};

const calcChange = (amount) => {
  for (let i = cid.length - 1; i >= 0; i--) {
    const coinType = cid[i][0];
    const coinValue = coins[coinType];
    const cashOfType = cid[i][1];
    let coinCount = Math.ceil(cashOfType / coinValue);
    if (amount >= coinValue) {
      const coinCountNeeded = Math.floor(amount / coinValue);
      amount = Number((amount - coinCountNeeded * coinValue).toFixed(2));
      coinCount -= coinCountNeeded;
      if (coinCount >= 0) {
        change[coinType] = Number((coinCountNeeded * coinValue).toFixed(2));
        // cid[i][1] = Number((cid[i][1] - change[coinType]).toFixed(2));
      } else {
        amount = Number((amount + -1 * coinCount * coinValue).toFixed(2));
        change[coinType] = Number(
          ((coinCountNeeded + coinCount) * coinValue).toFixed(2)
        );
        // cid[i][1] = Number((cid[i][1] - change[coinType]).toFixed(2));
      }
    }
  }
};

const displayChange = () => {
  Object.keys(change).forEach((key, ind) => {
    cid[ind][1] = Number((cid[ind][1] - change[key]).toFixed(2));
    output.innerHTML += change[key] > 0 ? `<p>${key}: $${change[key]}</p>` : "";
  });
};

const updateCashInDrawer = () => {
  cashInDrawer.innerHTML = `<p>Change in drawer:</p>`;
  cid.forEach((item) => {
    cashInDrawer.innerHTML += `<p>${item[0]}: $${item[1]}</p>`;
  });
};

const purchase = () => {
  const amount = Number(document.getElementById("cash").value).toFixed(2);
  if (amount) {
    const cashInDrawer = getTotalCashInDrawer();
    if (amount < price) {
      alert("Customer does not have enough money to purchase the item");
    } else if (amount == price) {
      output.textContent = "No change due - customer paid with exact cash";
    } else {
      const changeToReturn = deductPrice(amount);
      calcChange(changeToReturn);
      const totalChange = getTotalChange();
      if (cashInDrawer < changeToReturn || totalChange < changeToReturn) {
        output.innerHTML = `<p>Status: INSUFFICIENT_FUNDS</p>`;
        resetChange();
      } else if (
        cashInDrawer == changeToReturn &&
        totalChange == changeToReturn
      ) {
        output.innerHTML = `<p>Status: CLOSED</p>`;
        displayChange();
        updateCashInDrawer();
        resetChange();
      } else {
        output.innerHTML = `<p>Status: OPEN</p>`;
        displayChange();
        updateCashInDrawer();
        resetChange();
      }
    }
  }
};

priceText.textContent = `Total Price: $${price}`;
updateCashInDrawer();
purchaseBtn.addEventListener("click", () => {
  purchase();
});
