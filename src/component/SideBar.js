import { useContext } from "react";
import { RxCross1 } from "react-icons/rx";
import { cryptoContext } from "../cryptoContext";
import { FaUserAlt } from "react-icons/fa";
import { signOut } from "firebase/auth";
import { auth, db } from "../pages/FireBase";
import { AiFillDelete } from "react-icons/ai";
import { async } from "@firebase/util";
import { doc, updateDoc } from "firebase/firestore";

const SideBar = () => {
  const { setSidebar, user, watchList } = useContext(cryptoContext);
  const closeRightSideBar = () => {
    setSidebar(false);
  };

  const handleSignOut = () => {
    signOut(auth);
    setSidebar(false);
  };

  const removeFromWatchList = async (id) => {
    const dbRef = doc(db, "watchList", user.uid);
    await updateDoc(dbRef, {
      coins: watchList.filter((coin) => {
        return coin != id;
      }),
    });
  };

  return (
    <div className="transition duration-500 bg-modelColor ease-in-out w-[280px] transform -translate-x-[0px] h-screen fixed right-0 top-0">
      <RxCross1
        onClick={closeRightSideBar}
        size={"30px"}
        className="mt-[2%] ml-[2%] cursor-pointer"
        color="#ffffff"
      />
      <div className="flex flex-col gap-y-[25px] justify-center items-center mt-[4%] font-montserrat font-semibold text-white">
        <div className="h-[170px] w-[170px] rounded-full bg-yellow flex justify-center items-center">
          {user.photoURL ? (
            <img className="h-full w-full rounded-full" src={user.photoURL} />
          ) : (
            <FaUserAlt size={"100px"} color="#16171a" />
          )}
        </div>
        <p className="text-[30px] text-center w-[220px] h-auto">
          {user.displayName || user.email}
        </p>
        <div>
          <p>WatchList</p>
          <div className="mt-[10px] w-[240px] border-[1px] border-white rounded-[10px] min-h-[400px] overflow-y-auto">
            <div className="mt-[20px] flex flex-col items-center">
              {watchList &&
                watchList.map((coin) => (
                  <div className="flex justify-around py-[5px] rounded-[10px] gap-x-[25px] w-[200px] bg-yellow">
                    <p className="text-black font-montserrat font-medium">
                      {coin.toUpperCase()}
                    </p>
                    <AiFillDelete
                      className="cursor-pointer"
                      size={"25px"}
                      color="#000000"
                      onClick={() => {
                        removeFromWatchList(coin);
                      }}
                    />
                  </div>
                ))}
            </div>
          </div>
        </div>
        <button
          className="py-[10px] px-[20px] rounded-[10px] bg-yellow text-black"
          onClick={handleSignOut}
        >
          SIGN OUT
        </button>
      </div>
    </div>
  );
};

export default SideBar;
