/**
 * Voyager AI — Travel Planning Engine
 * ====================================
 * Integration options:
 *   A) FastAPI backend  → set API_CONFIG.useMockData = false, point baseUrl to your server
 *   B) Anthropic API    → set API_CONFIG.useAnthropicDirect = true, add your key
 *   C) Demo mode (default) → rich mock data, no backend needed
 *
 * FastAPI expected endpoint: POST /api/generate-itinerary
 * Request body:  { destination, days, budget, travel_style, interests, notes }
 * Response body: { trip_title, destination, duration, total_budget, budget_breakdown, days[], recommendations[] }
 */

'use strict';

/* ═══════════════════════════════════════════════════
   CONFIGURATION
═══════════════════════════════════════════════════ */
const API_CONFIG = {
  baseUrl:             'http://localhost:8000',   // Your FastAPI server URL
  endpoint:            '/api/generate-itinerary',
  useMockData:         false,   // ← set to false when your FastAPI backend is ready
  simulatedDelayMs:    1500,   // simulated delay for mock data feel
};


/* ═══════════════════════════════════════════════════
   RICH MOCK DATA
═══════════════════════════════════════════════════ */
const MOCK_ITINERARY = {
  trip_title:   'Tokyo: Culture, Food & Hidden Gems',
  destination:  'Tokyo, Japan',
  duration:     '5 days',
  emoji:        '⛩️',
  total_budget: '$1,450',
  budget_breakdown: {
    accommodation: '$600',
    food:          '$350',
    transport:     '$200',
    activities:    '$300',
  },
  days: [
    {
      day:   1,
      title: 'Arrival & Ancient Asakusa',
      theme: 'Historic Tokyo',
      activities: [
        {
          time:        '10:00',
          name:        'Senso-ji Temple',
          description: 'Wander through the iconic Kaminarimon Gate and explore the Nakamise shopping street lined with traditional crafts and street food.',
          cost:        'Free',
          duration:    '2h',
          category:    'Culture',
        },
        {
          time:        '12:30',
          name:        'Lunch at Asakusa Imahan',
          description: 'Savour classic sukiyaki in a beautifully preserved Meiji-era building — an unmissable culinary landmark.',
          cost:        '$22',
          duration:    '1.5h',
          category:    'Food',
        },
        {
          time:        '15:00',
          name:        'Tokyo National Museum, Ueno',
          description: 'Home to the world\'s largest collection of Japanese art. Highlights include samurai armour and ancient ceramics.',
          cost:        '$8',
          duration:    '2h',
          category:    'Art',
        },
        {
          time:        '19:00',
          name:        'Akihabara Evening',
          description: 'Dive into the electric town for neon signs, retro game arcades, and Tokyo\'s famous electronics culture.',
          cost:        '$0',
          duration:    '2h',
          category:    'Sightseeing',
        },
      ],
    },
    {
      day:   2,
      title: 'Modern Tokyo & Shinjuku',
      theme: 'Urban Energy',
      activities: [
        {
          time:        '09:00',
          name:        'Shinjuku Gyoen National Garden',
          description: 'One of Tokyo\'s largest parks, perfect for a peaceful morning walk among manicured Japanese gardens and greenhouses.',
          cost:        '$2',
          duration:    '2h',
          category:    'Nature',
        },
        {
          time:        '11:30',
          name:        'Ramen at Fuunji',
          description: 'Try the legendary tsukemen (dipping ramen) at this small, cult-favourite spot near Shinjuku station. Arrive early — queues form fast.',
          cost:        '$12',
          duration:    '1h',
          category:    'Food',
        },
        {
          time:        '13:30',
          name:        'Tokyo Metropolitan Government Building',
          description: 'Head to the free observation deck on the 45th floor for sweeping views across the entire metropolis — and Mt. Fuji on clear days.',
          cost:        'Free',
          duration:    '1h',
          category:    'Sightseeing',
        },
        {
          time:        '17:00',
          name:        'Harajuku & Takeshita Street',
          description: 'Explore Japan\'s fashion subculture hub. The crepe stalls and eclectic boutiques offer a window into Tokyo\'s youth culture.',
          cost:        '$10',
          duration:    '2h',
          category:    'Shopping',
        },
        {
          time:        '20:00',
          name:        'Omoide Yokocho (Memory Lane)',
          description: 'A narrow alley of tiny yakitori bars under the train tracks. Smoky, atmospheric, and utterly memorable.',
          cost:        '$20',
          duration:    '2h',
          category:    'Food',
        },
      ],
    },
    {
      day:   3,
      title: 'Shibuya & Digital Art',
      theme: 'Contemporary Culture',
      activities: [
        {
          time:        '09:00',
          name:        'teamLab Borderless Digital Museum',
          description: 'An otherworldly immersive art experience with light forests, flower rooms and digital waterfalls. Book 2 weeks in advance.',
          cost:        '$32',
          duration:    '3h',
          category:    'Art',
        },
        {
          time:        '13:00',
          name:        'Lunch: Ichiran Ramen',
          description: 'Solo-booth ramen dining concept uniquely Japanese. Customise your broth and enjoy your bowl in peaceful concentration.',
          cost:        '$14',
          duration:    '1h',
          category:    'Food',
        },
        {
          time:        '15:00',
          name:        'Shibuya Crossing & Sky',
          description: 'Watch the world\'s busiest pedestrian crossing from the Starbucks opposite, then head up Shibuya Sky for 360° rooftop views.',
          cost:        '$18',
          duration:    '2h',
          category:    'Sightseeing',
        },
        {
          time:        '19:30',
          name:        'Dinner: Gonpachi Nishiazabu',
          description: 'The izakaya made famous by a Hollywood film. Multi-level space with robata grill dishes and excellent sake selection.',
          cost:        '$35',
          duration:    '2h',
          category:    'Food',
        },
      ],
    },
    {
      day:   4,
      title: 'Yanaka & Hidden Tokyo',
      theme: 'Old Town Exploring',
      activities: [
        {
          time:        '09:30',
          name:        'Yanaka Ginza Shopping Street',
          description: 'Step back 50 years in this lovingly preserved old neighbourhood. Independent shops, tofu makers, and cats everywhere.',
          cost:        '$5',
          duration:    '2h',
          category:    'Culture',
        },
        {
          time:        '12:00',
          name:        'Yanesen Local Lunch',
          description: 'Try menchi-katsu (minced meat cutlet) from a local butcher-turned-famous-street-food — a true neighbourhood gem.',
          cost:        '$8',
          duration:    '45m',
          category:    'Food',
        },
        {
          time:        '14:00',
          name:        'Ueno Zoo',
          description: 'Home to Japan\'s beloved giant pandas — perfect for families or anyone who wants a leisurely afternoon.',
          cost:        '$6',
          duration:    '2h',
          category:    'Nature',
        },
        {
          time:        '17:00',
          name:        'Onsen at Spa LaQua',
          description: 'Soak in natural hot-spring baths in the heart of Tokyo. The rooftop open-air bath under the Tokyo Dome lights is magical.',
          cost:        '$25',
          duration:    '2h',
          category:    'Wellness',
        },
      ],
    },
    {
      day:   5,
      title: 'Odaiba & Farewell Sunset',
      theme: 'Futuristic Island',
      activities: [
        {
          time:        '10:00',
          name:        'Tsukiji Outer Market',
          description: 'The former inner market may have moved, but the outer market buzzes with fresh seafood, tamagoyaki and sushi breakfast.',
          cost:        '$15',
          duration:    '2h',
          category:    'Food',
        },
        {
          time:        '13:00',
          name:        'Odaiba Seaside Park',
          description: 'Ride the driverless monorail to this futuristic artificial island with views of Rainbow Bridge and a Statue of Liberty replica.',
          cost:        'Free',
          duration:    '1.5h',
          category:    'Sightseeing',
        },
        {
          time:        '15:30',
          name:        'teamLab Planets',
          description: 'A more intimate immersive art experience than Borderless — wade through water rooms and lie beneath infinite flower gardens.',
          cost:        '$28',
          duration:    '2h',
          category:    'Art',
        },
        {
          time:        '19:00',
          name:        'Farewell Dinner at DiverCity',
          description: 'Choose from dozens of restaurants overlooking Tokyo Bay. Watch the city lights come alive from the terrace — a perfect send-off.',
          cost:        '$30',
          duration:    '2h',
          category:    'Food',
        },
      ],
    },
  ],
  recommendations: [
    {
      type:        'timing',
      icon:        '🌸',
      title:       'Best Time to Visit',
      description: 'April offers cherry blossoms in full bloom — visit Shinjuku Gyoen before 9am for a crowd-free, ethereal experience. Book hotels 3 months ahead.',
    },
    {
      type:        'transport',
      icon:        '🚇',
      title:       'Get a Suica Card',
      description: 'Load ¥3,000 onto a Suica IC card at Narita airport — covers all metro, buses, and even convenience store purchases. Saves ~$40 vs single tickets.',
    },
    {
      type:        'experience',
      icon:        '⭐',
      title:       'Book teamLab Early',
      description: 'Both teamLab Borderless and Planets sell out 2–3 weeks in advance on weekends. Purchase on the official site immediately after booking flights.',
    },
    {
      type:        'budget',
      icon:        '💡',
      title:       'Budget Optimisation',
      description: 'Convenience stores (7-Eleven, FamilyMart) serve restaurant-quality meals from $4–8. Replace one meal a day with a konbini stop to save $120 over 5 days.',
    },
    {
      type:        'weather',
      icon:        '☂️',
      title:       'Weather Awareness',
      description: 'Spring and autumn are dry. If visiting June–August, pack a compact umbrella — afternoon showers are common but brief. Humidity peaks in August.',
    },
    {
      type:        'local',
      icon:        '🗺️',
      title:       'Day Trip Option',
      description: 'A 45-minute Shinkansen from Shinjuku reaches Nikko for UNESCO-listed shrine complexes and mountain landscapes — worth a half-day detour.',
    },
  ],
};


