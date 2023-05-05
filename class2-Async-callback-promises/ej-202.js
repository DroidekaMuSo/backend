const EXCHANGE_FACOTR = 1.2;
let currenciesAccepted = ["$", "Soles", "Bolivares", "Pesos"];

//TODO: Try point out the currency

const exchnageCurrency = (currency, amount) => {
  return new Promise((resolve, reject) => {
    if (!currenciesAccepted.includes(currency)) {
      reject("Currency not accepted");
    } else if (amount <= 0) {
      reject("Invalid amount");
    } else {
      resolve(amount / EXCHANGE_FACOTR);
    }
  });
};

const exchangeDollars = exchnageCurrency("$", 1000)
  .then((res) => {
    console.log("🚀 ~ file: ej-202.js:19 ~ res:", res);
  })
  .catch((err) => {
    console.log("🚀 ~ file: ej-202.js:23 ~ err:", err);
  });

const exchangeEuros = exchnageCurrency("Eu", 10000)
  .then((res) => {
    console.log(res);
  })
  .catch((err) => {
    console.log(err);
  });

const exchange0 = exchnageCurrency("$", -100)
  .then((res) => console.log(res))
  .catch((err) => console.log(err));
