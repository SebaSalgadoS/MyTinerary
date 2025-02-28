import { useDispatch, useSelector } from "react-redux";
import { loginAction, logoutAction } from "../store/actions/userActions";
import { getRootState } from "../store/store";

const useUser = () => {
  const state = getRootState();
  const { user, token } = useSelector((state) => state.authReducer);
  const dispatch = useDispatch();

  const login = (data) => dispatch(loginAction(data));
  const logout = () => dispatch(logoutAction);

  return { user, token, login, logout };
};

export default useUser;
