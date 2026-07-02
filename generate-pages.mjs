import { writeFileSync } from "node:fs";

const services = [
  {
    slug: "federal-skilled-worker",
    title: "Federal Skilled Worker",
    category: "Permanent Residence",
    short: "Explore a federal economic pathway designed for skilled professionals with qualifying work experience.",
    intro: "The Federal Skilled Worker Program is one of Canada’s Express Entry pathways for experienced professionals. Aspire can help you understand how your education, language ability, work history and other profile factors fit together before you move forward.",
    help: ["Profile and eligibility review", "Express Entry profile preparation", "Supporting-document planning", "Application review and submission support"],
    fit: ["You have skilled work experience", "You are planning a long-term move to Canada", "You want a clear review of your Express Entry options"]
  },
  {
    slug: "federal-skilled-trades",
    title: "Federal Skilled Trades",
    category: "Permanent Residence",
    short: "Guidance for qualified tradespeople considering permanent residence through Express Entry.",
    intro: "Canada’s Federal Skilled Trades Program is intended for eligible people with experience in qualifying trades. We help organize the facts of your background, identify document gaps and prepare a clear application strategy.",
    help: ["Trade-experience assessment", "Express Entry profile support", "Employment and qualification evidence review", "Final application quality check"],
    fit: ["You work in an eligible skilled trade", "You have relevant practical experience", "You need help presenting your work history clearly"]
  },
  {
    slug: "canadian-experience-class",
    title: "Canadian Experience Class",
    category: "Permanent Residence",
    short: "Turn eligible Canadian work experience into a carefully prepared permanent residence strategy.",
    intro: "The Canadian Experience Class is an Express Entry pathway for eligible workers who have gained qualifying experience in Canada. Aspire reviews your timeline, duties, status history and documents so your profile tells one consistent story.",
    help: ["Canadian work-history review", "Express Entry profile preparation", "Employment letter guidance", "Post-invitation application support"],
    fit: ["You have recent Canadian work experience", "You are considering permanent residence", "You want your records reviewed before submitting"]
  },
  {
    slug: "provincial-nominee-programs",
    title: "Provincial Nominee Programs",
    category: "Permanent Residence",
    short: "Compare provincial pathways and build an application around your skills, experience and destination.",
    intro: "Provincial Nominee Programs allow provinces and territories to nominate candidates whose background aligns with local needs. Streams can change, so we begin by checking current criteria and then map the best-fit options to your profile.",
    help: ["Province and stream comparison", "Eligibility and document review", "Expression-of-interest support", "Nomination and federal-stage guidance"],
    fit: ["You have a preferred province or territory", "Your occupation may align with regional needs", "You want to compare federal and provincial routes"]
  },
  {
    slug: "study-permit",
    title: "Study Permit",
    category: "Temporary Residence",
    short: "A thoughtful study permit file built around your academic plan, finances and future goals.",
    intro: "A strong study permit application should make your study plan easy to understand and support every important statement with appropriate evidence. Aspire helps organize your school, financial and personal documents into a coherent file.",
    help: ["Study-plan strategy", "Document checklist and review", "Financial evidence organization", "Application preparation and submission support"],
    fit: ["You have or are pursuing admission to a Canadian institution", "You need help explaining your study plan", "You want a structured document review"]
  },
  {
    slug: "intra-company-transfer",
    title: "Intra-Company Transfer",
    category: "Temporary Residence",
    short: "Support for eligible businesses moving key employees to a related Canadian operation.",
    intro: "An intra-company transfer may allow an eligible employee to work for a related Canadian entity. These files depend on both the business relationship and the employee’s role, so we review the corporate and personal evidence together.",
    help: ["Company relationship review", "Role and experience assessment", "Employer-document coordination", "Work permit application support"],
    fit: ["Your employer has a qualifying Canadian relationship", "You hold a senior, managerial or specialized role", "Your company needs coordinated document guidance"]
  },
  {
    slug: "work-permit",
    title: "Work Permit",
    category: "Temporary Residence",
    short: "Clear guidance for employer-specific and open work permit applications.",
    intro: "Work permit options depend on the job, employer, applicant and the exemption or authorization being used. We review the full situation first, then prepare the application around the pathway that applies.",
    help: ["Work permit pathway review", "Employer and applicant document checklists", "Application form preparation", "Extension and status-planning support"],
    fit: ["You have a Canadian job opportunity", "You may qualify for an open work permit", "You need help extending or changing work authorization"]
  },
  {
    slug: "super-visa",
    title: "Super Visa",
    category: "Temporary Residence",
    short: "Help parents and grandparents prepare for longer family visits to Canada.",
    intro: "A Super Visa application brings together family, financial, insurance and travel information. Aspire helps applicants and hosts coordinate those pieces and present a complete, easy-to-follow file.",
    help: ["Host and applicant eligibility review", "Invitation and support-document guidance", "Insurance and financial evidence checklist", "Application preparation and review"],
    fit: ["You are a parent or grandparent of a Canadian citizen or permanent resident", "Your family is planning an extended visit", "You want coordinated support for host and applicant documents"]
  },
  {
    slug: "lmia-for-employers",
    title: "LMIA for Employers",
    category: "Temporary Residence",
    short: "Practical support for Canadian employers navigating the LMIA application process.",
    intro: "An LMIA application asks an employer to demonstrate a genuine labour need and follow specific recruitment and program requirements. We help employers understand the process, organize records and prepare a consistent submission.",
    help: ["Initial position and business review", "Recruitment-process guidance", "Employer document preparation", "LMIA application coordination"],
    fit: ["You are a Canadian employer with a genuine vacancy", "You are considering hiring a foreign worker", "You need a clear compliance-focused process"]
  },
  {
    slug: "visitor-visa",
    title: "Visitor Visa",
    category: "Temporary Residence",
    short: "Prepare a focused temporary resident visa application for tourism, family or business travel.",
    intro: "A visitor visa application should explain the purpose and duration of travel while showing how the visit will be supported. Aspire helps applicants identify the right evidence and present it in a straightforward way.",
    help: ["Purpose-of-travel review", "Invitation letter guidance", "Financial and home-ties document planning", "Application preparation and submission support"],
    fit: ["You plan to visit family or friends", "You are travelling for tourism or business", "You want your supporting evidence reviewed"]
  },
  {
    slug: "post-graduation-work-permit",
    title: "Post-Graduation Work Permit",
    category: "Temporary Residence",
    short: "Time-sensitive guidance for eligible graduates moving from study to work in Canada.",
    intro: "Post-graduation work permit applications are closely tied to program eligibility, study history, status and timing. We review those details early and help graduates prepare a complete application before the applicable deadline.",
    help: ["Program and study-history review", "Status and timing assessment", "Graduation-document checklist", "Application preparation and review"],
    fit: ["You recently completed studies in Canada", "You are preparing to transition to work", "You want to confirm your application timeline"]
  },
  {
    slug: "spousal-pr-sponsorship",
    title: "Spousal PR Sponsorship",
    category: "Family & Sponsorship",
    short: "Bring spouses and partners together with a carefully documented sponsorship application.",
    intro: "Spousal sponsorship files combine eligibility, relationship history and extensive supporting evidence. Aspire provides a structured process for both partners so the application is complete, consistent and personal without becoming confusing.",
    help: ["Sponsor and applicant review", "Relationship-evidence planning", "Forms and document coordination", "Application preparation and submission support"],
    fit: ["You are sponsoring a spouse or partner", "You need help organizing relationship evidence", "You want both sides of the application reviewed together"]
  },
  {
    slug: "dependent-sponsorship",
    title: "Child & Dependent Sponsorship",
    category: "Family & Sponsorship",
    short: "Support for families sponsoring eligible dependent children or other qualifying dependants.",
    intro: "Dependent sponsorship requires careful attention to identity, custody, family relationships and the applicant’s circumstances. We create a tailored checklist and help families keep every part of the file aligned.",
    help: ["Sponsor and dependant eligibility review", "Family and custody document guidance", "Forms and evidence coordination", "Application preparation and review"],
    fit: ["You want to sponsor an eligible dependant", "Your family documents span multiple countries", "You need a case-specific document plan"]
  },
  {
    slug: "spousal-work-permit",
    title: "Spousal Work Permit",
    category: "Family & Sponsorship",
    short: "Explore work authorization options available to eligible spouses or partners.",
    intro: "Spousal work permit eligibility depends on the principal applicant’s status and current program rules. Aspire reviews the family’s circumstances, confirms the current pathway and prepares the supporting application.",
    help: ["Current eligibility review", "Principal applicant document check", "Relationship evidence guidance", "Work permit application support"],
    fit: ["Your spouse or partner studies or works in Canada", "You are applying through a qualifying family pathway", "You want current eligibility checked before applying"]
  },
  {
    slug: "parent-grandparent-sponsorship",
    title: "Parent & Grandparent Sponsorship",
    category: "Family & Sponsorship",
    short: "Plan and prepare family sponsorship for eligible parents and grandparents.",
    intro: "The parent and grandparent sponsorship process has program-specific intake and financial requirements. Aspire helps invited sponsors organize family, income and civil-status records for a well-prepared application.",
    help: ["Sponsor and family eligibility review", "Income-document planning", "Civil-status record checklist", "Application preparation and review"],
    fit: ["You have been invited under the current program", "You are gathering multi-year family records", "You need help coordinating sponsor and applicant documents"]
  }
];

