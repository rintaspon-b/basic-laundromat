import useSWR from "swr";

export const GetToken = () => {
  const apiPath = process.env.REACT_APP_API_PATH;

  const fetcher = async () => {
    const url = `${apiPath}/api/token?userId=1`;
    try {
      const response = await fetch(url, {
        method: "GET",
      });
      return response.json();
    } catch (error) {
      throw new Error(`${error.message}`);
    }
  };

  const { data, error } = useSWR("get_token", fetcher, {
    shouldRetryOnError: false,
  });

  if (error) {
    console.error(error);
  }

  return { data };
};
