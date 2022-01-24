import React, { useState } from "react";


export default function Textform(props) {
  const onUpClick = () => {
    // console.log('uppercase was called');

    let newtext = text.toUpperCase();
    setText(newtext);
  };
  const onLoClick = () => {
    let newtext = text.toLowerCase();
    setText(newtext);
  };
  const handelChange = (event) => {
    setText(event.target.value);
    // console.log('onchange called');
  };
  const capitalize = () => {
     
      let newtext = text.charAt(0).toUpperCase() + text.slice(1);
      setText(newtext);
    
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

  const [text, setText] = useState("");
  

  return (
    <>
      <div className="container">
        <h1 className="mb-3">{props.heading}</h1>
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
      </div>

      <div className="container my-3">
        <h1>Your Text Summary</h1>
        <p>
          {" "}
          <b>words:</b>
          {text.split(/\s+/).filter((element)=>{
           return element.length!== 0;
          }).length}
        </p>
        <p>
          <b>characters:</b> {text.length}
        </p>
        <p>
          <b>Average time to read:</b>
          {(text.split(" ").length - 1) * 0.008}
        </p>
        <h2 className="my-3">Preview</h2>
        <p>{text}</p>
      </div>
    </>
  );
}
