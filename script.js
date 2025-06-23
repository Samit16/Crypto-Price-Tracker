async function fetchPrice() {
  const coin = document.getElementById("coinInput").value.trim().toLowerCase();
  const resultBox = document.getElementById("result");

  if (!coin) {
    alert("Please enter a coin name.");
    return;
  }

  const url = `https://api.coingecko.com/api/v3/simple/price?ids=${coin}&vs_currencies=inr,usd&include_24hr_change=true`;

  try {
    const res = await fetch(url);
    const data = await res.json();

    if (!data[coin]) {
      resultBox.innerHTML = `<p>Coin not found. Try 'bitcoin' or 'ethereum'.</p>`;
    } else {
      const priceInINR = data[coin].inr;
      const priceInUSD = data[coin].usd;
      const change = data[coin].usd_24h_change.toFixed(2);
      const changeColor = change >= 0 ? 'limegreen' : 'red';

      resultBox.innerHTML = `
        <p><span>Coin:</span> ${coin}</p>
        <p><span>Price (INR):</span> ₹${priceInINR}</p>
        <p><span>Price (USD):</span> $${priceInUSD}</p>
        <p><span>24h Change:</span> <span style="color: ${changeColor}">${change}%</span></p>
      `;
    }

    resultBox.style.display = 'block';
  } catch (err) {
    resultBox.innerHTML = `<p>Error fetching data. Try again later.</p>`;
    resultBox.style.display = 'block';
    console.error(err);
  }
}
