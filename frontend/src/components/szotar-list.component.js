import React, { Component } from "react";
import SzavakDataService from "../services/szavak.service";
import { Link } from "react-router-dom";

export default class SzotarList extends Component {
  constructor(props) {
    super(props);
    this.onChangeSearchSzo1 = this.onChangeSearchSzo1.bind(this);
    this.retrieveSzotar = this.retrieveSzotar.bind(this);
    this.refreshList = this.refreshList.bind(this);
    this.setActiveSzavak = this.setActiveSzavak.bind(this);
    this.removeAllSzotar = this.removeAllSzotar.bind(this);
    this.searchSzo1 = this.searchSzo1.bind(this);

    this.state = {
      szotar: [],
      currentSzavak: null,
      currentIndex: -1,
      searchSzo1: ""
    };
  }

  componentDidMount() {
    this.retrieveSzotar();
  }

  onChangeSearchSzo1(e) {
    const searchSzo1 = e.target.value;

    this.setState({
      searchSzo1: searchSzo1
    });
  }

  retrieveSzotar() {
    SzavakDataService.getAll()
      .then(response => {
        this.setState({
          szotar: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  refreshList() {
    this.retrieveSzotar();
    this.setState({
      currentSzavak: null,
      currentIndex: -1
    });
  }

  setActiveSzavak(szavak, index) {
    this.setState({
      currentSzavak: szavak,
      currentIndex: index
    });
  }

  removeAllSzotar()
 {
  SzavakDataService.deleteAll()
      .then(response => {
        console.log(response.data);
        this.refreshList();
      })
      .catch(e => {
        console.log(e);
      });
  }

  searchSzo1() {
    this.setState({
      currentSzavak: null,
      currentIndex: -1
    });

    SzavakDataService.findBySzo1(this.state.searchSzo1)
      .then(response => {
        this.setState({
          szotar: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  render() {
    const { searchSzo1, szotar, currentSzavak, currentIndex } = this.state;

    return (
      <div className="list row">
        <div className="col-md-8">
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Keres??s r??szlet alapj??n..."
              value={searchSzo1}
              onChange={this.onChangeSearchSzo1}
            />
            <div className="input-group-append">
              <button
                className="btn btn-outline-secondary"
                type="button"
                onClick={this.searchSzo1}
              >
                Keres??s
              </button>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <h4>Szavak list??ja</h4>

          <ul className="list-group">
            {szotar &&
              szotar.map((szavak, index) => (
                <li
                  className={
                    "list-group-item " +
                    (index === currentIndex ? "active" : "")
                  }
                  onClick={() => this.setActiveSzavak(szavak, index)}
                  key={index}
                >
                  {szavak.szo1}
                </li>
              ))}
          </ul>

          <button
            className="m-3 btn btn-sm btn-danger"
            onClick={() => { if (window.confirm('Biztos t??r??lni szeretn?? az ??sszes sz??t?')) this.removeAllSzotar() } } 
          >Remove all
            
          </button>
        </div>
        <div className="col-md-6">
          {currentSzavak ? (
            <div>
              <h4>Le??r??s:</h4>
              <div>
                <label>
                  <strong>Ukr??n:</strong>
                </label>{" "}
                {currentSzavak.szo1}
              </div>
              <div>
                <label>
                  <strong>Magyar:</strong>
                </label>{" "}
                {currentSzavak.szo2}
              </div>
              <div>
                <label>
                  <strong>??llapot:</strong>
                </label>{" "}
                {currentSzavak.published ? "Ellen??rizve" : "Ellen??rz??sre v??r"}
              </div>

              <Link
                to={"/szotar/" + currentSzavak.id}
                className="badge badge-warning"
              >
                Szerkeszt??s
              </Link>
            </div>
          ) : (
            <div>
              <br />
              <p>Kattints r?? egy sz??ra!</p>
            </div>
          )}
        </div>
      </div>
    );
  }
}