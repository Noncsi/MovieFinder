import { useState } from "react";

import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

export default function SearchFieldComponent(props) {
  const [inputValue, setInputValue] = useState("");

  const updateInputValue = (event) => {
    setInputValue(event.target.value);
  };

  const bubbleUpTitle = (event) => {
    event.preventDefault(); // prevents unwanted reloadings by default on the page
    if (inputValue === "") return;
    props.titleSubmitHandler(inputValue);
    setInputValue("");
  };
  return (
    <form
      onSubmit={bubbleUpTitle}
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        marginBottom: 30,
      }}
    >
      <TextField
        label="Search for movies..."
        type="search"
        variant="outlined"
        onChange={updateInputValue}
        sx={{ m: 2, width: "30ch" }}
      />
      <Button type="submit" variant="contained" sx={{ maxWidth: "25%" }}>
        search
      </Button>
    </form>
  );
}
