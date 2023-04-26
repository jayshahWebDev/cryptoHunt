import axios from "axios";
import { setDoc, doc, updateDoc } from "firebase/firestore";
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { SingleCoin } from "../../config/api";
import { cryptoContext } from "../../cryptoContext";
import { db } from "../../pages/FireBase";
import { numberWithCommas } from "../../util";

const Sidebar = () => {
  const { id } = useParams();
  const [coinDetail, setCoinDetail] = useState("");

  const { currency, symbol, user, watchList, setWatchList } =
    useContext(cryptoContext);

  const coinInWatchList = watchList.includes(id);

  const fetchCoinDetail = async () => {
    try {
      console.log("inside fetchcoindetail");
      let coin = await axios.get(SingleCoin(id));
      console.log("coin::", coin.data);
      setCoinDetail(coin.data);
    } catch (error) {
      console.log("fetchCoinDetail Error::", error.message);
    }
  };

  useEffect(() => {
    fetchCoinDetail();
  }, [currency]);

  const queryFirebaseDb = async () => {
    try {
      const dbRef = doc(db, "watchList", user.uid);
      if (!coinInWatchList) {
        await setDoc(dbRef, {
          coins: watchList ? [...watchList, id] : [id],
        });
      } else {
        await updateDoc(dbRef, {
          coins: watchList.filter((coin) => {
            return coin != id;
          }),
        });
      }
    } catch (error) {
      console.log("firebase error::", error.message);
    }
  };

  return (
    <div className="laptop:flex-[24%]">
      {coinDetail && (
        <div>
          <div className="flex flex-col justify-center items-center mt-[2%]">
            <img src={coinDetail.image.large} className="h-[170px]" />
            <p className="font-montserrat font-semibold text-[45px] text-white">
              {coinDetail.name}
            </p>
          </div>
          <div className="flex flex-col gap-y-[15px] laptop:mt-[25px] laptop:gap-y-[25px] font-montserrat text-white text-justify">
            <div
              className="text-[17px]"
              dangerouslySetInnerHTML={{
                __html: `${coinDetail.description.en.split(". ")[0]}.`,
              }}
            />

            <p className="text-[23px]">
              <span className="font-semibold">Rank : </span>
              {coinDetail.market_cap_rank}
            </p>
            <p className="text-[23px]">
              <span className="font-semibold">Current Price : </span>
              {symbol + " "}
              {numberWithCommas(
                coinDetail.market_data.current_price[currency.toLowerCase()]
              )}
            </p>
            <p className="text-[23px]">
              <span className="font-semibold">Market Cap : </span>
              {symbol + " "}
              {numberWithCommas(
                coinDetail.market_data.market_cap[currency.toLowerCase()]
                  .toString()
                  .slice(0, -6)
              )}
              M
            </p>
          </div>

          <div className="flex justify-center mt-[20px]">
            <button
              onClick={queryFirebaseDb}
              className="bg-yellow font-montserrat font-medium text-black py-[10px] px-[8px] rounded-[10px]"
            >
              {coinInWatchList ? "Remove From WatchList" : "Add To WatchList"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Sidebar;
