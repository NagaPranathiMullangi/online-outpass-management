import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import WardenPendingOutpass from "../../Components/Outpasses/WardenPendingOutpass"
import { showWardenPendingOutpasses } from "../../actions/outpassMovement";
import WardenNavbar from "../../Components/Navbar/WardenNavbar";

import "./WardenPendingOutpasses.css"

const WardenPendingOutpasses = () => {

    const dispatch = useDispatch();

    const outpassList = useSelector(state => state.outpassMovementReducer.data)

   const [loading,setLoading] = useState(true);

    const User = JSON.parse(localStorage.getItem("Profile"))
    const employeeData = User.result.employee

    useEffect(() => {

        const fetchData = async ()=>{
            setLoading(true);
            await dispatch(showWardenPendingOutpasses({employee: employeeData}))
            setLoading(false);
        }

        fetchData();
        
      }, [dispatch, employeeData]);

    return(
        <div className="w-pending">
            <WardenNavbar/>
            <h1>Find your Pending Outpasses</h1>
            <div className="woutpasses">

          {
  loading ? (
    <h1>Loading ....</h1>
  ) : !Array.isArray(outpassList) ? (
    <h1>Invalid data format</h1>
  ) : outpassList.length === 0 ? (
    <h1>No pending outpasses found</h1>
  ) : (
    [...outpassList].reverse().map((outpass) => (
      <WardenPendingOutpass outpass={outpass} key={outpass._id} />
    ))
  )
}



            
            </div>
        </div>
    )
}

export default WardenPendingOutpasses