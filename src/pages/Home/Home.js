import React, { Component } from "react";
import "./Home.scss";
import Prompt from "../../components/Prompt/Prompt";
import Header from "../../components/Header/Header";
import Response from "../../components/Response/Response";
import { apiUtils } from "../../api/api";
import { v4 as uuidv4 } from "uuid";

export default class Home extends Component {
  state = {
    prompt: "",
    response: "",
    responseCards: [],
    isLoading: false,
    isError: false,
    isValid: true,
  };

  setPrompt = (prompt) => this.setState({ prompt });
  setValid = (isValid) => this.setState({isValid});

  getResponse = async (prompt) => {
    this.state.isLoading = true;
    this.state.isError = false;

    apiUtils.postPrompt(prompt)  
      .then(({ data }) => {
        const { prompt, responseCards } = this.state;
        this.setState({
          response: data.choices[0].text,
          responseCards: [
            { prompt, response: data.choices[0].text },
            ...responseCards,
          ]
        });
        localStorage.setItem(
          "responses",
          JSON.stringify([
            { prompt, response: data.choices[0].text },
            ...responseCards,
          ])
        );
      })
      .catch((err) => this.setState({ isError: true }))
      .finally(() => this.setState({ isLoading: false }));
  };

  componentDidMount() {
    const storedResponses = JSON.parse(localStorage.getItem("responses"));
    if (storedResponses !== null) {
      this.setState({
        responseCards: storedResponses,
      });
    }
  }

handleDelete = (index) => {
    const {responseCards} = this.state;
    responseCards.splice(index, 1);
    localStorage.setItem("responses", JSON.stringify(responseCards));
    this.setState({
        responseCards : responseCards
    })
  }


  render() {
    const { isLoading, responseCards, isError, isValid } = this.state;
    return (
      <div className="home">
        <Header />
        <h2 className="home__header">Hi, This is Completion AI App powered by OpenAPI !</h2>
        <div className="home__tips">
            <h4 className="home__tips__header">Here are some tips;</h4>
            <p className="home__tips__text">? Write a tagline for an ice cream shop. 🍦</p>
            <p className="home__tips__text">? Write a poem about smiling dinosaurs. 🦖 </p>
            <p className="home__tips__text">? Write a restaurant review based on rude waiters and food poisoning. 🍽️</p>        
        </div>
        {isError && (
          <p className="error">There was an error with your request. Please try again.</p>
        )}
        <Prompt
          setPrompt={this.setPrompt}
          getResponse={this.getResponse}
          isLoading={isLoading}
          setValid={this.setValid}
        />
        {console.log(isValid)}
        {!isValid && (
          <p className="error">Prompt cannot be less then 3 charachters.</p>
        )}
        <h2 className="response__header" id="responses">
          Responses
        </h2>
        <ul aria-labelledby="responses" className="response__list">
          {responseCards.map((card, index) => (
            <li key={uuidv4()} className="response__card">
              <Response card={card} index={index} handleDelete={this.handleDelete}/>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}
