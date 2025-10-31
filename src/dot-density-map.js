(function() {
    const places = [
        { name: "Beijing", type: "家", latitude: 39.9042, longitude: 116.4074 },
        { name: "Hongkong", type: "大学", latitude: 22.3964, longitude: 114.1095 },
        { name: "Singapore", type: "实习", latitude: 1.3521, longitude: 103.8198 },
        { name: "Jiangxi", type: "交流", latitude: 27.9860, longitude: 115.0000 },
        { name: "Zurich", type: "交流", latitude: 47.3769, longitude: 8.5417 },
        { name: "Nanjing", type: "旅游", latitude: 32.0415, longitude: 118.7674 },
        { name: "Jiangsu", type: "旅游", latitude: 33.0000, longitude: 120.0000 },
        { name: "Guangdong", type: "旅游", latitude: 23.1291, longitude: 113.2644 },
        { name: "Shandong", type: "旅游", latitude: 36.6758, longitude: 117.0000 },
        { name: "Neimenggu", type: "旅游", latitude: 43.7449, longitude: 111.7727 },
        { name: "Tianjing", type: "旅游", latitude: 39.1400, longitude: 117.2000 },
        { name: "Sichuan", type: "旅游", latitude: 30.6595, longitude: 104.0663 },
        { name: "Chongqing", type: "旅游", latitude: 29.4316, longitude: 106.9116 },
        { name: "Yunnan", type: "旅游", latitude: 25.0406, longitude: 102.7123 },
        { name: "Hainan", type: "旅游", latitude: 20.0410, longitude: 110.3400 },
        { name: "Riben", type: "旅游", latitude: 35.6895, longitude: 139.6917 },
        { name: "Taiwan", type: "旅游", latitude: 23.6978, longitude: 120.9605 },
        { name: "SriLanka", type: "旅游", latitude: 7.8731, longitude: 80.7718 },
        { name: "Munich", type: "旅游", latitude: 51.1657, longitude: 10.4515 },
        { name: "America", type: "旅游", latitude: 37.0902, longitude: -95.7129 },
        { name: "Canada", type: "旅游", latitude: 56.1304, longitude: -106.3468 }
    ];

    const width = 960;
    const height = 600;

    const colorScale = d3.scaleOrdinal()
        .domain(["家", "大学", "实习", "交流", "旅游"])
        .range(["#e41a1c", "#ff7f00", "#4daf4a", "#377eb8", "#984ea3"]);

    const projection = d3.geoMercator()
        .scale(150)
        .translate([width / 2, height / 1.5]);

    const path = d3.geoPath()
        .projection(projection);

    const svg = d3.select("#dot-density-map")
        .append("svg")
        .attr("width", width)
        .attr("height", height);

    const tooltip = d3.select("body").append("div")
        .attr("class", "tooltip")
        .style("opacity", 0);

    d3.json("https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json")
        .then(data => {
            svg.append("g")
                .selectAll("path")
                .data(topojson.feature(data, data.objects.countries).features)
                .enter().append("path")
                .attr("d", path)
                .attr("fill", "#ddd")
                .attr("stroke", "#fff")
                .attr("stroke-width", 0.5);

            svg.selectAll(".dot")
                .data(places)
                .enter()
                .append("circle")
                .attr("class", "dot")
                .attr("cx", d => projection([d.longitude, d.latitude])[0])
                .attr("cy", d => projection([d.longitude, d.latitude])[1])
                .attr("r", 5)
                .attr("fill", d => colorScale(d.type))
                .style("opacity", 0.7)
                .on("mouseover", function(event, d) {
                    tooltip.transition()
                        .duration(200)
                        .style("opacity", .9);
                    tooltip.html(d.name)
                        .style("left", (event.pageX) + "px")
                        .style("top", (event.pageY - 28) + "px");
                    d3.select(this)
                        .style("stroke", "black")
                        .style("stroke-width", 2);
                })
                .on("mouseout", function(event, d) {
                    tooltip.transition()
                        .duration(500)
                        .style("opacity", 0);
                    d3.select(this)
                        .style("stroke", "none")
                        .style("stroke-width", 0);
                });

            // 添加城市名称
            svg.selectAll(".place-label")
                .data(places)
                .enter()
                .append("text")
                .attr("class", "place-label")
                .attr("x", d => projection([d.longitude, d.latitude])[0] + 8)
                .attr("y", d => projection([d.longitude, d.latitude])[1] + 3)
                .style("font-size", "10px")
                .style("fill", "black")
                .text(d => d.name);

            // 创建统一图例
            const legend = d3.select("#legend").append("svg")
                .attr("width", 200)  // 调整宽度以适应图例内容
                .attr("height", 150);

            const legendData = [
                { label: "家", color: "#e41a1c" },
                { label: "大学", color: "#ff7f00" },
                { label: "实习", color: "#4daf4a" },
                { label: "交流", color: "#377eb8" },
                { label: "旅游", color: "#984ea3" }
            ];

            legend.selectAll(".legend-item")
                .data(legendData)
                .enter().append("g")
                .attr("class", "legend-item")
                .attr("transform", (d, i) => `translate(0, ${i * 30})`)
                .each(function(d) {
                    d3.select(this).append("rect")
                        .attr("width", 20)
                        .attr("height", 20)
                        .style("fill", d.color);
                    d3.select(this).append("text")
                        .attr("x", 30)
                        .attr("y", 15)
                        .text(d.label);
                });
        })
        .catch(error => {
            console.error("Error loading the map data:", error);
        });
})();