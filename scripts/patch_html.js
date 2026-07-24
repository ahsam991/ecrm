const fs = require('fs');
const path = require('path');

const htmlPath = path.join(__dirname, 'index.html');
let html = fs.readFileSync(htmlPath, 'utf8');

// 1. Add Auth Modal HTML and JS to hide main content
const authModalHtml = `
<!-- ── SYSTEM AUTH MODAL ── -->
<div class="modal-overlay open" id="systemAuthModal" style="z-index:9999; background: var(--bg);">
  <div class="modal" style="max-width:400px; padding:32px; text-align:center; margin-top: 10vh;">
    <div style="font-size:32px; margin-bottom:12px;">🔐</div>
    <h3 style="font-family:'Syne',sans-serif; font-size:20px; margin-bottom:8px; color:var(--text);" id="authTitle">Login Required</h3>
    
    <div id="authTabs" style="display:flex; margin-bottom:20px; border-bottom: 1px solid var(--border);">
      <button class="modal-tab active" id="tabLogin" onclick="setAuthMode('login')" style="flex:1;">Login</button>
      <button class="modal-tab" id="tabRegister" onclick="setAuthMode('register')" style="flex:1;">Register</button>
    </div>

    <form id="authForm" onsubmit="handleAuth(event)">
      <input type="text" id="authUsername" placeholder="Username" required style="width:100%; padding:12px 16px; margin-bottom:16px; border-radius:8px; border:1px solid var(--border); background:var(--bg); color:var(--text); outline:none;">
      
      <input type="password" id="authPassword" placeholder="Password" required style="width:100%; padding:12px 16px; margin-bottom:16px; border-radius:8px; border:1px solid var(--border); background:var(--bg); color:var(--text); outline:none;">
      
      <div id="roleSelectWrapper" style="display:none; text-align:left; margin-bottom:16px;">
        <label style="font-size:12px; color:var(--text2); display:block; margin-bottom:4px;">Role:</label>
        <select id="authRole" style="width:100%; padding:12px 16px; border-radius:8px; border:1px solid var(--border); background:var(--bg); color:var(--text); outline:none;">
          <option value="user">User</option>
          <option value="management">Management</option>
          <option value="admin">Admin</option>
        </select>
      </div>

      <button type="submit" class="btn btn-primary" id="authSubmitBtn" style="width:100%; padding:12px; justify-content:center;">Login</button>
    </form>
    
    <p id="systemAuthError" style="color:var(--red); font-size:12px; margin-top:12px; display:none;"></p>
  </div>
</div>
<script>
  let authMode = 'login';
  
  function setAuthMode(mode) {
    authMode = mode;
    document.getElementById('tabLogin').classList.toggle('active', mode === 'login');
    document.getElementById('tabRegister').classList.toggle('active', mode === 'register');
    
    document.getElementById('authTitle').innerText = mode === 'login' ? 'Login Required' : 'Create Account';
    document.getElementById('authSubmitBtn').innerText = mode === 'login' ? 'Login' : 'Register';
    
    document.getElementById('roleSelectWrapper').style.display = mode === 'login' ? 'none' : 'block';
    document.getElementById('systemAuthError').style.display = 'none';
  }

  async function handleAuth(e) {
    e.preventDefault();
    const username = document.getElementById('authUsername').value;
    const password = document.getElementById('authPassword').value;
    const role = document.getElementById('authRole').value;
    
    const url = authMode === 'login' ? '/api/login' : '/api/register';
    const body = authMode === 'login' ? { username, password } : { username, password, role };
    
    try {
      const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      });
      
      const data = await res.json();
      
      if (!res.ok) {
        document.getElementById('systemAuthError').innerText = '❌ ' + (data.error || 'Authentication failed');
        document.getElementById('systemAuthError').style.display = 'block';
        return;
      }
      
      if (authMode === 'login') {
        localStorage.setItem('ecrm_token', data.token);
        localStorage.setItem('ecrm_user', JSON.stringify({ username: data.username, role: data.role }));
        document.getElementById('systemAuthModal').style.display = 'none';
        document.body.style.overflow = 'auto'; // restore scrolling
        
        // Update UI to show logged in user
        setupUserUI(data.username, data.role);
      } else {
        // Registered successfully, switch to login
        setAuthMode('login');
        document.getElementById('systemAuthError').innerText = '✅ Account created! Please login.';
        document.getElementById('systemAuthError').style.color = 'var(--green)';
        document.getElementById('systemAuthError').style.display = 'block';
        
        // Reset color back to red for future errors
        setTimeout(() => { document.getElementById('systemAuthError').style.color = 'var(--red)'; }, 3000);
      }
    } catch (err) {
      document.getElementById('systemAuthError').innerText = '❌ Network error';
      document.getElementById('systemAuthError').style.display = 'block';
    }
  }

  function setupUserUI(username, role) {
     const navLinks = document.querySelector('.nav-links');
     if (!document.getElementById('user-profile-nav')) {
       const userEl = document.createElement('div');
       userEl.id = 'user-profile-nav';
       userEl.style = "margin-left: 16px; display: flex; align-items: center; gap: 8px; font-size: 13px; color: var(--text2); background: var(--card); padding: 4px 12px; border-radius: 99px; border: 1px solid var(--border);";
       userEl.innerHTML = '👤 <span style="font-weight: 600; color: var(--text)">' + username + '</span> <span style="font-family: monospace; font-size: 10px; text-transform: uppercase; color: var(--primary);">' + role + '</span><button onclick="logout()" style="background:none; border:none; color:var(--red); font-size:12px; cursor:pointer; margin-left:8px;">Logout</button>';
       navLinks.appendChild(userEl);
     }
  }

  function logout() {
    localStorage.removeItem('ecrm_token');
    localStorage.removeItem('ecrm_user');
    window.location.reload();
  }

  // Check auth on load
  document.addEventListener('DOMContentLoaded', () => {
    const token = localStorage.getItem('ecrm_token');
    if (!token) {
      document.getElementById('systemAuthModal').style.display = 'flex';
      document.body.style.overflow = 'hidden'; // prevent scrolling
    } else {
      document.getElementById('systemAuthModal').style.display = 'none';
      const user = JSON.parse(localStorage.getItem('ecrm_user') || '{}');
      if (user.username) {
        setupUserUI(user.username, user.role);
      }
    }
  });
</script>
`;

// Insert the new auth modal right before the SQL Auth Modal or body close
if (html.includes('<!-- ── SQL AUTH MODAL ── -->')) {
  html = html.replace('<!-- ── SQL AUTH MODAL ── -->', authModalHtml + '\n<!-- ── SQL AUTH MODAL ── -->');
} else {
  html = html.replace('</body>', authModalHtml + '\n</body>');
}

fs.writeFileSync(htmlPath, html, 'utf8');
console.log("HTML patched successfully!");
