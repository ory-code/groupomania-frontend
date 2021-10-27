import React, { useState, useEffect } from "react";
import { IconButton } from "@mui/material";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import "./ScrollTop.css"
const ScrollTop = ({ showBelow }) => {
  const [show, setShow] = useState(showBelow ? false : true);

  const handleScroll = () => {
    if (window.pageYOffset > showBelow) {
      if (!show) setShow(true);
    } else {
      if (show) setShow(false);
    }
  };

  useEffect(() => {
    if (showBelow) {
      window.addEventListener(`scroll`, handleScroll);
      return () => window.removeEventListener(`scroll`, handleScroll);
    }
  });

  const handleClick = () => {
    window[`scrollTo`]({ top: 0, behavior: `smooth` });
  };

  return (
    <div className="icnScroll">
      {show && (
        <IconButton onClick={handleClick} className="scrollTop">
          <ExpandLessIcon/>
        </IconButton>
      )}
    </div>
  );
};

export default ScrollTop;
