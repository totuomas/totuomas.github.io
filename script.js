const isEnglish = window.location.pathname.includes("/en");

// Ocean background
function updateOceanBackground() {
  const bg = document.getElementById('ocean-bg')
  const scrollY = window.scrollY
  const maxScroll = document.documentElement.scrollHeight - window.innerHeight
  let progress = Math.min(scrollY / (maxScroll * 0.85), 1)

  const lightHue = 197
  const deepHue = 210
  const topLightness = Math.round(82 - progress * 72)
  const bottomLightness = Math.round(68 - progress * 58)
  const saturation = Math.round(85 + progress * 10)

  bg.style.background = `linear-gradient(to bottom,
    hsl(${lightHue}, ${saturation}%, ${topLightness}%),
    hsl(${deepHue}, ${saturation}%, ${bottomLightness}%))`
}

// Bubbles
function createBubbles() {
  const container = document.getElementById('bubbles-container')
  const profileContainer = document.getElementById('profile-container')

  const navItems = [
    { id: 'about', label: isEnglish ? 'About' : 'Minusta' },
    { id: 'experience', label: isEnglish ? 'Experience' : 'Kokemus' },
    { id: 'education', label: isEnglish ? 'Education' : 'Koulutus' },
    { id: 'projects', label: isEnglish ? 'Projects' : 'Projektit' },
    { id: 'skills', label: isEnglish ? 'Skills' : 'Taidot' },
    { id: 'contact', label: isEnglish ? 'Contact' : 'Yhteys' }
  ]

  const radius = 200

  navItems.forEach((item, i) => {
    const angle = (i * (360 / navItems.length)) * (Math.PI / 180) - 1.05
    const bubble = document.createElement('div')
    bubble.className = 'bubble'
    bubble.dataset.angle = angle
    bubble.innerHTML = `<span>${item.label}</span>`

    bubble.addEventListener('click', () => {
      document.getElementById(item.id)?.scrollIntoView({ behavior: 'smooth' })
    })

    container.appendChild(bubble)
  })

  function positionBubbles() {
      const bubbles = container.querySelectorAll('.bubble');
      const centerX = profileContainer.offsetWidth / 2;
      const centerY = profileContainer.offsetHeight / 2;

      let radius = Math.min(centerX, centerY);
      if (window.innerWidth >= 768) radius = radius * 0.9;

      bubbles.forEach(bubble => {
          const angle = parseFloat(bubble.dataset.angle);
          const x = centerX + radius * Math.cos(angle);
          const y = centerY + radius * Math.sin(angle);
          bubble.style.left = `${x - bubble.offsetWidth / 2}px`;
          bubble.style.top = `${y - bubble.offsetHeight / 2}px`;
      });
  }

  positionBubbles()
  window.addEventListener('resize', positionBubbles)

  // stagger pop-in
  const bubbles = container.querySelectorAll('.bubble')
  bubbles.forEach((b, i) => {
    setTimeout(() => b.classList.add('show'), 400 + i * 120)
  })
}

// Hero animations
function initHeroAnimations() {
  const profile = document.querySelector(".profile")
  const name = document.getElementById("hero-name")
  const tagline = document.getElementById("hero-tagline")
  const bg = document.getElementById("ocean-bg")

  setTimeout(() => {
    profile.classList.add("loaded")
    bg.classList.add("loaded")
  }, 100)

  setTimeout(() => name.classList.add("show"), 400)
  setTimeout(() => tagline.classList.add("show"), 700)
}

// Scroll arrow
function initScrollDownArrow() {
  document.getElementById('scroll-down').addEventListener('click', () => {
    document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })
  })
}

// Typewriter
function typeWriter(element, text, speed = 20) {
  let i = 0
  element.textContent = ""

  function typing() {
    if (i < text.length) {
      element.textContent += text.charAt(i)
      i++
      setTimeout(typing, speed)
    }
  }

  typing()
}

// Inside the initScrollAnimations function, modify it as follows:

function initScrollAnimations() {
  const sections = document.querySelectorAll('.section')
  let hasTypedAbout = false

  sections.forEach(sec => sec.classList.add('section-hidden'))

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        
        entry.target.classList.add('section-show')
        entry.target.classList.remove('section-hidden')

        if (entry.target.id === "about" && !hasTypedAbout) {
          hasTypedAbout = true
          const textEl = document.getElementById("minusta-text")

          const text = isEnglish
          ? "Hi! I'm Tuomas, a Bachelor of Engineering in Information Technology with a passion for technology and pedagogy. My hobbies include chess and sports. During my studies, I worked on several multidisciplinary software projects in roles ranging from designer to developer and even commercial responsibilities. I enjoy learning new things and tackling new challenges. Scroll down to explore my skills further."
          : "Hei! Olen Tuomas, tietotekniikan insinööri intohimonani teknologia ja pedagogiikka, harrastuksina shakki ja urheilu. Työskentelin opintojeni aikana useissa poikkitieteellistä osaamista vaativissa ohjelmistoprojekteissa milloin suunnittelijana, milloin kehittäjänä ja milloin kaupallisissa tehtävissä. Pidän uuden oppimisesta ja taklaan mielelläni uusia haasteita. Skrollaamalla alas pääset syvemmälle osaamiseeni."

          // Type out the main text
          typeWriter(textEl, text, 15)

          // After typing is complete, fade in the keywords one by one
          setTimeout(() => {
            const keywords = document.querySelectorAll('.keyword')

            keywords.forEach((keyword, index) => {
              // Ensure initial state is applied BEFORE transition
              keyword.style.opacity = "0"

              setTimeout(() => {
                keyword.style.transition = "opacity 1s ease"
                keyword.style.opacity = "1"
              }, 50 + index * 300) // small delay + stagger
            })
          }, text.length * 15 + 500)
        }
      }
    })
  }, { threshold: 0.2 })

  sections.forEach(sec => observer.observe(sec))
}

// Init
function init() {
  createBubbles()
  initHeroAnimations()
  initScrollDownArrow()
  initScrollAnimations()

  window.addEventListener('scroll', updateOceanBackground)
  updateOceanBackground()
}

window.onload = init

const backToTopBtn = document.getElementById('back-to-top');

backToTopBtn.addEventListener('click', () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
});

const fadeElements = document.querySelectorAll('.fade-in');

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('show');
      observer.unobserve(entry.target); // animate only once
    }
  });
}, {
  threshold: 0.2
});

fadeElements.forEach((el) => {
  observer.observe(el);
});