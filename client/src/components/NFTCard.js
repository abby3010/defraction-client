import React from 'react'

export default function NFTCard() {
    return (
        <div className="col-lg-3 col-md-4 col-sm-6">
            <div className="markets-capital-item">
                <h2>
                    <img src="assets/img/icon/3.png"
                        style={{
                            width: '100px',
                            height: '100px',
                        }}
                        alt="LTC" />
                </h2>
                <span className='text-white'>LTC</span>
                <div className="markets-capital-details">
                    <h4>$431,684,298.45</h4>
                    <h3 className="red">-6.48% <i className="icon ion-md-arrow-down"></i></h3>
                </div>
            </div>
        </div>
    )
}
