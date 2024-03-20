import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { Link } from "react-router-dom";
export const EmailVerification = () => {
  const { token } = useParams();

  useEffect(() => {
    const verifyEmail = async () => {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_AUTH_URL}/verify-email/${token}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ token }),
          }
        );
        const data = await res.json();
        console.log(data);
      } catch (err) {
        console.log((err as Error).message);
      }
    };
    verifyEmail();
  }, [token]);
  return (
    <div className="flex flex-col items-center justify-center gap-4 mt-10">
      <h1 className="text-white">Thank you for verifying your email!</h1>
      <Link to="/login" className="text-white">
        Sign in
      </Link>
    </div>
  );
};
