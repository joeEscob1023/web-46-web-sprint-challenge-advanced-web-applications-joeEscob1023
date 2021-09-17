import React, { useEffect, useState } from "react";

import Bubbles from "./Bubbles";
import ColorList from "./ColorList";
import fetchColorService from "../services/fetchColorService";
import axios from "axios";
import { useHistory, useParams } from "react-router";

const BubblePage = () => {
  const [colors, setColors] = useState([]);
  const [editing, setEditing] = useState(false);
  const { id } = useParams;
  const { push } = useHistory;

  useEffect(() => {
    //an error said I used to use the new keyword in order to use fetchColorService
    new fetchColorService();
  }, []);

  const toggleEdit = (value) => {
    setEditing(value);
  };

  const saveEdit = (editColor) => {
    axios
      .put(`http://localhost:5000/api/colors/${id}`, editColor)
      .then((res) => {
        push(`/colors/${id}`);
        setColors(res.data);
      });
  };

  const deleteColor = (colorToDelete) => {
    axios
      .delete(`http://localhost:5000/api/colors/${colorToDelete}`)
      .then((res) => {
        setColors(res.data);
        push("/colors");
      });
  };
  return (
    <div className="container">
      <ColorList
        colors={colors}
        editing={editing}
        toggleEdit={toggleEdit}
        saveEdit={saveEdit}
        deleteColor={deleteColor}
      />
      <Bubbles colors={colors} />
    </div>
  );
};

export default BubblePage;

//Task List:
//1. When the component mounts, make an axios call to retrieve all color data and push to state.
//2. Complete toggleEdit, saveEdit, deleteColor and functions
