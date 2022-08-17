import React, { Fragment, useEffect, useState } from "react";
import { Col, Row } from "reactstrap";
import RestroxAbout from "./restroxAbout/RestroxAbout";
import RestroxConnections from "./restroxConnections/RestroxConnections";
import RestroxLatestPhotos from "./restroxLatestPhotos/RestroxLatestPhotos";
import RestroxPoll from "./restroxPoll/RestroxPoll";
import restroXData from "./restroxProfileData/RestroxProfileData";
import RestroxProfileHeader from "./restroxProfileHeader/RestroxProfileHeader";
import RestroxProfilePosts from "./restroxProfilePosts/RestroxProfilePosts";
import RestroxSuggestedPages from "./restroxSuggestedPages/RestroxSuggestedPages";
import RestroxTwitterFeed from "./restroxTwitterFeed/RestroxTwitterFeed";

const RestroX = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    setData(restroXData);
  }, []);

  return (
    <Fragment>
      {data !== null && (
        <div id="user-profile">
          <Row>
            <Col sm="12">
              <RestroxProfileHeader data={data?.profileData?.header} />
            </Col>
          </Row>

          <section id="profile-info">
            <Row>
              <Col>
                <RestroxProfilePosts data={data?.profileData?.post} />
              </Col>
              <Col
                lg={{ size: 4, order: 4 }}
                sm={{ size: 12 }}
                xs={{ order: 3 }}
              >
                <RestroxLatestPhotos data={data?.profileData?.latestPhotos} />
                <RestroxConnections data={data?.profileData?.suggestions} />
                <RestroxPoll data={data?.profileData?.polls} />
                <RestroxAbout data={data?.profileData?.userAbout} />
                <RestroxSuggestedPages
                  data={data?.profileData?.suggestedPages}
                />
                <RestroxTwitterFeed data={data?.profileData?.twitterFeeds} />
              </Col>
            </Row>
          </section>
        </div>
      )}
    </Fragment>
  );
};

export default RestroX;
