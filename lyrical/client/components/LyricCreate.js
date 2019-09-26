import React, { Component } from 'react';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';

class LyricCreate extends Component {
  constructor(props) {
    super(props);

    this.state = {
      content: ''
    };
  }

  onSubmit(e) {
    e.preventDefault();

    this.props.mutate({
      variables: {
        songId: this.props.songId,
        content: this.state.content,
      },
    }).then(() => this.setState({ content: '' }));
  }

  render() {
    return (
      <form onSubmit={this.onSubmit.bind(this)}>
        <label htmlFor="lyric">Add a lyric</label>

        <input
          id="lyric"
          onChange={e => this.setState({ content: e.target.value })}
          value={this.state.content}
        />
      </form>
    );
  }
}

const mutation = gql`
  mutation AddLyricToSong($songId: ID, $content: String) {
    addLyricToSong(songId: $songId, content: $content) {
      id,
      lyrics {
        id,
        content,
        likes
      }
    }
  }
`;

export default graphql(mutation)(LyricCreate);
