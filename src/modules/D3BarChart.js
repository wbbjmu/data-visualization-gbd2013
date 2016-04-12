export default function(d3) {

  var DOMNode;

  return {

    create(node, dimensions) {

      DOMNode = node;

      var svg = d3.select(DOMNode).append("svg")
          .attr("class", "bar-chart")
          .attr("width", dimensions.width)
          .attr("height", dimensions.height);

      return this;
    },
    update(dimensions, state) {

      const name = state.name;
      const type = state.type
      const data = state.data;

      var y = d3.scale.linear()
          .domain([0, 100])     // domain is percentage
          .range([dimensions.height, 0]);

      var barWidth = dimensions.width / data.length;

      var g = d3.select(DOMNode).select("svg").selectAll("g")
          .data(data, (d) => { return d.name }); // index data by location name

      g.enter().append("g")
          .attr("transform", (d, i) => {
            return `translate(${i * barWidth}, 0)`;
          });

      g.append("rect")
          .attr("y", (d) => { return y(d.overweight); })
          .attr("height", (d) => { return dimensions.height - y(d.overweight); })
          .attr("width", barWidth - 1)
          .style("fill", "red");

      g.append("text")
          .attr("x", barWidth / 2)
          .attr("y", (d) => { return y(d.overweight) + 3; })
          .attr("dy", "0.75em")
          .text((d) => { return d.name; });

      g.exit()
          .remove();
    },
    destroy() {}
  }
};