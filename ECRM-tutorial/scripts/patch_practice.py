import re

def main():
    with open('public/index.html', 'r', encoding='utf-8') as f:
        html = f.read()

    # 1. Add v2 logo in home button
    old_logo = '<div class="nav-logo">ECRM<span> / ONBOARDING</span></div>'
    new_logo = '<a href="#" class="nav-logo" style="text-decoration:none;">ECRM<span style="background:var(--primary);color:#fff;padding:2px 6px;border-radius:4px;font-size:10px;margin-left:8px;vertical-align:middle;font-family:\'JetBrains Mono\',monospace;box-shadow:0 0 10px rgba(59,130,246,0.4);">v2</span><span style="color:var(--text2);font-weight:400;"> / ONBOARDING</span></a>'
    
    html = html.replace(old_logo, new_logo)
    
    # Check for sidebar link to add practice tasks
    sidebar_anchor = '<a href="#tutorial" class="sidebar-link">Tutorial</a>'
    if sidebar_anchor in html:
        html = html.replace(sidebar_anchor, sidebar_anchor + '\n  <a href="#practice" class="sidebar-link">Practice Tasks</a>')

    practice_html = """
<!-- ── PRACTICE SECTION ── -->
<section id="practice">
  <div class="container">
    <div class="section-label">Training Center</div>
    <h2 class="section-title">Practice Tasks</h2>
    <p class="section-desc">Centralized repository for all practice exercises and their associated learning materials.</p>

    <div class="practice-grid" style="display:grid; grid-template-columns:1fr; gap:16px;">
      <!-- Task 1 -->
      <details style="background:var(--card); border:1px solid var(--border); border-radius:12px; overflow:hidden;">
        <summary style="padding:20px; font-family:'Syne',sans-serif; font-size:16px; font-weight:700; cursor:pointer; outline:none; transition:all 0.2s;">
          <span style="font-family:'JetBrains Mono',monospace; font-size:12px; color:var(--primary); margin-right:12px; background:rgba(59,130,246,0.1); padding:4px 8px; border-radius:6px;">[Task 1]</span>
          Data Entry & Campaign Setup
        </summary>
        <div style="padding:24px; border-top:1px solid var(--border); background:var(--bg);">
          <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(280px, 1fr)); gap:24px;">
            <div class="material-block">
              <h4 style="font-family:'JetBrains Mono',monospace; font-size:11px; text-transform:uppercase; letter-spacing:0.05em; color:var(--text3); margin-bottom:12px;">Practice Questions</h4>
              <a href="#" class="btn btn-ghost" style="border:1px solid var(--border); background:var(--card2); width:100%; justify-content:flex-start; margin-bottom:8px;"><span style="font-size:16px;">📄</span> Practice_Questions.pdf</a>
              <a href="#" class="btn btn-ghost" style="border:1px solid var(--border); background:var(--card2); width:100%; justify-content:flex-start;"><span style="font-size:16px;">📝</span> Assignment_Details.txt</a>
            </div>
            <div class="material-block">
              <h4 style="font-family:'JetBrains Mono',monospace; font-size:11px; text-transform:uppercase; letter-spacing:0.05em; color:var(--text3); margin-bottom:12px;">Reference Guides</h4>
              <a href="#" class="btn btn-ghost" style="border:1px solid var(--border); background:var(--card2); width:100%; justify-content:flex-start; margin-bottom:8px;"><span style="font-size:16px;">📊</span> Excel_Guide_Template.xlsx</a>
              <a href="#" class="btn btn-ghost" style="border:1px solid var(--border); background:var(--card2); width:100%; justify-content:flex-start;"><span style="font-size:16px;">📚</span> Training_Material_V2.docx</a>
            </div>
            <div class="material-block">
              <h4 style="font-family:'JetBrains Mono',monospace; font-size:11px; text-transform:uppercase; letter-spacing:0.05em; color:var(--text3); margin-bottom:12px;">Supporting Resources</h4>
              <a href="#" class="btn btn-ghost" style="border:1px solid var(--border); background:var(--card2); width:100%; justify-content:flex-start; margin-bottom:8px;"><span style="font-size:16px;">🔗</span> Video Tutorial Link</a>
              <a href="#" class="btn btn-ghost" style="border:1px solid var(--border); background:var(--card2); width:100%; justify-content:flex-start;"><span style="font-size:16px;">📂</span> Sample_Assets.zip</a>
            </div>
          </div>
        </div>
      </details>

      <!-- Task 2 -->
      <details style="background:var(--card); border:1px solid var(--border); border-radius:12px; overflow:hidden;">
        <summary style="padding:20px; font-family:'Syne',sans-serif; font-size:16px; font-weight:700; cursor:pointer; outline:none; transition:all 0.2s;">
          <span style="font-family:'JetBrains Mono',monospace; font-size:12px; color:var(--orange); margin-right:12px; background:rgba(245,158,11,0.1); padding:4px 8px; border-radius:6px;">[Task 2]</span>
          Call Center SQL Reporting
        </summary>
        <div style="padding:24px; border-top:1px solid var(--border); background:var(--bg);">
          <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(280px, 1fr)); gap:24px;">
            <div class="material-block">
              <h4 style="font-family:'JetBrains Mono',monospace; font-size:11px; text-transform:uppercase; letter-spacing:0.05em; color:var(--text3); margin-bottom:12px;">Practice Questions</h4>
              <a href="#" class="btn btn-ghost" style="border:1px solid var(--border); background:var(--card2); width:100%; justify-content:flex-start;"><span style="font-size:16px;">📄</span> SQL_Reporting_Task.txt</a>
            </div>
            <div class="material-block">
              <h4 style="font-family:'JetBrains Mono',monospace; font-size:11px; text-transform:uppercase; letter-spacing:0.05em; color:var(--text3); margin-bottom:12px;">Reference Guides</h4>
              <a href="#" class="btn btn-ghost" style="border:1px solid var(--border); background:var(--card2); width:100%; justify-content:flex-start;"><span style="font-size:16px;">📊</span> Schema_Dictionary.pdf</a>
            </div>
            <div class="material-block">
              <h4 style="font-family:'JetBrains Mono',monospace; font-size:11px; text-transform:uppercase; letter-spacing:0.05em; color:var(--text3); margin-bottom:12px;">Supporting Resources</h4>
              <a href="#" class="btn btn-ghost" style="border:1px solid var(--border); background:var(--card2); width:100%; justify-content:flex-start;"><span style="font-size:16px;">🔗</span> PostgreSQL Cheat Sheet</a>
            </div>
          </div>
        </div>
      </details>
    </div>
  </div>
</section>
"""
    # Insert before FOOTER
    if '<!-- ── FOOTER ── -->' in html:
        parts = html.split('<!-- ── FOOTER ── -->')
        html = parts[0] + practice_html + '\n<!-- ── FOOTER ── -->' + ''.join(parts[1:])
    else:
        parts = html.split('<footer')
        html = parts[0] + practice_html + '\n<footer' + ''.join(parts[1:])
        
    with open('public/index.html', 'w', encoding='utf-8') as f:
        f.write(html)
        
    print("Patched index.html with v2 logo and practice section!")

if __name__ == '__main__':
    main()
