import {
  Card,
  CardMedia,
  Typography,
  Box,
  CardContent,
  Collapse,
} from "@mui/material";
import ImageNotSupportedIcon from "@mui/icons-material/ImageNotSupported";

import MovieDetailComponent from "./MovieDetailComponent";
import { useState } from "react";

export default function MovieComponent(props) {
  const [isDetailShown, setIsDetailShown] = useState(false);

  return (
    <Card
      sx={{
        minWidth: 250,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        height: "100%",
      }}
      onMouseEnter={() => setIsDetailShown(true)}
      onMouseLeave={() => setIsDetailShown(false)}
      key={props.movie.id}
    >
      <Box
        sx={{
          display: "flex",
          height: "100%",
          flexDirection: "column",
          justifyContent: "space-between",
          maxWidth: 300,
        }}
      >
        {isDetailShown ? (
          <MovieDetailComponent
            movieTitle={props.movie.name}
          ></MovieDetailComponent>
        ) : (
          <Collapse timeout="auto" in={!isDetailShown}>
            {props.movie.poster ? (
              <CardMedia
                sx={{ height: 500 }}
                component="img"
                image={props.movie.poster.large}
              />
            ) : (
              <ImageNotSupportedIcon sx={{ height: 500 }} />
            )}
          </Collapse>
        )}
      </Box>

      <CardContent
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          overflow: "hidden",
        }}
      >
        <Typography variant="h5">{props.movie.name}</Typography>
        <Box
          sx={{ display: "flex", justifyContent: "center" }}
          color="text.secondary"
        >
          {props.movie.genres.map((genre, i) => (
            <Box key={i} sx={{ display: "flex" }}>
              <Typography variant="caption">
                {genre.name}
                {i === props.movie.genres.length - 1 ? "" : <> &#8226;&nbsp;</>}
              </Typography>
            </Box>
          ))}
        </Box>
      </CardContent>
    </Card>
  );
}
