import { useReducer } from "react";
import "./App.css";
import Food from "./components/food-card/food-card.component";
import Search from "./components/search/search.component";

const API_URL = "https://api.spoonacular.com/recipes/complexSearch?";

const initialState = {
  loading: true,
  food: [],
  errorMessage: null,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "SEARCH_FOOD_REQUEST":
      return {
        ...state,
        loading: true,
        errorMessage: null,
      };
    case "SEARCH_FOOD_SUCCESS":
      return {
        ...state,
        loading: false,
        food: action.payload,
      };
    case "SEARCH_FOOD_FAILURE":
      return {
        ...state,
        loading: false,
        errorMessage: action.error,
      };
    default:
      return state;
  }
};

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

  const search = (searchValue) => {
    dispatch({
      type: "SEARCH_FOOD_REQUEST",
    });

    fetch(
      API_URL + `query=${searchValue}&apiKey=fa1eab81ecbb4dbc9f0df16b72494b4a`
    )
      .then((res) => res.json())
      .then((jsonResponse) => {
        if (jsonResponse === "True") {
          dispatch({
            type: "SEARCH_FOOD_SUCCESS",
            food: jsonResponse.Search,
          });
        } else {
          dispatch({
            type: "SEARCH_FOOD_FAILURE",
            errorMessage: jsonResponse.Error,
          });
        }
      });
  };

  const { food, loading, errorMessage } = state;

  return (
    <div className="App">
      <h1>Foodle</h1>
      <Search search={search} />
      {
        <div className="food-list">
          {loading && !errorMessage ? (
            <span>Loading...</span>
          ) : errorMessage ? (
            <div className="errorMessage">{errorMessage}</div>
          ) : (
            food.map((item, index) => <Food key={item.id} food={food} />)
          )}
        </div>
      }
    </div>
  );
}

export default App;
