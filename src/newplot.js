(function(){
document.addEventListener('DOMContentLoaded', function() {
    // 调用函数来生成图表
    createArtworkPieChartInSection('vis-newplot');
});

/**
 * 在指定的DOM元素内创建艺术品分布饼图，并将图例放在图表右侧
 * @param {string} containerId - 要插入图表的元素的ID
 */
function createArtworkPieChartInSection(containerId) {
    // --- 1. 数据定义 ---
    const data = [
        { name: "Photography", value: 40 },
        { name: "Curated Projects", value: 20 },
        { name: "Interactive Visual Works", value: 20 },
        { name: "Screenwriting", value: 10 },
        { name: "Painting", value: 5 },
        { name: "Game Design", value: 5 }
    ];

    // --- 2. 尺寸设置 (已调整) ---
    const chartWidth = 450; // 减小图表宽度，为图例腾出空间
    const chartHeight = 400;
    const radius = Math.min(chartWidth, chartHeight) / 2;

    // --- 3. 选择容器并清空内容 ---
    const container = d3.select(`#${containerId}`);
    container.html(""); // 清空容器

    // --- 4. 添加标题和描述 (保持不变) ---
    container.append("h1")
        .style("text-align", "center")
        .style("font-size", "3em")
        .style("font-weight", "bold")
        .style("margin-bottom", "0.2em")
        .text("Artwork Distribution");

    container.append("h2")
        .style("text-align", "center")
        .style("font-size", "1em")
        .style("margin-bottom", "1em")
        .style("font-weight", "normal")
        .text("This pie chart illustrates the distribution of my creative works across different categories.");

    // --- NEW: 创建一个Flexbox主容器来包裹图表和图例 ---
    const mainContent = container.append("div")
        .style("display", "flex")
        .style("justify-content", "center") // 水平居中对齐
        .style("align-items", "center")     // 垂直居中对齐
        .style("gap", "30px");              // 图表和图例之间的间距

    // --- 5. 创建SVG元素 (已修改) ---
    // 将SVG添加到mainContent中，而不是直接添加到container
    const svg = mainContent.append("svg")
        .attr("width", chartWidth)
        .attr("height", chartHeight)
        .attr("class", "chart-svg")
        .append("g")
        // SVG的中心点需要调整，因为它现在在mainContent中
        .attr("transform", `translate(${chartWidth / 2}, ${chartHeight / 2})`);

    // --- 6. 创建颜色比例尺 (保持不变) ---
    const color = d3.scaleOrdinal()
        .domain(data.map(d => d.name))
        .range(["#3498db", "#9b59b6", "#e74c3c", "#2ecc71", "#f39c12", "#1abc9c"]);

    // --- 7. 创建饼图布局 (保持不变) ---
    const pie = d3.pie()
        .value(d => d.value);

    // --- 8. 创建弧生成器 (保持不变) ---
    const arc = d3.arc()
        .innerRadius(0)
        .outerRadius(radius);

    const labelArc = d3.arc()
        .innerRadius(radius * 0.65)
        .outerRadius(radius * 0.65);

    // --- 9. 绘制扇形 (保持不变) ---
    const arcs = svg.selectAll(".arc")
        .data(pie(data))
        .enter()
        .append("g")
        .attr("class", "arc");

    arcs.append("path")
        .attr("d", arc)
        .attr("fill", d => color(d.data.name))
        .attr("stroke", "white")
        .style("stroke-width", "2px")
        .style("opacity", 0.85);

    arcs.append("text")
        .attr("transform", d => `translate(${labelArc.centroid(d)})`)
        .attr("dy", ".35em")
        .style("text-anchor", "middle")
        .style("font-size", "14px")
        .style("font-weight", "bold")
        .style("fill", "#fff")
        .text(d => `${d.data.value}%`);

    // --- 10. 动态创建并添加图例 (已修改) ---
    // 将图例添加到mainContent中，而不是直接添加到container
    const legend = mainContent.append("div")
        .attr("class", "legend")
        .style("display", "flex")
        .style("flex-direction", "column")
        .style("align-items", "flex-start")
        // 移除了margin-top，因为Flexbox的gap属性会处理间距
        .style("font-size", "14px"); // 可以稍微调整一下字体大小

    const legendItems = legend.selectAll(".legend-item")
        .data(data)
        .enter()
        .append("div")
        .attr("class", "legend-item")
        .style("margin-bottom", "10px"); // 在图例项之间添加垂直间距

    legendItems.append("div")
        .attr("class", "legend-color")
        .style("width", "15px") // 稍微增大颜色块
        .style("height", "15px")
        .style("margin-right", "10px")
        .style("display", "inline-block")
        .style("background-color", d => color(d.name));

    legendItems.append("span")
        .attr("class", "legend-text")
        .text(d => `${d.name} (${d.value}%)`);
}
})();