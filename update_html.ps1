$content = [System.IO.File]::ReadAllText('index.html')

$targetCards = '                <div class="web-card" data-animate="zoom-in" style="transition-delay: 0.3s;">
                    <div class="web-icon"><i class="fa-solid fa-plug"></i></div>
                    <h3>API Integrations</h3>
                    <p>Connecting your systems for better data flow and efficiency.</p>
                </div>
            </div>
        </div>
    </section>'

$newCards = '                <div class="web-card" data-animate="zoom-in" style="transition-delay: 0.3s;">
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
    </section>'

$targetHeaderLogo = '<a href="#" class="logo">HOPEPITOME</a>'
$newHeaderLogo = '<a href="#" class="site-logo">
                <div class="logo-main">HopEpitome.</div>
                <div class="logo-sub">Strategics</div>
            </a>'

$targetFooterLogo = '<div class="footer-logo">HOPEPITOME</div>'
$newFooterLogo = '<div class="footer-logo">
                <a href="#" class="site-logo footer-site-logo">
                    <div class="logo-main">HopEpitome.</div>
                    <div class="logo-sub">Strategics</div>
                </a>
            </div>'

$content = $content.Replace($targetCards, $newCards)
$content = $content.Replace($targetHeaderLogo, $newHeaderLogo)
$content = $content.Replace($targetFooterLogo, $newFooterLogo)

[System.IO.File]::WriteAllText('index.html', $content)