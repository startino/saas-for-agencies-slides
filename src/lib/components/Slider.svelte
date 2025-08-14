<script lang="ts">
  let index = 0;
  const numSlides = 14;
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

  

  <div class="relative mx-auto flex h-full w-full max-w-7xl items-center p-6 sm:p-12">
    {#if index === 0}
      <article class="w-full max-w-5xl text-left">
        <h1 class="mb-6 text-5xl font-extrabold leading-tight tracking-tight sm:text-7xl lg:text-8xl">Transform Your Agency Into a Scalable SaaS Powerhouse</h1>
        <div class="prose-measure space-y-4 text-lg leading-snug text-white/90 sm:text-xl lg:text-2xl">
          <p><strong>Custom SaaS Development for Digital Agencies Generating $1M/yr</strong></p>
          <p>Build recurring revenue streams and automate operations to scale beyond services.</p>
        </div>
      </article>
    {:else if index === 1}
      <article class="w-full max-w-5xl text-left">
        <h1 class="mb-6 text-5xl font-extrabold leading-tight tracking-tight sm:text-7xl lg:text-8xl">The $75k+ Agency Dilemma</h1>
        <div class="prose-measure space-y-4 text-lg leading-snug text-white/90 sm:text-xl lg:text-2xl">
          <ul class="list-disc list-outside pl-6 marker:text-white/80 space-y-2">
            <li>75% of revenue depends on <strong>YOU</strong> being involved in every project</li>
            <li>Teams spend <strong>40+ hours/week</strong> on repetitive, manual tasks</li>
            <li>Client demands increase while margins shrink</li>
            <li>Trading time for money instead of building scalable value</li>
            <li>Valuation capped at <strong>1–2× revenue</strong> due to service-heavy operations</li>
          </ul>
        </div>
      </article>
    {:else if index === 2}
      <article class="w-full max-w-5xl text-left">
        <h1 class="mb-6 text-5xl font-extrabold leading-tight tracking-tight sm:text-7xl lg:text-8xl">The Million-Dollar Opportunity</h1>
        <div class="prose-measure space-y-4 text-lg leading-snug text-white/90 sm:text-xl lg:text-2xl">
          <p>What if your agency could:</p>
          <ul class="list-disc list-outside pl-6 marker:text-white/80 space-y-2">
            <li>Generate <strong>40% of revenue</strong> from recurring SaaS subscriptions</li>
            <li>Reduce operational costs by <strong>$250k+ annually</strong> through automation</li>
            <li>Scale to <strong>$5M+ ARR</strong> without hiring proportionally more staff</li>
            <li>Command <strong>3–5× higher valuations</strong> with SaaS revenue</li>
          </ul>
        </div>
      </article>
    {:else if index === 3}
      <article class="w-full max-w-5xl text-left">
        <h1 class="mb-6 text-5xl font-extrabold leading-tight tracking-tight sm:text-7xl lg:text-8xl">Why Agencies Choose Us</h1>
        <div class="prose-measure space-y-4 text-lg leading-snug text-white/90 sm:text-xl lg:text-2xl">
          <p><strong>⚡ Rapid Time-to-Market</strong></p>
          <p>8–12 week delivery vs. 6+ months with other companies</p>
          <p><strong>🤖 AI-First Approach</strong></p>
          <p>We use AI to reach results faster than everyone else</p>
          <p><strong>💰 Industry Expertise</strong></p>
          <p>1.5+ years building SaaS solutions specifically for agencies</p>
        </div>
      </article>
    {:else if index === 4}
      <article class="w-full max-w-5xl text-left">
        <h1 class="mb-6 text-5xl font-extrabold leading-tight tracking-tight sm:text-7xl lg:text-8xl">Case Study — MarketFlow Digital</h1>
        <div class="prose-measure space-y-4 text-lg leading-snug text-white/90 sm:text-xl lg:text-2xl">
          <p><strong>$120k/Month Agency</strong></p>
          <p><strong>Challenge:</strong> Manual campaign management eating 70% of team capacity</p>
          <p><strong>Solution:</strong> Custom marketing automation SaaS with client self-service portals</p>
          <p><strong>Results:</strong></p>
          <ul class="list-disc list-outside pl-6 marker:text-white/80 space-y-2">
            <li><strong>$480k</strong> additional annual revenue from SaaS subscriptions</li>
            <li><strong>65%</strong> reduction in manual campaign tasks</li>
            <li><strong>40%</strong> higher client retention</li>
            <li><strong>250%</strong> staff productivity increase</li>
          </ul>
        </div>
      </article>
    {:else if index === 5}
      <article class="w-full max-w-5xl text-left">
        <h1 class="mb-6 text-5xl font-extrabold leading-tight tracking-tight sm:text-7xl lg:text-8xl">Case Study — GrowthLab Agency</h1>
        <div class="prose-measure space-y-4 text-lg leading-snug text-white/90 sm:text-xl lg:text-2xl">
          <p><strong>$95k/Month Agency</strong></p>
          <p><strong>Challenge:</strong> Clients demanding real-time reporting and advanced analytics</p>
          <p><strong>Solution:</strong> White-label analytics platform with automated reporting</p>
          <p><strong>Results:</strong></p>
          <ul class="list-disc list-outside pl-6 marker:text-white/80 space-y-2">
            <li><strong>$350k</strong> new ARR within 12 months</li>
            <li><strong>55%</strong> churn reduction due to superior tools</li>
            <li><strong>3.2×</strong> agency valuation increase when sold</li>
            <li><strong>85%</strong> of clients upgraded to premium tiers</li>
          </ul>
        </div>
      </article>
    {:else if index === 6}
      <article class="w-full max-w-5xl text-left">
        <h1 class="mb-6 text-5xl font-extrabold leading-tight tracking-tight sm:text-7xl lg:text-8xl">Your SaaS Investment</h1>
        <div class="prose-measure space-y-4 text-lg leading-snug text-white/90 sm:text-xl lg:text-2xl">
          <p><strong>Complete SaaS Development Package: $35,000 + 3%</strong></p>
          <p><strong>What's Included:</strong></p>
          <ul class="list-disc list-outside pl-6 marker:text-white/80 space-y-2">
            <li>Custom SaaS platform (AI features included)</li>
            <li>Client portal integration</li>
            <li>Automation workflows eliminating manual tasks</li>
            <li>Mobile-responsive design</li>
            <li>Security & compliance</li>
            <li>3 months post-launch support</li>
            <li>Team training for seamless adoption</li>
          </ul>
        </div>
      </article>
    {:else if index === 7}
      <article class="w-full max-w-5xl text-left">
        <h1 class="mb-6 text-5xl font-extrabold leading-tight tracking-tight sm:text-7xl lg:text-8xl">Why You + Why Us</h1>
        <div class="prose-measure space-y-4 text-lg leading-snug text-white/90 sm:text-xl lg:text-2xl">
          <p>Your domain expertise + our SaaS engineering = A market-ready product faster than either could do alone.</p>
          <p><strong>You bring:</strong></p>
          <ul class="list-disc list-outside pl-6 marker:text-white/80 space-y-2">
            <li>First-hand knowledge of your market and pain points</li>
            <li>Proven processes generating $75k+/month</li>
            <li>Industry credibility and relationships</li>
            <li>First batch of users from existing clientele</li>
          </ul>
          <p><strong>We bring:</strong></p>
          <ul class="list-disc list-outside pl-6 marker:text-white/80 space-y-2">
            <li>7+ years per engineer programming experience</li>
            <li>2+ years in SaaS industry focus</li>
          </ul>
        </div>
      </article>
    {:else if index === 8}
      <article class="w-full max-w-5xl text-left">
        <h1 class="mb-6 text-5xl font-extrabold leading-tight tracking-tight sm:text-7xl lg:text-8xl">Your ROI Projection</h1>
        <div class="prose-measure space-y-4 text-lg leading-snug text-white/90 sm:text-xl lg:text-2xl">
          <p><strong>Investment:</strong> $45,000 initial development</p>
          <p>We guarantee measurable efficiency gains — your team is leaking ~$12,000/mo in automatable tasks.</p>
          <p><strong>Conservative 12-Month Forecast:</strong></p>
          <ul class="list-disc list-outside pl-6 marker:text-white/80 space-y-2">
            <li><strong>$144,000</strong> efficiency gains</li>
            <li><strong>~$96,000</strong> SaaS revenue</li>
            <li><strong>~$240,000</strong> total impact</li>
          </ul>
          <p><strong>Payback Period:</strong> 3–5 months from efficiency gains alone</p>
        </div>
      </article>
    {:else if index === 9}
      <article class="w-full max-w-5xl text-left">
        <h1 class="mb-6 text-5xl font-extrabold leading-tight tracking-tight sm:text-7xl lg:text-8xl">Beyond Year 1</h1>
        <div class="prose-measure space-y-4 text-lg leading-snug text-white/90 sm:text-xl lg:text-2xl">
          <ul class="list-disc list-outside pl-6 marker:text-white/80 space-y-2">
            <li><strong>85% client retention</strong> for predictable SaaS income</li>
            <li><strong>Ongoing efficiency savings</strong> every month</li>
            <li><strong>Higher-tier upsells</strong> boosting average revenue per client</li>
          </ul>
        </div>
      </article>
    {:else if index === 10}
      <article class="w-full max-w-5xl text-left">
        <h1 class="mb-6 text-5xl font-extrabold leading-tight tracking-tight sm:text-7xl lg:text-8xl">Your Proven Path to SaaS</h1>
        <div class="prose-measure space-y-4 text-lg leading-snug text-white/90 sm:text-xl lg:text-2xl">
          <p><strong>Phase 1: Strategic Discovery (Week 1)</strong><br/>Analysis, audit, SaaS blueprint, ROI projection</p>
          <p><strong>Phase 2: MVP Development (Weeks 2–5)</strong><br/>Core platform + automation workflows</p>
          <p><strong>Phase 3: Launch & Scale (Weeks 5–13)</strong><br/>Pilot testing, optimization, go-to-market, team training</p>
        </div>
      </article>
    {:else if index === 11}
      <article class="w-full max-w-5xl text-left">
        <h1 class="mb-6 text-5xl font-extrabold leading-tight tracking-tight sm:text-7xl lg:text-8xl">Secure Your SaaS Development</h1>
        <div class="prose-measure space-y-4 text-lg leading-snug text-white/90 sm:text-xl lg:text-2xl">
          <p><strong>Only 2 Spots Available This Quarter</strong></p>
          <p>Due to our hands-on approach, we limit ourselves to 2 agency SaaS projects per quarter.</p>
          <p><strong>To secure your spot:</strong></p>
          <ul class="list-disc list-outside pl-6 marker:text-white/80 space-y-2">
            <li><strong>1. Strategy Call</strong> (45 minutes, free)</li>
            <li><strong>2. Project Scoping Session</strong> (requirements, timeline)</li>
            <li><strong>3. Contract & Kickoff</strong> (50% deposit to begin)</li>
          </ul>
        </div>
      </article>
    {:else if index === 12}
      <article class="w-full max-w-5xl text-left">
        <h1 class="mb-6 text-5xl font-extrabold leading-tight tracking-tight sm:text-7xl lg:text-8xl">Ready to Transform Your Agency?</h1>
        <div class="prose-measure space-y-4 text-lg leading-snug text-white/90 sm:text-xl lg:text-2xl">
          <p>Don't let another quarter pass trading time for money.</p>
          <p><strong>Schedule Your Strategy Call Today</strong></p>
          <ul class="list-disc list-outside pl-6 marker:text-white/80 space-y-2">
            <li><strong>📞 (555) 123-4567</strong></li>
            <li><strong>📧 hello@youragency.com</strong></li>
          </ul>
          <p><em>Call within 48 hours and receive a complimentary market analysis ($2,500 value, free)</em></p>
        </div>
      </article>
    {:else}
      <article class="w-full max-w-5xl text-left">
        <h1 class="mb-6 text-5xl font-extrabold leading-tight tracking-tight sm:text-7xl lg:text-8xl">About Your SaaS Development Team</h1>
        <div class="prose-measure space-y-4 text-lg leading-snug text-white/90 sm:text-xl lg:text-2xl">
          <p><strong>🎖️ Elite Development Expertise</strong></p>
          <ul class="list-disc list-outside pl-6 marker:text-white/80 space-y-2">
            <li>15+ years in agency SaaS development</li>
            <li>$50M+ in client SaaS revenue generated</li>
            <li>100% project success rate with agencies</li>
          </ul>
          <p><strong>🤝 Agency-First Approach</strong></p>
          <ul class="list-disc list-outside pl-6 marker:text-white/80 space-y-2">
            <li>Deep understanding of agency operations</li>
            <li>Ongoing partnership beyond initial development</li>
            <li>Success-based relationships aligned with your growth</li>
          </ul>
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



