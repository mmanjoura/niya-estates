
import axios from "axios";
import React from "react";


const baseURL = process.env.NEXT_PUBLIC_API_URL;

export const usePropertiesData = () => {

  const [properties, setProperties] = React.useState(null);

  React.useEffect(() => {
    axios.get(`${baseURL}/properties`).then((response) => {
      setProperties(response.data);

    });
  }, []);
  ;
  return properties;
}
