import React from 'react'
function Alert(props) {
    const capitalize = (str) => {
        return str[0].toUpperCase()+str.slice(1);
    }
  return (
    <div style={{ height: "50px" }}>
      {props.alert && (
        <div
          className={`alert alert-${props.alert.type} alert-dismissible fade show`}
          style={{ top: "47px" }}
          role="alert"
        >
          <strong>
            <span className={`text-${props.alert.type}`}>
              {capitalize(props.alert.type)}
            </span>
          </strong>{" "}
          : {props.alert.message}
        </div>
      )}
    </div>
  );
}

export default Alert