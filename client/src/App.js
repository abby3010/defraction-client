import Navbar from "./components/Navbar";
import Login from "./pages/auth/Login";
import { Route, Routes } from "react-router-dom";
import Register from "./pages/auth/Register";
import Forgot from "./pages/auth/Forgot";
import WalletPage from './pages/WalletPage'
import { useDispatch } from 'react-redux'
import { currentUser } from "./api/api";
import { useEffect } from "react";
import { loginSuccess } from "./reducers";
import Cookies from "js-cookie";
import ProtectedRoute from "./routes/UserRoute";
import Home from "./pages/Home";
import AddNFT from "./pages/AddNFT";
import { ToastContainer } from "react-toastify";
import Footer from "./components/Footer";
import UserWallet from "./pages/UserWallet";
import Exchange from "./pages/Exchange";
import Market from "./pages/Market";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const token = Cookies.get("jwt");
    console.log(token)
    token && getcurrentuser(token)
      .then((res) => {
        dispatch(
          loginSuccess({
            name: res.data.user.name,
            email: res.data.user.email,
            walletAddress: res.data.user.walletAddress,
            balance: res.data.user.balance,
            _id: res.data.user._id,
          })
        );
      })
      .catch();
  }, [dispatch]);

  const getcurrentuser = async (token) => {
    if (token) {
      return await currentUser(token);
    }
  };


  return (
    <div id="dark" className="App">
      <Navbar />
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot" element={<Forgot />} />
        <Route path="/wallet" element={<ProtectedRoute><WalletPage /></ProtectedRoute>} />
        <Route path="/add-nft" element={<ProtectedRoute><AddNFT /></ProtectedRoute>} />
        <Route path="/user/wallet" element={<ProtectedRoute><UserWallet /></ProtectedRoute>} />
        <Route path="/exchange" element={<Exchange />} />
        <Route path="/markets" element={<Market />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
