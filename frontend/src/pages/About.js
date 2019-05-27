import React, { Component } from 'react';
import { Container, Card, CardBody, Media } from 'reactstrap';
import DocumentTitle from 'react-document-title';

import '../styles/About.scss';
import logo from '../images/philareadslogo.png';

class About extends Component {
  render() {
    return (
      <DocumentTitle title="About">
        <Container>
          <h1 align="center">Mission</h1>
          <Card>
            <CardBody>
              <Media>
                <Media href="#">
                  <Media
                    className="media"
                    object
                    src={logo}
                    alt="philareads-logo"
                  />
                </Media>
              </Media>
              <h4>
                The mission of Philadelphia READS is to provide access to books
                and community programs to foster a love of reading and increase
                literacy in Philadelphia.
              </h4>
              <p className="description">
                Philadelphia READS was founded in 1997 as an independent
                initiative of Mayor Rendell's office under the leadership of
                literacy guru Marcienne Mattleman. While our programs have
                evolved over the years, the one thing that has remained
                constant, is that we continue to ensure is that Philadelphia is
                raising a city of readers.
              </p>
              <br />
              <h6>
                <strong>How we serve:</strong>
              </h6>

              <ul>
                <li>
                  We provide new and gently used books to children and families,
                  teachers, schools, and other nonprofit partners.
                </li>
                <li>
                  We offer literacy and support programs for children and
                  families across the city.
                </li>
                <li>
                  We generate excitement and a love for reading by engaging
                  children and partnering with families, volunteers, schools,
                  faith-based organizations, corporations, nonprofits,
                  government, and the entire community!
                </li>
              </ul>
              <br />
              <h6>
                {' '}
                <strong>Four Core Literacy Programs:</strong>
              </h6>
              <ul>
                <li>Power Partners</li>
                <li>Reading Olympics</li>
                <li>Book Bank</li>
                <li>Summer READS</li>
              </ul>
              <br />
              <h4 align="center">
                Learn more at:{' '}
                <a href="https://www.philareads.org/">
                  https://www.philareads.org/
                </a>
              </h4>
            </CardBody>
          </Card>
        </Container>
      </DocumentTitle>
    );
  }
}

export default About;
