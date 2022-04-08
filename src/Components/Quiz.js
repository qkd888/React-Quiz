import React, { Component } from "react"; // This import statement allows access to the React library
import { QuizData3 } from "./QuizData3"; // Importing the QuizData3 component
import GameOver from "./GameOver"; // Importing the GameOver component
import QuizSection from "./QuizSection"; // Importing the QuizSection component
import ButtonSection from "./ButtonSection"; // Importing the ButtonSection component
import Play from "./Play"; // Importing the Play component
import Rules from "./Rules"; // Importing the Rules component

var QuizData = QuizData3; // Assigning the QuizData array to a variable

export default class Quiz extends Component {
  // Statelful component declaration
  state = {
    userAnswer: null, //setting the userAnswer state to null
    currentQuestion: 0, //setting the currentQuestion state to zero
    options: [], //setting the options state to an empty array
    quizEnd: false, //setting the quizEnd state to false
    score: 0, //setting the score state to zero
    disabled: true, //setting the disabled state to true
    quizStarted: false, //setting the quizStarted state to false
    rules: false, //setting the rules state to false
  };

  //This function sets the state of question,options and answer
  //to the question,options and answer properties of an object
  // at a specific index in the QuizData3 array of objects
  loadQuiz = () => {
    const { currentQuestion } = this.state; // Destructuring the state
    this.setState(() => {
      return {
        question: QuizData[currentQuestion].question,
        options: QuizData[currentQuestion].options,
        answer: QuizData[currentQuestion].answer,
      };
    });
  };

  //This function invokes the loadQuiz function
  //when this component mounts
  componentDidMount() {
    this.loadQuiz();
  }

  //This function adds 1 to the state of  currentQuestion
  //It also checks whether the state of userAnswer is the same
  //as the state of answer. If it is, it adds 1 to the state
  //of score
  nextQuestionHandler = () => {
    const { score, userAnswer, answer } = this.state; // Destructuring the state
    this.setState({
      currentQuestion: this.state.currentQuestion + 1,
    });

    if (userAnswer === answer) {
      this.setState({
        score: score + 1,
      });
    }
  };

  //This function checks if the component updated
  //If the component did update and the states of
  //currentQuestion, question, options, answer and disabled
  // are updated

  componentDidUpdate(prevProps, prevState) {
    const { currentQuestion } = this.state; // Destructuring the state
    if (this.state.currentQuestion !== prevState.currentQuestion) {
      this.setState(() => {
        return {
          disabled: true,
          question: QuizData[currentQuestion].question,
          options: QuizData[currentQuestion].options,
          answer: QuizData[currentQuestion].answer,
        };
      });
    }
  }

  //This function sets the state of userAnswer to the
  //the answer that the user clicks on, it also sets the
  //state of disabled to false
  checkAnswer = (answer) => {
    this.setState({
      userAnswer: answer,
      disabled: false,
    });
  };

  //This function checks if the state of currentQuestion
  //is equals to the length of the QuizData array minus 1
  //if it is, it sets the state of quizEnd to true
  //It also checks if the state of userAnswer is equals
  //to the state of answer, if it is it adds 1 to the
  //state of score
  finishHandler = () => {
    const { score, userAnswer, answer, currentQuestion } = this.state; // Destructuring the state
    if (currentQuestion === QuizData.length - 1) {
      this.setState({ quizEnd: true });
    }

    if (userAnswer === answer) {
      this.setState({
        score: score + 1,
      });
    }
  };

  //This function restarts the game by setting
  //resetting the states, it also invokes the loadQuiz
  // function
  playAgain = () => {
    this.setState({
      quizEnd: false,
      currentQuestion: 0,
      score: 0,
      quizStarted: false,
    });
    this.loadQuiz();
  };

  //This function starts the game by setting the state
  //of quizStarted to true
  StartGame = () => {
    this.setState({
      quizStarted: true,
    });
  };

  //This function alerts to the user their current score'
  //when they quit the game, it also resets the states
  quitGame = () => {
    alert(
      "You quit the game, Your score is:" +
        " " +
        this.state.score +
        "/" +
        QuizData.length
    );
    this.setState({
      quizEnd: false,
      currentQuestion: 0,
      score: 0,
      quizStarted: false,
    });
  };

  //This function displays the rules by setting the states
  //of rules to true
  getRules = () => {
    this.setState({
      rules: true,
    });
  };

  //this function closes the rules by setting the state of
  //rules to false
  closeRules = () => {
    const { rules } = this.state; // Destructuring the state
    this.setState({
      rules: !rules,
    });
  };

  render() {
    // Destructuring the state
    const {
      question,
      options,
      currentQuestion,
      userAnswer,
      quizEnd,
      quizStarted,
      score,
      disabled,
      rules,
    } = this.state;

    //If the state of quizEnd is true, the GameOver component
    //is returned. The states of score and currentQuestion are
    //passed to the component as props
    //The playAgain method and the QuizData array are also
    //passed to the component as props
    if (quizEnd) {
      return (
        <GameOver
          score={score}
          QuizData={QuizData}
          currentQuestion
          playAgain={this.playAgain}
        />
      );
    }

    //Else if the state of quizStared is false
    //the Play component is returned, the StartGame
    //method is passed to the component as a prop
    else if (!quizStarted) {
      return <Play startGame={this.StartGame} />;
    }

    // Else the QuizSection component, ButtonSection component
    // and the Rules component are returned
    else {
      return (
        <div>
          <div className="quizSection">
            {/*The states of question, options, currentQuestion and
             userAnswer are passed to the component as props.
             The QuizData and the checkAnswer method are also passed 
             as props*/}
            <QuizSection
              question={question}
              options={options}
              currentQuestion={currentQuestion}
              userAnswer={userAnswer}
              checkAnswer={this.checkAnswer}
              QuizData={QuizData}
            />
          </div>
          <div className="rulesSection">
            {" "}
            <Rules rules={rules} closeRules={this.closeRules} />
          </div>
          <div className="buttonSection">
            {/*The QuizData array, nextQuestionHandler method, finishHandler
             method, getRules method, quitGame method are passed to the
             component as props. The states of disabled and currentQuestion are 
             also passed to the component as props*/}
            <ButtonSection
              QuizData={QuizData}
              disabled={disabled}
              currentQuestion={currentQuestion}
              quitGame={this.quitGame}
              getRules={this.getRules}
              finishHandler={this.finishHandler}
              nextQuestionHandler={this.nextQuestionHandler}
            />
          </div>
        </div>
      );
    }
  }
}
