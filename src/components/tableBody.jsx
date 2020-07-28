import React, { Component } from 'react';
import _ from 'lodash';
// import { NavLink } from "react-router-dom";

class TableBody extends Component {
  //Rendering custom element from local state
  customElement = (item, column) => {
    if (column.content) return column.content(item);
    /// we can use this also instead of adding content in column
    // if (column.path === "title")
    //   return (
    //     <NavLink to={`/movies/${item._id}`}>{_.get(item, column.path)}</NavLink>
    //   );
    return _.get(item, column.path);
  };

  createKey = (item, column) => {
    return item[this.props.valueProperty] + (column.path || column.key);
  };

  render() {
    const { data, columns, valueProperty } = this.props;

    return (
      <tbody>
        {data.map(item => (
          <tr key={item[valueProperty]}>
            {columns.map(column => (
              <td key={this.createKey(item, column)}>
                {this.customElement(item, column)}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    );
  }
}

TableBody.defaultProps = {
  valueProperty: '_id',
};

export default TableBody;
