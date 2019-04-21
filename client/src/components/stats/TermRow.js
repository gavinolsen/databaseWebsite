import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button } from 'reactstrap';
import { connect } from 'react-redux';
import { activateTerm } from '../../actions/termsActions';


class TermRow extends Component {

  onActivateClick = id => {
    this.props.activateTerm(id);
  };

  render() {
    
    let term = this.props.term;

    let rowContent;
    let activateButtonContent;

    activateButtonContent = term_id => (
      <Button
        variant='success'
        color='success'
        onClick={this.onActivateClick.bind(this, term_id)}
        style={{
          verticalAlign: 'middle'
        }}
      >
        Activate
      </Button>
    );

    if (term.active) {
      rowContent = (
        <tr key={term._id} style={{ backgroundColor: '#adff2f' }}>
          <td>{term.term}</td>
          <td>{activateButtonContent(term._id)}
          </td>
        </tr>
      );
    } else {
      rowContent = (
        <tr key={term._id}>
          <td>{term.term}</td>
          <td>{activateButtonContent(term._id)}
          </td>
        </tr>
      );
    }
    return rowContent;
  }
}

TermRow.propTypes = {
  activateTerm: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  term: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
});

export default connect(
  mapStateToProps,
  { activateTerm }
)(TermRow);
