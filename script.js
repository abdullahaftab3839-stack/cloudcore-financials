document.addEventListener('DOMContentLoaded', () => {

  // --- 1. Mobile Navigation Toggle ---
  const mobileToggle = document.getElementById('mobileToggle');
  const navLinks = document.getElementById('navLinks');

  if (mobileToggle && navLinks) {
    mobileToggle.addEventListener('click', () => {
      navLinks.classList.toggle('active');
      const icon = mobileToggle.querySelector('i');
      if (navLinks.classList.contains('active')) {
        icon.classList.remove('fa-bars');
        icon.classList.add('fa-xmark');
      } else {
        icon.classList.remove('fa-xmark');
        icon.classList.add('fa-bars');
      }
    });

    // Close nav drawer on link click in mobile view
    document.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        const icon = mobileToggle.querySelector('i');
        if (icon) {
          icon.classList.remove('fa-xmark');
          icon.classList.add('fa-bars');
        }
      });
    });
  }

  // --- 2. Dynamic Copyright Year ---
  const yearSpan = document.getElementById('currentYear');
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }

  // --- 3. Interactive Currency Switcher (Pricing Page) ---
  const currBtns = document.querySelectorAll('.curr-btn');
  const priceVals = document.querySelectorAll('.price-val');
  const currSymbols = document.querySelectorAll('.curr-symbol');

  // Conversion rates baseline from 1 USD
  const conversionRates = {
    USD: { rate: 1, symbol: '$' },
    GBP: { rate: 0.78, symbol: '£' },
    AED: { rate: 3.67, symbol: 'AED ' }
  };

  if (currBtns.length > 0) {
    currBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        currBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const selectedCurr = btn.getAttribute('data-curr');
        const { rate, symbol } = conversionRates[selectedCurr];

        priceVals.forEach(priceElem => {
          const usdPrice = parseFloat(priceElem.getAttribute('data-usd'));
          const convertedPrice = Math.round(usdPrice * rate);
          priceElem.textContent = convertedPrice.toLocaleString();
        });

        currSymbols.forEach(symbolElem => {
          symbolElem.textContent = symbol;
        });
      });
    });
  }

  // --- 4. Contact Form & WhatsApp Integration ---
  const contactForm = document.getElementById('contactForm');
  const formResponse = document.getElementById('formResponse');
  const sendWhatsAppBtn = document.getElementById('sendWhatsAppBtn');

  const myWhatsAppNumber = '923376023008';
  const myEmail = 'contact@cloudcorefinancials.com.pk';

  if (contactForm && formResponse) {

    // A) Send via WhatsApp Button
    if (sendWhatsAppBtn) {
      sendWhatsAppBtn.addEventListener('click', () => {
        const name = document.getElementById('fullName').value.trim();
        const email = document.getElementById('email').value.trim();
        const country = document.getElementById('country').value;
        const msg = document.getElementById('message').value.trim();

        if (!name || !email || !country || !msg) {
          formResponse.style.color = '#EF4444';
          formResponse.textContent = 'Please fill out all fields before sending via WhatsApp.';
          return;
        }

        const formattedMessage = 
          `*New Business Inquiry - CloudCore Financials*%0A%0A` +
          `*Full Name:* ${encodeURIComponent(name)}%0A` +
          `*Work Email:* ${encodeURIComponent(email)}%0A` +
          `*Operating Region:* ${encodeURIComponent(country)}%0A%0A` +
          `*Inquiry Details:*%0A${encodeURIComponent(msg)}`;

        window.open(`https://wa.me/${myWhatsAppNumber}?text=${formattedMessage}`, '_blank');

        formResponse.style.color = '#10B981';
        formResponse.textContent = 'Opening WhatsApp with your pre-filled inquiry...';
      });
    }

    // B) Send via Web3Forms Email Submission
    contactForm.addEventListener('submit', async (e) => {
      e.preventDefault();

      formResponse.style.color = '#D97706';
      formResponse.textContent = 'Sending your inquiry to contact@cloudcorefinancials.com.pk...';

      const formData = new FormData(contactForm);

      try {
        const response = await fetch('https://api.web3forms.com/submit', {
          method: 'POST',
          body: formData
        });

        const result = await response.json();

        if (result.success) {
          formResponse.style.color = '#10B981';
          formResponse.textContent = 'Thank you! Your inquiry has been sent directly to contact@cloudcorefinancials.com.pk. We will reply within 12 hours.';
          contactForm.reset();
        } else {
          formResponse.style.color = '#EF4444';
          formResponse.textContent = 'Submission error. Please check your Web3Forms access key or try WhatsApp.';
        }
      } catch (error) {
        formResponse.style.color = '#EF4444';
        formResponse.textContent = 'Network error. Please try again or reach out directly on WhatsApp.';
      }

      setTimeout(() => {
        formResponse.textContent = '';
      }, 7000);
    });
  }

});