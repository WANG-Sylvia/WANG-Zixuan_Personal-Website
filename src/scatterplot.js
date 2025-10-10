 const data = [
            { year: 2021, type: "Painting", count: 10 },
            { year: 2021, type: "Sculpture", count: 3 },
            { year: 2021, type: "Photography", count: 5 },
            { year: 2022, type: "Photography", count: 7 },
            { year: 2022, type: "Digital Art", count: 4 },
            { year: 2022, type: "Painting", count: 6 },
            { year: 2023, type: "Painting", count: 7 },
            { year: 2023, type: "Digital Art", count: 6 },
            { year: 2023, type: "Sculpture", count: 2 },
            { year: 2023, type: "Photography", count: 4 },
            { year: 2024, type: "Painting", count: 8 },
            { year: 2024, type: "Photography", count: 5 },
            { year: 2024, type: "Sculpture", count: 3 },
            { year: 2024, type: "Digital Art", count: 7 }
        ];

        // Dimensions and margins
        const margin = { top: 60, right: 80, bottom: 80, left: 80 };
        const width = 800 - margin.left - margin.right;
        const height = 600 - margin.top - margin.bottom;

        // Create SVG element
        const svg = d3.select("#vis-scatterplot")
            .append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform", `translate(${margin.left},${margin.top})`);

        // Scales
        const minYear = d3.min(data, d => d.year);
        const maxYear = d3.max(data, d => d.year);

        const x = d3.scaleLinear()
            .domain([minYear - 1, maxYear + 1]) // Pad the domain
            .range([0, width]);

        const y = d3.scaleBand()
            .domain([...new Set(data.map(d => d.type))])
            .range([0, height])
            .padding(1);

        const z = d3.scaleLinear()
            .domain([0, d3.max(data, d => d.count)])
            .range([4, 20]);

        // Color scale
        const types = [...new Set(data.map(d => d.type))];
        const color = d3.scaleOrdinal()
            .domain(types)
            .range(d3.schemeCategory10);

        // Add X axis
        svg.append("g")
            .attr("transform", `translate(0,${height})`)
            .call(d3.axisBottom(x).ticks(5).tickFormat(d3.format("d")))
            .selectAll("text")
            .style("text-anchor", "middle");

        // Add Y axis
        svg.append("g")
            .call(d3.axisLeft(y));

        // Tooltip
        const tooltip = d3.select("body").append("div")
            .attr("class", "tooltip")
            .style("opacity", 0);

        // Create the circles
        svg.selectAll("circle")
            .data(data)
            .enter()
            .append("circle")
            .attr("cx", d => x(d.year))
            .attr("cy", d => y(d.type) + y.bandwidth() / 2)
            .attr("r", d => z(d.count))
            .style("fill", d => color(d.type))
            .style("opacity", 0.7)
            .on("mouseover", function(event, d) {
                tooltip.transition()
                    .duration(200)
                    .style("opacity", .9);
                tooltip.html(`Year: ${d.year}<br>Type: ${d.type}<br>Count: ${d.count}`)
                    .style("left", (event.pageX) + "px")
                    .style("top", (event.pageY - 28) + "px");
            })
            .on("mouseout", function(event, d) {
                tooltip.transition()
                    .duration(500)
                    .style("opacity", 0);
            });

        // X axis label
        svg.append("text")
            .attr("x", width / 2)
            .attr("y", height + margin.bottom - 10)
            .style("text-anchor", "middle")
            .text("Year");

        // Y axis label
        svg.append("text")
            .attr("transform", "rotate(-90)")
            .attr("y", 0 - margin.left + 10)
            .attr("x", 0 - (height / 2))
            .attr("dy", "1em")
            .style("text-anchor", "middle")
            .text("Type of Work");