/* ═══════════════════════════════════════════════════
   UTILITY FUNCTIONS
═══════════════════════════════════════════════════ */
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

function sanitize(str) {
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}

function $(selector, parent = document) {
  return parent.querySelector(selector);
}

function $$(selector, parent = document) {
  return Array.from(parent.querySelectorAll(selector));
}

function show(el) {
  if (el) el.classList.remove('hidden');
}

function hide(el) {
  if (el) el.classList.add('hidden');
}

function scrollToElement(el) {

  if (!el || !(el instanceof Element)) {
    console.error("Invalid element:", el);
    return;
  }

  const top = el.getBoundingClientRect().top + window.scrollY;

  window.scrollTo({
    top,
    behavior: "smooth"
  });
}


/* ═══════════════════════════════════════════════════
   NAVBAR BEHAVIOUR
═══════════════════════════════════════════════════ */
function initNavbar() {
  const navbar = $('.navbar');
  const toggle = $('.nav-mobile-toggle');
  const mobileNav = $('#mobile-nav');

  // Scroll shadow
  const onScroll = () => {
    navbar.classList.toggle('scrolled', window.scrollY > 20);
  };
  window.addEventListener('scroll', onScroll, { passive: true });

  // Mobile toggle
  toggle?.addEventListener('click', () => {
    const expanded = toggle.getAttribute('aria-expanded') === 'true';
    toggle.setAttribute('aria-expanded', String(!expanded));
    mobileNav.hidden = expanded;
  });

  // Close mobile nav on link click
  $$('.mobile-nav-link, .mobile-nav-cta').forEach((link) => {
    link.addEventListener('click', () => {
      toggle.setAttribute('aria-expanded', 'false');
      mobileNav.hidden = true;
    });
  });
}


