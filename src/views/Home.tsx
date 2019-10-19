import React from 'react'
import { RouteComponentProps } from '@reach/router';
import { Header } from '../components';
import { AppState } from '../reducers';
import { UserType } from '../types';
import { connect } from 'react-redux';

type PropType = RouteComponentProps & StateProps;

const Home: React.FC<PropType> = props => {
  const { userType } = props;
  return (
    <div>
      <Header 
        title="Gift Wizard"
        subtitle="Struggling to find a gift for your loved ones? 
          Congracts! You have found the place for that!"
        displayLogin={userType === UserType.None}/>
    </div>
  )
};

type StateProps = { 
  userType: UserType;
}

const mapStateToProps = (state: AppState) => {
  const { userType } = state;
  return { userType };
};

export default connect(mapStateToProps, null)(Home);