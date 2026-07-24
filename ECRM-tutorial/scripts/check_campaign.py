import re
content = open('index.html', encoding='utf-8').read()
m = re.findall(r'<div class="campaign-card">.*?<h3>', content, re.DOTALL)
for i, block in enumerate(m):
    print(f"--- Block {i} ---")
    print(block.strip())
