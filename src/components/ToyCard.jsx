import React, { Component } from "react";

class ToyCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      likes: props.toy.likes,
    };
  }

  handleLikeClick = () => {
    const likes = this.state.likes + 1;
    this.setState({ likes });
    fetch(`http://localhost:3000/toys/${this.props.toy.id}`, {
      method: "PATCH",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ likes }),
    });
  };

  render() {
    const toy = this.props.toy;
    return (
      <div className="card">
        <h2>{toy.name}</h2>
        <img src={toy.image} alt={toy.name} className="toy-avatar" />
        <p>{this.state.likes} Likes </p>
        <button onClick={this.handleLikeClick} className="like-btn">
          Like {"<3"}
        </button>
        <button onClick={() => this.props.trashToy(toy.id)} className="del-btn">
          Donate to GoodWill
        </button>
      </div>
    );
  }
}

export default ToyCard;
