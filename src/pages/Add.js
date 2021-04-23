import { useState } from "react";
import Loading from "../components/Loading";
import LoadingSpinner from "../components/LoadingSpinner";
import Error from "../components/Error";

function Add() {
  const [emailInput, setEmailInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);
  const [newMember, setNewMember] = useState(null);

  function submitNewMember(e) {
    e.preventDefault();
    let storedPassword = window.localStorage.getItem("password");
    setLoading(true);
    let data = JSON.stringify({
      email: emailInput,
    });
    fetch("https://playful-easy-damselfly.glitch.me/api/new", {
      mode: "cors",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + storedPassword,
      },
      body: data,
    })
      .then((res) => res.json())
      .then((res) => {
        console.log("response : ", res);
        if (res.success) {
          setSuccess(true);
          setNewMember(res.user);
        } else {
          console.log("Error Check", res.error);
          setSuccess(false);
          setError(res.error.message);
        }
        setLoading(false);
      })
      .catch((error) => {
        console.log("Error with new user creation", error);
        setSuccess(false);
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
  };

  return (
    <div className="h-screen ml-16 pt-12">
      <div className="container">
        <h2 className="text-3xl p-2 my-2 font-bold text-gray-700">
          Add Member
        </h2>

        {!error && !success && (
          <form
            onSubmit={submitNewMember}
            className="rounded p-12 bg-green-300 w-4/12 shadow-lg"
          >
            <input
              className="rounded p-2"
              type="email"
              required
              value={emailInput}
              name="emailInput"
              placeholder="Type Email here"
              onChange={(e) => {
                setEmailInput(e.target.value);
              }}
            />
            <input
              className="text-gray-100 bg-gray-800 py-2 px-3 rounded my-2 hover:bg-gray-400 hover:text-gray-800"
              type="submit"
              value="Add New Member"
            />
          </form>
        )}
        {!error && success && newMember && (
          <div className="rounded bg-blue-300 p-8 inline-block">
            <h3 className="text-green-700 text-xl m-1 font-bold">
              Created new Member
            </h3>
            <h1 className="text-gray-700 text-2xl m-1">{newMember.email}</h1>
            <div className="w-96 my-2">
              <p className="text-gray-800">
                Remember to go to the CAPE email account and send the new member
                a 'New Member' template email. To access the templates create a
                new email and click the three dots in the bottom right.
              </p>
            </div>
            <button
              className="text-gray-100 bg-gray-800 py-2 px-3 rounded m-1 hover:bg-gray-400 hover:text-gray-800"
              onClick={resetForm}
            >
              Add another new member
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

export default Add;
