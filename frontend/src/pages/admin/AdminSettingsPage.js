import React, { Component } from 'react';
import {
  Container,
  Row,
  Col,
  Alert,
  Card,
  CardBody,
  CardTitle,
  CardText,
  Form,
  FormGroup,
  Input,
  Label,
  FormFeedback,
  FormText,
  Button
} from 'reactstrap';
import { Link } from 'react-router-dom';
import AdminNavigator from '../../components/AdminNavigator';
import AdminPublishModal from '../../components/admin/AdminPublishModal';
import AdminYearModal from '../../components/admin/AdminYearModal';
import AdminYearSection from '../../components/admin/AdminYearSection';
import {
  getROCurrentYear,
  setROCurrentYear,
  getAllBooks,
  getBooksByYearGrade,
  getQuizzes
} from '../../utils/api';
import '../../styles/admin/AdminHome.scss';

class AdminSettingsPage extends Component {
  render() {
    return (
      <Container fluid>
        <Row>
          <Col lg="2">
            <AdminNavigator />
          </Col>
          <Col lg="6" className="admin-home">
            <AdminYearSection />
          </Col>
        </Row>
      </Container>
    );
  }
}

export default AdminSettingsPage;
