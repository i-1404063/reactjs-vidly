import React, { Component } from "react";
import { Link } from "react-router-dom";
import { getMovies, deleteMovie } from "../services/movieService";
import { getGenres } from "../services/genreService";
import Pagination from "./common/pagination";
import { Paginate } from "./utills/paginate";
import ListGroup from "./common/list-group";
import MoviesTable from "./moviesTable";
import _ from "lodash";
import Search from "./common/search";
import { toast } from "react-toastify";

class Movies extends Component {
  state = {
    movies: [],
    genres: [],
    pageSize: 4,
    currentPage: 1,
    searchQuery: "",
    selectedGenre: null,
    sortColumn: { path: "title", order: "asc" },
  };

  async componentDidMount() {
    const { data: genre } = await getGenres();
    const { data: movies } = await getMovies();

    const genres = [{ _id: "", name: "All Genres" }, ...genre];
    this.setState({ movies, genres });
  }

  handleDelete = async movie => {
    const originalMovies = this.state.movies;
    const movies = originalMovies.filter(m => m._id !== movie._id);

    this.setState({ movies });

    try {
      await deleteMovie(movie._id);
    } catch (ex) {
      if (ex.response && ex.response.status === 404) {
        toast.error("This movie has already been deleted");
      }

      this.setState({ movies: originalMovies });
    }
  };

  handleLike = movie => {
    const movies = [...this.state.movies];
    const index = movies.indexOf(movie);
    movies[index] = { ...movie };
    movies[index].flag = !movies[index].flag;
    this.setState({ movies });
  };

  handlePageChange = page => {
    this.setState({ currentPage: page });
  };

  handleGenreSelect = genre => {
    this.setState({ selectedGenre: genre, searchQuery: "", currentPage: 1 });
  };

  handleSearch = query => {
    this.setState({ searchQuery: query, selectedGenre: null, currentPage: 1 });
  };

  handleSort = sortColumn => {
    this.setState({ sortColumn });
  };

  getPageData = () => {
    const {
      currentPage,
      sortColumn,
      pageSize,
      movies: allMovies,
      selectedGenre,
      searchQuery,
    } = this.state;

    let filtered = allMovies;
    if (searchQuery)
      filtered = allMovies.filter(m =>
        m.title.toLowerCase().startsWith(searchQuery.toLowerCase())
      );
    else if (selectedGenre && selectedGenre._id)
      filtered = allMovies.filter(m => m.genre._id === selectedGenre._id);

    const sortMovies = _.orderBy(
      filtered,
      [sortColumn.path],
      [sortColumn.order]
    );

    const movies = Paginate(sortMovies, pageSize, currentPage);

    return { totalCount: filtered.length, data: movies };
  };

  render() {
    const { length: count } = this.state.movies;
    const {
      currentPage,
      sortColumn,
      pageSize,
      genres,
      selectedGenre,
      searchQuery,
    } = this.state;

    const { user } = this.props;

    const { totalCount, data: movies } = this.getPageData();

    return (
      <React.Fragment>
        <main className="container mt-3">
          <div className="row">
            <div className="col-md-3">
              <ListGroup
                items={genres}
                onItemSelect={this.handleGenreSelect}
                selectedGenre={selectedGenre}
              />
            </div>
            <div className="col-md-9">
              {user && (
                <Link to="/movies/new" className="btn btn-primary mb-2">
                  New Movie
                </Link>
              )}
              <p>Showing {totalCount} movies in the database.</p>
              <Search onChange={this.handleSearch} value={searchQuery} />
              <MoviesTable
                movies={movies}
                onLike={this.handleLike}
                onDelete={this.handleDelete}
                onSort={this.handleSort}
                sortColumn={sortColumn}
              />
              <Pagination
                onPageChange={this.handlePageChange}
                pageSize={pageSize}
                currentPage={currentPage}
                countItem={totalCount}
              />
            </div>
          </div>
        </main>
      </React.Fragment>
    );
  }
}

export default Movies;
