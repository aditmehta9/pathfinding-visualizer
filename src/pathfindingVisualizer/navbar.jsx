import React, { Component } from "react";
import "./navbar.css";

const brand = window.innerWidth > 600 ? "Pathfinding Visualizer" : "Pathfinder";

class NavBar extends Component {
  state = {
    algorithm: "Visualize Algorithm",
    maze: "Generate Maze",
    pathState: false,
    mazeState: false,
    speedState: "Speed",
  };

  selectAlgorithm(selection) {
    if (this.props.visualizingAlgorithm) {
      return;
    }
    if (
      selection === this.state.algorithm ||
      this.state.algorithm === "Visualize Algorithm" ||
      this.state.algorithm === "Select an Algorithm!"
    ) {
      this.setState({ algorithm: selection });
    } else if (this.state.pathState) {
      this.clearPath();
      this.setState({ algorithm: selection });
    } else {
      this.setState({ algorithm: selection });
    }
  }

  selectMaze(selection) {
    if (this.props.visualizingAlgorithm || this.props.generatingMaze) {
      return;
    }
    if (
      selection === this.state.maze ||
      this.state.maze === "Generate Maze" ||
      this.state.maze === "Select a Maze!"
    ) {
      this.setState({ maze: selection });
    } else if (!this.state.mazeState) {
      this.setState({ maze: selection });
    } else {
      this.clearGrid();
      this.setState({ maze: selection });
    }
  }

  visualizeAlgorithm() {
    if (this.props.visualizingAlgorithm || this.props.generatingMaze) {
      return;
    }
    if (this.state.pathState) {
      this.clearTemp();
      return;
    }
    if (
      this.state.algorithm === "Visualize Algorithm" ||
      this.state.algorithm === "Select an Algorithm!"
    ) {
      this.setState({ algorithm: "Select an Algorithm!" });
    } else {
      this.setState({ pathState: true });
      if (this.state.algorithm === "Visualize Dijkstra")
        this.props.visualizeDijkstra();
      else if (this.state.algorithm === "Visualize Breadth First Search")
        this.props.visualizeBFS();
      else if (this.state.algorithm === "Visualize Depth First Search")
        this.props.visualizeDFS();

    }
  }

  clearGrid() {
    if (this.props.visualizingAlgorithm || this.props.generatingMaze) {
      return;
    }
    this.props.clearGrid();
    this.setState({
      algorithm: "Visualize Algorithm",
      maze: "Generate Maze",
      pathState: false,
      mazeState: false,
    });
  }

  clearPath() {
    if (this.props.visualizingAlgorithm || this.props.generatingMaze) {
      return;
    }
    this.props.clearPath();
    this.setState({
      pathState: false,
      mazeState: false,
    });
  }

  clearTemp() {
    if (this.props.visualizingAlgorithm || this.props.generatingMaze) {
      return;
    }
    this.props.clearGrid();
    this.setState({
      pathState: false,
      mazeState: false,
    });
  }

  changeSpeed(speed) {
    if (this.props.visualizingAlgorithm || this.props.generatingMaze) {
      return;
    }
    let value = [10, 10];
    if (speed === "Slow") value = [50, 30];
    else if (speed === "Medium") value = [25, 20];
    else if (speed === "Fast") value = [10, 10];
    this.setState({ speedState: speed });
    this.props.updateSpeed(value[0], value[1]);
  }

  render() {
    return (
      <nav className="navbar navbar-expand navbar-dark bg-dark">
        <p
          className="navbar-brand h1 mb-0"
        >
          {brand}
        </p>
        <div className="navbar-collapse" id="navbarNavDropdown">
          <ul className="navbar-nav">
            <li className="nav-item dropdown">
              <div className="dropdown">
                <button
                  className="btn btn-light dropdown-toggle"
                  type="button"
                  id="dropdownMenu1"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  Algorithms
                </button>
                <div className="dropdown-menu" aria-labelledby="dropdownMenu1">
                  <button
                    className="dropdown-item btn-light"
                    type="button"
                    onClick={() => this.selectAlgorithm("Visualize Dijkstra")}
                  >
                    Dijkstra's Algorithm
                  </button>

                  <div className="dropdown-divider"></div>
                  <button
                    className="dropdown-item btn-light"
                    type="button"
                    onClick={() =>
                      this.selectAlgorithm("Visualize Breadth First Search")
                    }
                  >
                    Breadth First Search
                  </button>
                  <button
                    className="dropdown-item btn-light"
                    type="button"
                    onClick={() =>
                      this.selectAlgorithm("Visualize Depth First Search")
                    }
                  >
                    Depth First Search
                  </button>
                </div>
              </div>{" "}
            </li>
            <li>
              <button
                type="button"
                className="btn btn-success"
                onClick={() => this.visualizeAlgorithm()}
              >
                {this.state.algorithm}
              </button>
            </li>
            <li>
              <button
                type="button"
                className="btn btn-danger"
                onClick={() => this.clearGrid()}
              >
                Clear Gird
              </button>
            </li>
            <li className="nav-item dropdown">
              <div className="dropdown">
                <button
                  className="btn btn-info dropdown-toggle"
                  type="button"
                  id="dropdownMenu1"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  {this.state.speedState}
                </button>
                <div className="dropdown-menu" aria-labelledby="dropdownMenu1">
                  <button
                    className="dropdown-item btn-light"
                    type="button"
                    onClick={() => this.changeSpeed("Slow")}
                  >
                    Slow
                  </button>
                  <button
                    className="dropdown-item btn-light"
                    type="button"
                    onClick={() => this.changeSpeed("Medium")}
                  >
                    Medium
                  </button>
                  <button
                    className="dropdown-item btn-light"
                    type="button"
                    onClick={() => this.changeSpeed("Fast")}
                  >
                    Fast
                  </button>
                </div>
              </div>{" "}
            </li>
          </ul>
        </div>
        <p
          className="navbar-brand"
        >
          Add Walls by clicking on mouse 
        </p>
      </nav>
    );
  }
}
export default NavBar;
