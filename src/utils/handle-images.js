import Moralis from "moralis";
import { connectWallet } from "./web3User";

export const uploadImage = async (fileData, caption) => {
  if (!Moralis.User.current()) {
    await connectWallet();
  }
  const user = Moralis.User.current();
  const file = new Moralis.File(fileData.name, fileData);
  await file.saveIPFS();
  console.log(file.ipfs(), file.hash());

  // Save file reference to Moralis
  const roomImage = new Moralis.Object("RoomImages");
  roomImage.set("owner", user.get("ethAddress"));
  roomImage.set("image", file);
  roomImage.set("caption", caption);
  await roomImage.save();
};

export const fetchRoomImages = (roomAddress) => {
  // Retrieve file
  const query = new Moralis.Query("RoomImages");
  query.equalTo("owner", roomAddress);
  query.find().then(function (images) {
    const roomImages = images.map((image) => ({
      imageLink: image.get("image").ipfs(),
      hash: image.get("image").hash(),
      caption: image.get("caption"),
    }));
    console.log(roomImages);
    return roomImages;

    /*  const ipfs = application.get("resume").ipfs();
    const hash = application.get("resume").hash();
    console.log("IPFS url", ipfs);
    console.log("IPFS hash", hash); */
  });
};
