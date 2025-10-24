(function() {
  const nodes = [
    {id: "Chinese Civilisation", group: 1},
    {id: "Media Computing", group: 1},
    {id: "Data Visualization", group: 1},
    {id: "History & Philosophy", group: 1},
    {id: "Dynamics of Contemporary Cities & Architecture in China", group: 2},
    {id: "New Media Art", group: 2},
    {id: "Physical Computing & Tangible", group: 1},
    {id: "Writing for Media Creative Media", group: 3},
    {id: "University English", group: 3},
    {id: "Materials & Fabrication Studio", group: 4},
    {id: "Creative Coding", group: 1},
    {id: "Critical Theory & Soc Engag Prac", group: 2},
    {id: "Music Studio Production", group: 4},
    {id: "Life Drawing", group: 4},
    {id: "Introduction to Photography", group: 4},
    {id: "Imaging Science Studio", group: 4},
    {id: "Information Visualization", group: 1},
    {id: "Understanding Data", group: 1},
    {id: "Creative Media Studio I", group: 2},
    {id: "Creative Media Studio II Interdisciplinary Practices", group: 2}
  ];

  const links = [
    {source: "Media Computing", target: "Chinese Civilisation", value: 1},
    {source: "Data Visualization", target: "Media Computing", value: 1},
    {source: "Physical Computing & Tangible", target: "Data Visualization", value: 1},
    {source: "Writing for Media Creative Media", target: "University English", value: 1},
    {source: "Materials & Fabrication Studio", target: "Creative Coding", value: 1},
    {source: "Creative Coding", target: "Data Visualization", value: 1},
    {source: "Critical Theory & Soc Engag Prac", target: "Creative Coding", value: 1},
    {source: "Music Studio Production", target: "Critical Theory & Soc Engag Prac", value: 1},
    {source: "Life Drawing", target: "Introduction to Photography", value: 1},
    {source: "Introduction to Photography", target: "Imaging Science Studio", value: 1},
    {source: "Information Visualization", target: "Understanding Data", value: 1},
    {source: "Understanding Data", target: "Creative Media Studio I", value: 1},
    {source: "Creative Media Studio I", target: "Creative Media Studio II Interdisciplinary Practices", value: 1},
    {source: "Dynamics of Contemporary Cities & Architecture in China", target: "New Media Art", value: 1},
    {source: "Creative Media Studio I", target: "Imaging Science Studio", value: 1},
    {source: "Creative Media Studio I", target: "Materials & Fabrication Studio", value: 1},
    {source: "Creative Media Studio I", target: "Critical Theory & Soc Engag Prac", value: 1},
    {source: "Dynamics of Contemporary Cities & Architecture in China", target: "Creative Media Studio I", value: 1},
    {source: "Data Visualization", target: "Creative Media Studio I", value: 1},
  ];

  const color = d3.scaleOrdinal(d3.schemeCategory10);

  // 图表的尺寸
  const width = 800;
  const height = 600;

  // 创建 SVG 元素
  const svg = d3.select("#node_link_diagram")
      .append("svg")
      .attr("width", width)
      .attr("height", height);

  // 创建力模拟
  const simulation = d3.forceSimulation(nodes)
      .force("link", d3.forceLink(links).id(d => d.id).distance(100))
      .force("charge", d3.forceManyBody().strength(-150))
      .force("center", d3.forceCenter(width / 2, height / 2))
      .on("tick", ticked);

  // 创建链接
  const link = svg.append("g")
      .attr("class", "links")
      .selectAll("line")
      .data(links)
      .enter().append("line")
      .attr("class", "link")
      .attr("stroke", "#999") // 添加默认颜色
      .attr("stroke-opacity", 0.6) // 添加透明度
      .attr("stroke-width", d => Math.sqrt(d.value));

  // 创建节点
  const node = svg.append("g")
      .attr("class", "nodes")
      .selectAll("g")
      .data(nodes)
      .enter().append("g")
      .attr("class", "node");

  node.append("circle")
      .attr("r", 10)
      .attr("fill", d => color(d.group))
      .attr("stroke", "#fff") // 添加白色边框
      .attr("stroke-width", 1.5);

  node.append("text")
      .attr("x", 12)
      .attr("dy", ".35em")
      .text(d => d.id)
      .style("font-size", "12px") // 设置字体大小
      .style("font-family", "sans-serif"); // 设置字体类型

  // 添加拖拽行为
  node.call(d3.drag()
      .on("start", dragstarted)
      .on("drag", dragged)
      .on("end", dragended));

  // 定义 tick 函数
  function ticked() {
    link
        .attr("x1", d => d.source.x)
        .attr("y1", d => d.source.y)
        .attr("x2", d => d.target.x)
        .attr("y2", d => d.target.y);

    node
        .attr("transform", d => `translate(${d.x},${d.y})`);
  }

  // 定义拖拽函数
  function dragstarted(event, d) {
    if (!event.active) simulation.alphaTarget(0.3).restart();
    d.fx = d.x;
    d.fy = d.y;
  }

  function dragged(event, d) {
    d.fx = event.x;
    d.fy = event.y;
  }

  function dragended(event, d) {
    if (!event.active) simulation.alphaTarget(0);
    d.fx = null;
    d.fy = null;
  }
})();