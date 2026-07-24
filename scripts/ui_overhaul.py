import re

with open('index.html', 'r', encoding='utf-8') as f:
    content = f.read()

# ER Diagram SVG -> embed
content = re.sub(
    r'<img\s+src="img/ecrm_prod_ecrm\.svg"[^>]*>',
    r'<embed type="image/svg+xml" src="img/ecrm_prod_ecrm.svg" style="width:100%; height:800px; border-radius:12px; border:1px solid rgba(255,255,255,.1); box-shadow:0 20px 40px rgba(0,0,0,.3); background:#fff;">',
    content
)

# Add 'ML' under Operation
content = re.sub(
    r'(<div class="flow-node">Operations<br/><small[^>]*>)(.*?)(</small>)',
    r'\1\2 | ML Under Operation\3',
    content
)

# Replace internal team
content = content.replace("<td><strong>Madly</strong></td>", "<td><strong>v2 tech</strong></td>")

with open('index.html', 'w', encoding='utf-8') as f:
    f.write(content)
