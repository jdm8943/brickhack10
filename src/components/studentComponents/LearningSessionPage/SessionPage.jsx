import React from 'react';
import Question from './Question'; // Import the QuizQuestion component
import QuestionMC from './QuestionMC';
import { collection, where, getDocs, query } from 'firebase/firestore';


class SessionPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            difficultyPref: "easy",
            subjectPref: "sql",
            questions: null,
            currentQuestion: null,
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
                        currentQuestion: <QuestionMC
                            displaySuccess={this.showNextQuestionButton}
                            displayFailure={this.displayFailure}
                            question={questionsArr[0]}
                        />
                    },
                    () => { console.log(this.state.questions) }
                )
            }).catch((error) => {
                console.log("Error getting questions: ", error);
            })


    }

    showNextQuestionButton = () => {

    }

    displayFailure = () => {

    }

    render = () => {
        return (
            <>
                {this.state.currentQuestion}
            </>
        );
    }
}

export default SessionPage;
