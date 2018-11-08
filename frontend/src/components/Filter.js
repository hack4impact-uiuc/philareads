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
import CatalogCard from './CatalogCard';
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

  render() {
    return (
      <Card>
        <CardBody>
          <CardTitle>Filter By...</CardTitle>
          <CardSubtitle>Grade</CardSubtitle>
          <Form className="filters">{this.renderGrades()}</Form>
          {/*<CardSubtitle>Years</CardSubtitle>
            <Form className="filters">
              {this.renderYears()}
            </Form>
              <Label check>
                <Input type="checkbox" />
                Year
              </Label>
            </FormGroup>
          </Form>
          */}
        </CardBody>
      </Card>
    );
  }
}

Filter.propTypes = {
  gradeArr: PropTypes.array.isRequired
};

export default Filter;
