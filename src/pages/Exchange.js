/* eslint-disable no-unused-vars */
import React from 'react'
import { Bar } from 'react-chartjs-2'
import { Line } from 'react-chartjs-2'
import { Chart as ChartJS } from 'chart.js/auto'

export default function Exchange() {
    return (
        <div className="container-fluid mtb15 no-fluid">
            <div className="row sm-gutters">
                <div className="col-md-9">
                    <div className="market-trade">
                        <ul className="nav nav-pills" role="tablist">
                            <li className="nav-item">
                                <a className="nav-link active" data-toggle="pill" href="#pills-trade-limit" role="tab"
                                    aria-selected="true">Limit</a>
                            </li>
                        </ul>
                        <div className="tab-content">
                            <div className="tab-pane fade show active" id="pills-trade-limit" role="tabpanel">
                                <div className="d-flex justify-content-between">
                                    <div className="market-trade-buy">
                                        <div className="input-group">
                                            <input type="number" className="form-control" placeholder="Price" />
                                            <div className="input-group-append">
                                                <span className="input-group-text">BTC</span>
                                            </div>
                                        </div>
                                        <div className="input-group">
                                            <input type="number" className="form-control" placeholder="Amount" />
                                            <div className="input-group-append">
                                                <span className="input-group-text">ETH</span>
                                            </div>
                                        </div>
                                        <ul className="market-trade-list">
                                            <li><a href="#!">25%</a></li>
                                            <li><a href="#!">50%</a></li>
                                            <li><a href="#!">75%</a></li>
                                            <li><a href="#!">100%</a></li>
                                        </ul>
                                        <p>Available: <span>0 BTC = 0 USD</span></p>
                                        <p>Volume: <span>0 BTC = 0 USD</span></p>
                                        <p>Margin: <span>0 BTC = 0 USD</span></p>
                                        <p>Fee: <span>0 BTC = 0 USD</span></p>
                                        <button className="btn buy">Buy</button>
                                    </div>
                                    <div className="market-trade-sell">
                                        <div className="input-group">
                                            <input type="number" className="form-control" placeholder="Price" />
                                            <div className="input-group-append">
                                                <span className="input-group-text">BTC</span>
                                            </div>
                                        </div>
                                        <div className="input-group">
                                            <input type="number" className="form-control" placeholder="Amount" />
                                            <div className="input-group-append">
                                                <span className="input-group-text">ETH</span>
                                            </div>
                                        </div>
                                        <ul className="market-trade-list">
                                            <li><a href="#!">25%</a></li>
                                            <li><a href="#!">50%</a></li>
                                            <li><a href="#!">75%</a></li>
                                            <li><a href="#!">100%</a></li>
                                        </ul>
                                        <p>Available: <span>0 BTC = 0 USD</span></p>
                                        <p>Volume: <span>0 BTC = 0 USD</span></p>
                                        <p>Margin: <span>0 BTC = 0 USD</span></p>
                                        <p>Fee: <span>0 BTC = 0 USD</span></p>
                                        <button className="btn sell">Sell</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="market-trade-history" 
                        style={{height: '300px', width: '100%'}}
                    >
                        <h2 className="heading">Trade History</h2>
                        {/* <Bar
                            data={{
                                labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
                                datasets: [
                                    {
                                        label: '# of Votes',
                                        data: [12, 19, 3, 5, 2, 3],
                                        backgroundColor: [
                                            'rgba(255, 99, 132, 0.2)',
                                            'rgba(54, 162, 235, 0.2)',
                                            'rgba(255, 206, 86, 0.2)',
                                            'rgba(75, 192, 192, 0.2)',
                                            'rgba(153, 102, 255, 0.2)',
                                            'rgba(255, 159, 64, 0.2)',
                                        ],
                                        borderColor: [
                                            'rgba(255, 99, 132, 1)',
                                            'rgba(54, 162, 235, 1)',
                                            'rgba(255, 206, 86, 1)',
                                            'rgba(75, 192, 192, 1)',
                                            'rgba(153, 102, 255, 1)',
                                            'rgba(255, 159, 64, 1)',
                                        ],
                                        borderWidth: 1,
                                    },
                                ],
                            }}
                            // height={400}
                            // width={600}
                            options={{
                                maintainAspectRatio: false,
                                scales: {
                                    y: {
                                        beginAtZero: true,
                                    },
                                },
                            }}
                        /> */}

                        <Line
                            data={{
                                labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
                                datasets: [
                                    {
                                        label: '# of Votes',
                                        data: [12, 19, 3, 5, 2, 3],
                                        fill: false,
                                        backgroundColor: 'rgb(255, 99, 132)',
                                        borderColor: 'rgba(255, 99, 132, 0.2)',
                                    },
                                ],
                            }}
                            options={{
                                maintainAspectRatio: false,
                                scales: {
                                    y: {
                                        beginAtZero: true,
                                    },
                                },
                            }}
                        />
                    </div>
                </div>
                <div className="col-md-3">
                    <div className="order-book mb15">
                        <h2 className="heading">Order Book</h2>
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>Price(BTC)</th>
                                    <th>Amount(ETH)</th>
                                    <th>Total(ETH)</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="red-bg-80">
                                    <td className="red">0.022572</td>
                                    <td>1.253415</td>
                                    <td>15.27648</td>
                                </tr>
                                <tr className="red-bg-60">
                                    <td className="red">0.020371</td>
                                    <td>1.205415</td>
                                    <td>15.25648</td>
                                </tr>
                                <tr className="red-bg-40">
                                    <td className="red">0.023572</td>
                                    <td>1.645415</td>
                                    <td>15.23648</td>
                                </tr>
                                <tr className="red-bg-20">
                                    <td className="red">0.032378</td>
                                    <td>1.206715</td>
                                    <td>15.25348</td>
                                </tr>
                                <tr className="red-bg-10">
                                    <td className="red">0.022573</td>
                                    <td>1.262415</td>
                                    <td>15.19648</td>
                                </tr>
                                <tr className="red-bg-8">
                                    <td className="red">0.154377</td>
                                    <td>1.225415</td>
                                    <td>15.35648</td>
                                </tr>
                                <tr className="red-bg-5">
                                    <td className="red">0.120373</td>
                                    <td>1.285415</td>
                                    <td>15.25648</td>
                                </tr>
                                <tr className="red-bg">
                                    <td className="red">0.028576</td>
                                    <td>1.291415</td>
                                    <td>15.26448</td>
                                </tr>
                            </tbody>
                            <tbody className="ob-heading">
                                <tr>
                                    <td>
                                        <span>Last Price</span>
                                        0.020367
                                    </td>
                                    <td>
                                        <span>USD</span>
                                        148.65
                                    </td>
                                    <td className="red">
                                        <span>Change</span>
                                        -0.51%
                                    </td>
                                </tr>
                            </tbody>
                            <tbody>
                                <tr className="green-bg">
                                    <td className="green">0.158373</td>
                                    <td>1.209515</td>
                                    <td>15.23248</td>
                                </tr>
                                <tr className="green-bg-5">
                                    <td className="green">0.020851</td>
                                    <td>1.206245</td>
                                    <td>15.25458</td>
                                </tr>
                                <tr className="green-bg-8">
                                    <td className="green">0.025375</td>
                                    <td>1.205715</td>
                                    <td>15.65648</td>
                                </tr>
                                <tr className="green-bg-10">
                                    <td className="green">0.020252</td>
                                    <td>1.205495</td>
                                    <td>15.24548</td>
                                </tr>
                                <tr className="green-bg-20">
                                    <td className="green">0.020373</td>
                                    <td>1.205415</td>
                                    <td>15.25648</td>
                                </tr>
                                <tr className="green-bg-40">
                                    <td className="green">0.020156</td>
                                    <td>1.207515</td>
                                    <td>15.28948</td>
                                </tr>
                                <tr className="green-bg-60">
                                    <td className="green">0.540375</td>
                                    <td>1.205915</td>
                                    <td>15.25748</td>
                                </tr>
                                <tr className="green-bg-80">
                                    <td className="green">0.020372</td>
                                    <td>1.205415</td>
                                    <td>15.25648</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>

            </div>
        </div>
    )
}
