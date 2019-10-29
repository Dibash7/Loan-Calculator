import React from "react";
import { AppContext } from "../App";
import Calendar from './Calendar';

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
    borderRadius: "20px 20px"
  };

  let dt = new Date();
  let DD = ("0" + dt.getDate()).slice(-2);
  let MM = ("0" + (dt.getMonth() + 1)).slice(-2);
  let YYYY = dt.getFullYear();
  let hh = ("0" + dt.getHours()).slice(-2);
  let mm = ("0" + dt.getMinutes()).slice(-2);
  let ss = ("0" + dt.getSeconds()).slice(-2);
  let date_string = YYYY + "-" + MM + "-" + DD + " " + hh + ":" + mm + ":" + ss;

  // const containerUpdate = (e, x) => {
  //   console.log(e.target.value);
  //   console.log(props);

  // };
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
                <div>
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
