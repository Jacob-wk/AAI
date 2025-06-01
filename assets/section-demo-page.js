document.addEventListener('DOMContentLoaded', function() {
  // Demo tab functionality
  const demoTabsContainer = document.querySelector('.demo-tabs');
  if (demoTabsContainer) {
    const demoTabs = demoTabsContainer.querySelectorAll('.demo-tab');
    const demoPanels = document.querySelectorAll('.demo-panel');
    
    demoTabs.forEach(tab => {
      tab.addEventListener('click', function() {
        const targetDemo = this.dataset.demo;
        
        // Remove active class from all tabs and panels
        demoTabs.forEach(t => t.classList.remove('active'));
        demoPanels.forEach(p => p.classList.remove('active'));
        
        // Add active class to clicked tab and corresponding panel
        this.classList.add('active');
        const targetPanel = document.getElementById(`demo-${targetDemo}`);
        if (targetPanel) {
          targetPanel.classList.add('active');
        }
      });
    });
  }
  
  // Smooth scrolling for demo CTA link
  const demoExperienceLink = document.querySelector('a[href="#demo-experience"]');
  if (demoExperienceLink) {
    demoExperienceLink.addEventListener('click', function(e) {
      e.preventDefault();
      const demoExperienceSection = document.getElementById('demo-experience');
      if (demoExperienceSection) {
        demoExperienceSection.scrollIntoView({
          behavior: 'smooth'
        });
      }
    });
  }
});
