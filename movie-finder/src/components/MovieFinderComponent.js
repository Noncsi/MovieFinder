import { useState } from "react";

import Box from "@mui/material/Box";
import SearchFieldComponent from "./SearchFieldComponent";
import MovieListComponent from "./MovieListComponent";

export default function MovieFinderComponent() {
  const [movieTitle, setMovieTitle] = useState("");

  return (
    <>
      <Box
        sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
      >
        <SearchFieldComponent
          titleSubmitHandler={setMovieTitle}
        ></SearchFieldComponent>
        {movieTitle && (
          <MovieListComponent movieTitle={movieTitle}></MovieListComponent>
        )}
      </Box>
    </>
  );
}
