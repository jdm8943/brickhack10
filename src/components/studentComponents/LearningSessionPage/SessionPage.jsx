import React from 'react';
import QuestionPage from './Question'; // Import the QuizQuestion component
import { collection, where, getDocs, query } from 'firebase/firestore';


class SessionPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            difficultyPref: "easy",
            subjectPref: "sql",
            questions: null,
        }
    }

    componentDidMount = () => {
        this.populateQuestions();
    }

    populateQuestions = () => {
        const quesQuery = query(collection(this.props.firestoredb, "Questions")
            , where("subject", "==", this.state.subjectPref)
            , where("difficulty", "==", this.state.difficultyPref))

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
                    () => {console.log(questions)}
                )
            }).catch((error) => {
                console.log("Error getting questions: ", error);
            })


    }

    render = () => {
        return (
            <>
            
            </>
        );
    }
}

export default SessionPage;
