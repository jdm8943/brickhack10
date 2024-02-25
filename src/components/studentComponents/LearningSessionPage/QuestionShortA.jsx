import React from 'react';
import { Form } from 'react-bootstrap';
import Question from './Question';

class QuestionShortA extends Question {
    constructor(props) {
        super(props);
        this.state = {
            userInput: "", 
            correct: false,  // Indicates if the option that is currently checked is the correct answer
        };
    }

    render() {
        return (
            <>
                <Form>
                    <Form.Label>{this.props.question.questionText}</Form.Label>
                    <Form.Control type="text" placeholder="Write SQL command here." />
                </Form>
                {/* {this.state.correct ? <p className="confirmation">Correct! "{this.state.optionSelectedString}"</p> : this.state.indexChecked != -1 ? <p className="confirmation">Incorrect</p> : <></>}  */}
                {super.render()}
            </>
        );
    }
}

export default QuestionShortA;