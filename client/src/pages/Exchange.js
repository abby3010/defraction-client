/* eslint-disable eqeqeq */
/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable array-callback-return */
import React from "react";
import Chart from "react-apexcharts";
import { onValue, ref } from "firebase/database";
import { db } from "../config/Firebase";
// eslint-disable-next-line no-unused-vars
// import { Chart as ChartJS } from "chart.js/auto";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
// import data from "./data";

//[mini, open, close, maxi]

export default function Exchange() {
  const { id } = useParams();
  const [loading, setLoading] = React.useState(true);
  const [prize, setPrize] = React.useState([]);
  const [time, settime] = React.useState([]);
  const { user } = useSelector((state) => ({ ...state }));
  const [price, setprice] = React.useState({
    sellprice: [],
    sellshares: [],
    buyshares: [],
    buyprice: [],
  });
  // console.log(price);
  const [textData, setTextData] = React.useState();
  const [current, setcurrprice] = React.useState("");
  var closed_price;
  React.useEffect(() => {
    const candlechat = async () => {
      var time = [];
      var price = [];
      const query = ref(db, "allStocksCurrentPriceHistoryArray");
      return onValue(query, (snapshot) => {
        const raw_data = snapshot.val();

        if (snapshot.exists()) {
          // coo
          console.log(raw_data[id]);
          const data = Object.keys(Object.values(raw_data[id])).map(function (
            item
          ) {
            return Object.values(raw_data[id])[item];
          });
          console.log(data);
          let ans = {};
          var start = data[0].time;
          var end = data[data.length - 1].time;

          var start_hour = parseInt(start.split(":")[0]);
          var start_minute = parseInt(start.split(":")[1]);
          var end_hour = end.split(":")[0];
          var end_minute = end.split(":")[1];
          console.log(start_hour, start_minute, end_minute, end_hour);
          var dur_start = start_minute - (start_minute % 5);
          var dur_end = parseInt(end_minute) + 25 - (end_minute % 5);
          var dur_hour_end = parseInt(end_hour);
          if (dur_end === 60) {
            dur_end = 0;
            dur_hour_end = dur_hour_end + 1;
          }
          console.log(dur_hour_end);
          console.log(dur_start, dur_end);
          var i = start_hour;
          var j = dur_start;

          var temp_min = data[0].price;
          var temp_max = data[0].price;
          var temp_close = data[0].price;
          var temp_open = data[0].price;

          var prev_temp_min = 0;
          var prev_temp_max = 0;
          var prev_temp_close = 0;
          var prev_temp_open = 0;

          let k = 0;
          let h = k;
          let newSection = false;

          while (i <= dur_hour_end) {
            let temp_start_minute = j;
            let prev_temp_start_minute = j;
            let temp_start_hour = i;

            if (i == dur_hour_end && j == dur_end) {
              if (dur_end == 0) break;
              console.log(i + ":" + j);
              time.push(i + ":" + j);
              break;
            } else if (j == 0) {
              j = j + 5;
              console.log(i + ":05");
              time.push(i + ":05");
            } else if (j == 60) {
              i = parseInt(i) + 1;
              j = 0;
              console.log(i + ":00");
              time.push(i + ":00");
            } else if (j == 5) {
              console.log(i + ":05");
              // time.push(i + ":05");
              j = j + 5;
            } else {
              console.log(i + ":" + j);
              time.push(i + ":" + j);
              j = j + 5;
            }

            let temp_end_minute;
            let temp_end_hour;

            if (j == 0) {
              temp_end_minute = 59;
              temp_end_hour = i - 1;
            } else {
              temp_end_minute = j;
              temp_end_hour = i;
            }

            h = k;
            while (
              temp_start_minute <= temp_end_minute &&
              temp_start_hour <= temp_end_hour
            ) {
              if (h == data.length) break;
              let time_array = data[h].time.split(":");
              let temp_minute = parseInt(time_array[1]);
              if (temp_minute == prev_temp_start_minute) {
                temp_start_minute = prev_temp_start_minute;
              }
              let temp_hour = parseInt(time_array[0]);

              if (
                (temp_hour == temp_start_hour &&
                  temp_minute == temp_start_minute) ||
                (temp_hour == temp_end_hour && temp_end_minute == temp_minute)
              ) {
                if (newSection) {
                  temp_open = data[h].price;
                  newSection = false;
                }
                temp_min = temp_min > data[h].price ? data[h].price : temp_min;
                temp_max = temp_max > data[h].price ? temp_max : data[h].price;
                temp_close = data[h].price;
                h = h + 1;
              }
              prev_temp_start_minute = temp_start_minute;
              temp_start_minute = temp_start_minute + 1;
              if (temp_start_minute == 60) {
                temp_start_minute = temp_end_minute;
                temp_start_hour = temp_end_hour;
              }
            }

            if (h == k) {
              console.log({
                OPEN: prev_temp_open,
                MIN: prev_temp_min,
                MAX: prev_temp_max,
                CLOSE: prev_temp_close,
              });
              price.push([temp_open, temp_max, temp_min, temp_close]);
            } else if (h > k) {
              k = h;
              console.log({
                OPEN: temp_open,
                MIN: temp_min,
                MAX: temp_max,
                CLOSE: temp_close,
              });
              price.push([temp_open, temp_max, temp_min, temp_close]);
              prev_temp_open = temp_open;
              prev_temp_close = temp_close;
              prev_temp_min = temp_min;
              prev_temp_max = temp_max;

              temp_open = 0;
              temp_close = 0;
              temp_min = 67383736474;
              temp_max = 0;
              newSection = true;
            }
          }
          for (var x = 0; x < price.length; x++) {
            if (price[x][0] == 0) {
              price[x][0] = price[x - 1][0];
              price[x][1] = price[x - 1][1];
              price[x][2] = price[x - 1][2];
              price[x][3] = price[x - 1][3];
            }
          }
          setPrize(price);

          settime(time);
          closed_price = price[price.length - 1];
        }
      });
    };
    candlechat().then(function (res) {
      setLoading(false);
    });
  }, []);

  let graph_data = {
    options: {
      plotOptions: {
        candlestick: {
          wick: {
            useFillColor: true,
          },
        },
      },

      chart: {
        type: "candlestick",
        height: 350,
        color: "#ff0000",
      },

      title: {
        text: "CandleStick Chart",
        align: "left",
      },
      xaxis: {
        type: "category",
        tickPlacement: "on",
      },
      yaxis: {
        tooltip: {
          enabled: true,
        },
      },
    },
    series: [
      {
        data: time.map((item, index) => {
          return {
            x: item,
            y:
              prize.length == 0
                ? [10, 10, 10, 10]
                : prize.length > 3 && prize[index][2] != 67383736474
                ? prize[index] ?? [current, current, current, current]
                : console.log(),
          };
        }),
      },
    ],
    zoom: {
      enabled: true,
    },
  };

  React.useEffect(() => {
    const query = ref(db, id);
    return onValue(query, (snapshot) => {
      const data = snapshot.val();
      if (snapshot.exists()) {
        console.log(data);
        setcurrprice(data.currentPrice);
        var value = [];
        var sellvalue = [];
        var innerdata = [];
        var innerselldata = [];
        if (data.sellOrders) {
          Object.keys(data.sellOrders).forEach(function (key, index) {
            sellvalue.push(key);
            innerselldata.push(data.sellOrders[key]);
          });
        }
        // setprice({ ...price, sellshares: sellvalue });
        if (data.buyOrders) {
          Object.keys(data.buyOrders).forEach(function (key, index) {
            value.push(key);
            innerdata.push(data.buyOrders[key]);
          });
        }
        var total = 0;
        var t = [];
        var selltotal = 0;
        var s = [];
        innerdata.map((item) => {
          total = 0;
          Object.values(item).forEach(function (key, index) {
            total += key.quantity;
          });
          t.push(total);
        });
        // setprice({ ...price, buyprice: total });
        innerselldata.map((item) => {
          selltotal = 0;
          Object.values(item).forEach(function (key, index) {
            selltotal += key.quantity;
          });
          s.push(selltotal);
        });
        // setprice({ ...price, sellprice: selltotal });
        setprice({
          ...price,
          buyshares: value,
          buyprice: t,
          sellprice: s,
          sellshares: sellvalue,
        });

        // setprice(data);
      }
    });
  }, []);

  const handleChange = (event) => {
    setTextData({ ...textData, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // console.log(user)
      console.log(textData.price);
      let result = await axios
        .post(process.env.REACT_APP_API + "/api/placeSellOrder", {
          price: parseInt(textData.price),
          quantity: parseInt(textData.quantity),
          ticker_symbol: id,
          order_type: "market",
          buyerId: user.user.walletAddress,
        })
        .then(async () => {
          let re = await axios
            .post(process.env.REACT_APP_API + "/api/trade/add-trade", {
              price: parseInt(textData.price),
              quantity: parseInt(textData.quantity),
              ticker_symbol: id,
              order_type: "Sell",
              email: user.user.email,
              buyerId: user.user.walletAddress,
            })
            .then(() => {
              toast.success("Successfully Sell Share");
            });
        });
    } catch (error) {
      console.log(error);
    }
  };

  const handleBuySubmit = async (e) => {
    e.preventDefault();
    try {
      let result = await axios
        .post(process.env.REACT_APP_API + "/api/placeBuyOrder", {
          price: parseInt(textData.price),
          quantity: parseInt(textData.quantity),
          ticker_symbol: id,
          order_type: "market",
          buyerId: user.user.walletAddress,
        })
        .then(async () => {
          let re = await axios
            .post(process.env.REACT_APP_API + "/api/trade/add-trade", {
              price: parseInt(textData.price),
              quantity: parseInt(textData.quantity),
              ticker_symbol: id,
              order_type: "Buy",
              email: user.user.email,
              buyerId: user.user.walletAddress,
            })
            .then(() => {
              toast.success("Successfully Buy Share");
            });
        });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      {console.log("this is prize" + prize.length, time.length)}
      {console.log("this is prize" + prize)}
      {console.log("this is prize" + time)}

      {!loading ? (
        <div className="container-fluid mtb15 no-fluid">
          <div style={{ gap: "10px" }} className="row sm-gutters">
            <div className="col-md-8">
              <div className="market-trade-history" style={{ width: "100%" }}>
                <div
                  className="row"
                  style={{ justifyContent: "space-between", marginLeft: "5px" }}
                >
                  <h2
                    style={{
                      fontSize: "25px",
                      letterSpacing: "1px",
                      fontWeight: "600",
                    }}
                    className="heading"
                  >
                    {id}
                  </h2>
                  <h2
                    style={{
                      fontSize: "25px",
                      letterSpacing: "1px",
                      fontWeight: "600",
                    }}
                    className="heading"
                  >
                    Current Price: {current}
                  </h2>
                </div>

                <Chart
                  options={graph_data.options}
                  series={graph_data.series}
                  type="candlestick"
                  width="100%"
                />
              </div>
              <div className="market-trade">
                <ul className="nav nav-pills" role="tablist">
                  <li className="nav-item">
                    <a
                      className="nav-link active"
                      data-toggle="pill"
                      href="#pills-trade-limit"
                      role="tab"
                      aria-selected="true"
                    >
                      Limit
                    </a>
                  </li>
                </ul>
                <div className="tab-content">
                  <div
                    className="tab-pane fade show active"
                    id="pills-trade-limit"
                    role="tabpanel"
                  >
                    <div className="d-flex justify-content-between">
                      <div className="market-trade-buy">
                        <div className="input-group">
                          <input
                            type="number"
                            className="form-control"
                            placeholder="Price"
                            name="price"
                            onChange={(event) => handleChange(event)}
                          />
                          <div className="input-group-append">
                            <span className="input-group-text">AC</span>
                          </div>
                        </div>
                        <div className="input-group">
                          <input
                            type="number"
                            className="form-control"
                            placeholder="Amount"
                            name="quantity"
                            onChange={(event) => handleChange(event)}
                          />
                          <div className="input-group-append">
                            <span className="input-group-text">SHARES</span>
                          </div>
                        </div>
                        <button onClick={handleBuySubmit} className="btn buy">
                          Buy
                        </button>
                      </div>
                      <div className="market-trade-sell">
                        <div className="input-group">
                          <input
                            type="number"
                            className="form-control"
                            placeholder="Price"
                            name="price"
                            onChange={(event) => handleChange(event)}
                          />
                          <div className="input-group-append">
                            <span className="input-group-text">AC</span>
                          </div>
                        </div>
                        <div className="input-group">
                          <input
                            type="number"
                            className="form-control"
                            placeholder="Amount"
                            name="quantity"
                            onChange={(event) => handleChange(event)}
                          />
                          <div className="input-group-append">
                            <span className="input-group-text">SHARES</span>
                          </div>
                        </div>
                        <button
                          onClick={(e) => handleSubmit(e)}
                          className="btn sell"
                        >
                          Sell
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-md-3">
              <div className="order-book mb15">
                <h2 className="heading">Order Book</h2>
                <table className="table">
                  <thead>
                    <tr>
                      <th>Price(AC)</th>
                      <th>Shares</th>
                    </tr>
                  </thead>
                  <tbody>
                    {price.buyprice.map((value, index) => (
                      <tr className="red-bg" key={index}>
                        <td>{price.sellshares[index]}</td>
                        <td>{price.sellprice[index]}</td>
                      </tr>
                    ))}
                  </tbody>

                  <tr>
                    <td>
                      <span style={{ color: "white" }}>Current Price</span>
                    </td>
                    <td>
                      <span style={{ color: "white", fontSize: "15px" }}>
                        {current}
                      </span>
                    </td>
                    {/* <td className="red">
                    <span>Change</span>
                  </td> */}
                  </tr>

                  <tbody className="ob-heading">
                    <tr>
                      <td>
                        <span>Last Price</span>
                      </td>
                      <td>
                        <span>USD</span>
                      </td>
                      <td className="red">
                        <span>Change</span>
                      </td>
                    </tr>
                  </tbody>
                  <thead>
                    <tr>
                      <th>Price(AC)</th>
                      <th>Shares</th>
                    </tr>
                  </thead>
                  <tbody>
                    {price.sellprice.map((value, index) => (
                      <tr className="green-bg" key={index}>
                        <td>{price.buyshares[index]}</td>
                        <td>{price.buyprice[index]}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <center>
          <h1>Loading...</h1>
        </center>
      )}
    </>
  );
}
