import os
import glob

favicon_tag = '    <link rel="icon" type="image/svg+xml" href="img/ECRM_Logo.aa055d6f9939ac675c4fe4f3451220f2.svg">\n'

for html_file in glob.glob('*.html'):
    with open(html_file, 'r', encoding='utf-8') as f:
        content = f.read()
    
    if '<head>' in content and 'ECRM_Logo' not in content:
        content = content.replace('<head>', '<head>\n' + favicon_tag, 1)
        with open(html_file, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f"Added favicon to {html_file}")
