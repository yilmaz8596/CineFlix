import { FcGoogle } from "react-icons/fc";

export const OAuth = (p: { route: string }) => {
  return (
    <div className="flex items-center justify-center w-[95%] gap-1">
      <p
        className="text-[#ffffff] font-extralight rounded-md 
    focus:outline-none"
      >
        Continue with
      </p>
      <FcGoogle size={20} color="#ffffff" className="cursor-pointer" />
    </div>
  );
};
