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


    CheckAnswer = (answer) => {
        console.log("Missing implementation of CheckAnswer() function")
    }

    render() {
        return (
            <>
                <Button type='primary' onClick={() => this.CheckAnswer(this.state.answer)}>Submit</Button>
            </>
        );
    }
}

export default Question;
