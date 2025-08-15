<script lang="ts">
  let index = 0;
  const numSlides = 11;
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

  

  <!-- Navigation hints -->
  <div class="absolute top-4 left-6 text-xs text-white/50 z-10 pointer-events-none">
    {#if index > 0}
      ← Click here to go back
    {/if}
  </div>
  <div class="absolute top-4 right-6 text-xs text-white/50 z-10 pointer-events-none">
    {#if index < numSlides - 1}
      Click here to go forward →
    {/if}
  </div>

  <div class="relative mx-auto flex h-full w-full max-w-7xl items-center p-6 sm:p-12">
    {#if index === 0}
      <article class="w-full max-w-5xl text-left">
        <h1 class="mb-6 text-5xl font-extrabold leading-tight tracking-tight sm:text-7xl lg:text-8xl">Scale Your Agency with a SaaS</h1>
        <div class="prose-measure space-y-4 text-lg leading-snug text-white/90 sm:text-xl lg:text-2xl">
          <p><strong>We build (AI) SaaS for Digital Agencies (doing $1M+/yr)</strong></p>
          <p>Whether to sell to other agencies (white-label) or productize your services and sell directly to customers.</p>
        </div>
      </article>
    {:else if index === 1}
      <article class="w-full max-w-5xl text-left">
        <h1 class="mb-6 text-4xl font-extrabold leading-tight tracking-tight sm:text-6xl lg:text-7xl">Your Agency's Problem</h1>
        <div class="space-y-6">
          <div class="grid gap-6 md:grid-cols-1 lg:grid-cols-1">
            <div class="rounded-xl bg-zinc-800/60 p-6 backdrop-blur-sm border border-zinc-700/50">
              <div class="flex items-center">
                <span class="mr-3 text-2xl">👨‍💼</span>
                <p class="text-white/90">75% of your revenue depends on YOU being involved in every project</p>
              </div>
            </div>
            <div class="rounded-xl bg-zinc-800/60 p-6 backdrop-blur-sm border border-zinc-700/50">
              <div class="flex items-center">
                <span class="mr-3 text-2xl">💸</span>
                <p class="text-white/90"><strong>Your team spends 40+ hours/week (costing you $8,000+/mo) on repetitive, manual tasks</strong></p>
              </div>
            </div>
            <div class="rounded-xl bg-zinc-800/60 p-6 backdrop-blur-sm border border-zinc-700/50">
              <div class="flex items-center">
                <span class="mr-3 text-2xl">📉</span>
                <p class="text-white/90">Your agency valuation multiple is capped at 1–2x revenue due to service-heavy operations</p>
              </div>
            </div>
          </div>
        </div>
      </article>
    {:else if index === 2}
      <article class="w-full max-w-5xl text-left">
        <h1 class="mb-6 text-4xl font-extrabold leading-tight tracking-tight sm:text-6xl lg:text-7xl">The New Opportunity</h1>
        <div class="space-y-6">
          <div class="grid gap-6 md:grid-cols-2">
            <div class="rounded-xl bg-zinc-800/60 p-6 backdrop-blur-sm border border-zinc-700/50">
              <div class="flex items-center">
                <span class="mr-3 text-2xl">✅</span>
                <p class="text-white/90">Generate <strong>40% of revenue</strong> from recurring SaaS subscriptions</p>
              </div>
            </div>
            <div class="rounded-xl bg-zinc-800/60 p-6 backdrop-blur-sm border border-zinc-700/50">
              <div class="flex items-center">
                <span class="mr-3 text-2xl">✅</span>
                <p class="text-white/90">Save <strong>$250k+ annually</strong> through automation ($1M/yr sounds nice until you realize you actually only take home low 6 figures…)</p>
              </div>
            </div>
            <div class="rounded-xl bg-zinc-800/60 p-6 backdrop-blur-sm border border-zinc-700/50">
              <div class="flex items-center">
                <span class="mr-3 text-2xl">✅</span>
                <p class="text-white/90">Scale without hiring proportionally more staff</p>
              </div>
            </div>
            <div class="rounded-xl bg-zinc-800/60 p-6 backdrop-blur-sm border border-zinc-700/50">
              <div class="flex items-center">
                <span class="mr-3 text-2xl">✅</span>
                <p class="text-white/90">Command <strong>3-5x higher valuations</strong></p>
              </div>
            </div>
          </div>
          <div class="mt-8 rounded-xl bg-zinc-800/60 p-6 backdrop-blur-sm border border-zinc-700/50">
            <div class="flex items-center">
              <span class="mr-3 text-2xl">⚡</span>
              <p class="text-white/90 font-medium">In two years, the only agencies left standing will be those offering clients their own proprietary SaaS tools. Everyone else will become a reseller for someone else's software.</p>
            </div>
          </div>
        </div>
      </article>
    {:else if index === 3}
      <article class="w-full max-w-5xl text-left">
        <h1 class="mb-6 text-4xl font-extrabold leading-tight tracking-tight sm:text-6xl lg:text-7xl">What We Hope to Achieve With You</h1>
        <div class="text-lg leading-snug text-white/90 mb-6">
          <p class="mb-4 text-sm opacity-80">(not our case-studies) - <a href="https://www.davidhart.io/newsletter/agencies-who-switched-to-saas" class="text-white underline hover:no-underline" target="_blank">source</a></p>
        </div>
        
        <!-- MarketFlow Digital Case Study -->
        <div class="rounded-xl bg-zinc-800/60 p-8 backdrop-blur-sm border border-zinc-700/50">
          <div class="flex items-center mb-6">
            <span class="mr-4 text-4xl">🚀</span>
            <div>
              <h3 class="text-3xl font-bold text-white">MarketFlow Digital</h3>
              <p class="text-white/80 text-lg">$120k/Month Agency</p>
            </div>
          </div>
          <div class="grid gap-6 md:grid-cols-2">
            <div>
              <h4 class="font-semibold mb-3 text-white text-lg">Challenge:</h4>
              <p class="text-white/90 mb-6">Manual campaign management eating 70% of team capacity</p>
              <h4 class="font-semibold mb-3 text-white text-lg">Solution:</h4>
              <p class="text-white/90">Custom marketing automation SaaS with client self-service portals</p>
            </div>
            <div>
              <h4 class="font-semibold mb-3 text-white text-lg">Results:</h4>
              <ul class="space-y-2 text-white/90">
                <li>• <strong>$480k</strong> additional annual revenue from SaaS subscriptions</li>
                <li>• <strong>65%</strong> reduction in manual campaign tasks</li>
                <li>• <strong>40%</strong> higher client retention due to proprietary tools</li>
                <li>• Staff productivity increased <strong>250%</strong> allowing focus on strategy</li>
              </ul>
            </div>
          </div>
        </div>
      </article>
    {:else if index === 4}
      <article class="w-full max-w-5xl text-left">
        <h1 class="mb-6 text-4xl font-extrabold leading-tight tracking-tight sm:text-6xl lg:text-7xl">What We Hope to Achieve With You</h1>
        <div class="text-lg leading-snug text-white/90 mb-6">
          <p class="mb-4 text-sm opacity-80">(not our case-studies) - <a href="https://www.davidhart.io/newsletter/agencies-who-switched-to-saas" class="text-white underline hover:no-underline" target="_blank">source</a></p>
        </div>
        
        <!-- GrowthLab Agency Case Study -->
        <div class="rounded-xl bg-zinc-800/60 p-8 backdrop-blur-sm border border-zinc-700/50">
          <div class="flex items-center mb-6">
            <span class="mr-4 text-4xl">📊</span>
            <div>
              <h3 class="text-3xl font-bold text-white">GrowthLab Agency</h3>
              <p class="text-white/80 text-lg">$95k/Month Agency</p>
            </div>
          </div>
          <div class="grid gap-6 md:grid-cols-2">
            <div>
              <h4 class="font-semibold mb-3 text-white text-lg">Challenge:</h4>
              <p class="text-white/90 mb-6">Clients demanding real-time reporting and advanced analytics</p>
              <h4 class="font-semibold mb-3 text-white text-lg">Solution:</h4>
              <p class="text-white/90">White-label analytics platform with automated reporting</p>
            </div>
            <div>
              <h4 class="font-semibold mb-3 text-white text-lg">Results:</h4>
              <ul class="space-y-2 text-white/90">
                <li>• <strong>$350k</strong> new ARR within 12 months of launch</li>
                <li>• Client churn reduced by <strong>55%</strong> due to superior tool value</li>
                <li>• <strong>3.2x</strong> agency valuation increase when sold 18 months later</li>
                <li>• <strong>85%</strong> of clients upgraded to premium SaaS tiers</li>
              </ul>
            </div>
          </div>
        </div>
      </article>
    {:else if index === 5}
      <article class="w-full max-w-5xl text-left">
        <h1 class="mb-6 text-4xl font-extrabold leading-tight tracking-tight sm:text-6xl lg:text-7xl">Your SaaS Investment Breakdown</h1>
        
        <div class="mb-8 rounded-xl bg-zinc-800/60 p-6 backdrop-blur-sm border border-zinc-700/50">
          <div class="text-center mb-4">
            <div class="text-4xl font-bold text-white">$45,000 + 3% revenue share</div>
          </div>
        </div>

        <div class="grid gap-4 md:grid-cols-2">
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
              <span class="mr-3 text-xl">📱</span>
              <span class="font-semibold">Mobile-responsive design for all devices</span>
            </div>
          </div>
          <div class="rounded-xl bg-zinc-800/60 p-4 backdrop-blur-sm border border-zinc-700/50">
            <div class="flex items-center">
              <span class="mr-3 text-xl">🔒</span>
              <span class="font-semibold">Security & compliance meeting enterprise standards</span>
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
    {:else if index === 6}
      <article class="w-full max-w-5xl text-left">
        <h1 class="mb-6 text-4xl font-extrabold leading-tight tracking-tight sm:text-6xl lg:text-7xl">Why You?</h1>
        
        <div class="mb-6 text-left">
          <p class="text-lg text-white/90">Your domain expertise + our SaaS engineering = A market-ready product that solves real problems, retains clients, and generates recurring revenue — faster than either of us could do alone.</p>
        </div>

        <div class="grid gap-6 md:grid-cols-2">
          <!-- You bring -->
          <div class="rounded-xl bg-zinc-800/60 p-6 backdrop-blur-sm border border-zinc-700/50">
            <div class="mb-4 flex items-center">
              <span class="mr-3 text-3xl">👑</span>
              <h3 class="text-2xl font-bold text-white">You bring:</h3>
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
                <span>Industry credibility and relationships your competitors can't replicate</span>
              </li>
              <li class="flex items-start">
                <span class="mr-2 mt-1 text-white/60">•</span>
                <span>First batch of users from your existing clientele (<strong>super</strong> valuable)</span>
              </li>
            </ul>
          </div>

          <!-- We bring -->
          <div class="rounded-xl bg-zinc-800/60 p-6 backdrop-blur-sm border border-zinc-700/50">
            <div class="mb-4 flex items-center">
              <span class="mr-3 text-3xl">⚡</span>
              <h3 class="text-2xl font-bold text-white">We bring:</h3>
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
      <article class="w-full max-w-5xl text-left">
        <h1 class="mb-6 text-4xl font-extrabold leading-tight tracking-tight sm:text-6xl lg:text-7xl">Your ROI Projection</h1>
        
        <div class="mb-6 text-left">
          <p class="text-lg text-white/90">We can't guarantee exact revenue, but we can guarantee insane efficiency gains — your team is already leaking ~$8,000+/mo in automatable tasks. That's $100+,000/year back in capacity, without a single new client.</p>
          <p class="text-lg text-white/90 mt-4">And while efficiency pays for the project on its own, the real upside is in SaaS revenue and enterprise value multiples.</p>
        </div>

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
            <div class="text-center">
              <div class="mb-3 sm:mb-4 text-3xl sm:text-4xl">🚀</div>
              <h3 class="text-2xl sm:text-3xl font-bold text-white mb-2">$172,000 First Year Impact</h3>
              <p class="text-base sm:text-lg text-white/90 mb-3 sm:mb-4">On a $45,000 investment</p>
              <div class="text-lg sm:text-xl font-bold text-white">Payback Period: 4–6 months from efficiency gains <u>alone</u></div>
            </div>
          </div>
        </div>
      </article>
    {:else if index === 8}
      <article class="w-full max-w-5xl text-left">
        <h1 class="mb-6 text-4xl font-extrabold leading-tight tracking-tight sm:text-6xl lg:text-7xl">Path to SaaS Success</h1>
        
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
    {:else if index === 9}
      <article class="w-full max-w-5xl text-center">
        <h1 class="mb-6 text-4xl font-extrabold leading-tight tracking-tight sm:text-6xl lg:text-7xl">Secure Your SaaS Development</h1>
        
        <div class="flex justify-center px-4">
          <div class="rounded-xl bg-zinc-800/60 p-6 sm:p-8 backdrop-blur-sm border border-zinc-700/50 max-w-2xl w-full">
            <div class="text-center">
              <div class="mb-4 sm:mb-6 text-4xl sm:text-5xl">⏰</div>
              <h3 class="text-2xl sm:text-3xl font-bold text-white mb-4 sm:mb-6">Only 2 Spots Available This Quarter</h3>
              <p class="text-base sm:text-lg text-white/90 leading-relaxed">Due to our hands-on approach and commitment to quality, we limit ourselves to 2 agency SaaS projects per quarter. We are extremely picky with who we choose to work with to increase the chances of success.</p>
            </div>
          </div>
        </div>
      </article>
    {:else if index === 10}
      <article class="w-full max-w-5xl text-center">
        <h1 class="mb-6 text-4xl font-extrabold leading-tight tracking-tight sm:text-6xl lg:text-7xl">Let's fucking do this.</h1>
        
        <div class="flex justify-center px-4">
          <div class="rounded-xl bg-zinc-800/60 p-6 sm:p-8 backdrop-blur-sm border border-zinc-700/50 max-w-2xl w-full">
            <div class="text-center">
              <div class="mb-4 sm:mb-6 text-4xl sm:text-5xl">🎯</div>
              <p class="text-lg sm:text-xl text-white/90 leading-relaxed">Your competitors are already exploring SaaS solutions. The agencies that act first will dominate their markets while others struggle with manual processes and shrinking margins.</p>
            </div>
          </div>
        </div>
      </article>
    {:else if index === 11}
      <article class="w-full max-w-5xl text-left">
        <h1 class="mb-6 text-4xl font-extrabold leading-tight tracking-tight sm:text-6xl lg:text-7xl">Let's Connect</h1>
        
        <div class="mb-8 text-left">
          <p class="text-lg text-white/90">Reach out on any of these:</p>
        </div>

        <div class="grid gap-4 md:grid-cols-3">
          <!-- Instagram -->
          <div class="rounded-xl bg-zinc-800/60 p-6 backdrop-blur-sm border border-zinc-700/50">
            <div class="mb-3 text-4xl">📸</div>
            <h3 class="text-lg font-bold text-white mb-2">Instagram</h3>
            <a href="https://www.instagram.com/horheyjorge_/" class="text-white/80 underline hover:no-underline" target="_blank">@horheyjorge_</a>
          </div>

          <!-- WhatsApp -->
          <div class="rounded-xl bg-zinc-800/60 p-6 backdrop-blur-sm border border-zinc-700/50">
            <div class="mb-3 text-4xl">📱</div>
            <h3 class="text-lg font-bold text-white mb-2">WhatsApp</h3>
            <a href="https://wa.me/85297473013" class="text-white/80 underline hover:no-underline" target="_blank">+852 9747 3013</a>
          </div>

          <!-- Email -->
          <div class="rounded-xl bg-zinc-800/60 p-6 backdrop-blur-sm border border-zinc-700/50">
            <div class="mb-3 text-4xl">📧</div>
            <h3 class="text-lg font-bold text-white mb-2">Email</h3>
            <a href="mailto:jorge.lewis@starti.no" class="text-white/80 underline hover:no-underline">jorge.lewis@starti.no</a>
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
    <button type="button" class="pointer-events-auto h-full w-1/3" on:click={prev} aria-label="Previous slide"></button>
    <button type="button" class="pointer-events-auto h-full w-1/3" on:click={next} aria-label="Next slide"></button>
  </div>
</section>



