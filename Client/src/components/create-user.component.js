import React, { Component } from "react";
import axios from "axios";

export default class CreateUser extends Component {
  constructor(props) {
    super(props);

    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      username: "",
    };
  }

  onChangeUsername(e) {
    this.setState({
      username: e.target.value,
    });
  }

  onSubmit(e) {
    e.preventDefault();

    const user = {
      username: this.state.username,
    };

    console.log(user);
    axios.post("/users/add", user).then((res) => console.log(res.data));

    this.setState({
      username: "",
    });
  }

  render() {
    return (
      <div className="container">
        <h3 className="text-center">Create New User</h3>
        <form onSubmit={this.onSubmit} className="bg-dark row">
          <div className="col-md-3"></div>
          <div className="form-group col-md-6 p-4">
            <label className="text-light ">Username: </label>
            <input
              type="text"
              required
              className="form-control "
              value={this.state.username}
              onChange={this.onChangeUsername}
            />
          </div>

          <div className="form-group row ">
            <div className="col-md-5"></div>
            <input
              type="submit"
              value="Create User"
              className="btn btn-light  mb-4 col-md-2"
            />
          </div>
        </form>
      </div>
    );
  }
}
