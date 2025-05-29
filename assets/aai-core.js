/*
COPILOT CONTEXT: AAI LMS Core JavaScript
- Professional safety education platform for amusement industry
- FetchApp + Intuto Multi Token integration (automated delivery)
- Shopify → FetchApp → Email delivery workflow
- Error handling must be comprehensive (professionals need reliability)
- Performance critical (quick course access essential)
- Based on live implementation: https://theassociation.academy/collections/acme-association-of-comedy-music-entertainment
*/

class AAI_Core {
    constructor() {
        this.isInitialized = false;
        this.init();
    }

    init() {
        if (this.isInitialized) return;
        
        try {
            this.initSmoothScrolling();
            this.initProfessionalInteractions();
            this.initCourseFilters();
            this.initDashboardToggle();
            this.initEnrollmentTracking();
            this.initProgressTracking();
            this.initFetchAppIntegration();
            this.isInitialized = true;
            console.log('AAI Core initialized successfully');
        } catch (error) {
            this.handleError(error, 'initialization');
        }
    }

    // Professional smooth scrolling for navigation
    initSmoothScrolling() {
        const anchors = document.querySelectorAll('a[href^="#"]');
        anchors.forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href') || '');
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    }

    // Professional interaction enhancements
    initProfessionalInteractions() {
        // Add professional hover effects to course cards
        const courseCards = document.querySelectorAll('.aai-course-card, .course-card');
        courseCards.forEach(card => {
            const htmlCard = card;
            card.addEventListener('mouseenter', function() {
                if (htmlCard instanceof HTMLElement) {
                    htmlCard.style.transform = 'translateY(-4px)';
                    htmlCard.style.boxShadow = '0 8px 24px rgba(0,0,0,0.15)';
                }
            });

            card.addEventListener('mouseleave', function() {
                if (htmlCard instanceof HTMLElement) {
                    htmlCard.style.transform = 'translateY(0)';
                    htmlCard.style.boxShadow = '0 2px 8px rgba(0,0,0,0.08)';
                }
            });
        });

        // Professional button interactions
        const buttons = document.querySelectorAll('.aai-btn, .enroll-btn');
        buttons.forEach(btn => {
            const htmlBtn = btn;
            btn.addEventListener('click', function(e) {
                // Add professional click feedback
                if (htmlBtn instanceof HTMLElement) {
                    htmlBtn.style.transform = 'scale(0.98)';
                    setTimeout(() => {
                        if (htmlBtn instanceof HTMLElement) {
                            htmlBtn.style.transform = '';
                        }
                    }, 150);
                }
            });
        });
    }

    // Course category filtering (professional interface)
    initCourseFilters() {
        const categoryTabs = document.querySelectorAll('.aai-category-tab');
        const courseCards = document.querySelectorAll('.aai-course-card');

        categoryTabs.forEach(tab => {
            tab.addEventListener('click', function() {
                // Remove active state from all tabs
                categoryTabs.forEach(t => t.classList.remove('active'));
                
                // Add active state to clicked tab
                this.classList.add('active');

                // Filter courses based on category
                const category = (this instanceof HTMLElement) ? this.dataset.category : null;
                
                courseCards.forEach(card => {
                    const cardElement = card instanceof HTMLElement ? card : null;
                    const cardCategory = cardElement ? cardElement.dataset.category : null;
                    
                    if (category === 'all' || cardCategory === category) {
                        if (cardElement) {
                            cardElement.style.display = 'block';
                            // Professional fade-in animation
                            cardElement.style.opacity = '0';
                            setTimeout(() => {
                                if (cardElement) {
                                    cardElement.style.opacity = '1';
                                }
                            }, 100);
                        }
                    } else {
                        if (cardElement) {
                            cardElement.style.display = 'none';
                        }
                    }
                });
            });
        });
    }

