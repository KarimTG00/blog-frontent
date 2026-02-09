export default function Loading() {
  return (
    <div className="flex justify-center items-center mb-20 w-full">
      <div className="flex items-center space-x-2 flex-col">
        <svg
          className="animate-spin h-8 w-8 mr-2"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="green"
            strokeWidth="4"
          ></circle>
          <path
            className="opacity-75 rounded-2xl"
            fill="black"
            d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
          ></path>
        </svg>
        <span className="text-xl ">chargement en cours...</span>
      </div>
    </div>
  );
}
