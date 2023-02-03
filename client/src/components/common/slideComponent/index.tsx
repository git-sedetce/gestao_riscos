import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/splide/dist/css/splide.min.css";
import { RiskType } from "../../../services/riskService";
import SlideCard from "../slideCard";

interface props {
  risk: RiskType[];
}

const SlideComponent = function ({ risk }: props) {
  let slideCount = 0;

  if (risk.length > 4) {
    slideCount = 4;
  } else if (risk) {
    slideCount = risk.length;
  }

  return (
    <>
      <div className="d-flex flex-column align-items-center py-4">
        <Splide
          options={{
            type: "loop",
            perPage: slideCount,
            perMove: 1,
            width: slideCount * 300,
            pagination: false,
            arrows: risk.length > 4 ? true : false,
            drag: risk.length > 4 ? true : false,
            breakpoints: {
              1200: {
                perPage: slideCount >= 2 ? 2 : 1,
                width: slideCount >= 2 ? 600 : 300,
                arrows: risk.length > 2 ? true : false,
                drag: risk.length > 2 ? true : false,
              },
              600: {
                perPage: 1,
                width: 300,
                arrows: risk.length > 1 ? true : false,
                drag: risk.length > 1 ? true : false,
              },
              300: {
                width: 250,
              },
            },
          }}
        >
          {risk?.map((risk) => (
            <SplideSlide key={risk.id}>
              <SlideCard risk={risk} />
            </SplideSlide>
          ))}
        </Splide>
      </div>
    </>
  );
};

export default SlideComponent;
