import React, { Component } from "react";
import { connect } from "react-redux";
import { getBreeds } from "./store/actions/breedsActions";
import Loader from "./components/Loader";
import Card from "./components/Card";

class App extends Component {
  componentDidMount() {
    this.props.getBreeds();
  }

  render() {
    const { isLoading, errors } = this.props;
    return (
      <div className="app">
        <main className="app-main">
          {isLoading ? <Loader /> : <Card errors={errors} />}
        </main>
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  isLoading: state.breeds.isLoading,
  errors: state.breeds.errors,
});
export default connect(mapStateToProps, { getBreeds })(App);
