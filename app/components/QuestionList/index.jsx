import React, { Component } from 'react'
import { connect } from 'react-redux'
import { loadQuestions } from './actions'
import { Link } from 'react-router'
import Questions from './Questions.jsx'
import Helmet from 'react-helmet'
import { createStructuredSelector } from 'reselect';

class QuestionContainer extends Component {
  constructor (props) {
    console.log('constructing question container', props)
    super(props)
    console.log('constructed ', this.props)
  }

  static fetchData ({ store }) {
    return store.dispatch(loadQuestions())
  }

  componentDidMount () {
    this.props.loadQuestions()
  }

  render () {
    const { user } = this.props;
    const questionCreateProps = {
      user
    };

    return (
      <div>
        <Helmet
          title='Questions page'
        />
        <h2>Questions</h2>
        <Questions questions={this.props.questions} user={this.props.user} />
        <Link to='/'>Back to Home</Link>
      </div>
    )
  }
}

QuestionContainer.propTypes = {
  loadQuestions: React.PropTypes.func.isRequired,
  questions: React.PropTypes.object.isRequired
}

function mapStateToProps (state) {
  console.log('question list map state to props', state);
  return {
    user: { id: 13 },
    questions: state.questions
  }
}

// const mapStateToProps = createStructuredSelector({
//   questions: state.questions,
//   user: state.user
// });

export { QuestionContainer }
export default connect(mapStateToProps, {
  loadQuestions
})(QuestionContainer)
