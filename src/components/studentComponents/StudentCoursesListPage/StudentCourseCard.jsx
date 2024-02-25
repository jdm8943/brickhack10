import React from 'react';
import { Card, CardImg, CardBody, CardTitle, CardText, Button } from 'react-bootstrap';

class StudentCourseCard extends React.Component {
  constructor(props) {
    super(props);
    console.log(this.props)
    this.state = {
        courseInfo: this.props,
    }
  }



  render = () => {
    console.log(this.state.courseInfo)
    return (
      <Card>
        {/* implement later <Card.Img variant="top" src={information.image} alt={information.title} /> */}
        <Card.Body>
          <Card.Title>{this.state.courseInfo.name}</Card.Title>
          {/* display name is the name of the instructor */}
          <Card.Subtitle>{this.state.courseInfo.displayName}</Card.Subtitle>   
          <Card.Text>{this.state.courseInfo.description}</Card.Text>
        </Card.Body>  
        <Button disabled variant="primary">Go to Course</Button>
      </Card>
      );
  }
}

export default StudentCourseCard;