/* ═══════════════════════════════════════════════════
   INTEREST CHIPS
═══════════════════════════════════════════════════ */
function initChips() {
  $$('.chip', $('#interestChips')).forEach((chip) => {
    chip.addEventListener('click', () => {
      const pressed = chip.getAttribute('aria-pressed') === 'true';
      chip.setAttribute('aria-pressed', String(!pressed));
    });
  });
}

function getSelectedInterests() {
  return $$('.chip[aria-pressed="true"]', $('#interestChips')).map(
    (chip) => chip.dataset.value
  );
}


/* ═══════════════════════════════════════════════════
   FORM VALIDATION
═══════════════════════════════════════════════════ */
function validateForm(formData) {
  const errors = {};

  if (!formData.destination || formData.destination.trim().length < 2) {
    errors.destination = 'Please enter a valid destination.';
  }

  const days = parseInt(formData.days, 10);
  if (!days || days < 1 || days > 30) {
    errors.days = 'Enter a number between 1 and 30.';
  }

  const budget = parseInt(formData.budget, 10);
  if (!budget || budget < 100) {
    errors.budget = 'Minimum budget is $100.';
  }

  return errors;
}

function showFormErrors(errors, form) {
  // Clear previous errors
  $$('.form-group', form).forEach((g) => g.classList.remove('has-error'));
  $$('.error-message', form).forEach((e) => e.remove());

  Object.entries(errors).forEach(([field, message]) => {
    const input = form.querySelector(`#${field}`);
    if (!input) return;
    const group = input.closest('.form-group');
    if (group) {
      group.classList.add('has-error');
      const err = document.createElement('span');
      err.className = 'error-message';
      err.setAttribute('role', 'alert');
      err.textContent = message;
      group.appendChild(err);
    }
  });
}

