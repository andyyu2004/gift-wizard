import React from 'react'
import { RouteComponentProps } from '@reach/router';
import { Header } from '../components';

const Home: React.FC<RouteComponentProps> = props => (
    <div>
        <Header title="Gift Wizard"/>
    </div>
)

export default Home;