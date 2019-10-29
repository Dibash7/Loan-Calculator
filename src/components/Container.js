import React from "react";
import { AppContext } from "../App";
import Calendar from "./Calendar";

const Container = props => {
  let previousStyle = {
    height: "150px",
    width: "200px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontFamily: "Lato",
    fontVariant: "all-small-caps",
    color: "white",
    letterSpacing: "2px",
    margin: "20px",
    cursor: "pointer",
    transition: "2s",
    backgroundColor: "#ed748a",
    borderRadius: "20px 20px",
    boxShadow: "-5px 10px 26px 2px rgba(107,20,107,1)"
  };

  return (
    <AppContext.Consumer>
      {context => {
        return (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              flexWrap: "wrap"
            }}
          >
            {context.previous.map((x, id) => {
              return (
                <div key={id}>
                  <div
                    onClick={e => props.prevUpdate(x.id)}
                    style={{
                      ...previousStyle
                    }}
                    key={id}
                  >
                    <div style={{ padding: "10px" }}>
                      <b> Calculation {id + 1} </b>
                      <p>Loan: {x.loan === 0 ? "0" : x.loan}</p>
                      <p>Duration: {x.duration}</p>
                    </div>
                  </div>
                  <Calendar />
                </div>
              );
            })}
          </div>
        );
      }}
    </AppContext.Consumer>
  );
};

export default Container;