function clearFormErrors(form) {
  $$('.form-group', form).forEach((g) => g.classList.remove('has-error'));
  $$('.error-message', form).forEach((e) => e.remove());
}


/* ═══════════════════════════════════════════════════
   LOADING STEPS ANIMATION
═══════════════════════════════════════════════════ */
async function animateLoadingSteps() {
  const steps = ['#step1', '#step2', '#step3', '#step4'];
  const titles = [
    'Analysing destination data...',
    'Matching your interests & budget...',
    'Building day-by-day schedule...',
    'Adding local insights & tips...',
  ];
  const titleEl = $('#loadingTitle');

  for (let i = 0; i < steps.length; i++) {
    await sleep(API_CONFIG.simulatedDelayMs / steps.length);

    // Mark previous step done
    if (i > 0) {
      const prev = $(steps[i - 1]);
      prev?.classList.remove('loading-step--active');
      prev?.classList.add('loading-step--done');
      if (prev) prev.querySelector('.step-dot').style.background = '#059669';
    }

    // Activate current step
    const curr = $(steps[i]);
    curr?.classList.add('loading-step--active');

    // Update title
    if (titleEl) titleEl.textContent = titles[i];
  }
}


/* ═══════════════════════════════════════════════════
   API CALLS
═══════════════════════════════════════════════════ */
async function callFastAPI(payload) {
  const res = await fetch(`${API_CONFIG.baseUrl}${API_CONFIG.endpoint}`, {
    method:  'POST',
    headers: { 'Content-Type': 'application/json' },
    body:    JSON.stringify(payload),
  });
  if (!res.ok) {
    const err = await res.text();
    throw new Error(`API error ${res.status}: ${err}`);
  }
  return res.json();
}




async function generateItinerary(payload) {

  if (API_CONFIG.useMockData) {
    await sleep(API_CONFIG.simulatedDelayMs);
    return MOCK_ITINERARY;
  }

  return callFastAPI(payload);
}


/* ═══════════════════════════════════════════════════
   RENDER FUNCTIONS
═══════════════════════════════════════════════════ */
function getCategoryColor(category) {
  const map = {
    Culture:    { bg: '#F0FDF4', text: '#166534' },
    Food:       { bg: '#FFF7ED', text: '#9A3412' },
    Nature:     { bg: '#F0FDF4', text: '#166534' },
    Art:        { bg: '#FAF5FF', text: '#6B21A8' },
    Adventure:  { bg: '#FFF1F2', text: '#9F1239' },
    Shopping:   { bg: '#F0F9FF', text: '#075985' },
    Sightseeing:{ bg: '#EEF2FF', text: '#3730A3' },
    Wellness:   { bg: '#F0FDFA', text: '#134E4A' },
    History:    { bg: '#FFFBEB', text: '#92400E' },
  };
  return map[category] || { bg: '#F1F5F9', text: '#475569' };
}

