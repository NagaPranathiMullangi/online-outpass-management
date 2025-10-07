import * as api from '../api'
import { toast } from 'react-toastify';

export const createOutpass = (outpassData, navigate) => async (dispatch) => {
    let data1={}
    try {
        const { data } = await api.createOutpass(outpassData)
        
        dispatch({type: 'PASS', payload: data})
        toast.success("Outpass Applied Successfully")
        navigate('/StudentHomePage')
        return true
    } catch (error) {
        const errorMessage = error.response && error.response.data && error.response.data.message
        ? error.response.data.message
        : "Sorry, failed. Please try again."; // Default message if no message is provided

    toast.error(errorMessage); // Display the error message in toast
    }
}