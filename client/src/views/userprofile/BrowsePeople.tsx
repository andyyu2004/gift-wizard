import { RouteComponentProps } from '@reach/router';
import React from 'react';
import Connections from './Connections';
import { withProtection } from '../../components/hoc';

export const BrowsePeople: React.FC<RouteComponentProps> = _ => <Connections filterFriends={false} />

export default withProtection(BrowsePeople);