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
        const usersQ = query(collection(this.props.firestoredb, "Users"))//#endregion, orderBy("ELO"), limit(50))

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
                    { users: (usersar.filter(user => typeof user === 'object' && user.displayName && user.hasOwnProperty("ELO")).sort((a,b)=>b["ELO"]-a["ELO"])).slice(0,10)},
                    // { users: usersar },
                    () => {console.log(this.state.users)}
                )
            }).catch((error) => {
                console.log("Error getting users: ", error);
            })
        
    }

    render(){
        return (
            <div><h1>Student Global Leaderboard</h1>
                <ol><h5>
                {/* Use map() to generate JSX for each item */}
                {this.state.users.map((user, index) => (
                    <li key={index}>{user.displayName} : {user.ELO}</li>
                ))}</h5>
                </ol>
            </div>
        )
    }
}

export default StudentGlobalLeaderboardPage;