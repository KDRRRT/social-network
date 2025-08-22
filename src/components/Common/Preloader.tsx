//@ts-ignore
import preloader from "./../../assets/preloader.gif";
import React from "react";

type PropsType = {
  
}

const Preloader: React.FC<PropsType>=(props) => {
  return (
    <div>
      <img alt="" src={preloader} width={"60px"} />
    </div>
  );
}

export default Preloader;
