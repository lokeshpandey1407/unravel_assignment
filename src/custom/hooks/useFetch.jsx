import { useEffect, useState } from "react";

//Hook to fetch the data json file
const useFetch = (pageNum = 1) => {
  const [isLoading, setIsLoading] = useState(true);
  const [rooms, setRooms] = useState([]);
  const [hasNextPage, setHasNextPage] = useState(true);
  let dataPerPage = 10;

  useEffect(() => {
    setIsLoading(true);
    fetch("/sample.json")
      .then((res) => res.json())
      .then((data) => {
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
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false);
        alert(error?.message || "Some error occured. Please try again.");
      });
  }, [pageNum, dataPerPage]);
  return { rooms, isLoading, hasNextPage };
};

export default useFetch;
