import React from "react";
import Loader from "react-loader-spinner";
import "./Loading.css"
const Loading = () => {
  return(
    <div className="loading" >

      <Loader 
       type="Bars"
       color="#091f43"
       height={150}
       width={100}
       />
    </div>
  )
};

export default Loading;
