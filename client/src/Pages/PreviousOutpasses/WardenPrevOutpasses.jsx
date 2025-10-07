import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import StudentRejectedOutpass from "../../Components/Outpasses/PreviousOutpass";
import { showWardenPreviousOutpasses } from "../../actions/outpassMovement";
import WardenNavbar from "../../Components/Navbar/WardenNavbar";

import "./WardenPrevOutpasses.css";

const WardenPrevOutpasses = () => {
  const dispatch = useDispatch();

  const outpassList = useSelector((state) => state.outpassMovementReducer.data);
  const [loading, setLoading] = useState(true);

  const User = JSON.parse(localStorage.getItem("Profile"));
  const employeeData = User?.result?.employee;

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      await dispatch(showWardenPreviousOutpasses({ employee: employeeData }));
      setLoading(false);
    };
    fetchData();
  }, [dispatch, employeeData]);

  return (
    <div className="w-prev">
      <WardenNavbar />
      <h1>Find your Previous Outpasses</h1>
      <div className="woutpasses">
        {loading ? (
          <h1>Loading ....</h1>
        ) : !Array.isArray(outpassList) ? (
          <h1>Invalid data format</h1>
        ) : outpassList.length === 0 ? (
          <h1>No previous outpasses found</h1>
        ) : (
          [...outpassList].reverse().map((outpass) => (
            <StudentRejectedOutpass outpass={outpass} key={outpass._id} />
          ))
        )}
      </div>
    </div>
  );
};

export default WardenPrevOutpasses;
