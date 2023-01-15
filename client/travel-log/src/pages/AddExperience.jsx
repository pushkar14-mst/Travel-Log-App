import React, { useEffect, useState } from "react";
import axios from "axios";
import Maps from "../components/Maps";
import { useDispatch, useSelector } from "react-redux";
import { travelLogActions } from "../store/travel-log-store";
const AddExperience = (props) => {
  const [rating, setRating] = useState(0);
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [currentLocation, setCurrentLocation] = useState();
  const [location, setLocation] = useState([-121.91599, 37.36765]);
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [description, setDescription] = useState("");
  const travelLogs = useSelector((state) => state.travelLog);
  const logTitle = travelLogs.title;
  const logExperience = travelLogs.experience;
  const logAuthor = travelLogs.author;
  const logLocation = travelLogs.location;
  const logRating = travelLogs.rating;

  const dispatch = useDispatch();
  dispatch(
    travelLogActions.addExperience({
      title,
      author,
      description,
      location,
      rating,
    })
  );
  useEffect(() => {
    loactionSearchHandler();
  }, [search]);

  const submitHandler = async (event) => {
    event.preventDefault();
    await axios
      .post("http://localhost:5000/add-log", {
        logTitle,
        logAuthor,
        logLocation,
        logRating,
        logExperience,
      })
      .then((res) => console.log(res.data));
    setTitle("");
    setAuthor("");
    setDescription("");
    setLocation([]);
    setRating(0);
  };
  const loactionSearchHandler = async () => {
    if (search === "") {
      setSearchResults([]);
    }
    await axios
      .get(
        `https://api.geoapify.com/v1/geocode/autocomplete?text=${search}&apiKey=00c103485e70472888f4cd0ba88428e7`
      )
      .then((response) => {
        //setSearchResults(response.data);
        var temp = response.data;
        //console.log(response.data["features"][0]["properties"]["city"]);
        temp.features.forEach((feature, index) => {
          setSearchResults((prevState) => {
            return [...prevState.slice(0, 10), feature];
          });
        });
        //feature.properties.formatted
        //feature.geometry.coordinates
      });
  };

  return (
    <>
      <h1 className="text-center">Add Experience</h1>
      <div className="container">
        <div className="row">
          <div className="col-6">
            <form onSubmit={submitHandler} className="form">
              <label htmlFor="title">Title</label>
              <input
                type="text"
                className="form-control"
                name="title"
                onChange={(event) => {
                  setTitle(event.target.value);
                }}
              />
              <label htmlFor="description">Description</label>
              <input
                type="text"
                className="form-control"
                name="description"
                onChange={(event) => {
                  setDescription(event.target.value);
                }}
              />
              <label htmlFor="author">Author Name</label>
              <input
                type="text"
                className="form-control"
                name="author"
                onChange={(e) => {
                  setAuthor(e.target.value);
                }}
              />
              <label htmlFor="location">Enter Location</label>
              <input
                type="text"
                className="form-control"
                name="location"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
              />
              <div>
                <ul>
                  {searchResults.map((result, index) => {
                    return (
                      <div
                        onClick={() => {
                          setLocation(result.geometry.coordinates);
                          setCurrentLocation(result.properties.formatted);
                          //console.log(location);
                        }}
                        id="search-results"
                        className="container"
                      >
                        {result.properties.formatted}
                      </div>
                    );
                  })}
                </ul>
              </div>
              <div>
                <label>Rating: </label>
                <button
                  className="btn"
                  type="submit"
                  onClick={() => setRating(rating + 1)}
                >
                  +
                </button>
                {rating}
                <button
                  className="btn"
                  type="submit"
                  onClick={() => setRating(rating - 1)}
                >
                  -
                </button>
              </div>

              <button className="btn btn-dark" type="submit">
                Add
              </button>
            </form>
          </div>
          <div className="col-6">
            <Maps location={location} />
            <p>Your Selected Location is:{currentLocation}</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddExperience;
