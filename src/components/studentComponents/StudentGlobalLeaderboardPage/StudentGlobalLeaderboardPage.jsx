import React from 'react';
import { collection, getDocs, query } from '@firebase/firestore';

class StudentGlobalLeaderboardPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            users: [],
        }
    }

    componentDidMount = () => {
        this.populateGlobalLeaderBoard()
    }

    populateGlobalLeaderBoard = () => {
        const usersQ = query(collection(this.props.firestoredb, "Users"))

        getDocs(usersQ)
            .then((usersSnapshot) => {
                const uDocs = []
                usersSnapshot.forEach((uDoc) => {
                    uDocs.push({ ...uDoc.data(), id: uDoc.id });
                })
                return uDocs;
            })
            .then((usersar) => {
                this.setState(
                    { users: usersar },
                    () => {console.log(this.state.users)}
                )
            }).catch((error) => {
                console.log("Error getting users: ", error);
            })
    }

    render(){
        return (
            <div>StudentGlobalLeaderboard</div>
        )
    }
}

export default StudentGlobalLeaderboardPage;