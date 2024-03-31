import React from 'react'

export default function NFTCard({nft}) {
    return (
        <div className="col-lg-3 col-md-4 col-sm-6">
            <div className="markets-capital-item">
                <h2>
                    <img src={nft.image}
                        style={{
                            width: '100px',
                            height: '100px',
                        }}
                        alt="LTC" />
                </h2>
                <span className='text-white'>{nft.name}</span>
                <div className="markets-capital-details">
                    <h4>{nft.price} per share</h4>
                    <h3 className="green">{(parseInt(nft.shares) / 1000000).toFixed(2) + "\tlakhs"  } shares</h3>
                    <h6 className="text-white">added by {nft.organization}</h6>
                </div>
            </div>
        </div>
    )
}
