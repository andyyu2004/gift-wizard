import React, { useState, useEffect } from 'react'
import { RouteComponentProps } from '@reach/router';

export const BrowsePeople: React.FC<RouteComponentProps> = _ => {

  const [people, setPeople] = useState([]);

  useEffect(() => {
    
  }, []);

  return (
    <div>
      Hi people    
    </div>
  );
};

export default BrowsePeople;