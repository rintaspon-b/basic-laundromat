import useSWR from "swr";

export const GetMachines = () => {
  const apiPath = process.env.REACT_APP_API_PATH;

  const fetcher = async () => {
    const url = `${apiPath}/api/machines`;
    try {
      const response = await fetch(url, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      return response.json();
    } catch (error) {
      throw new Error(`${error.message}`);
    }
  };

  const { data, error } = useSWR("get_machines", fetcher, {
    shouldRetryOnError: false,
  });

  if (error) {
    console.error(error);
  }

  return { data };
};
