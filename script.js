 //auth gard
 
 if (localStorage.getItem('git_tracker_auth') !== 'true') {
      window.location.href = 'login.html';
    }


  // State 
    let allIssues    = [];
    let activeTab    = 'all';
    const BASE       = 'https://phi-lab-server.vercel.app/api/v1/lab';

    // DOM refs
    const loadingEl   = document.getElementById('loading');
    const errorEl     = document.getElementById('error-state');
    const emptyEl     = document.getElementById('empty-state');
    const gridEl      = document.getElementById('cards-grid');
    const totalEl     = document.getElementById('issue-total');

    // Fetch all issues
    async function loadIssues() {
      showLoading();
      try {
        const res  = await fetch(`${BASE}/issues`);
        const data = await res.json();
        allIssues = Array.isArray(data) ? data : (data.issues || data.data || []);
        renderIssues(filterIssues(allIssues));
        updateTotal(allIssues);
        updateTabCounts();
      } catch(err) {
        showError();
      }
    }