import React, { useEffect , useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import StudentRejectedOutpass from "../../Components/Outpasses/PreviousOutpass"
import StudentNavbar from "../../Components/Navbar/StudentNavbar"
import { showPrevOutpasses } from "../../actions/outpassMovement";
import "./StudentPrevOutpasses.css"

  const StudentPrevOutpasses = () => {
    const dispatch = useDispatch();
    const outpassList = useSelector((state) => state.outpassMovementReducer.data); // Access state using useSelector
    const [loading, setLoading] = useState(true); // Local loading state
  
    const User = JSON.parse(localStorage.getItem("Profile"));
    const enrollData = User.result.enrollment;
  
    useEffect(() => {
      const fetchData = async () => {
        setLoading(true); // Set loading to true before dispatch
        await dispatch(showPrevOutpasses({ enrollment: enrollData })); // Dispatch action to fetch data
        setLoading(false); // Set loading to false after dispatch
      };
      fetchData();
    }, [dispatch, enrollData]);
  
    return (
      <div className="s-prev">
        <StudentNavbar />
        <h1>Find your Previous Applied Outpasses</h1>
        <div className="outpasses">
        {loading || !outpassList ? ( // Show loading text while fetching data
          <h1>Loading...</h1>
        ) : outpassList.length === 0 ? ( // Check if no data is found
          <h1>No previous outpasses found</h1>
        ) : (
          [...outpassList].reverse().map((outpass) => ( // Reverse the list and render components
            <StudentRejectedOutpass key={outpass._id} outpass={outpass} />
          ))
        )}
      </div>
    </div>
  );
};

export default  StudentPrevOutpasses;