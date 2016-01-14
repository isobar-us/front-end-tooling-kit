import React from 'react';
import FiltersList from '../components/filtersList/component';

export default class extends React.Component {
  render() {
    return (
      <header>
        <div><h1>&#60;codetest&#62;</h1></div>
        <FiltersList />
      </header>
    );
  }
}