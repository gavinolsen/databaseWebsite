import React, {Component} from 'react';
import Spinner from '../common/Spinner';
import Terms from './Terms';
//import {Button} from 'reactstrap';
import TextFieldGroup from '../common/TextFieldGroup';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {fetchTerms, makeTerm} from '../../actions/termsActions';
import {withRouter} from 'react-router-dom';

class TermList extends Component {
  constructor () {
    super ();
    this.state = {
      termName: '',
      errors: {},
    };
  }

  componentDidMount () {
    this.props.fetchTerms ();
  }

  componentWillUnmount () {
    this.mounted = false;
  }

  onChange = event => {
    this.setState ({
      termName : event.target.value 
    })

  }

  onMakeTermClick = () => {
    const term = {
      'term': this.state.termName,
    };
    this.props.makeTerm (term);
  };

  render () {
    //this might be wrong...
    const {terms} = this.props.terms;
    const {errors} = this.state;
    //console.log(terms);

    //here I can check for the loading property!
    //check if requests are equal to null, and
    //if they are just

    let termListContent;

    if (terms === null) {
      termListContent = <Spinner />;
    } else if (terms) {
      if (terms.length > 0) {
        termListContent = <Terms terms={terms} />;
        //termListContent = <Terms/>;
      } else if (terms.length === 0) {
        termListContent = <h3>There's no terms yet</h3>;
      } else {
        termListContent = <Spinner />;
      }
    }

    return (
      <div className="request-list" style={{marginBottom: '100px'}}>
        <div className="container">
          <div className="row">
            <h1 className="display-4 col-md-6">
              Terms
            </h1>
            <div style={{marginBottom: '10px'}}>
              <form onSubmit={this.onMakeTermClick}>
                <div style={{maxHeight: '30px'}}>
                  <TextFieldGroup
                    placeholder="term name"
                    name="termName"
                    value={this.state.termName}
                    onChange={this.onChange}
                    error={errors.termName}
                  />
                </div>
                <input
                  type="submit"
                  name="New Term"
                  className="btn btn-info btn-block mt-4"
                />
              </form>
            </div>
          </div>
          <div className="row">
            <div className="col-md-12">{termListContent}</div>
          </div>
        </div>
      </div>
    );
  }
}

//I'll have to add a function here
//that gets the requests,
//but the function to make a request
//will come from the modal I'll make
TermList.propTypes = {
  fetchTerms: PropTypes.func.isRequired,
  makeTerm: PropTypes.func.isRequired,
  terms: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  terms: state.terms,
});

export default connect (mapStateToProps, {fetchTerms, makeTerm}) (
  withRouter (TermList)
);
