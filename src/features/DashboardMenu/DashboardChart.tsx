import { OpenaiControllerCreateGraph201 } from "@api/services/models";
import ReactApexChart from "react-apexcharts";

const BarChart = ({ graphData }: { graphData: OpenaiControllerCreateGraph201 }) => {
	return (
		<div id="chart">
			<ReactApexChart
				options={graphData?.options ?? {}}
				series={graphData?.series ?? { data: [] }}
				type="bar"
				height={350}
			/>
		</div>
	);
};

export default BarChart;
