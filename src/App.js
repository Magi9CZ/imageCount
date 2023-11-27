import logo from './logo.svg';
import './App.css';
import {useEffect, useState} from "react";


function App(props) {

    function handleInput(e) {
        setUserInput(e.target.value);
    }

    function passData() {
        checkAnswer();
        props.onChange(userInput);
    }

    const [userInput, setUserInput] = useState("");

    useEffect(() => {
        passData();
    }, [userInput, 1]);

    const images = props.data.images;
    const priklady = props.data.priklady;
    const question = props.data.question;
    const result = props.data.result;
    function getCorrectMark(mark) {
        switch (mark){
            case 'minus':
                return '-'
            case undefined:
                return <div className="item-mark">=</div>
            default:
                return '+'
        }
    }

    function checkAnswer() {
        if (userInput == result){
            console.log("správně");
            props.checkAnswer(true);
        }else{
            console.log("špatně");
            props.checkAnswer(false);
        }
    }


    if (props.readOnly === true) {
        return (
            <div className="App">
                {priklady.map(item =>
                    <div className="item-container">
                        {[...Array(item.count).keys()].map((img, index) =>
                            <div className="item-image">
                                <img src={images[item.img].src}></img>
                                {(index + 1 < item.count) ? <div className="item-mark">+</div> :
                                    <div className="item-mark">=</div>}
                            </div>
                        )}
                        <div className="item-result">{item.result}</div>
                    </div>)}
                <div className="result">
                    {question.map(item =>
                        <div className="item-container">
                            <div className="item-image">
                                <img src={images[item.img].src}></img>
                                <div className="item-mark">{getCorrectMark(item.mark)}</div>
                            </div>
                        </div>)}
                    <input onChange={handleInput}/>
                </div>
                <button onClick={checkAnswer}>Zkontrolovat</button>
            </div>
        );
    }else{
        return (
            <div className="App">
                {priklady.map(item =>
                    <div className="item-container">
                        {[...Array(item.count).keys()].map((img, index) =>
                            <div className="item-image">
                                <img src={images[item.img].src}></img>
                                {(index + 1 < item.count) ? <div className="item-mark">+</div> :
                                    <div className="item-mark">=</div>}
                            </div>
                        )}
                        <div className="item-result">{item.result}</div>
                    </div>)}
                <div className="result">
                    {question.map(item =>
                        <div className="item-container">
                            <div className="item-image">
                                <img src={images[item.img].src}></img>
                                <div className="item-mark">{getCorrectMark(item.mark)}</div>
                            </div>
                        </div>)}
                    <h3>{props.restoreData.userInput}</h3>
                </div>
            </div>
            );
    }
}

export default App;