const icon = `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"/></svg>`;

function header(active = "") {
  return `
  <a class="skip-link" href="#main">Skip to content</a>
  <div class="topbar">
    <div class="shell topbar-inner">
      <div class="topbar-links">
        <a href="tel:+16045470367">Surrey: (604) 547-0367</a>
        <a href="mailto:Immigration@aspiregroup.ca">Immigration@aspiregroup.ca</a>
      </div>
      <span>Serving clients in Canada and worldwide</span>
    </div>
  </div>
  <header class="site-header">
    <div class="shell nav-row">
      <a class="brand" href="index.html" aria-label="Aspire Immigration Services home">
        <img src="assets/aspire-logo.png" alt="Aspire Immigration Services">
      </a>
      <nav class="main-nav" id="main-navigation" aria-label="Primary navigation">
        <a ${active === "home" ? 'class="active"' : ""} href="index.html">Home</a>
        <a ${active === "about" ? 'class="active"' : ""} href="about.html">About</a>
        <a ${active === "services" ? 'class="active"' : ""} href="services.html">Services</a>
        <a ${active === "contact" ? 'class="active"' : ""} href="contact.html">Contact</a>
      </nav>
      <div class="nav-actions">
        <a class="button button-small" href="contact.html">Book a consultation</a>
        <button class="menu-toggle" type="button" aria-label="Open navigation" aria-expanded="false" aria-controls="main-navigation">
          <span></span><span></span><span></span>
        </button>
      </div>
    </div>
  </header>`;
}

