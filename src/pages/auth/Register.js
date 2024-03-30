import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useListen } from '../../hooks/useListen';
import { useMetamask } from '../../hooks/useMetamask';
import { Loading } from '../../components/Loading';
import { registerUser } from '../../api/api';
import { useDispatch } from 'react-redux';
import { loginSuccess } from '../../reducers';
import { useSelector } from 'react-redux';

export default function Register() {
    const { dispatch, state: { status, isMetamaskInstalled, wallet, balance }, } = useMetamask();
    const listen = useListen();
    const showInstallMetamask = status !== "pageNotLoaded" && !isMetamaskInstalled;
    const showConnectButton = status !== "pageNotLoaded" && isMetamaskInstalled && !wallet;
    const isConnected = status !== "pageNotLoaded" && typeof wallet === "string";
    const [data, setData] = React.useState({
        name: "",
        email: "",
        password: "",
        balance: "",
        walletAddress: ""
    });
    const reduxDispatch = useDispatch();
    const { user } = useSelector((state) => ({ ...state }));

    useEffect(() => {
        if (user.user != null) {
            window.location.href = "/";
        }
        else {
            return;
        }
    }, [user]);

    const handleConnect = async () => {
        dispatch({ type: "loading" });
        const accounts = await window.ethereum.request({
            method: "eth_requestAccounts",
        });
        if (accounts.length > 0) {
            const balance = await window.ethereum.request({
                method: "eth_getBalance",
                params: [accounts[0], "latest"],
            });
            dispatch({ type: "connect", wallet: accounts[0], balance });
            // we can register an event listener for changes to the users wallet
            listen();
            setData({ ...data, walletAddress: accounts[0], balance: balance });
        }
    };
    const handleDisconnect = () => {
        dispatch({ type: "disconnect" });
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        console.log("handleRegister")
        const accounts = await window.ethereum.request({
            method: "eth_requestAccounts",
        });
        if (accounts.length > 0) {
            registerUser(data).then(res => {
                reduxDispatch(
                    loginSuccess({
                        name: res.data.user.name,
                        email: res.data.user.email,
                        walletAddress: res.data.user.walletAddress,
                        balance: res.data.user.balance,
                        token: res.data.token
                    })
                )
            }).catch((e) => {
                console.log(e)
            })
        }
    }

    const handleChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value });
    };
    return (
        <div className="vh-100 d-flex justify-content-center">
            <div className="form-access my-auto">
                {wallet && balance && (
                    <div className=" px-4 py-5 sm:px-6">
                        <div className="-ml-4 -mt-4 flex flex-wrap items-center justify-between sm:flex-nowrap">
                            <div className="ml-4 mt-4">
                                <div className="flex items-center">
                                    <div className="ml-4">
                                        <h3 className="text-lg font-medium">
                                            Address: <span>{wallet}</span>
                                        </h3>
                                        <p className="text-sm text-white">
                                            Balance:{" "}
                                            <span>
                                                {(parseInt(balance) / 1000000000000000000).toFixed(4)}{" "}
                                                ETH
                                            </span>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {console.log("========================" + wallet + "bbbbbbbbbbbbbbbbbbbbbbbb" + balance)}

                {showConnectButton && (
                    <button
                        onClick={handleConnect}
                        className="btn btn-primary"
                    >
                        {status === "loading" ? <Loading /> : "Connect Wallet"}
                    </button>
                )}

                {showInstallMetamask && (
                    <a href="https://metamask.io/" target="__blank">
                        Install Metamask
                    </a>
                )}

                {isConnected && (
                    <div className="flex  w-full justify-center space-x-2">
                        <button
                            onClick={handleDisconnect}
                            className="btn btn-primary"
                        >
                            Disconnect
                        </button>
                    </div>
                )}
                <form onSubmit={handleRegister}>
                    <span>Create Account</span>
                    <div className="form-group">
                        <input type="text" className="form-control" placeholder="Full Name" name='name' onChange={handleChange} />
                    </div>
                    <div className="form-group">
                        <input type="email" className="form-control" placeholder="Email Address" name='email' onChange={handleChange} />
                    </div>
                    <div className="form-group">
                        <input type="password" className="form-control" placeholder="Password" name='password' onChange={handleChange} />
                    </div>
                    <button type="submit" className="btn btn-primary">Create Account</button>
                </form>

                <h2>Already have an account? <Link to="/">Sign in here</Link></h2>
            </div>
        </div>
    )
}
