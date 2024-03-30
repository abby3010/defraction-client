import React from 'react'
import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="landing-footer">
    <div className="container">
      <div className="row">
        <div className="col-md-2">
          <Link to="/" className='text-white'>
            FungTrix
          </Link>
        </div>
        <div className="col-md-10 d-flex justify-content-end align-items-center">
          <ul>
            <li><Link to="/exchange">Exchange</Link></li>
            <li><Link to="/market">Market</Link></li>
            <li><Link to="/user/wallet">Profile</Link></li>
            <li className='pl-3 text-white'>Copyright @2023</li>
          </ul>
        </div>
      </div>
    </div>
  </footer>
  )
}