function footer() {
  const serviceLinks = services.slice(0, 6).map(s => `<a href="${s.slug}.html">${s.title}</a>`).join("");
  return `
  <section class="cta-band">
    <div class="shell cta-band-inner">
      <div>
        <span class="kicker kicker-light">Your next step</span>
        <h2>Let’s find the right path forward.</h2>
      </div>
      <a class="button button-light" href="contact.html">Talk to Aspire ${icon}</a>
    </div>
  </section>
  <footer class="site-footer">
    <div class="shell footer-grid">
      <div class="footer-brand">
        <img src="assets/aspire-logo.png" alt="Aspire Immigration Services">
        <p>Licensed professionals providing clear, careful immigration support since 2012.</p>
      </div>
      <div>
        <h3>Explore</h3>
        <a href="about.html">About Aspire</a>
        <a href="services.html">All services</a>
        <a href="contact.html">Contact</a>
      </div>
      <div>
        <h3>Popular services</h3>
        ${serviceLinks}
      </div>
      <div>
        <h3>Surrey head office</h3>
        <p>12888 80A Avenue, Unit 111-A<br>Surrey, BC V3W 3A8</p>
        <a href="tel:+16045470367">(604) 547-0367</a>
        <a href="mailto:Immigration@aspiregroup.ca">Immigration@aspiregroup.ca</a>
      </div>
    </div>
    <div class="shell footer-bottom">
      <span>© <span data-year></span> Aspire Immigration Services. All rights reserved.</span>
      <span>Immigration information changes frequently. An assessment is required before advice can be provided.</span>
    </div>
  </footer>
  <script src="script.js"></script>`;
}

