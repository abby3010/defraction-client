import React from 'react'

export default function Home() {
    return (
        <>
            <div className="landing-hero">
                <div className="container">
                    <div className="row">
                        <div className="offset-md-2 col-md-8 text-center">
                            <h2>A trusted and secure NFT exchange.</h2>
                            <div className="input-group">
                                <input type="text" className="form-control" placeholder="Search your NFTs" aria-label="Search your NFTs"
                                    aria-describedby="button-addon2" />
                                <div className="input-group-append">
                                    <button className="btn btn-primary" type="button" id="button-addon2">Get Started</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="landing-info-one landing-info-one-bg mtb100">
                <div className="container">
                    <div className="row">
                        <div className="col-md-6">
                            <h2>The most advance and secure NFT exchange platform.</h2>
                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquam iusto, nisi illo nulla alias fugiat
                                repudiandae unde ab maxime placeat facere, dicta deleniti ipsam animi expedita quam minus perferendis
                                veniam?</p>
                            <ul>
                                <li><i className="icon ion-ios-checkmark-circle"></i> Live Technical Analysis</li>
                                <li><i className="icon ion-ios-checkmark-circle"></i> Live Market Data</li>
                                <li><i className="icon ion-ios-checkmark-circle"></i> Live  Price</li>
                                <li><i className="icon ion-ios-checkmark-circle"></i> Deposit & Withdraw</li>
                                <li><i className="icon ion-ios-checkmark-circle"></i> Buy & Sell</li>
                                <li><i className="icon ion-ios-checkmark-circle"></i> NFT Listing</li>
                                <li><i className="icon ion-ios-checkmark-circle"></i> Manage Wallets</li>
                                <li><i className="icon ion-ios-checkmark-circle"></i> Market depth</li>
                            </ul>
                        </div>
                        <div className="col-md-6">
                            <img src="assets/img/landing/dash-preview-dark.png" className="visible-mobile" alt="" />
                        </div>
                    </div>
                </div>
            </div>
            <div className="landing-info-one mtb100">
                <div className="container">
                    <div className="row">
                        <div className="col-md-5">
                            <div className="tradingview-widget-container tradingview-gain-and-loser">
                                <div className="tradingview-widget-container__widget">

                            <img src="/assets/img/landing/dash-preview-dark.png" alt="" />
                                </div>

                            </div>
                        </div>
                        <div className="offset-md-1 col-md-6">
                            <h2>Live Market Gainers and Losers tracking</h2>
                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquam iusto, nisi illo nulla alias fugiat
                                repudiandae unde ab maxime placeat facere, dicta deleniti ipsam animi expedita quam minus perferendis
                                veniam?</p>
                            <ul>
                                <li><i className="icon ion-ios-checkmark-circle"></i> Live Gainers Tracking</li>
                                <li><i className="icon ion-ios-checkmark-circle"></i> Live Losers Tracking</li>
                                <li><i className="icon ion-ios-checkmark-circle"></i> Live Market Data</li>
                                <li><i className="icon ion-ios-checkmark-circle"></i> Live NFT Price</li>
                                <li><i className="icon ion-ios-checkmark-circle"></i> Past Price check</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
