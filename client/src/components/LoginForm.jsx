import React, { useState, useRef } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const LoginForm = ({ onCancel }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const passwordInputRef = useRef();
  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    const input = passwordInputRef.current;
    input.type = input.type === "password" ? "text" : "password";
    setShowPassword(!showPassword);
  };

  const onLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        "http://localhost:3000/users/login",
        { username, password },
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );

      if (res.data.logged) {
        onCancel();
        return navigate("/");
      }

      setError(res.data.message);
      setTimeout(() => setError(""), 3000);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form
      className="w-full mt-4 flex flex-col gap-5 justify-center items-center mx-auto"
      onSubmit={onLogin}
    >
      <input
        className="bg-white text-black w-3/4 rounded-md shadow-lg border-b border-gray-500 p-2"
        type="text"
        placeholder="username"
        name="username"
        autoComplete="off"
        onChange={(e) => setUsername(e.target.value)}
      />
      <div className="relative w-3/4">
        <input
          className="bg-white w-full text-black rounded-md shadow-lg border-b border-gray-500 p-2"
          ref={passwordInputRef}
          type="password"
          placeholder="password"
          name="password"
          onChange={(e) => setPassword(e.target.value)}
        />
        {!showPassword ? (
          <FaEye
            className="absolute dark:text-black right-2 top-3 hover:cursor-pointer"
            onClick={togglePasswordVisibility}
          />
        ) : (
          <FaEyeSlash
            className="absolute dark:text-black right-2 top-3 hover:cursor-pointer"
            onClick={togglePasswordVisibility}
          />
        )}
      </div>
      {error && <p className="text-red-500">{error}</p>}
      <input
        className="block w-3/4 bg-primary-red text-white text-xl font-semibold text-center py-3 px-6 rounded-xl hover:bg-red-600 hover:cursor-pointer transition-all duration-300"
        type="submit"
        value="Log In"
      />
    </form>
  );
};

export default LoginForm;
