import { useEffect, useState } from "react";
import data from "/sample.json";
//Hook to fetch the data json file
const useFetch = (pageNum = 1) => {
  const [isLoading, setIsLoading] = useState(true);
  const [rooms, setRooms] = useState([]);
  const [hasNextPage, setHasNextPage] = useState(true);
  let dataPerPage = 10;

  useEffect(() => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);

      const roomsData = data.rooms_by_serial_no[0].rooms.splice(
        pageNum * dataPerPage,
        dataPerPage
      );
      setRooms((prev) => [...prev, ...roomsData]);

      if (roomsData.length == 0) {
        setHasNextPage(false);
      }
    }, 1000);
  }, [pageNum, dataPerPage]);
  return { rooms, isLoading, hasNextPage };
};

export default useFetch;
