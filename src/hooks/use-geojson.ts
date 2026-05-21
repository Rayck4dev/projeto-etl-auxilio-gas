import { useEffect, useState } from "react";

import { GEOJSON_URL } from "@/constants/mapaBrasil";

export function useGeoJson() {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    fetch(GEOJSON_URL)
      .then((res) => res.json())
      .then(setData);
  }, []);

  return data;
}
