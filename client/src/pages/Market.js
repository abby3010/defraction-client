/* eslint-disable jsx-a11y/alt-text */
import React from "react";
import { getApprovedNFTS } from "../api/api";
import axios from "axios";
import { Link } from "react-router-dom";
import { onValue, ref } from "firebase/database";
import { db } from "../config/Firebase";
export default function Market() {
  const [nfts, setNfts] = React.useState([]);
  const [loading, setloading] = React.useState(false);
  const [ownershipValue, setOwnershipValue] = React.useState([]);
  React.useEffect(() => {
    getApprovedNFTS().then(async (res) => {
      let token = [];
      console.log(res.data.nft);
      setNfts(res.data.nft);
      res.data.nft.forEach((element) => {
        token.push(element.tokenId);
      });
      await axios
        .post("http://localhost:8000/nft/divisibilities", {
          tokenIds: token,
        })
        .then((res) => {
          console.log("Success");
          setOwnershipValue(res.data);
          setloading(true);
        });
    });
  }, []);
  //   const [value, setvalue] = React.useState([]);
  const [price, setprice] = React.useState([]);
  React.useEffect(() => {
    const query = ref(db, "allStocksCurrentPrice");
    return onValue(query, (snapshot) => {
      const data = snapshot.val();
      console.log(data);
      if (snapshot.exists()) {
        // Object.values(data).map((project) => {
        //   setprice((projects) => [...projects, project]);
        // });
        setprice(data);
      }
    });
  }, []);
  return (
    <>
      {console.log(price)}
      {!loading ? (
        <div style={{ height: "100vh" }} className="markets-capital pt70 pb40">
          <center>
            <h1
              style={{
                color: "white",
                letterSpacing: "1px",
                fontWeight: "600",
                fontSize: "18px",
              }}
            >
              Loading...
            </h1>
          </center>
        </div>
      ) : (
        <div className="markets-capital pt70 pb40">
          <div style={{ overflow: "auto" }} className="container">
            <p
              style={{
                color: "white",
                letterSpacing: "1px",
                fontWeight: "600",
                fontSize: "18px",
              }}
            >
              List of NFT's
            </p>
            <table class="table table-dark">
              <thead>
                <tr>
                  <th scope="col">Image</th>
                  <th scope="col">Name</th>
                  <th scope="col">Ownership</th>
                  <th scope="col">Face Value</th>
                  <th scope="col">Total Shares</th>
                  <th scope="col">Current Price</th>
                </tr>
              </thead>
              <tbody>
                {nfts &&
                  nfts.map((item, index) => {
                    return (
                      <>
                        <tr>
                          <th scope="row">
                            <Link to={`/exchange/${item.name}`}>
                              <img
                                src={item.image}
                                style={{
                                  width: "100px",
                                  height: "100px",
                                }}
                              />
                            </Link>
                          </th>
                          <td>{item.name}</td>
                          <td>
                            {item.user["name"]}
                            &nbsp;
                            {(ownershipValue[index] / item.shares) * 100}%
                          </td>
                          <td>{item.price}</td>
                          <td>{(parseInt(item.shares) / 1000000).toFixed(2) + "\tlakhs"  }</td>
                          <td>{price[item.name] ?? "00"}</td>
                        </tr>
                      </>
                    );
                  })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </>
  );
}
