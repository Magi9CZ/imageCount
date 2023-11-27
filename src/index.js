import React, {useState} from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';


function Question_imageCount() {

    let playable = true;
    let userInput;
    let completed = false;

    Question_imageCount.prototype.init = function (questionKey, location, config) {
        this.questionKey = questionKey;
        this.location = location;
        this.config = config;

        var self = this;


        //init save & cancel answer handlers pro tlačítka
        const root = ReactDOM.createRoot(document.getElementById('root'));
        console.log(config);
        root.render(
            <React.StrictMode>
                <App data={config} onChange={stavHry} readOnly={playable} checkAnswer={answerCheck}/>
            </React.StrictMode>
        );
    };

    function answerCheck(e) {
        if (e === true){
            completed = true;
        }
    }

    function stavHry(e) {
        userInput = e;
        checkState();
    }

    function checkState() {
        console.log("stav user: ", userInput);
    }

    Question_imageCount.prototype.onlyShowInit = function (questionKey, location, config) {
        this.questionKey = questionKey;
        this.location = location;
        this.config = config;
        playable = false;
        console.log("play " + playable);
        const root = ReactDOM.createRoot(document.getElementById('root'));
        console.log(config);
        root.render(
            <React.StrictMode>
                <App data={config} userData={userInput} readOnly={playable}/>
            </React.StrictMode>
        );
    };

    function saveAnswer(odp) {
        userInput = odp;
        console.log("správně?: " + completed);
    }

    Question_imageCount.prototype.answer = function () {
        const odpoved = {userInput, completed};
        return odpoved;
    };

    /**
     * Returns data for recovery
     * @returns {string}
     */
    Question_imageCount.prototype.recoveryData = function () {
        const stav = {userInput, completed};
        return stav;
    };

    /**
     * Restore application and disable moving
     * @param data
     */
    Question_imageCount.prototype.restore = function (data) {
        const root = ReactDOM.createRoot(document.getElementById('root'));
        console.log(config);
        root.render(
            <React.StrictMode>
                <App data={config} restoreData={data} onChange={stavHry} readOnly={playable} checkAnswer={answerCheck}/>
            </React.StrictMode>
        );

    };
}
export default Question_imageCount;