import React from 'react';
import { Form } from 'react-bootstrap';
import Question from './Question';

class QuestionMC extends Question {
    constructor(props) {
        super(props);
        this.state = {
            optionSelectedString: "", 
            indexChecked:  -1,
            correct: false,  // Indicates if the option that is currently checked is the correct answer
        };
    }

    CheckAnswer = () => {
        (this.state.correct ? this.props.displaySuccess() : this.props.displayFailure(null));
        (this.state.correct ? console.log("correct answer from check answer") : console.log("wrong answer from check answer"));
    }

    handleChange = (event, idxChecked, optionString) => {
        // console.log(event.target.value);
        // console.log(event.target.checked);
        console.log(idxChecked);
        this.setState(
            { 
                indexChecked: idxChecked,
                optionSelectedString: optionString,
                correct: (idxChecked === this.props.question.answerIdx),
            }, () => {
                console.log(this.state.correct)
                console.log(this.props.question)
            }
        );
        
    }

    render() {
        return (
            <>
                <Form>
                    <Form.Label>{this.props.question.questionText}</Form.Label>
                    {this.props.question.options.map((option, index) => (
                        <Form.Check
                            key={index}
                            type="checkbox"
                            id={`question-${this.props.question}`} // Use question text as ID for accessibility
                            checked={this.state.indexChecked === index}
                            onChange={(e) => this.handleChange(e, index, option)}
                            label={option} // Label is provided directly in the Form.Check
                        />
                    ))}
                </Form>
                {/* {this.state.correct ? <p className="confirmation">Correct! "{this.state.optionSelectedString}"</p> : this.state.indexChecked != -1 ? <p className="confirmation">Incorrect</p> : <></>}  */}
                {super.render()}
            </>
        );
    }
}

export default QuestionMC;
