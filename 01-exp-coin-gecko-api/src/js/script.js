// Select all coin divs
const coins = document.querySelectorAll('.coin');

// Map your coins to CoinGecko IDs
const coinMap = {
    'Bitcoin': 'bitcoin',
    'Ethereum': 'ethereum',
    'Dogecoin': 'dogecoin'
};

// Fetch CoinGecko data for these coins copy and paste
fetch('')
    .then(res => res.json())
    .then(data => {
        coins.forEach(coinDiv => {
            const name = coinDiv.querySelector('.coin-name').textContent;
            const coinData = data.find(c => c.id === coinMap[name]);
            if (coinData) {
                coinDiv.querySelector('.coin-price').textContent = `$${coinData.current_price.toFixed(4)}`;
            }
        });
    })
    .catch(err => console.error('Error fetching coins:', err));
//  https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=bitcoin,ethereum,dogecoin&order=market_cap_desc&per_page=10&page=1&sparkline=false