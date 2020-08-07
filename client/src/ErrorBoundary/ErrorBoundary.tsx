import React, { Component } from 'react';

export function ErrorMessage() {
  return <span>Oops, something went wrong. Please refresh the page.</span>;
}

export default class ErrorBoundary extends Component {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return <ErrorMessage />;
    }

    return this.props.children;
  }
}
