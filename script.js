// 页面加载完成后执行
document.addEventListener('DOMContentLoaded', function() {
    // 获取DOM元素
    const navLinks = document.querySelectorAll('.nav-links a');
    const mobileMenu = document.getElementById('mobile-menu');
    const navMenu = document.querySelector('.nav-links');
    const navbar = document.querySelector('.navbar');
    const cvNavLink = document.getElementById('cv-nav-link');
    const cvButton = document.getElementById('cv-button');
    const backButton = document.getElementById('back-button');
    const mainContent = document.getElementById('main-content');
    const cvContainer = document.getElementById('cv-container');
    const aboutLink = document.getElementById('about-link');
    const journeySection = document.getElementById('journey-section');
    const blogLink = document.getElementById('blog-link');
    const contactSection = document.getElementById('contact-section');
    const designLink = document.getElementById('design-link');
    
    // 新增：Project页面相关元素
    const projectNavLink = document.getElementById('project-nav-link');
    const projectButton = document.getElementById('project-button');
    const projectContainer = document.getElementById('project-container');
    const projectBackButton = document.getElementById('project-back-button');
    
    // 新增：海报页面相关元素
    const campaign1Link = document.getElementById('campaign1-link');
    const posterContainer = document.getElementById('poster-container');
    const posterBackButton = document.getElementById('poster-back-button');
    
    // 新增：Work Experience页面相关元素
    const workContainer = document.getElementById('work-container');
    const workBackButton = document.getElementById('work-back-button');
    
    // 新增：Photos页面相关元素
    const photosLink = document.getElementById('photos-link');
    const photosContainer = document.getElementById('photos-container');
    const photosBackButton = document.getElementById('photos-back-button');
    
    // 显示CV页面
    function showCV() {
        mainContent.style.display = 'none';
        cvContainer.style.display = 'block';
        projectContainer.style.display = 'none';
        posterContainer.style.display = 'none';
        workContainer.style.display = 'none';
        photosContainer.style.display = 'none';
        window.scrollTo(0, 0);
        
        // 移动端菜单关闭
        if (navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
            mobileMenu.classList.remove('active');
        }
    }
    
    // 显示主页
    function showHome() {
        cvContainer.style.display = 'none';
        projectContainer.style.display = 'none';
        posterContainer.style.display = 'none';
        workContainer.style.display = 'none';
        photosContainer.style.display = 'none';
        mainContent.style.display = 'flex';
        window.scrollTo(0, 0);
    }
    
    // 显示Project页面
    function showProject() {
        mainContent.style.display = 'none';
        cvContainer.style.display = 'none';
        projectContainer.style.display = 'block';
        posterContainer.style.display = 'none';
        workContainer.style.display = 'none';
        photosContainer.style.display = 'none';
        window.scrollTo(0, 0);
        
        // 移动端菜单关闭
        if (navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
            mobileMenu.classList.remove('active');
        }
    }
    
    // 新增：显示海报页面
    function showPoster() {
        mainContent.style.display = 'none';
        cvContainer.style.display = 'none';
        projectContainer.style.display = 'none';
        posterContainer.style.display = 'block';
        workContainer.style.display = 'none';
        photosContainer.style.display = 'none';
        window.scrollTo(0, 0);
        
        // 移动端菜单关闭
        if (navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
            mobileMenu.classList.remove('active');
        }
    }

// 修改海报加载功能
function loadPosters() {
    const posterGrid = document.getElementById('poster-grid');
    
    // 海报文件名数组 - 根据你实际的海报文件修改
    const posterFiles = [
        '1.jpg', '2.jpg', '3.jpg', '4.png',
        '5.jpg', '6.png', '7.jpg', '8.jpg',
        '9.jpg', 
    ];
    
    // 清空现有内容
    posterGrid.innerHTML = '';
    
    // 动态创建海报元素
    posterFiles.forEach((filename, index) => {
        const posterItem = document.createElement('div');
        posterItem.className = 'poster-item';
        
        posterItem.innerHTML = `
            <div class="poster-image">
                <img src="${filename}" alt="Poster ${index + 1}" loading="lazy" onerror="this.style.display='none'">
            </div>
        `;
        
        posterGrid.appendChild(posterItem);
    });
    
    // 添加灯箱功能
    setTimeout(addPosterLightbox, 100);
}

// 在 showPoster 函数中调用 loadPosters
function showPoster() {
    mainContent.style.display = 'none';
    cvContainer.style.display = 'none';
    projectContainer.style.display = 'none';
    posterContainer.style.display = 'block';
    workContainer.style.display = 'none';
    photosContainer.style.display = 'none';
    window.scrollTo(0, 0);
    
    // 加载海报
    loadPosters();
    
    // 移动端菜单关闭
    if (navMenu.classList.contains('active')) {
        navMenu.classList.remove('active');
        mobileMenu.classList.remove('active');
    }
}


    
    // 新增：显示Work Experience页面
    function showWork() {
        mainContent.style.display = 'none';
        cvContainer.style.display = 'none';
        projectContainer.style.display = 'none';
        posterContainer.style.display = 'none';
        workContainer.style.display = 'block';
        photosContainer.style.display = 'none';
        window.scrollTo(0, 0);
        
        // 移动端菜单关闭
        if (navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
            mobileMenu.classList.remove('active');
        }
    }
    
    // 新增：显示Photos页面
    function showPhotos() {
        mainContent.style.display = 'none';
        cvContainer.style.display = 'none';
        projectContainer.style.display = 'none';
        posterContainer.style.display = 'none';
        workContainer.style.display = 'none';
        photosContainer.style.display = 'block';
        window.scrollTo(0, 0);
        
        // 移动端菜单关闭
        if (navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
            mobileMenu.classList.remove('active');
        }
    }
    
    // 滑动到成长经历区域
    function scrollToJourney() {
        journeySection.scrollIntoView({ behavior: 'smooth' });
        
        // 移动端菜单关闭
        if (navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
            mobileMenu.classList.remove('active');
        }
    }
    
    // 滑动到Contact Me区域
    function scrollToContact() {
        contactSection.scrollIntoView({ behavior: 'smooth' });
        
        // 移动端菜单关闭
        if (navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
            mobileMenu.classList.remove('active');
        }
    }
    
    // CV链接点击事件
    cvNavLink.addEventListener('click', showCV);
    cvButton.addEventListener('click', showCV);
    backButton.addEventListener('click', showHome);
    aboutLink.addEventListener('click', function(e) {
        e.preventDefault();
        scrollToJourney();
    });
    
    // Blog链接点击事件 - 跳转到Contact Me区域
    blogLink.addEventListener('click', function(e) {
        e.preventDefault();
        scrollToContact();
    });
    
    // Design链接点击事件 - 跳转到Work Experience页面
    designLink.addEventListener('click', function(e) {
        e.preventDefault();
        showWork();
    });
    
    // Project链接点击事件
    projectNavLink.addEventListener('click', showProject);
    projectButton.addEventListener('click', showProject);
    projectBackButton.addEventListener('click', showHome);


// 修改照片加载功能
function loadPhotos() {
    const photosGrid = document.getElementById('photos-grid');
    
    // 照片文件名数组 - 根据你实际的照片文件修改
    const photoFiles = [
        'a.jpg', 'b.jpg', 'c.jpg', 'd.jpg',
        'e.jpg', 'f.jpg', 'g.jpg', 'h.jpg',
        'i.jpg', 'j.jpg', 'k.jpg', 'l.jpg',
        'm.jpg', 'n.jpg', 'o.jpg', 'q.jpg',
        'r.jpg', 's.jpg', 't.jpg', 'u.jpeg',
        'v.jpeg', 'w.jpeg', 'x.jpeg', 'y.jpeg',
        'z.jpeg', 'a1.jpeg', 'b1.jpeg', 'c1.jpeg',
        'd1.jpeg', 'e1.jpeg', 'f1.jpeg', 'g1.jpeg',
        'h1.jpeg', 'i1.jpeg', 'j1.jpeg', 'k1.jpeg',
        'l1.jpeg', 'm1.jpeg', 'n1.jpeg', 'o1.jpg',
        'p1.jpg', 'q1.jpg', 'r1.jpg', 's1.jpg',
        's1.jpg', 't1.jpg', 'u1.jpg', 'v1.jpg',
    ];
    
    // 清空现有内容
    photosGrid.innerHTML = '';
    
    // 动态创建照片元素
    photoFiles.forEach((filename, index) => {
        const photoItem = document.createElement('div');
        photoItem.className = 'photo-item';
        
        photoItem.innerHTML = `
            <div class="photo-image">
                <img src="${filename}" alt="Photo ${index + 1}" loading="lazy" onerror="this.style.display='none'">
            </div>
        `;
        
        photosGrid.appendChild(photoItem);
    });
}

// 在 showPhotos 函数中调用 loadPhotos
function showPhotos() {
    mainContent.style.display = 'none';
    cvContainer.style.display = 'none';
    projectContainer.style.display = 'none';
    posterContainer.style.display = 'none';
    workContainer.style.display = 'none';
    photosContainer.style.display = 'block';
    window.scrollTo(0, 0);
    
    // 加载照片
    loadPhotos();
    
    // 移动端菜单关闭
    if (navMenu.classList.contains('active')) {
        navMenu.classList.remove('active');
        mobileMenu.classList.remove('active');
    }
}



    
    // 新增：海报链接点击事件
    campaign1Link.addEventListener('click', function(e) {
        e.preventDefault();
        showPoster();
    });
    posterBackButton.addEventListener('click', showProject);
    
    // 新增：Work Experience返回按钮点击事件
    workBackButton.addEventListener('click', showHome);
    
    // 新增：Photos链接点击事件
    photosLink.addEventListener('click', function(e) {
        e.preventDefault();
        showPhotos();
    });
    photosBackButton.addEventListener('click', showProject);
    
    // 平滑滚动功能
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // 如果是CV或Project链接，不执行平滑滚动
            if (this === cvNavLink || this === aboutLink || this === projectNavLink || this === blogLink || this === designLink) {
                return;
            }
            
            e.preventDefault();
            
            // 移动端菜单关闭
            if (navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                mobileMenu.classList.remove('active');
            }
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                window.scrollTo({
                    top: targetSection.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // 移动端菜单切换
    mobileMenu.addEventListener('click', function() {
        navMenu.classList.toggle('active');
        mobileMenu.classList.toggle('active');
    });
    
    // 导航栏滚动效果
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.style.backgroundColor = 'rgba(255, 255, 255, 0.98)';
        } else {
            navbar.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
        }
    });
    
    // 点击页面任意位置关闭移动端菜单
    document.addEventListener('click', function(e) {
        if (!e.target.closest('.nav-container') && navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
            mobileMenu.classList.remove('active');
        }
    });
    
    // 初始显示主页
    showHome();
    
    // 使用D3.js创建树状图
    createTreeChart();
    
    // 使用D3.js创建点密度地图
    createDotDensityMap();
});

