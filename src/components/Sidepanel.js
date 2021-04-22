import { NavLink } from "react-router-dom";

function SidePanel({ setHasPassword }) {
  function handleSignOut(e) {
    e.preventDefault();
    window.localStorage.removeItem("password");
    setHasPassword(false);
  }

  return (
    <div className="fixed inset-0 flex-none h-full bg-blue-100 w-60">
      <ul className="mt-8 ml-4 mr-4 mt-2 ">
        <li className="mb-1 text-xl font-semibold text-gray-700 p-1 rounded hover:bg-purple-300">
          <a href="https://cape.org.uk/">CAPE.org.uk</a>
        </li>
        <li className="mb-1 text-xl font-semibold text-gray-700 p-1 rounded hover:bg-purple-300">
          <a href="https://cape.flarum.cloud/">Forum</a>
        </li>
        <li className="mb-1 text-xl font-semibold text-gray-700 p-1 rounded hover:bg-purple-300">
          <NavLink to="/">Home</NavLink>
        </li>

        <div className="rounded w-full h-1 my-2 bg-gradient-to-r from-blue-200 to-purple-300"></div>

        <li className="mb-1 rounded text-gray-800 p-1 hover:bg-purple-300 transition-colors duration-150 inline-block">
          <NavLink
            className="py-1 pr-2 rounded"
            activeClassName="bg-blue-300"
            to="/add"
          >
            <svg
              className="w-5 inline mb-0.5 mx-1"
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
            Add Member
          </NavLink>
        </li>
        <li className=" mb-1 rounded text-gray-800 p-1 hover:bg-purple-300 transition-colors duration-150 inline-block">
          <NavLink
            className="py-1 pr-2 rounded"
            activeClassName="bg-blue-300"
            to="/remove"
          >
            <svg
              className="w-5 inline mb-0.5 mx-1"
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
            Remove Member
          </NavLink>
        </li>
        <li className="mb-1 rounded text-gray-800 p-1 hover:bg-purple-300 transition-colors duration-150 inline-block">
          <NavLink
            className="py-1 pr-2 rounded"
            activeClassName="bg-blue-300"
            to="/users"
          >
            <svg
              className="w-5 inline mb-0.5 mx-1"
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
            User List
          </NavLink>
        </li>

        <div className="rounded w-full h-1 my-2 bg-gradient-to-r from-blue-200 to-purple-300"></div>

        <li className="mt-1 mb-1 rounded text-gray-800 p-1 hover:bg-purple-300">
          <a href="https://app.graphcms.com/e88cdb83bdde4fa6be02a4790cd5870f/master">
            Graph CMS
          </a>
        </li>
        <li className="mt-1 mb-1 rounded text-gray-800 p-1 hover:bg-purple-300">
          <a href="https://console.firebase.google.com/u/0/project/cape-app/authentication/users">
            Firebase - User Management
          </a>
        </li>
        <li className="mt-1 mb-1 rounded text-gray-800 p-1 hover:bg-purple-300">
          <a href="https://mail.google.com/mail/u/1/#inbox">Gmail Inbox</a>
        </li>
        <div className="rounded w-full h-1 my-2 bg-gradient-to-r from-blue-200 to-purple-300"></div>
        <li className="mt-1 mb-1 rounded text-gray-800 p-1 hover:bg-purple-300">
          <button onClick={handleSignOut}>SIGN OUT</button>
        </li>
      </ul>
    </div>
  );
}

export default SidePanel;
