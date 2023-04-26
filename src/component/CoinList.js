import { useState, useEffect, useContext } from "react";
import { CoinListData } from "../config/api";
import axios from "axios";
import { cryptoContext } from "../cryptoContext";
import { numberWithCommas } from "../util";
import { NavLink } from "react-router-dom";

const CoinList = () => {
  const { currency, symbol, coinList, setCoinList, fetchCoinList } =
    useContext(cryptoContext);

  useEffect(() => {
    fetchCoinList();
  }, [currency]);

  return (
    <div className="bg-headerBg  py-[25px] text-white font-montserrat">
      <div className="mx-[5%] flex flex-col">
        <p className="font-normal text-[30px] text-center">
          Cryptocurrency Prices by Market Cap
        </p>

        {coinList && (
          <div className="flex py-[15px] mt-[20px] text-[17px] bg-yellow text-black font-semibold">
            <p className="flex-[40%] ml-[15px]">Coin</p>
            <div className="grid grid-cols-1 items-center text-center tablet:grid-cols-3 flex-[60%]">
              <p>Price</p>
              <p className="hidden tablet:block">24H Change</p>
              <p className="hidden tablet:block">Market Cap</p>
            </div>
          </div>
        )}

        {coinList &&
          coinList.map((coin) => (
            <NavLink to={`/coin/${coin.id}`} key={coin.id}>
              <div className="bg-darkBlack" key={coin.id}>
                <div className="flex text-white font-semibold py-[10px]">
                  <div className="flex items-center gap-x-[10px] flex-[40%] ml-[10px]">
                    <img
                      src={coin.image}
                      alt={coin.name}
                      className="h-[60px]"
                    />
                    <div>
                      <p className="font-medium text-[25px] leading-[1]">
                        {coin.symbol.toUpperCase()}
                      </p>
                      <p className="font-medium text-[15px] text-lightGray">
                        {coin.name}
                      </p>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 tablet:grid-cols-3 text-center items-center flex-[60%]">
                    <p>
                      {symbol} {numberWithCommas(coin.current_price)}
                    </p>
                    <p
                      className={`hidden tablet:block text-center ${
                        coin.market_cap_change_percentage_24h > 0
                          ? "text-green"
                          : "text-red"
                      }`}
                    >
                      {coin.market_cap_change_percentage_24h.toFixed(2)}
                    </p>
                    <p className="hidden tablet:block">
                      {symbol}{" "}
                      {numberWithCommas(
                        coin.market_cap.toString().slice(0, -6)
                      )}
                      M
                    </p>
                  </div>
                </div>
                <hr className="border-[0.5px] border-gray" />
              </div>
            </NavLink>
          ))}
      </div>
    </div>
  );
};

export default CoinList;
