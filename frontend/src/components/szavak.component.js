import React, { Component } from "react";
import SzavakDataService from "../services/szavak.service";

export default class Szavak extends Component {
  constructor(props) {
    super(props);
    this.onChangeSzo1 = this.onChangeSzo1.bind(this);
    this.onChangeSzo2 = this.onChangeSzo2.bind(this);
    this.getSzavak = this.getSzavak.bind(this);
    this.updatePublished = this.updatePublished.bind(this);
    this.updateSzavak = this.updateSzavak.bind(this);
    this.deleteSzavak = this.deleteSzavak.bind(this);

    this.state = {
      currentSzavak: {
        id: null,
        szo1: "",
        szo2: "",
        published: false
      },
      message: ""
    };
  }

  componentDidMount() {
    this.getSzavak(this.props.match.params.id);
  }

  onChangeSzo1(e) {
    const szo1 = e.target.value;

    this.setState(function(prevState) {
      return {
        currentSzavak: {
          ...prevState.currentSzavak,
          szo1: szo1
        }
      };
    });
  }

  onChangeSzo2(e) {
    const szo2 = e.target.value;
    
    this.setState(prevState => ({
      currentSzavak: {
        ...prevState.currentSzavak,
        szo2: szo2
      }
    }));
  }

  getSzavak(id) {
    SzavakDataService.get(id)
      .then(response => {
        this.setState({
          currentSzavak: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  updatePublished(status) {
    var data = {
      id: this.state.currentSzavak.id,
      szo1: this.state.currentSzavak.szo1,
      szo2: this.state.currentSzavak.szo2,
      published: status
    };

    SzavakDataService.update(this.state.currentSzavak.id, data)
      .then(response => {
        this.setState(prevState => ({
          currentSzavak: {
            ...prevState.currentSzavak,
            published: status
          }
        }));
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  updateSzavak() {
    SzavakDataService.update(
      this.state.currentSzavak.id,
      this.state.currentSzavak
    )
      .then(response => {
        console.log(response.data);
        this.setState({
          message: "A szó sikeresen frissítve lett!"
        });
      })
      .catch(e => {
        console.log(e);
      });
  }

  deleteSzavak() {    
    SzavakDataService.delete(this.state.currentSzavak.id)
      .then(response => {
        console.log(response.data);
        this.props.history.push('/szotar')
      })
      .catch(e => {
        console.log(e);
      });
  }

  render() {
    const { currentSzavak } = this.state;

    return (
      <div>
        {currentSzavak ? (
          <div className="edit-form">
            <form>
              <div className="form-group">
                <label htmlFor="szo1">Ukrán</label>
                <input
                  type="text"
                  className="form-control"
                  id="szo1"
                  value={currentSzavak.szo1}
                  onChange={this.onChangeSzo1}
                />
              </div>
              <div className="form-group">
                <label htmlFor="szo2">Magyar</label>
                <input
                  type="text"
                  className="form-control"
                  id="szo2"
                  value={currentSzavak.szo2}
                  onChange={this.onChangeSzo2}
                />
              </div>

              <div className="form-group">
                <label>
                  <strong>Állapot:</strong>
                </label>
                {currentSzavak.published ? " Ellenőrizve" : " Ellenőrzésre vár"}
              </div>
            </form>

            {currentSzavak.published ? (
              <button
                className="badge badge-primary mr-2"
                onClick={() => this.updatePublished(false)}
              >
                Ellenőrzésre szorul
              </button>
            ) : (
              <button
                className="badge badge-primary mr-2"
                onClick={() => this.updatePublished(true)}
              >
                Megfelel
              </button>
            )}

            <button
              className="badge badge-danger mr-2"
              onClick={this.deleteSzavak}
            >
              Törlés
            </button>

            <button
              type="submit"
              className="badge badge-success"
              onClick={this.updateSzavak}
            >
              Frissités
            </button>
            <p>{this.state.message}</p>
          </div>
        ) : (
          <div>
            <br />
            <p>Kattints egy szóra</p>
          </div>
        )}
      </div>
    );
  }
}