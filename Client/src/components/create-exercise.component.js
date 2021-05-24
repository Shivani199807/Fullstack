import React, { Component } from "react";
import DatePicker from "react-datepicker";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

import "react-datepicker/dist/react-datepicker.css";

export default class CreateExercise extends Component {
  constructor(props) {
    super(props);

    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.onChangeDuration = this.onChangeDuration.bind(this);
    this.onChangeDate = this.onChangeDate.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      username: "",
      description: "",
      duration: 0,
      date: new Date(),
      users: [],
    };
  }

  componentDidMount() {
    axios
      .get("/users")
      .then((response) => {
        if (response.data.length > 0) {
          this.setState({
            users: response.data.map((user) => user.username),
            username: response.data[0].username,
          });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  onChangeUsername(e) {
    this.setState({
      username: e.target.value,
    });
  }

  onChangeDescription(e) {
    this.setState({
      description: e.target.value,
    });
  }

  onChangeDuration(e) {
    this.setState({
      duration: e.target.value,
    });
  }

  onChangeDate(date) {
    this.setState({
      date: date,
    });
  }

  onSubmit(e) {
    e.preventDefault();

    const exercise = {
      username: this.state.username,
      description: this.state.description,
      duration: this.state.duration,
      date: this.state.date,
    };

    console.log(exercise);

    axios.post("/exercise/add", exercise).then((res) => console.log(res.data));

    window.location = "/";
  }

  render() {
    return (
      <div className="container ">
        <h2 className="text-center">Create New Exercise Data</h2>
        <form onSubmit={this.onSubmit} className="bg-dark row">
          <div className="col-md-3"></div>
          <div className="form-group col-md-6 mt-4">
            <label className="text-light">Username: </label>

            <select
              ref="userInput"
              required
              className="form-control col-md-6"
              value={this.state.username}
              onChange={this.onChangeUsername}
            >
              {this.state.users.map(function (user) {
                return (
                  <option key={user} value={user}>
                    {user}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="col-md-3"></div>
          <div className="col-md-3"></div>

          <div className="form-group mt-2 col-md-6">
            <label className="text-light ">Description: </label>
            <input
              type="text"
              required
              className="form-control"
              value={this.state.description}
              onChange={this.onChangeDescription}
            />
          </div>
          <div className="col-md-3"></div>
          <div className="col-md-3"></div>

          <div className="form-group mt-2 col-md-6">
            <label className="text-light">Duration (in minutes): </label>
            <input
              type="text"
              className="form-control"
              value={this.state.duration}
              onChange={this.onChangeDuration}
            />
          </div>
          <div className="col-md-3"></div>
          <div className="col-md-3"></div>

          <div className="form-group mt-2 col-md-6">
            <label className="text-light">Date: </label>
            <div>
              <DatePicker
                selected={this.state.date}
                onChange={this.onChangeDate}
              />
            </div>
          </div>
          <div className="col-md-3"></div>
          <div className="col-md-5"></div>

          <div className="form-group mt-2 col-md-6 ">
            <input
              type="submit"
              value="Create Exercise Log"
              className="btn btn-light mb-4 mt-2"
            />
          </div>
        </form>
      </div>
    );
  }
}
