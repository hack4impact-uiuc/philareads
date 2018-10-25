import React, { Component } from 'react';
import {
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  FormText,
  Container,
  Row,
  Col,
  Card,
  CardText,
  CardBody,
  CardTitle,
  CardSubtitle
} from 'reactstrap';

class Search extends Component {
  render() {
    return (
      <Container fluid={true}>
        <Row>
          <Form inline>
            <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
              <Label for="searchBar" className="mr-sm-2">
                Search
              </Label>
              <Input
                type="search"
                name="search"
                id="searchBar"
                placeholder="Search for a book..."
                bsSize="lg"
              />
            </FormGroup>
          </Form>
        </Row>

        <Row>
          <Col lg="4">
            <Card>
              <CardBody>
                <CardTitle>Filter</CardTitle>
                <CardText>List of filters you can apply</CardText>
              </CardBody>
            </Card>
          </Col>

          <Col lg="8">
            <Card>
              <CardBody>
                <CardTitle>Search Results</CardTitle>
                <CardText>List of books outputted from search</CardText>
                <Card>
                  <CardTitle>Winnie the Pooh 1</CardTitle>
                  <CardText>Author, Grade, Year</CardText>
                </Card>
                <Card>
                  <CardTitle>Winnie the Pooh 2</CardTitle>
                  <CardText>Author, Grade, Year</CardText>
                </Card>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Search;
