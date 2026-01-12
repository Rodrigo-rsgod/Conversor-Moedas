const convertButton = document.querySelector(".convert-button");
const currencySelect = document.querySelector(".currency-select");

async function convertValues() {
  const inputCurrencyValue =
    document.querySelector(".input-currency").value;

  const currencyValueToConvert =
    document.querySelector(".currency-value-to-convert");

  const currencyValueConverted =
    document.querySelector(".currency-value");

  const data = await fetch("https://economia.awesomeapi.com.br/last/USD-BRL,EUR-BRL,GBP-BRL,BTC-BRL"
  ).then((response) => response.json());

  const dolarToday = data.USDBRL.bid;
  const euroToday = data.EURBRL.bid;
  const libraToday = 7.3;
  const bitcoinToday = 606882;

  // Valor em REAL
  currencyValueToConvert.innerHTML = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(inputCurrencyValue);

  // Conversões
  if (currencySelect.value === "dolar") {
    currencyValueConverted.innerHTML =
      new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(inputCurrencyValue / dolarToday);
  }

  if (currencySelect.value === "euro") {
    currencyValueConverted.innerHTML =
      new Intl.NumberFormat("de-DE", {
        style: "currency",
        currency: "EUR",
      }).format(inputCurrencyValue / euroToday);
  }

  if (currencySelect.value === "libra") {
    currencyValueConverted.innerHTML =
      new Intl.NumberFormat("en-GB", {
        style: "currency",
        currency: "GBP",
      }).format(inputCurrencyValue / libraToday);
  }

  if (currencySelect.value === "bitcoin") {
    const convertedValue = inputCurrencyValue / bitcoinToday;
    currencyValueConverted.innerHTML =
      `₿ ${convertedValue.toLocaleString("en-US", {
        minimumFractionDigits: 6,
        maximumFractionDigits: 6,
      })}`;
  }
}

// Troca nome e imagem
function changeCurrency() {
  const currencyName = document.getElementById("currency-name");
  const currencyImage = document.querySelector(".currency-img");

  if (currencySelect.value === "dolar") {
    currencyName.innerHTML = "Dólar americano";
    currencyImage.src = "./assets/dollar.png";
  }

  if (currencySelect.value === "euro") {
    currencyName.innerHTML = "Euro";
    currencyImage.src = "./assets/euro.png";
  }

  if (currencySelect.value === "libra") {
    currencyName.innerHTML = "Libra esterlina";
    currencyImage.src = "./assets/libra.png";
  }

  if (currencySelect.value === "bitcoin") {
    currencyName.innerHTML = "Bitcoin";
    currencyImage.src = "./assets/bitcoin.png";
  }

  convertValues();
}

currencySelect.addEventListener("change", changeCurrency);
convertButton.addEventListener("click", convertValues);
