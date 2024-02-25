import React from 'react';
import { Form } from 'react-bootstrap';
import Question from './Question';

class QuestionMC extends Question {
    constructor(props) {
        super(props);
        this.state = {
            optionChecked: "", 
            correct: false,  // Indicates if the option that is currently checked is the correct answer
        };
    }

    handleChange = (event, optionChecked) => {
        // console.log(event.target.value);
        // console.log(event.target.checked);
        console.log(optionChecked);
        this.setState(
            { 
                optionChecked: optionChecked,
                correct: (optionChecked === this.props.answer),
            }, () => {console.log(this.state.correct)}
        );
        
    }

    render() {
        const { question, answer, options } = this.props; // Destructure question and answer props
        return (
            <>
                <Form>
                    <Form.Label>{question}</Form.Label>
                    {options.map((option, index) => (
                        <Form.Check
                            type="checkbox"
                            id={`question-${question}`} // Use question text as ID for accessibility
                            checked={this.state.optionChecked === option}
                            onChange={(e) => this.handleChange(e, option)}
                            label={option} // Label is provided directly in the Form.Check
                        />
                    ))}
                </Form>
                {this.state.correct && <p className="answer">{answer}</p>} 
            </>
        );
    }
}

export default QuestionMC;
