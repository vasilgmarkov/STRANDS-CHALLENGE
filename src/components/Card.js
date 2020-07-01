import React, { Component } from "react";
import logo from "../assets/French-Bulldog-Vector.png";
import Chart from "./Chart";
class Card extends Component {
  render() {
    const { errors } = this.props;

    return (
      <div className="card">
        <img src={logo} className="app-logo" alt="logo" />
        <div className="container">
          <h2>Top 10 breeds</h2>
          <p>with most images in our DataBase</p>
          {errors ? <p className="app-error">{errors}</p> : <Chart />}
        </div>
      </div>
    );
  }
}

export default Card;
