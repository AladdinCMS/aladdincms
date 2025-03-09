import { Button, Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import axios from "axios";
import { useState } from "react";

export default function DeleteUserModal({
  close,
  isOpen,
  user,
  refreshUserList,
}) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleDelete = async () => {
    setLoading(true);
    setError(null);
    try {
      await axios.delete(
        `${import.meta.env.VITE_API_URL}/auth/delete-a-user/${user._id}`
      );

      setLoading(false);
      close();
      refreshUserList();
    } catch (error) {
      // console.log(error);
      setError(error.response.data.message);
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
                Are you sure you want to delete this user?
              </DialogTitle>

              <div className="mt-4 flex justify-center items-center gap-5">
                <Button
                  className="inline-flex items-center gap-2 rounded-md bg-white py-1.5 px-3 text-sm/6 font-semibold text-red-600 shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-white data-[focus]:outline-1 data-[focus]:outline-white data-[open]:bg-white"
                  onClick={close}
                >
                  NO
                </Button>

                <Button
                  type="submit"
                  className="inline-flex items-center gap-2 rounded-md bg-red-700 py-1.5 px-3 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-red-600 data-[focus]:outline-1 data-[focus]:outline-white data-[open]:bg-red-700"
                  onClick={handleDelete}
                  disabled={loading}
                >
                  {loading ? "..." : "YES"}
                </Button>
              </div>
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </>
  );
}
