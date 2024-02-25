import React from 'react';
import Question from './Question'; // Import the QuizQuestion component
import QuestionMC from './QuestionMC';
import { collection, where, getDocs, query } from 'firebase/firestore';
import { Button } from 'react-bootstrap';


class SessionPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            difficultyPref: "easy",
            subjectPref: "sql",
            questions: null,
            curQuestionIndex: null,
            currentQuestion: null,
            showNextQuestionButton: false,
            showTryAgainMessage: false,
            openAiResponse: null,
            showOpenAi: false,
        }
    }

    componentDidMount = () => {
        this.populateQuestions();
    }

    populateQuestions = () => {
        const quesQuery = query(collection(this.props.firestoredb, "Questions")
            , where("subject", "==", this.state.subjectPref)
            , where("difficulty", "==", this.state.difficultyPref)
            , where("format", "==", "multiple choice")
        )

        getDocs(quesQuery)
            .then((questionsSnapshot) => {
                const questionDocs = []
                questionsSnapshot.forEach((qDoc) => {
                    questionDocs.push({ ...qDoc.data(), id: qDoc.id });
                })
                // console.log(questionDocs)
                return questionDocs;
            })
            .then((questionsArr) => {
                console.log("updating questions state")
                this.setState(
                    {
                        questions: questionsArr,
                        curQuestionIndex: 1,
                        currentQuestion: <QuestionMC
                            displaySuccess={this.answerCorrect}
                            displayFailure={this.answerFailure}
                            question={questionsArr[0]}
                        />
                    },
                    () => { console.log(this.state.questions) }
                )
            }).catch((error) => {
                console.log("Error getting questions: ", error);
            })


    }

    answerCorrect = () => {
        this.setState({ showNextQuestionButton: true, showTryAgainMessage: false, openAiResponse: null })
    }

    answerFailure = (openAiResponse) => {
        this.setState({ showTryAgainMessage: true, openAiResponse: openAiResponse, showNextQuestionButton: false})
    }

    nextButtonClicked = (e) => {
        // TODO handle next question with type handling
        this.setState((prevState) => {
            return {
                curQuestionIndex: prevState.curQuestionIndex + 1,
                currentQuestion: <QuestionMC
                    displaySuccess={this.answerCorrect}
                    displayFailure={this.answerFailure}
                    question={this.state.questions[prevState.curQuestionIndex]}
                />,
                showTryAgainMessage: false, 
                openAiResponse: null, 
                showNextQuestionButton: false,
            }
        })
    }

    renderNextQuestionButton = () => {
        return (
            <Button onClick={this.nextButtonClicked} type="primary">
                Next Question
            </Button>
        )
    }

    renderFailureMessage = () => {
        return (
            <>
            <h3>Incorrect Answer: Try Again</h3>
            {this.state.openAiResponse ? <Button type='primary' onClick={() => this.setState({showOpenAi: true})}>Show OpenAI Suggestion</Button> : <></>}
            </>
        )
    }

    renderOpenAiMessage = () => {
        return (
            <h3>{this.state.openAiResponse}</h3>
        )
    }

    render = () => {
        return (
            <>
                {this.state.currentQuestion}
                {this.state.showNextQuestionButton ? this.renderNextQuestionButton() : <></>}
                {this.state.showTryAgainMessage ? this.renderFailureMessage() : <></>}
                {this.state.showOpenAi ? this.renderOpenAiMessage : <></>}
            </>
        );
    }
}

export default SessionPage;
