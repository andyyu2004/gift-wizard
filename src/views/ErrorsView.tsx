import React from 'react'
import { RouteComponentProps } from '@reach/router';

// interface PropType { 
//     errorCode: number
// }

type PropType = RouteComponentProps & { 
  errorCode: number 
}

const ErrorsView: React.FC<PropType> = props => {
  const { errorCode } = props;
  return <h3>Error: {errorCode}</h3>
}

export default ErrorsView;