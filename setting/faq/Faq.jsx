import React, { useEffect, useState } from "react";
import BlankPageCard from "@reusable/blankPageCard/BlankPageCard";
import faqData from "./faqData/faqData";
import FaqFilter from "./faqFilter/FaqFilter";
import Questions from "./questions/Questions";

const Faq = () => {
  const [data, setData] = useState({});
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    if (searchTerm === "") {
      setData(faqData.faqData);
    }

    const filteredData = {};

    const queryLowered = searchTerm.toLowerCase();

    Object.entries(faqData.faqData).forEach((entry) => {
      const [categoryName, categoryObj] = entry;
      const filteredQAndAOfCategory = categoryObj.qandA.filter((qAndAObj) => {
        return qAndAObj.question.toLowerCase().includes(queryLowered);
      });
      filteredData[categoryName] = {
        ...categoryObj,
        qandA: filteredQAndAOfCategory.length ? filteredQAndAOfCategory : [],
      };
    });

    setData(filteredData);
  }, [searchTerm]);

  return (
    <BlankPageCard>
      <div>
        <FaqFilter searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      </div>
      <div>
        {faqData !== null && (
          <Questions
            data={data}
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
          />
        )}
      </div>
    </BlankPageCard>
  );
};

export default Faq;
