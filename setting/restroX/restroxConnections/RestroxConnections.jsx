import React from "react";
import Avatar from "@components/avatar";
import { Card, CardBody } from "reactstrap";
import classnames from "classnames";

const RestroxConnections = ({ data }) => {
  const renderSuggestion = () => {
    return data.map((suggestion, index) => {
      return (
        <div
          key={index}
          className={classnames(
            "d-flex justify-content-start align-items-center",
            {
              "mt-2": index === 0,
              "mt-1": index !== 0,
            },
          )}
        >
          <a href={suggestion.mutualFriend}>
            <Avatar
              className="me-75"
              img={suggestion.avatar}
              imgHeight="35"
              imgWidth="35"
              style={{ cursor: "pointer" }}
            ></Avatar>
          </a>

          <div className="profile-user-info" style={{ cursor: "pointer" }}>
            <h6 className="mb-0">{suggestion.social}</h6>
            <a href={suggestion.mutualFriend} style={{ color: "gray" }}>
              @{suggestion.name}
            </a>
          </div>
        </div>
      );
    });
  };

  return (
    <Card>
      <CardBody>
        <h5>Connections</h5>
        {renderSuggestion()}
      </CardBody>
    </Card>
  );
};

export default RestroxConnections;
