import * as d3 from "d3-scale";
export default function(value, domainLeft, domainRight, rangeLeft, rangeRight) {
  const scale = d3
    .scaleLinear()
    .domain([domainLeft, domainRight])
    .range([rangeLeft, rangeRight]);
  return scale(value);
}
