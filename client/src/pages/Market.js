import React from 'react'
import NFTCard from '../components/NFTCard'


export default function Market() {
    return (
        <div className="markets-capital pt70 pb40">
            <div className="container">
                <div className="row">
                    <NFTCard />
                    <NFTCard />
                    <NFTCard />
                    <NFTCard />
                    <NFTCard />
                </div>
            </div>
        </div>
    )
}
