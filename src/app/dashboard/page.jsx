"use client";
import React, { useEffect, useState } from "react";
import { Tree } from "react-tree-graph";
import Navbar from "@/components/navbar/Navbar";
import Link from "next/link";
import axios from "axios";
import ChartComponent from "@/components/TreeChart/Page";
import LoaderSpin from "@/components/loaderSpin/LoaderSpin";
import Cookies from "js-cookie";

const page = () => {

  const [graphTwoData, setGraphTwoData] = useState([]);
  const [graphOne, setGraphOne] = useState({});
  const [graphLoading, setGraphLoading] = useState(true);
  const [graphOneExist, setGrpahOneExist] = useState(false);
  const [graphTwoExist, setGrpahTwoExist] = useState(false);

  useEffect(() => {
    const handleGetFinData = async () => {
      try {
        const data = Cookies.get("Email");
        const response = await axios.post("/api/graph", { userId: data });
        const status = response.data.status;

        if (status === "success") {
          setGraphTwoData(response.data.data);
          const secGraph = response.data.data;
          const firstGraph = response.data.graphOne;

          setGraphOne(response.data.graphOne);
          if (secGraph.children.length > 0) {
            setGrpahTwoExist(true);
          }

          if (firstGraph.formattedMonths.length > 0) {
            setGrpahOneExist(true);
          }
        }

        setGraphLoading(false);
      } catch (error) {
        console.log(error);
        setGraphLoading(false);
      }
    };
    handleGetFinData();
  }, []);

  return (
    <>
      <div className="w-full h-fit bg-white pb-[2rem] text-black relative">
        <Navbar />

        <p className="text-[2rem]  text-neutral-500 font-bold text-center">
          Finance
        </p>
        <div className="w-fit my-[1.4rem] mx-auto flex flex-end">
          <Link
            className="text-[1rem] w-fit px-4 font-bold text-end"
            href={"/charity-list"}
          >
            <button className="px-4 py-2 button2 relative">Charity list</button>
          </Link>
          <Link
            className="text-[1rem] w-fit px-4 font-bold text-end "
            href={"/upload"}
          >
            <button className="px-4 py-2 button2 relative">Upload file</button>
          </Link>
        </div>

        <div className="w-[80%] mx-auto shadow rounded-lg border h-[55vh] relative">
          {graphLoading ? (
            <LoaderSpin />
          ) : (
            <>
              {graphOneExist ? (
                <ChartComponent currentData={graphOne} />
              ) : (
                <div className="w-full h-full flex justify-center">
                  <p className="m-auto">No data</p>
                </div>
              )}
            </>
          )}
        </div>

        <div
          id="treeWrapper"
          className="mt-[1.4rem] shadow rounded-lg w-[80%] mx-auto  border h-[55vh] relative"
        >
          {graphLoading ? (
            <LoaderSpin />
          ) : (
            <>
              {graphTwoExist ? (
                <Tree
                  data={graphTwoData}
                  nodeRadius={100}
                  margins={{ top: 2, bottom: 20, left: 50, right: 100 }}
                  height={340}
                  width={870}
                />
              ) : (
                <div className="w-full h-full flex justify-center">
                  <p className="m-auto">No data</p>
                </div>
              )}
            </>
          )}
        </div>
      </div>
   
    </>
  );
};

export default page;
