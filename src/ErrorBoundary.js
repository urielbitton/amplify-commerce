import React from 'react'

class ErrorBoundary extends React.Component {

  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }
  

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }
  componentDidCatch(error, errorInfo) {
    // You can also log the error to an error reporting service
    //send email to admin with error log
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="errorpage">
          <img src="https://i.imgur.com/z8nfahP.png" alt=""/>
          <h1>An error occured on this page</h1>
          <h6>Don't worry we're working on fixing this bug so it doesn't happen again.</h6>
          <a href="https://csb-6hui4.vercel.app/"><button>Back Home</button></a>
        </div>
      )
    }
    return this.props.children; 
  }
}

export default ErrorBoundary