/* AAI Demo Experience Interactive JavaScript */
// @ts-nocheck

document.addEventListener('DOMContentLoaded', function() {
  // Initialize demo experience functionality
  initializeDemoExperience();
  initializeCoursePreview();
  initializeProgressTracking();
});

function initializeDemoExperience() {
  const demoButtons = document.querySelectorAll('.aai-demo-btn');
  const modalOverlay = document.querySelector('.aai-demo-modal-overlay');
  const modal = document.querySelector('.aai-demo-modal');
  const closeBtn = document.querySelector('.aai-demo-close');

  if (!demoButtons.length || !modal) return;

  // Open demo modal
  demoButtons.forEach(btn => {
    btn.addEventListener('click', function(e) {
      e.preventDefault();
      const courseId = this.dataset.courseId;
      const courseTitle = this.dataset.courseTitle;
      
      openDemoModal(courseId, courseTitle);
    });
  });

  // Close modal
  if (closeBtn) {
    closeBtn.addEventListener('click', closeDemoModal);
  }

  if (modalOverlay) {
    modalOverlay.addEventListener('click', function(e) {
      if (e.target === this) {
        closeDemoModal();
      }
    });
  }

  // ESC key to close
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
      closeDemoModal();
    }
  });
}

/**
 * Opens the demo modal for a specific course
 * @param {string} courseId - The course identifier
 * @param {string} courseTitle - The course title
 */
function openDemoModal(courseId, courseTitle) {
  const modal = document.querySelector('.aai-demo-modal');
  const overlay = document.querySelector('.aai-demo-modal-overlay');
  const modalTitle = document.querySelector('.aai-demo-modal-title');
  const iframe = document.querySelector('.aai-demo-iframe');

  if (!modal || !overlay) return;

  // Set course title
  if (modalTitle && courseTitle) {
    modalTitle.textContent = `Demo: ${courseTitle}`;
  }

  // Set iframe source (placeholder for actual demo)
  if (iframe && courseId) {
    /** @type {HTMLIFrameElement} */ (iframe).src = `https://demo.intuto.com/course/${courseId}`;
  }

  // Show modal with animation
  /** @type {HTMLElement} */ (overlay).style.display = 'flex';
  setTimeout(() => {
    overlay.classList.add('active');
    modal.classList.add('active');
  }, 10);

  // Disable body scroll
  document.body.style.overflow = 'hidden';

  // Analytics tracking
  console.log('Demo opened:', courseId, courseTitle);
}

function closeDemoModal() {
  const modal = document.querySelector('.aai-demo-modal');
  const overlay = document.querySelector('.aai-demo-modal-overlay');
  const iframe = document.querySelector('.aai-demo-iframe');

  if (!modal || !overlay) return;

  // Hide modal with animation
  modal.classList.remove('active');
  overlay.classList.remove('active');

  setTimeout(() => {
    /** @type {HTMLElement} */ (overlay).style.display = 'none';
    
    // Clear iframe
    if (iframe) {
      /** @type {HTMLIFrameElement} */ (iframe).src = '';
    }
  }, 300);

  // Restore body scroll
  document.body.style.overflow = '';
}

function initializeCoursePreview() {
  const previewCards = document.querySelectorAll('.aai-course-preview-card');

  previewCards.forEach(card => {
    const playBtn = card.querySelector('.aai-preview-play-btn');
    const thumbnail = card.querySelector('.aai-preview-thumbnail');

    if (playBtn && thumbnail) {
      playBtn.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        
        const courseId = /** @type {HTMLElement} */ (card).dataset.courseId;
        const videoId = /** @type {HTMLElement} */ (this).dataset.videoId;
        
        if (videoId) {
          playPreviewVideo(card, videoId);
        }
      });
    }

    // Hover effects for professional interaction
    card.addEventListener('mouseenter', function() {
      this.classList.add('hover');
    });

    card.addEventListener('mouseleave', function() {
      this.classList.remove('hover');
    });
  });
}

/**
 * Plays preview video for a course card
 * @param {HTMLElement} card - The course card element
 * @param {string} videoId - The video identifier
 */
