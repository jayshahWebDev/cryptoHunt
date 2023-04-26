import { useContext } from "react";
import AuthModel from "../component/AuthModel";
import Banner from "../component/banner/Banner";
import CoinList from "../component/CoinList";
import Header from "../component/Header";
import SideBar from "../component/SideBar";
import { cryptoContext } from "../cryptoContext";

const HomePage = () => {
  const { openAuthModel, sidebar } = useContext(cryptoContext);
  return (
    <div>
      <Header />
      <Banner />
      <CoinList />
      {openAuthModel ? <AuthModel /> : ""}
      {sidebar ? <SideBar /> : ""}
    </div>
  );
};

export default HomePage;
