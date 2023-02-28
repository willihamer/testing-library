import Col from 'react-bootstrap/Col'

const ToppingOption = ({ name, imagePath }) => {
  return (
    <Col xs={12} sm={6} lg={3} style={{ textAlign: 'center' }}>
      <img style={{ width: '75%' }} src={`http://localhost:3000/${imagePath}`} alt={`${name} topping`} />
    </Col>
  );
}

export default ToppingOption;