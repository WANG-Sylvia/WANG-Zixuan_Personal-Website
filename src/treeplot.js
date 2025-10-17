(function () {
    const educationData = {
        name: "Education Overview",
        children: [
            {
                name: "Primary School",
                color: "#486477ff", // Blue
                children: [
                    {
                        name: "School Information",
                        children: [
                            { name: "Beijing No. 2 Primary Experimental School" },
                            { name: "Location: Beijing" }
                        ]
                    },
                    {
                        name: "Academic Information",
                        children: [
                            { name: "GPA:4" },
                            { name: "Chinese, Math, English" }
                        ]
                    },
                    {
                        name: "Hobby",
                        children: [
                            { name: "Dance" },
                            { name: "Skiing" },
                        ]
                    }
                ]
            },
            {
                name: "Middle School",
                color: "#ff7f0e", // Orange
                children: [
                    {
                        name: "School Information",
                        children: [
                            { name: "Beijing No. 4 High School" },
                            { name: "Location: Beijing" }
                        ]
                    },
                    {
                        name: "Academic Information",
                        children: [
                            { name: "GPA: 4" },
                            { name: "Subjects: 3+3" }
                        ]
                    },
                    {
                        name: "Hobby",
                        children: [
                            { name: "Dance" },
                            { name: "Skiing" },
                        ]
                    }
                ]
            },
            {
                name: "High School",
                color: "#2ca02c", // Green
                children: [
                    {
                        name: "School Information",
                        children: [
                            { name: "Beijing No. 4 High School" },
                            { name: "Location: Beijing" }
                        ]
                    },
                    {
                        name: "Academic Information",
                        children: [
                            { name: "GPA: 3.8" },
                            { name: "Subjects:  3+3" }
                        ]
                    },
                    {
                        name: "Skills",
                        children: [
                            { name: "Advanced Math" },
                            { name: "Scientific Reasoning" },
                            { name: "Communication Skills" }
                        ]
                    }
                ]
            },
            {
                name: "University",
                color: "#d62728", // Red
                children: [
                    {
                        name: "School Information",
                        children: [
                            { name: "City University of Hong Kong" },
                            { name: "Location:Hong Kong" }
                        ]
                    },
                    {
                        name: "Academic Information",
                        children: [
                            { name: "GPA: 3.2" },
                            { name: "Major:School of Creative Media" }
                        ]
                    },
                    {
                        name: "Skills",
                        children: [
                            { name: "Photography" },
                            { name: "Programming" },
                            { name: "Editing" }
                        ]
                    }
                ]
            }
        ]
    };

    // Set the dimensions and margins of the diagram
    const margin = { top: 10, right: 20, bottom: 30, left: 90 };
    const width = 800 - margin.left - margin.right;
    const height = 400 - margin.top - margin.bottom;

    // append the svg object to the body of the page
    // appends a 'group' element to 'svg'
    // moves the left margin and the top margin
    const svg = d3.select("#vis-treeplot").append("svg")
        .attr("width", width + margin.right + margin.left)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate("
            + margin.left + "," + margin.top + ")");

    // declares a tree layout and assigns the size
    const treemap = d3.tree().size([height, width]);

    // Assigns parent, children, height, depth
    let root = d3.hierarchy(educationData, function (d) { return d.children; });
    root.x0 = height / 2;
    root.y0 = 0;

    // Collapse after the second level
    // root.children.forEach(collapse);  //Commented out to display all nodes

    update(root);

    // Collapse the node and all it's children
    function collapse(d) {
        if (d.children) {
            d._children = d.children
            d._children.forEach(collapse)
            d.children = null
        }
    }

    container.append("h1")
       
        
        .style("font-weight", "bold")
        
      
    function update(source) {

        // Assigns the x and y position for the nodes
        const treeData = treemap(root);

        // Compute the new nodes positions.
        const nodes = treeData.descendants();

        // Normalize for fixed-depth.
        nodes.forEach(function (d) { d.y = d.depth * 220 }); // Increased spacing

        // ****************** Nodes section ***************************

        // Update the nodes...
        const node = svg.selectAll('g.node')
            .data(nodes, function (d) { return d.id || (d.id = d.data.name); });

        // Enter any new modes at the parent's previous position.
        const nodeEnter = node.enter().append('g')
            .attr('class', 'node')
            .attr("transform", function (d) {
                return "translate(" + source.y0 + "," + source.x0 + ")";
            })
            .on('click', click);

        // Add Circle for the nodes
        nodeEnter.append('circle')
            .attr('class', 'node')
            .attr('r', 5) // Reduced radius
            .style("fill", function (d) {
                return d._children ? "lightsteelblue" : "#fff";
            })
            .style("stroke", function (d) {
                // Assign color based on the parent's color if it's a level 1 node
                return d.depth === 1 && d.data.color ? d.data.color : "steelblue";
            })
            .attr('cursor', 'pointer');

        // Add labels for the nodes
        nodeEnter.append('text')
            .attr("dy", ".35em")
            .attr("x", function (d) {
                return d.children || d._children ? -10 : 10; // Reduced offset
            })
            .attr("text-anchor", function (d) {
                return d.children || d._children ? "end" : "start";
            })
            .text(function (d) { return d.data.name; });

        // UPDATE
        const nodeUpdate = nodeEnter.merge(node);

        // Transition to the proper position for the node
        nodeUpdate.transition()
            .duration(750)
            .attr("transform", function (d) {
                return "translate(" + d.y + "," + d.x + ")";
            });

        // Update the node attributes and style
        nodeUpdate.select('circle.node')
            .attr('r', 4.5)
            .style("fill", function (d) {
                return d._children ? "lightsteelblue" : "#fff";
            })
            .style("stroke", function (d) {
                return d.depth === 1 && d.data.color ? d.data.color : "steelblue";
            })
            .attr('cursor', 'pointer');


        // Remove any exiting nodes
        const nodeExit = node.exit().transition()
            .duration(750)
            .attr("transform", function (d) {
                return "translate(" + source.y + "," + source.x + ")";
            })
            .remove();

        // On exit reduce the node circles size to 0
        nodeExit.select('circle')
            .attr('r', 1e-6);

        // On exit reduce the opacity of text labels
        nodeExit.select('text')
            .style('fill-opacity', 1e-6);

        // ****************** Links section ***************************

        // Update the links...
        const link = svg.selectAll('path.link')
            .data(treeData.links(), function (d) { return d.target.id; });

        // Enter any new links at the parent's previous position.
        const linkEnter = link.enter().append('path')
            .attr('class', 'link')
            .attr('d', d3.linkHorizontal()
                .source(function (d) { return [d.source.y, d.source.x]; })
                .target(function (d) { return [d.target.y, d.target.x]; })
            )
            .style("stroke", function (d) {
                // Assign color to the link based on the source node's color
                return d.source.depth === 0 ? "#ccc" : (d.source.data.color ? d.source.data.color : "#ccc");
            });

        // UPDATE
        const linkUpdate = linkEnter.merge(link);

        // Transition back to the parent element position
        linkUpdate.transition()
            .duration(750)
            .attr('d', d3.linkHorizontal()
                .source(function (d) { return [d.source.y, d.source.x]; })
                .target(function (d) { return [d.target.y, d.target.x]; })
            )
            .style("stroke", function (d) {
                return d.source.depth === 0 ? "#ccc" : (d.source.data.color ? d.source.data.color : "#ccc");
            });

        // Remove any exiting links
        const linkExit = link.exit().transition()
            .duration(750)
            .attr('d', d3.linkHorizontal()
                .source(function (d) { return [source.y, source.x]; })
                .target(function (d) { return [source.y, source.x]; })
            )
            .remove();

        // Store the old positions for transition.
        nodes.forEach(function (d) {
            d.x0 = d.x;
            d.y0 = d.y;
        });

        // Add zoom functionality
        const zoom = d3.zoom()
            .scaleExtent([0.1, 3])
            .on('zoom', zoomed);

        svg.call(zoom);

        function zoomed(event) {
            svg.attr('transform', event.transform);
        }

        // Toggle children on click.
        function click(event, d) {
            if (d.children) {
                d._children = d.children;
                d.children = null;
            } else {
                d.children = d._children;
                d._children = null;
            }
            update(d);
        }
    }

    // Create Legend
    const legendData = educationData.children.map(d => ({ name: d.name, color: d.color }));
    const legendSvg = d3.select("#legend")
        .attr("width", 150)
        .attr("height", legendData.length * 18);

    const legend = legendSvg.selectAll(".legend")
        .data(legendData)
        .enter().append("g")
        .attr("class", "legend")
        .attr("transform", (d, i) => "translate(0," + i * 18 + ")");

    legend.append("rect")
        .attr("x", 0)
        .attr("width", 12)
        .attr("height", 12)
        .style("fill", d => d.color);

    legend.append("text")
        .attr("x", 15)
        .attr("y", 6)
        .attr("dy", ".35em")
        .style("text-anchor", "start")
        .text(d => d.name);
})();