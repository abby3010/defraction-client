/* eslint-disable jsx-a11y/img-redundant-alt */
/* eslint-disable react-hooks/exhaustive-deps */
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import React from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { getAcoinBalance, getInr, widthdrawInr } from "../api/api";
import axios from "axios";
import "./style.css";
import { burnCoin } from "../api/api";
import stripe from ".././asset/stripe.png";
import metamask from ".././asset/metamask.png";
import polygon from '../asset/polygon.png'
export default function UserWallet() {
  const navigate = useNavigate();
  const { user } = useSelector((state) => ({ ...state }));
  const [balance, setBalance] = React.useState(0);
  const [acoinBalance, setAcoinBalance] = React.useState(0);
  const [transactions, setTransactions] = React.useState([]);
  const [trades, setTrades] = React.useState([]);

  React.useEffect(() => {
    getBalance();
    getAcoinBalanceData();
    fetchUserTransactions();
    fetchUserTrades();
    console.log(user.user);
  }, []);

  const getBalance = async () => {
    const accounts = await window.ethereum.request({
      method: "eth_requestAccounts",
    });
    if (accounts.length > 0) {
      const balance = await window.ethereum.request({
        method: "eth_getBalance",
        params: [accounts[0], "latest"],
      });
      setBalance(balance);
    }
    // const web3 = () => {
    //     return new Web3(
    //     new Web3.providers.HttpProvider('https://e159-103-250-36-82.ngrok.io'));
    // }
    // await window.ethereum.enable()
    // const _balance = await (web3()).eth.getBalance('0x47Cc91d299487a5dED85731F7Ed6c0c9cAC86A0b')
    // setBalance(_balance);
  };

  const getAcoinBalanceData = async () => {
    //   let data = {
    //     account: user.user.walletAddress
    //   }
    //   try {
    //     await axios.post("http://localhost:8000/acoin/balanceOf", data).then((res) => {
    //       console.log(res);
    //   })
    //  } catch(err) {
    //     console.log(err)
    //   }
    getAcoinBalance(user.user.walletAddress).then((res) => {
      console.log(res.data);
      setAcoinBalance(res.data);
    });
  };

  const fetchUserTransactions = async () => {
    await axios
      .post("http://localhost:8000/acoin/user-transactions", {
        email: user.user.email,
      })
      .then((res) => {
        console.log(res.data.transaction);
        setTransactions(res.data.transaction);
      });
  };

  const fetchUserTrades = async () => {
    await axios
      .post("http://localhost:8000/acoin/user-transactions", {
        email: user.user.email,
      })
      .then((res) => {
        console.log(res.data.trades);
        setTrades(res.data.trades);
      });
  };

  const [coin, setcoin] = React.useState("");
  console.log(user);
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

            let boolTransaction = await axios
              .post("http://localhost:8000/acoin/buyEvent", requestOptions)
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
                setinr("");
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
  const handleinrwidthdraw = (e) => {
    e.preventDefault();
    // /acoin/burn/inr
    widthdrawInr(user.user.walletAddress, data, user.user.walletAddress).then(
      (res) => {
        console.log(res.data);
        toast.success(
          "You have been credited " + Math.round(res.data).toString() + " inr"
        );

        setData("");
      }
    );
  };
  const handleRegister = async (e) => {
    e.preventDefault();
    let data = {
      account: user.user.walletAddress,
      numACoins: coin,
      caller: user.user.walletAddress,
      email: user.user.email,
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
        // navigate("/user/wallet");handleRegister
      });
    } catch (error) {
      console.log("error", error);
    }
  };

  // Burn ACOin
  const [data, setData] = React.useState("");


  const handleSubmit = (e) => {
    e.preventDefault();
    const quantity = data;
    burnCoin(user.user.walletAddress, quantity).then((res) => {
      toast.success("Coin Burned Successfully");
      setData("");
      navigate("/user/wallet");
    });
  };

  const [inr, setinr] = React.useState("");
  const postinr = (value) => {
    setcoin(value);
    getInr(parseInt(value)).then((res) => {
      console.log(res.data);
      setinr(res.data);
    });
  };
  return (
    <>
      <div className="settings mtb15">
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-12 col-lg-12">
              <div className="tab-content" id="v-pills-tabContent">
                <div
                  className="tab-pane fade show active"
                  id="settings-wallet"
                  role="tabpanel"
                  aria-labelledby="settings-wallet-tab"
                >
                  <div className="wallet">
                    <div className="row">
                      <div className="col-md-12 col-lg-3">
                        <div
                          className="nav flex-column nav-pills"
                          role="tablist"
                          aria-orientation="vertical"
                        >
                          <a
                            className="nav-link d-flex justify-content-between align-items-center active"
                            data-toggle="pill"
                            href="#coinBNB"
                            role="tab"
                            aria-selected="true"
                          >
                            <div className="d-flex">
                              <img src="/assets/img/icon/18.png" alt="btc" />
                              <div>
                                <h2>AC</h2>
                                <p>Acoin</p>
                              </div>
                            </div>
                            <div>
                              <h3>{acoinBalance}</h3>
                            </div>
                          </a>
                          <a
                            className="nav-link d-flex justify-content-between align-items-center"
                            data-toggle="pill"
                            href="#coinTRX"
                            role="tab"
                            aria-selected="true"
                          >
                            <div className="d-flex">
                              <img src={polygon} alt="btc" />
                              <div>
                                <h2>M</h2>
                                <p>Matic</p>
                              </div>
                            </div>
                            <div>
                              <h3>
                                {(parseInt(balance) / 1000000000000000000)
                                  .toFixed(6)
                                  .toString()}
                              </h3>
                            </div>
                          </a>
                        </div>
                      </div>
                      <div className="col-md-12 col-lg-5">
                        <div className="tab-content">
                          <div
                            className="tab-pane fade show active"
                            id="coinBNB"
                            role="tabpanel"
                          >
                            <div className="card">
                              <div className="card-body">
                                <h5 className="card-title">Recent Trades</h5>
                                <table className="table">
                                    <thead>
                                      <tr>
                                        <th>No.</th>
                                        <th>For NFT</th>
                                        <th>Trade Type</th>
                                        <th>Quantity</th>
                                        <th>Price</th>
                                      </tr>
                                    </thead>
                                    <tbody>
                                      {trades &&
                                        trades.slice(0).reverse().map((data, index) => (
                                          <tr key={index}>
                                            <td>{index + 1}</td>
                                            <td>{data.exchangeData.ticker_symbol} </td>
                                            <td>{data.exchangeData.order_type}</td>
                                            <td>
                                              {data.exchangeData.quantity + "\tshares"}
                                            </td>
                                            <td>{data.exchangeData.price + "\t Acoins"}</td>
                                          </tr>
                                        ))}
                                    </tbody>
                                  </table>
                                
                              </div>
                            </div>
                            <div className="card">
                              <div className="card-body">
                                <h5 className="card-title">
                                  Latest Transactions
                                </h5>
                                <div className="wallet-history">
                                  <table className="table">
                                    <thead>
                                      <tr>
                                        <th>No.</th>
                                        <th>To</th>
                                        <th>Transaction Type</th>
                                        <th>ACoins Purchased</th>
                                      </tr>
                                    </thead>
                                    <tbody>
                                      {transactions &&
                                        transactions.slice(0).reverse().map((data, index) => (
                                          <tr key={index}>
                                            <td>{index + 1}</td>
                                            <td>{data.transactionData.to.substring(0, 7)} .... {data.transactionData.to.substring(37, 50)} </td>
                                            <td>{data.transactionData.type}</td>
                                            <td>
                                              {parseInt(
                                                data.transactionData.value
                                              ) / 1000000000000}
                                            </td>
                                          </tr>
                                        ))}
                                    </tbody>
                                  </table>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-12 col-lg-2">
                        {/* <div className="vh-100 d-flex justify-content-center"> */}
                        <div className="form-access my-auto">
                          <form>
                            <span>Get ACoin</span>

                            <div className="form-group">
                              <input
                                type="text"
                                onChange={(e) => postinr(e.target.value)}
                                className="form-control"
                                value={coin}
                                placeholder="No of Coin"
                                name="coin"
                              // onChange={(e) => setcoin(e.target.value)}
                              />
                              <br />
                              <input
                                disabled
                                value={inr}
                                className="form-control"
                              />
                            </div>

                            <button className="btn btn-white border col-md-12 col-lg-5 md-mx2">
                              <Link to={`/buy-with-stripe/${inr}/${coin}`}>
                                <img
                                  alt="stripe image"
                                  // width="30"
                                  style={{ height: "30px" }}
                                  src={stripe}
                                />
                              </Link>
                            </button>

                            <button
                              onClick={handleRegister}
                              type="button"
                              className="btn btn-primary col-md-12 col-lg-5"
                            >
                              <img
                                alt="metamask image"
                                width="30"
                                style={{ height: "30px" }}
                                src={metamask}
                              />
                            </button>
                          </form>
                        </div>
                        <br />
                        <div className="form-access my-auto">
                          <form>
                            <span>Withdraw ACoin</span>
                            <div className="form-group">
                              <input
                                type="text"
                                className="form-control"
                                value={data}
                                name="quantity"
                                placeholder="Enter ACOin"
                                onChange={(e) => setData(e.target.value)}
                              />
                            </div>
                            <button
                              onClick={handleinrwidthdraw}
                              type="button"
                              className="btn btn-white border col-md-12 col-lg-5 md-mx2"
                            >
                              <img
                                alt="stripe image"
                                // width="30"
                                style={{ height: "30px" }}
                                src={stripe}
                              />
                            </button>
                            <button
                              type="button"
                              onClick={handleSubmit}
                              className="btn btn-primary col-md-12 col-lg-5"
                            >
                              <img
                                alt="metamask image"
                                width="30"
                                style={{ height: "30px" }}
                                src={metamask}
                              />
                            </button>
                          </form>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
}
