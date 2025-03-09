import { Alert } from "@material-tailwind/react";
import axios from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import "../auth/auth.css";

const SignUp = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [step, setStep] = useState(1);
  const [success, setSuccess] = useState(false);

  const onSignUp = async (data) => {
    setLoading(true);
    setError(null);
    try {
      const { data: myData } = await axios.post(
        `${import.meta.env.VITE_API_URL}/auth/signup`,
        data
      );

      console.log(myData);
      setLoading(false);
      reset();
      setSuccess(true);
    } catch (error) {
      // console.log(error);
      setError(error.response.data.message);
      setLoading(false);
      setSuccess(false);
    }
  };

  const handleNext = () => {
    setStep(step + 1);
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100 auth-container ">
      <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-4 text-center">
          {step === 1 ? " Basic Information" : " Contact Information"}
        </h2>

        {error && <Alert color="red">{error}</Alert>}
        {success && (
          <Alert color="green">Your details have been submitted.</Alert>
        )}

        <form className="mt-4" onSubmit={handleSubmit(onSignUp)}>
          {step === 1 && (
            <section>
              <div className=" relative">
                <label className="block text-gray-700">First Name</label>
                <input
                  type="text"
                  className="w-full p-2 border rounded-lg mt-1 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  placeholder="Enter your full name"
                  {...register("firstName", { required: true })}
                />

                {errors.fullName && (
                  <p className=" text-xs text-red-500 absolute -bottom-4">
                    *Please enter your first name*
                  </p>
                )}
              </div>

              <div className=" relative mt-4">
                <label className="block text-gray-700">Last Name</label>
                <input
                  type="text"
                  className="w-full p-2 border rounded-lg mt-1 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  placeholder="Enter your full name"
                  {...register("lastName", { required: true })}
                />

                {errors.lastName && (
                  <p className=" text-xs text-red-500 absolute -bottom-4">
                    *Please enter your last name*
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
                  <option value="">Select your role</option>
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
                <label className="block text-gray-700">Gender</label>

                <select
                  name=""
                  id=""
                  className="w-full p-2 border rounded-lg mt-1 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  {...register("gender", { required: true })}
                >
                  <option value="">Select your gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="others">Others</option>
                </select>

                {errors.role && (
                  <p className=" text-xs text-red-500 absolute -bottom-4">
                    *Please select your role*
                  </p>
                )}
              </div>
            </section>
          )}

          {/* Step 2: Contact Information */}

          {step === 2 && (
            <section>
              <div className="mb-4">
                <label className="block text-gray-700">Phone Number</label>
                <input
                  type="tel"
                  {...register("phoneNumber", {
                    required: "Phone number is required",
                  })}
                  className="w-full p-2 border rounded-lg mt-1 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                {errors.phoneNumber && (
                  <p className="text-red-500 text-sm">
                    {errors.phoneNumber.message}
                  </p>
                )}
              </div>

              <div className="mb-4">
                <label className="block text-gray-700">Address</label>
                <input
                  type="text"
                  {...register("address", { required: "Address is required" })}
                  className="w-full p-2 border rounded-lg mt-1 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                {errors.address && (
                  <p className="text-red-500 text-sm">
                    {errors.address.message}
                  </p>
                )}
              </div>

              <div className="mb-4">
                <label className="block text-gray-700">
                  Emergency Contact Name
                </label>
                <input
                  type="text"
                  {...register("emergencyContactName", {
                    required: "Emergency Contact Name is required",
                  })}
                  className="w-full p-2 border rounded-lg mt-1 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                {errors.emergencyContactName && (
                  <p className="text-red-500 text-sm">
                    {errors.emergencyContactName.message}
                  </p>
                )}
              </div>

              <div className="mb-4">
                <label className="block text-gray-700">
                  Emergency Contact Phone
                </label>
                <input
                  type="tel"
                  {...register("emergencyContactNumber", {
                    required: "Emergency Contact Phone is required",
                  })}
                  className="w-full p-2 border rounded-lg mt-1 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                {errors.emergencyContactNumber && (
                  <p className="text-red-500 text-sm">
                    {errors.emergencyContactNumber.message}
                  </p>
                )}
              </div>
            </section>
          )}

          {step === 1 && (
            <button
              type="button"
              onClick={handleNext}
              className="w-full bg-green-500 text-white py-2 mt-7 rounded-lg hover:bg-green-600 transition"
            >
              Next
            </button>
          )}

          {step === 2 && (
            <button
              type="button"
              onClick={() => setStep(1)}
              className="w-full bg-green-500 text-white py-2 mt-7 rounded-lg hover:bg-green-600 transition"
            >
              Back
            </button>
          )}

          {step === 2 && (
            <button
              type="submit"
              className="w-full bg-green-500 text-white py-2 mt-7 rounded-lg hover:bg-green-600 transition"
              disabled={loading}
            >
              {loading ? "Registering..." : "Register"}
            </button>
          )}
        </form>
      </div>
    </div>
  );
};

export default SignUp;
