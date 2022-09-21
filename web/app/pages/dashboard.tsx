import { NextPage } from "next";
import CardLineChart from "../components/dashboard/CardLineChart";
import Heading from "../components/general/typo/Heading";

const Dashboard: NextPage = () => {
    return (
        <div>
            <Heading>
                Dashboard
            </Heading>
            <CardLineChart />
        </div>
    )
}

export default Dashboard;
