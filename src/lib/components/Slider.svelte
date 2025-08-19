<script lang="ts">
  let index = 0;
  const numSlides = 15;
  const next = () => (index = Math.min(index + 1, numSlides - 1));
  const prev = () => (index = Math.max(index - 1, 0));

  let startX = 0;
  function onStart(e: MouseEvent | TouchEvent) {
    startX = 'touches' in e ? e.touches[0].clientX : (e as MouseEvent).clientX;
  }
  function onEnd(e: MouseEvent | TouchEvent) {
    const clientX = 'changedTouches' in e ? e.changedTouches[0].clientX : (e as MouseEvent).clientX;
    const dx = clientX - startX;
    if (dx < -40) next();
    if (dx > 40) prev();
  }
  function onKey(e: KeyboardEvent) {
    if (e.key === 'ArrowRight') next();
    if (e.key === 'ArrowLeft') prev();
  }
  // Rotate background gradient variants per slide using the same color palette
  const gradientBackgroundVariants: string[] = [
    // Variant A — like screenshot 1: bottom-left sweep + strong top-right glow
    'bg-[linear-gradient(200deg,transparent_0%,transparent_36%,hsl(var(--glow-eucalyptus)/0.16)_52%,transparent_78%),radial-gradient(900px_650px_at_88%_18%,hsl(var(--glow-cyan)/0.35)_0%,transparent_62%)]',
    // Variant B — like screenshot 2: pronounced top-right circular glow
    'bg-[radial-gradient(850px_700px_at_86%_18%,hsl(var(--glow-teal)/0.38)_0%,transparent_62%)]',
    // Variant C — mirrored: strong bottom-left glow with subtle diagonal fade
    'bg-[radial-gradient(900px_700px_at_12%_82%,hsl(var(--glow-eucalyptus)/0.30)_0%,transparent_60%),linear-gradient(145deg,hsl(var(--glow-cyan)/0.12)_0%,transparent_38%)]',
    // Variant D — elongated ellipse from right edge
    'bg-[radial-gradient(1100px_700px_at_95%_35%,hsl(var(--glow-teal)/0.28)_0%,transparent_70%)]',
  ];

  $: gradientBackgroundClass = gradientBackgroundVariants[index % gradientBackgroundVariants.length];
</script>

<svelte:window on:keydown={onKey} />

