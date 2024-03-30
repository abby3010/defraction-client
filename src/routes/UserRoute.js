import { useSelector } from "react-redux";
import LoadingToRedirect from "./LoadingToRedirect";

const ProtectedRoute = ({ children }) => {
    const { user } = useSelector((state) => ({ ...state }));
    if (!user.user) {
        return <LoadingToRedirect />
    } else {
        return children;
    }
};

export default ProtectedRoute;