function renderTripHeader(data) {
  const header = $('#tripHeader');
  const badge  = $('#tripBadge');
  const title  = $('#results-title');
  const stats  = $('#tripStats');
  const budget = $('#tripBudgetDisplay');

  if (badge)  badge.textContent = data.emoji ?? '✈️';
  if (title)  title.textContent = data.trip_title;

  if (stats) {
    stats.innerHTML = `
      <div class="trip-stat" role="listitem">📍 ${sanitize(data.destination)}</div>
      <div class="trip-stat" role="listitem">📅 ${sanitize(data.duration)}</div>
      <div class="trip-stat" role="listitem">🎒 ${sanitize(data.budget_breakdown?.accommodation ?? '')} accommodation</div>
    `;
  }

  if (budget) {
    budget.innerHTML = `
      <div class="budget-label">Est. Total Budget</div>
      <div class="budget-amount">${sanitize(data.total_budget)}</div>
      <div class="budget-note">
        🍽 ${sanitize(data.budget_breakdown?.food ?? '')} food ·
        🚇 ${sanitize(data.budget_breakdown?.transport ?? '')} transport
      </div>
    `;
  }
}

function renderDayCard(dayData, index) {
  const activitiesHTML = dayData.activities
    .map((act) => {
      const cat = getCategoryColor(act.category);
      return `
        <div class="activity-item" role="listitem">
          <div class="activity-time-col">
            <span class="activity-time">${sanitize(act.time)}</span>
            <span class="activity-dot" aria-hidden="true"></span>
          </div>
          <div class="activity-content">
            <div class="activity-name">${sanitize(act.name)}</div>
            <div class="activity-desc">${sanitize(act.description)}</div>
            <div class="activity-meta">
              <span class="activity-tag activity-tag--cost">💰 ${sanitize(act.cost)}</span>
              <span class="activity-tag activity-tag--duration">⏱ ${sanitize(act.duration)}</span>
              <span class="activity-tag activity-tag--category"
                    style="background:${cat.bg}; color:${cat.text};"
              >${sanitize(act.category)}</span>
            </div>
          </div>
        </div>
      `;
    })
    .join('');

  const card = document.createElement('article');
  card.className = 'day-card';
  card.setAttribute('role', 'listitem');
  // First card expanded by default
  if (index === 0) card.classList.add('expanded');
  card.style.animationDelay = `${index * 80}ms`;

  card.innerHTML = `
    <div class="day-card-header"
         role="button"
         tabindex="0"
         aria-expanded="${index === 0}"
         aria-controls="day-body-${index}"
         aria-label="Day ${dayData.day}: ${dayData.title}. Click to expand.">
      <div class="day-number">D${dayData.day}</div>
      <div>
        <div class="day-title">${sanitize(dayData.title)}</div>
        <div class="day-theme">${sanitize(dayData.theme)}</div>
      </div>
      <div class="day-toggle-icon" aria-hidden="true">
        <svg viewBox="0 0 16 16" fill="none"><path d="M4 6l4 4 4-4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
      </div>
    </div>
    <div class="day-card-body"
         id="day-body-${index}"
         role="region"
         aria-label="Activities for day ${dayData.day}"
         ${index !== 0 ? 'hidden' : ''}>
      <div class="activity-timeline" role="list">
        ${activitiesHTML}
      </div>
    </div>
  `;

  // Toggle expand/collapse
  const header = card.querySelector('.day-card-header');
  const body   = card.querySelector('.day-card-body');

  const toggle = () => {
    const isExpanded = card.classList.contains('expanded');
    card.classList.toggle('expanded', !isExpanded);
    header.setAttribute('aria-expanded', String(!isExpanded));
    body.hidden = isExpanded;
  };

  header.addEventListener('click', toggle);
  header.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      toggle();
    }
  });

  return card;
}

function renderDays(days) {
  const container = $('#daysContainer');
  if (!container) return;
  container.innerHTML = '';
  days.forEach((day, i) => {
    container.appendChild(renderDayCard(day, i));
  });
}

function renderRecommendations(recs) {
  const grid = $('#recommendationsGrid');
  if (!grid) return;
  grid.innerHTML = '';

  recs.forEach((rec, i) => {
    const card = document.createElement('article');
    card.className = 'rec-card';
    card.setAttribute('role', 'listitem');
    card.style.animationDelay = `${i * 60}ms`;

    card.innerHTML = `
      <div class="rec-icon" aria-hidden="true">${sanitize(rec.icon)}</div>
      <div class="rec-content">
        <div class="rec-type">${sanitize(rec.type)}</div>
        <div class="rec-title">${sanitize(rec.title)}</div>
        <div class="rec-desc">${sanitize(rec.description)}</div>
        <span class="rec-ai-badge" aria-label="AI generated insight">
          ✦ AI Insight
        </span>
      </div>
    `;
    grid.appendChild(card);
  });
}

