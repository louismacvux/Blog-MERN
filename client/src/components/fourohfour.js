import {React} from 'react';
import { Container, Row, Col, Button } from 'reactstrap';
import {useNavigate} from 'react-router-dom';

export default function FourOhFour(){
    const navigate = useNavigate();

    return (
      <Container fluid>
        <Row className="d-flex justify-content-center align-items-center">
          <Col xs={6} className="text-center">
              <h4>Looks like you're lost!</h4>
              <Button onClick={() => navigate("/feed")}>Feed</Button>
          </Col>
        </Row>
      </Container>
    );
}