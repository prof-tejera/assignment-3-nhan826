import queryString from "query-string";
import React, {useState, useEffect} from "react";
import { decodeJsonUrl } from "../utils/helpers";
import EditForm from "../components/forms/EditForm";

const EditView = () =>{
    const [timer, setTimer] = useState(null);

    useEffect(()=>{
        const urlParams = window.location;
        const timerQuery = (queryString.parse(urlParams.search).timer)
        if (timerQuery){
          const decodedQueueTimer = decodeJsonUrl(timerQuery);
          setTimer(decodedQueueTimer);
        }
    },[])
    return (
        <>
        {timer && 
            null
            // <EditForm {...timer}/>
        }
        </>
    )
}

export default EditView;