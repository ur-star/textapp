import React, { useEffect, useRef, useState } from "react";

const axios = require("axios").default;

export default function Textform(props) {
  const [text, setText] = useState("");
  const [options, setOptions] = useState([]);
  const [from, setFrom] = useState("en");
  const [languageto, setLanguageTo] = useState("");
  const [output, setOutput] = useState("");

  const element = useRef();

  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  const recognition = new SpeechRecognition();
  recognition.interimResults = true;
  recognition.maxAlternatives = 4;
  // recognition.continuous = true;

  const speechToText =() =>{

    recognition.addEventListener('result',(e)=>{
      const textResult = Array.from(e.results)
      .map(result => result[0])
      .map(result => result.transcript).join("")

      // console.log(textResult);
      setText(text+textResult)
    })

    recognition.start();
    props.showAlert("Recording started");

  }

  const stopRecord = ()=>{
    // console.log("it should stop");
    recognition.abort();
    recognition.stop();
    }

  const translate = () => {
    const params = new URLSearchParams();
    params.append("q", text.toLowerCase());
    params.append("source", from);
    params.append("target", languageto);
    params.append("api_key", "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx");

    axios
      .post("https://libretranslate.de/translate", params, {
        headers: {
          accept: "application/json",
          "Content-Type": "application/x-www-form-urlencoded",
        },
      })
      .then((res) => {
        setOutput(res.data.translatedText);
      });
  };

  const onUpClick = () => {
    element.current.style.textTransform = "uppercase";
    let newtext = text.toUpperCase();
    setText(newtext);
  };

  const onLoClick = () => {
    if(element.current){
      element.current.style.textTransform = "lowercase";
    }

    let newtext = text.toLowerCase();
    setText(newtext);
  };

  const handelChange = (event) => {
    setText(event.target.value);
  };

  const capitalize = () => {
    
    if (element.current.style.textTransform === "capitalize") {
      element.current.style.textTransform = "none";
    } else {
        if(element.current){
      element.current.style.textTransform = "capitalize";
    }
    }
    
  };

  const copy = () => {
    let newtext = element.current;
    newtext.select();
    navigator.clipboard.writeText(newtext.value);
    if (text.length < 2) {
      props.showAlert("Nothing to copy", "warning");
    } else {
      props.showAlert("Copied to clipboard", "success");
    }
  };

  const clear = () => {
    setText("");
    props.showAlert("Text area cleared", "success");
  };

  const speakky = () => {
    let txtarea = element.current;
    if (speechSynthesis.paused && speechSynthesis.speaking) {
      return speechSynthesis.resume();
    }
     const utterance = new SpeechSynthesisUtterance(text);
     const voices = window.speechSynthesis.getVoices();
     utterance.voice = voices[4];
     utterance.rate = 0.8;
     utterance.addEventListener("end", () => {
      txtarea.disabled = false;
    });
    txtarea.disabled = true;
    speechSynthesis.speak(utterance);
  };
  const stopp = () => {
    speechSynthesis.cancel();
  };
  const pause = () => {
    if (speechSynthesis.speaking) speechSynthesis.pause();
  };

  useEffect(() => {
    axios
      .get("https://libretranslate.com/languages", {
        headers: { accept: "application/json" },
      })
      .then((res) => {
        // console.log(res.data);
        setOptions(res.data);
      });
  }, []);

  return (
    <>
      <div className="container">
        <div className="convert">
          <h1 className="mb-3 ">{props.heading}</h1>
          From:
          <select
            className="btn btn-success mx-4 my-3"
            id="opt"
            onChange={(e) => setFrom(e.target.value)}
          >
            {options.map((opt) => (
              <option key={opt.code} value={opt.code}>
                {opt.name}
              </option>
            ))}
          </select>
          To:
          <select
            className="btn btn-success mx-4 my-3"
            id="opt"
            onChange={(e) => setLanguageTo(e.target.value)}
          >
            {options.map((opt) => (
              <option key={opt.code} value={opt.code}>
                {opt.name}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-3">
          <textarea
            className="form-control "
            value={text}
            onChange={handelChange}
            style={{
              backgroundColor: props.mode === "dark" ? "#43594e" : "#dcf7e9",
            }}
            id="Textarea1"
            rows="15"
            ref={element}
          ></textarea>
        </div>
        <div className="modifybtnn">
          <button className="btn btn-primary mx-2 my-1 " onClick={onUpClick}>
            Convert To Uppercase
          </button>
          <button className="btn btn-primary mx-2 my-1 " onClick={onLoClick}>
            Convert To Lowercase
          </button>
          <button className="btn btn-primary mx-2 my-1 " onClick={capitalize}>
            Captalize
          </button>
          <button className="btn btn-primary mx-2 my-1 " onClick={copy}>
            Copy
          </button>
          <button className="btn btn-primary mx-2 my-1 " onClick={clear}>
            Clear
          </button>
          <button className="btn btn-primary mx-2 my-1 " onClick={translate}>
            Translate
          </button>
        </div>
        <div
          className="container bg-success d-flex"
          // style={{ backgroundColor: "#93c4a0" }}
        >
          <div style={{ marginRight: "auto" }}>
            <button
              className="btn btn-primary btn-sm mx-2 my-1"
              onClick={speakky}
            >
              Play
            </button>
            <button
              className="btn btn-primary btn-sm mx-2 my-1"
              onClick={stopp}
            >
              Stop
            </button>
            <button
              className="btn btn-primary btn-sm mx-2 my-1"
              onClick={pause}
            >
              Pause
            </button>
          </div>
          <div>
            <button className="btn btn-primary btn-sm mx-2 my-1" onClick={speechToText}>Record</button>
            <button className="btn btn-primary btn-sm mx-2 my-1" onClick={stopRecord}>
              Stop Record
            </button>
          </div>
        </div>
      </div>

      <div className="container my-3">
        <h1>Your Text Summary</h1>
        <p>
          {" "}
          <b>words: </b>
          {
            text.split(/\s+/).filter((element) => {
              return element.length !== 0;
            }).length
          }
        </p>
        <p>
          <b>characters: </b> {text.length}
        </p>
        <p>
          <b>Average time to read: </b>
          {(text.split(" ").length - 1) * 0.008}
        </p>
        <h2 className="my-3">Preview</h2>
        <p>{output}</p>
      </div>
    </>
  );
}
