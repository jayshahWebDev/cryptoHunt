import { BrowserRouter, Routes, Route } from "react-router-dom";
import CoinPage from "./pages/CoinPage";
import ErrorPage from "./pages/ErrorPage";
import HomePage from "./pages/HomePage";
import { cryptoContext } from "./cryptoContext";
import { useState, useEffect } from "react";
import { CoinListData } from "./config/api";
import axios from "axios";
import { ToastContainer } from "react-toastify";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "./pages/FireBase";
import { doc, onSnapshot } from "firebase/firestore";

function App() {
  const [currency, setCurrency] = useState("INR");
  const [symbol, setSymbol] = useState("₹");
  const [coinList, setCoinList] = useState([]);
  const [page, setPage] = useState(1);
  const [user, setUser] = useState(null);
  const [openAuthModel, setOpenAuthModel] = useState(false);
  const [sidebar, setSidebar] = useState(false);
  const [watchList, setWatchList] = useState([]);

  const fetchCoinList = async () => {
    let coinData = await axios.get(CoinListData(currency, page));
    setCoinList(coinData.data);
  };

  useEffect(() => {
    if (currency === "INR") {
      setSymbol("₹");
    } else if (currency === "USD") {
      setSymbol("$");
    }
  }, [currency]);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) setUser(user);
      else setUser(null);
    });
  }, []);

  useEffect(() => {
    if (user) {
      const dbRef = doc(db, "watchList", user.uid);
      var unsubscribe = onSnapshot(dbRef, (coin) => {
        if (coin.exists()) {
          setWatchList(coin.data().coins);
        } else {
          console.log("No Items in Watchlist");
        }
      });

      return () => {
        unsubscribe();
      };
    }
  }, [user]);

  return (
    <cryptoContext.Provider
      value={{
        currency,
        setCurrency,
        symbol,
        coinList,
        setCoinList,
        fetchCoinList,
        page,
        setPage,
        openAuthModel,
        setOpenAuthModel,
        user,
        setUser,
        sidebar,
        setSidebar,
        watchList,
        setWatchList,
      }}
    >
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/coin/:id" element={<CoinPage />} />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </BrowserRouter>
      <ToastContainer />
    </cryptoContext.Provider>
  );
}

export default App;
