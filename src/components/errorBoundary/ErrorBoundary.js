import { Component } from "react";
import ErrorMessage from '../errorMessage/ErrorMessage';

class ErrorBoundary extends Component {
   state = {
      err: false
   }

   componentDidCatch(error, errorInfo) {
      this.setState({ err: true })
   }

   render() {
      if (this.state.err) {
         return <ErrorMessage />;
      }

      return this.props.children;
   }
}

export default ErrorBoundary;