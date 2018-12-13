import React, { Component } from 'react';

//I'll have to connect this to the request reducer!!!
//hook it up
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class RequestList extends Component {
  render() {
    return (
      <div>
        <h1 className='nav-item'>Welcome to the request list</h1>
      </div>
    );
  }
}

//I'll have to add a function here
//that gets the requests,
//but the function to make a request
//will come from the modal I'll make
RequestList.propTypes = {
  requests: PropTypes.object
};

export default connect()(RequestList);

/**
 * return(
      <Provider store={ school }>
      <Container>
        <ListGroup>
          <TransitionGroup className="shopping-list">
            {school.map(({ _id, name, className, date }) => (
              <CSSTransition key={ _id } timeout={500} classNames="fade">
                <ListGroupItem>
                <Button
                    className="remove-btn"
                    color="danger"
                    size="sm"
                    onClick={this.onDeleteClick.bind(this, _id)}
                  >&times;</Button>

                  { name } 
                  <h2 style={{marginLeft: 44}}> { className }</h2>
                </ListGroupItem>
              </CSSTransition>
            ))}
          </TransitionGroup>
        </ListGroup>
      </Container>
      </Provider>
    );
 * 
 */
