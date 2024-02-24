import React from 'react';

class Question extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.state = {
      isChecked: false, // Initially set the checkbox to unchecked
    };
  }

  handleChange(event) {
    this.setState({ isChecked: event.target.checked });
  }

  render() {
    const { question, answer } = this.props; // Destructure question and answer props
    return (
      <div className="quiz-question">
        <input
          type="checkbox"
          id={`question-${question}`} // Use question text as ID for accessibility
          checked={this.state.isChecked}
          onChange={this.handleChange}
        />
        <label htmlFor={`question-${question}`}>{question}</label>
        {this.state.isChecked && <p className="answer">{answer}</p>} // Display answer if checked
      </div>
    );
  }
}

export default Question;
