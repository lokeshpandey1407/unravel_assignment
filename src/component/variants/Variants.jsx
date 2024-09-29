import { useLocation } from "react-router-dom";
import styles from "./Variant.module.css";

const colorPairs = [
  { backgroundColor: "#1e90ff", textColor: "#ffffff" }, 
  { backgroundColor: "#ff6347", textColor: "#ffffff" }, 
  { backgroundColor: "#32cd32", textColor: "#ffffff" }, 
  { backgroundColor: "#ffeb3b", textColor: "#000000" }, 
  { backgroundColor: "#8a2be2", textColor: "#ffffff" }, 
  { backgroundColor: "#ff69b4", textColor: "#ffffff" }, 
  { backgroundColor: "#4682b4", textColor: "#ffffff" }, 
  { backgroundColor: "#f0e68c", textColor: "#000000" }, 
  { backgroundColor: "#ffa500", textColor: "#000000" }, 
  { backgroundColor: "#d2691e", textColor: "#ffffff" }, 
  { backgroundColor: "#2f4f4f", textColor: "#ffffff" }, 
  { backgroundColor: "#f08080", textColor: "#000000" }, 
  { backgroundColor: "#228b22", textColor: "#ffffff" },
  { backgroundColor: "#db7093", textColor: "#ffffff" }, 
  { backgroundColor: "#ff4500", textColor: "#ffffff" }, 
  { backgroundColor: "#00ced1", textColor: "#000000" }, 
  { backgroundColor: "#dc143c", textColor: "#ffffff" }, 
  { backgroundColor: "#4b0082", textColor: "#ffffff" }, 
  { backgroundColor: "#7fffd4", textColor: "#000000" }, 
  { backgroundColor: "#b0e0e6", textColor: "#000000" }, 
];

const Variants = () => {
  const location = useLocation();
  const { state } = location;

  return (
    <div className={styles.variants}>
      {state.length > 0 &&
        state.map((variant, index) => {
          return (
            <div
              key={index}
              className={styles.variant}
              style={{
                backgroundColor: colorPairs[index]?.backgroundColor,
                color: colorPairs[index]?.textColor,
              }}
            >
              <p>Name : {variant.name}</p>
              <p>Price Info : {variant.price_info}</p>
              <p>Price : {variant?.total_price?.discounted_price_rounded} {variant?.total_price?.currency}</p>
            </div>
          );
        })}
    </div>
  );
};

export default Variants;
