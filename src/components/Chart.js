import React, { Component } from "react";
import { Pie } from "react-chartjs-2";
import { connect } from "react-redux";

class Chart extends Component {
  state = {
    data: {
      labels: [],
      datasets: [
        {
          data: [],
          backgroundColor: [],
          hoverBackgroundColor: [],
        },
      ],
    },
    options: {
      legend: {
        position: "left",
        labels: {
          boxWidth: 15,
          fontColor: "white",
          fontSize: 15,
        },
      },

      maintainAspectRatio: false,
      tooltips: {
        callbacks: {
          label: (tooltipItem, data) => {
            /**
             *
             * Calculate and display the percentege over top10 breeds and also over all breeds in the chart
             *
             * */

            let dataset = data.datasets[tooltipItem.datasetIndex];
            let meta = dataset._meta[Object.keys(dataset._meta)[0]];

            let totalTop10Breeds = meta.total;

            let totalAllBreeds = this.state.breeds
              .map((breed) => breed.images.length)
              .reduce((a, b) => a + b, 0);

            let currentValue = dataset.data[tooltipItem.index];

            let percentageOverTop10 = parseFloat(
              ((currentValue / totalTop10Breeds) * 100).toFixed(1)
            );

            let percentageOverAll = parseFloat(
              ((currentValue / totalAllBreeds) * 100).toFixed(1)
            );

            return `${currentValue} ( Top10: ${percentageOverTop10}% / All: ${percentageOverAll}% )`;
          },
          title: function (tooltipItem, data) {
            return data.labels[tooltipItem[0].index];
          },
        },
      },
    },
    breeds: [],
  };
  componentDidMount() {
    this.prepareChartDataSet(this.props.breeds);
  }

  prepareChartDataSet = ({ breeds }) => {
    let topTen = breeds.slice(0, 10);
    let labels = [];
    let data = [];
    let backgroundColor = [];
    let hoverBackgroundColor = [];
    topTen.forEach((breed) => {
      labels.push(breed.breed);
      data.push(breed.images.length);
      let color = Math.floor(Math.random() * 16777215).toString(16);
      while (backgroundColor.includes(`#${color}`)) {
        color = Math.floor(Math.random() * 16777215).toString(16);
      }
      backgroundColor.push(`#${color}`);
      hoverBackgroundColor.push(`#${color}`);
    });
    this.setState({
      data: {
        labels: labels,
        datasets: [
          {
            data,
            backgroundColor,
            hoverBackgroundColor,
          },
        ],
      },
      breeds: breeds,
    });
  };

  render() {
    return (
      <div className="chart-wrapper">
        <Pie
          data={this.state.data}
          width={250}
          height={300}
          options={this.state.options}
          redraw
        />
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  breeds: state.breeds,
});

export default connect(mapStateToProps, null)(Chart);
