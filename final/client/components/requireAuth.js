import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import { hashHistory } from 'react-router';

import currentUserQuery from '../queries/CurrentUser';

export default ChildComponent => {
  class RequireAuth extends Component {
    componentDidMount() {
      console.log(this.props.data.loading);
      console.log(this.props.data.user);
      if (!this.props.data.loading && !this.props.data.user) {
        hashHistory.push('/login')
      }
    }

    componentDidUpdate() {
      if (!this.props.data.user) {
        hashHistory.push('/login')
      }
    }

    render() {
      return <ChildComponent {...this.props} />;
    }
  }

  return graphql(currentUserQuery)(RequireAuth);
};