function layout({ title, description, active, body }) {
  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${title} | Aspire Immigration Services</title>
  <meta name="description" content="${description}">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=Manrope:wght@500;600;700;800&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="styles.css">
</head>
<body>
${header(active)}
<main id="main">${body}</main>
${footer()}
</body>
</html>`;
}

const categoryClass = category => category.startsWith("Permanent") ? "cat-pr" : category.startsWith("Temporary") ? "cat-temp" : "cat-family";

function serviceCard(service, index) {
  return `<article class="service-card reveal ${categoryClass(service.category)}">
    <div class="service-card-top"><span class="service-index">${String(index + 1).padStart(2, "0")}</span><span class="service-category">${service.category}</span></div>
    <h3>${service.title}</h3>
    <p>${service.short}</p>
    <a class="text-link" href="${service.slug}.html">View service ${icon}</a>
  </article>`;
}

const home = layout({
  title: "Canadian Immigration Guidance",
  description: "Aspire Immigration Services provides professional support for permanent residence, work permits, study permits, family sponsorship and visitor applications.",
  active: "home",
  body: `
  <section class="hero">
    <div class="shell hero-grid">
      <div class="hero-copy reveal">
        <span class="kicker">Canadian immigration, made clearer</span>
        <h1>Your future in Canada deserves a <em>thoughtful plan.</em></h1>
        <p>Aspire brings licensed professionals, a careful process and more than a decade of experience to every immigration journey.</p>
        <div class="button-row">
          <a class="button" href="contact.html">Book a consultation ${icon}</a>
          <a class="button button-outline" href="services.html">Explore services</a>
        </div>
        <div class="hero-proof">
          <div><strong>Since 2012</strong><span>Serving clients worldwide</span></div>
          <div><strong>5 offices</strong><span>Across Canada and India</span></div>
          <div><strong>RCIC team</strong><span>Licensed professionals</span></div>
        </div>
      </div>
      <div class="hero-art reveal" aria-label="Aspire immigration journey graphic">
        <div class="maple-orbit orbit-one"></div>
        <div class="maple-orbit orbit-two"></div>
        <div class="hero-card">
          <span class="card-label">Your Aspire plan</span>
          <div class="plan-step"><b>01</b><span><strong>Assess</strong> your profile</span></div>
          <div class="plan-step"><b>02</b><span><strong>Choose</strong> the right pathway</span></div>
          <div class="plan-step"><b>03</b><span><strong>Prepare</strong> with care</span></div>
          <div class="plan-step"><b>04</b><span><strong>Move</strong> forward confidently</span></div>
        </div>
        <div class="accent-dot accent-dot-one"></div><div class="accent-dot accent-dot-two"></div>
      </div>
    </div>
  </section>
  <section class="trust-strip">
    <div class="shell trust-grid">
      <span>Permanent residence</span><span>Temporary residence</span><span>Family sponsorship</span><span>Employer services</span>
    </div>
  </section>
  <section class="section">
    <div class="shell">
      <div class="section-heading reveal">
        <div><span class="kicker">How we help</span><h2>Immigration support for life’s big moves.</h2></div>
        <p>From a first study permit to permanent residence and family reunification, our team brings order and clarity to a complex process.</p>
      </div>
      <div class="category-grid">
        <a class="category-card category-card-dark reveal" href="services.html#permanent-residence">
          <span class="category-number">01</span><div><h3>Permanent Residence</h3><p>Federal and provincial economic pathways for skilled professionals and tradespeople.</p><span class="text-link">Explore pathways ${icon}</span></div>
        </a>
        <a class="category-card reveal" href="services.html#temporary-residence">
          <span class="category-number">02</span><div><h3>Temporary Residence</h3><p>Study, work and visit Canada with an application built around your purpose.</p><span class="text-link">Explore pathways ${icon}</span></div>
        </a>
        <a class="category-card category-card-green reveal" href="services.html#family-sponsorship">
          <span class="category-number">03</span><div><h3>Family & Sponsorship</h3><p>Bring loved ones together through a carefully coordinated family application.</p><span class="text-link">Explore pathways ${icon}</span></div>
        </a>
      </div>
    </div>
  </section>
  <section class="section section-soft">
    <div class="shell">
      <div class="section-heading reveal">
        <div><span class="kicker">Featured services</span><h2>Start with what brings you here.</h2></div>
        <a class="text-link desktop-link" href="services.html">View all 15 services ${icon}</a>
      </div>
      <div class="services-grid">${services.slice(0, 6).map(serviceCard).join("")}</div>
    </div>
  </section>
  <section class="section">
    <div class="shell story-grid">
      <div class="story-visual reveal">
        <div class="since-badge"><strong>2012</strong><span>Founded in Surrey</span></div>
        <div class="story-pattern"></div>
      </div>
      <div class="story-copy reveal">
        <span class="kicker">About Aspire</span>
        <h2>Professional care. Personal attention.</h2>
        <p>Aspire Immigration Services was founded with a simple goal: combine strong professional standards with a client experience that never feels like a file number.</p>
        <p>Today, our licensed team supports clients from offices in Surrey, Mississauga, Edmonton, Chandigarh and Patiala.</p>
        <a class="button button-outline" href="about.html">Meet Aspire ${icon}</a>
      </div>
    </div>
  </section>
  <section class="section section-navy">
    <div class="shell">
      <div class="section-heading light reveal">
        <div><span class="kicker kicker-light">Our process</span><h2>One clear step at a time.</h2></div>
        <p>You’ll know what we need, what happens next and where your application stands.</p>
      </div>
      <div class="process-grid">
        <div class="process-card reveal"><span>01</span><h3>Consult</h3><p>We listen to your goals and review the important facts.</p></div>
        <div class="process-card reveal"><span>02</span><h3>Plan</h3><p>We identify a suitable pathway and build your checklist.</p></div>
        <div class="process-card reveal"><span>03</span><h3>Prepare</h3><p>We organize, review and refine the complete application.</p></div>
        <div class="process-card reveal"><span>04</span><h3>Proceed</h3><p>We support submission and keep you informed afterward.</p></div>
      </div>
    </div>
  </section>`
});

const grouped = ["Permanent Residence", "Temporary Residence", "Family & Sponsorship"];
const servicesPage = layout({
  title: "Immigration Services",
  description: "Explore Aspire Immigration Services for permanent residence, temporary residence, work, study and family sponsorship applications.",
  active: "services",
  body: `
  <section class="page-hero">
    <div class="shell narrow reveal">
      <span class="kicker kicker-light">15 focused services</span>
      <h1>A pathway for where you are—and where you want to go.</h1>
      <p>Browse our services by category. Each page explains how Aspire can help and what to expect from the first conversation.</p>
    </div>
  </section>
  <section class="section">
    <div class="shell">
      ${grouped.map(category => {
        const list = services.filter(s => s.category === category);
        const id = category === "Permanent Residence" ? "permanent-residence" : category === "Temporary Residence" ? "temporary-residence" : "family-sponsorship";
        return `<div class="service-group" id="${id}">
          <div class="group-heading reveal"><span>${String(grouped.indexOf(category) + 1).padStart(2, "0")}</span><div><h2>${category}</h2><p>${category === "Permanent Residence" ? "Economic programs for skilled professionals and tradespeople." : category === "Temporary Residence" ? "Options for studying, working, visiting and employing talent in Canada." : "Applications that help eligible families live and work together."}</p></div></div>
          <div class="services-grid">${list.map((s, i) => serviceCard(s, services.indexOf(s))).join("")}</div>
        </div>`;
      }).join("")}
    </div>
  </section>`
});

const about = layout({
  title: "About Us",
  description: "Learn about Aspire Immigration Services, founded in 2012 with offices across Canada and India.",
  active: "about",
  body: `
  <section class="page-hero page-hero-split">
    <div class="shell split-hero-grid">
      <div class="reveal"><span class="kicker kicker-light">About Aspire</span><h1>Built on careful work and genuine human attention.</h1></div>
      <p class="reveal">Since 2012, our goal has been to make professional immigration support feel personal, organized and clear.</p>
    </div>
  </section>
  <section class="section">
    <div class="shell about-intro">
      <div class="about-lead reveal"><span class="kicker">Our story</span><h2>Your application is never just another number.</h2></div>
      <div class="prose reveal">
        <p>Founded in 2012, Aspire Immigration Services supports study-abroad applicants, skilled workers, business people, investors and families pursuing opportunities in Canada.</p>
        <p>Our team includes licensed immigration professionals who prepare applications across a wide range of Canadian programs. We carefully manage our capacity so each client receives meaningful attention throughout the process.</p>
        <p>From our Surrey head office and branches in Mississauga, Edmonton, Chandigarh and Patiala, we serve clients in Canada and around the world.</p>
      </div>
    </div>
  </section>
  <section class="section section-soft">
    <div class="shell">
      <div class="section-heading reveal"><div><span class="kicker">What guides us</span><h2>Standards you can feel in the process.</h2></div></div>
      <div class="value-grid">
        <article class="value-card reveal"><span>01</span><h3>Clarity</h3><p>Plain-language explanations, realistic expectations and a clear list of next steps.</p></article>
        <article class="value-card reveal"><span>02</span><h3>Care</h3><p>Every document matters, and so does the person whose future depends on it.</p></article>
        <article class="value-card reveal"><span>03</span><h3>Professionalism</h3><p>Licensed guidance, organized preparation and responsible communication.</p></article>
        <article class="value-card reveal"><span>04</span><h3>Consistency</h3><p>A process designed to keep your forms, evidence and personal story aligned.</p></article>
      </div>
    </div>
  </section>
  <section class="section">
    <div class="shell milestone">
      <div class="milestone-number reveal">12<span>+</span></div>
      <div class="reveal"><span class="kicker">Years of service</span><h2>Rooted in Surrey.<br>Connected worldwide.</h2><p>Aspire has grown across provinces and borders while keeping personal service at the centre of the work.</p></div>
    </div>
  </section>`
});

const offices = [
  ["Surrey · Head Office", "12888 80A Avenue, Unit 111-A", "Surrey, BC V3W 3A8", "(604) 547-0367", "Immigration@aspiregroup.ca"],
  ["Mississauga", "735 Twain Avenue", "Mississauga, ON L5W 1X1", "(289) 327-1293", "Toronto@aspiregroup.ca"],
  ["Edmonton", "206–9605 41 Avenue NW", "Edmonton, AB T6E 5X7", "(587) 887-8290", "Edmonton@aspiregroup.ca"],
  ["Chandigarh", "SCO 64–65, 2nd Floor, Sector 17A", "Chandigarh 160017, India", "+91 98769 12272", "chd@aspiregroup.ca"],
  ["Patiala", "SCO 11-DC, 1st Floor, Chotti Baradari", "Patiala, India", "+91 98769 12272", "patiala@aspiregroup.ca"]
];

const contact = layout({
  title: "Contact Us",
  description: "Contact Aspire Immigration Services in Surrey, Mississauga, Edmonton, Chandigarh or Patiala.",
  active: "contact",
  body: `
  <section class="page-hero">
    <div class="shell narrow reveal"><span class="kicker kicker-light">Let’s talk</span><h1>Tell us where you want to go.</h1><p>Share a few details and our team will contact you about the next step.</p></div>
  </section>
  <section class="section">
    <div class="shell contact-grid">
      <div class="contact-copy reveal">
        <span class="kicker">Start a conversation</span><h2>We’re ready when you are.</h2>
        <p>Use the form to request a consultation. Please do not include passport numbers, banking details or other sensitive documents in this first message.</p>
        <div class="contact-direct"><span>Prefer to call?</span><a href="tel:+16045470367">(604) 547-0367</a><a href="mailto:Immigration@aspiregroup.ca">Immigration@aspiregroup.ca</a></div>
      </div>
      <form class="contact-form reveal" data-contact-form>
        <div class="form-row"><label>First name<input name="firstName" autocomplete="given-name" required></label><label>Last name<input name="lastName" autocomplete="family-name" required></label></div>
        <label>Email address<input type="email" name="email" autocomplete="email" required></label>
        <label>Phone number<input type="tel" name="phone" autocomplete="tel"></label>
        <label>Service of interest<select name="service"><option value="">Choose a service</option>${services.map(s => `<option>${s.title}</option>`).join("")}</select></label>
        <label>How can we help?<textarea name="message" rows="5" required></textarea></label>
        <button class="button" type="submit">Request consultation ${icon}</button>
        <p class="form-note" role="status" data-form-status>This demo form is ready to connect to your email or CRM.</p>
      </form>
    </div>
  </section>
  <section class="section section-soft">
    <div class="shell">
      <div class="section-heading reveal"><div><span class="kicker">Our offices</span><h2>Find Aspire near you.</h2></div></div>
      <div class="office-grid">
        ${offices.map((o, i) => `<article class="office-card reveal"><span>${String(i + 1).padStart(2, "0")}</span><h3>${o[0]}</h3><p>${o[1]}<br>${o[2]}</p><a href="tel:${o[3].replace(/[^\d+]/g, "")}">${o[3]}</a><a href="mailto:${o[4]}">${o[4]}</a></article>`).join("")}
      </div>
    </div>
  </section>`
});

function servicePage(service) {
  const related = services.filter(s => s.category === service.category && s.slug !== service.slug).slice(0, 3);
  return layout({
    title: service.title,
    description: `${service.title} application guidance from Aspire Immigration Services.`,
    active: "services",
    body: `
    <section class="service-hero">
      <div class="shell service-hero-grid">
        <div class="reveal"><a class="back-link" href="services.html">← All services</a><span class="kicker kicker-light">${service.category}</span><h1>${service.title}</h1><p>${service.short}</p><a class="button button-light" href="contact.html">Discuss your case ${icon}</a></div>
        <div class="service-hero-mark reveal"><span>${String(services.indexOf(service) + 1).padStart(2, "0")}</span><small>Aspire service guide</small></div>
      </div>
    </section>
    <section class="section">
      <div class="shell detail-grid">
        <article class="detail-main reveal">
          <span class="kicker">Overview</span><h2>A clear plan begins with the full picture.</h2><p class="lead">${service.intro}</p>
          <div class="detail-block"><h3>How Aspire can help</h3><ul class="check-list">${service.help.map(x => `<li>${x}</li>`).join("")}</ul></div>
          <div class="detail-block"><h3>This service may be relevant if</h3><ul class="check-list">${service.fit.map(x => `<li>${x}</li>`).join("")}</ul></div>
          <div class="notice"><strong>Important:</strong> Program criteria, forms and processing practices can change. Aspire confirms current requirements during your assessment.</div>
        </article>
        <aside class="detail-sidebar reveal">
          <span class="kicker">What to expect</span>
          <ol><li><b>01</b><span><strong>Initial assessment</strong>We review your goals and relevant history.</span></li><li><b>02</b><span><strong>Document plan</strong>You receive a tailored, practical checklist.</span></li><li><b>03</b><span><strong>File preparation</strong>Forms and supporting records are organized and reviewed.</span></li><li><b>04</b><span><strong>Next-step support</strong>We guide the submission process and communication.</span></li></ol>
          <a class="button" href="contact.html">Book a consultation</a>
        </aside>
      </div>
    </section>
    <section class="section section-soft">
      <div class="shell"><div class="section-heading reveal"><div><span class="kicker">Related services</span><h2>Other paths to explore.</h2></div></div><div class="services-grid">${related.map(s => serviceCard(s, services.indexOf(s))).join("")}</div></div>
    </section>`
  });
}

writeFileSync("index.html", home);
writeFileSync("services.html", servicesPage);
writeFileSync("about.html", about);
writeFileSync("contact.html", contact);
for (const service of services) writeFileSync(`${service.slug}.html`, servicePage(service));

console.log(`Generated 4 core pages and ${services.length} service pages.`);
