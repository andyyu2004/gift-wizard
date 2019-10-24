import React from 'react'
import { RouteComponentProps, navigate } from '@reach/router';
import { Header, CellRow, Cell } from '../components';
import create_img from '../images/create_icon.svg';
import list_icon from '../images/list_icon.svg';

const Home: React.FC<RouteComponentProps> = props => {
  return (
    <main>
      <CellRow 
        title="Looking for a gift for him/her?"
        subtitle="By sending him/her an anonymous questionnaire, get the best 'hints'!">
        <Cell image={create_img} text="Create New" onClick={() => navigate("/create")}/>
        <Cell image={list_icon} text="Random icon to check layout a little"/>
        <Cell image={create_img} text="More placeholder"/>
        <Cell image={list_icon} text="And more..."/>
      </CellRow>
      <CellRow 
        title="Build up your profile"
        subtitle="To help out your family/friends picking a gift for you!">
        <Cell image={create_img} text="PLACEHOLDERS!!!"/>
        <Cell image={list_icon} text="Random icon to check layout a little"/>
        <Cell image={create_img} text="More placeholder"/>
        <Cell image={list_icon} text="And more..."/>
      </CellRow>
    </main>
  )
};

export default Home;