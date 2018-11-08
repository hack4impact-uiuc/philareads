import React, { Component } from 'react';
import {
  Card,
  CardBody,
  CardTitle,
  CardSubtitle,
  Form,
  FormGroup,
  Label,
  Input
} from 'reactstrap';
import '../styles/Filter.scss';
import PropTypes from 'prop-types';

class Filter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      grades: [],
      years: []
    };
  }

  renderGrades = () => {
    return this.props.gradeArr.map(x => (
      <FormGroup>
        <Label check>
          <Input type="checkbox" />
          {x}
        </Label>
      </FormGroup>
    ));
  };

  renderYears = () => {
    return this.props.yearArr.map(x => (
      <FormGroup>
        <Label check>
          <Input type="checkbox" />
          {x}
        </Label>
      </FormGroup>
    ));
  };

  render() {
    return (
      <Card>
        <CardBody>
          <CardTitle>Filter By...</CardTitle>
          <CardSubtitle>Grade</CardSubtitle>
          <Form className="filters">{this.renderGrades()}</Form>
          <CardSubtitle>Year</CardSubtitle>
          <Form className="filters">{this.renderYears()}</Form>
        </CardBody>
      </Card>
    );
  }
}

Filter.propTypes = {
  gradeArr: PropTypes.array.isRequired,
  yearArr: PropTypes.array.isRequired
};

export default Filter;