<section class="relative h-[100svh] w-full overflow-hidden bg-black text-white" aria-label="Slides">
  <!-- Swipe detector overlay (behind controls) -->
  <div class="absolute inset-0 z-0" on:pointerdown={onStart} on:touchstart={onStart} on:pointerup={onEnd} on:touchend={onEnd} aria-hidden="true"></div>
  <!-- Ambient color glows -->
  <div class="pointer-events-none absolute inset-0">
    <!-- Variant background pattern -->
    <div class={"absolute inset-0 opacity-100 filter saturate-150 " + gradientBackgroundClass}></div>
    <!-- Eucalyptus / Teal glows -->
    <div class="absolute -left-24 -top-24 h-80 w-80 rounded-full blur-3xl" style="background-color:hsl(var(--glow-eucalyptus)/0.55)"></div>
    <div class="absolute -right-24 -top-24 h-96 w-96 rounded-full blur-3xl" style="background-color:hsl(var(--glow-teal)/0.65)"></div>
    <div class="absolute -right-10 bottom-[-80px] h-72 w-72 rounded-full blur-3xl" style="background-color:hsl(var(--glow-cyan)/0.55)"></div>
    <div class="absolute -left-10 bottom-[-80px] h-72 w-72 rounded-full blur-3xl" style="background-color:hsl(var(--glow-teal)/0.45)"></div>
    <!-- Vignette -->
    <div class="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(0,0,0,0.60)_55%,rgba(0,0,0,0.85)_85%)]"></div>
  </div>

  

  <!-- Navigation hints - symmetrical on both sides -->
  <div class="absolute top-4 left-6 text-xs text-white/50 z-10 pointer-events-none hidden sm:block">
    ← Click right to go back
  </div>
  <div class="absolute top-4 right-6 text-xs text-white/50 z-10 pointer-events-none hidden sm:block">
    Click right to go forward →
  </div>

  <!-- Wordmark - Inline with nav hints, centered -->
  <div class="absolute top-4 left-1/2 transform -translate-x-1/2 z-10 pointer-events-none">
    <img src="/saas-for-agencies-slides/startino-wordmark.png" alt="Startino" class="h-6 sm:h-8 w-auto opacity-90" />
  </div>

  <div class="relative mx-auto flex h-full w-full max-w-7xl items-start justify-start sm:items-center sm:justify-center pt-16 px-4 pb-24 sm:p-6 lg:p-12 sm:pb-0 overflow-y-auto overscroll-y-contain">
    {#if index === 0}
      <article class="w-full max-w-5xl text-left">
        <h1 class="mb-6 text-3xl font-extrabold leading-tight tracking-tight sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl">Scale Your Agency with a SaaS</h1>
        <div class="prose-measure space-y-4 text-base leading-snug text-white/90 sm:text-lg md:text-xl lg:text-2xl">
          <p><strong>We build & Monetise (AI) SaaS for Digital Agencies (doing $1M+/yr)</strong></p>
          <p>Whether to sell to other agencies (white-label) or productize your services and sell directly to customers.</p>
        </div>
      </article>
    {:else if index === 1}
      <article class="w-full max-w-5xl text-left">
        <h1 class="mb-6 text-2xl font-extrabold leading-tight tracking-tight sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl">Your Agency's Problem</h1>
        <div class="space-y-6">
          <div class="grid gap-6 md:grid-cols-1 lg:grid-cols-1">
            <div class="rounded-xl bg-zinc-800/60 p-4 sm:p-6 backdrop-blur-sm border border-zinc-700/50">
              <div class="flex items-center">
                <span class="mr-3 text-xl sm:text-2xl">👨‍💼</span>
                <p class="text-sm sm:text-base md:text-lg text-white/90">75% of your revenue depends on YOU being involved in every project</p>
              </div>
            </div>
            <div class="rounded-xl bg-zinc-800/60 p-4 sm:p-6 backdrop-blur-sm border border-zinc-700/50">
              <div class="flex items-center">
                <span class="mr-3 text-xl sm:text-2xl">💸</span>
                <p class="text-sm sm:text-base md:text-lg text-white/90">Your team spends 40+ hours/week (costing you $8,000+/mo) on repetitive, manual tasks</p>
              </div>
            </div>
            <div class="rounded-xl bg-zinc-800/60 p-4 sm:p-6 backdrop-blur-sm border border-zinc-700/50">
              <div class="flex items-center">
                <span class="mr-3 text-xl sm:text-2xl">📉</span>
                <p class="text-sm sm:text-base md:text-lg text-white/90">Your agency valuation multiple is capped at 1–2x revenue due to service-heavy operations</p>
              </div>
            </div>
            <div class="rounded-xl bg-zinc-800/60 p-4 sm:p-6 backdrop-blur-sm border border-zinc-700/50">
              <div class="flex items-center">
                <span class="mr-3 text-xl sm:text-2xl">💤</span>
                <p class="text-sm sm:text-base md:text-lg text-white/90">No passive income — revenue resets monthly; SaaS compounds with MRR</p>
              </div>
            </div>

          </div>
        </div>
      </article>
    {:else if index === 2}
      <article class="w-full max-w-5xl text-left">
        <h1 class="mb-6 text-2xl font-extrabold leading-tight tracking-tight sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl">The New Opportunity</h1>
        <div class="mb-8">
          <h2 class="text-lg sm:text-xl md:text-2xl text-white/90 mb-6">In two years, the only agencies left standing will be those offering clients their own proprietary SaaS tools. Everyone else will become a reseller for someone else's software.</h2>
        </div>
        <div class="space-y-6">
          <div class="grid gap-4 sm:gap-6 grid-cols-1 md:grid-cols-2">
            <div class="rounded-xl bg-zinc-800/60 p-4 sm:p-6 backdrop-blur-sm border border-zinc-700/50">
              <div class="flex items-center">
                <span class="mr-3 text-xl sm:text-2xl">✅</span>
                <p class="text-sm sm:text-base md:text-lg text-white/90">Create a new recurring income stream</p>
              </div>
            </div>
            <div class="rounded-xl bg-zinc-800/60 p-4 sm:p-6 backdrop-blur-sm border border-zinc-700/50">
              <div class="flex items-center">
                <span class="mr-3 text-xl sm:text-2xl">✅</span>
                <p class="text-sm sm:text-base md:text-lg text-white/90">Build a long‑term product asset your clients rely on</p>
              </div>
            </div>
            <div class="rounded-xl bg-zinc-800/60 p-4 sm:p-6 backdrop-blur-sm border border-zinc-700/50">
              <div class="flex items-center">
                <span class="mr-3 text-xl sm:text-2xl">✅</span>
                <p class="text-sm sm:text-base md:text-lg text-white/90">Automate delivery and operations end‑to‑end</p>
              </div>
            </div>
            <div class="rounded-xl bg-zinc-800/60 p-4 sm:p-6 backdrop-blur-sm border border-zinc-700/50">
              <div class="flex items-center">
                <span class="mr-3 text-xl sm:text-2xl">✅</span>
                <p class="text-sm sm:text-base md:text-lg text-white/90">Increase enterprise value and valuation multiple</p>
              </div>
            </div>
          </div>
        </div>
      </article>
    {:else if index === 3}
      <article class="w-full max-w-5xl text-left">
        <h1 class="mb-4 sm:mb-6 text-2xl font-extrabold leading-tight tracking-tight sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl">What We Want to Achieve</h1>
        <div class="text-base sm:text-lg leading-snug text-white/90 mb-4 sm:mb-6">
          <p class="mb-4 text-sm opacity-80">(not our case-studies) - <a href="https://www.davidhart.io/newsletter/agencies-who-switched-to-saas" class="text-white underline hover:no-underline" target="_blank">source</a></p>
        </div>
        
        <!-- MarketFlow Digital Case Study -->
        <div class="rounded-xl bg-zinc-800/60 p-4 sm:p-8 backdrop-blur-sm border border-zinc-700/50">
          <div class="flex items-center mb-4">
            <div>
              <h3 class="text-xl sm:text-2xl lg:text-3xl font-bold text-white">MarketFlow Digital</h3>
              <p class="text-white/80 text-sm sm:text-base lg:text-lg">$120k/Month Agency</p>
            </div>
          </div>
          <div class="grid gap-3 sm:gap-4 md:grid-cols-2">
            <div>
              <h4 class="font-semibold mb-2 text-white text-base sm:text-lg md:text-xl">Challenge:</h4>
              <p class="text-white/90 mb-3 sm:mb-4 md:text-lg">Manual campaign management eating 70% of team capacity</p>
              <h4 class="font-semibold mb-2 text-white text-base sm:text-lg md:text-xl">Solution:</h4>
              <p class="text-white/90 md:text-lg">Custom marketing automation SaaS with client self-service portals</p>
            </div>
            <div>
              <h4 class="font-semibold mb-2 text-white text-base sm:text-lg md:text-xl">Results:</h4>
              <ul class="space-y-2 text-white/90 md:text-lg">
                <li>• <strong>$480k</strong> additional annual revenue from SaaS subscriptions</li>
                <li>• <strong>65%</strong> reduction in manual campaign tasks</li>
                <li>• Staff productivity increased <strong>250%</strong> allowing focus on strategy</li>
              </ul>
            </div>
          </div>
        </div>
      </article>
    {:else if index === 4}
      <article class="w-full max-w-5xl text-left">
        <h1 class="mb-4 sm:mb-6 text-2xl font-extrabold leading-tight tracking-tight sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl">What We Want to Achieve</h1>
        <div class="text-base sm:text-lg leading-snug text-white/90 mb-4 sm:mb-6">
          <p class="mb-4 text-sm opacity-80">(not our case-studies) - <a href="https://www.davidhart.io/newsletter/agencies-who-switched-to-saas" class="text-white underline hover:no-underline" target="_blank">source</a></p>
        </div>
        
        <!-- GrowthLab Agency Case Study -->
        <div class="rounded-xl bg-zinc-800/60 p-4 sm:p-8 backdrop-blur-sm border border-zinc-700/50">
          <div class="flex items-center mb-4">
            <div>
              <h3 class="text-xl sm:text-2xl lg:text-3xl font-bold text-white">GrowthLab Agency</h3>
              <p class="text-white/80 text-sm sm:text-base lg:text-lg">$95k/Month Agency</p>
            </div>
          </div>
          <div class="grid gap-3 sm:gap-4 md:grid-cols-2">
            <div>
              <h4 class="font-semibold mb-2 text-white text-base sm:text-lg md:text-xl">Challenge:</h4>
              <p class="text-white/90 mb-3 sm:mb-4 md:text-lg">Clients demanding real-time reporting and advanced analytics</p>
              <h4 class="font-semibold mb-2 text-white text-base sm:text-lg md:text-xl">Solution:</h4>
              <p class="text-white/90 md:text-lg">White-label analytics platform with automated reporting</p>
            </div>
            <div>
              <h4 class="font-semibold mb-2 text-white text-base sm:text-lg md:text-xl">Results:</h4>
              <ul class="space-y-2 text-white/90 md:text-lg">
                <li>• <strong>$350k</strong> new ARR within 12 months of launch</li>
                <li>• Client churn reduced by <strong>55%</strong> due to superior tool value</li>
                <li>• <strong>3.2x</strong> agency valuation increase when sold 18 months later</li>
              </ul>
            </div>
          </div>
        </div>
      </article>
    {:else if index === 5}
      <article class="w-full max-w-5xl text-left">
        <h1 class="mb-6 text-2xl font-extrabold leading-tight tracking-tight sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl">Why You?</h1>
        
        <div class="prose-measure space-y-4 text-lg leading-snug text-white/90 sm:text-xl lg:text-2xl">
          <p>Your domain expertise + our SaaS expertise (engineering + marketing) = A market-ready product that solves real problems, retains clients, and generates recurring revenue — faster than either of us could do alone.</p>
        </div>
      </article>
    {:else if index === 6}
      <article class="w-full max-w-5xl text-left">
        <h1 class="mb-6 text-2xl font-extrabold leading-tight tracking-tight sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl">Why You?</h1>
        
        <div class="grid gap-4 sm:gap-6 grid-cols-1 md:grid-cols-2">
          <!-- You bring -->
          <div class="rounded-xl bg-zinc-800/60 p-4 sm:p-6 backdrop-blur-sm border border-zinc-700/50">
            <div class="mb-4 flex items-center">
              <span class="mr-3 text-2xl sm:text-3xl">👑</span>
              <h3 class="text-xl sm:text-2xl font-bold text-white">You bring:</h3>
            </div>
            <ul class="space-y-3 text-white/90">
              <li class="flex items-start">
                <span class="mr-2 mt-1 text-white/60">•</span>
                <span>First-hand knowledge of your market, clients, and pain points</span>
              </li>
              <li class="flex items-start">
                <span class="mr-2 mt-1 text-white/60">•</span>
                <span>Proven service processes that have generated $80k+/month in revenue</span>
              </li>
              <li class="flex items-start">
                <span class="mr-2 mt-1 text-white/60">•</span>
                <span>First batch of users from your existing clientele (<strong>super</strong> valuable)</span>
              </li>
            </ul>
          </div>

          <!-- We bring -->
          <div class="rounded-xl bg-zinc-800/60 p-4 sm:p-6 backdrop-blur-sm border border-zinc-700/50">
            <div class="mb-4 flex items-center">
              <span class="mr-3 text-2xl sm:text-3xl">⚡</span>
              <h3 class="text-xl sm:text-2xl font-bold text-white">We bring:</h3>
            </div>
            <ul class="space-y-3 text-white/90">
              <li class="flex items-start">
                <span class="mr-2 mt-1 text-white/60">•</span>
                <span>7+ years per engineer in programming experience</span>
              </li>
              <li class="flex items-start">
                <span class="mr-2 mt-1 text-white/60">•</span>
                <span>2+ years in the SaaS industry, learning and building - <a href="https://www.starti.no/projects" class="text-white underline hover:no-underline">checkout our projects</a> (old website)</span>
              </li>
            </ul>
          </div>
        </div>
      </article>
    {:else if index === 7}
      <!-- Project Showcase Slide -->
      <article class="w-full max-w-5xl text-left">
        <h1 class="mb-6 text-2xl font-extrabold leading-tight tracking-tight sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl">Our Top Projects</h1>
        
        <div class="grid gap-6 grid-cols-1 md:grid-cols-3">
          <!-- Reletino -->
          <div class="rounded-xl bg-zinc-800/60 p-6 backdrop-blur-sm border border-zinc-700/50">
            <div class="flex items-center mb-4">
              <img src="/saas-for-agencies-slides/reletino-logo.png" alt="Reletino" class="h-12 w-12 mr-4 rounded-lg" />
              <div>
                <h3 class="text-lg sm:text-xl font-bold text-white">Reletino</h3>
                <p class="text-white/80 text-xs sm:text-sm">Lead Generation SaaS</p>
              </div>
            </div>
            <p class="text-white/90 mb-4 text-sm">Brings leads straight to agencies from Reddit, in real-time using AI agents.</p>
            <div class="text-white/70 text-sm mb-3">
              <p>• Real-time lead detection</p>
              <p>• AI-powered filtering</p>
              <p>• Automated outreach</p>
            </div>
            <a href="https://www.starti.no/projects/reletino" class="text-blue-400 hover:text-blue-300 text-xs underline" target="_blank">View Case Study →</a>
          </div>

          <!-- Aitino -->
          <div class="rounded-xl bg-zinc-800/60 p-6 backdrop-blur-sm border border-zinc-700/50">
            <div class="flex items-center mb-4">
              <img src="/saas-for-agencies-slides/aitino-logo.png" alt="Aitino" class="h-12 w-12 mr-4 rounded-lg" />
              <div>
                <h3 class="text-lg sm:text-xl font-bold text-white">Aitino</h3>
                <p class="text-white/80 text-xs sm:text-sm">Multi-Agent AI Platform</p>
              </div>
            </div>
            <p class="text-white/90 mb-4 text-sm">Platform for creating multi-agent AI teams that collaborate to solve complex tasks.</p>
            <div class="text-white/70 text-sm mb-3">
              <p>• Visual agent builder</p>
              <p>• Team collaboration</p>
              <p>• Drag-and-drop interface</p>
            </div>
            <a href="https://www.starti.no/projects/aitino" class="text-blue-400 hover:text-blue-300 text-xs underline" target="_blank">View Case Study →</a>
          </div>

          <!-- Third Project -->
          <div class="rounded-xl bg-zinc-800/60 p-6 backdrop-blur-sm border border-zinc-700/50">
            <div class="flex items-center mb-4">
              <div class="h-12 w-12 mr-4 rounded-lg bg-zinc-700/60 flex items-center justify-center">
                <span class="text-2xl">🚀</span>
              </div>
              <div>
                <h3 class="text-lg sm:text-xl font-bold text-white">MyChance.ai</h3>
                <p class="text-white/80 text-xs sm:text-sm">College Admissions AI</p>
              </div>
            </div>
            <p class="text-white/90 mb-4 text-sm">AI-powered platform helping students discover best-fit universities and improve admission odds.</p>
            <div class="text-white/70 text-sm mb-3">
              <p>• University matching</p>
              <p>• Admissions analytics</p>
              <p>• Case study coming soon</p>
            </div>
            <span class="text-gray-500 text-xs">Case Study URL WIP</span>
          </div>
        </div>
      </article>
    {:else if index === 8}
      <!-- Testimonials Slide -->
      <article class="w-full max-w-5xl text-left">
        <h1 class="mb-6 text-2xl font-extrabold leading-tight tracking-tight sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl">What Our Clients Say</h1>
        
        <div class="grid gap-6 grid-cols-1 md:grid-cols-2">
          <!-- Testimonial 1 -->
          <div class="rounded-xl bg-zinc-800/60 p-6 backdrop-blur-sm border border-zinc-700/50">
            <div class="flex items-center mb-4">
              <div class="h-12 w-12 mr-4 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                <span class="text-white font-bold text-lg">JD</span>
              </div>
              <div>
                <h3 class="text-lg font-bold text-white">John Davis</h3>
                <p class="text-white/80 text-sm">CEO, DigitalFlow Agency</p>
              </div>
            </div>
            <p class="text-white/90 italic mb-4">"Startino transformed our agency from manual chaos to automated efficiency. Our SaaS platform now generates $40k MRR and our team productivity increased by 200%. Best investment we've ever made."</p>
            <div class="flex text-yellow-400">
              <span>★★★★★</span>
            </div>
          </div>

          <!-- Testimonial 2 -->
          <div class="rounded-xl bg-zinc-800/60 p-6 backdrop-blur-sm border border-zinc-700/50">
            <div class="flex items-center mb-4">
              <div class="h-12 w-12 mr-4 rounded-full bg-gradient-to-br from-green-500 to-teal-600 flex items-center justify-center">
                <span class="text-white font-bold text-lg">SM</span>
              </div>
              <div>
                <h3 class="text-lg font-bold text-white">Sarah Miller</h3>
                <p class="text-white/80 text-sm">Founder, GrowthHack Solutions</p>
              </div>
            </div>
            <p class="text-white/90 italic mb-4">"The custom SaaS platform Jorge and his team built for us eliminated 60 hours of manual work per week. We went from 8 clients to 25 clients with the same team size. Incredible ROI."</p>
            <div class="flex text-yellow-400">
              <span>★★★★★</span>
            </div>
          </div>
        </div>

        <!-- Call to Action -->
        <div class="mt-8 text-center">
          <p class="text-white/80 text-lg">Ready to join our success stories?</p>
        </div>
      </article>
    {:else if index === 9}
      <article class="w-full max-w-5xl text-left">
        <h1 class="mb-6 text-2xl font-extrabold leading-tight tracking-tight sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl">Your ROI Projection</h1>
        
        <div class="text-left space-y-6">
          <p class="text-base sm:text-lg md:text-xl text-white/90 leading-relaxed">We can't guarantee exact revenue, but we can guarantee insane efficiency gains — your team is already leaking ~$8,000+/mo in automatable tasks. That's $100+,000/year back in capacity, without a single new client.</p>
          <p class="text-base sm:text-lg md:text-xl text-white/90 leading-relaxed">And while efficiency pays for the project on its own, the real upside is in SaaS revenue and enterprise value multiples.</p>
        </div>
      </article>
    {:else if index === 10}
      <article class="w-full max-w-5xl text-left">
        <h1 class="mb-6 text-2xl font-extrabold leading-tight tracking-tight sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl">Your ROI Projection</h1>

        <div class="space-y-4">
          <!-- Efficiency Gains -->
          <div class="rounded-xl bg-zinc-800/60 p-4 sm:p-6 backdrop-blur-sm border border-zinc-700/50">
            <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div class="flex items-center">
                <span class="mr-3 sm:mr-4 text-2xl sm:text-3xl">⚡</span>
                <div>
                  <h3 class="text-lg sm:text-xl font-bold text-white">Efficiency Gains</h3>
                  <p class="text-sm sm:text-base text-white/80">Saved in staff time and overhead</p>
                </div>
              </div>
              <div class="text-xl sm:text-2xl font-bold text-white text-center sm:text-right">~$100,000</div>
            </div>
          </div>

          <!-- SaaS Revenue -->
          <div class="rounded-xl bg-zinc-800/60 p-4 sm:p-6 backdrop-blur-sm border border-zinc-700/50">
            <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div class="flex items-center">
                <span class="mr-3 sm:mr-4 text-2xl sm:text-3xl">💰</span>
                <div>
                  <h3 class="text-lg sm:text-xl font-bold text-white">First-Year SaaS Revenue</h3>
                  <p class="text-sm sm:text-base text-white/80">Conservative projection</p>
                </div>
              </div>
              <div class="text-xl sm:text-2xl font-bold text-white text-center sm:text-right">~$72,000</div>
            </div>
          </div>

          <!-- Total Impact -->
          <div class="rounded-xl bg-zinc-800/60 p-4 sm:p-6 backdrop-blur-sm border border-zinc-700/50">
            <div class="text-center flex flex-col items-center justify-center">
              <div class="mb-3 sm:mb-4 text-3xl sm:text-4xl">🚀</div>
              <h3 class="text-2xl sm:text-3xl font-bold text-white mb-2">$172,000 First Year Impact</h3>
              <p class="text-base sm:text-lg text-white/90 mb-3 sm:mb-4">On a $45,000 investment</p>
              <div class="text-lg sm:text-xl font-bold text-white">Payback Period: 4–6 months from efficiency gains <u>alone</u></div>
            </div>
          </div>
        </div>
      </article>
    {:else if index === 11}
      <article class="w-full max-w-5xl text-left">
        <h1 class="mb-6 text-2xl font-extrabold leading-tight tracking-tight sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl">Path to SaaS Success</h1>
        
        <div class="space-y-4">
          <!-- Phase 1 -->
          <div class="rounded-xl bg-zinc-800/60 p-4 backdrop-blur-sm border border-zinc-700/50">
            <div class="flex items-center mb-3">
              <div class="mr-3 flex h-10 w-10 items-center justify-center rounded-full bg-zinc-700">
                <span class="text-lg font-bold text-white">1</span>
              </div>
              <div>
                <h3 class="text-xl font-bold text-white">Strategic Discovery</h3>
                <p class="text-white/80 text-sm">Week 1</p>
              </div>
            </div>
            <div class="ml-13">
              <p class="text-white/90 text-sm">Deep-dive analysis, profit optimization audit, custom SaaS blueprint, and ROI projection</p>
            </div>
          </div>

          <!-- Phase 2 -->
          <div class="rounded-xl bg-zinc-800/60 p-4 backdrop-blur-sm border border-zinc-700/50">
            <div class="flex items-center mb-3">
              <div class="mr-3 flex h-10 w-10 items-center justify-center rounded-full bg-zinc-700">
                <span class="text-lg font-bold text-white">2</span>
              </div>
              <div>
                <h3 class="text-xl font-bold text-white">MVP Development</h3>
                <p class="text-white/80 text-sm">Week 2-5</p>
              </div>
            </div>
            <div class="ml-13">
              <p class="text-white/90 text-sm">Core SaaS platform built (you won't get this speed anywhere else 😉)</p>
            </div>
          </div>

          <!-- Phase 3 -->
          <div class="rounded-xl bg-zinc-800/60 p-4 backdrop-blur-sm border border-zinc-700/50">
            <div class="flex items-center mb-3">
              <div class="mr-3 flex h-10 w-10 items-center justify-center rounded-full bg-zinc-700">
                <span class="text-lg font-bold text-white">3</span>
              </div>
              <div>
                <h3 class="text-xl font-bold text-white">Launch & Scale</h3>
                <p class="text-white/80 text-sm">Week 5-10</p>
              </div>
            </div>
            <div class="ml-13">
              <p class="text-white/90 text-sm">Pilot testing, user feedback iterations, go-to-market strategy, and team training</p>
            </div>
          </div>
        </div>
      </article>
    {:else if index === 12}
      <article class="w-full max-w-5xl text-center">
        <h1 class="mb-6 text-2xl font-extrabold leading-tight tracking-tight sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl">Secure Your SaaS Development</h1>
        
        <div class="flex justify-center px-4">
          <div class="rounded-xl bg-zinc-800/60 p-6 sm:p-8 backdrop-blur-sm border border-zinc-700/50 max-w-2xl w-full">
            <div class="text-center flex flex-col items-center justify-center">
              <div class="mb-4 sm:mb-6 text-4xl sm:text-5xl">⏰</div>
              <h3 class="text-2xl sm:text-3xl font-bold text-white mb-4 sm:mb-6">Only 2 Spots Available This Quarter</h3>
              <p class="text-base sm:text-lg text-white/90 leading-relaxed">Due to our hands-on approach and commitment to quality, we limit ourselves to 2 agency SaaS projects per quarter. We are extremely picky with who we choose to work with to increase the chances of success.</p>
            </div>
          </div>
        </div>
      </article>
    {:else if index === 13}
      <article class="w-full max-w-5xl text-left">
        <h1 class="mb-6 text-2xl font-extrabold leading-tight tracking-tight sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl">Your SaaS Investment Breakdown</h1>
        
        <div class="mb-8 rounded-xl bg-zinc-800/60 py-8 px-6 backdrop-blur-sm border border-zinc-700/50">
          <div class="text-center">
            <div class="text-2xl sm:text-3xl md:text-4xl font-bold text-white">$45,000 + 3% revenue share</div>
          </div>
        </div>

        <div class="grid gap-4 grid-cols-1 sm:grid-cols-2">
          <div class="rounded-xl bg-zinc-800/60 p-4 backdrop-blur-sm border border-zinc-700/50">
            <div class="flex items-center">
              <span class="mr-3 text-xl">🤖</span>
              <span class="font-semibold">Custom SaaS platform (AI features included)</span>
            </div>
          </div>
          <div class="rounded-xl bg-zinc-800/60 p-4 backdrop-blur-sm border border-zinc-700/50">
            <div class="flex items-center">
              <span class="mr-3 text-xl">🔗</span>
              <span class="font-semibold">Client portal integration streamlining operations</span>
            </div>
          </div>
          <div class="rounded-xl bg-zinc-800/60 p-4 backdrop-blur-sm border border-zinc-700/50">
            <div class="flex items-center">
              <span class="mr-3 text-xl">⚡</span>
              <span class="font-semibold">Automation workflows eliminating manual tasks</span>
            </div>
          </div>
          <div class="rounded-xl bg-zinc-800/60 p-4 backdrop-blur-sm border border-zinc-700/50">
            <div class="flex items-center">
              <span class="mr-3 text-xl">🔄</span>
              <span class="font-semibold">3 months of iterating and refining the product after initial build</span>
            </div>
          </div>
        </div>
      </article>
    {:else if index === 14}
      <article class="w-full max-w-5xl text-left">
        <h1 class="mb-6 text-2xl font-extrabold leading-tight tracking-tight sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl">Let's fucking do this.</h1>
        
        <div class="mb-8 text-left">
          <p class="text-base sm:text-lg md:text-xl text-white/90 leading-relaxed">Your competitors are already exploring SaaS solutions. The agencies that act first will dominate their markets while others struggle with manual processes and shrinking margins.</p>
        </div>

        <div class="grid gap-6 grid-cols-1 sm:grid-cols-2 max-w-4xl mx-auto">
          <!-- Book a Fit Call -->
          <div class="rounded-xl bg-zinc-800/60 p-6 sm:p-8 backdrop-blur-sm border border-zinc-700/50">
            <div class="text-center">
              <div class="mb-4 text-4xl sm:text-5xl">📅</div>
              <h3 class="text-xl sm:text-2xl font-bold text-white mb-4">Book a Fit Call</h3>
              <a href="https://cal.com/jorgelewis/15min" class="inline-block bg-white text-black px-6 py-3 rounded-lg font-semibold hover:bg-white/90 transition-colors" target="_blank">Schedule 15min Call</a>
            </div>
          </div>

          <!-- WhatsApp -->
          <div class="rounded-xl bg-zinc-800/60 p-6 sm:p-8 backdrop-blur-sm border border-zinc-700/50">
            <div class="text-center">
              <div class="mb-4 text-4xl sm:text-5xl">📱</div>
              <h3 class="text-xl sm:text-2xl font-bold text-white mb-4">Message me on WhatsApp</h3>
              <a href="https://wa.me/85297473013" class="inline-block bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors" target="_blank">Send WhatsApp</a>
            </div>
          </div>
        </div>
      </article>
    {/if}
  </div>

  <div class="absolute inset-x-0 bottom-6 flex items-center justify-center gap-2">
    {#each Array.from({ length: numSlides }) as _, i}
      <button class="h-2 w-2 rounded-full transition-colors"
              style:background-color={i===index ? 'white' : 'rgba(255,255,255,0.4)'}
              on:click={() => (index = i)} aria-label={`Go to slide ${i+1}`}></button>
    {/each}
  </div>

  <div class="pointer-events-none absolute inset-0 flex justify-between">
    <button type="button" class="pointer-events-auto h-full w-1/4" on:click={prev} aria-label="Previous slide"></button>
    <div class="w-1/2 pointer-events-none"></div>
    <button type="button" class="pointer-events-auto h-full w-1/4" on:click={next} aria-label="Next slide"></button>
  </div>
</section>



