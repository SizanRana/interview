import React from "react";
import { Edit } from "react-feather";
import { Button, Card, CardImg } from "reactstrap";

const RestroxProfileHeader = ({ data }) => {
  return (
    <Card className="profile-header mb-2">
      <CardImg src={data.coverImg} alt="User Profile Image" top />
      <div className="position-relative">
        <div
          className="profile-img-container d-flex align-items-center position-absolute"
          style={{ left: "30px", bottom: "-22px" }}
        >
          <div className="profile-img rounded">
            <img
              className="rounded img-fluid rounded"
              src={data.avatar}
              alt="Card image"
              style={{
                width: "110px",
                height: "110px",
                border: "5px solid white",
              }}
            />
          </div>

          <div className="profile-title ms-3">
            <h2 className="text-white">{data.username}</h2>
            <p className="text-white">{data.designation}</p>
          </div>
        </div>
      </div>

      <div className="bg-white d-flex justify-content-end p-1">
        <Button color="primary ms-auto">
          <Edit className="d-block d-md-none" size={14} />
          <span className="fw-bold d-none d-md-block">Contact</span>
        </Button>
      </div>
    </Card>
  );
};

export default RestroxProfileHeader;
