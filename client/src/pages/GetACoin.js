import React from "react";
import { useSelector } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const GetACoin = () => {
  const navigate = useNavigate();
  const { user } = useSelector((state) => ({ ...state }));
  const [coin, setcoin] = React.useState("");

  const checkTransactionconfirmation = (txhash) => {
    let checkTransactionLoop = () => {
      return window.ethereum
        .request({ method: "eth_getTransactionReceipt", params: [txhash] })
        .then(async (r) => {
          if (r != null) {
            var myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");

            var raw = JSON.stringify({
              caller: user.user.walletAddress,
            });

            var requestOptions = {
              method: "POST",
              headers: myHeaders,
              body: raw,
              redirect: "follow",
            };

            let boolTransaction = await axios.post(
              "http://localhost:8000/acoin/buyEvent",
              requestOptions
            )
              .then((result) => {
                const parsedResult = result.data;
                console.log(parsedResult);

                console.log(
                  "The account is " +
                    parsedResult["returnValues"]["_account"].toString()
                );
                console.log(
                  "The caller is " +
                    parsedResult["returnValues"]["_caller"].toString()
                );
                console.log(
                  "The coins' value is " +
                    parsedResult["returnValues"]["_numACoins"].toString()
                );
                console.log(
                  "The message is " +
                    parsedResult["returnValues"]["_message"].toString()
                );
                setcoin("");
                toast.success("Coin Purchased");
                navigate("/user/wallet");
                return true;
              })
              .catch((error) => {
                console.log("error", error);
                return false;
              });

            if (boolTransaction) {
              return "Transaction Confirmed";
            } else return "Transaction Failed";
          } else return checkTransactionLoop();
        });
    };

    return checkTransactionLoop();
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    let data = {
      account: user.user.walletAddress,
      numACoins: coin,
      caller: user.user.walletAddress,
    };
    try {
      await axios.post("http://localhost:8000/acoin/buy", data).then((res) => {
        console.log(res);
        // if (res.data.error) {
        //   toast.error(res.data.error);
        // }
        
          // let result = JSON.parse(res.data);
          let result = res.data;
          let transactionParam = {
            from: user.user.walletAddress,
            to: result.to,
            data: result.data,
            value: result.value,
          };
          console.log(transactionParam);
          window.ethereum
            .request({
              method: "eth_sendTransaction",
              params: [transactionParam],
            })
            .then((txhash) => {
              console.log(txhash);
              checkTransactionconfirmation(txhash).then((r) => alert(r));
            });

          // setcoin("");
          // toast.success("Coin Purchased");
          // navigate("/user/wallet");
        
      });
    } catch (error) {
      console.log("error", error);
    }
  };

  return (
    <>
      {console.log(user.user)}
      <div className="vh-100 d-flex justify-content-center">
        <div className="form-access my-auto">
          <form onSubmit={handleRegister}>
            <span>Get A Coin</span>

            <div className="form-group">
              <input
                type="text"
                className="form-control"
                value={coin}
                placeholder="No of Coin"
                name="coin"
                onChange={(e) => setcoin(e.target.value)}
              />
            </div>

            <button type="submit" className="btn btn-primary">
              Buy Coin
            </button>
          </form>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default GetACoin;