function renderError(message) {
  const planner = $('#planner');
  const existingAlert = $('.alert');
  if (existingAlert) existingAlert.remove();

  const alert = document.createElement('div');
  alert.className = 'alert alert-error';
  alert.setAttribute('role', 'alert');
  alert.innerHTML = `
    <svg width="18" height="18" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path d="M10 8v4M10 14.5h.01M3 17h14a1 1 0 001-1V4a1 1 0 00-1-1H3a1 1 0 00-1 1v12a1 1 0 001 1z"
            stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
    </svg>
    ${sanitize(message)}
  `;

  const card = $('.planner-card');
  card?.insertAdjacentElement('beforebegin', alert);

  scrollTo(alert);
}


/* ═══════════════════════════════════════════════════
   SECTION TRANSITIONS
═══════════════════════════════════════════════════ */
function showLoading() {
  hide($('#plannerSection') ?? document.getElementById('planner')?.closest('section'));
  // Hide the planner section
  document.getElementById('planner').style.display = 'none';
  show($('#loadingSection'));
  scrollTo($('#loadingSection'));
}

function hideLoading() {
  hide($('#loadingSection'));
}

function showResults(data) {
  renderTripHeader(data);
  renderDays(data.days);
  show($('#resultsSection'));

  if (data.recommendations?.length) {
    renderRecommendations(data.recommendations);
    show($('#recommendationsSection'));
  }

  scrollTo($('#resultsSection'));
}

function resetToPlanner() {
  hide($('#loadingSection'));
  hide($('#resultsSection'));
  hide($('#recommendationsSection'));

  // Reset loading steps
  ['#step1','#step2','#step3','#step4'].forEach((s, i) => {
    const el = $(s);
    if (!el) return;
    el.classList.remove('loading-step--active', 'loading-step--done');
    if (i === 0) el.classList.add('loading-step--active');
    const dot = el.querySelector('.step-dot');
    if (dot) dot.style.background = '';
  });

  const loadingTitle = $('#loadingTitle');
  if (loadingTitle) loadingTitle.textContent = 'Optimising your travel experience...';

  document.getElementById('planner').style.display = '';
  scrollTo(document.getElementById('planner'), 100);
}


/* ═══════════════════════════════════════════════════
   FORM SUBMISSION
═══════════════════════════════════════════════════ */
function initForm() {
  const form    = $('#plannerForm');
  const submitBtn = $('#submitBtn');

  form?.addEventListener('submit', async (e) => {
    e.preventDefault();
    clearFormErrors(form);

    const fd = new FormData(form);
    const payload = {
      destination:  fd.get('destination')?.toString().trim() ?? '',
      days:         fd.get('days')?.toString() ?? '',
      budget:       fd.get('budget')?.toString() ?? '',
      travel_style: fd.get('travel_style')?.toString() ?? 'mid',
      interests:    getSelectedInterests(),
      notes:        fd.get('notes')?.toString().trim() ?? '',
    };

    // Validate
    const errors = validateForm(payload);
    if (Object.keys(errors).length > 0) {
      showFormErrors(errors, form);
      scrollTo(Object.values(errors).length ? form.querySelector('.has-error') : form);
      return;
    }

    // Disable button
    submitBtn.disabled = true;
    submitBtn.innerHTML = `
      <svg class="btn-icon spin" viewBox="0 0 20 20" fill="none" aria-hidden="true">
        <circle cx="10" cy="10" r="8" stroke="currentColor" stroke-width="2" stroke-dasharray="25 25" stroke-linecap="round"/>
      </svg>
      Generating...
    `;

    // Add temporary spin style
    const style = document.createElement('style');
    style.textContent = '.spin { animation: spin 1s linear infinite; }';
    document.head.appendChild(style);

    showLoading();
    animateLoadingSteps(); // fire-and-forget

    try {
      const data = await generateItinerary(payload);
      hideLoading();
      showResults(data);
    } catch (err) {
      console.error(err)
      hideLoading();
      resetToPlanner();
      renderError(
        err.message.includes('Failed to fetch')
          ? 'Could not reach the server. Running in demo mode — set API_CONFIG.useMockData = true to use sample data.'
          : `Something went wrong: ${err.message}`
      );
    } finally {
      submitBtn.disabled = false;
      submitBtn.innerHTML = `
        <svg class="btn-icon" viewBox="0 0 20 20" fill="none" aria-hidden="true">
          <path d="M10 2l2.4 5.6L18 10l-5.6 2.4L10 18l-2.4-5.6L2 10l5.6-2.4L10 2z" fill="currentColor"/>
        </svg>
        Generate My Itinerary
      `;
      document.head.removeChild(style);
    }
  });

  // Regenerate
  $('#regenerateBtn')?.addEventListener('click', async () => {
    const form = $('#plannerForm');
    if (!form) return;
    form.dispatchEvent(new Event('submit', { bubbles: true, cancelable: true }));
  });

  // New trip
  $('#newTripBtn')?.addEventListener('click', () => {
    resetToPlanner();
    $('#plannerForm')?.reset();
    $$('.chip[aria-pressed="true"]', $('#interestChips')).forEach((c) =>
      c.setAttribute('aria-pressed', 'false')
    );
  });
}


