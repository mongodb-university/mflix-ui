import React from "react";

const ErrorsDiv = props => {
  return (
    <div
      style={{
        backgroundColor: "black",
        color: "white",
        textAlign: "center"
      }}
    >
      <i
        className="material-icons red"
        onClick={() => props.dismiss(props.error)}
      >
        cancel
      </i>
      {props.msg}
    </div>
  );
};

export default ErrorsDiv;
