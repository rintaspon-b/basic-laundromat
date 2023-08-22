const MachineStart = async (id, processTime) => {
  const apiPath = process.env.REACT_APP_API_PATH;
  const { default: axios } = await import("axios");

  try {
    const { data } = await axios.post(
      `${apiPath}/api/machine/start`,
      {
        id: id,
        processTime: processTime,
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    return { data: data, error: null };
  } catch (error) {
    return { data: null, error: error };
  }
};

export { MachineStart };
