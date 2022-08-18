import { useEffect, useState } from "react";

function App() {
  const [loading, setLoading] = useState(true);
  const [coins, setCoins] = useState([]);
  const [moneyInWallet, setMoneyInWallet] = useState();
  const [coinPrice, setCoinPrice] = useState(Infinity);
  const [coinSymbol, setCoinSymbol] = useState("");
  const [coinNumberGet, setCoinNumberGet] = useState(0)
  const [written, setWritten] = useState(false)
  

  const onChangeInput = (event) => {
    setMoneyInWallet(event.target.value);
    setWritten(true)
    setCoinPrice(coins[0].quotes.USD.price)
  };

  const onChangeSelect = (event) => {
    const price = coins[event.target.selectedIndex].quotes.USD.price;
    const symbol = coins[event.target.selectedIndex].symbol;
    setCoinPrice(parseFloat(price));
    setCoinSymbol(symbol);
  }

  useEffect(() => {
    setCoinNumberGet(moneyInWallet / coinPrice);
  }, [moneyInWallet, coinPrice]);

  useEffect(() => {
    fetch("https://api.coinpaprika.com/v1/tickers")
      .then((response) => response.json())
      .then((json) => {
        setCoins(json)
        setLoading(false)
      });
  }, []);
  
 

  return (
    <div> 
      <h1>The Coins! {loading ? "" : `(${coins.length})`}</h1>
      {loading? (
        <strong>Loading ...</strong>
      ) : (
      <select onChange={onChangeSelect}>
        {coins.map((coin) => (
          <option key={coin.rank}>
            {coin.name} ({coin.symbol}) : ${coin.quotes.USD.price.toFixed(7)}
          </option>
          ))};
      </select> 
      )}
      <hr />

      <label htmlFor="myMoney">
        {`Money in my Wallet ($) : `}
      </label>
      <input
        type={"number"}
        value={moneyInWallet}
        onChange={onChangeInput}
        id="myMoney"
        placeholder="Dollars you have ? "
      />

      {written ? (
        <h3>
          You can get {coinNumberGet} {coinSymbol} with ${moneyInWallet}
        </h3>
      ) : null
      }

    </div>
  );
};
    
    // <form>  
    //   <input 
    //     type="" 
    //     placeholder = "write the amount of dollars you have"
    //     onChange={onChange}
    //   />
    //   <h1>{dollarInWallet}</h1>
    //    {/* <ul> 
    //      {coins.map((coin) => (
    //        <li>
    //          {coin.name} ({coin.symbol}) : ${coin.quotes.USD.price} 
    //        </li>
    //      ))}
    //    </ul> */}

    // </form>

//   );
    
// }

export default App;


