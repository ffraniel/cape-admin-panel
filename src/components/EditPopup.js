import { useState } from "react";
import Loading from "../components/Loading";
import LoadingSpinner from "../components/LoadingSpinner";
import Error from "../components/Error";

const EditPopup = ({ editingUser, setEditingUser, refreshUsers }) => {
  const [editing, setEditing] = useState(null);
  const [editValue, setEditValue] = useState(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(null);
  const [successInfo, setSuccessInfo] = useState(null);
  const [error, setError] = useState(null);

  function handleSetEditing(valueToEdit, initialValue) {
    setEditing(valueToEdit);
    if (valueToEdit === "email") {
      setEditValue(initialValue);
    }
  }

  function handleEditSubmit(e) {
    e.preventDefault();
    setLoading(true);
    let storedPassword = window.localStorage.getItem("password");

    let data = JSON.stringify({
      field: editing,
      value: editValue,
    });

    return fetch(
      `https://playful-easy-damselfly.glitch.me/api/edit/${editingUser.uid}`,
      {
        method: "POST", // *GET, POST, PUT, DELETE, etc.
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + storedPassword,
        },
        body: data,
      }
    )
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        if (res.error) {
          setError(res);
        } else {
          setSuccessInfo(res);
          setSuccess(true);
          setLoading(false);
          setEditing(null);
          setEditValue(null);
        }
      })
      .catch((error) => {
        console.log("Edit Error: ", error);
        setLoading(false);
        setError(error.message);
      });
  }

  function handleValueChange(e) {
    setEditValue(e.target.value);
  }

  function handleBack(e) {
    e.preventDefault();
    setEditing(null);
    setEditValue(null);
  }

  function handleEnter(e) {
    if (e.code === "Enter") {
      handleEditSubmit(e);
    }
  }

  return (
    <>
      <div className="fixed w-screen h-screen bg-gray-500 opacity-75"></div>
      <div className="fixed w-screen h-screen z-50">
        <div className="rounded bg-green-400 p-16 w-1/2 ml-32 mt-32">
          {!error && !loading && !success && (
            <>
              <div className="flex m-8">
                {editing && editing === "email" && (
                  <div className="flex flex-wrap">
                    <input
                      className="px-2 py-1 w-72"
                      type="email"
                      value={editValue}
                      onChange={handleValueChange}
                      onKeyPress={handleEnter}
                      placeholder="Email"
                      name="email"
                    />
                    <input
                      className="ml-2 my-2 block lg:ml-6 lg:inline py-1 bg-gray-800 text-gray-200 rounded w-32 hover:text-gray-800 hover:bg-gray-300"
                      type="submit"
                      value="Save Changes"
                      onClick={handleEditSubmit}
                    />
                    <button
                      className="ml-2 my-2 block lg:inline py-1 bg-gray-800 text-gray-200 rounded w-32 hover:text-gray-800 hover:bg-gray-300"
                      onClick={handleBack}
                    >
                      Back
                    </button>
                  </div>
                )}
                {!editing && (
                  <>
                    <h2 className="px-2 py-1 text-gray-800 rounded mr-4 text-xl">
                      {editingUser.email}
                    </h2>
                    <button
                      className="ml-auto bg-gray-800 text-gray-200 rounded w-32 hover:text-gray-800 hover:bg-gray-300"
                      onClick={() => {
                        handleSetEditing("email", editingUser.email);
                      }}
                    >
                      Edit Email
                    </button>
                  </>
                )}
              </div>

              <div className="flex m-8">
                {editing && editing === "password" && (
                  <div className="flex">
                    <input
                      className="px-2 py-1 w-72"
                      type="password"
                      value={editValue}
                      onChange={handleValueChange}
                      onKeyPress={handleEnter}
                      placeholder="Password"
                      name="password"
                    />
                    <input
                      className="ml-2 my-2 block lg:ml-6 lg:inline py-1 bg-gray-800 text-gray-200 rounded w-32 hover:text-gray-800 hover:bg-gray-300"
                      type="submit"
                      value="Save Changes"
                      onClick={handleEditSubmit}
                    />
                    <button
                      className="ml-2 my-2 block lg:inline py-1 bg-gray-800 text-gray-200 rounded w-32 hover:text-gray-800 hover:bg-gray-300"
                      onClick={handleBack}
                    >
                      Back
                    </button>
                  </div>
                )}
                {!editing && (
                  <>
                    <h2 className="px-2 py-1 text-gray-800 rounded mr-4 text-xl">
                      PASSWORD *******
                    </h2>
                    <button
                      className="ml-auto bg-gray-800 text-gray-200 rounded w-32 hover:text-gray-800 hover:bg-gray-300"
                      onClick={() => {
                        handleSetEditing("password");
                      }}
                    >
                      Edit Password
                    </button>
                  </>
                )}
              </div>

              <button
                className="mx-8 bg-gray-800 text-gray-200 rounded px-6 py-1 hover:text-gray-800 hover:bg-gray-300"
                onClick={(e) => {
                  e.preventDefault();
                  setEditing(null);
                  setEditingUser(null);
                }}
              >
                close
              </button>
            </>
          )}
          {success && (
            <div className="">
              <h1 className="text-3xl text-green-800 px-1 my-1 block">
                Change Saved
              </h1>
              <h3 className="text-gray-700 text-xl">
                You updated the user's
                <span className="text-gray-800 font-bold">
                  {" "}
                  {successInfo.field}{" "}
                </span>
                of user
                <span className="text-gray-800 block font-bold">
                  {successInfo.user.email}
                </span>
              </h3>
              <button
                className="my-2 bg-gray-800 text-gray-200 rounded px-6 py-1 hover:text-gray-800 hover:bg-gray-300"
                onClick={(e) => {
                  e.preventDefault();
                  setSuccess(null);
                  setSuccessInfo(null);
                  setEditingUser(null);
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

export default EditPopup;
