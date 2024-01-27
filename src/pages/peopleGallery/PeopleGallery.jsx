import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import { fetchDataFromApi } from "../../utils/api";

import "./style.scss";

const PeopleGallery = () => {
  const { id } = useParams();

  const { url } = useSelector((state) => state.home);
  const [profiles, setProfiles] = useState([]);
  const [actorInfo, setActorInfo] = useState({});
  const [extraActorInfo, setExtraActorInfo] = useState({});

  useEffect(() => {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkODY1YmRiYzJlMDllMGQzMWUwM2VjNGU2ZTBmOTYxYiIsInN1YiI6IjY1NjYxOGFlYThiMmNhMDEyYzE0MWU0MCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Mwt4jFGDjwIOuqrfT281NpbdoC_OxeniTs1HfWkSJRg",
      },
    };

    fetch(`https://api.themoviedb.org/3/person/${id}/images`, options)
      .then((response) => response.json())
      .then((response) => {
        setProfiles(response.profiles);
        // console.log(`${url.poster}${response.profiles[0].file_path}`);
      })
      .catch((err) => console.error(err));

    fetchDataFromApi("/person/popular").then((res) => {
      console.log(res.results[0]);
      for (let result of res.results) {
        if (result.id == id) {
          setActorInfo(result);
        }
      }
      console.log(actorInfo);
    });

    //TODO: add extra actor info into extraActorInfo state after inspecting what we get in response
    fetchDataFromApi(`/person/${id}`).then((res) => {
      console.log(res);
      setExtraActorInfo(res);
    });
  }, []);

  let profileImg =
    actorInfo?.profile_path === undefined
      ? `${url.poster}${profiles[0]?.file_path}`
      : `${url.poster}${actorInfo?.profile_path}`;

  return (
    // TODO: fix css and gallery responsiveness and all set
    //TODO: display extra actor info from extraActorInfo state in profile-sidebar
    <div className="profile-container">
      <div className="profile-sidebar">
        <div className="profile-img">
          <img src={profileImg} alt="" />
        </div>
        <h3 className="profile-name">{actorInfo.name}</h3>
        <h5 className="info-heading">Personal Info</h5>
        <div className="info-group">
          <p className="info-subheading">Known for</p>
          <p className="info-value">{actorInfo.known_for_department}</p>
        </div>
        <div className="info-group">
          <p className="info-subheading">Gender</p>
          <p className="info-value">
            {actorInfo.gender == 2 ? "Male" : "Female"}
          </p>
        </div>
        {actorInfo.name != actorInfo.original_name && (
          <div className="info-group">
            <p className="info-subheading">Original Name</p>
            <p className="info-value">{actorInfo.original_name}</p>
          </div>
        )}
      </div>

      <div className="gallery-container">
        {actorInfo?.known_for && (
          <div className="actor-movies-container">
            <h4>Known for</h4>
            <div className="movie-container">
              {actorInfo?.known_for?.map((movie) => {
                const movieImg = `${url.poster}${movie.backdrop_path}`;
                return (
                  <div className="movie" key={movie.id}>
                    <img
                      src={movieImg}
                      alt={movie.original_title}
                      className="movie-img"
                    />
                    <p className="movie-title">{movie.original_title}</p>
                  </div>
                );
              })}
            </div>
          </div>
        )}
        <h1 className="gallery-title">Gallery</h1>
        <div className="grid">
          {profiles?.map((profile) => {
            const galleryImg = `${url.poster}${profile.file_path}`;
            return (
              <div className="img-container" key={Math.random() * 20 + 100}>
                <img src={galleryImg} />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default PeopleGallery;
