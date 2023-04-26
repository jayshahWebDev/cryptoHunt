import { useContext } from "react";
import AuthModel from "../component/AuthModel";
import Chart from "../component/coinPage/Chart";
import Sidebar from "../component/coinPage/Sidebar";
import Header from "../component/Header";
import SideBar from "../component/SideBar";
import { cryptoContext } from "../cryptoContext";

const CoinPage = () => {
  const { openAuthModel, sidebar } = useContext(cryptoContext);

  return (
    <div className={`bg-darkBlack min-h-[100vh]`}>
      <Header />
      <div className="flex flex-col mx-[4%] laptop:flex-row laptop:gap-x-[25px]">
        <Sidebar />
        <Chart />
        {openAuthModel ? <AuthModel /> : ""}
        {sidebar ? <SideBar /> : ""}
      </div>
    </div>
  );
};

export default CoinPage;
