import React from 'react'
import { burnCoin } from '../api/api'
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import axios from "axios";

export default function BurnCoin() {
    const navigate = useNavigate();
    const { user } = useSelector((state) => ({ ...state }));
    const [data, setData] = React.useState({});

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
                    // setcoin("");
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

    const handleSubmit = (e) => {
        e.preventDefault();
        const quantity = data.quantity;
        burnCoin(user.user.walletAddress, quantity).then((res) => {
            toast.success('Coin Burned Successfully');
            navigate('/user/wallet');
        })
    }

    const handleChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value });
    };
    return (
        <div className="vh-100 d-flex justify-content-center">
            <div className="form-access my-auto">
                <form onSubmit={handleSubmit}>
                    <span>Burn ACoin</span>
                    <div className="form-group">
                        <input type="text" className="form-control" name='quantity' placeholder="Enter Quantity" onChange={handleChange} />
                    </div>
                    <button type="submit" className="btn btn-primary">Withdraw to Eth</button>
                </form>
            </div>
        </div>
    )
}
