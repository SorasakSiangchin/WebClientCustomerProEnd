
import SimpleImageSlider from "react-simple-image-slider";
const images = [
    { url: "https://drive.google.com/uc?id=1NRV8h9NSsT5sCzkn6m74E65yb4KDgH8O" },
    { url: "https://drive.google.com/uc?id=1Tx9fSSrvyPz_Cy7p0rF9KNa-tSqxVC5D" },
    { url: "https://drive.google.com/uc?id=1xBnL7uj_WYDdUYjGaAHo6JEsdANoF9V9" },
    { url: "https://drive.google.com/uc?id=1SFqfx8-VdMNU66OIgY0P6Pc4_pUiqJ9W" },
];
const SlideImage = () => {
    return (
        <div className="content">
            <SimpleImageSlider
                width={"100%"}
                height={700}
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