import React, { useState, useEffect } from "react";
import FreddyImage from "./media/Textures/CustomNight/freddy.png";
import ReactDOM from "react-dom";
import Controller from "./Controller";
import "./css/Game.css";
import * as serviceWorker from "./serviceWorker";
import { Provider } from "react-redux";
import store from "./store/store";

const Start = () => {
    const [Start, setStart] = useState(false);

    useEffect(() => {
        console.log(window.innerHeight > window.innerWidth);
        if (window.innerHeight > window.innerWidth) {
            window.alert(
                `Para uma melhor experiência, vire seu celular para o modo de paisagem (modo deitado)
    
    ~ For a better experience, please rotate your phone to landscape mode`
            );
        }
    }, []);

    return (
        <>
            {!Start ? (
                <>
                    {localStorage.getItem("★") ? (
                        <div
                            style={{
                                position: "absolute",
                                fontSize: "50pt",
                                color: "white",
                                marginLeft: "2vw",
                            }}
                        >
                            ★
                        </div>
                    ) : null}
                    <div className="start-screen">
                        <div>
                            <img
                                alt="Five Nights At Freddy's"
                                src={FreddyImage}
                            />
                            <button onClick={() => setStart(true)}>
                                READY
                            </button>
                        </div>
                    </div>
                </>
            ) : (
                <Controller setStart={setStart} />
            )}
        </>
    );
};

ReactDOM.render(
    <Provider store={store}>
        <Start />
    </Provider>,
    document.getElementById("root")
);

serviceWorker.unregister();
