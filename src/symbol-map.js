(function() {
   const width = document.getElementById('symbol-map').offsetWidth;
    const height = document.getElementById('symbol-map').offsetHeight;

    // 创建SVG元素
    const svg = d3.select("#symbol-map")
        .append("svg")
        .attr("width", width)
        .attr("height", height);

    // 地理投影
    const projection = d3.geoMercator()
        .scale(width / (2 * Math.PI)) // 调整比例以适应容器
        .translate([width / 2, height / 2]);

    // 地理路径生成器
    const path = d3.geoPath()
        .projection(projection);

    // 创建提示框
    const tooltip = d3.select("body").append("div")
        .attr("class", "tooltip")
        .style("opacity", 0);

    // 加载世界地图数据
    d3.json("https://unpkg.com/world-atlas@1/world/110m.json") // 使用CDN获取TopoJSON数据
        .then(world => {
            // 绘制地图
            svg.append("path")
                .datum(topojson.feature(world, world.objects.land))
                .attr("class", "land")
                .attr("d", path)
                .style("fill", "#ddd");

            svg.append("path")
                .datum(topojson.mesh(world, world.objects.countries, (a, b) => a !== b))
                .attr("class", "borders")
                .attr("d", path)
                .style("fill", "none")
                .style("stroke", "steelblue")
                .style("stroke-width", "0.5px");

            // 模拟访问者数据
            function generateRandomData(numPoints) {
                const data = [];
                for (let i = 0; i < numPoints; i++) {
                    const longitude = Math.random() * 360 - 180;
                    const latitude = Math.random() * 180 - 90;
                    data.push({
                        latitude: latitude,
                        longitude: longitude,
                        city: `City ${i + 1}`,
                        visitors: Math.floor(Math.random() * 100) + 10 // 10-110 visitors
                    });
                }
                return data;
            }

            // 更新符号位置
            function updateSymbols(data) {
                // 数据连接
                const symbols = svg.selectAll(".symbol")
                    .data(data, d => d.city); // 使用城市作为键

                // 退出
                symbols.exit()
                    .remove();

                // 进入 + 更新
                symbols.enter()
                    .append("circle")
                    .attr("class", "symbol")
                    .attr("r", 5)
                    .style("fill", "red")
                    .style("opacity", 0.7)
                    .on("mouseover", function(event, d) {
                        tooltip.transition()
                            .duration(200)
                            .style("opacity", .9);
                        tooltip.html(d.city + "<br/>Visitors: " + d.visitors)
                            .style("left", (event.pageX) + "px")
                            .style("top", (event.pageY - 28) + "px");
                    })
                    .on("mouseout", function() {
                        tooltip.transition()
                            .duration(500)
                            .style("opacity", 0);
                    })
                    .merge(symbols) // 合并 enter 和 update
                    .attr("cx", d => projection([d.longitude, d.latitude])[0])
                    .attr("cy", d => projection([d.longitude, d.latitude])[1]);
            }

            // 初始数据
            let visitorData = generateRandomData(10);
            updateSymbols(visitorData);

            // 定期更新数据
            setInterval(() => {
                visitorData = generateRandomData(10);
                updateSymbols(visitorData);
            }, 3000); // 每3秒更新一次
        });
        })();