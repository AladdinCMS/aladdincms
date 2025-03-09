import { Button, Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { Alert } from "@material-tailwind/react";
import axios from "axios";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import Cookies from 'js-cookie';

export default function EditTeamMemberModal({
  close,
  isOpen,
  teamMember,
  refreshTeamMemberList,
}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (teamMember && isOpen) {
      // Set form values when team member data is available
      setValue("firstName", teamMember.firstName || "");
      setValue("lastName", teamMember.lastName || "");
      setValue("email", teamMember.email || "");
      setValue("role", teamMember.role || "");
      setValue("gender", teamMember.gender || "");
      setValue("phoneNumber", teamMember.phoneNumber || "");
      setValue("address", teamMember.address || "");
    }
  }, [teamMember, isOpen, setValue]);

  const onSubmit = async (data) => {
    setLoading(true);
    setError(null);
    try {
      // Get the token from cookies based on role
      const superAdminToken = Cookies.get('super admin');
      const adminToken = Cookies.get('admin');
      const token = superAdminToken || adminToken;
      
      if (!token) {
        setError("Not authenticated. Please log in again.");
        setLoading(false);
        return;
      }
      
      // Create a new object with only the fields we want to update
      const updateData = {
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        role: data.role,
        gender: data.gender,
        phoneNumber: data.phoneNumber,
        address: data.address
      };
      
      // Only include password in the update if it was provided
      if (data.password && data.password.trim() !== '') {
        updateData.password = data.password;
      }

      const { data: myData } = await axios.patch(
        `${import.meta.env.VITE_API_URL}/auth/admin/update-admin/${teamMember._id}`,
        updateData,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      console.log(myData);

      setLoading(false);
      setSuccess(true);
      
      // Close modal and refresh user list after short delay
      setTimeout(() => {
        close();
        refreshTeamMemberList();
      }, 1500);
      
    } catch (error) {
      setError(error.response?.data?.message || "An error occurred while updating team member");
      setLoading(false);
      setSuccess(false);
    }
  };

  return (
    <main>
      <Dialog
        open={isOpen}
        as="div"
        className="relative z-10 focus:outline-none bg-black"
        onClose={close}
        __demoMode
      >
        <div className="fixed inset-0 z-10 w-screen overflow-y-auto mt-5">
          <div className="flex min-h-full items-center justify-center p-4">
            <DialogPanel
              transition
              className="w-full max-w-xl rounded-xl bg-green-600 p-6 backdrop-blur-2xl duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0"
            >
              <DialogTitle
                as="h3"
                className="text-base/7 text-white text-center mb-5 font-bold"
              >
                Edit Team Member
              </DialogTitle>
              <section>
                <div className="flex items-center justify-center bg-gray-100 ">
                  <div className="w-full max-w-xl bg-white p-6 rounded-lg shadow-md">
                    <h2 className="text-2xl font-bold mb-4 text-center">
                      Team Member Information
                    </h2>

                    {error && <Alert color="red">{error}</Alert>}
                    {success && (
                      <Alert color="green">
                        Team member has been updated successfully.
                      </Alert>
                    )}

                    <form className="mt-4" onSubmit={handleSubmit(onSubmit)}>
                      <div className="relative">
                        <label className="block text-gray-700">
                          First Name
                        </label>
                        <input
                          type="text"
                          className="w-full p-2 border rounded-lg mt-1 focus:outline-none focus:ring-2 focus:ring-blue-400"
                          placeholder="Enter first name"
                          {...register("firstName", { required: true })}
                        />
                        {errors.firstName && (
                          <p className="text-xs text-red-500 absolute -bottom-4">
                            *Please enter first name*
                          </p>
                        )}
                      </div>

                      <div className="relative mt-6">
                        <label className="block text-gray-700">
                          Last Name
                        </label>
                        <input
                          type="text"
                          className="w-full p-2 border rounded-lg mt-1 focus:outline-none focus:ring-2 focus:ring-blue-400"
                          placeholder="Enter last name"
                          {...register("lastName", { required: true })}
                        />
                        {errors.lastName && (
                          <p className="text-xs text-red-500 absolute -bottom-4">
                            *Please enter last name*
                          </p>
                        )}
                      </div>

                      <div className="mt-6 relative">
                        <label className="block text-gray-700">Email</label>
                        <input
                          type="email"
                          className="w-full p-2 border rounded-lg mt-1 focus:outline-none focus:ring-2 focus:ring-blue-400"
                          placeholder="Enter email"
                          {...register("email", { required: true })}
                        />
                        {errors.email && (
                          <p className="text-xs text-red-500 absolute -bottom-4">
                            *Please enter email address*
                          </p>
                        )}
                      </div>

                      <div className="mt-6 relative">
                        <label className="block text-gray-700">Password (Leave blank to keep current password)</label>
                        <input
                          type="password"
                          className="w-full p-2 border rounded-lg mt-1 focus:outline-none focus:ring-2 focus:ring-blue-400"
                          placeholder="Enter new password"
                          {...register("password")}
                        />
                      </div>

                      <div className="mt-6 relative">
                        <label className="block text-gray-700">Role</label>
                        <select
                          className="w-full p-2 border rounded-lg mt-1 focus:outline-none focus:ring-2 focus:ring-blue-400"
                          {...register("role", { required: true })}
                        >
                          <option value="">Select role</option>
                          <option value="admin">Admin</option>
                          <option value="super admin">Super Admin</option>
                        </select>
                        {errors.role && (
                          <p className="text-xs text-red-500 absolute -bottom-4">
                            *Please select role*
                          </p>
                        )}
                      </div>

                      <div className="mt-6 relative">
                        <label className="block text-gray-700">
                          Gender
                        </label>
                        <select
                          className="w-full p-2 border rounded-lg mt-1 focus:outline-none focus:ring-2 focus:ring-blue-400"
                          {...register("gender")}
                        >
                          <option value="">Select gender</option>
                          <option value="male">Male</option>
                          <option value="female">Female</option>
                          <option value="other">Other</option>
                        </select>
                      </div>

                      <div className="mt-6 relative">
                        <label className="block text-gray-700">
                          Phone Number
                        </label>
                        <input
                          type="tel"
                          className="w-full p-2 border rounded-lg mt-1 focus:outline-none focus:ring-2 focus:ring-blue-400"
                          placeholder="Enter phone number"
                          {...register("phoneNumber")}
                        />
                      </div>

                      <div className="mt-6 relative">
                        <label className="block text-gray-700">
                          Address
                        </label>
                        <input
                          type="text"
                          className="w-full p-2 border rounded-lg mt-1 focus:outline-none focus:ring-2 focus:ring-blue-400"
                          placeholder="Enter address"
                          {...register("address")}
                        />
                      </div>

                      <div className="mt-8 flex space-x-4">
                        <button
                          type="button"
                          onClick={close}
                          className="w-1/2 bg-gray-300 text-gray-800 py-2 rounded-lg hover:bg-gray-400 transition"
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          className="w-1/2 bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 transition"
                          disabled={loading}
                        >
                          {loading ? "Updating..." : "Update Team Member"}
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </section>
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </main>
  );
}