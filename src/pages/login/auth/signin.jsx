import axios from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { Alert } from "@material-tailwind/react";
import "../auth/auth.css"

const SignIn = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const onSignUp = async (data) => {
    setLoading(true);
    try {
      const { data: myData } = await axios.post(
        `${import.meta.env.VITE_API_URL}/auth/login`,
        data
      );

      //   console.log(myData.token);
      Cookies.set(`${myData?.role}`, myData?.token);
      setLoading(false);
      reset();
      navigate("/");
    } catch (error) {
    //   console.log(error);
      setError(error.response.data.message);
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100 auth-container">
      <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold text-center">Sign In</h2>
        {error && <Alert color="red">{error}</Alert>}
        <form className="mt-4" onSubmit={handleSubmit(onSignUp)}>
          <div className="mt-4 relative">
            <label className="block text-gray-700">Email</label>
            <input
              type="email"
              className="w-full p-2 border rounded-lg mt-1 focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter your email"
              {...register("email", { required: true })}
            />

            {errors.email && (
              <p className=" text-xs text-red-500 absolute -bottom-4">
                *Please enter your email address*
              </p>
            )}
          </div>

          <div className="mt-4 relative">
            <label className="block text-gray-700">Password</label>
            <input
              type="password"
              className="w-full p-2 border rounded-lg mt-1 focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Create a password"
              {...register("password", { required: true })}
            />

            {errors.password && (
              <p className=" text-xs text-red-500 absolute -bottom-4">
                *Please enter your password*
              </p>
            )}
          </div>
          <button
            type="submit"
            className="w-full bg-green-500 text-white py-2 mt-7 rounded-lg hover:bg-green-600 transition"
            disabled={loading}
          >
            {loading ? "Signing In..." : "Sign In"}
          </button>
        </form>
        <p className="mt-4 text-center text-gray-600">
          Don't have an account?{" "}
          <Link to="/signup" className="text-blue-500 hover:underline">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignIn;
