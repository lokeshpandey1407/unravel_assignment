import { useCallback, useRef, useState } from "react";
import styles from "./Home.module.css";
import Loader from "../../custom/loader/Loader";
import Room from "../Room/Room";
import useFetch from "../../custom/hooks/useFetch";

function Home() {
  const [pageNum, setPageNum] = useState(0);
  const intObserver = useRef();

  const { isLoading, rooms, hasNextPage } = useFetch(pageNum);

  //callback function get infinite loading
  const lastItemRef = useCallback(
    (room) => {
      if (intObserver.current) intObserver.current.disconnect();
      intObserver.current = new IntersectionObserver((rooms) => {
        if (rooms[0].isIntersecting && hasNextPage) {
          setPageNum((prev) => prev + 1);
        }
      });
      if (room) intObserver.current.observe(room);
    },
    [hasNextPage]
  );

  const content = rooms.map((room, index) => {
    if (rooms.length === index + 1) {
      return (
        <Room
          ref={lastItemRef}
          key={index}
          room={room}
          images={room.properties.room_images}
          videos={room.properties.video_url}
        />
      );
    }
    return (
      <Room
        key={index}
        room={room}
        images={room.properties.room_images}
        videos={room.properties.video_url}
      />
    );
  });

  return (
    <main>
      <section className={styles.roomsSection}>{content}</section>
      {isLoading && (
        <div
          style={{
            display: "flex",
            placeItems: "center",
            justifyContent: "center",
            alignItems: "center",
            minHeight: "90vh",
            minWidth: "96vw",
          }}
        >
          <Loader />
        </div>
      )}
    </main>
  );
}

export default Home;
