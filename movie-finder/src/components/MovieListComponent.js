import { gql, useQuery } from "@apollo/client";

import MovieComponent from "./MovieComponent";
import { CircularProgress, Grid } from "@mui/material";

export default function MovieListComponent(props) {
  function getMovie(searchText) {
    return gql`
        query SearchMovies {
          searchMovies(query: "${searchText}") {
            id
            name
            genres {
              name
            }
            poster {large}
          }
        }
      `;
  }

  const { loading, error, data } = useQuery(getMovie(props.movieTitle));

  if (loading) return <CircularProgress></CircularProgress>;
  if (error) return `Error! ${error.message}`;

  return (
    <Grid container spacing={5}>
      {data.searchMovies.map((movie) => (
        <Grid key={`grid-${movie.id}`} item xs={true} sx={{ height: "650px" }}>
          <MovieComponent key={movie.id} movie={movie}></MovieComponent>
        </Grid>
      ))}
    </Grid>
  );
}
