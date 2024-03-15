import { useState } from "react";
import { BiSolidMoviePlay } from "react-icons/bi";
import { OAuth } from "../components/OAuth";
import { Link } from "react-router-dom";

interface LoginProps {
  email: string;
  password: string;
}

export const Login = () => {
  const [login, setLogin] = useState<LoginProps>({
    email: "",
    password: "",
  });

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLogin({
      ...login,
      [e.target.name]: e.target.value,
    });
  };
  return (
    <div className="flex flex-col items-center justify-center gap-20 w-full h-screen">
      <BiSolidMoviePlay color="#fc4747" size={30} />
      <div
        className="w-[80%] h-fit sm:w-[60%] md:w-[40%]
        lg:w-[30%] bg-[#161d2f] rounded-md py-3"
      >
        <form className="flex flex-col items-start gap-6 mt-6 ml-6">
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
                focus:outline-none"
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
