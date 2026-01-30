import React from "react";
import { useDispatch } from "react-redux";
import { clearUpgradeMessage } from "../../actions/userAction";

const UpgradePopup = ({ role, onClose }) => {
  const dispatch = useDispatch();

  const handleClose = () => {
    dispatch(clearUpgradeMessage());
    onClose();
  };

  return (
    <div style={overlayStyle}>
      <div style={popupStyle}>
        <h2 style={{ fontSize: "20px", fontWeight: "600" }}>
          🎉 Account Upgraded!
        </h2>

        <p style={{ marginTop: "10px" }}>
          Your account has been upgraded to{" "}
          <strong>{role.toUpperCase()}</strong>.
        </p>

        <button onClick={handleClose} style={buttonStyle}>
          OK
        </button>
      </div>
    </div>
  );
};

const overlayStyle = {
  position: "fixed",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  background: "rgba(0,0,0,0.5)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  zIndex: 9999,
};

const popupStyle = {
  background: "#fff",
  padding: "30px",
  borderRadius: "8px",
  width: "90%",
  maxWidth: "400px",
  textAlign: "center",
};

const buttonStyle = {
  marginTop: "20px",
  padding: "10px 20px",
  background: "#000",
  color: "#fff",
  border: "none",
  borderRadius: "5px",
  cursor: "pointer",
};

export default UpgradePopup;
