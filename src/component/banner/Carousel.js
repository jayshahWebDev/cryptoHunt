import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { TrendingCoins } from "../../config/api";
import { cryptoContext } from "../../cryptoContext";
import { NavLink } from "react-router-dom";
import AliceCarousel from "react-alice-carousel";
import { numberWithCommas } from "../../util";

const Carousel = () => {
  const { currency, symbol } = useContext(cryptoContext);
  const [trendingCoins, setTrendingCoins] = useState([]);

  const fetchTrendingCoins = async () => {
    let trendingCoinData = await axios.get(TrendingCoins(currency));
    setTrendingCoins(trendingCoinData.data);
  };

  useEffect(() => {
    fetchTrendingCoins();
  }, [currency]);

  const items = trendingCoins.map((coin) => {
    let percentage = coin.price_change_percentage_24h;

    return (
      <NavLink
        className="flex flex-col items-center uppercase cursor-pointer gap-y-[7px]"
        to={`/coin/${coin.id}`}
      >
        <img src={coin.image} alt={coin.symbol} className="h-[100px]" />

        <div className="flex items-center gap-x-[10px]">
          <p className="text-white font-montserrat">{coin.name}</p>
          <p
            className={`${
              percentage > 0 ? "text-green" : "text-red"
            } font-montserrat`}
          >
            {coin.price_change_percentage_24h.toFixed(2)}%
          </p>
        </div>
        <p className="text-white font-montserrat font-medium text-[25px]">{`${symbol} ${numberWithCommas(
          coin.current_price.toFixed(2)
        )}`}</p>
      </NavLink>
    );
  });

  const responsive = {
    0: {
      items: 2,
    },
    512: {
      items: 4,
    },
  };

  return (
    <div className="mt-[3%] mb-[3%] h-[50%]">
      <AliceCarousel
        mouseTracking
        infinite
        autoPlayInterval={1000}
        animationDuration={1500}
        disableDotsControls
        disableButtonsControls
        responsive={responsive}
        items={items}
        autoPlay
      />
    </div>
  );
};

export default Carousel;
