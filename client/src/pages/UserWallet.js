import React from 'react'

export default function UserWallet() {
    return (
        <div className="settings mtb15">
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-12 col-lg-9">
                        <div className="tab-content" id="v-pills-tabContent">
                            <div className="tab-pane fade show active" id="settings-wallet" role="tabpanel"
                                aria-labelledby="settings-wallet-tab">
                                <div className="wallet">
                                    <div className="row">
                                        <div className="col-md-12 col-lg-4">
                                            <div className="nav flex-column nav-pills" role="tablist" aria-orientation="vertical">
                                                <a className="nav-link d-flex justify-content-between align-items-center active" data-toggle="pill"
                                                    href="#coinBNB" role="tab" aria-selected="true">
                                                    <div className="d-flex">
                                                        <img src="/assets/img/icon/18.png" alt="btc" />
                                                        <div>
                                                            <h2>BTC</h2>
                                                            <p>Bitcoin</p>
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <h3>4.5484254</h3>
                                                        <p className="text-right"><i className="icon ion-md-lock"></i> 0.0000000</p>
                                                    </div>
                                                </a>
                                                <a className="nav-link d-flex justify-content-between align-items-center" data-toggle="pill"
                                                    href="#coinTRX" role="tab" aria-selected="true">
                                                    <div className="d-flex">
                                                        <img src="/assets/img/icon/1.png" alt="btc" />
                                                        <div>
                                                            <h2>ETH</h2>
                                                            <p>Ethereum</p>
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <h3>13.454845</h3>
                                                        <p className="text-right"><i className="icon ion-md-lock"></i> 0.0000000</p>
                                                    </div>
                                                </a>

                                            </div>
                                        </div>
                                        <div className="col-md-12 col-lg-8">
                                            <div className="tab-content">
                                                <div className="tab-pane fade show active" id="coinBNB" role="tabpanel">
                                                    <div className="card">
                                                        <div className="card-body">
                                                            <h5 className="card-title">Balances</h5>
                                                            <ul>
                                                                <li className="d-flex justify-content-between align-items-center">
                                                                    <div className="d-flex align-items-center">
                                                                        <i className="icon ion-md-cash"></i>
                                                                        <h2>Total Equity</h2>
                                                                    </div>
                                                                    <div>
                                                                        <h3>7.342 BNB</h3>
                                                                    </div>
                                                                </li>
                                                                <li className="d-flex justify-content-between align-items-center">
                                                                    <div className="d-flex align-items-center">
                                                                        <i className="icon ion-md-checkmark"></i>
                                                                        <h2>Available Margin</h2>
                                                                    </div>
                                                                    <div>
                                                                        <h3>0.332 BNB</h3>
                                                                    </div>
                                                                </li>
                                                            </ul>
                                                            <button className="btn green">Deposit</button>
                                                            <button className="btn red">Withdraw</button>
                                                        </div>
                                                    </div>
                                                    <div className="card">
                                                        <div className="card-body">
                                                            <h5 className="card-title">Latest Transactions</h5>
                                                            <div className="wallet-history">
                                                                <table className="table">
                                                                    <thead>
                                                                        <tr>
                                                                            <th>No.</th>
                                                                            <th>Date</th>
                                                                            <th>Status</th>
                                                                            <th>Amount</th>
                                                                        </tr>
                                                                    </thead>
                                                                    <tbody>
                                                                        <tr>
                                                                            <td>1</td>
                                                                            <td>25-04-2019</td>
                                                                            <td><i className="icon ion-md-checkmark-circle-outline green"></i></td>
                                                                            <td>4.5454334</td>
                                                                        </tr>
                                                                        <tr>
                                                                            <td>2</td>
                                                                            <td>25-05-2019</td>
                                                                            <td><i className="icon ion-md-checkmark-circle-outline green"></i></td>
                                                                            <td>0.5484468</td>
                                                                        </tr>
                                                                        <tr>
                                                                            <td>3</td>
                                                                            <td>25-06-2019</td>
                                                                            <td><i className="icon ion-md-close-circle-outline red"></i></td>
                                                                            <td>2.5454545</td>
                                                                        </tr>
                                                                        <tr>
                                                                            <td>4</td>
                                                                            <td>25-07-2019</td>
                                                                            <td><i className="icon ion-md-checkmark-circle-outline green"></i></td>
                                                                            <td>1.45894147</td>
                                                                        </tr>
                                                                        <tr>
                                                                            <td>3</td>
                                                                            <td>25-08-2019</td>
                                                                            <td><i className="icon ion-md-close-circle-outline red"></i></td>
                                                                            <td>2.5454545</td>
                                                                        </tr>
                                                                    </tbody>
                                                                </table>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="tab-pane fade" id="coinTRX" role="tabpanel">
                                                    <div className="card">
                                                        <div className="card-body">
                                                            <h5 className="card-title">Balances</h5>
                                                            <ul>
                                                                <li className="d-flex justify-content-between align-items-center">
                                                                    <div className="d-flex align-items-center">
                                                                        <i className="icon ion-md-cash"></i>
                                                                        <h2>Total Equity</h2>
                                                                    </div>
                                                                    <div>
                                                                        <h3>4.3344 TRX</h3>
                                                                    </div>
                                                                </li>
                                                                <li className="d-flex justify-content-between align-items-center">
                                                                    <div className="d-flex align-items-center">
                                                                        <i className="icon ion-md-checkmark"></i>
                                                                        <h2>Available Margin</h2>
                                                                    </div>
                                                                    <div>
                                                                        <h3>1.453 TRX</h3>
                                                                    </div>
                                                                </li>
                                                            </ul>
                                                            <button className="btn green">Deposit</button>
                                                            <button className="btn red">Withdraw</button>
                                                        </div>
                                                    </div>
                                                    <div className="card">
                                                        <div className="card-body">
                                                            <h5 className="card-title">Latest Transactions</h5>
                                                            <div className="wallet-history">
                                                                <table className="table">
                                                                    <thead>
                                                                        <tr>
                                                                            <th>No.</th>
                                                                            <th>Date</th>
                                                                            <th>Status</th>
                                                                            <th>Amount</th>
                                                                        </tr>
                                                                    </thead>
                                                                    <tbody>
                                                                        <tr>
                                                                            <td>1</td>
                                                                            <td>25-04-2019</td>
                                                                            <td><i className="icon ion-md-checkmark-circle-outline green"></i></td>
                                                                            <td>4.5454334</td>
                                                                        </tr>
                                                                        <tr>
                                                                            <td>2</td>
                                                                            <td>25-05-2019</td>
                                                                            <td><i className="icon ion-md-checkmark-circle-outline green"></i></td>
                                                                            <td>0.5484468</td>
                                                                        </tr>
                                                                        <tr>
                                                                            <td>3</td>
                                                                            <td>25-06-2019</td>
                                                                            <td><i className="icon ion-md-close-circle-outline red"></i></td>
                                                                            <td>2.5454545</td>
                                                                        </tr>
                                                                        <tr>
                                                                            <td>4</td>
                                                                            <td>25-07-2019</td>
                                                                            <td><i className="icon ion-md-checkmark-circle-outline green"></i></td>
                                                                            <td>1.45894147</td>
                                                                        </tr>
                                                                        <tr>
                                                                            <td>3</td>
                                                                            <td>25-08-2019</td>
                                                                            <td><i className="icon ion-md-close-circle-outline red"></i></td>
                                                                            <td>2.5454545</td>
                                                                        </tr>
                                                                    </tbody>
                                                                </table>
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
                    </div>
                </div>
            </div>
        </div>
    )
}
