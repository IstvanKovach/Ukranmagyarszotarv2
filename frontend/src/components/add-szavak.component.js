import React, { Component } from "react";
import SzavakDataService from "../services/szavak.service";

export default class AddSzavak extends Component {
  constructor(props) {
    super(props);
    this.onChangeSzo1 = this.onChangeSzo1.bind(this);
    this.onChangeSzo2 = this.onChangeSzo2.bind(this);
    this.saveSzavak = this.saveSzavak.bind(this);
    this.newSzavak = this.newSzavak.bind(this);

    this.state = {
      id: null,
      szo1: "",
      szo2: "", 
      published: false,

      submitted: false
    };
  }

  onChangeSzo1(e) {
    this.setState({
      szo1: e.target.value
    });
  }

  onChangeSzo2(e) {
    this.setState({
      szo2: e.target.value
    });
  }

  saveSzavak() {
    var data = {
      szo1: this.state.szo1,
      szo2: this.state.szo2
    };

    SzavakDataService.create(data)
      .then(response => {
        this.setState({
          id: response.data.id,
          szo1: response.data.szo1,
          szo2: response.data.szo2,
          published: response.data.published,

          submitted: true
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  newSzavak() {
    this.setState({
      id: null,
      szo1: "",
      szo2: "",
      published: false,

      submitted: false
    });
  }

  render() {
    return (
      <div className="submit-form">
        {this.state.submitted ? (
          <div>
            <h4>Sikeresen beküldted a szót!</h4>
            <button className="btn btn-success" onClick={this.newSzavak}>
              Tovább
            </button>
          </div>
        ) : (
          <div>
            <div className="form-group">
              <label htmlFor="szo1">Ukrán</label>
              <input
                type="text"
                className="form-control"
                id="szo1"
                required
                value={this.state.szo1}
                onChange={this.onChangeSzo1}
                name="szo1"
              />
            </div>

            <div className="form-group">
              <label htmlFor="szo2">Magyar</label>
              <input
                type="text"
                className="form-control"
                id="szo2"
                required
                value={this.state.szo2}
                onChange={this.onChangeSzo2}
                name="szo2"
              />
            </div>

            <button onClick={this.saveSzavak} className="btn btn-success">
              Beküldés
            </button>
          </div>
        )}
      </div>
    );
  }
}