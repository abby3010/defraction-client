/* eslint-disable valid-typeof */
import React, { useEffect } from "react";
const MetamaskContext = React.createContext(undefined);
const initialState = {
    wallet: null,
    isMetamaskInstalled: false,
    status: "loading",
};
function metamaskReducer(state, action) {
    switch (action.type) {
        case "connect": {
            const { wallet, balance } = action;
            return Object.assign(Object.assign({}, state), { wallet, balance, status: "idle" });
        }
        case "disconnect": {
            return Object.assign(Object.assign({}, state), { wallet: null });
        }
        case "pageLoaded": {
            const { isMetamaskInstalled } = action;
            return Object.assign(Object.assign({}, state), { isMetamaskInstalled, status: "idle" });
        }
        case "loading": {
            return Object.assign(Object.assign({}, state), { status: "loading" });
        }
        default: {
            throw new Error("Unhandled action type");
        }
    }
}
function MetamaskProvider({ children }) {
    const [state, dispatch] = React.useReducer(metamaskReducer, initialState);
    const value = { state, dispatch };
    useEffect(() => {
        if (typeof window !== undefined) {
            // start by checking if window.ethereum is present, indicating a wallet extension
            const ethereumProviderInjected = typeof window.ethereum !== "undefined";
            // this could be other wallets so we can verify if we are dealing with metamask
            // using the boolean constructor to be explicit and not let this be used as a falsy value (optional)
            const isMetamaskInstalled = ethereumProviderInjected && Boolean(window.ethereum.isMetaMask);
            dispatch({ type: "pageLoaded", isMetamaskInstalled });
        }
    }, []);
    return (React.createElement(MetamaskContext.Provider, { value: value }, children));
}
function useMetamask() {
    const context = React.useContext(MetamaskContext);
    if (context === undefined) {
        throw new Error("useMetamask must be used within a MetamaskProvider");
    }
    return context;
}
export { MetamaskProvider, useMetamask };