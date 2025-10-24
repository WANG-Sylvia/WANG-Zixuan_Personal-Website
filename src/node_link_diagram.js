 (function(){
 const nodes = [
        {id: "sm2716", name: "SM2716", type: "course"},
        {id: "sm1013", name: "SM1013", type: "course"},
        {id: "sm2276", name: "SM2276", type: "course"},
        {id: "sm1701", name: "SM1701", type: "course"},
        {id: "sm4704", name: "SM4704", type: "course"},
        {id: "sm3601", name: "SM3601", type: "course"},
        {id: "sm2105", name: "SM2105", type: "course"},
        {id: "sm2702", name: "SM2702", type: "course"},
        {id: "sm2715", name: "SM2715", type: "course"},
        {id: "cs1013", name: "CS1013", type: "course"},
        {id: "交互设计", name: "交互设计", type: "skill"},
        {id: "摄影", name: "摄影", type: "skill"},
        {id: "音乐设计", name: "音乐设计", type: "skill"},
        {id: "艺术基础", name: "艺术基础", type: "skill"},
        {id: "游戏设计", name: "游戏设计", type: "skill"},
        {id: "剧本", name: "剧本", type: "skill"},
        {id: "跨学科设计", name: "跨学科设计", type: "skill"},
        {id: "编程艺术", name: "编程艺术", type: "skill"},
        {id: "代码基础", name: "代码基础", type: "skill"}
    ];

    const links = [
        {source: "sm2716", target: "交互设计"},
        {source: "sm1013", target: "摄影"},
        {source: "sm2276", target: "音乐设计"},
        {source: "sm1701", target: "艺术基础"},
        {source: "sm4704", target: "游戏设计"},
        {source: "sm3601", target: "游戏设计"},
        {source: "sm2105", target: "剧本"},
        {source: "sm2702", target: "跨学科设计"},
        {source: "sm2715", target: "编程艺术"},
        {source: "cs1013", target: "代码基础"}
    ];

    // 图表的尺寸
    const width = 1200;
    const height = 800;

    // 创建 SVG 元素
    const svg = d3.select("#node-link-diagram")
        .append("svg")
        .attr("width", width)
        .attr("height", height);

    // 创建力模拟
    const simulation = d3.forceSimulation(nodes)
        .force("link", d3.forceLink(links).id(d => d.id).distance(200)) // 设置连接的距离
        .force("charge", d3.forceManyBody().strength(-500)) // 设置节点之间的排斥力
        .force("center", d3.forceCenter(width / 2, height / 2)); // 设置中心力，使图居中

    // 创建连接线
    const link = svg.append("g")
        .attr("class", "links")
        .selectAll("line")
        .data(links)
        .enter().append("line")
        .attr("class", "link")
        .style("stroke", "#999")
        .style("stroke-opacity", 0.6);

    // 创建节点
    const node = svg.append("g")
        .attr("class", "nodes")
        .selectAll(".node")
        .data(nodes)
        .enter().append("g")
        .attr("class", d => "node node--" + d.type) // 添加类型相关的 class
        .call(d3.drag()
            .on("start", dragstarted)
            .on("drag", dragged)
            .on("end", dragended));

    node.append("circle")
        .attr("r", 25); // 节点半径

    node.append("text")
        .attr("x", 30) // 文本偏移量
        .attr("y", 5) // 调整文本的垂直位置
        .style("font-size", "14px")
        .text(d => d.name);

    // 定义力模拟的更新函数
    simulation.on("tick", () => {
        link
            .attr("x1", d => d.source.x)
            .attr("y1", d => d.source.y)
            .attr("x2", d => d.target.x)
            .attr("y2", d => d.target.y);

        node
            .attr("transform", d => `translate(${d.x},${d.y})`);
    });

    // 拖动事件处理函数
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