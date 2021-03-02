import { useReducer } from "react";
import "./App.css";
import Food from "./components/food-card/food-card.component";
import Search from "./components/search/search.component";

const API_URL = "https://api.spoonacular.com/recipes/complexSearch?";

const key = "d5dec54d4bba40cf94a489496d736abd";

const initialState = {
  loading: false,
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

  /*   useEffect((api_url = `${API_URL}apiKey=fa1eab81ecbb4dbc9f0df16b72494b4a`) => {
    fetch(api_url)
      .then((res) => res.json())
      .then((jsonResponse) => {
        dispatch({
          type: "SEARCH_FOOD_SUCCESS",
          payload: jsonResponse.results,
        });
      });
  }); */

  const search = (searchValue) => {
    dispatch({
      type: "SEARCH_FOOD_REQUEST",
    });

    fetch(API_URL + `query=${searchValue}&apiKey=${key}`)
      .then((res) => res.json())
      .then((jsonResponse) => {
        console.log(jsonResponse);
        if (jsonResponse.Response === "True") {
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
      <h1 className='title-logo'>Foodle</h1>
      <Search search={search} />
      <div className="food-list">
        {loading && !errorMessage ? (
          <span>Loading...</span>
        ) : errorMessage ? (
          <div className="errorMessage">{errorMessage}</div>
        ) : (
          food.map((item, index) => (
            <Food key={`${index}-${item.title}`} food={item} />
          ))
        )}
      </div>
    </div>
  );
}

export default App;
