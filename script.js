async function convertCurrency() {
    const amount = document.getElementById('amount').value;
    const fromCurrency = document.getElementById('from-currency').value;
    const toCurrency = document.getElementById('to-currency').value;
    const result = document.getElementById('result');
    const convertBtn = document.getElementById('convert-btn');

    if (amount && fromCurrency && toCurrency && !isNaN(amount)) { // Validate if amount is a number
        try {
            const response = await fetch(`https://v6.exchangerate-api.com/v6/3ebe2ccf9eeea2aaef280201/latest/${fromCurrency}`);
            const data = await response.json();

            if (data.result === "success") {
                const rate = data.rates[toCurrency];
                const convertedAmount = (amount * rate).toFixed(2);
                result.innerHTML = `${amount} ${fromCurrency} = ${convertedAmount} ${toCurrency}`;
                convertBtn.style.display = 'none'; // Hide convert button after conversion
            } else {
                result.innerText = "Error: Unable to fetch exchange rates.";
            }
        } catch (error) {
            result.innerText = "Error fetching exchange rates! Please try again later.";
        }
    } else {
        result.innerHTML = ''; // Clear result if input is incomplete or invalid
        convertBtn.style.display = 'block'; // Ensure the convert button is visible
    }
}

function swapCurrencies() {
    const fromCurrency = document.getElementById('from-currency');
    const toCurrency = document.getElementById('to-currency');

    console.log("Swapping currencies...");
    console.log(`From: ${fromCurrency.value}, To: ${toCurrency.value}`);

    const temp = fromCurrency.value;
    fromCurrency.value = toCurrency.value;
    toCurrency.value = temp;

    // Reset result and show button again after swapping
    document.getElementById('result').innerHTML = '';
    document.getElementById('convert-btn').style.display = 'block'; 

    // Automatically convert after swap
    convertCurrency();
}

document.getElementById('amount').addEventListener('input', convertCurrency);
document.getElementById('from-currency').addEventListener('change', () => {
    document.getElementById('convert-btn').style.display = 'block'; // Ensure button shows again
    document.getElementById('result').innerHTML = ''; // Clear result
});

document.getElementById('to-currency').addEventListener('change', () => {
    document.getElementById('convert-btn').style.display = 'block'; // Ensure button shows again
    document.getElementById('result').innerHTML = ''; // Clear result
});
