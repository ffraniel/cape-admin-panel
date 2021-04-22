const Error = ({ resetForm, error }) => (
  <>
    <h1 className="text-red-400 text-3xl ml-2 pt-2 font-bold">
      ERROR: {error}
    </h1>
    {resetForm ? (
      <button
        onClick={resetForm}
        className="text-xl rounded px-2 py-1 m-2 bg-gray-300 text-gray-700 hover:bg-gray-700 hover:text-gray-300"
      >
        Reload page
      </button>
    ) : (
      <h3 className="text-2xl ml-2">Refresh page</h3>
    )}
  </>
);

export default Error;
