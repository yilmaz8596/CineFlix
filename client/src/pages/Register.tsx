import { useState } from "react";
import { BiSolidMoviePlay } from "react-icons/bi";
import { OAuth } from "../components/OAuth";
import { Link } from "react-router-dom";
import { RootState } from "../store";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  signUpStart,
  signUpFailure,
  signUpSuccess,
} from "../slices/auth-slice";

interface RegisterProps {
  email: string;
  password: string;
  confirmPassword: string;
}

export const Register = () => {
  const [register, setRegister] = useState<RegisterProps>({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { error, loading } = useSelector((state: RootState) => state.auth);

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRegister({
      ...register,
      [e.target.name]: e.target.value,
    });
  };

  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = await fetch(`${import.meta.env.VITE_AUTH_URL}/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(register),
      });
      const data = await res.json();
      console.log(data);
      if (data.success === false) {
        dispatch(signUpFailure(data.message));
        toast.error(error);
        return;
      }
      dispatch(signUpSuccess(data));
      toast.success(
        "Account created successfully, a notification has been sent to your email. Please verify your email to login."
      );
      navigate("/login");
    } catch (err) {
      dispatch(signUpFailure((err as Error).message));
      toast.error(error);
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
          <span className="text-[#ffffff]  font-light text-[32px]">
            Sign Up
          </span>
          <div className="w-[95%] relative flex items-center justify-center">
            <input
              type="text"
              placeholder="Email address"
              className={`w-full h-10 bg-transparent border-b ${
                register.email.length == 0 &&
                (register.password.length > 0 ||
                  register.confirmPassword.length > 0)
                  ? "border-b-[#fc4747]"
                  : register.email.length > 0 &&
                    (register.password.length == 0 ||
                      register.confirmPassword.length === 0)
                  ? "border-b-white"
                  : "border-b-[#5a698f]"
              }
                 text-white 
                pl-2 focus:outline-none placeholder:text-sm font-extralight`}
              name="email"
              value={register.email}
              onChange={onChangeHandler}
            />
            {register.email.length == 0 &&
              (register.password.length > 0 ||
                register.confirmPassword.length > 0) && (
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
                register.password.length === 0 &&
                (register.email.length > 0 ||
                  register.confirmPassword.length > 0)
                  ? "border-b-[#fc4747]"
                  : register.password.length > 0 &&
                    (register.email.length === 0 ||
                      register.confirmPassword.length === 0)
                  ? "border-b-white"
                  : "border-b-[#5a698f]"
              }
                 text-white 
                pl-2 focus:outline-none placeholder:text-sm font-extralight`}
              name="password"
              value={register.password}
              onChange={onChangeHandler}
            />
            {register.password.length === 0 &&
              (register.email.length > 0 ||
                register.confirmPassword.length > 0) && (
                <span className="text-[#fc4747] font-extralight text-[12px] absolute right-0">
                  Can't be empty
                </span>
              )}
          </div>
          <div className="w-[95%] relative flex items-center justify-center">
            <input
              type="password"
              placeholder="Repeat Password"
              className={`w-full h-10 bg-transparent border-b ${
                register.confirmPassword.length === 0 &&
                (register.email.length > 0 || register.password.length > 0)
                  ? "border-b-[#fc4747]"
                  : register.confirmPassword.length > 0 &&
                    (register.email.length === 0 ||
                      register.password.length === 0)
                  ? "border-b-white"
                  : "border-b-[#5a698f]"
              }
                 text-white 
                pl-2 focus:outline-none placeholder:text-sm font-extralight`}
              name="confirmPassword"
              value={register.confirmPassword}
              onChange={onChangeHandler}
            />
            {register.confirmPassword.length === 0 &&
              (register.email.length > 0 || register.password.length > 0) && (
                <span className="text-[#fc4747] font-extralight text-[12px] absolute right-0">
                  Can't be empty
                </span>
              )}
          </div>
          <button
            type="submit"
            className="w-[95%] h-10 bg-[#fc4747] text-[#ffffff] font-extralight rounded-md mt-4
                focus:outline-none hover:bg-slate-100 hover:text-slate-800"
          >
            Create an account
          </button>
          <OAuth route="login" />
        </form>
        <div className="flex gap-4 items-center justify-center mt-10">
          <span className="text-[#ffffff] font-extralight">
            Already have an account?
          </span>
          <Link to="/login" className="text-[#fc4747] font-extralight">
            Login
          </Link>
        </div>
      </div>
    </div>
  );
};
