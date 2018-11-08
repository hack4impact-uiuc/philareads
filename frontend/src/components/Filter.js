import React, { Component } from 'react';
import {
  Card,
  CardText,
  CardBody,
  CardTitle,
  CardSubtitle,
  Form,
  FormGroup,
  Label,
  Input
} from 'reactstrap';
import '../styles/Filter.scss';

class Filter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      grades: [],
      years: []
    };
  }

  renderGrades = () => {};
  render() {
    return (
      <Card>
        <CardBody>
          <CardTitle>Filter By...</CardTitle>
          <Form className="filters">
            <FormGroup>
              <Label check>
                <Input type="checkbox" />
                Grade
              </Label>
            </FormGroup>
            <FormGroup>
              <Label check>
                <Input type="checkbox" />
                Year
              </Label>
            </FormGroup>
          </Form>
        </CardBody>
      </Card>
    );
  }
}

export default Filter;