function playPreviewVideo(card, videoId) {
  const thumbnail = card.querySelector('.aai-preview-thumbnail');
  const playBtn = card.querySelector('.aai-preview-play-btn');

  if (!thumbnail || !playBtn) return;

  // Create video element
  const video = document.createElement('iframe');
  video.className = 'aai-preview-video';
  video.src = `https://player.vimeo.com/video/${videoId}?autoplay=1&title=0&byline=0&portrait=0`;
  video.frameBorder = '0';
  video.allow = 'autoplay; fullscreen; picture-in-picture';
  video.allowFullscreen = true;

  // Replace thumbnail with video
  thumbnail.style.display = 'none';
  playBtn.style.display = 'none';
  card.appendChild(video);

  // Analytics tracking
  console.log('Preview video played:', videoId);
}

function initializeProgressTracking() {
  const progressBars = document.querySelectorAll('.aai-demo-progress-bar');

  progressBars.forEach(bar => {
    const progress = /** @type {HTMLElement} */ (bar).dataset.progress || 0;
    const fill = bar.querySelector('.aai-progress-fill');
    
    if (fill) {
      // Animate progress bar
      setTimeout(() => {
        /** @type {HTMLElement} */ (fill).style.width = `${progress}%`;
      }, 500);
    }
  });

  // Simulate progress updates for demo
  const demoProgress = document.querySelector('.aai-demo-live-progress');
  if (demoProgress) {
    simulateProgressUpdates(demoProgress);
  }
}

/**
 * Simulates progress updates for demo purposes
 * @param {HTMLElement} container - The container element
 */
function simulateProgressUpdates(container) {
  const steps = [
    { step: 1, title: 'Introduction to Safety Protocols', completed: true },
    { step: 2, title: 'Equipment Inspection Basics', completed: true },
    { step: 3, title: 'Risk Assessment Methods', completed: false },
    { step: 4, title: 'Emergency Procedures', completed: false },
    { step: 5, title: 'Final Assessment', completed: false }
  ];

  let currentStep = 2;
  
  // Update progress every 3 seconds for demo
  const interval = setInterval(() => {
    if (currentStep < steps.length) {
      steps[currentStep].completed = true;
      currentStep++;
      
      updateProgressDisplay(container, steps, currentStep);
      
      if (currentStep >= steps.length) {
        clearInterval(interval);
        showCompletionMessage(container);
      }
    }
  }, 3000);
}

/**
 * Updates the progress display
 * @param {HTMLElement} container - The container element
 * @param {Array} steps - Array of step objects
 * @param {number} currentStep - Current step number
 */
function updateProgressDisplay(container, steps, currentStep) {
  const progressBar = container.querySelector('.aai-progress-fill');
  const stepList = container.querySelector('.aai-step-list');
  
  if (progressBar) {
    const progress = (currentStep / steps.length) * 100;
    /** @type {HTMLElement} */ (progressBar).style.width = `${progress}%`;
  }

  if (stepList) {
    stepList.innerHTML = steps.map(step => `
      <div class="aai-step ${step.completed ? 'completed' : ''}">
        <span class="aai-step-number">${step.step}</span>
        <span class="aai-step-title">${step.title}</span>
        <span class="aai-step-status">${step.completed ? '✓' : '○'}</span>
      </div>
    `).join('');
  }
}

/**
 * Shows completion message
 * @param {HTMLElement} container - The container element
 */
function showCompletionMessage(container) {
  const message = document.createElement('div');
  message.className = 'aai-completion-message';
  message.innerHTML = `
    <div class="aai-completion-content">
      <h3>🎉 Demo Complete!</h3>
      <p>You've experienced a sample of our professional safety training.</p>
      <button class="aai-btn aai-btn-primary" onclick="window.location.href='/pages/course-access'">
        Start Full Course
      </button>
    </div>
  `;

  container.appendChild(message);
  
  setTimeout(() => {
    message.classList.add('show');
  }, 100);
}

// Professional analytics integration
/**
 * Tracks demo interaction for analytics
 * @param {string} action - The action being tracked
 * @param {object} data - Additional data to track
 */
function trackDemoInteraction(action, data = {}) {
  // Integration with professional analytics
  if (typeof window.gtag !== 'undefined') {
    window.gtag('event', 'demo_interaction', {
      action: action,
      course_id: data.courseId || '',
      step: data.step || '',
      custom_data: data
    });
  }

  // Console logging for development
  console.log('Demo interaction:', action, data);
}

// Export for external usage
if (typeof window !== 'undefined') {
  window.AAIDemoExperience = {
    openDemoModal,
    closeDemoModal,
    trackDemoInteraction
  };
}
