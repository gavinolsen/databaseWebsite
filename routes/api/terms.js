const express = require ('express');
const router = express.Router ();
const bcrypt = require ('bcryptjs');
const jwt = require ('jsonwebtoken');
const passport = require ('passport');

const Term = require ('../../models/Term');

/**
 * @route   get api/terms/test
 * @desc    test 
 * @access  Public
 */
router.get ('/test', (req, res) => {
  res.json ({msg: 'term works'});
});

/**
 * @route   post api/terms/
 * @desc    make a term
 *          
 *          This should be changed to 
 *          make only admins
 *          
 * @access  Private
 */
router.post (
  '/',
  passport.authenticate ('jwt', {session: false}),
  (req, res) => {
    const errors = {};
    //check for errors!!!

    const newTerm = new Term ({
      term: req.body.term,
      active: false,
    });

    newTerm
      .save ()
      .catch (err =>
        res
          .status (400)
          .json ({err: err, msg: 'There was an error saving this term'})
      );

    res.json ({newTerm: newTerm});
  }
);

/**
 * @route   get /api/terms/
 * @desc    get all of the terms
 * @access  Public
 */
router.get ('/', (req, res) => {
  Term.find ({}).then (terms => res.json (terms));
});

/**
 * @route   get /api/terms/activate/:id
 * @desc    activate a term
 * 
 * This should be changed to 
 *          make only admins
 * 
 * @access  Private
 */
router.post (
  '/activate/:id',
  passport.authenticate ('jwt', {session: false}),
  (req, res) => {
    //find the old one update it, then save the new one

    Term.updateMany ({active: true}, {active: false})
      .then (
        Term.findById (req.params.id).then (term => {
          term.active = true;
          term
            .save ()
            .then ()
            .catch (err =>
              res.json ({err: err, msg: 'there was an error updating'})
            );
          res.json ({term: term});
        })
      )
      .catch (err => res.json ({err: err, msg: 'there was an error updating'}));
  }
);

/**
 * @route   delete /api/terms/:id
 * @desc    delete a term
 * 
 * This should be changed to 
 *          make only admins
 * 
 * @access  Private
 */
router.delete (
  '/:id',
  passport.authenticate ('jwt', {session: false}),
  (req, res) => {
    Term.deleteOne ({_id: req.params.id})
      .then (res.json ({success: true}));
  }
);

module.exports = router;
