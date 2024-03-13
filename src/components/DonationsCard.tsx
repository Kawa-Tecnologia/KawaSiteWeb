import React from 'react';
import { Card, Button } from 'react-bootstrap';
import PropTypes from 'prop-types';

interface Institution {
  name: string;
  description: string;
  qr_code: string;
  image: string;
}

function DonationsCard({ institution }: { institution: Institution }) {
  return (
    <Card style={{ width: '18rem' }}>
      <Card.Img
        variant="top" 
        style={{ width: '100%', height: '200px', objectFit: 'cover' }} 
        src={institution.image} /> 

      <Card.Body>
        <Card.Title>{institution.name}</Card.Title>
        <Card.Text>{institution.description}</Card.Text>
        <Button variant="primary">Doar por PIX</Button>
      </Card.Body>
    </Card>
  );
}

DonationsCard.propTypes = {
  institution: PropTypes.shape({
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    qr_code: PropTypes.string.isRequired
  }).isRequired
};

export default DonationsCard;