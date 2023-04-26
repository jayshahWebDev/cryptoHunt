import Carousel from "./Carousel";

const Banner = () => {
  return (
    <div className="h-fit bg-bannerImg bg-cover px-[5px] py-[5px]">
      <div className="flex flex-col items-center">
        <h1 className="font-montserrat text-white font-bold mt-[40px] text-[50px]">
          Crypto Hunt
        </h1>
        <p className="font-montserrat text-white text-[15px] w-[70%] text-center">
          Get all the Info regarding your favorite Crypto Currency
        </p>
      </div>

      <Carousel />
    </div>
  );
};

export default Banner;
