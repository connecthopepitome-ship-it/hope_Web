import os

with open('index.html', 'r', encoding='utf-8') as f:
    html = f.read()

target_str = '''                <div class="web-card" data-animate="zoom-in" style="transition-delay: 0.3s;">
                    <div class="web-icon"><i class="fa-solid fa-plug"></i></div>
                    <h3>API Integrations</h3>
                    <p>Connecting your systems for better data flow and efficiency.</p>
                </div>
            </div>
        </div>
    </section>'''

new_str = '''                <div class="web-card" data-animate="zoom-in" style="transition-delay: 0.3s;">
                    <div class="web-icon"><i class="fa-solid fa-plug"></i></div>
                    <h3>API Integrations</h3>
                    <p>Connecting your systems for better data flow and efficiency.</p>
                </div>
                <!-- New Services -->
                <div class="web-card" data-animate="zoom-in" style="transition-delay: 0.4s;">
                    <div class="web-icon"><i class="fa-brands fa-instagram"></i></div>
                    <h3>LinkedIn & Instagram Handling</h3>
                    <p>Building your online authority through targeted social management.</p>
                </div>
                <div class="web-card" data-animate="zoom-in" style="transition-delay: 0.5s;">
                    <div class="web-icon"><i class="fa-solid fa-bullhorn"></i></div>
                    <h3>Marketing Content Management</h3>
                    <p>Strategic content creation and distribution to drive continuous growth.</p>
                </div>
            </div>
        </div>
    </section>'''

# Normalize line endings for replacement mapping
target_str = target_str.replace('\n', '\r\n')
new_str = new_str.replace('\n', '\r\n')

html = html.replace(target_str, new_str)

# Logo replacements
target_header_logo = '<a href="#" class="logo">HOPEPITOME</a>'
new_header_logo = '''<a href="#" class="site-logo">
                <div class="logo-main">HopEpitome.</div>
                <div class="logo-sub">Strategics</div>
            </a>'''
new_header_logo = new_header_logo.replace('\n', '\r\n')
html = html.replace(target_header_logo, new_header_logo)

target_footer_logo = '<div class="footer-logo">HOPEPITOME</div>'
new_footer_logo = '''<div class="footer-logo">
                <a href="#" class="site-logo footer-site-logo">
                    <div class="logo-main">HopEpitome.</div>
                    <div class="logo-sub">Strategics</div>
                </a>
            </div>'''
new_footer_logo = new_footer_logo.replace('\n', '\r\n')
html = html.replace(target_footer_logo, new_footer_logo)

with open('index.html', 'w', encoding='utf-8') as f:
    f.write(html)