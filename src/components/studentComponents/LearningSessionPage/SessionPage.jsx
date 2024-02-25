import React from 'react';
import Question from './Question'; // Import the QuizQuestion component
import QuestionMC from './QuestionMC';
import QuestionBlanks from './QuestionBlanks'
import QuestionShortA from './QuestionShortA'
import { collection, where, getDocs, query } from 'firebase/firestore';
import { Button, Row, Col, Card } from 'react-bootstrap';


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
            renderCard: null,
            sessionNetELO: 0
        }
    }

    componentDidMount = () => {
        this.populateQuestions();
    }

    updateNetELO = (correct, format) => {
        const prevNetElo = this.state.sessionNetELO;
        if (correct) {
            (format === "multiple choice" ? 
            this.setState({sessionNetELO: prevNetElo+5}) : 
            this.setState({sessionNetELO: prevNetElo+10})
            )
        } else {
            (format === "multiple choice" ? 
            this.setState({sessionNetELO: prevNetElo-5}) : 
            this.setState({sessionNetELO: prevNetElo-3})
            )
        }
    }

    createMCQuestion = (question) => {
        return (
            <QuestionMC
                displaySuccess={this.answerCorrect}
                displayFailure={this.answerFailure}
                question={question}
                updateNetELO={this.updateNetELO}
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
                updateNetELO={this.updateNetELO}
                {...this.props}
            />
        )
    }

    populateQuestions = () => {
        const quesQuery = query(collection(this.props.firestoredb, "Questions")
            , where("subject", "==", this.state.subjectPref)
            , where("difficulty", "==", this.state.difficultyPref)
            // for testing
            //, where("format", "==", "short answer")
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
        this.setState({ showNextQuestionButton: true, showTryAgainMessage: false, openAiResponse: null, showOpenAi: false, renderCard: true })
    }

    answerFailure = (openAiResponse) => {
        this.setState({ showTryAgainMessage: true, openAiResponse: openAiResponse, showNextQuestionButton: false, renderCard: true })
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
                renderCard: false,
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
            </>
        )
    }

    renderSuccessMessage = () => {
        return (
            <>
                <div>Correct</div>
            </>
        )
    }

    renderOpenAiMessage = () => {
        return (<>
            {this.state.openAiResponse !== null ? <div>{this.state.openAiResponse.message}</div> : <></>}
        </>
        )
    }

    renderNetELO = () => {
        return (
            <>
                <p>Net ELO for this session: {this.state.sessionNetELO}</p>
            </>
        )
    }

    render = () => {
        console.log(this.state.renderCard)
        return (
            <>
                <Row>
                    <Col>
                        {this.state.currentQuestion}
                    </Col>
                </Row>
                {this.state.renderCard &&
                    <Row>
                        <Col>
                            <Card style={{margin: "10px"}}>
                                <Card.Header>
                                    {this.state.showTryAgainMessage ? this.renderFailureMessage() : <></>}
                                    {this.state.showNextQuestionButton ? this.renderSuccessMessage() : <></>}
                                </Card.Header>
                                {this.state.showNextQuestionButton ? this.renderNextQuestionButton() : <></>}
                                {this.state.showTryAgainMessage ? <Button type='primary' onClick={() => this.setState({ showOpenAi: true })}>Show SQueaLy Suggestion</Button> : <></>}
                                {this.state.showOpenAi ? this.renderOpenAiMessage() : <></>}

                            </Card>
                        </Col>
                    </Row>
                }
            </>
        );
    }
}

export default SessionPage;
