import Moralis from "moralis";

export const connectWallet = async (moralisOptions = null) => {
  if (!Moralis.User.current()) {
    await Moralis.authenticate({
      provider: window.ethereum ? null : "walletConnect",
      ...moralisOptions,
    })
      .then(function (user) {
        console.log("logged in user:", user);
        return user?.get("ethAddress");
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  return Moralis.User.current().get("ethAddress");
};

export const logOut = async () => {
  await Moralis.User.logOut();
  console.log("logged out");
};
