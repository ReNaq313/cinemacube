import ContentWrapper from "../../../components/contentWrapper/ContentWrapper";

import useFetch from "../../../hooks/useFetch";
import Carousel from "../../../components/carousel/Carousel";

const People = () => {

  const { data, loading } = useFetch(`/person/popular`);
  console.log(data);

  return (
    <div className="carouselSection">
      <ContentWrapper>
        <span className="carouselTitle">Trending Actors</span>
      </ContentWrapper>
      <Carousel data={data?.results} loading={loading} />
    </div>
  );
};

export default People;
