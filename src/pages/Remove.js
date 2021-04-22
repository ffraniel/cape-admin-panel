import { useState } from "react";
import Loading from "../components/Loading";
import LoadingSpinner from "../components/LoadingSpinner";

function Remove() {
  const [emailInput, setEmailInput] = useState("");
  const [loading, setLoading] = useState(false);

  function removeMember(e) {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      alert("removing member : ", emailInput);
      setEmailInput("");
    }, 1000);
  }

  return (
    <div className="h-screen ml-16 pt-12">
      <div className="container">
        <h2 className="text-3xl p-2 my-2 font-bold text-gray-700">
          Remove Member
        </h2>

        <form
          onSubmit={removeMember}
          className="rounded p-12 bg-red-500 w-4/12"
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
            value="Remove Member"
          />
        </form>
      </div>
      {loading && <Loading />}
      {loading && <LoadingSpinner />}
    </div>
  );
}

export default Remove;
