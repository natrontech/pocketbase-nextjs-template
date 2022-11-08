import { NextPage } from "next";
import { Card, Title, AreaChart, DonutChart, Flex, Text, Bold, BarList } from "@tremor/react";
import Heading from "../components/general/typo/Heading";
import Stats from "../components/dashboard/Stats";
import GithubFillIcon from 'remixicon-react/GithubFillIcon';
import YoutubeFillIcon from 'remixicon-react/YoutubeFillIcon';
import GoogleFillIcon from 'remixicon-react/GoogleFillIcon';
import RedditFillIcon from 'remixicon-react/RedditFillIcon';
import TwitterFillIcon from 'remixicon-react/TwitterFillIcon';

const chartdata = [
    {
        date: "Jan 22",
        SemiAnalysis: 2890,
        "The Pragmatic Engineer": 2338,
    },
    {
        date: "Feb 22",
        SemiAnalysis: 2756,
        "The Pragmatic Engineer": 2103,
    },
    {
        date: "Mar 22",
        SemiAnalysis: 3322,
        "The Pragmatic Engineer": 2194,
    },
    {
        date: "Apr 22",
        SemiAnalysis: 3470,
        "The Pragmatic Engineer": 2108,
    },
    {
        date: "May 22",
        SemiAnalysis: 3475,
        "The Pragmatic Engineer": 1812,
    },
    {
        date: "Jun 22",
        SemiAnalysis: 3129,
        "The Pragmatic Engineer": 1726,
    },
];

const cities = [
    {
        name: 'New York',
        sales: 9800,
    },
    {
        name: 'London',
        sales: 4567,
    },
    {
        name: 'Hong Kong',
        sales: 3908,
    },
    {
        name: 'San Francisco',
        sales: 2400,
    },
    {
        name: 'Singapore',
        sales: 1908,
    },
    {
        name: 'Zurich',
        sales: 1398,
    },
];

const data = [
    { name: 'Twitter', value: 456, icon: TwitterFillIcon },
    { name: 'Google', value: 351, icon: GoogleFillIcon},
    { name: 'GitHub', value: 271, icon: GithubFillIcon },
    { name: 'Reddit', value: 191, icon: RedditFillIcon },
    { name: 'Youtube', value: 91, icon: YoutubeFillIcon },
];

const dataFormatter = (number: number) => {
    return "$ " + Intl.NumberFormat("us").format(number).toString();
};

const valueFormatter = (number: number) => (
    `$ ${Intl.NumberFormat('us').format(number).toString()}`
);

const Dashboard: NextPage = () => {
    return (
        <div
            className=""
        >
            <Heading>
                Dashboard
            </Heading>
            <Stats />
            <Card
                marginTop="mt-8"
            >
                <Title>Newsletter revenue over time (USD)</Title>
                <AreaChart
                    data={chartdata}
                    categories={["SemiAnalysis", "The Pragmatic Engineer"]}
                    dataKey="date"
                    height="h-72"
                    colors={["indigo", "cyan"]}
                    valueFormatter={dataFormatter}
                    marginTop="mt-4"
                />
            </Card>
            <Card marginTop="mt-8">
                <Title>Sales by City</Title>
                <DonutChart
                    data={cities}
                    category="sales"
                    dataKey="name"
                    valueFormatter={valueFormatter}
                    marginTop="mt-6"
                    colors={["slate", "violet", "indigo", "rose", "cyan", "amber"]}
                />
                <Title>Website Analytics</Title>
                <Flex marginTop="mt-4">
                    <Text><Bold>Source</Bold></Text>
                    <Text><Bold>Visits</Bold></Text>
                </Flex>
                <BarList data={data} marginTop="mt-2" />
            </Card>
        </div>
    )
}

export default Dashboard;
