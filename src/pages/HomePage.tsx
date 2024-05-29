import Home from "../features/Home/Home";
import Loader from "../shared/components/Loader";
import NoDataFound from "../shared/components/NoDataFound";

const HomePage = () => {
	if (true) {
		return <NoDataFound message="No Order Found" />;
	}
	return <Home />;
};

export default HomePage;
