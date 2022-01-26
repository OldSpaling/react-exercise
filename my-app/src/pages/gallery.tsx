import { useLocation } from "react-router";
import { Link } from "react-router-dom";
import { IMAGES } from "../services/images";

export default function Gallery() {
    const location = useLocation();
    return (
        <div style={{ padding: "0 24px" }}>
            <h2>Gallery</h2>
            <div style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))",
                gap: "24px"
            }}>
                {
                    IMAGES.map(image => (
                        <Link
                            key={image.id}
                            to={`/gallery/img/${image.id}`}
                            state={{ backgroundLocation: location }}
                        >
                            <img
                                src={image.src}
                                alt={image.title}
                                style={{
                                    width: "100%",
                                    aspectRatio: "1 / 1",
                                    height: "auto",
                                    borderRadius: "8px"
                                }} />
                        </Link>
                    ))
                }
            </div>
        </div>
    );
}