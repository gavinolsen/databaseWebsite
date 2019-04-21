import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import TermRow from './TermRow';
import {fetchTerms} from '../../actions/termsActions';

//I don't need any functions here
//that'll be handled in the
//TermList class
class Terms extends Component {

  componentWillReceiveProps (props) {
    //console.log ('updating in Terms. setting state');
    this.props.fetchTerms();
  }

  render () {

    const terms = this.props.terms.terms.map (term => (
      <TermRow key={term._id} term={term}/>
    ));

    return (
      <div>
        <table className="table">
          <thead>
            <tr>
              <th>Term name</th>
              <th>Activation</th>
              <th />
            </tr>
            {terms}
          </thead>
        </table>
      </div>
    );
  }
}

Terms.propTypes = {
  terms: PropTypes.object.isRequired,
  fetchTerms: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  terms: state.terms,
});

export default connect (mapStateToProps, {
  fetchTerms,
}) (Terms);
