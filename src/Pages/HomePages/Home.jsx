import Banner from "./Banner";
import TopFoods from "./TopFoods";

const foodsPromice = fetch("http://localhost:3000/foods").then((res) =>
    res.json(),
);

const Home = () => {
    return (
        <div>
            <Banner />
            <TopFoods foodsPromice={foodsPromice} />
        </div>
    );
};

export default Home;
