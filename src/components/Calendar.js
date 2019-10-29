import React from "react";
import FontAwesome from "react-fontawesome";

export class Calendar extends React.Component {
  constructor() {
    super();

    let today = new Date(),
      date =
        today.getFullYear() +
        "-" +
        (today.getMonth() + 1) +
        "-" +
        today.getDate() +
        " " +
        today.getHours() +
        "-" +
        today.getMinutes() +
        "-" +
        today.getSeconds();

    this.state = {
      date: date
    };
  }

  render() {
    return (
      <div className="date">
        <FontAwesome name="calendar" />
        {this.state.date}
      </div>
    );
  }
}

export default Calendar;
