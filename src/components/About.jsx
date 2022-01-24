import React, { useState } from "react";

export default function (props) {
  let myStyle ={
    backgroundColor: props.mode==='dark'?'gray':'white',
    color: props.mode==='dark'?'white':'#29293D',
    transition:'0.5s',
    border:'solid black 1px'
  }
 

  // let toggleStyle = () => {
  //   if (myStyle.color === "white") {
  //     setmyStyle({
  //       backgroundColor: "white",
  //       border: "2px solid black",
  //       color: "gray",
  //       transition: "0.6s",
  //     });
  //     setbtnTxt("Enable Dark Mode");
  //   } else {
  //     setmyStyle({
  //       backgroundColor: "gray",
  //       border: "2px solid white",
  //       color: "white",
  //       transition: "0.6s",
  //     });
  //     setbtnTxt("Enable Light Mode");
  //   }
  // };

  return (
    <>
      <div className="container my-1" style={myStyle}>
        <h1>About Us</h1>

        <div className="accordion " id="accordionExample" style={myStyle}>
          <div className="accordion-item" style={myStyle}>
            <h2 className="accordion-header" id="headingOne">
              <button
                className="accordion-button"
                type="button"
                style={myStyle}
                data-bs-toggle="collapse"
                data-bs-target="#collapseOne"
                aria-expanded="true"
                aria-controls="collapseOne"
              >
                abc
              </button>
            </h2>
            <div
              id="collapseOne"
              style={myStyle}
              className="accordion-collapse collapse show"
              aria-labelledby="headingOne"
              data-bs-parent="#accordionExample"
            >
              <div className="accordion-body">
                <strong>overFlow</strong> This text 
                is not 
                overflowing.
              </div>
            </div>
          </div>
          <div className="accordion-item" style={myStyle}>
            <h2 className="accordion-header" id="headingTwo">
              <button
                className="accordion-button collapsed"
                style={myStyle}
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#collapseTwo"
                aria-expanded="false"
                aria-controls="collapseTwo"
              >
                Anything
              </button>
            </h2>
            <div
              id="collapseTwo"
              className="accordion-collapse collapse"
              style={myStyle}
              aria-labelledby="headingTwo"
              data-bs-parent="#accordionExample"
            >
              <div className="accordion-body">
                <strong>xyz</strong>
                well welll well
              </div>
            </div>
          </div>
          <div className="accordion-item" style={myStyle}>
            <h2 className="accordion-header" id="headingThree">
              <button
                className="accordion-button collapsed"
                style={myStyle}
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#collapseThree"
                aria-expanded="false"
                aria-controls="collapseThree"
              >
                Free !!!
              </button>
            </h2>
            <div
              id="collapseThree"
              className="accordion-collapse collapse"
              aria-labelledby="headingThree"
              data-bs-parent="#accordionExample"
            >
              <div className="accordion-body">
                <strong>This is Free to use site</strong> 
               you can use this website absolutely free. 
              </div>
            </div>
          </div>
        </div>
        <div className="container">
          <br />
        </div>
      </div>
    </>
  );
}
