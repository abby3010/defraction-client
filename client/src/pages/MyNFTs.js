import React from "react";
import { getUserNftsByWalletAddress } from "../api/api";
import { useSelector } from "react-redux";
import NFTCard from "../components/NFTCard";

export default function MyNFTs() {
  const { user } = useSelector((state) => ({ ...state }));
  const [nfts, setNfts] = React.useState([]);
  React.useEffect(() => {
    getUserNftsByWalletAddress(user.user.walletAddress).then((res) => {
      console.log(res.data.nft);
      setNfts(res.data.nft);
    });
  }, [user.user.walletAddress]);
  return (
    <div style={{ height: "100vh" }} className="markets-capital pt70 pb40">
      <h2 className="flex text-center text-white">{user.user.name}'s NFTS</h2>
      <div className="container">
        <div className="row">
          {nfts && nfts.map((nf, index) => <NFTCard key={index} nft={nf} />)}
        </div>
      </div>
    </div>
  );
}
