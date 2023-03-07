// import { load } from "nodemon/lib/config"
import React from "react";
import { CSSProperties } from "react";
import ClockLoader from "react-spinners/ClockLoader";

const override: CSSProperties = {
  display: "block",
  margin: "0 auto",
  borderColor: "red",
};

function Loading() {
  const loading = true;

  return (
    <div className="sweet-loading">
      <ClockLoader
        color="#000"
        cssOverride={override}
        loading={loading}
        size={80}
        speedMultiplier={0.5}
      />
    </div>
  );
}

export default Loading;
