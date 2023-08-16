import React from "react";
import FadeLoader from "react-spinners/FadeLoader";

function Loader({ loader }) {
  return (
    <div className="fixed inset-0 bg-white bg-opacity-10 backdrop-blur-sm flex justify-center items-center z-50">
      <div className=" flex  justify-center items-center">
        <FadeLoader
          color={"#33ff33"}
          loading={loader}
          // cssOverride={override}
          size={50}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
      </div>
    </div>
  );
}

export default Loader;