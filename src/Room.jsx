import { useParams } from "react-router";
import Moralis from "moralis";
import { connectWallet } from "./utils/web3User";
import { useState } from "react";
import UploadImage from "./UploadImage";

export default function Room() {
  const { address } = useParams();
  const [canUpload, changeUploadState] = useState(false);
  const [images, setImages] = useState([]);
  const query = new Moralis.Query("RoomImages");
  query.equalTo("owner", address);
  query.find().then((images) => {
    setImages(
      images.map((image) => ({
        imageLink: image.get("image").ipfs(),
        hash: image.get("image").hash(),
        caption: image.get("caption"),
      }))
    );
  });

  let user = Moralis.User.current();
  let myRoom = user?.get("ethAddress") === address;
  return (
    <div
      data-aos="fade-left"
      className="md:px-16 bg-gray-900 sm:px-6 px-5 pt-5 md:pt-20 pb-9 md:pb-20"
    >
      <div className="max-w-7xl mx-auto">
        {address === "create" ? (
          <div className="min-h-screen flex justify-center items-center">
            <div>
              <h3 className="text-white text-center text-2xl md:text-4xl font-semibold">
                Welcome To Web3gram
              </h3>
              <button
                className="btn"
                onClick={async () => {
                  let address = await connectWallet();
                  window.location = "/rooms/" + address;
                }}
              >
                Create My Gram
              </button>
            </div>
          </div>
        ) : (
          <div>
            <h3 className="text-white md:text-center font-black uppercase mb-10 md:mb-20 text-3xl md:text-[3.6rem]">
              <span className="text-portfolio-skyblue">
                {myRoom ? "My Web3Gram" : address}
              </span>
            </h3>
            <div className="flex justify-center items-center py-4 px-3">
              <button
                onClick={() => {
                  changeUploadState(!canUpload);
                }}
                className="btn"
              >
                Upload Image
              </button>
            </div>
            {canUpload ? (
              <div className="mt-8 mb-12">
                <UploadImage />
              </div>
            ) : (
              ""
            )}
            <div className="grid grid-cols-1 mt-5 mb-12 sm:grid-cols-2 gap-16 md:grid-cols-3">
              {images.map((image, index) => (
                <a
                  key={index}
                  className="shadow-md border-slate-400 block rounded-md border"
                  href={image.imageLink}
                >
                  <div className="flex justify-center h-full md:items-center md:p-3">
                    <img
                      className="w-full object-scale-down h-full"
                      src={image.imageLink}
                      alt={image.caption}
                    />
                  </div>
                  {image.caption.trim() !== "" ? (
                    <h3 className="text-white border border-slate-400 py-1 mt-2 px-3">
                      {image.caption}
                    </h3>
                  ) : (
                    ""
                  )}
                </a>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
