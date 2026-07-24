import re

def get_h2_text(section_html):
    match = re.search(r'<h2[^>]*>(.*?)</h2>', section_html, re.IGNORECASE | re.DOTALL)
    if match:
        return match.group(1).strip()
    return None

def main():
    with open('public/index.html', 'r', encoding='utf-8') as f:
        index_html = f.read()
        
    with open('public/preview.html', 'r', encoding='utf-8') as f:
        preview_html = f.read()

    # Find sections in preview
    unique_sections = []
    for match in re.finditer(r'<section[^>]*>.*?</section>', preview_html, re.IGNORECASE | re.DOTALL):
        section_html = match.group(0)
        title = get_h2_text(section_html)
        if title:
            norm_title = title.lower().replace('\n', ' ').strip()
            
            # Explicitly ONLY grab these two unique sections that don't exist in index.html
            if "most important enterprise tables" in norm_title or "raw json viewer" in norm_title:
                unique_sections.append((title, section_html))
                
    if not unique_sections:
        print("No unique sections found.")
        return

    print(f"Found {len(unique_sections)} unique sections:")
    for title, html in unique_sections:
        print("-", title)

    # Append before the footer in index.html
    if '<!-- ── FOOTER ── -->' in index_html:
        split_marker = '<!-- ── FOOTER ── -->'
    elif '<footer' in index_html:
        split_marker = '<footer'
    else:
        split_marker = '</body>'
        
    parts = index_html.split(split_marker)
    
    # Wrap unique sections in a specific wrapper so styles inherit
    merged_content = "\n\n<!-- ── MERGED FROM PREVIEW.HTML ── -->\n" + "\n\n".join(html for title, html in unique_sections) + "\n\n"
    
    # We should also include some styling overrides from preview.html for .raw-json and .info-list if they are missing
    style_overrides = """
<style>
/* Merged styles for preview content */
.info-list { padding-left:20px; line-height:1.9; color:var(--text2); }
.raw-json { margin-top:20px; }
details { background:var(--card); border:1px solid var(--border); border-radius:14px; padding:18px; }
summary { cursor:pointer; font-weight:600; outline:none; }
</style>
"""
    merged_content = style_overrides + merged_content

    new_index = parts[0] + merged_content + split_marker + "".join(parts[1:])
    
    with open('public/index.html', 'w', encoding='utf-8') as f:
        f.write(new_index)
        
    print("Merge complete!")

if __name__ == '__main__':
    main()
