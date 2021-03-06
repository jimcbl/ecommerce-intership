import React, { Component } from "react";
import onClickOutside from "react-onclickoutside";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import _ from "lodash";

class Dropdown extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listOpen: false
    };
  }

  static get propTypes() {
    return {
      list: PropTypes.array,
      title: PropTypes.string
    };
  }

  toggleList() {
    this.setState({ listOpen: !this.state.listOpen });
  }

  handleClickOutside = evt => {
    this.setState({
      listOpen: false
    });
  };

  render() {
    return (
      <div className="nav-dropdown">
        <div className="button-wrap" onClick={this.toggleList.bind(this)}>
          <div className="dropbtn">{this.props.title}</div>
          <img src="/arrow.svg" className="Arrow" />
        </div>
        {this.state.listOpen && (
          <div className="dropdown-content">
            {this.props.list.map((item, key) => (
              <Link to={`/${_.lowerCase(this.props.title)}/${item}`} key={key}>
                {_.capitalize(item)}
              </Link>
            ))}
          </div>
        )}
      </div>
    );
  }
}

export default onClickOutside(Dropdown);
