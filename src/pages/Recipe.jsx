import { useEffect, useState } from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";

function Recipe() {
  const params = useParams();
  const [details, setDetails] = useState({});
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("instructions");
  const fecthDetail = async () => {
    setLoading(true);
    const data = await fetch(
      `https://api.spoonacular.com/recipes/${params.name}/information?apiKey=8254166cb1b645a78970729f67dc964f`
    );
    const detailData = await data.json();
    setDetails(detailData);
    setLoading(false);
    console.log(detailData);
  };
  useEffect(() => {
    fecthDetail();
  }, [params.name]);
  return (
    <>
      {loading ? (
        <div>loading..........</div>
      ) : (
        <DetailWrapper>
          <CoverName>
            <h2>{details.title}</h2>
            <img src={details.image} />
          </CoverName>
          <Info>
            <Button
              className={activeTab === "instructions" ? "active" : ""}
              onClick={() => setActiveTab("instructions")}
            >
              Instructions
            </Button>
            <Button
              className={activeTab === "ingredients" ? "active" : ""}
              onClick={() => setActiveTab("ingredients")}
            >
              Ingredients
            </Button>
            {activeTab === "instructions" && (
              <div>
                <h3 dangerouslySetInnerHTML={{ __html: details.summary }}></h3>
                <h3
                  dangerouslySetInnerHTML={{ __html: details.instructions }}
                ></h3>
              </div>
            )}
            {activeTab === "ingredients" && (
              <ul>
                {details.extendedIngredients.map((ing) => (
                  <li key={ing.id}>- {ing.original}</li>
                ))}
              </ul>
            )}
          </Info>
        </DetailWrapper>
      )}
    </>
  );
}

const DetailWrapper = styled.div`
  margin-top: 5rem;
  margin-bottom: 5rem;
  display: flex;
  gap: 1.5rem;
  .active {
    background: linear-gradient(35deg, #494949, #313131);
    color: #fff;
  }
  h2 {
    margin-bottom: 2rem;
  }
  li {
    font-size: 1.2rem;
    line-height: 2.5rem;
  }
  ul {
    margin-top: 2rem;
    list-style: none;
  }
`;
const Button = styled.button`
  padding: 1rem 2rem;
  color: #313131;
  background: #fff;
  border:2px solid black:
  margin-right:2rem;
  font-weight:600;
`;
const CoverName = styled.div`
  width: 30%;
  img {
    width: 100%;
  }
`;
const Info = styled.div`
  width: 70%;
`;
export default Recipe;
