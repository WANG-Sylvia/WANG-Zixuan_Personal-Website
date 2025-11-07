  (function() {
            const places = [
                { name: "Beijing", type: "家", latitude: 39.9042, longitude: 116.4074, year: 2000 },
                { name: "Hongkong", type: "大学", latitude: 22.3964, longitude: 114.1095, year: 2018 },
                { name: "Singapore", type: "实习", latitude: 1.3521, longitude: 103.8198, year: 2020 },
                { name: "Jiangxi", type: "交流", latitude: 27.9860, longitude: 115.0000, year: 2021 },
                { name: "Zurich", type: "交流", latitude: 47.3769, longitude: 8.5417, year: 2022 },
                { name: "Nanjing", type: "旅游", latitude: 32.0415, longitude: 118.7674, year: 2010 },
                { name: "Jiangsu", type: "旅游", latitude: 33.0000, longitude: 120.0000, year: 2011 },
                { name: "Guangdong", type: "旅游", latitude: 23.1291, longitude: 113.2644, year: 2012 },
                { name: "Shandong", type: "旅游", latitude: 36.6758, longitude: 117.0000, year: 2013 },
                { name: "Neimenggu", type: "旅游", latitude: 43.7449, longitude: 111.7727, year: 2014 },
                { name: "Tianjing", type: "旅游", latitude: 39.1400, longitude: 117.2000, year: 2015 },
                { name: "Sichuan", type: "旅游", latitude: 30.6595, longitude: 104.0663, year: 2016 },
                { name: "Chongqing", type: "旅游", latitude: 29.4316, longitude: 106.9116, year: 2017 },
                { name: "Yunnan", type: "旅游", latitude: 25.0406, longitude: 102.7123, year: 2018 },
                { name: "Hainan", type: "旅游", latitude: 20.0410, longitude: 110.3400, year: 2019 },
                { name: "Riben", type: "旅游", latitude: 35.6895, longitude: 139.6917, year: 2020 },
                { name: "Taiwan", type: "旅游", latitude: 23.6978, longitude: 120.9605, year: 2021 },
                { name: "SriLanka", type: "旅游", latitude: 7.8731, longitude: 80.7718, year: 2022 },
                { name: "Munich", type: "旅游", latitude: 51.1657, longitude: 10.4515, year: 2023 },
                { name: "America", type: "旅游", latitude: 37.0902, longitude: -95.7129, year: 2024 },
                { name: "Canada", type: "旅游", latitude: 56.1304, longitude: -106.3468, year: 2024 }
            ];

            const width = 1200;
            const height = 800;

            const colorScale = d3.scaleOrdinal()
                .domain(["家", "大学", "实习", "交流", "旅游"])
                .range(["#e41a1c", "#ff7f00", "#4daf4a", "#377eb8", "#984ea3"]);

            let projection = d3.geoMercator()
                .scale(200)
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

            // Function to update the map based on the selected year
            function updateMap(year) {
                d3.select("#loading-indicator").style("display", "block");

                setTimeout(() => {
                    const filteredPlaces = places.filter(d => d.year <= year);

                    svg.selectAll(".dot").remove();
                    svg.selectAll(".place-label").remove();

                    svg.selectAll(".dot")
                        .data(filteredPlaces)
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

                    svg.selectAll(".place-label")
                        .data(filteredPlaces)
                        .enter()
                        .append("text")
                        .attr("class", "place-label")
                        .attr("x", d => projection([d.longitude, d.latitude])[0] + 8)
                        .attr("y", d => projection([d.longitude, d.latitude])[1] + 3)
                        .style("font-size", "10px")
                        .style("fill", "black")
                        .text(d => d.name);

                    d3.select("#loading-indicator").style("display", "none");
                }, 200);
            }

            // Function to handle zooming
            function zoomed(event) {
                const { transform } = event;
                svg.selectAll("path").attr("transform", transform);
                svg.selectAll(".dot").attr("transform", transform).attr("r", 5 / transform.k);
                svg.selectAll(".place-label").attr("transform", transform);
            }

            const zoom = d3.zoom()
                .scaleExtent([1, 8])
                .on("zoom", zoomed);

            svg.call(zoom);

            // Function to zoom to a specific region
            function zoomToRegion(region) {
                let scale, translateX, translateY;

                switch (region) {
                    case "china":
                        scale = 800;
                        translateX = -width / 4;
                        translateY = -height / 10;
                        break;
                    case "europe":
                        scale = 400;
                        translateX = -width / 8;
                        translateY = -height / 5;
                        break;
                    case "northAmerica":
                        scale = 300;
                        translateX = width / 4;
                        translateY = -height / 8;
                        break;
                    default:
                        scale = 200;
                        translateX = 0;
                        translateY = height / 6;
                        break;
                }

                projection.scale(scale).translate([width / 2 + translateX, height / 2 + translateY]);

                svg.transition()
                    .duration(750)
                    .call(zoom.transform, d3.zoomIdentity.translate(width / 2, height / 2).scale(scale / 200));

                updateMap(d3.select("#year").property("value"));
            }

            d3.json("https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json")
                .then(data => {
                    svg.append("g")
                           .attr("transform", "translate(100, 50)")  // 设置地图整体位
                        .selectAll("path")
                        .data(topojson.feature(data, data.objects.countries).features)
                        .enter().append("path")
                        .attr("d", path)
                        .attr("fill", "#ddd")
                        .attr("stroke", "#fff")
                        .attr("stroke-width", 0.5);
                        
    

                    // Initial map drawing with the default year
                    updateMap(d3.select("#year").property("value"));

                    // Year slider event listener
                    const yearSlider = d3.select("#year");
                    yearSlider.on("input", function() {
                        const selectedYear = +this.value;
                        d3.select("#year-value").text(selectedYear);
                        updateMap(selectedYear);
                    });

                    // Region selector event listener
                    d3.select("#region").on("change", function() {
                        const selectedRegion = this.value;
                        zoomToRegion(selectedRegion);
                    });
                })
                .catch(error => {
                    console.error("Error loading the map data:", error);
                });

            // Create a unified legend
           
        })();