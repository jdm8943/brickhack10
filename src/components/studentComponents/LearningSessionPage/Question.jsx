import React from 'react';
import { Button} from 'react-bootstrap';

class Question extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            answer: null
        };
    }

    static defaultProps = {
        answeredCorrect: null,
        answeredFalse: null,
        question: null,
    }

    DisplayQuestion = () => {
        return (<div>Implement DisplayQuestionFunction</div>)
    }

    CheckAnswer = (answer) => {
        console.log("Missing implementation of CheckAnswer() function")
    }

    render() {
        return (
            <>
                {this.DisplayQuestion()}
                <Button type='primary' onClick={() => this.CheckAnswer(this.state.answer)}>Submit</Button>
            </>
        );
    }
}

export default Question;
