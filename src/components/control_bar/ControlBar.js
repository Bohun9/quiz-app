import "./ControlBar.css";

function SwitchButton({ id, onClick, style }) {
    return (
        <button
            className="switch-button button"
            onClick={onClick}
            style={style}
        >
            {id}
        </button>
    );
}

function SpecialButton({ onClick, text }) {
    return (
        <button className="submit-button button" onClick={onClick}>
            {text}
        </button>
    );
}

export default function ControlBar({
    onClickSwitches,
    onClickSpecial,
    textSpecial,
    currentIndex,
}) {
    return (
        <div className="control-bar-container">
            <h5 className="control-bar-text">
                Answer questions and submit to review them
            </h5>
            <div className="control-bar">
                {onClickSwitches.map((onClick, index) => (
                    <SwitchButton
                        id={index + 1}
                        key={index}
                        onClick={onClick}
                        style={{
                            backgroundColor:
                                index === currentIndex ? "#CBCBCB" : "",
                        }}
                    />
                ))}
                {<SpecialButton onClick={onClickSpecial} text={textSpecial} />}
            </div>
        </div>
    );
}
