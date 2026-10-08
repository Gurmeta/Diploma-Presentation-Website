import type { Dict } from '../i18n/bg';

/**
 * HTML of the demo site that "Terraform deploys" in the simulated browser.
 * It keeps its own retro look on purpose: it stands in for the real site built in the thesis.
 */
export function getMatrixHtml(t: Dict, ip: string): string {
  const site = t.site;
  return `
<!DOCTYPE html>
<html lang="${site.htmlLang}"><head><meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>IaC Coursework - Cloud Automation</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        
        body {
            background: #f5f7f5;
            color: #222222;
            font-family: 'Courier New', monospace;
            line-height: 1.6;
            overflow-x: hidden;
        }
        
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: #e0e0e0; }
        ::-webkit-scrollbar-thumb { background: #007700; border-radius: 4px; }
        
        .matrix-bg {
            position: fixed;
            top: 0; left: 0;
            width: 100%; height: 100%;
            z-index: -1;
            opacity: 0.55;
        }
        
        .container {
            max-width: 800px;
            margin: 0 auto;
            padding: 40px 20px;
        }
        
        header {
            text-align: center;
            padding: 40px 0;
            border-bottom: 1px solid #007700;
            margin-bottom: 40px;
        }
        
        h1 {
            font-size: 2.2em;
            margin-bottom: 10px;
            color: #006600;
        }
        
        .subtitle {
            color: #005500;
            font-size: 1.1em;
            margin-bottom: 20px;
        }
        
        .professor {
            color: #444444;
            font-style: italic;
        }
        
        .card {
            background: rgba(255, 255, 255, 0.9);
            padding: 25px;
            margin: 25px 0;
            border-left: 4px solid #007700;
            border-radius: 0 8px 8px 0;
            box-shadow: 0 4px 12px rgba(0,0,0,0.06);
        }
        
        .card h2 {
            color: #005500;
            margin-bottom: 15px;
            font-size: 1.4em;
        }
        
        .tech-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
            gap: 10px;
            margin-top: 15px;
        }
        
        .tech-item {
            background: rgba(0, 200, 0, 0.15);
            padding: 8px 12px;
            border: 1px solid #007700;
            color: #222222;
        }
        
        .status-online {
            color: #008800;
            font-weight: bold;
        }
        
        .port-list {
            list-style: none;
            padding-left: 0;
        }
        
        .port-list li {
            padding: 5px 0;
            border-bottom: 1px dashed #cccccc;
        }
        
        footer {
            text-align: center;
            margin-top: 50px;
            padding: 20px;
            color: #555555;
            font-size: 0.9em;
        }
        
        .deploy-time {
            color: #007700;
            font-weight: bold;
        }
    </style>
</head>
<body>
    <canvas class="matrix-bg" id="matrixCanvas" width="1920" height="945"></canvas>
    
    <div class="container">
        <header>
            <h1>🖥️ CLOUD INFRASTRUCTURE</h1>
            <div class="subtitle">${site.subtitle}</div>
            <div class="professor">${site.professor}</div>
            <div class="status-online">● SYSTEM STATUS: ONLINE</div>
        </header>
        
        <div class="card">
            <h2>${site.goalHeading}</h2>
            <p>${site.goalText}</p>
        </div>
        
        <div class="card">
            <h2>${site.techHeading}</h2>
            <div class="tech-grid">
                <div class="tech-item">Terraform</div>
                <div class="tech-item">Azure VM</div>
                <div class="tech-item">Linux</div>
                <div class="tech-item">Nginx</div>
                <div class="tech-item">Bash Scripting</div>
                <div class="tech-item">Git</div>
                <div class="tech-item">Azure NSG</div>
                <div class="tech-item">HTML5</div>
                <div class="tech-item">CSS3</div>
                <div class="tech-item">JavaScript</div>
            </div>
        </div>
        
        <div class="card">
            <h2>${site.configHeading}</h2>
            <p><strong>${site.vm}</strong> Standard_D2s_v3</p>
            <p><strong>${site.region}</strong> Poland Central</p>
            <p><strong>${site.publicIp}</strong> ${ip}</p>
            <p><strong>${site.publisher}</strong> Canonical-0001-com-ubuntu-server-jammy</p>
            <p><strong>${site.os}</strong> Ubuntu Server 22.04 LTS</p>
        </div>
        
        <div class="card">
            <h2>${site.securityHeading}</h2>
            <ul class="port-list">
                ${site.ports.map((p) => `<li>🟢 ${p}</li>`).join("")}
            </ul>
        </div>
        
        <div class="card">
            <h2>${site.automationHeading}</h2>
            <p>${site.automationText}</p>
            <ul class="port-list">
                ${site.automationItems.map((item) => `<li>✅ ${item.replace("&", "&amp;")}</li>`).join("")}
            </ul>
        </div>
        
        <footer>
            <p>${site.footerProject} | <span class="deploy-time" id="timestamp">-</span></p>
            <p>${site.footerBuilt}</p>
        </footer>
    </div>
    
    <script>
        // Simple Matrix Background
        const canvas = document.getElementById('matrixCanvas');
        const ctx = canvas.getContext('2d');
        
        function resizeCanvas() {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        }
        
        resizeCanvas();
        window.addEventListener('resize', resizeCanvas);
        
        const chars = '01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン';
        const charArray = chars.split('');
        const fontSize = 12;
        let columns = canvas.width / fontSize;
        let drops = [];
        
        for (let i = 0; i < columns; i++) {
            drops[i] = Math.random() * canvas.height;
        }
        
        function drawMatrix() {
            ctx.fillStyle = 'rgba(245, 247, 245, 0.06)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            
            ctx.fillStyle = '#007700';
            ctx.font = fontSize + 'px monospace';
            
            for (let i = 0; i < drops.length; i++) {
                const text = charArray[Math.floor(Math.random() * charArray.length)];
                ctx.fillText(text, i * fontSize, drops[i] * fontSize);
                
                if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                    drops[i] = 0;
                }
                drops[i]++;
            }
        }
        
        setInterval(drawMatrix, 35);
        
        // Timestamp
        document.getElementById('timestamp').textContent = new Date().toLocaleString('${site.locale}');
    </script>


</body></html>
`;
}
