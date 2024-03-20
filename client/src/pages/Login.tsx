import { useState } from "react";
import { BiSolidMoviePlay } from "react-icons/bi";
import { OAuth } from "../components/OAuth";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RootState } from "../store";
import {
  signInStart,
  signInFailure,
  signInSuccess,
} from "../slices/auth-slice";

import { toast } from "react-toastify";
interface LoginProps {
  email: string;
  password: string;
}

export const Login = () => {
  const [login, setLogin] = useState<LoginProps>({
    email: "",
    password: "",
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { error, loading } = useSelector((state: RootState) => state.auth);
  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLogin({
      ...login,
      [e.target.name]: e.target.value,
    });
  };

  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (login.email.length === 0 || login.password.length === 0) {
      toast.error("Email and password can't be empty");
      return;
    }
    try {
      dispatch(signInStart());
      const res = await fetch(`${import.meta.env.VITE_AUTH_URL}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(login),
      });
      const data = await res.json();
      console.log(data);

      if (data.success === false) {
        dispatch(signInFailure(data.message));
        toast.error(data.message);
        return;
      }
      dispatch(signInSuccess(data));
      navigate("/");
    } catch (error) {
      console.log((error as Error).message);
      dispatch(signInFailure((error as Error).message));
      toast.error((error as Error).message);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center gap-20 w-full h-screen">
      <BiSolidMoviePlay color="#fc4747" size={30} />
      <div
        className="w-[80%] h-fit sm:w-[60%] md:w-[40%]
        lg:w-[30%] bg-[#161d2f] rounded-md py-3"
      >
        <form
          className="flex flex-col items-start gap-6 mt-6 ml-6"
          onSubmit={submitHandler}
        >
          <span className="text-[#ffffff]  font-light text-[32px]">Login</span>
          <div className="w-[95%] relative flex items-center justify-center">
            <input
              type="text"
              placeholder="Email address"
              className={`w-full h-10 bg-transparent border-b ${
                login.password.length > 0 && login.email.length == 0
                  ? "border-b-[#fc4747]"
                  : login.email.length > 0 && login.password.length == 0
                  ? "border-b-white"
                  : "border-b-[#5a698f]"
              }
                 text-white 
                pl-2 focus:outline-none placeholder:text-sm font-extralight`}
              name="email"
              value={login.email}
              onChange={onChangeHandler}
            />
            {login.password.length > 0 && login.email.length == 0 && (
              <span className="text-[#fc4747] font-extralight text-[12px] absolute right-0">
                Can't be empty
              </span>
            )}
          </div>
          <div className="w-[95%] relative flex items-center justify-center">
            <input
              type="password"
              placeholder="Password"
              className={`w-full h-10 bg-transparent border-b ${
                login.email.length > 0 && login.password.length == 0
                  ? "border-b-[#fc4747]"
                  : login.password.length > 0 && login.email.length == 0
                  ? "border-b-white"
                  : "border-b-[#5a698f]"
              }
                 text-white 
                pl-2 focus:outline-none placeholder:text-sm font-extralight`}
              name="password"
              value={login.password}
              onChange={onChangeHandler}
            />
            {login.email.length > 0 && login.password.length == 0 && (
              <span className="text-[#fc4747] font-extralight text-[12px] absolute right-0">
                Can't be empty
              </span>
            )}
          </div>
          <button
            type="submit"
            className="w-[95%] h-10 bg-[#fc4747] text-[#ffffff] font-extralight rounded-md mt-4
                focus:outline-none hover:bg-slate-100 hover:text-slate-800 "
          >
            Login to your account
          </button>
          <OAuth route="login" />
        </form>
        <div className="flex gap-4 items-center justify-center mt-10">
          <span className="text-[#ffffff] font-extralight">
            Don't have an account?
          </span>
          <Link to="/register" className="text-[#fc4747] font-extralight">
            Sign up
          </Link>
        </div>
      </div>
    </div>
  );
};
