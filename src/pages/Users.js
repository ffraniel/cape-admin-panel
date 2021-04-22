import { useEffect, useState } from "react";
import Loading from "../components/Loading";
import LoadingSpinner from "../components/LoadingSpinner";
import Error from "../components/Error";

function Add() {
  const [allUsers, setAllUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

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
        console.log("Error with fetching users list", error);
        setError(error.message);
        setLoading(false);
      });
  }, []);

  return (
    <div className="h-screen ml-16 pt-12">
      <div className="container">
        <div className="h-screen ml-16 pt-12">
          <div className="container">
            <h2 className="text-3xl p-2 my-2 font-bold text-gray-700">
              Users List
            </h2>
            <div className="mr-16 my-4 shadow-lg">
              <ul>
                {loading && <Loading />}
                {loading && <LoadingSpinner />}
                {!loading &&
                  allUsers.length > 0 &&
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
                          }}
                        >
                          edit details
                        </button>
                        <button
                          className="bg-gray-600 hover:bg-red-700 text-gray-100 p-1 px-2 rounded mx-2 my-0.5"
                          onClick={(e) => {
                            e.preventDefault();
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
      </div>
    </div>
  );
}

export default Add;
