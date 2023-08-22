import { mutate } from "swr";

export const fetcher = async (url, source) => {
  const { default: axios } = await import("axios");
  let token;
  if (source) {
    token = source?.token;
  }
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_API_PATH}${url}`,
      token && {
        cancelToken: token,
      }
    );
    return response.data;
  } catch (error) {
    return Promise.reject(error);
  }
};

export async function prefetch(url) {
  return mutate(url, await fetcher(url), false);
}
