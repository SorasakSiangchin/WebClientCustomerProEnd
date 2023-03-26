
import SimpleImageSlider from "react-simple-image-slider";

const images = [
    { url: "https://drive.google.com/uc?id=1XS_IQoLQ3Kv87Oqby7M3ilYQdzbkzc4O" },
    { url: "https://drive.google.com/uc?id=1Avb4wa7BkvxhWdAtXr2JtB-_N5m97s7R" },
    { url: "https://drive.google.com/uc?id=1zdt51OPNnR7p4MPik-AauNIOGZK3rJ4b" },
    { url: "https://drive.google.com/uc?id=1JX6BkZgDiK-ZgePwuFJWNunKJI8ldrO0" },
];

const SlideImage = () => {
    return (
        <div className="content">
            <SimpleImageSlider
                width={"100%"}
                height={"57rem"}
                images={images}
                showBullets
                showNavs
                autoPlay
                slideDuration={1}
                autoPlayDelay={2.0}
            />
        </div>
    )
};

export default SlideImage