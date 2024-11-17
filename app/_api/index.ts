import axios from "axios";

const API_URL = `https://pixabay.com/api/?key=${process.env.EXPO_PUBLIC_PIXABAY_KEY}`;

export type ParamsType = {
  q?: string;
  page?: number;
  category?:
    | "backgrounds"
    | "fashion"
    | "nature"
    | "science"
    | "education"
    | "feelings"
    | "health"
    | "people"
    | "religion"
    | "places"
    | "animals"
    | "industry"
    | "computer"
    | "food"
    | "sports"
    | "transportation"
    | "travel"
    | "buildings"
    | "business"
    | "music";
  order?: "popular" | "latest";
};

const formatUrl = (params: ParamsType | undefined) => {
  let url =
    API_URL +
    "&orientation=vertical&per_page=25&safesearch=true&editors_choice=true";
  if (!params) return url;

  Object.keys(params).forEach((key) => {
    const value = key === "q" ? encodeURIComponent(params[key]) : params[key];
    url += `&${key}=${value}`;
  });

  return url;
};

export const apiCall = async (params: ParamsType) => {
  try {
    const response = await axios.get(formatUrl(params));
    const { data } = response;

    return {
      success: true,
      data: data,
    };
  } catch (err) {
    console.log(err);
    return { success: false, data: [] };
  }
};
