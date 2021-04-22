import { useState } from "react";
import Error from "../components/Error";
import Loading from "../components/Loading";
import LoadingSpinner from "../components/LoadingSpinner";

const PasswordInput = ({ setHasPassword }) => {
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    checkPassword();
  }

  function checkPassword() {
    return fetch("https://playful-easy-damselfly.glitch.me/api/password", {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + password,
      },
    })
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        window.localStorage.setItem("password", password.toString());
        setHasPassword(true);
        setLoading(false);
      });
  }

  return (
    <div className="flex h-screen bg-gradient-to-r from-indigo-100 to-green-50">
      {loading && <Loading />}
      {loading && <LoadingSpinner />}
      {!error && !loading && (
        <div className="m-auto bg-green-400 py-16 px-32 rounded">
          <h1 className="text-green-700 text-4xl">CAPE Admin</h1>
          <h3 className="font-size-3xl font-bold my-2 block mx-auto self-center">
            Password Required
          </h3>
          <input
            className="py-1 px-2 rounded font-size-lg"
            type="password"
            name="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            autofocus="true"
          />
          <button
            className="bg-gray-700 hover:bg-gray-300 text-gray-300 hover:text-gray-800 py-1 px-2 rounded mx-auto m-2 block"
            onClick={handleSubmit}
          >
            Save Password
          </button>
        </div>
      )}
      {error && (
        <div className="m-auto bg-green-400 py-16 px-32 rounded">
          <Error error={error} />
        </div>
      )}
    </div>
  );
};

export default PasswordInput;
