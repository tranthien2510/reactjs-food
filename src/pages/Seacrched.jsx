import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import styled from "styled-components";

function Seacrched() {
  const params = useParams();
  const [searchredRepcipes, setSearchRecipes] = useState([]);
  const getSearched = async (name) => {
    const data = await fetch(
      `https://api.spoonacular.com/recipes/complexSearch?apiKey=8254166cb1b645a78970729f67dc964f&query=${name}`
    );
    const recipes = await data.json();
    setSearchRecipes(recipes.results);
  };
  useEffect(() => {
    getSearched(params.search);
  }, [params.search]);

  return (
    <Grid>
      {searchredRepcipes.map((item) => {
        return (
          <Link to={`/recipe/${item.id}`}>
            <Card>
              <img src={item.image} />
              <h4>{item.title}</h4>
            </Card>
          </Link>
        );
      })}
    </Grid>
  );
}

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(10rem, 1fr));
  grid-gap: 1.5rem;
`;
const Card = styled.div`
  img {
    width: 100%;
    border-radius: 0.5rem;
  }
  a {
    text-decoration: none;
  }
  h4 {
    text-align: center;
    padding: 1rem;
  }
`;

export default Seacrched;
