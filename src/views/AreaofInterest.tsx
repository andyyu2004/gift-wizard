import React from 'react'
import './AreaofInterest.css';

/** Subview of Profile */
const AreaofInterest = props => {

    return (
	  	<div id="interests">
	  		<h5 id="AOItitle">My Personal Area Of Interest</h5>
	  		<button id="addInterest" onclick="addInterest()">Add</button>
	    </div>
  );
};

function addInterest() {
   var newInterest = document.createElement('div');
   newInterest.className="personalInterest";
   var elements = document.getElementById("interests");
   elements.append(newInterest);
}

export default AreaofInterest;