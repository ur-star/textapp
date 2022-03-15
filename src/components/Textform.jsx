import React, { useEffect, useState } from "react";

const axios = require("axios").default;

export default function Textform(props) {
  const [text, setText] = useState("");
  const [options, setOptions] = useState([]);
  const [from, setFrom] = useState("en");
  const [to, setTo] = useState("");
  const [out, setOut] = useState("");
  const onUpClick = () => {
    // console.log('uppercase was called');
    document.getElementById("Textarea1").style.textTransform = "uppercase";

    let newtext = text.toUpperCase();
    setText(newtext);
  };
  const translate = () => {
    const params = new URLSearchParams();
    params.append('q', text);
    params.append('source', from);
    params.append('target', to);
    params.append('api_key', 'xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx');

    axios
      .post("https://libretranslate.de/translate",params, {
        headers: {
          accept: 'application/json',
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      })
      .then((res) => {console.log(res.data);
        setOut(res.data.translatedText)});
      
  };
  const onLoClick = () => {
    document.getElementById("Textarea1").style.textTransform = "lowercase";

    let newtext = text.toLowerCase();
    setText(newtext);
  };
  const handelChange = (event) => {
    setText(event.target.value);
    // console.log('onchange called');
  };
  const capitalize = () => {
    let textarea = document.getElementById("Textarea1");
    // console.log(textarea.style.textTransform);
    if (textarea.style.textTransform === "capitalize") {
      document.getElementById("Textarea1").style.textTransform = "none";
    } else {
      textarea.style.textTransform = "capitalize";
    }
    // let newtext = text.charAt(0).toUpperCase() + text.slice(1);
    // setText(newtext);
    // document.getElementById('Textarea1').style.textTransform = 'capitalize';
  };
  const copy = () => {
    let newtext = document.getElementById("Textarea1");
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
    let txtarea = document.getElementById("Textarea1");
    if (speechSynthesis.paused && speechSynthesis.speaking) {
      return speechSynthesis.resume();
    }
    let utterance = new SpeechSynthesisUtterance(text);
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
        console.log(res.data);
        setOptions(res.data);
      });
  }, []);

  return (
    <>
      <div className="container">
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
          onChange={(e) => setTo(e.target.value)}
        >
          {options.map((opt) => (
            <option key={opt.code} value={opt.code}>
              {opt.name}
            </option>
          ))}
        </select>
        <div className="mb-3">
          <textarea
            className="form-control "
            value={text}
            onChange={handelChange}
            style={{
              backgroundColor: props.mode === "dark" ? "#43594e" : "#dcf7e9",
            }}
            id="Textarea1"
            rows="10"
          ></textarea>
        </div>
        <button className="btn btn-primary mx-2 my-1" onClick={onUpClick}>
          Convert To Uppercase
        </button>
        <button className="btn btn-primary mx-2 my-1" onClick={onLoClick}>
          Convert To Lowercase
        </button>
        <button className="btn btn-primary mx-2 my-1 " onClick={capitalize}>
          Captalize
        </button>
        <button className="btn btn-primary mx-2 my-1 " onClick={copy}>
          Copy
        </button>
        <button className="btn btn-primary mx-2 my-1" onClick={clear}>
          Clear
        </button>
        <button className="btn btn-primary mx-2 my-1" onClick={translate}>
          Translate
        </button>
        <div
          className="container d-flex justify-content-around"
          style={{ backgroundColor: "#93c4a0" }}
        >
          <button
            className="btn btn-primary btn-sm mx-2 my-1"
            onClick={speakky}
          >
            Play
          </button>
          <button className="btn btn-primary btn-sm mx-2 my-1" onClick={stopp}>
            Stop
          </button>
          <button className="btn btn-primary btn-sm mx-2 my-1" onClick={pause}>
            Pause
          </button>
        </div>
      </div>

      <div className="container my-3">
        <h1>Your Text Summary</h1>
        <p>
          {" "}
          <b>words:</b>
          {
            text.split(/\s+/).filter((element) => {
              return element.length !== 0;
            }).length
          }
        </p>
        <p>
          <b>characters:</b> {text.length}
        </p>
        <p>
          <b>Average time to read:</b>
          {(text.split(" ").length - 1) * 0.008}
        </p>
        <h2 className="my-3">Preview</h2>
        <p>{out}</p>
      </div>
    </>
  );
}