/* ═══════════════════════════════════════════════════
   SMOOTH SCROLL FOR ANCHOR LINKS
═══════════════════════════════════════════════════ */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', (e) => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (!target) return;
      e.preventDefault();
      scrollTo(target, 72);
    });
  });
}


/* ═══════════════════════════════════════════════════
   SCROLL-BASED REVEAL (minimal, no heavy libraries)
═══════════════════════════════════════════════════ */
function initRevealOnScroll() {
  const observed = new Set();

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !observed.has(entry.target)) {
          observed.add(entry.target);
          entry.target.style.animationPlayState = 'running';
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1 }
  );

  $$('.step-card').forEach((el, i) => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(24px)';
    el.style.transition = `opacity 0.5s ease ${i * 100}ms, transform 0.5s ease ${i * 100}ms`;
    observer.observe(el);
  });

  // Re-trigger visible
  const resetObserver = new MutationObserver(() => {
    $$('.step-card.visible').forEach((el) => {
      el.style.opacity = '1';
      el.style.transform = 'translateY(0)';
    });
  });

  // Simple fallback using interval for older browsers
  const checkVisibility = () => {
    $$('.step-card').forEach((el) => {
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight - 60) {
        el.style.opacity = '1';
        el.style.transform = 'translateY(0)';
      }
    });
  };

  window.addEventListener('scroll', checkVisibility, { passive: true });
  checkVisibility();
}


/* ═══════════════════════════════════════════════════
   KEYBOARD ACCESSIBILITY ENHANCEMENTS
═══════════════════════════════════════════════════ */
function initA11y() {
  // Skip link support (add to body if needed)
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      const mobileNav = $('#mobile-nav');
      const toggle   = $('.nav-mobile-toggle');
      if (mobileNav && !mobileNav.hidden) {
        mobileNav.hidden = true;
        toggle?.setAttribute('aria-expanded', 'false');
        toggle?.focus();
      }
    }
  });
}


/* ═══════════════════════════════════════════════════
   BOOT
═══════════════════════════════════════════════════ */
document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initChips();
  initForm();
  initSmoothScroll();
  initRevealOnScroll();
  initA11y();

  // Log integration instructions to console for developers
  console.group('%c🗺 Voyager AI — Integration Guide', 'color:#4F46E5;font-weight:bold;font-size:14px');
  console.log('%cFastAPI backend:', 'font-weight:bold', `POST ${API_CONFIG.baseUrl}${API_CONFIG.endpoint}`);
  console.log('%cTo switch modes, edit API_CONFIG at the top of script.js', 'color:#666');
  console.log('%c  useMockData: false       → rich demo data (default)', 'color:#059669');
  console.log('%c  useAnthropicDirect: true → live Anthropic API', 'color:#D97706');
  console.log('%c  useMockData: false       → your FastAPI backend', 'color:#4F46E5');
  console.groupEnd();
});
