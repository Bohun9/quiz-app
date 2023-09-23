import React from "react";
import "./PopUp.css";

const Popup = ({ open, onYes, onNo, children }) => {
    if (!open) return null;

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                {children}
                <div className="yes-no">
                    <button className="yes" onClick={onYes}>
                        Yes
                    </button>
                    <button className="no" onClick={onNo}>
                        No
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Popup;
