(function() {
    // 数据定义
    const courses = ["sm4704", "sm1013", "sm3601", "sm2314", "sm3320", "sm3749"];
    const data = [
        [0, 1, 2, 3, 4, 5],
        [1, 0, 1, 2, 3, 4],
        [2, 1, 0, 1, 2, 3],
        [3, 2, 1, 0, 1, 2],
        [4, 3, 2, 1, 0, 1],
        [5, 4, 3, 2, 1, 0]
    ];

    // 选择容器
    const section = d3.select("#adjacency");
    const table = section.select(".matrix");

    // 创建表头
    const thead = table.append("thead");
    const headerRow = thead.append("tr");

    headerRow.append("th").text(""); // 左上角空单元格

    courses.forEach(course => {
        headerRow.append("th").text(course);
    });

    // 创建表格主体
    const tbody = table.append("tbody");

    // 遍历数据，创建行和单元格
    data.forEach((row, i) => {
        const tr = tbody.append("tr");
        tr.append("th").text(courses[i]); // 行标题

        row.forEach((value, j) => {
            const td = tr.append("td").text(value);

            // 添加鼠标悬停效果
            td.on("mouseover", function() {
                d3.select(this).classed("highlighted", true);
                thead.selectAll("th").filter((d, k) => k === j + 1).classed("highlighted", true);
                tbody.selectAll("th").filter((d, k) => k === i).classed("highlighted", true);
            })
            .on("mouseout", function() {
                d3.select(this).classed("highlighted", false);
                thead.selectAll("th").classed("highlighted", false);
                tbody.selectAll("th").classed("highlighted", false);
            });
        });
    });
})();