import { useEffect, useState } from "react";
import Loading from "../components/Loading";
import LoadingSpinner from "../components/LoadingSpinner";
import Error from "../components/Error";
import EditPopup from "../components/EditPopup";
import DeletePopup from "../components/DeletePopup";

function Users() {
  const [searchInput, setSearchInput] = useState("");
  const [allUsers, setAllUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [editingUser, setEditingUser] = useState(null);
  const [deleteCandidate, setDeleteCandidate] = useState(null);

  useEffect(() => {
    let storedPassword = window.localStorage.getItem("password");
    setLoading(true);
    fetch("https://playful-easy-damselfly.glitch.me/api/allusers", {
      mode: "cors",
      headers: {
        Authorization: "Bearer " + storedPassword,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        let sortedData = data.users
          .filter((user) => user.email)
          .sort((a, b) => {
            return a.email > b.email;
          });
        setAllUsers(sortedData);
        setLoading(false);
      })
      .catch((error) => {
        console.log("Error with new user creation", error);
        setError(error.message);
        setLoading(false);
      });
  }, []);

  function handleSearchInput(e) {
    setSearchInput(e.target.value);
  }

  function resetSearch() {
    setSearchInput("");
  }

  function refreshUsers() {
    let storedPassword = window.localStorage.getItem("password");
    setLoading(true);
    fetch("https://playful-easy-damselfly.glitch.me/api/allusers", {
      mode: "cors",
      headers: {
        Authorization: "Bearer " + storedPassword,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        let sortedData = data.users
          .filter((user) => user.email)
          .sort((a, b) => {
            return a.email > b.email;
          });
        setAllUsers(sortedData);
        setLoading(false);
      })
      .catch((error) => {
        console.log("Error with new user creation", error);
        setError(error);
        setLoading(false);
      });
  }

  return (
    <div className="ml-16 pt-12 pb-12 min-h-screen">
      {editingUser && (
        <EditPopup
          editingUser={editingUser}
          setEditingUser={setEditingUser}
          refreshUsers={refreshUsers}
        />
      )}
      {deleteCandidate && (
        <DeletePopup
          deleteCandidate={deleteCandidate}
          setDeleteCandidate={setDeleteCandidate}
          refreshUsers={refreshUsers}
        />
      )}

      <div className="container">
        <h2 className="text-3xl p-2 my-2 font-bold text-gray-700">
          Users List
        </h2>

        <div className="flex">
          <input
            className="rounded p-2 text-lg"
            type="text"
            placeholder="search"
            value={searchInput}
            onChange={handleSearchInput}
          />
          <button
            onClick={resetSearch}
            className="text-red-600 text-3xl p-1 bg-gray-700 rounded-sm ml-6 w-12 hover:bg-gray-800 hover:text-red-500"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
          {searchInput.length > 0 && (
            <p className="font-bold text-xl ml-8 mt-2">
              Filter Active
              <svg
                className="inline mx-2 w-4 h-4 text-blue-800"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
                />
              </svg>
            </p>
          )}
        </div>

        <div className="mr-16 my-4 shadow-lg">
          <ul>
            {loading && <Loading />}
            {loading && <LoadingSpinner />}
            {!loading &&
              allUsers.length > 0 &&
              searchInput.length === 0 &&
              allUsers.map((user, i) => (
                <li
                  className={`flex py-3 ${
                    i % 2 ? "bg-green-50" : "bg-green-200"
                  }`}
                  key={user.email}
                >
                  <p className="px-4 text-gray-700 w-1/4">{user.email}</p>
                  <p className="ml-auto px-4 border-r border-gray-600 text-gray-600 text-xs font-bold w-1/4">
                    Created:
                    <span className="text-gray-600">
                      {" "}
                      {user.metadata.creationTime || " - "}
                    </span>
                  </p>
                  <p className="px-4 border-r border-gray-600 text-gray-600 text-xs font-bold w-1/4">
                    Updated:
                    <span className="text-gray-600">
                      {" "}
                      {user.metadata.lastSignInTime || " - "}
                    </span>
                  </p>
                  <div className="inline-block px-4 w-1/5">
                    <button
                      className="bg-gray-600 hover:bg-gray-800 text-gray-100 p-1 px-2 rounded mx-2 my-0.5"
                      onClick={(e) => {
                        e.preventDefault();
                        setEditingUser(user);
                      }}
                    >
                      edit details
                    </button>
                    <button
                      className="bg-gray-600 hover:bg-red-700 text-gray-100 p-1 px-2 rounded mx-2 my-0.5"
                      onClick={(e) => {
                        e.preventDefault();
                        setDeleteCandidate(user);
                      }}
                    >
                      delete
                    </button>
                  </div>
                </li>
              ))}
            {!loading &&
              allUsers.length > 0 &&
              searchInput.length > 0 &&
              allUsers
                .filter((user) => {
                  // when search filter is active
                  let comparisonEmail = [];
                  for (var i = 0; i < searchInput.length; i++) {
                    if (user.email[i]) {
                      comparisonEmail.push(user.email[i]);
                    }
                  }
                  let comparisonString = comparisonEmail.join("").toString();
                  return comparisonString === searchInput;
                })
                .map((user, i) => (
                  <li
                    className={`flex py-2 ${
                      i % 2 ? "bg-green-50" : "bg-green-200"
                    }`}
                    key={user.email}
                  >
                    <p className="px-4 text-gray-700 w-1/4">{user.email}</p>
                    <p className="ml-auto px-4 border-r border-gray-600 text-gray-600 text-xs font-bold w-1/4">
                      Created:
                      <span className="text-gray-600">
                        {" "}
                        {user.metadata.creationTime || " - "}
                      </span>
                    </p>
                    <p className="px-4 border-r border-gray-600 text-gray-600 text-xs font-bold w-1/4">
                      Updated:
                      <span className="text-gray-600">
                        {" "}
                        {user.metadata.lastSignInTime || " - "}
                      </span>
                    </p>
                    <div className="inline-block px-4 w-1/5">
                      <button
                        className="bg-gray-600 hover:bg-gray-800 text-gray-100 p-1 px-2 rounded mx-2 my-0.5"
                        onClick={(e) => {
                          e.preventDefault();
                          setEditingUser(user);
                        }}
                      >
                        edit details
                      </button>
                      <button
                        className="bg-gray-600 hover:bg-red-700 text-gray-100 p-1 px-2 rounded mx-2 my-0.5"
                        onClick={(e) => {
                          e.preventDefault();
                          setDeleteCandidate(user);
                        }}
                      >
                        delete
                      </button>
                    </div>
                  </li>
                ))}
            {!loading && allUsers.length === 0 && (
              <h1 className="text-red-600">Error, failed to load users.</h1>
            )}
            {error && <Error error={error} />}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Users;
