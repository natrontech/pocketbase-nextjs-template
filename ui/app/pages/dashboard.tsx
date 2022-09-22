import { NextPage } from "next";
import AreaChart from "../components/dashboard/AreaChart";
import Heading from "../components/general/typo/Heading";
import { faker } from '@faker-js/faker';
import Stats from "../components/dashboard/Stats";

const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

export const areaData = {
    labels,
    datasets: [
        {
            fill: true,
            label: 'Dataset 2',
            data: labels.map(() => faker.datatype.number({ min: 0, max: 100 })),
            borderColor: 'black',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
        },
    ],
};

const Dashboard: NextPage = () => {
    return (
        <div
            className=""
        >
            <Heading>
                Dashboard
            </Heading>
            <Stats />
            <AreaChart data={areaData} />
        </div>
    )
}

export default Dashboard;
