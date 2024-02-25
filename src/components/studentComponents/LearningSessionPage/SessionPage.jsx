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
        console.log(this.state.questions)
        this.setState({
            currentQuestion: <QuestionMC
                displaySuccess={this.showNextQuestionButton}
                displayFailure={this.displayFailure}
                question={this.state.questions[0]}
            />
        })
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
                return questionDocs;
            })
            .then((questions) => {
                this.setState(
                    { questions: questions },
                    () => { console.log(questions) }
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

            </>
        );
    }
}

export default SessionPage;
