/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react'
import { Link } from 'react-router-dom'

export default function Navbar() {
    return (
        <header className="dark-bb">
            <nav className="navbar navbar-expand-lg">
                <Link className="navbar-brand" to="/">FungTrix</Link>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#headerMenu"
                    aria-controls="headerMenu" aria-expanded="false" aria-label="Toggle navigation">
                    <i className="icon ion-md-menu"></i>
                </button>
                <div className="collapse navbar-collapse" id="headerMenu">
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item dropdown">
                            <Link className="nav-link" to="/exchange" role="button" data-toggle="dropdown" aria-haspopup="true"
                                aria-expanded="false">
                                Exchange
                            </Link>
                        </li>
                        <li className="nav-item dropdown">
                            <Link className="nav-link " to="/markets" role="button" data-toggle="dropdown" aria-haspopup="true"
                                aria-expanded="false">
                                Markets
                            </Link>

                        </li>
                        <li className="nav-item dropdown">
                            <Link
                                to="/add-nft"
                                className="nav-link" href="#" role="button" data-toggle="dropdown" aria-haspopup="true"
                                aria-expanded="false">
                                Add NFT
                            </Link>
                        </li>
                    </ul>
                    <ul className="navbar-nav ml-auto">
                        <li className="nav-item dropdown header-img-icon">
                            <Link className="nav-link" to="/user/wallet" role="button" data-toggle="dropdown" aria-haspopup="true"
                                aria-expanded="false">
                                <img src="/assets/img/avatar.svg" alt="avatar" />
                            </Link>
                        </li>
                    </ul>
                </div>
            </nav>
        </header>
    )
}
