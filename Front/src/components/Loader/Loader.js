import React from 'react';
import { DNA } from 'react-loader-spinner'
import Style from './loader.module.css'; 

const CustomLoader = () => {
  return (
    <div className={Style.loader}>
      <DNA
        visible={true}
        height="80"
        width="80"
        ariaLabel="dna-loading"
        wrapperStyle={{}}
        wrapperClass="dna-wrapper"
      />
    </div>
  );
};

export default CustomLoader;
