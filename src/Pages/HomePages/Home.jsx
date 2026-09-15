import Banner from "./Banner";
import OurStory from "./OurStory";
import RestaurantStats from "./RestaurantStats";
import TopFoods from "./TopFoods";

const foodsPromice = fetch("http://localhost:3000/foods").then((res) =>
    res.json(),
);

const Home = () => {
    return (
        <div>
            <Banner />
            <TopFoods foodsPromice={foodsPromice} />
            <OurStory/>
            <RestaurantStats/>
        </div>
    );
};

export default Home;