// 创建树状图
function createTreeChart() {
    // 定义树状图数据
    const treeData = {
        name: "My Life Journey",
        date: "2020 - now",
        description: "From High School to the Present: My Growth Journey",
        children: [
            {
                name: "High School Stage",
                date: "2020 - 2023",
                description: "I completed my high school education at Beijing No.4 High School. During my studies, I served as Minister of the Propaganda Department of the Student Union, organizing multiple campus cultural activities. Additionally, I held the position of Head of the School Dance Troupe and won numerous dance awards.",
                children: [
                    {
                        name: "Dance Club",
                        date: "2020 - 2023",
                        description: "As Head of the Dance Troupe, I assisted the instructor in coordinating the development and implementation of daily training plans. Leading the team to participate in various competitions, we won multiple municipal and national-level awards. Additionally, I took full responsibility for the troupe’s event planning and promotion, successfully organizing numerous large-scale performances and inter-school exchange activities, which effectively enhanced the troupe’s influence on campus and recognition in the industry."
                    },
                    {
                        name: "Academic Achievements",
                        date: "2020 - 2023",
                        description: "During my high school years, I consistently maintained excellent academic performance, with particular strengths in the liberal arts. Leveraging a solid knowledge foundation and flexible critical thinking skills, I achieved outstanding results in various liberal arts competitions, winning multiple municipal and district-level academic awards."
                    }
                ]
            },
            {
                name: "University",
                date: "2023 - 2027",
                description: "I am pursuing a Bachelor of Arts in Creative Media with a minor in Finance at City University of Hong Kong, aiming to integrate creative expression with financial acumen to broaden the commercial perspective and practical scope of my creations.",
                children: [
                    {
                        name: "Study",
                        date: "2023 - 2027",
                        description: "I am majoring in Creative Media, systematically studying core modules such as contemporary art curatorship, video narrative & filmmaking, sound design, game prototype development, and cross-border project planning, with a focus on transforming multi-media language into creative expression. Meanwhile, I am minoring in Finance, delving into financial markets."
                    },
                    {
                        name: "Campus Activities",
                        date: "2023 - 2027",
                        description: "I actively participated in multiple creative and academic student organizations and club activities on campus, serving as a key event planner and organizer. I led the full-cycle implementation of activities such as thematic exhibitions, cross-border creative workshops, and campus cultural festivals, honing skills in coordination, resource integration, and cross-departmental communication through teamwork."
                    }
                ]
            },
            {
                name: "Internship",
                date: "2023 - 2026",
                description: "I worked as a Theatre Assistant at the National Centre for the Performing Arts (NCPA), deeply participating in the pre-planning, process coordination, and on-site execution of performance projects. I assisted in coordinating artist scheduling, audience flow management, and material arrangement, ensuring the smooth implementation of multiple concerts and theatrical performances. Later, I served as a Marketing Intern at Vcube Scenting (Singapore), leading content planning, visual editing, and community operations for the Xiaohongshu (Little Red Book) account. By creating fragrance lifestyle content aligned with the brand tone, I effectively increased account exposure and fan engagement, gaining cross-industry project execution and new media marketing experience.",
                children: [
                    {
                        name: "Banga Gallery",
                        date: "2022",
                        description: "During my internship at the exhibition hall, I deeply engaged in the preparation for docent training. Leveraging my expertise in Creative Media, I led the development of docent training materials—integrating multimedia content interpretation, interactive explanation skills, and other elements—and designed simulated guided tour scenarios for practical drills, helping new docents quickly grasp the cultural connotations of exhibits and communication logic. Meanwhile, I fully assisted in the planning and implementation of the new exhibition: from the preliminary exhibit selection and exhibition flow design, to the mid-term layout of graphic display boards and debugging of interactive installations, and then to on-site coordination and promotion support after the opening. By integrating visual design thinking into exhibition details, I effectively enhanced the audience's visiting experience and docent service quality, ensuring the smooth opening of the new exhibition with positive public praise."
                    },
                    {
                        name: "Vcube Scenting",
                        date: "2024",
                        description: "I was responsible for the company's marketing promotion work, focusing on creating and independently operating the brand's Xiaohongshu (Little Red Book) account. I wrote more than 20 high-quality promotional articles based on the brand tone, and shot over 500 videos and photos focusing on product features and usage scenarios. Through precise content positioning and visual presentation, I helped the brand increase its attention among young customer groups."
                    }
                ]
            },
            {
                name: "Career",
                date: "To be continue",
                description: "I may work in industries such as curatorship, video shooting, and game design in the future.",
                children: [
                    {
                        name: "Future Work",
                        date: "To be continue",
                        description: "Based on the knowledge and practical experience gained from my Creative Media major, I aim to deepen my roots in the creative industry in the future. My core career focuses include exhibition curation, game design, film and various types of video shooting, as well as professional photography, striving to transform my multi-media creative capabilities into concrete practical value."
                    },
                    {
                        name: "Future Study",
                        date: "To be continue",
                        description: "To better support this career goal, I plan to pursue a postgraduate program to further deepen my professional knowledge in the art field, consolidate the theoretical foundation for my creative practice, and strive to transform my multi-media creative capabilities into concrete practical value."
                    }
                ]
            }
        ]
    };
    

    // 设置树状图尺寸
    const margin = { top: 20, right: 120, bottom: 20, left: 120 };
    const width = document.getElementById('tree-container').offsetWidth - margin.right - margin.left;
    const height = document.getElementById('tree-container').offsetHeight - margin.top - margin.bottom;
    
    // 创建树布局
    const treemap = d3.tree().size([height, width]);
    
    // 创建层级数据
    const root = d3.hierarchy(treeData);
    root.x0 = height / 2;
    root.y0 = 0;
    
    // 计算初始布局
    treemap(root);
    
    // 创建SVG
    const svg = d3.select("#tree-container")
        .append("svg")
        .attr("width", width + margin.right + margin.left)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
    
    // 添加链接
    const link = svg.selectAll(".link")
        .data(root.descendants().slice(1))
        .enter()
        .append("path")
        .attr("class", "link")
        .attr("d", function(d) {
            return "M" + d.y + "," + d.x
                + "C" + (d.y + d.parent.y) / 2 + "," + d.x
                + " " + (d.y + d.parent.y) / 2 + "," + d.parent.x
                + " " + d.parent.y + "," + d.parent.x;
        });
    
    // 添加节点组
    const node = svg.selectAll(".node")
        .data(root.descendants())
        .enter()
        .append("g")
        .attr("class", "node")
        .attr("transform", function(d) { 
            return "translate(" + d.y + "," + d.x + ")"; 
        });
    
    // 添加节点圆圈
    node.append("circle")
        .attr("r", 8)
        .style("fill", function(d) {
            return d.depth === 0 ? "#2c3e50" : "#3498db";
        })
        .style("stroke", function(d) {
            return d.depth === 0 ? "#2c3e50" : "#2980b9";
        });
    
    // 添加节点文本
    node.append("text")
        .attr("dy", ".35em")
        .attr("x", function(d) { 
            return d.children ? -13 : 13; 
        })
        .style("text-anchor", function(d) { 
            return d.children ? "end" : "start"; 
        })
        .text(function(d) { 
            return d.data.name; 
        });
    
    // 节点点击事件
    node.on("click", function(event, d) {
        // 更新节点详情
        document.getElementById("node-title").textContent = d.data.name;
        document.getElementById("node-date").textContent = d.data.date;
        document.getElementById("node-description").textContent = d.data.description;
        
        // 显示节点详情
        const nodeDetails = document.getElementById("node-details");
        nodeDetails.classList.add("active");
        
        // 添加淡入效果
        nodeDetails.style.opacity = 0;
        let opacity = 0;
        const fadeIn = setInterval(function() {
            if (opacity >= 1) {
                clearInterval(fadeIn);
            }
            nodeDetails.style.opacity = opacity;
            opacity += 0.05;
        }, 30);
    });
}

