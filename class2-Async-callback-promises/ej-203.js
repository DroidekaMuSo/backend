const EXCHANGE_FACTOR = 1.2;
let currenciesAccepted = ["$", "soles", "euros", "pounds"];

const exchnageCurrency = (currency, amount) => {
  return new Promise((resolve, reject) => {
    if (!currenciesAccepted.includes(currency)) {
      reject("Currency not accepted");
    } else {
      resolve(Math.round(amount / EXCHANGE_FACTOR));
    }
  });
};

const doAsyncExchange = async () => {
  try {
    const exchangeDollars = await exchnageCurrency("$", 1000);
    console.log(
      "🚀 ~ file: ej-203.js:16 ~ doAsyncExchange ~ exchangeDollars:",
      exchangeDollars
    );

    const exchangeEuros = await exchnageCurrency("pounds", 20_000);
    console.log(
      "🚀 ~ file: ej-203.js:23 ~ doAsyncExchange ~ exchangeEuros:",
      exchangeEuros
    );
  } catch (error) {
    console.log("🚀 ~ file: ej-203.js:18 ~ doAsyncExchange ~ error:", error);
  }
};

doAsyncExchange();
