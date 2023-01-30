const Factor_Cambio = 1.2;
const acceptedCurrencies = ["Dollars", "Colombian Pesos", "Argentina pesos "];

const changeCurrency = (currency, amount) => {
  return new Promise((resolve, rejet) => {
    if (!acceptedCurrencies.includes(currency)) {
      rejet("Currency not accepted");
    } else if (amount <= 0) {
      rejet("Invalid amount");
    } else {
      resolve(amount / Factor_Cambio);
    }
  });
};



// First instance
const changeDollars = changeCurrency("Dollars", 1000)
  .then((res) => {
    console.log(res);
  })
  .catch((err) => {
    console.log(err);
  });



//Second instance
const changeEuros = changeCurrency("Euros", 1000)
  .then((res) => {
    console.log(res);
  })
  .catch((err) => {
    console.log(err);
  });



//Third instance
const change0 = changeCurrency("Dollars", -100)
  .then((res) => {
    console.log(res);
  })
  .catch((err) => {
    console.log(err);
  });
