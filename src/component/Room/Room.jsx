import { forwardRef, useEffect, useRef, useState } from "react";
import styles from "./Room.module.css";
import PropTypes from "prop-types";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { Link } from "react-router-dom";
const Room = forwardRef(function Room({ room, images, videos }, ref) {
  const [currentImage, setCurrentImage] = useState("");
  const [galleryImages, setGalleryImages] = useState([]);
  const [currentVideo, setCurrentVideo] = useState("");
  const videoRef = useRef(null);

  useEffect(() => {
    if (images && images.length > 0) {
      setCurrentImage(images[0].image_urls[0]);
      setGalleryImages(images[0].image_urls);
    } else if (videos && videos.med) {
      setCurrentVideo(videos.med);
    }
  }, []);

  useEffect(() => {
    if (videoRef.current && currentVideo) {
      const currentVideoRef = videoRef.current;
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              videoRef.current.play();
            } else {
              videoRef.current.pause();
            }
          });
        },
        { threshold: 1 }
      );

      observer.observe(videoRef.current);

      return () => {
        if (currentVideoRef) {
          observer.unobserve(currentVideoRef);
        }
      };
    }
  }, [currentVideo]);

  return (
    <div className={styles.roomSection} ref={ref ? ref : null}>
      {currentImage && (
        <LazyLoadImage
          src={currentImage}
          srcSet={`${images[0]?.image_urls[0]} 300w,${images[1]?.image_urls[2]} 300w,${images[0]?.image_urls[0]} 300w`}
          sizes="(max-width: 100%) 300px,
             (max-width: 100%) 600px,
             900px"
          alt="room image"
          placeholderSrc={"/public/download.png"}
          style={{ maxWidth: "100%", height: "auto", display: "block" }}
        />
      )}
      {currentVideo && (
        <video
          width="100%"
          height="240"
          controls
          muted
          ref={videoRef}
          style={{ backgroundColor: "#fff" }}
        >
          <source src={currentVideo} type="video/mp4" />
        </video>
      )}
      <section className={styles.gallerySection}>
        {galleryImages.length > 0 &&
          galleryImages.map((img, index) => {
            return <img key={index} src={img} alt="room images gallery" />;
          })}
      </section>
      <div className={styles.roomDetails}>
        <h3>{room.name}</h3>
        <p>{room.price}</p>
        <p>Bed type - {room.properties.bed_type}</p>
      </div>
      <Link className={styles.link} to={"/variants"} state={room.variants}>
        View more
      </Link>
    </div>
  );
});

Room.propTypes = {
  room: PropTypes.object.isRequired,
  images: PropTypes.array,
  videos: PropTypes.object,
};

export default Room;
