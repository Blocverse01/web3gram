/* import Moralis from "moralis"; */
import memories from "./images/Couple-in-a-photo-booth-bro.svg";
import { connectWallet } from "./utils/web3User";

function Home() {
  /* let user = Moralis.User.current(); */
  /*  if (user) {
    window.location = "/rooms/" + user.get("ethAddress");
  } */
  return (
    <header
      data-aos="fade-down"
      className="min-h-screen bg-gradient sm:px-6 md:px-16 px-5 pt-9 md:pt-24 pb-9 md:pb-24"
    >
      <div className="max-w-7xl">
        <div className="">
          <h3 className="text-white text-4xl max-w-3xl font-semibold md:text-[62px] md:leading-[90px]">
            Your Memories Live Forever on, <br />
            <span className="text-portfolio-skyblue">Web3Gram</span>
          </h3>
          <div className="mt-14 grid grid-cols-1 md:grid-cols-2 gap-[120px]">
            <div>
              <button
                className="btn"
                onClick={async () => {
                  let address = await connectWallet();
                  window.location = "/rooms/" + address;
                }}
              >
                Create My Web3gram
              </button>
            </div>
            <div className="flex justify-center md:justify-end">
              <img
                src={memories}
                alt="memories"
                className="md:-mt-[210px] md:w-[800px]"
              />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Home;
