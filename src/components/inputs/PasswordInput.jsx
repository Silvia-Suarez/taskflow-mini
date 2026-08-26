import { useState } from "react";
import { PiEyeLight, PiEyeSlashLight } from "react-icons/pi";

function PasswordInput({ pass, onChangePass, error }) {
  const [showPass, setShowPass] = useState(false);
  return (
    <div
      className={`w-full flex items-center justify-between border-2 border-gray-300 rounded-button p-2 ${error ? "border-red-500" : "border-gray-300"}`}
    >
      <input
        type={showPass ? "text" : "password"}
        value={pass}
        placeholder="*********"
        onChange={onChangePass}
        className="w-full bg-transparent outline-none"
      />
      {!showPass ? (
        <PiEyeLight
          onClick={() => setShowPass(!showPass)}
          className="text-2xl cursor-pointer"
        ></PiEyeLight>
      ) : (
        <PiEyeSlashLight
          onClick={() => setShowPass(!showPass)}
          className="text-2xl cursor-pointer"
        ></PiEyeSlashLight>
      )}
    </div>
  );
}
export default PasswordInput;
