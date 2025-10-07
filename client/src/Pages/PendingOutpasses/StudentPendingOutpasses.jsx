import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import StudentAppliedOutpass from "../../Components/Outpasses/StudentAppliedOutpass";
import StudentNavbar from "../../Components/Navbar/StudentNavbar";
import { postAppliedOutpasses } from "../../actions/outpassMovement";

import "./StudentPendingOutpasses.css";

const StudentPendingOutpasses = () => {
  const dispatch = useDispatch();
  const outpassList = useSelector((state) => state.outpassMovementReducer.data); // Access state using useSelector
  const [loading, setLoading] = useState(true); // Local loading state

  const User = JSON.parse(localStorage.getItem("Profile"));
  const enrollData = User.result.enrollment;

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true); // Set loading to true before dispatch
      await dispatch(postAppliedOutpasses({ enrollment: enrollData })); // Dispatch action to fetch data
      setLoading(false); // Set loading to false after dispatch
    };

    fetchData();
  }, [dispatch, enrollData]);

  return (
    <div className="s-pending">
      <StudentNavbar />
      <h1>Find your Pending Outpasses</h1>
      <div className="outpasses">
      {loading || !outpassList ? ( // Wait for both loading to finish and outpassList to be populated
    <h1>Loading...</h1>
  ) : outpassList.length === 0 ? ( // Check if no data is found
    <h1>No pending outpasses found</h1>
  ) : (
    [...outpassList].reverse().map((outpass) => ( // Reverse the list and render components
      <StudentAppliedOutpass key={outpass._id} outpass={outpass} />
    ))
  )}
      </div>
    </div>
  );
};

export default StudentPendingOutpasses;