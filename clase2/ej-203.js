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

const doAsyncChange = async () => {
  const changeDollars = await changeCurrency("Colombian Pesos", 1000);
  console.log(changeDollars);

  try {
    //First Promise
    const changeDollars2 = await changeCurrency("Chile Pesos", 2000);
    console.log(changeDollars2);

    //Second Promise
    const changeEuros = await changeCurrency("Argentina Pesos", 2000);
    console.log(changeEuros);
  } catch (error) {
    console.log(error);
  }

  console.log("Out of catch");
};

doAsyncChange();
