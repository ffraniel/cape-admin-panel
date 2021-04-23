import { useState } from "react";
import Loading from "../components/Loading";
import LoadingSpinner from "../components/LoadingSpinner";
import Error from "../components/Error";

function Remove() {
  const [emailInput, setEmailInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(null);
  const [deleteCandidate, setDeleteCandidate] = useState(null);
  const [error, setError] = useState(null);

  function selectDeleteCandidate(e) {
    e.preventDefault();
    let storedPassword = window.localStorage.getItem("password");
    setLoading(true);
    //get all users to confirm they exist in list
    fetch("https://playful-easy-damselfly.glitch.me/api/allusers", {
      mode: "cors",
      headers: {
        Authorization: "Bearer " + storedPassword,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setLoading(false);
        //show user and ask for confirmation
        let match = data.users.filter((user) => user.email === emailInput)[0];
        if (!match) {
          setError(
            "No user in the database with that email. Check the user list to confirm."
          );
        } else {
          if (match.email) {
            setDeleteCandidate(match);
          } else {
            setError(
              "No user in the database with that email. Check the user list to confirm."
            );
          }
        }
      })
      .catch((error) => {
        console.log("Error getting all users", error);
        setError(error.message);
        setLoading(false);
      });
  }

  function confirmDelete(e) {
    e.preventDefault();
    let storedPassword = window.localStorage.getItem("password");
    setLoading(true);
    fetch(
      `https://playful-easy-damselfly.glitch.me/api/user/delete/${deleteCandidate.uid}`,
      {
        mode: "cors",
        method: "DELETE",
        headers: {
          Authorization: "Bearer " + storedPassword,
        },
      }
    )
      .then((res) => res.json())
      .then((res) => {
        setSuccess(true);
        setLoading(false);
        console.log("this");
      })
      .catch((error) => {
        console.log("Error deleting user", error);
        setError(error.message);
        setLoading(false);
      });
  }

  const resetForm = (e) => {
    e.preventDefault();
    setLoading(false);
    setSuccess(false);
    setError(null);
    setEmailInput("");
    setDeleteCandidate(null);
  };

  return (
    <div className="h-screen ml-16 pt-12">
      <div className="container">
        <h2 className="text-3xl p-2 my-2 font-bold  text-gray-700">
          Remove Member
        </h2>

        {!error && !success && !loading && !deleteCandidate && (
          <form
            onSubmit={selectDeleteCandidate}
            className="rounded p-12 bg-red-400 w-4/12 shadow-lg"
          >
            <input
              className="rounded p-2"
              type="email"
              value={emailInput}
              required
              name="emailInput"
              placeholder="Type Email here"
              onChange={(e) => {
                setEmailInput(e.target.value);
              }}
            />
            <input
              className="text-gray-100 bg-gray-800 py-2 px-3 rounded my-2 hover:bg-gray-400 hover:text-gray-800"
              type="submit"
              value="Remove Member"
            />
          </form>
        )}

        {!error && !loading && !success && deleteCandidate && (
          <div className="rounded p-12 bg-red-400 w-4/12 shadow-lg">
            <h1 className="text-4xl text-red-700 font-extrabold bg-white inline px-3 rounded-sm">
              WARNING
            </h1>
            <h3 className="text-gray-700 text-xl mt-2">
              You will be deleting
              <span className="text-gray-800 font-bold block">
                {deleteCandidate.email}
              </span>
            </h3>
            <button
              className="text-gray-100 bg-red-700 py-2 px-3 rounded m-1 mt-2 hover:bg-red-800"
              onClick={confirmDelete}
            >
              Confirm Deleting
            </button>
            <button
              className="text-gray-100 bg-green-500 py-2 px-3 rounded m-1 mt-2 ml-2 hover:bg-green-600"
              onClick={resetForm}
            >
              CANCEL
            </button>
          </div>
        )}

        {!error && !loading && success && deleteCandidate && (
          <div className="rounded bg-blue-300 p-8 inline-block">
            <h3 className="text-gray-600 text-xl m-1">Member deleted</h3>
            <h1 className="text-gray-700 text-2xl m-1">
              {deleteCandidate.email}
            </h1>
            <div className="w-96 my-2">
              <p className="text-gray-800">
                Remember to go to remove the user from the CAPE Forum if they
                are a member.
              </p>
            </div>
            <button
              className="text-gray-100 bg-gray-800 py-2 px-3 rounded m-1 hover:bg-gray-400 hover:text-gray-800"
              onClick={resetForm}
            >
              Delete another member
            </button>
          </div>
        )}
        {error && <Error resetForm={resetForm} error={error} />}

        {loading && <Loading />}
        {loading && <LoadingSpinner />}
      </div>
    </div>
  );
}

export default Remove;
