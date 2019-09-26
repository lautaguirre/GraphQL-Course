import React, { Component } from 'react';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';

class LyricList extends Component {
  onLike(id, likes) {
    this.props.mutate({
      variables: { id },
      optimisticResponse: {
        __typename: 'Mutation',
        likeLyric: {
          __typename: 'LyricType',
          id,
          likes: likes + 1
        }
      }
    });
  }

  renderLyrics() {
    return this.props.lyrics.map(lyric => {
      return (
        <li key={lyric.id} className="collection-item">
          {lyric.content}

          <div className="vote-box">
            {lyric.likes}

            <i
              className="material-icons"
              onClick={() => this.onLike(lyric.id, lyric.likes)}
            >
              thumb_up
            </i>
          </div>
        </li>
      );
    });
  }

  render() {
    return (
      <ul className="collection">
        {this.renderLyrics()}
      </ul>
    );
  }
}

const mutation = gql`
  mutation  LikeLyric($id: ID) {
    likeLyric(id: $id) {
      id,
      likes
    }
  }
`;

export default graphql(mutation)(LyricList);
