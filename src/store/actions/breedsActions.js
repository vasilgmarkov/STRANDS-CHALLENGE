import { API_REQUEST, GET_BREEDS, SET_ERRORS } from "../actions/types";

export const getBreeds = () => async (dispatch) => {
  dispatch({
    type: API_REQUEST,
  });
  try {
    let response = await fetch("https://dog.ceo/api/breeds/list/all");

    if (response.status !== 200) throw { message: "Something Went wrong!" };

    let data = await response.json();

    let breeds = Object.keys(data.message);
    dispatch(getBreedsAllImages(breeds, getBreedsImageUrls(breeds)));
  } catch (error) {
    dispatch({
      type: SET_ERRORS,
      payload: error.message,
    });
  }
};

const getBreedsAllImages = (breeds, breedsLinks) => async (dispatch) => {
  try {
    let breedsImages = await Promise.all(breedsLinks);
    let eachBreedImages = breedsImages
      .map((breedImages, index) => {
        return { breed: breeds[index], images: breedImages.message };
      })
      .sort((a, b) => b.images.length - a.images.length);

    dispatch({
      type: GET_BREEDS,
      payload: eachBreedImages,
    });
  } catch (error) {
    dispatch({
      type: SET_ERRORS,
      payload: error,
    });
  }
};

const getBreedsImageUrls = (breeds) => {
  return breeds.map((breed) =>
    fetch(`https://dog.ceo/api/breed/${breed}/images`).then((response) =>
      response.json()
    )
  );
};
