import axios from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";

const SignUp = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onSignUp = async (data) => {
    setLoading(true);
    try {
      const { data: myData } = await axios.post(
        `${import.meta.env.VITE_API_URL}/auth/signup`,
        data
      );

      console.log(myData);
      setLoading(false);
      reset();
      navigate("/signin");
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold text-center">Sign Up</h2>
        <form className="mt-4" onSubmit={handleSubmit(onSignUp)}>
          <div className=" relative">
            <label className="block text-gray-700">Full Name</label>
            <input
              type="text"
              className="w-full p-2 border rounded-lg mt-1 focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter your full name"
              {...register("fullName", { required: true })}
            />

            {errors.fullName && (
              <p className=" text-xs text-red-500 absolute -bottom-4">
                *Please enter your full name*
              </p>
            )}
          </div>

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
            <label className="block text-gray-700">Role</label>

            <select
              name=""
              id=""
              className="w-full p-2 border rounded-lg mt-1 focus:outline-none focus:ring-2 focus:ring-blue-400"
              {...register("role", { required: true })}
            >
              <option value="" disabled>
                Select your role
              </option>
              <option value="volunteer">Volunteer</option>
              <option value="participant">Participant</option>
            </select>

            {errors.role && (
              <p className=" text-xs text-red-500 absolute -bottom-4">
                *Please select your role*
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
            {loading ? "Signing Up..." : "Sign Up"}
          </button>
        </form>
        <p className="mt-4 text-center text-gray-600">
          Already have an account?{" "}
          <Link to="/signin" className="text-blue-500 hover:underline">
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
