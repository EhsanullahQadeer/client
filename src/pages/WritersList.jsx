import React, { useRef, useState } from "react";
import "./WritersList.css";
import LightNavbar from "../componenets/CommonComponents/LightNavbar";
import { writers } from "./data";
import { useEffect } from "react";
import RightComponent from "../componenets/CommonComponents/RightComponent";
import Footer from "../componenets/CommonComponents/Footer";
import SingleWriter from "../componenets/CommonComponents/SingleWriter";
import Header from "../componenets/CommonComponents/Header";
import { useDispatch, useSelector } from "react-redux";
import { setupGetTopWritters } from "../features/writerRequest/writerRequestThunk";
import { LoadApi } from "../componenets/logicFunctionalities/logics";

const WritersList = () => {
  const dispatch = useDispatch();
  const [writersData, setWritersData] = React.useState([]);
  const targetElementRef = useRef(null);
  const [page, setPage] = useState(1);
  const [totalBlogs, setTotalBlogs] = useState(10);

  let isLoadMore = page <= Math.ceil(totalBlogs / 10);
  function getTopWriters() {
    setPage((pre) => {
      let apiData = {
        pageIndex: pre,
        pageSize: 10,
      };
      dispatch(setupGetTopWritters(apiData)).then(({ payload }) => {
        setWritersData((pre) => {
          console.log(payload[0].totalRecords[0].total);
          return [...pre, ...payload[0].topWriter];
        });
      });
      return pre + 1;
    });
  }
  useEffect(() => {
    LoadApi(targetElementRef, getTopWriters);
  }, []);

  return (
    <div className="writerListMain">
      <LightNavbar signIn={true} getStarted={true} person={false} />
      {/*  */}
      <Header
        head="writers List"
        para=" Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy
            text ever since the 1500s."
      />
      {/*  */}

      <div className="writersListMain">
        <div className="writersListPart1">
          {writersData?.map((data) => {
            return <SingleWriter writer={data._id} />;
          })}
          {isLoadMore && (
            <button
              ref={targetElementRef}
              className="home-loadMore-btn invisible"
            >
              Load More
            </button>
          )}
        </div>

        <div className="writersListPart2">
          <RightComponent writerSideBar="disable" />
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default WritersList;
