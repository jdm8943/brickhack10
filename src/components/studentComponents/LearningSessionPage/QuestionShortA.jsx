import React from 'react';
import { Row, Col, Form, FormGroup, Card } from 'react-bootstrap';
import Question from './Question';
import { getFirestore, collection, getDocs, query, doc, getDoc, where, setDoc } from "firebase/firestore";

class QuestionShortA extends Question {
    constructor(props) {
        super(props);
        this.state = {
            postAnswerUrl: "http://127.0.0.1:8000/check_cmd",
            postPayload: null,
            userInput: "",
            matchGeneralAnswer: false,  // Indicates if the option that is currently checked is the correct answer
            database: ""
        };

        console.log(this.props)
        // const tableCol = collection(this.props.firestoredb, "ReferenceTables")
        // const tableDocRef = doc(tableCol, this.props.question.tableRef)

    }

    componentDidUpdate = (prevProps, prevState, snapshot) => {
        if (prevProps.question !== this.props.question) {
            getDoc(this.props.question.tableRef)
                .then((tableSnapshot) => {
                    const tableData = tableSnapshot.data()
                    console.log(tableData)
                    this.setState({
                        database: tableData.DBName,
                        columns: tableData.ColArray.join(",")
                    })
                })
                .catch((e) => {
                    console.log("Error: ", e)
                })
        }
    }

    componentDidMount = () => {
        console.log(this.props)
        getDoc(this.props.question.tableRef)
            .then((tableSnapshot) => {
                const tableData = tableSnapshot.data()
                console.log(tableData)
                this.setState({
                    database: tableData.DBName,
                    columns: tableData.ColArray.join(",")
                })
            })
            .catch((e) => {
                console.log("Error: ", e)
            })

    }

    CheckAnswer = () => {
        console.log(this.state.userInput)
        if (this.state.matchGeneralAnswer) {
            this.props.displaySuccess()
        } else {
            const pl = {
                cmd: this.state.userInput,
                correct_cmd: this.props.question.generalAnswer,
                description: this.props.question.questionText,
                db: this.state.database
            }
            this.sendQueryToBack(pl).then(res => {
                res.message === null ? this.props.displaySuccess() : this.props.displayFailure(res)
            });
            // this.setState({
            //     postPayload: {
            //         cmd: this.state.userInput,
            //         correct_cmd: this.props.question.generalAnswer,
            //         description: this.props.question.questionText,
            //         db: this.state.database
            //     }
            // }, () => {
            //     console.log(this.state.postPayload)
            //     this.sendQueryToBack();
            // })
        }
    }

    handleInput = (event) => {
        // console.log(event.target.value)
        this.setState(
            {
                userInput: event.target.value,
                matchGeneralAnswer: (this.props.question.generalAnswer === event.target.value)
            }
        )
    }

    sendQueryToBack = async (postData) => {
        this.setState({ loading: true });

        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(postData),
        };

        try {
            const response = await fetch(this.state.postAnswerUrl, options);
            console.log(response)
            if (!response.ok) {
                throw new Error(`Error: ${response.status}`);
            }

            const responseData = await response.json();
            console.log(responseData)
            this.setState({ loading: false });
            return responseData;

        } catch (error) {
            console.error('Error fetching data:', error);
            this.setState({ loading: false, error: error.message });
            return null;
        }
    };

    render() {
        return (
            <Card style={{ textAlign: 'center', backgroundColor: "var(--background)", margin: "10px" }}>
                <Card.Header as={"h3"}>
                    {this.props.question.questionText}
                </Card.Header>
                <Card.Subtitle>
                    <Row>
                        <Col>
                            <p>Columns: {this.state.columns}</p>
                        </Col>
                    </Row>
                </Card.Subtitle>
                <Card.Body style={{ backgroundColor: "var(--background)" }}>
                    <Form>
                        <FormGroup>
                            <Form.Control
                                type="input"
                                placeholder="Write SQL command here."
                                onChange={(e) => this.handleInput(e)}
                            />
                        </FormGroup>
                    </Form>
                    {super.render()}
                </Card.Body>
                {/* {this.state.correct ? <p className="confirmation">Correct! "{this.state.optionSelectedString}"</p> : this.state.indexChecked != -1 ? <p className="confirmation">Incorrect</p> : <></>}  */}
            </Card>
        );
    }
}

export default QuestionShortA;