// 创建点密度地图
function createDotDensityMap() {
    // 定义地点数据，包含年份信息
    const locations = [
        { name: "北京", type: "家", lat: 39.9042, lon: 116.4074, year: 2004 },
        { name: "台湾", type: "旅游", lat: 23.6978, lon: 120.9605, year: 2010 },
        { name: "日本", type: "旅游", lat: 36.2048, lon: 138.2529, year: 2012 },
        { name: "斯里兰卡", type: "旅游", lat: 7.8731, lon: 80.7718, year: 2014 },
        { name: "德国", type: "旅游", lat: 51.1657, lon: 10.4515, year: 2015 },
        { name: "美国", type: "旅游", lat: 37.0902, lon: -95.7129, year: 2016 },
        { name: "加拿大", type: "旅游", lat: 56.1304, lon: -106.3468, year: 2017 },
        { name: "香港", type: "大学", lat: 22.3193, lon: 114.1694, year: 2018 },
        { name: "新加坡", type: "实习", lat: 1.3521, lon: 103.8198, year: 2024 },
        { name: "苏黎世", type: "交流", lat: 47.3769, lon: 8.5417, year: 2025 }
    ];
    
    // 定义类型颜色映射
    const typeColors = {
        "家": "#e74c3c",      // 红色
        "大学": "#3498db",    // 蓝色
        "实习": "#2ecc71",    // 绿色
        "交流": "#f39c12",    // 橙色
        "旅游": "#9b59b6"     // 紫色
    };
    
    // 设置地图尺寸
    const width = document.getElementById('map-container').offsetWidth;
    const height = document.getElementById('map-container').offsetHeight;
    
    // 创建SVG
    const svg = d3.select("#map-container")
        .append("svg")
        .attr("width", width)
        .attr("height", height);
    
    // 创建投影
    const projection = d3.geoNaturalEarth1()
        .scale(width / 6.5)
        .translate([width / 2, height / 2]);
    
    // 创建路径生成器
    const path = d3.geoPath().projection(projection);
    
    // 加载世界地图数据
    d3.json("https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json").then(function(world) {
        // 绘制世界地图
        svg.append("g")
            .selectAll("path")
            .data(topojson.feature(world, world.objects.countries).features)
            .enter()
            .append("path")
            .attr("d", path)
            .attr("fill", "#b8d8e6")
            .attr("stroke", "#7fa7c0")
            .attr("stroke-width", 0.5);
        
        // 添加地点点
        const dots = svg.selectAll("circle")
            .data(locations)
            .enter()
            .append("circle")
            .attr("cx", d => projection([d.lon, d.lat])[0])
            .attr("cy", d => projection([d.lon, d.lat])[1])
            .attr("r", 6)
            .attr("fill", d => typeColors[d.type])
            .attr("stroke", "#fff")
            .attr("stroke-width", 1.5)
            .attr("class", "location-dot")
            .attr("opacity", 0) // 初始透明度为0
            .on("mouseover", function(event, d) {
                // 显示工具提示
                const tooltip = d3.select("body")
                    .append("div")
                    .attr("class", "map-tooltip")
                    .style("position", "absolute")
                    .style("background", "rgba(0,0,0,0.8)")
                    .style("color", "white")
                    .style("padding", "8px 12px")
                    .style("border-radius", "4px")
                    .style("font-size", "14px")
                    .style("pointer-events", "none")
                    .style("z-index", "1000")
                    .html(`<strong>${d.name}</strong><br>${d.type}<br>${d.year}Year`);
                
                // 更新工具提示位置
                tooltip
                    .style("left", (event.pageX + 10) + "px")
                    .style("top", (event.pageY - 28) + "px");
                
                // 放大点
                d3.select(this)
                    .transition()
                    .duration(200)
                    .attr("r", 8);
            })
            .on("mouseout", function() {
                // 移除工具提示
                d3.selectAll(".map-tooltip").remove();
                
                // 恢复点大小
                d3.select(this)
                    .transition()
                    .duration(200)
                    .attr("r", 6);
            });
        
        // 创建图例
        const legend = d3.select("#map-legend");
        
        Object.keys(typeColors).forEach(type => {
            const legendItem = legend.append("div")
                .attr("class", "legend-item");
            
            legendItem.append("div")
                .attr("class", "legend-color")
                .style("background-color", typeColors[type]);
            
            legendItem.append("div")
                .attr("class", "legend-text")
                .text(type);
        });
        
        // 时间滑块功能
        const timelineSlider = document.getElementById('timeline-slider');
        const currentYearDisplay = document.getElementById('current-year');
        
        // 初始化年份显示
        currentYearDisplay.textContent = timelineSlider.value;
        
        // 根据年份更新点的显示
        function updateMapByYear(year) {
            dots.transition()
                .duration(500)
                .attr("opacity", d => d.year <= year ? 1 : 0);
        }
        
        // 初始更新
        updateMapByYear(parseInt(timelineSlider.value));
        
        // 滑块事件监听
        timelineSlider.addEventListener('input', function() {
            const year = parseInt(this.value);
            currentYearDisplay.textContent = year;
            updateMapByYear(year);
        });
        
        // 添加自动播放功能
        let autoPlayInterval;
        const playButton = document.createElement('button');
        playButton.textContent = 'Automatic';
        playButton.style.cssText = `
            display: block;
            margin: 15px auto 0;
            padding: 8px 16px;
            background: #3498db;
            color: white;
            border: none;
            border-radius: 4px;
            cursor: pointer;
            font-size: 14px;
        `;
        
        document.querySelector('.timeline-container').appendChild(playButton);
        
        playButton.addEventListener('click', function() {
            if (autoPlayInterval) {
                clearInterval(autoPlayInterval);
                autoPlayInterval = null;
                playButton.textContent = 'Automatic';
                timelineSlider.disabled = false;
            } else {
                playButton.textContent = 'Stop';
                timelineSlider.disabled = true;
                
                let year = parseInt(timelineSlider.value);
                autoPlayInterval = setInterval(() => {
                    year++;
                    if (year > 2025) {
                        year = 2004;
                    }
                    timelineSlider.value = year;
                    currentYearDisplay.textContent = year;
                    updateMapByYear(year);
                }, 800);
            }
        });
        
    }).catch(function(error) {
        // 如果无法加载地图数据，显示备选方案
        console.error("Error loading map data:", error);
        
        // 绘制简单背景
        svg.append("rect")
            .attr("width", width)
            .attr("height", height)
            .attr("fill", "#b8d8e6");
        
        // 添加地点点
        const dots = svg.selectAll("circle")
            .data(locations)
            .enter()
            .append("circle")
            .attr("cx", (d, i) => width * 0.1 + (i % 5) * (width * 0.2))
            .attr("cy", (d, i) => height * 0.3 + Math.floor(i / 5) * (height * 0.2))
            .attr("r", 6)
            .attr("fill", d => typeColors[d.type])
            .attr("stroke", "#fff")
            .attr("stroke-width", 1.5)
            .attr("class", "location-dot")
            .attr("opacity", 0); // 初始透明度为0
        
        // 创建图例
        const legend = d3.select("#map-legend");
        
        Object.keys(typeColors).forEach(type => {
            const legendItem = legend.append("div")
                .attr("class", "legend-item");
            
            legendItem.append("div")
                .attr("class", "legend-color")
                .style("background-color", typeColors[type]);
            
            legendItem.append("div")
                .attr("class", "legend-text")
                .text(type);
        });
        
        // 时间滑块功能
        const timelineSlider = document.getElementById('timeline-slider');
        const currentYearDisplay = document.getElementById('current-year');
        
        // 初始化年份显示
        currentYearDisplay.textContent = timelineSlider.value;
        
        // 根据年份更新点的显示
        function updateMapByYear(year) {
            dots.transition()
                .duration(500)
                .attr("opacity", d => d.year <= year ? 1 : 0);
        }
        
        // 初始更新
        updateMapByYear(parseInt(timelineSlider.value));
        
        // 滑块事件监听
        timelineSlider.addEventListener('input', function() {
            const year = parseInt(this.value);
            currentYearDisplay.textContent = year;
            updateMapByYear(year);
        });
        
        // 添加自动播放功能
        let autoPlayInterval;
        const playButton = document.createElement('button');
        playButton.textContent = 'Automatic';
        playButton.style.cssText = `
            display: block;
            margin: 15px auto 0;
            padding: 8px 16px;
            background: #3498db;
            color: white;
            border: none;
            border-radius: 4px;
            cursor: pointer;
            font-size: 14px;
        `;
        
        document.querySelector('.timeline-container').appendChild(playButton);
        
        playButton.addEventListener('click', function() {
            if (autoPlayInterval) {
                clearInterval(autoPlayInterval);
                autoPlayInterval = null;
                playButton.textContent = '自动播放';
                timelineSlider.disabled = false;
            } else {
                playButton.textContent = '停止播放';
                timelineSlider.disabled = true;
                
                let year = parseInt(timelineSlider.value);
                autoPlayInterval = setInterval(() => {
                    year++;
                    if (year > 2025) {
                        year = 2004;
                    }
                    timelineSlider.value = year;
                    currentYearDisplay.textContent = year;
                    updateMapByYear(year);
                }, 800);
            }
        });
    });
}
