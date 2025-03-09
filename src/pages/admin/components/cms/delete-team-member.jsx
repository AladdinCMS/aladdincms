import { Button, Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { Alert } from "@material-tailwind/react";
import axios from "axios";
import { useState } from "react";
import Cookies from 'js-cookie';

export default function DeleteTeamMemberModal({
  close,
  isOpen,
  teamMember,
  refreshTeamMemberList,
}) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleDelete = async () => {
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
      
      await axios.delete(
        `${import.meta.env.VITE_API_URL}/auth/admin/delete-admin/${teamMember._id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      setLoading(false);
      close();
      refreshTeamMemberList();
    } catch (error) {
      setError(error.response?.data?.message || "An error occurred while deleting team member");
      setLoading(false);
    }
  };

  return (
    <>
      <Dialog
        open={isOpen}
        as="div"
        className="relative z-10 focus:outline-none bg-black"
        onClose={close}
        __demoMode
      >
        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <DialogPanel
              transition
              className="w-full max-w-xl rounded-xl bg-green-600 p-6 backdrop-blur-2xl duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0"
            >
              {error && <Alert color="red">{error}</Alert>}
              <DialogTitle
                as="h3"
                className="text-base/7 font-bold text-center text-white"
              >
                Are you sure you want to delete this team member?
              </DialogTitle>
              {teamMember && (
                <div className="mt-4 bg-white p-4 rounded-lg">
                  <p className="text-center text-gray-700">
                    <span className="font-bold">Name:</span> {teamMember.firstName} {teamMember.lastName}
                  </p>
                  <p className="text-center text-gray-700">
                    <span className="font-bold">Email:</span> {teamMember.email}
                  </p>
                  <p className="text-center text-gray-700">
                    <span className="font-bold">Role:</span> {teamMember.role}
                  </p>
                </div>
              )}
              <div className="mt-4 flex justify-center items-center gap-5">
                <Button
                  className="inline-flex items-center gap-2 rounded-md bg-white py-1.5 px-3 text-sm/6 font-semibold text-green-600 shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-white data-[focus]:outline-1 data-[focus]:outline-white data-[open]:bg-white"
                  onClick={close}
                >
                  CANCEL
                </Button>
                <Button
                  type="submit"
                  className="inline-flex items-center gap-2 rounded-md bg-red-700 py-1.5 px-3 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-red-600 data-[focus]:outline-1 data-[focus]:outline-white data-[open]:bg-red-700"
                  onClick={handleDelete}
                  disabled={loading}
                >
                  {loading ? "DELETING..." : "DELETE"}
                </Button>
              </div>
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </>
  );
}