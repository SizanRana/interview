import React from "react";
import { Card, CardBody, CardText } from "reactstrap";
import Avatar from "@components/avatar";

const RestroxProfilePosts = ({ data }) => {
  return (
    <div>
      {data.map((post) => {
        return (
          <Card className="post" key={post.username}>
            <CardBody>
              <div className="d-flex justify-content-start align-items-center mb-1">
                <Avatar
                  className="me-1"
                  img={post.avatar}
                  imgHeight="50"
                  imgWidth="50"
                />
                <div className="profile-user-info">
                  <h6 className="mb-0">{post.username}</h6>
                  <small className="text-muted">{post.postTime}</small>
                </div>
              </div>
              <CardText>{post.postText}</CardText>

              {post.postImg && (
                <img
                  src={post.postImg}
                  alt={post.username}
                  className="img-fluid rounded mb-75"
                />
              )}
            </CardBody>
          </Card>
        );
      })}
    </div>
  );
};

export default RestroxProfilePosts;
