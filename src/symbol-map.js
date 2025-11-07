(function() {
    const width = document.getElementById('symbol-map').offsetWidth;
    const height = document.getElementById('symbol-map').offsetHeight;

    const svg = d3.select("#symbol-map")
        .append("svg")
        .attr("width", width)
        .attr("height", height);

    // 所有可缩放内容放入一个容器
    const zoomLayer = svg.append("g").attr("class", "zoom-layer");

    const projection = d3.geoMercator()
        .scale(width / (2 * Math.PI))
        .translate([width / 2, height / 2]);

    const path = d3.geoPath().projection(projection);

    const tooltip = d3.select("body").append("div")
        .attr("class", "tooltip")
        .style("opacity", 0);

    const cities = [
        { city: "北京", latitude: 39.9042, longitude: 116.4074 },
        { city: "香港", latitude: 22.3193, longitude: 114.1694 },
        { city: "伦敦", latitude: 51.5074, longitude: -0.1278 },
        { city: "苏黎世", latitude: 47.3769, longitude: 8.5417 },
        { city: "洛杉矶", latitude: 34.0522, longitude: -118.2437 },
        { city: "纽约", latitude: 40.7128, longitude: -74.0060 },
        { city: "温哥华", latitude: 49.2827, longitude: -123.1207 },
        { city: "阿布扎比", latitude: 24.4539, longitude: 54.3773 },
        { city: "东京", latitude: 35.6895, longitude: 139.6917 },
        { city: "巴黎", latitude: 48.8566, longitude: 2.3522 },
        { city: "新加坡", latitude: 1.3521, longitude: 103.8198 },
        { city: "悉尼", latitude: -33.8688, longitude: 151.2093 },
        { city: "首尔", latitude: 37.5665, longitude: 126.9780 },
        { city: "柏林", latitude: 52.5200, longitude: 13.4050 },
        { city: "多伦多", latitude: 43.6510, longitude: -79.3470 }
    ];

    // 添加缩放行为，作用于 zoomLayer
    const zoom = d3.zoom()
        .scaleExtent([0.5, 8])
        .on("zoom", (event) => {
            zoomLayer.attr("transform", event.transform);
        });

    svg.call(zoom);

    d3.json("https://unpkg.com/world-atlas@1/world/110m.json")
        .then(world => {
            zoomLayer.append("path")
                .datum(topojson.feature(world, world.objects.land))
                .attr("class", "land")
                .attr("d", path)
                .style("fill", "#ddd");

            zoomLayer.append("path")
                .datum(topojson.mesh(world, world.objects.countries, (a, b) => a !== b))
                .attr("class", "borders")
                .attr("d", path)
                .style("fill", "none")
                .style("stroke", "steelblue")
                .style("stroke-width", "0.5px");

            // 初始化城市数据
            let visitorData = cities.map(d => ({
                ...d,
                visitors: Math.floor(Math.random() * 100) + 10
            }));

            function updateSymbols(data) {
                const symbols = zoomLayer.selectAll(".symbol")
                    .data(data, d => d.city);

                symbols.enter()
                    .append("circle")
                    .attr("class", "symbol")
                    .style("fill", "red")
                    .style("opacity", 0.7)
                    .attr("cx", d => projection([d.longitude, d.latitude])[0])
                    .attr("cy", d => projection([d.longitude, d.latitude])[1])
                    .on("mouseover", function(event, d) {
                        tooltip.transition()
                            .duration(200)
                            .style("opacity", .9);
                        tooltip.html(`${d.city}<br/>Visitors: ${d.visitors}`)
                            .style("left", (event.pageX) + "px")
                            .style("top", (event.pageY - 28) + "px");
                    })
                    .on("mouseout", function() {
                        tooltip.transition()
                            .duration(500)
                            .style("opacity", 0);
                    })
                    .merge(symbols)
                    .transition()
                    .duration(500)
                    .attr("r", d => Math.sqrt(d.visitors));
            }

            updateSymbols(visitorData);

            setInterval(() => {
                visitorData.forEach(d => {
                    d.visitors = Math.floor(Math.random() * 100) + 10;
                });
                updateSymbols(visitorData);
            }, 1000);
        });
})();
