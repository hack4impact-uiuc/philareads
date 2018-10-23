import React, { Component } from 'react';
import QuestionList from '../components/QuestionList';

class TestPage extends Component {
  render() {
    let questions = [
      {
        title: 'Question 1',
        options: ['Option A', 'Option B', 'Option C'],
        correctAnswer: 2
      },
      {
        title: 'Question 2',
        options: ['Option A', 'Option B', 'Option C'],
        correctAnswer: 1
      }
    ];
    return (
      <div>
        <QuestionList questions={questions} />
      </div>
    );
  }
}

export default TestPage;
