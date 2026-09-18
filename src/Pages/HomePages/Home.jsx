import { Helmet } from "react-helmet-async";
import Banner from "./Banner";
import OurStory from "./OurStory";
import RestaurantStats from "./RestaurantStats";
import TopFoods from "./TopFoods";

const Home = () => {
    return (
        <div>
            <Helmet>
                <title>Home - Hidden Pearl</title>
            </Helmet>
            <Banner />
            <TopFoods />
            <OurStory />
            <RestaurantStats />
        </div>
    );
};

export default Home;
