import $ from "jquery";
import { useState } from "react";
import parse from "html-react-parser";
import {
  Button,
  Typography,
  CardContent,
  CardActions,
  CircularProgress,
} from "@mui/material";

export default function MovieDetailComponent(props) {
  const [isMovieDetailFound, setIsMovieDetailFound] = useState(false);
  const [movieDetail, _setMovieDetail] = useState("");
  const [imdbUrl, setImdbUrl] = useState("");

  const setMovieDetail = (detail, isFound) => {
    _setMovieDetail(detail);
    setIsMovieDetailFound(isFound);
  };

  const title = props.movieTitle.split(" ").join("_");
  const urlRoot = "https://en.wikipedia.org";
  const queryParams = `?action=parse&page=${title}&prop=text&format=json&origin=*`;
  const detailUrl = `${urlRoot}/w/api.php${queryParams}`;
  const wikiPageUrl = `${urlRoot}/wiki/${title}`;

  fetch(detailUrl)
    .then((response) => response.json())
    .then((resp) => {
      const parsedPage = $.parseHTML(resp.parse.text["*"]);
      const paragraph = $(parsedPage).find("p")[2];
      setImdbUrl(
        $(parsedPage).find('a[href*="www.imdb.com/title"]:last').attr("href")
      );
      setMovieDetail(paragraph.outerHTML, true);
    })
    .catch(() => {
      setMovieDetail("No description found :(", false);
    });

  function goToPage(url) {
    window.open(url, "_blank", "noreferrer");
  }

  return (
    <>
      <CardContent
        sx={{
          display: "flex",
          flexDirection: "column",
          height: "100%",
          overflow: "auto",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {movieDetail ? (
          <Typography variant="caption">{parse(movieDetail)}</Typography>
        ) : (
          <CircularProgress
            sx={{ alignSelf: "center", justifySelf: "center" }}
          ></CircularProgress>
        )}
      </CardContent>
      {isMovieDetailFound && (
        <CardActions sx={{ justifyContent: "center" }}>
          <Button variant="outlined" onClick={() => goToPage(wikiPageUrl)}>
            to Wikipedia
          </Button>
          <Button variant="outlined" onClick={() => goToPage(imdbUrl)}>
            to IMDB
          </Button>
        </CardActions>
      )}
    </>
  );
}
