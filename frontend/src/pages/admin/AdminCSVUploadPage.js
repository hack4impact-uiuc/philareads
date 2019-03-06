import React, { Component } from 'react';
import Dropzone from 'react-dropzone';
import { Container, Row, Col, Button, Alert } from 'reactstrap';
import AdminNavigator from '../../components/admin/AdminNavigator';
import '../../styles/admin/AdminNavigator.scss';
import '../../styles/admin/AdminCSVUpload.scss';
import { bookFromCSV } from '../../utils/api';
class AdminCSVUploadPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hasAddedFiles: false,
      file: null,
      success: false
    };
  }
  onDrop = files => {
    console.log(files);
    this.setState({
      hasAddedFiles: true,
      file: files[0]
    });
    console.log('hello');
  };

  handleSubmit = async (event, formState) => {
    event.preventDefault();
    const { message, success } = await bookFromCSV(this.state.file);
    if (success) {
      this.setState({ success: true });
    } else {
      this.setState(state => ({
        errors: [{ message: message, key: state.numSubmits }],
        numSubmits: state.numSubmits + 1 //this is here so a new key is used, regenerating the element so the user knows the button was clicked.
      }));
    }
  };

  render() {
    return (
      <Container fluid className="csv-upload">
        <Row>
          <Col lg="2">
            <AdminNavigator />
          </Col>
          <Col lg="10" className="admin-home">
            <h1>Admin CSV Upload</h1>
            {this.state.success && (
              <Alert color="success">Books were successfully created.</Alert>
            )}
            {this.state.errors &&
              this.state.errors.length > 0 &&
              this.state.errors.map(error => (
                <Alert color="danger">{error.message}</Alert>
              ))}
            <hr />
            {/* TODO: Insert actual CSV template */}
            <p>
              Please click{' '}
              <a href={process.env.PUBLIC_URL + '/createbook.csv'}>here</a> to
              download the CSV template.
            </p>

            <Dropzone
              className="csv-drop"
              acceptClassName="accept"
              onDrop={this.onDrop}
            >
              {!this.state.hasAddedFiles ? (
                <h4>Drop files or click here</h4>
              ) : (
                <h4>{this.state.file.name}</h4>
              )}
            </Dropzone>
            <Button
              color="primary"
              block
              className="dropzone-submit"
              disabled={!this.state.hasAddedFiles}
              onClick={this.handleSubmit}
            >
              Submit
            </Button>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default AdminCSVUploadPage;
