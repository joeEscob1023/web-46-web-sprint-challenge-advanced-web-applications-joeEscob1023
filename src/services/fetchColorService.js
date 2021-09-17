import { Component } from "react";
import axiosWithAuth from "../helpers/axiosWithAuth";

class fetchColorService extends Component {
  state = {
    colors: [],
  };

  componentDidMount() {
    this.getData();
  }

  getData = () => {
    axiosWithAuth()
      .get("/colors")
      .then((res) => {
        this.setState({
          ...this.state,
          colors: res.data,
        });
      })
      .catch((err) => console.log(err));
  };
}

export default fetchColorService;
