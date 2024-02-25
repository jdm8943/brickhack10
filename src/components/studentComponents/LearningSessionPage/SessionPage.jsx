import React from 'react';
import Question from './Question'; // Import the QuizQuestion component
import QuestionMC from './QuestionMC';
import QuestionBlanks from './QuestionBlanks'
import QuestionShortA from './QuestionShortA'
import { collection, where, getDocs, query } from 'firebase/firestore';
import { Button, Row, Col } from 'react-bootstrap';


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
            loadingResponse: false,
        }
    }

    componentDidMount = () => {
        this.populateQuestions();
    }

    createMCQuestion = (question) => {
        return (
            <QuestionMC
                displaySuccess={this.answerCorrect}
                displayFailure={this.answerFailure}
                question={question}
            />
        )
    }

    createBlankQuestion = (question) => {
        return (
            <QuestionBlanks
                displaySuccess={this.answerCorrect}
                displayFailure={this.answerFailure}
                question={question}
            />
        )
    }

    createShortAnswer = (question) => {
        return (
            <QuestionShortA
                displaySuccess={this.answerCorrect}
                displayFailure={this.answerFailure}
                question={question}
                {...this.props}
            />
        )
    }

    populateQuestions = () => {
        const quesQuery = query(collection(this.props.firestoredb, "Questions")
            , where("subject", "==", this.state.subjectPref)
            , where("difficulty", "==", this.state.difficultyPref)
            // for testing
            , where("format", "==", "short answer")
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
                if (questionsArr.length === 0) {
                    console.log("No questions Found")
                }

                const formatToElementRender = {
                    "multiple choice": this.createMCQuestion,
                    "blanks": this.createBlankQuestion,
                    "short answer": this.createShortAnswer,
                }

                console.log(questionsArr)

                this.setState(
                    {
                        questions: questionsArr,
                        curQuestionIndex: 1,
                        currentQuestion: formatToElementRender[questionsArr[0].format](questionsArr[0])
                    },
                    () => { console.log(this.state.questions) }
                )
            }).catch((error) => {
                console.log("Error getting questions: ", error);
            })


    }

    answerCorrect = () => {
        this.setState({ showNextQuestionButton: true, showTryAgainMessage: false, openAiResponse: null, showOpenAi: false })
    }

    answerFailure = (openAiResponse) => {
        this.setState({ showTryAgainMessage: true, openAiResponse: openAiResponse, showNextQuestionButton: false })
    }

    nextButtonClicked = (e) => {
        const formatToElementRender = {
            "multiple choice": this.createMCQuestion,
            "blanks": this.createBlankQuestion,
            "short answer": this.createShortAnswer,
        }
        this.setState((prevState) => {
            return {
                curQuestionIndex: prevState.curQuestionIndex + 1,
                currentQuestion: formatToElementRender[this.state.questions[prevState.curQuestionIndex].format](prevState.curQuestionIndex),
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
                <div>Incorrect Answer: Try Again</div>
                {this.state.openAiResponse ? <Button type='primary' onClick={() => this.setState({ showOpenAi: true })}>Show SQueaLy Suggestion</Button> : <></>}
            </>
        )
    }

    renderOpenAiMessage = () => {
        return (<>
            {this.state.openAiResponse !== null ? <div>{this.state.openAiResponse.message}</div> : <></>}
        </>
        )
    }

    render = () => {
        return (
            <>
                <Row>
                    <Col>
                        {this.state.currentQuestion}
                    </Col>
                </Row>
                <Row>
                    <Col>
                        {this.state.showNextQuestionButton ? this.renderNextQuestionButton() : <></>}
                    </Col>
                </Row>
                <Row>
                    <Col>
                        {this.state.showTryAgainMessage ? this.renderFailureMessage() : <></>}
                    </Col>
                </Row>
                <Row>
                    <Col>
                        {this.state.showOpenAi ? this.renderOpenAiMessage() : <></>}
                    </Col>
                </Row>
            </>
        );
    }
}

export default SessionPage;
