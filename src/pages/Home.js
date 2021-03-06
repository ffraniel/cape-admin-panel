import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import LoadingSpinner from "../components/LoadingSpinner";
import Error from "../components/Error";

function Home() {
  const [userList, setUserList] = useState(null);
  const [loadingUsers, setLoadingUsers] = useState(false);
  const [error, setError] = useState(null);
  const [usersLength, setUsersLength] = useState(null);
  const [mostRecent, setMostRecent] = useState(null);

  useEffect(() => {
    let storedPassword = window.localStorage.getItem("password");

    setLoadingUsers(true);
    fetch("https://playful-easy-damselfly.glitch.me/api/allusers", {
      mode: "cors",
      headers: {
        Authorization: "Bearer " + storedPassword,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        let sorted = data.users.sort((a, b) => {
          return a.metadata.creationTime > b.metadata.creationTime;
        });
        setUsersLength(sorted.length);
        sorted.length = 5;
        setMostRecent(sorted);
        setUserList(data.users);
        setLoadingUsers(false);
      })
      .catch((error) => {
        console.log("error", error.message);
        setError(error.message);
        setLoadingUsers(false);
      });
  }, []);

  return (
    <div className="mx-16 pt-12 pb-12 min-h-screen">
      <h2 className="text-3xl text-gray-700 font-bold py-2 my-2">
        CAPE Website Dashboard
      </h2>
      <p className="text-xl text-gray-600 my-1">
        What do you want to do today?
      </p>
      <div className="mt-8 rounded flex place-content-between">
        <Link
          className="rounded place-self-center bg-green-200 h-44 flex-1 mx-4 flex shadow-lg"
          to="/add"
        >
          <div className="place-self-center mx-auto rounded p-6 hover:bg-green-500">
            <h1 className="text-gray-700 font-bold text-2xl inline">Add</h1>
            <svg
              className="w-12 inline mb-2 mx-1"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 6v6m0 0v6m0-6h6m-6 0H6"
              />
            </svg>
            <h3 className="text-gray-600">Add A New User</h3>
          </div>
        </Link>
        <Link
          className="rounded place-self-center bg-green-200 h-44 flex-1 shadow-lg mx-4 flex "
          to="/remove"
        >
          <div className="place-self-center mx-auto rounded p-6 hover:bg-green-500">
            <h1 className="text-gray-700 font-bold text-2xl inline">Remove</h1>
            <svg
              className="w-12 inline mb-2 mx-1"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <h3 className="text-gray-600">Remove A Current User</h3>
          </div>
        </Link>
        <Link
          className="rounded place-self-center bg-green-200 h-44 flex-1 shadow-lg mx-4 flex"
          to="/users"
        >
          <div className="place-self-center mx-auto rounded p-6 hover:bg-green-500">
            <h1 className="text-gray-700 font-bold text-2xl inline">Users</h1>
            <svg
              className="w-12 inline mb-2 mx-1"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 10h16M4 14h16M4 18h16"
              />
            </svg>
            <h3 className="text-gray-600">See All User</h3>
          </div>
        </Link>
      </div>
      {error && <Error error={error} />}

      <section className="mt-4 py-8 px-4">
        <h3 className="text-xl text-gray-700">
          Number of users: <span> </span>
          {loadingUsers && (
            <h3 className="text-green-500 font-bold">Loading</h3>
          )}
          {!loadingUsers && userList && (
            <span className="text-grey-800">
              <Link className="underline" to="/users">
                {usersLength}
              </Link>
            </span>
          )}
        </h3>

        <div>
          <h3 className="text-gray-800">Latest users added</h3>
          <ul className="rounded overflow-hidden my-2">
            {loadingUsers && <LoadingSpinner />}
            {!loadingUsers &&
              mostRecent &&
              mostRecent.map((user, i) => {
                let colourOptions = {
                  0: "bg-red-400",
                  1: "bg-red-300",
                  2: "bg-red-200",
                  3: "bg-red-100",
                  4: "bg-red-50",
                };
                return (
                  <li className={`flex ${colourOptions[i]} py-3`}>
                    <p className="flex-1 ml-4">{user.email}</p>
                    <p className="ml-auto px-4 w-1/3">
                      created:{" "}
                      <span>{user.metadata.creationTime || " - "}</span>{" "}
                    </p>
                  </li>
                );
              })}
          </ul>
        </div>
      </section>
      <div classname="bg-blue-200">
        <Link
          className="text-gray-100 bg-gray-800 py-2 px-3 rounded m-4 hover:bg-gray-400 hover:text-gray-800"
          to="/users"
        >
          See all users
        </Link>
      </div>
    </div>
  );
}

export default Home;
