import { useState } from "react";
import Loading from "../components/Loading";
import LoadingSpinner from "../components/LoadingSpinner";
import Error from "../components/Error";

const DeletePopup = ({ deleteCandidate, setDeleteCandidate, refreshUsers }) => {
  const [emailInput, setEmailInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);

  function handleSubmitDelete(e) {
    e.preventDefault();
    setLoading(true);
    let storedPassword = window.localStorage.getItem("password");

    return fetch(
      `https://playful-easy-damselfly.glitch.me/api/user/delete/${deleteCandidate.uid}`,
      {
        method: "DELETE",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + storedPassword,
        },
      }
    )
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        if (res.error) {
          setError(res);
        } else {
          setSuccess(true);
          setLoading(false);
        }
      })
      .catch((error) => {
        console.log("Delete Error: ", error);
        setLoading(false);
        setError(error.message);
      });
  }

  return (
    <>
      <div className="fixed w-screen h-screen bg-gray-500 opacity-75"></div>
      <div className="fixed w-screen h-screen z-50">
        <div className="rounded bg-green-400 p-16 w-1/2 ml-32 mt-32">
          {!error && !loading && !success && (
            <>
              <div className="m-8">
                <h1 className="text-4xl text-red-700 font-extrabold bg-white inline px-3 rounded-sm">
                  WARNING
                </h1>
                <h3 className="text-gray-700 text-xl mt-2">
                  You will be deleting
                  <span className="text-gray-800 font-bold block">
                    {" "}
                    {deleteCandidate.email}{" "}
                  </span>
                </h3>
                <h3 className="text-gray-700 text-xl my-2">
                  Please type their full email to confirm
                </h3>
                <input
                  className="my-1 p-2 rounded text-lg"
                  type="email"
                  placeholder="Confirm Email"
                  name="email"
                  value={emailInput}
                  onChange={(e) => {
                    setEmailInput(e.target.value);
                  }}
                />

                <button
                  disabled={deleteCandidate.email !== emailInput}
                  className={`ml-16 text-gray-200 text-xl rounded w-32 p-1 ${
                    deleteCandidate.email === emailInput
                      ? "bg-green-700  hover:bg-green-800"
                      : "bg-red-700 hover:bg-red-800"
                  }`}
                  onClick={handleSubmitDelete}
                >
                  Delete User
                </button>
              </div>
              <button
                className="mx-8 bg-gray-800 text-gray-200 rounded px-6 py-1 hover:text-gray-800 hover:bg-gray-300"
                onClick={(e) => {
                  e.preventDefault();
                  setDeleteCandidate(null);
                }}
              >
                close
              </button>
            </>
          )}

          {success && (
            <div className="">
              <h1 className="text-3xl text-green-800 my-1 block font-bold">
                User Deleted
              </h1>
              <h3 className="text-gray-700 text-xl">
                You deleted user
                <span className="text-gray-800 block font-bold">
                  {deleteCandidate.email}
                </span>
                <p className="text-gray-800 my-1">
                  Remember to go to remove the user from the CAPE Forum if they
                  are a member.
                </p>
              </h3>
              <button
                className="my-2 bg-gray-800 text-gray-200 rounded px-6 py-1 hover:text-gray-800 hover:bg-gray-300"
                onClick={(e) => {
                  e.preventDefault();
                  setSuccess(null);
                  setDeleteCandidate(null);
                  //trigger reload on users page
                  refreshUsers();
                }}
              >
                close
              </button>
            </div>
          )}
          {error && <Error error={error} />}
          {loading && <Loading />}
          {loading && <LoadingSpinner />}
        </div>
      </div>
    </>
  );
};

export default DeletePopup;
