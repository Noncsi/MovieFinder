import "./App.css";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  gql,
  useQuery,
  useMutation,
} from "@apollo/client";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

function App() {
  const GET_MOVIE = gql`
    query SearchMovies {
      searchMovies(query: "fight club") {
        id
        name
        overview
        releaseDate
        cast {
          id
          person {
            name
          }
          role {
            ... on Cast {
              character
            }
          }
        }
      }
    }
  `;

  function Movie() {
    const { loading, error, data } = useQuery(GET_MOVIE);

    if (loading) return "Loading...";
    if (error) return `Error! ${error.message}`;

    return (
      <div name="movieList">
        {data.searchMovies.map((movie) => (
          <li key={movie.id} value={movie.name}>
            {movie.name}
          </li>
        ))}
      </div>
    );
  }

  return (
    <div className="App">
      <TextField
        id="movie-input"
        label="Search for movies..."
        type="search"
        variant="standard"
      />
      <Button variant="contained">search</Button>
      <div>Results:</div>
      <div id="result-box"></div>
      <Movie></Movie>
    </div>
  );
}

export default App;