    // Professional dashboard toggle
    initDashboardToggle() {
        const accountLink = document.querySelector('.aai-account-link');
        const dashboard = document.querySelector('#aai-dashboard');
        const homeSections = document.querySelectorAll('.aai-home-section');

        if (accountLink && dashboard) {
            accountLink.addEventListener('click', (e) => {
                e.preventDefault();
                this.toggleDashboard();
            });
        }
    }

    toggleDashboard() {
        const dashboard = document.querySelector('#aai-dashboard');
        const homeSections = document.querySelectorAll('.aai-home-section');
        
        if (dashboard && dashboard instanceof HTMLElement) {
            if (dashboard.style.display === 'block') {
                dashboard.style.display = 'none';
                homeSections.forEach(section => {
                    if (section instanceof HTMLElement) {
                        section.style.display = 'block';
                    }
                });
            } else {
                dashboard.style.display = 'block';
                homeSections.forEach(section => {
                    if (section instanceof HTMLElement) {
                        section.style.display = 'none';
                    }
                });
            }
        }
    }

    // Professional enrollment tracking and analytics
    initEnrollmentTracking() {
        document.querySelectorAll('.aai-enroll-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                
                const courseCard = btn.closest('.aai-course-card');
                if (courseCard) {
                    const titleElement = courseCard.querySelector('h3');
                    const priceElement = courseCard.querySelector('.aai-price');
                    
                    if (titleElement && priceElement) {
                        const courseTitle = titleElement.textContent || '';
                        const coursePrice = priceElement.textContent || '';
                        
                        // Professional enrollment analytics
                        this.trackEnrollmentIntent({
                            course: courseTitle,
                            price: coursePrice,
                            timestamp: new Date().toISOString(),
                            userAgent: navigator.userAgent
                        });

                        // In production, this would redirect to Shopify cart with FetchApp integration
                        this.handleProfessionalEnrollment(courseCard);
                    }
                }
            });
        });
    }

    /**
     * Professional enrollment process
     * @param {Element} courseCard - The course card element
     */
    handleProfessionalEnrollment(courseCard) {
        const courseData = this.extractCourseData(courseCard);
        
        // Show professional loading state
        this.showEnrollmentModal(courseData);
        
        // In production: integrate with Shopify cart and FetchApp automated delivery
        console.log('Professional enrollment initiated:', courseData);
    }

    /**
     * Extract professional course data
     * @param {Element} courseCard - The course card element
     * @returns {{title: string, price: string, ceuCredits: string, certification: string, duration: string, level: string, prerequisites: string}} Course data object
     */
    extractCourseData(courseCard) {
        const titleElement = courseCard.querySelector('h3');
        const priceElement = courseCard.querySelector('.aai-price');
        const ceuElement = courseCard.querySelector('.aai-ceu-credits');
        const certificationElement = courseCard.querySelector('.aai-certification');
        const durationElement = courseCard.querySelector('.aai-course-meta span:first-child');
        const levelElement = courseCard.querySelector('.aai-course-meta span:nth-child(2)');
        const prerequisitesElement = courseCard.querySelector('.aai-prerequisites');

        return {
            title: titleElement ? titleElement.textContent || '' : '',
            price: priceElement ? priceElement.textContent || '' : '',
            ceuCredits: ceuElement ? ceuElement.textContent || '0' : '0',
            certification: certificationElement ? certificationElement.textContent || 'None' : 'None',
            duration: durationElement ? durationElement.textContent || '' : '',
            level: levelElement ? levelElement.textContent || '' : '',
            prerequisites: prerequisitesElement ? prerequisitesElement.textContent || 'None' : 'None'
        };
    }

    /**
     * Professional enrollment modal
     * @param {{title: string, price: string, ceuCredits: string, duration: string, level: string, prerequisites: string}} courseData - Course data object
     */
    showEnrollmentModal(courseData) {
        const modal = document.createElement('div');
        modal.className = 'aai-enrollment-modal';
        modal.innerHTML = `
            <div class="aai-modal-content">
                <div class="aai-modal-header">
                    <h3>Professional Course Enrollment</h3>
                    <button class="aai-modal-close">&times;</button>
                </div>
                <div class="aai-modal-body">
                    <h4>${courseData.title}</h4>
                    <p><strong>Price:</strong> ${courseData.price}</p>
                    <p><strong>CEU Credits:</strong> ${courseData.ceuCredits}</p>
                    <p><strong>Duration:</strong> ${courseData.duration}</p>
                    <p><strong>Level:</strong> ${courseData.level}</p>
                    ${courseData.prerequisites !== 'None' ? `<p><strong>Prerequisites:</strong> ${courseData.prerequisites}</p>` : ''}
                    <div class="aai-enrollment-info">
                        <p>Upon completion of payment via FetchApp:</p>
                        <ul>
                            <li>Instant email delivery with Intuto access token</li>
                            <li>Professional course materials and resources</li>
                            <li>Industry-recognized IAAPA certification</li>
                            <li>Progress tracking in your professional dashboard</li>
                        </ul>
                    </div>
                </div>
                <div class="aai-modal-footer">
                    <button class="aai-btn aai-btn-secondary" onclick="this.closest('.aai-enrollment-modal').remove()">Cancel</button>
                    <button class="aai-btn aai-btn-primary" onclick="window.location.href='/cart'">Add to Cart</button>
                </div>
            </div>
        `;

        document.body.appendChild(modal);

        // Close modal functionality
        const closeButton = modal.querySelector('.aai-modal-close');
        if (closeButton) {
            closeButton.addEventListener('click', () => {
                modal.remove();
            });
        }

        // Outside click to close
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.remove();
            }
        });
    }

    /**
     * Professional analytics tracking
     * @param {Object} data - Enrollment intent data
     */
    trackEnrollmentIntent(data) {
        // In production: send to analytics service
        console.log('Enrollment intent tracked:', data);
        
        // Store in localStorage for abandoned cart recovery
        const enrollmentIntents = JSON.parse(localStorage.getItem('aai_enrollment_intents') || '[]');
        enrollmentIntents.push(data);
        localStorage.setItem('aai_enrollment_intents', JSON.stringify(enrollmentIntents));
    }

    // Professional progress tracking initialization
    initProgressTracking() {
        // Update progress bars in dashboard
        const progressBars = document.querySelectorAll('.aai-progress-bar');
        progressBars.forEach(bar => {
            if (bar instanceof HTMLElement) {
                const progress = bar.dataset.progress || '0';
                const progressFill = bar.querySelector('.aai-progress-fill');
                if (progressFill instanceof HTMLElement) {
                    progressFill.style.width = `${progress}%`;
                }
            }
        });

        // Initialize course completion tracking
        this.trackCourseProgress();
    }

    // Track course progress for enrolled students
    trackCourseProgress() {
        // In production: integrate with Intuto API to track actual progress
        const enrolledCourses = document.querySelectorAll('.aai-enrolled-course');
        enrolledCourses.forEach(course => {
            const progressElement = course.querySelector('.aai-progress-percentage');
            if (progressElement && course instanceof HTMLElement) {
                const progress = course.dataset.progress || '0';
                if (progressElement.textContent !== null) {
                    progressElement.textContent = `${progress}% Complete`;
                }
            }
        });
    }

    // FetchApp integration initialization
    initFetchAppIntegration() {
        console.log('FetchApp integration initialized for automated course delivery');
        
        // Listen for successful checkout events
        this.setupFetchAppWebhooks();
        
        // Initialize order tracking for course delivery
        this.trackOrderDelivery();
    }

    // Setup FetchApp webhook listeners
    setupFetchAppWebhooks() {
        // In production: FetchApp automatically handles delivery
        // This tracks local state for dashboard updates
        window.addEventListener('fetchapp_delivery_complete', (event) => {
            const customEvent = /** @type {CustomEvent} */ (event);
            console.log('FetchApp delivery completed:', customEvent.detail);
            this.updateDashboardAfterDelivery(customEvent.detail);
        });
    }

    /**
     * Track order delivery status
     */
    trackOrderDelivery() {
        // Check for pending deliveries and update dashboard
        const pendingOrders = JSON.parse(localStorage.getItem('aai_pending_orders') || '[]');
        pendingOrders.forEach(/** @param {any} order */ order => {
            this.checkDeliveryStatus(order);
        });
    }

    /**
     * Update dashboard after successful course delivery
     * @param {any} deliveryData - Delivery data from FetchApp
     */
    updateDashboardAfterDelivery(deliveryData) {
        // Add course to enrolled courses section
        const enrolledSection = document.querySelector('.aai-enrolled-courses');
        if (enrolledSection && deliveryData.courseTitle) {
            this.addEnrolledCourse(deliveryData.courseTitle, deliveryData.accessToken);
        }
        
        // Show success notification
        this.showNotification('success', `Course access delivered! Check your email for ${deliveryData.courseTitle}`);
    }

    /**
     * Add newly enrolled course to dashboard
     * @param {string} courseTitle - Course title
     * @param {string} accessToken - Intuto access token
     */
    addEnrolledCourse(courseTitle, accessToken) {
        const enrolledSection = document.querySelector('.aai-enrolled-courses');
        if (enrolledSection) {
            const courseElement = document.createElement('div');
            courseElement.className = 'aai-enrolled-course-item';
            courseElement.innerHTML = `
                <h4>${courseTitle}</h4>
                <p>Status: <span class="aai-status-active">Active</span></p>
                <a href="https://intuto.com/access/${accessToken}" class="aai-btn aai-btn-primary" target="_blank">Access Course</a>
            `;
            enrolledSection.appendChild(courseElement);
        }
    }

    /**
     * Check delivery status for pending orders
     * @param {any} orderData - Order data
     */
    checkDeliveryStatus(orderData) {
        // In production: query FetchApp API for delivery status
        console.log('Checking delivery status for order:', orderData);
    }

    /**
     * Professional error handling
     * @param {Error} error - Error object
     * @param {string} context - Error context
     */
    handleError(error, context) {
        console.error(`AAI Error in ${context}:`, error);
        // Show professional error message
        this.showNotification('error', 'We apologize for the inconvenience. Please try again or contact our support team.');
    }

    /**
     * Professional notification system
     * @param {string} type - Notification type (error, success, etc.)
     * @param {string} message - Notification message
     */
    showNotification(type, message) {
        const notification = document.createElement('div');
        notification.className = `aai-notification aai-notification-${type}`;
        notification.innerHTML = `
            <div class="aai-notification-content">
                <span class="aai-notification-icon">${type === 'error' ? '⚠️' : '✓'}</span>
                <span class="aai-notification-message">${message}</span>
                <button class="aai-notification-close">&times;</button>
            </div>
        `;

        document.body.appendChild(notification);

        // Auto-remove after 5 seconds
        setTimeout(() => {
            notification.remove();
        }, 5000);

        // Manual close
        const closeButton = notification.querySelector('.aai-notification-close');
        if (closeButton) {
            closeButton.addEventListener('click', () => {
                notification.remove();
            });
        }
    }
}

// Professional initialization when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    new AAI_Core();
});

// Professional accessibility enhancements
document.addEventListener('keydown', (e) => {
    // ESC key closes modals
    if (e.key === 'Escape') {
        document.querySelectorAll('.aai-enrollment-modal, .aai-notification').forEach(el => {
            el.remove();
        });
    }
});

// Professional performance monitoring
window.addEventListener('load', () => {
    const loadTime = performance.now();
    console.log(`AAI LMS loaded in ${loadTime.toFixed(2)}ms`);
    
    // Track if load time exceeds professional standards (3 seconds)
    if (loadTime > 3000) {
        console.warn('AAI LMS: Load time exceeds professional standards. Consider optimization.');
    }
});

// Export for module usage
if (typeof window !== 'undefined') {
    // @ts-ignore
    window.AAI_Core = AAI_Core;
}
