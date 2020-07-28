import React, { Component } from "react";
import auth from "../services/authService";
import Like from "./common/like";
import Table from "./common/table";
import { Link } from "react-router-dom";

class MoviesTable extends Component {
  state = {
    columns: [
      {
        path: "title",
        label: "Title",
        content: movie => (
          <Link to={`/movies/${movie._id}`}>{movie.title}</Link>
        ),
      },
      { path: "genre.name", label: "Genre" },
      { path: "numberInStock", label: "Stock" },
      { path: "dailyRentalRate", label: "Rate" },
      {
        key: "like",
        content: movie => <Like onLike={this.props.onLike} movie={movie} />,
      },
    ],
  };

  deleteColumn = {
    key: "delete",
    content: movie => (
      <button
        onClick={() => this.props.onDelete(movie)}
        className="btn btn-danger btn-sm">
        Delete
      </button>
    ),
  };

  constructor() {
    super();
    const user = auth.getCurrentUser();
    if (user && user.isAdmin) {
      this.state.columns.push(this.deleteColumn);
    }
  }

  render() {
    const { movies, sortColumn, onSort } = this.props;

    return (
      <Table
        data={movies}
        sortColumn={sortColumn}
        onSort={onSort}
        columns={this.state.columns}
      />
    );
  }
}

export default MoviesTable;
