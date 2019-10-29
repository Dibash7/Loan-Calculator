import React from "react";
import CustomSlider from "./components/Slider";
import Sidebar from "./components/Sidebar";
import Container from "./components/Container";
import Header from "./components/Header";
import shortid from "shortid";
import axios from "axios";
import styled from "styled-components";

import "./App.css";

const inputStyle = {
  display: "flex",
  flexDirection: "row",
  flexWrap: "wrap",
  justifyContent: "center",
  alignItems: "center"
};

const Button = styled.button`
  cursor: pointer;
  background: transparent;
  font-size: 16px;
  border-radius: 3px;
  color: #101211;
  border: 2px solid palevioletred;
  margin: 0 1em;
  padding: 0.25em 1em;
  transition: 0.5s all ease-out;
  &:hover {
    background-color: palevioletred;
    color: white;
    transform: translateY(-3px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
  }
  &:link,
  &:visited {
    text-transform: uppercase;
    text-decoration: none;
    padding: 10px 20px;
    display: inline-block;
    border-radius: 100px;
    transition: all 0.2s;
    position: relative;
  }
`;

export const AppContext = React.createContext();

class App extends React.Component {
  constructor(props) {
    super(props);

    this.handleUpdateState = (propName, value) => {
      this.setState({
        [propName]: value
      });
    };

    this.state = {
      loan: 500,
      duration: 6,
      previous: [],
      loading: false,
      handleUpdateState: this.handleUpdateState,
      result: null
    };
  }

  handleUpdatePreviousCalculation = id => {
    const index = this.state.previous.findIndex(x => x.id === id);

    this.setState({
      loan: this.state.previous[index].loan,
      duration: this.state.previous[index].duration,
      result: this.state.previous[index].result
    });
  };

  handleSaveCalculation = () => {
    this.setState({
      previous: [
        ...this.state.previous,
        {
          id: shortid(),
          loan: this.state.loan,
          duration: this.state.duration,
          result: this.state.result
        }
      ]
    });
    localStorage.setItem("loanAmount", this.state.loan);
    localStorage.setItem("durationAmount", this.state.duration);
    localStorage.setItem("id", shortid());
  };

  handleCalculate = () => {
    var self = this;

    this.setState({
      loading: true
    });
    const URL = `https://ftl-frontend-test.herokuapp.com/interest?amount=${this.state.loan}&numMonths=${this.state.duration}`;

    axios
      .get(URL)
      .then(({ data }) => {
        // handle success
        self.setState({
          loading: false,
          result: data
        });

        self.handleSaveCalculation();
      })
      .catch(function(error) {
        // handle error
        self.setState({
          loading: false,
          result: null
        });
      })
      .finally(function() {
        // always executed
        self.setState({
          loading: false
        });
      });
  };

  clear = () =>
    this.setState({
      loan: 500,
      duration: 6,
      result: null
    });

  render() {
    return (
      <AppContext.Provider value={{ ...this.state }}>
        <div id="App">
          <Sidebar
            prevUpdate={this.handleUpdatePreviousCalculation}
            pageWrapId={"page-wrap"}
            outerContainerId={"App"}
          />
          <div id="page-wrap">
            <Header />
            <h2>
              Change sliders and calculate to get interest and duration of
              payments
            </h2>
            <menu id="loan">
              <div style={inputStyle}>
                <CustomSlider propName="loan" text={"Loan Amount"} />
                <CustomSlider propName="duration" text={"Repayment Duration"} />
              </div>
              <Button onClick={this.handleCalculate}>
                {this.state.loading ? "Loading ... " : "Calculate"}
              </Button>
              <Button onClick={() => this.clear()}>Reset</Button>
              {this.state.result !== null ? (
                <React.Fragment>
                  <hr />
                  <h2>Interest Rates Calculations</h2>
                  <p />
                  <p />
                  <h3 style={{ fontWeight: "bold" }}>Interest Rate</h3>:{" "}
                  {this.state.result.interestRate}
                  <h3 style={{ fontWeight: "bold" }}>
                    Number of Payments
                  </h3> : {this.state.result.numPayments}
                </React.Fragment>
              ) : (
                ""
              )}
              <hr />
              <h2>Previous Calculations</h2>
              <Container prevUpdate={this.handleUpdatePreviousCalculation} />
            </menu>
          </div>
        </div>
      </AppContext.Provider>
    );
  }
}

export default App;
