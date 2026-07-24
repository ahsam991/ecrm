import re
content = open('index.html', encoding='utf-8').read()

m = re.search(r'function renderDbGroups\([^)]*\)\s*\{.*?(function|\<\/script\>)', content, re.DOTALL)
if m:
    print(m.group(0)[:1500])

css = re.findall(r'\.db-[a-zA-Z0-9_-]+[^{]*\{[^}]*\}', content)
print("\n--- CSS ---")
for c in css:
    if 'table' in c or 'col' in c:
        print(c)
