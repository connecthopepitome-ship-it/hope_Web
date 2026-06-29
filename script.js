document.addEventListener('DOMContentLoaded', () => {
    // Mobile Menu Toggle
    const mobileMenuBtn = document.getElementById('mobile-menu');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    mobileMenuBtn.addEventListener('click', () => {
        mobileMenuBtn.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close menu when clicking a link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileMenuBtn.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // Navbar scroll effect
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(10, 14, 23, 0.95)';
            navbar.style.boxShadow = '0 5px 20px rgba(0,0,0,0.5)';
        } else {
            navbar.style.background = 'rgba(10, 14, 23, 0.8)';
            navbar.style.boxShadow = 'none';
        }
    });

    // Scroll Animation (Intersection Observer)
    const observerOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Optional: Stop observing once element is visible
                // observer.unobserve(entry.target); 
            }
        });
    }, observerOptions);

    const animatedElements = document.querySelectorAll('[data-animate]');
    animatedElements.forEach(el => observer.observe(el));

    // Parallax Effect for Hero
    const heroBg = document.querySelector('.hero-bg');
    window.addEventListener('scroll', () => {
        const scrollPosition = window.pageYOffset;
        if (heroBg && scrollPosition < 800) {
            heroBg.style.transform = `translateY(${scrollPosition * 0.5}px)`;
        }
    });

    // Parallax for floating cards
    const cards = document.querySelectorAll('.card-float');
    document.addEventListener('mousemove', (e) => {
        const x = (window.innerWidth - e.pageX * 2) / 100;
        const y = (window.innerHeight - e.pageY * 2) / 100;

        cards.forEach((card, index) => {
            const speed = (index + 1) * 2;
            card.style.transform = `translateX(${x * speed}px) translateY(${y * speed}px)`;
        });
    });
});

document.addEventListener('DOMContentLoaded', () => {
    // Resume Form Handling
    const resumeForm = document.getElementById('resumeForm');
    if (resumeForm) {
        const fileInput = document.getElementById('resumeFile');
        const dropArea = document.getElementById('dropArea');
        const fileNameDisplay = document.getElementById('fileNameDisplay');
        const submitBtn = document.getElementById('submitBtn');
        const formMessage = document.getElementById('formMessage');

        // File Drag & Drop Effects
        ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
            dropArea.addEventListener(eventName, preventDefaults, false);
        });

        function preventDefaults(e) {
            e.preventDefault();
            e.stopPropagation();
        }

        ['dragenter', 'dragover'].forEach(eventName => {
            dropArea.addEventListener(eventName, highlight, false);
        });

        ['dragleave', 'drop'].forEach(eventName => {
            dropArea.addEventListener(eventName, unhighlight, false);
        });

        function highlight() {
            dropArea.classList.add('dragover');
        }

        function unhighlight() {
            dropArea.classList.remove('dragover');
        }

        dropArea.addEventListener('drop', handleDrop, false);

        function handleDrop(e) {
            const dt = e.dataTransfer;
            const files = dt.files;
            fileInput.files = files;
            handleFiles(files);
        }

        fileInput.addEventListener('change', function () {
            handleFiles(this.files);
        });

        function handleFiles(files) {
            if (files.length > 0) {
                const file = files[0];
                const validTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'image/jpeg', 'image/png', 'image/jpg'];
                // Optional: Check file type logic if strict validation needed beyond accept attribute

                if (file.size > 5 * 1024 * 1024) {
                    showMessage("File size exceeds 5MB limit.", "error");
                    fileInput.value = "";
                    fileNameDisplay.textContent = "";
                    return;
                }
                fileNameDisplay.textContent = `Selected: ${file.name}`;
                formMessage.textContent = ""; // Clear previous errors
            }
        }

        // Form Submission
        resumeForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            if (!resumeForm.checkValidity()) {
                resumeForm.reportValidity();
                return;
            }

            const file = fileInput.files[0];
            if (!file) {
                showMessage("Please upload a resume file.", "error");
                return;
            }

            setLoading(true);

            try {
                const base64File = await toBase64(file);
                // Strip default data URL prefix to send raw base64
                const base64Data = base64File.split(',')[1] || base64File;

                const formData = new FormData(resumeForm);
                const payload = {
                    fullName: formData.get('fullName'),
                    email: formData.get('email'),
                    phone: formData.get('phone'),
                    location: formData.get('location'),
                    resumeType: formData.get('resumeType'),
                    experience: formData.get('experience'),
                    currentJobTitle: formData.get('currentJobTitle'),
                    currentCompany: formData.get('currentCompany'),
                    targetRole: formData.get('targetRole'),
                    industry: formData.get('industry'),
                    keySkills: formData.get('keySkills'),
                    achievements: formData.get('achievements'),
                    notes: formData.get('notes'),
                    file: base64Data,
                    fileName: file.name,
                    fileType: file.type,
                    revisionCount: 0
                };

                const WEBHOOK_URL = "https://script.google.com/macros/s/AKfycby0WausWHUf9GBAN9yasWIVypK5yV8mBjK1jqZz-ZmWDMh_HrNgaJPh5I42Luy2U0Zy1g/exec";

                // Use text/plain to avoid preflight issues with GAS
                const response = await fetch(WEBHOOK_URL, {
                    method: 'POST',
                    body: JSON.stringify(payload),
                    headers: {
                        "Content-Type": "text/plain;charset=utf-8",
                    },
                });

                const result = await response.json();

                if (result.status === "success") {
                    showMessage("Thank you! Your resume and details have been submitted successfully.", "success");
                    resumeForm.reset();
                    fileNameDisplay.textContent = "";
                    // Keep success message visible for at least 3 seconds
                    setTimeout(() => {
                        // Optional: Fade out or keep it? User said "Show... for at least 3 seconds"
                        // I'll leave it or clear it after a longer delay
                        formMessage.textContent = "";
                    }, 5000);
                } else {
                    showMessage("Upload failed. Please try again.", "error");
                }

            } catch (error) {
                console.error("Submission Error:", error);
                showMessage("Upload failed. Please try again.", "error");
            } finally {
                setLoading(false);
            }
        });

        function toBase64(file) {
            return new Promise((resolve, reject) => {
                const reader = new FileReader();
                reader.readAsDataURL(file);
                reader.onload = () => resolve(reader.result);
                reader.onerror = error => reject(error);
            });
        }

        function setLoading(isLoading) {
            if (isLoading) {
                submitBtn.disabled = true;
                submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Sending...';
                formMessage.textContent = "";
            } else {
                submitBtn.disabled = false;
                submitBtn.innerHTML = 'Submit Request';
            }
        }

        function showMessage(msg, type) {
            formMessage.textContent = msg;
            formMessage.className = 'form-message ' + (type === 'success' ? 'msg-success' : 'msg-error');
        }
    }
});

