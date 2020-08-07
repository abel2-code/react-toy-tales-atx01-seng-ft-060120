import React from "react";
import "./App.css";

import Header from "./components/Header";
import ToyForm from "./components/ToyForm";
import ToyContainer from "./components/ToyContainer";

// import data from "./data";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      toys: [],
      display: false,
    };
  }

  componentDidMount() {
    fetch("http://localhost:3000/toys")
      .then((response) => response.json())
      .then((toys) => {
        this.setState({
          toys,
        });
      });
  }

  handleClick = () => {
    let newBoolean = !this.state.display;
    this.setState({
      display: newBoolean,
    });
  };

  trashToy = (id) => {
    fetch(`http://localhost:3000/toys/${id}`, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });
    const toysCopy = [...this.state.toys];
    const toys = toysCopy.filter((toy) => toy.id !== id);
    this.setState({ toys });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const toy = {
      name: e.target.name.value,
      image: e.target.image.value,
      likes: 0,
    };
    fetch("http://localhost:3000/toys", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(toy),
    })
      .then((response) => response.json())
      .then((toy) => {
        const toys = [...this.state.toys, toy];
        this.setState({ toys });
        this.handleClick();
      });
  };

  render() {
    return (
      <>
        <Header />
        {this.state.display ? (
          <ToyForm handleSubmit={this.handleSubmit} />
        ) : null}
        <div className="buttonContainer">
          <button onClick={this.handleClick}> Add a Toy </button>
        </div>
        <ToyContainer toys={this.state.toys} trashToy={this.trashToy} />
      </>
    );
  }
}

export default App;
