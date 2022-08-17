import React from "react";
import { Card, CardBody, Col, Row } from "reactstrap";

const RestroxLatestPhotos = ({ data }) => {
  const renderPhotos = () => {
    return data.map((item, index) => {
      return (
        <Col key={index} md="4" xs="6" className="profile-latest-img mt-1">
          <a href="/" onClick={(e) => e.preventDefault()}>
            <img
              className="img-fluid rounded"
              src={item.img}
              alt="latest-photo"
            />
          </a>
        </Col>
      );
    });
  };
  return (
    <Card>
      <CardBody>
        <h5 className="mb-0">Latest Photos</h5>
        <Row>{renderPhotos()}</Row>
      </CardBody>
    </Card>
  );
};

export default RestroxLatestPhotos;
