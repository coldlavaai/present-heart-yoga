/* ============================================
   Cold Lava AI Chat Widget v3.0
   Premium Reference Design
   Self-contained, no dependencies
   ============================================ */
(function() {
  'use strict';

  // ---- Industry Configurations ----
  var INDUSTRY_CONFIGS = {

    'dental': {
      botName: 'Dental Assistant',
      botEmoji: '🦷',
      theme: 'light',
      greeting: "Hi! 👋 Welcome to {{BUSINESS_NAME}}. I'm your virtual dental assistant. How can I help you today?",
      quickReplies: ['Book appointment', 'Pricing', 'Emergency', 'Nervous patients', 'Treatments'],
      responses: [
        { keywords: ['book', 'appointment', 'schedule', 'availability', 'register'],
          answer: "I'd love to help you book an appointment! 📅 You can:\n\n• **Book online** using our booking form below\n• **Call us** on {{PHONE}}\n• **Email** {{EMAIL}}\n\nWe have morning, afternoon and evening slots available. New patients are always welcome!" },
        { keywords: ['price', 'pricing', 'cost', 'how much', 'fee', 'fees', 'charge', 'nhs'],
          answer: "Great question! Here's a quick overview of our pricing:\n\n🏥 **NHS Prices:**\n• Check-up: from £26.80\n• Band 2 treatment: from £73.50\n\n✨ **Private Prices:**\n• Check-up: from £75\n• Hygiene: from £85\n\nWe also offer **0% finance** and monthly dental plans. Would you like more details on any specific treatment?" },
        { keywords: ['emergency', 'urgent', 'pain', 'broken', 'knocked', 'swollen', 'bleeding'],
          answer: "I'm sorry you're in discomfort. 🏥 For dental emergencies:\n\n📞 **Call us immediately** on {{PHONE}}\n\nWe keep **same-day emergency slots** available every day we're open. If it's outside our hours, please call **NHS 111** for out-of-hours dental advice.\n\nHang in there — we'll look after you!" },
        { keywords: ['nervous', 'scared', 'anxious', 'anxiety', 'phobia', 'afraid', 'fear', 'worried'],
          answer: "You're absolutely not alone — around 1 in 4 adults feel anxious about the dentist. 💙\n\nAt {{BUSINESS_NAME}}, we specialise in nervous patient care:\n\n• Calm, unhurried appointments\n• We explain every step before we do it\n• Sedation options available\n• You're always in control\n\nMany of our most anxious patients now tell us they actually enjoy their visits! Would you like to book a gentle introductory appointment?" },
        { keywords: ['treatment', 'services', 'what do you', 'offer', 'invisalign', 'whitening', 'implant', 'veneer', 'crown'],
          answer: "We offer a full range of dental treatments:\n\n🔍 Check-ups & Hygiene\n✨ Cosmetic Dentistry & Veneers\n😁 Invisalign® Clear Aligners\n🦷 Dental Implants\n💎 Teeth Whitening\n👑 Crowns & Bridges\n🩺 Root Canal Treatment\n🚨 Emergency Dentistry\n\nWould you like to know more about any of these? I can give you pricing and details." },
        { keywords: ['hour', 'hours', 'open', 'when', 'time', 'times', 'closed', 'saturday', 'sunday'],
          answer: "Our opening hours are:\n\n🕐 {{HOURS}}\n\n📍 Find us at: {{ADDRESS}}\n\nWould you like to book an appointment?" },
        { keywords: ['finance', 'payment', 'plan', 'pay monthly', 'spread', 'afford'],
          answer: "We believe great dental care should be accessible! 💳\n\n• **0% interest-free finance** on treatments over £500 (6-12 months)\n• **Monthly dental plan** from just £14.95/month — covers check-ups, hygiene, and 10% off all treatments\n\nWould you like more details about our payment options?" }
      ],
      fallback: "Thanks for your question! For the best answer, I'd recommend speaking with our team directly:\n\n📞 {{PHONE}}\n📧 {{EMAIL}}\n\nOr I can help you book an appointment — just let me know! 😊"
    },

    'accountancy': {
      botName: 'Accounts Assistant',
      botEmoji: '📊',
      theme: 'light',
      greeting: "Hello! 👋 Welcome to {{BUSINESS_NAME}}. I'm here to help with any questions about our accounting and tax services. How can I assist you?",
      quickReplies: ['Get a quote', 'Tax returns', 'Bookkeeping', 'Company formation', 'Pricing'],
      responses: [
        { keywords: ['quote', 'price', 'pricing', 'cost', 'how much', 'fee', 'fees', 'charge', 'package'],
          answer: "Our fees depend on the complexity of your needs, but here's a rough guide:\n\n📋 **Self Assessment Tax Returns** — from £150+VAT\n📚 **Bookkeeping** — from £75/month\n🏢 **Limited Company Accounts** — from £500+VAT/year\n💼 **Payroll** — from £50/month\n\nWe offer a **free initial consultation** to understand your needs and give you an exact quote. Shall I arrange one?" },
        { keywords: ['tax', 'return', 'self assessment', 'hmrc', 'deadline', 'personal tax'],
          answer: "We handle all types of tax returns:\n\n📝 **Self Assessment** — personal tax returns\n🏢 **Corporation Tax** — for limited companies\n💰 **VAT Returns** — quarterly or annual\n📊 **Capital Gains** — property, shares, crypto\n\nThe self assessment deadline is **31st January** each year. Don't leave it late — we can get yours sorted quickly!\n\nWant us to handle your return? Just get in touch." },
        { keywords: ['bookkeeping', 'books', 'accounts', 'record', 'receipt', 'invoice', 'xero', 'quickbooks', 'sage'],
          answer: "Our bookkeeping service keeps your finances organised and HMRC-ready. 📚\n\nWe work with **Xero, QuickBooks, and Sage** and can:\n\n• Process invoices & receipts\n• Bank reconciliation\n• Monthly management reports\n• VAT preparation\n\nWe handle it all so you can focus on running your business. Shall I arrange a chat about your needs?" },
        { keywords: ['company', 'formation', 'limited', 'set up', 'start', 'new business', 'incorporate', 'ltd'],
          answer: "Thinking of going limited? Great choice! 🏢\n\nWe offer a **complete company formation service**:\n\n✅ Companies House registration\n✅ HMRC registration (Corporation Tax, VAT, PAYE)\n✅ Advice on share structure\n✅ Setting up accounting software\n✅ Ongoing compliance support\n\nWe can have you up and running in **24-48 hours**. Want to discuss your options?" },
        { keywords: ['payroll', 'paye', 'staff', 'employee', 'wages', 'salary', 'pension', 'auto enrolment'],
          answer: "Our payroll service covers everything you need:\n\n💷 Monthly/weekly payslips\n📊 RTI submissions to HMRC\n🏖️ Holiday & sickness tracking\n🏦 Auto-enrolment pension setup\n📋 P45s, P60s, and year-end reporting\n\nPricing starts from **£50/month** depending on team size. Shall I get someone to call you?" },
        { keywords: ['hour', 'hours', 'open', 'when', 'time', 'contact', 'address', 'where'],
          answer: "Here's how to reach us:\n\n📞 {{PHONE}}\n📧 {{EMAIL}}\n📍 {{ADDRESS}}\n🕐 {{HOURS}}\n\nWe also offer **video consultations** for your convenience. Would you like to book a call?" },
        { keywords: ['vat', 'register', 'threshold', 'return'],
          answer: "VAT can be complex — but we make it simple! 📋\n\nThe current VAT registration threshold is **£85,000**. We can help with:\n\n• VAT registration\n• Choosing the right scheme (Standard, Flat Rate, Cash)\n• Quarterly or annual returns\n• Making Tax Digital compliance\n\nWould you like to discuss your VAT situation?" }
      ],
      fallback: "Thanks for your question! For specific advice, I'd recommend a quick chat with our team:\n\n📞 {{PHONE}}\n📧 {{EMAIL}}\n\nWe offer a **free initial consultation** — no obligation. Shall I arrange one? 😊"
    },

    'beauty-salon': {
      botName: 'Beauty Advisor',
      botEmoji: '💆',
      theme: 'light',
      greeting: "Hey there! ✨ Welcome to {{BUSINESS_NAME}}. I'm here to help you find the perfect treatment. What are you looking for?",
      quickReplies: ['Book now', 'Treatments & prices', 'Gift vouchers', 'Opening hours', 'Special offers'],
      responses: [
        { keywords: ['book', 'appointment', 'schedule', 'availability', 'available'],
          answer: "I'd love to help you book! 💅\n\nYou can:\n• **Book online** — use our booking link below\n• **Call us** on {{PHONE}}\n• **Message us** on Instagram\n\nWe have appointments available throughout the week, including evenings and Saturdays. What treatment are you interested in?" },
        { keywords: ['price', 'pricing', 'cost', 'how much', 'fee', 'treatment', 'menu', 'services', 'list'],
          answer: "We offer a gorgeous range of treatments! ✨ Here are some highlights:\n\n💅 **Nails** — Gel manicure from £30, Pedicure from £35\n💆 **Facials** — Express from £40, Luxury from £75\n🌸 **Waxing** — From £12\n👁️ **Lashes & Brows** — Lash lift from £45, Brow lamination from £35\n💆‍♀️ **Massage** — From £50 (30 min)\n\nWant details on a specific treatment?" },
        { keywords: ['gift', 'voucher', 'present', 'birthday', 'christmas'],
          answer: "Gift vouchers make the perfect present! 🎁\n\nWe offer:\n• **Monetary vouchers** — any amount\n• **Treatment vouchers** — for specific services\n• **Pamper packages** — curated spa experiences\n\nAvailable in beautiful presentation cards or instant digital delivery. Pop in, call us, or ask about ordering online!" },
        { keywords: ['hour', 'hours', 'open', 'when', 'time', 'closed'],
          answer: "Our opening hours are:\n\n🕐 {{HOURS}}\n\n📍 {{ADDRESS}}\n\nWe recommend booking in advance for weekends as they fill up quickly! 💕" },
        { keywords: ['offer', 'deal', 'discount', 'special', 'promotion', 'first time', 'new client'],
          answer: "We love treating our clients! 🌟\n\n• **New client offer** — 15% off your first visit\n• **Refer a friend** — you both get £10 off\n• **Birthday treat** — 10% off in your birthday month\n\nFollow us on Instagram for flash sales and exclusive offers! Want to book your first appointment?" },
        { keywords: ['facial', 'skin', 'skincare', 'acne', 'anti-age', 'glow'],
          answer: "Our facial treatments are heavenly! ✨\n\n🌿 **Express Glow** (30 min) — Quick refresh\n💎 **Signature Facial** (60 min) — Deep cleanse & hydration\n👑 **Luxury Facial** (90 min) — The ultimate pamper\n🔬 **Advanced Skin** — Chemical peels & microneedling\n\nNot sure which is right for you? We offer **free skin consultations**. Shall I book you in?" },
        { keywords: ['nail', 'gel', 'manicure', 'pedicure', 'shellac', 'acrylic', 'biab'],
          answer: "Our nail services are super popular! 💅\n\n• **Classic Manicure** — from £25\n• **Gel/Shellac** — from £30\n• **BIAB** — from £35\n• **Acrylic Extensions** — from £40\n• **Luxury Pedicure** — from £40\n\nWe use only premium products. Would you like to book?" }
      ],
      fallback: "Great question! For the best advice, get in touch with our team:\n\n📞 {{PHONE}}\n📧 {{EMAIL}}\n\nOr book online — we'd love to see you! 💕"
    },

    'car-dealers': {
      botName: 'Vehicle Advisor',
      botEmoji: '🚗',
      theme: 'dark',
      greeting: "Welcome to {{BUSINESS_NAME}}! 🚗 I'm here to help you find your perfect vehicle. What are you looking for?",
      quickReplies: ['View stock', 'Part exchange', 'Finance options', 'Book test drive', 'Sell my car'],
      responses: [
        { keywords: ['stock', 'cars', 'vehicle', 'available', 'what have you got', 'range', 'selection'],
          answer: "We have a fantastic range of quality vehicles in stock! 🚗\n\nOur selection includes:\n• **Hatchbacks** — from £5,995\n• **SUVs & Crossovers** — from £8,995\n• **Saloons** — from £7,995\n• **Vans & Commercial** — from £9,995\n\nAll our vehicles come with:\n✅ Full service history checked\n✅ HPI clear\n✅ Minimum 3-month warranty\n\nWant to browse online or visit us for a look?" },
        { keywords: ['part exchange', 'trade', 'swap', 'px', 'my car'],
          answer: "We'd love to take your current car in part exchange! 🔄\n\nJust let us know:\n• Make & model\n• Year & mileage\n• Condition\n\nWe'll give you a **fair, no-obligation valuation** — usually within the hour. You can also bring it in and we'll assess it on the spot.\n\nWant a quick valuation?" },
        { keywords: ['finance', 'monthly', 'payment', 'hp', 'pcp', 'credit', 'afford', 'loan', 'pay'],
          answer: "We make car finance simple! 💳\n\n• **PCP** — Lower monthly payments, flexible end options\n• **HP** — Own the car at the end, no balloon payment\n• **Personal Loan** — Fixed monthly payments\n\nWe work with multiple lenders and can help with **all credit histories** — good, fair, and poor credit considered.\n\n📊 Finance from just **£99/month** on selected vehicles.\n\nWant a no-obligation finance quote?" },
        { keywords: ['test drive', 'try', 'drive', 'view', 'visit', 'come in'],
          answer: "We'd love to get you behind the wheel! 🏁\n\nBook a test drive:\n📞 **Call:** {{PHONE}}\n📧 **Email:** {{EMAIL}}\n\n📍 We're at {{ADDRESS}}\n🕐 {{HOURS}}\n\nJust bring your driving licence and we'll sort the rest. Which vehicle are you interested in?" },
        { keywords: ['sell', 'buy my car', 'selling', 'cash', 'valuation'],
          answer: "Looking to sell? We buy cars! 💰\n\nWe offer:\n• **Instant online valuations**\n• **Same-day payment** via bank transfer\n• **No obligation** — no pressure\n• We buy all makes and models\n\nBring your car in for a free assessment, or give us the details and we'll make you an offer!\n\n📞 {{PHONE}}" },
        { keywords: ['warranty', 'guarantee', 'cover', 'protection'],
          answer: "Peace of mind comes as standard! 🛡️\n\nAll our vehicles include:\n• **Minimum 3-month warranty**\n• Option to extend to **12 or 24 months**\n• Comprehensive mechanical cover\n• UK-wide recovery\n\nWe also offer extended warranty packages. Want more details?" },
        { keywords: ['hour', 'hours', 'open', 'when', 'time', 'where', 'address', 'location', 'find'],
          answer: "Come and see us!\n\n📍 {{ADDRESS}}\n📞 {{PHONE}}\n📧 {{EMAIL}}\n🕐 {{HOURS}}\n\nWe're easy to find with plenty of parking on site. See you soon! 🚗" }
      ],
      fallback: "Good question! Our team can give you the best answer:\n\n📞 {{PHONE}}\n📧 {{EMAIL}}\n\nOr pop in for a chat — no pressure, just friendly advice! 🚗"
    },

    'estate-agents': {
      botName: 'Property Advisor',
      botEmoji: '🏠',
      theme: 'light',
      greeting: "Hello! 🏡 Welcome to {{BUSINESS_NAME}}. Whether you're buying, selling or renting, I'm here to help. What can I do for you?",
      quickReplies: ['Book valuation', 'Properties for sale', 'Selling my home', 'Lettings', 'Mortgage advice'],
      responses: [
        { keywords: ['valuation', 'value', 'worth', 'how much is my', 'sell my', 'selling'],
          answer: "Thinking of selling? Great timing! 🏡\n\nWe offer a **free, no-obligation property valuation** with one of our experienced local agents.\n\n• Accurate local market knowledge\n• Honest, realistic pricing\n• Marketing strategy discussion\n• Usually takes just 30-45 minutes\n\n📞 Book yours today: {{PHONE}}\n\nWould you like to arrange a valuation?" },
        { keywords: ['buy', 'buying', 'properties', 'for sale', 'available', 'search', 'looking for', 'house', 'flat'],
          answer: "Exciting — let's find you a home! 🔑\n\nWe have a wide range of properties across the area. To help you best:\n\n• Browse our **latest listings** on our website\n• **Register with us** and get new properties emailed before they hit the portals\n• Book a **buyer consultation** to discuss your requirements\n\nWhat type of property and budget are you looking at?" },
        { keywords: ['rent', 'rental', 'let', 'letting', 'tenant', 'landlord'],
          answer: "We offer comprehensive lettings services:\n\n**For Tenants:**\n• Quality, vetted properties\n• Quick application process\n• Dedicated property management\n\n**For Landlords:**\n🔑 Let Only — from 8%+VAT\n📋 Rent Collection — from 10%+VAT\n🏠 Full Management — from 14%+VAT\n\nWhich service are you interested in?" },
        { keywords: ['mortgage', 'finance', 'loan', 'borrow', 'first time', 'buyer'],
          answer: "We work with trusted independent mortgage advisors who can help you:\n\n💰 **First-time buyer** mortgages\n🔄 **Remortgages** — could you save?\n📊 **Buy-to-let** finance\n💳 Access to **whole market** rates\n\nA free initial consultation can show you exactly what you can afford. Shall I arrange an introduction?" },
        { keywords: ['fee', 'fees', 'commission', 'cost', 'charge', 'price', 'how much do you'],
          answer: "Our fees are competitive and transparent:\n\n🏡 **Sales:** Competitive commission — we'll discuss this at your valuation\n🔑 **Lettings:** From 8%+VAT (Let Only)\n📸 **Marketing:** Professional photography, floorplans & portal listings included\n\nWe don't charge upfront — you only pay when we deliver results. Want to discuss in more detail?" },
        { keywords: ['hour', 'hours', 'open', 'when', 'time', 'office', 'where', 'address'],
          answer: "You'll find us at:\n\n📍 {{ADDRESS}}\n📞 {{PHONE}}\n📧 {{EMAIL}}\n🕐 {{HOURS}}\n\nPop in for a coffee and a chat — we're always happy to help! ☕" },
        { keywords: ['area', 'location', 'neighbourhood', 'school', 'transport', 'commute'],
          answer: "As local property experts, we know this area inside out! 🗺️\n\nWe can advise on:\n• Schools and catchment areas\n• Transport links & commute times\n• Local amenities\n• Up-and-coming areas\n• Price trends and market outlook\n\nWant to have a chat about where to focus your search?" }
      ],
      fallback: "Great question! Our property experts can give you the best advice:\n\n📞 {{PHONE}}\n📧 {{EMAIL}}\n\nOr pop into our office for a friendly chat. We're here to help! 🏡"
    },

    'garage': {
      botName: 'Service Advisor',
      botEmoji: '🔧',
      theme: 'dark',
      greeting: "Hi there! 🔧 Welcome to {{BUSINESS_NAME}}. Need a service, MOT or repair? I'm here to help. What do you need?",
      quickReplies: ['Book MOT', 'Book service', 'Get a quote', 'Tyres', 'Opening hours'],
      responses: [
        { keywords: ['mot', 'test', 'due', 'expire', 'certificate'],
          answer: "Time for your MOT? We've got you covered! ✅\n\n🔍 **MOT Test** — from just £35\n⏱️ Takes approximately 45-60 minutes\n📋 We test while you wait, or drop off/collect\n🔧 If any work is needed, we'll always give you a quote first\n\n📞 Book now: {{PHONE}}\n\nWe can also check when your MOT is due — just give us your reg!" },
        { keywords: ['service', 'full service', 'interim', 'oil', 'maintenance'],
          answer: "Regular servicing keeps your car running smoothly! 🚗\n\n**Our services:**\n🔹 **Interim Service** — from £99 (oil, filter, checks)\n🔹 **Full Service** — from £179 (comprehensive)\n🔹 **Major Service** — from £279 (the works)\n\n✅ All makes and models\n✅ Genuine or OE quality parts\n✅ Maintains your warranty\n✅ Digital service record\n\nWant to book in?" },
        { keywords: ['quote', 'price', 'cost', 'how much', 'estimate', 'repair'],
          answer: "Happy to help with a quote! 💰\n\nJust let us know:\n• Your vehicle (make, model, year)\n• What work you need\n• Any symptoms or warning lights\n\nWe'll get back to you with a **clear, honest quote** — no hidden extras.\n\n📞 {{PHONE}}\n📧 {{EMAIL}}\n\nOr describe the issue here and I'll pass it to our team!" },
        { keywords: ['tyre', 'tire', 'puncture', 'flat', 'wheel', 'balance', 'alignment', 'tracking'],
          answer: "We offer great value on tyres! 🛞\n\n• **Budget tyres** — from £45 fitted\n• **Mid-range** — from £65 fitted\n• **Premium** (Michelin, Continental) — from £85 fitted\n• **Wheel alignment/tracking** — from £35\n• **Puncture repair** — from £20\n\nAll prices include fitting, balancing & valve. Give us your tyre size for an exact price!" },
        { keywords: ['brake', 'brakes', 'pad', 'disc', 'squeak', 'grinding'],
          answer: "Brakes are critical — don't ignore the warning signs! 🛑\n\n• **Brake pads** — from £89 per axle (fitted)\n• **Discs & pads** — from £189 per axle (fitted)\n• **Brake fluid change** — from £49\n• **Free brake check** available\n\nHearing squeaking or grinding? Book in ASAP — we'll take a look for free.\n\n📞 {{PHONE}}" },
        { keywords: ['hour', 'hours', 'open', 'when', 'time', 'where', 'address', 'find'],
          answer: "Here's where to find us:\n\n📍 {{ADDRESS}}\n📞 {{PHONE}}\n📧 {{EMAIL}}\n🕐 {{HOURS}}\n\n🅿️ Free parking on site. Drop-off and collection available for local customers!" },
        { keywords: ['warning', 'light', 'engine', 'diagnostic', 'dash'],
          answer: "Dashboard warning light on? Don't ignore it! ⚠️\n\n🔍 **Diagnostic scan** — from £45\n\nWe use professional-grade diagnostic equipment to read fault codes and identify the issue quickly. Often it's something simple — but it's always best to check.\n\n📞 Call us: {{PHONE}}" }
      ],
      fallback: "Thanks for your question! Our team can help:\n\n📞 {{PHONE}}\n📧 {{EMAIL}}\n\nOr pop in — we're always happy to take a look and give honest advice! 🔧"
    },

    'gym': {
      botName: 'Fitness Advisor',
      botEmoji: '💪',
      theme: 'dark',
      greeting: "Hey! 💪 Welcome to {{BUSINESS_NAME}}. Ready to start your fitness journey? I'm here to help you find the right membership. What would you like to know?",
      quickReplies: ['Membership prices', 'Free trial', 'Class timetable', 'Personal training', 'Opening hours'],
      responses: [
        { keywords: ['price', 'pricing', 'cost', 'membership', 'how much', 'fee', 'join', 'monthly'],
          answer: "Great that you're interested! 🎉 Here's our membership overview:\n\n🥉 **Standard** — from £24.99/month\n• Full gym access during staffed hours\n\n🥈 **Premium** — from £34.99/month\n• 24/7 access + all classes included\n\n🥇 **VIP** — from £49.99/month\n• Everything + PT session/month + guest passes\n\n🎓 **Student** — from £17.99/month\n\n**No joining fee** this month! Want to come in for a look around?" },
        { keywords: ['trial', 'try', 'free', 'taster', 'visit', 'tour', 'look around'],
          answer: "Absolutely — we offer a **free day pass** so you can try before you join! 🏋️\n\nJust:\n1. Pop in at reception\n2. We'll give you a tour\n3. Train for free — no strings attached\n\nAlternatively, we do a **7-day trial for just £7**. Come see what we're about!\n\n📞 {{PHONE}} to book your visit." },
        { keywords: ['class', 'classes', 'timetable', 'schedule', 'yoga', 'spin', 'hiit', 'boxing'],
          answer: "We have an awesome class timetable! 🗓️\n\nPopular classes include:\n🔥 **HIIT** — Torch calories in 30 mins\n🚴 **Spin** — High-energy cycling\n🧘 **Yoga & Pilates** — Flexibility & mindfulness\n🥊 **Boxing Fit** — Punch your stress away\n💪 **Strength & Conditioning** — Build muscle\n🏃 **Circuits** — Full body blast\n\nClasses are **included with Premium & VIP** memberships. Check our timetable online or at reception!" },
        { keywords: ['personal', 'training', 'trainer', 'pt', 'one to one', '1-2-1', 'coach'],
          answer: "Our personal trainers are amazing! 🏆\n\nPT packages:\n• **Single session** — from £35\n• **Block of 5** — from £150 (save £25)\n• **Block of 10** — from £275 (save £75)\n\nEvery new member gets a **free fitness consultation** to set your goals and create a programme.\n\nWant me to connect you with one of our trainers?" },
        { keywords: ['hour', 'hours', 'open', 'when', 'time', '24'],
          answer: "Our opening hours:\n\n🕐 {{HOURS}}\n\n🔑 **Premium & VIP members** enjoy 24/7 access via key fob!\n\n📍 {{ADDRESS}}\n\nCome train with us! 💪" },
        { keywords: ['facility', 'facilities', 'equipment', 'pool', 'sauna', 'shower', 'parking'],
          answer: "We've invested in top-notch facilities! 🏋️‍♂️\n\n• State-of-the-art cardio & resistance machines\n• Free weights area\n• Functional training zone\n• Group exercise studio\n• Changing rooms with showers\n• Free parking\n\nCome for a tour and see for yourself! We'd love to show you around." },
        { keywords: ['cancel', 'cancellation', 'contract', 'leave', 'notice', 'freeze'],
          answer: "We keep things flexible:\n\n• **Monthly rolling** — just 30 days' notice to cancel\n• **No long-term contracts** required\n• **Freeze option** — pause your membership for holidays/injury\n\nWe want you here because you love it, not because you're locked in! 😊" }
      ],
      fallback: "Great question! Our friendly team can help:\n\n📞 {{PHONE}}\n📧 {{EMAIL}}\n\nOr just pop in — we'd love to show you around! 💪"
    },

    'hotels': {
      botName: 'Guest Services',
      botEmoji: '🏨',
      theme: 'light',
      greeting: "Welcome to {{BUSINESS_NAME}}! 🏨 I'm your virtual concierge. Whether you'd like to book a room or need information about your stay, I'm here to help.",
      quickReplies: ['Check availability', 'Room types', 'Dining options', 'Special occasions', 'Contact us'],
      responses: [
        { keywords: ['book', 'room', 'availability', 'available', 'reserve', 'stay', 'check in', 'check out', 'night'],
          answer: "We'd love to welcome you! 🛏️\n\nTo check availability and rates:\n• **Book online** via our website for the best rates\n• **Call us** on {{PHONE}}\n• **Email** {{EMAIL}}\n\n⏰ Check-in: from 3pm | Check-out: by 11am\n\nWhat dates are you looking at? I can point you in the right direction!" },
        { keywords: ['room', 'types', 'suite', 'single', 'double', 'twin', 'family', 'upgrade'],
          answer: "We have beautiful rooms to suit every need:\n\n🛏️ **Classic Room** — Cosy and comfortable\n👑 **Superior Room** — Extra space and premium touches\n💎 **Deluxe Suite** — Separate living area, luxury amenities\n👨‍👩‍👧 **Family Room** — Spacious with extras for little ones\n\nAll rooms include:\n✅ Premium bedding & toiletries\n✅ Complimentary Wi-Fi\n✅ Tea & coffee facilities\n✅ Smart TV\n\nWould you like to check rates for specific dates?" },
        { keywords: ['eat', 'dining', 'restaurant', 'breakfast', 'dinner', 'food', 'menu', 'bar', 'drink'],
          answer: "Our dining options are wonderful! 🍽️\n\n☕ **Breakfast** — Full English & continental buffet (7-10am)\n🍽️ **Restaurant** — A la carte dining\n🍸 **Bar & Lounge** — Cocktails, wines & light bites\n☕ **Afternoon Tea** — A lovely treat!\n\nRoom service is also available for in-room dining.\n\nWould you like to reserve a table?" },
        { keywords: ['wedding', 'event', 'conference', 'meeting', 'function', 'party', 'celebration', 'special', 'occasion', 'anniversary'],
          answer: "We'd love to host your special occasion! 🎉\n\n💒 **Weddings** — Stunning venue, bespoke packages\n🎂 **Celebrations** — Birthdays, anniversaries, parties\n📊 **Conferences** — Modern meeting rooms, AV equipment\n🍾 **Private Dining** — Intimate events & gatherings\n\nOur dedicated events team will make everything perfect.\n\n📞 Call {{PHONE}} to discuss your event." },
        { keywords: ['parking', 'car park', 'wifi', 'internet', 'amenity', 'amenities', 'facility', 'pool', 'spa', 'gym'],
          answer: "We offer wonderful facilities:\n\n🅿️ **Parking** — Complimentary for guests\n📶 **Wi-Fi** — Free high-speed throughout\n🧖 **Spa treatments** — Available to book\n🏋️ **Fitness room** — Complimentary access\n👔 **Concierge service**\n🧺 **Laundry service**\n\nIs there anything specific you'd like to know about?" },
        { keywords: ['hour', 'hours', 'contact', 'phone', 'email', 'address', 'where', 'location', 'direction', 'find'],
          answer: "Here's how to reach us:\n\n📍 {{ADDRESS}}\n📞 {{PHONE}}\n📧 {{EMAIL}}\n\nOur reception is open **24 hours** for guests.\n\nWe look forward to welcoming you! 🌟" },
        { keywords: ['price', 'rate', 'cost', 'how much', 'offer', 'deal', 'discount', 'package'],
          answer: "Our rates vary by season and room type. Here's a guide:\n\n💰 Rooms from **£89/night** (standard)\n📦 **Package deals** available including dinner & breakfast\n🎁 **Special offers** — check our website for the latest\n💳 **Best rate guaranteed** when booking direct\n\nFor the best quote, call us or check availability on our website!" }
      ],
      fallback: "Thank you for your enquiry! Our team can help with any questions:\n\n📞 {{PHONE}}\n📧 {{EMAIL}}\n\nWe look forward to welcoming you to {{BUSINESS_NAME}}! 🏨"
    },

    'jewellers': {
      botName: 'Jewellery Advisor',
      botEmoji: '💍',
      theme: 'light',
      greeting: "Welcome to {{BUSINESS_NAME}}! 💎 I'm here to help you find the perfect piece. Whether you're shopping for something special or need a repair, how can I help?",
      quickReplies: ['Engagement rings', 'Repairs & resizing', 'Bespoke design', 'Valuations', 'Visit us'],
      responses: [
        { keywords: ['engagement', 'ring', 'diamond', 'propose', 'proposal', 'solitaire'],
          answer: "How exciting — congratulations! 💍\n\nWe have a stunning collection of engagement rings:\n\n✨ **Solitaire** — Timeless classics\n💎 **Halo** — Extra sparkle\n🌙 **Three Stone** — Past, present, future\n🎨 **Bespoke** — Design your dream ring\n\nWe work with natural diamonds, lab-grown diamonds, and coloured gemstones. Prices from **£500** to luxury collections.\n\nWould you like to book a private consultation?" },
        { keywords: ['repair', 'fix', 'resize', 'resizing', 'broken', 'clasp', 'chain', 'clean', 'polish', 'restore'],
          answer: "We offer expert jewellery services:\n\n🔧 **Ring Resizing** — from £35 (2-3 working days)\n✨ **Professional Cleaning** — from £15\n🔗 **Chain Repair** — from £20\n👑 **Stone Replacement** — quoted on inspection\n🔄 **Rhodium Plating** — from £30\n\nAll work carried out by our skilled craftspeople on-site. Bring your piece in for a free assessment!" },
        { keywords: ['bespoke', 'custom', 'design', 'made', 'commission', 'unique', 'personalise'],
          answer: "Creating something truly unique? We love bespoke! ✏️\n\nOur bespoke service includes:\n\n1. 💬 **Consultation** — discuss your vision (free)\n2. 🎨 **Design** — CAD drawings & 3D renders\n3. 💎 **Stone sourcing** — hand-selected gems\n4. ⚒️ **Crafting** — made in our workshop\n5. 🎁 **Presentation** — beautifully boxed\n\nTimeline: usually **4-6 weeks**. Prices from £300.\n\nBook your free design consultation today!" },
        { keywords: ['valuation', 'value', 'insurance', 'insure', 'appraisal', 'worth'],
          answer: "We provide professional jewellery valuations:\n\n📋 **Insurance Valuation** — from £40 per item\n💰 **Resale Valuation** — honest market assessment\n📜 **Full written certificate** for your insurer\n\nValuations are carried out by our qualified jeweller. Usually ready within 24-48 hours.\n\nBring your pieces in or book a valuation appointment!" },
        { keywords: ['wedding', 'band', 'bands', 'matching', 'his and hers'],
          answer: "Wedding bands are so special — let's find your perfect match! 💒\n\n• **Classic gold** — from £150\n• **Platinum** — from £350\n• **Diamond-set** — from £295\n• **Bespoke matching sets** — priced individually\n\nAvailable in yellow gold, white gold, rose gold & platinum. We recommend ordering **8-12 weeks** before your big day.\n\nWould you like to try some on?" },
        { keywords: ['gift', 'present', 'birthday', 'christmas', 'anniversary', 'mother', 'valentine'],
          answer: "Looking for the perfect gift? We can help! 🎁\n\n💝 **Necklaces & Pendants** — from £45\n✨ **Earrings** — from £35\n💎 **Bracelets** — from £55\n⌚ **Watches** — from £95\n\nWe also offer:\n• Beautiful gift wrapping\n• Gift cards for any amount\n• Engraving services\n\nWhat's the occasion?" },
        { keywords: ['hour', 'hours', 'open', 'when', 'time', 'where', 'address', 'visit'],
          answer: "Come and visit us:\n\n📍 {{ADDRESS}}\n📞 {{PHONE}}\n📧 {{EMAIL}}\n🕐 {{HOURS}}\n\nPrivate appointments available for engagement ring consultations and bespoke design. 💍" }
      ],
      fallback: "Lovely question! For the best advice, speak with our jewellery experts:\n\n📞 {{PHONE}}\n📧 {{EMAIL}}\n\nOr visit us in store — we'd love to help you find something perfect! 💎"
    },

    'mortgage-brokers': {
      botName: 'Mortgage Advisor',
      botEmoji: '🏠',
      theme: 'light',
      greeting: "Hi! 👋 Welcome to {{BUSINESS_NAME}}. Whether you're buying your first home, remortgaging, or need specialist advice, I'm here to help. What's on your mind?",
      quickReplies: ['Get a quote', 'First-time buyer', 'Remortgage', 'How much can I borrow?', 'Book consultation'],
      responses: [
        { keywords: ['quote', 'rate', 'rates', 'best deal', 'cheapest', 'compare'],
          answer: "We search the **whole market** to find you the best mortgage deal! 📊\n\nCurrent highlights:\n• Fixed rates from **4.2%**\n• Tracker rates from **4.5%**\n• 95% LTV available\n• Specialist & adverse credit options\n\nFor a personalised quote, I'll need a few details. Book a **free consultation** and we'll do the hard work for you!\n\n📞 {{PHONE}}" },
        { keywords: ['first time', 'buyer', 'first home', 'never bought', 'help to buy', 'deposit', 'save'],
          answer: "Exciting times — welcome to the property ladder! 🏡\n\nAs a first-time buyer, you'll want to know:\n\n✅ You can buy with just **5% deposit**\n✅ **Stamp duty** — £0 on properties up to £425,000\n✅ **Help to Buy ISA / Lifetime ISA** — government bonuses\n✅ **Shared Ownership** — buy a share from 25%\n\nWe specialise in helping first-time buyers navigate the process. Book a **free, no-obligation chat**!\n\n📞 {{PHONE}}" },
        { keywords: ['remortgage', 'switch', 'renewal', 'existing', 'current', 'fixed ending', 'svr'],
          answer: "Could be time to save money! 💰\n\nYou should consider remortgaging if:\n\n🔄 Your fixed rate is ending soon\n📈 You're on the Standard Variable Rate (SVR)\n🏠 Your property value has increased\n💳 You want to consolidate debts\n🔧 You need to raise capital for home improvements\n\nWe'll compare your current deal against the whole market. Could save you **hundreds per month**.\n\nFree to check — shall I arrange a review?" },
        { keywords: ['how much', 'borrow', 'afford', 'budget', 'income', 'salary', 'calculator'],
          answer: "Great question! As a rough guide:\n\n📊 Most lenders offer **4-4.5x your annual income**\n👫 Joint applications combine both incomes\n\n**Quick example:**\n• £50k salary = ~£225,000 mortgage\n• £50k + £30k joint = ~£360,000 mortgage\n\nBut it depends on your deposit, debts, and circumstances. We can run the exact numbers for you in a **free consultation**.\n\n📞 {{PHONE}}" },
        { keywords: ['fee', 'fees', 'cost', 'charge', 'free', 'how much do you'],
          answer: "Complete transparency on our fees:\n\n💷 **Broker fee:** Typically £495 (payable on completion only)\n🎁 **Initial consultation:** Always **FREE**\n📋 **No upfront costs** whatsoever\n\nIn many cases, the savings we find more than cover our fee. We also receive a commission from the lender, which we'll always disclose.\n\nShall we get started?" },
        { keywords: ['buy to let', 'btl', 'investment', 'rental', 'landlord', 'portfolio'],
          answer: "Looking to invest? We're buy-to-let specialists! 🏘️\n\n• BTL mortgages from **5.2%**\n• Minimum **25% deposit** typically required\n• **Portfolio landlord** options available\n• **Limited company** buy-to-let\n• HMO & multi-unit mortgages\n\nWe'll help you understand rental yield, tax implications, and find the best deal.\n\n📞 {{PHONE}} for specialist BTL advice." },
        { keywords: ['hour', 'hours', 'open', 'when', 'time', 'where', 'address', 'book', 'appointment', 'consultation'],
          answer: "Let's get your appointment booked:\n\n📞 {{PHONE}}\n📧 {{EMAIL}}\n📍 {{ADDRESS}}\n🕐 {{HOURS}}\n\nWe also offer **evening and weekend appointments** by arrangement, plus **video consultations** for your convenience.\n\nYour home may be repossessed if you do not keep up repayments on your mortgage." }
      ],
      fallback: "Great question! For personalised mortgage advice:\n\n📞 {{PHONE}}\n📧 {{EMAIL}}\n\nBook a **free, no-obligation consultation** — we'd love to help! 🏡\n\nYour home may be repossessed if you do not keep up repayments on your mortgage."
    },

    'restaurant': {
      botName: 'Restaurant Host',
      botEmoji: '🍽️',
      theme: 'light',
      greeting: "Welcome to {{BUSINESS_NAME}}! 🍽️ I'm here to help with bookings, menus, and anything else you need. How can I help?",
      quickReplies: ['Book a table', 'View menu', 'Opening hours', 'Private dining', 'Dietary needs'],
      responses: [
        { keywords: ['book', 'table', 'reserve', 'reservation', 'availability'],
          answer: "We'd love to have you! 🍽️\n\nTo book a table:\n• **Call us:** {{PHONE}}\n• **Online:** Use our booking widget on the website\n• **Walk-ins** welcome (subject to availability)\n\nFor parties of **8 or more**, please call to discuss.\n\n📍 {{ADDRESS}}\n\nWhat date and time were you thinking?" },
        { keywords: ['menu', 'food', 'eat', 'dish', 'special', 'specials', 'chef', 'tasting'],
          answer: "Our menu features the best seasonal ingredients! 🌿\n\n🥗 **Starters** — from £7\n🥩 **Mains** — from £14\n🍰 **Desserts** — from £7\n🍷 **Set Menu** — 2 courses from £22, 3 courses from £28\n🍴 **Tasting Menu** — Chef's selection (booking required)\n\nOur menu changes seasonally — check our website for the latest. What type of food do you enjoy?" },
        { keywords: ['hour', 'hours', 'open', 'when', 'time', 'closed'],
          answer: "Our opening hours:\n\n🕐 {{HOURS}}\n\n📍 {{ADDRESS}}\n📞 {{PHONE}}\n\nWe recommend booking for Friday and Saturday evenings! 🍷" },
        { keywords: ['private', 'dining', 'event', 'party', 'birthday', 'celebration', 'function', 'corporate', 'christmas'],
          answer: "We host wonderful private events! 🎉\n\n🥂 **Private Dining Room** — up to 24 guests\n🎂 **Birthday Celebrations** — bespoke menus\n🏢 **Corporate Events** — meetings & team dinners\n🎄 **Christmas Parties** — book early!\n\nWe create **tailored menus** for every occasion with dedicated service.\n\n📞 Call {{PHONE}} to discuss your event." },
        { keywords: ['allergy', 'allergen', 'dietary', 'vegetarian', 'vegan', 'gluten', 'dairy', 'nut', 'coeliac', 'intolerance'],
          answer: "We take dietary requirements seriously! 🌱\n\n✅ **Vegetarian & Vegan** options on every course\n🌾 **Gluten-free** alternatives available\n🥜 **Allergen information** — full matrix available\n\nPlease let us know when booking and we'll ensure your meal is perfect. Our kitchen is happy to adapt dishes.\n\nAny specific requirements I can note?" },
        { keywords: ['drink', 'wine', 'cocktail', 'bar', 'beer', 'gin'],
          answer: "Our drinks are carefully curated! 🍷\n\n🍷 **Wine List** — hand-picked by our sommelier\n🍸 **Cocktails** — classic & signature creations\n🍺 **Craft Beers** — local and international\n🥃 **Spirits** — premium selection\n🫖 **Non-alcoholic** — creative mocktails\n\nAsk about our wine pairing with the tasting menu!" },
        { keywords: ['parking', 'park', 'car', 'where', 'find', 'location', 'direction', 'address'],
          answer: "Easy to find, easy to reach! 📍\n\n📍 {{ADDRESS}}\n🅿️ On-street parking available nearby\n🚇 We're a short walk from local transport links\n\n📞 {{PHONE}} if you need directions. See you soon!" }
      ],
      fallback: "Thanks for your question! Our team can help:\n\n📞 {{PHONE}}\n📧 {{EMAIL}}\n\nOr pop in — we'd love to welcome you! 🍽️"
    },

    'solicitors': {
      botName: 'Legal Assistant',
      botEmoji: '⚖️',
      theme: 'light',
      greeting: "Hello! ⚖️ Welcome to {{BUSINESS_NAME}}. I'm here to help point you in the right direction. What legal matter can I help you with?",
      quickReplies: ['Conveyancing', 'Family law', 'Wills & probate', 'Get a quote', 'Book consultation'],
      responses: [
        { keywords: ['conveyancing', 'buying', 'selling', 'house', 'property', 'move', 'moving', 'completion'],
          answer: "Moving home? We make conveyancing straightforward! 🏡\n\n**Our service includes:**\n• Dedicated conveyancer handling your case\n• Regular updates at every stage\n• Fixed-fee pricing — no hidden costs\n• Online portal to track progress\n\n💰 **Conveyancing from £750+VAT** (plus disbursements)\n\nWe aim for a smooth, stress-free process. Want a **free, no-obligation quote**?\n\n📞 {{PHONE}}" },
        { keywords: ['family', 'divorce', 'separation', 'custody', 'child', 'children', 'matrimonial', 'prenup'],
          answer: "Family matters require sensitivity and expertise. 💙\n\nWe help with:\n\n• **Divorce & Separation** — amicable or contested\n• **Financial Settlements** — fair division of assets\n• **Child Arrangements** — custody & access\n• **Prenuptial Agreements** — protecting your future\n• **Mediation** — resolving disputes outside court\n\nFirst consultation: **£99+VAT** (45 minutes)\n\nEverything is handled with discretion and care. 📞 {{PHONE}}" },
        { keywords: ['will', 'wills', 'probate', 'estate', 'inheritance', 'power of attorney', 'lpa', 'executor'],
          answer: "Planning ahead protects the people you love. 📋\n\n**Our services:**\n• **Single Will** — from £195+VAT\n• **Mirror Wills** (couples) — from £295+VAT\n• **Lasting Power of Attorney** — from £350+VAT each\n• **Probate** — from £1,500+VAT\n• **Estate Administration** — full support\n\nDon't leave it to chance — **70% of UK adults** don't have a will.\n\nBook a consultation today!" },
        { keywords: ['quote', 'price', 'cost', 'fee', 'fees', 'how much', 'charge'],
          answer: "We believe in transparent pricing:\n\n🏡 **Conveyancing** — from £750+VAT\n💍 **Family Law** — initial consultation £99+VAT\n📋 **Wills** — from £195+VAT\n⚖️ **Employment** — free initial assessment\n🏢 **Commercial** — quoted per matter\n\nMany services are **fixed-fee** so you know exactly what to expect. No surprises.\n\nWant a specific quote? Call us on {{PHONE}}" },
        { keywords: ['employment', 'work', 'dismissal', 'redundancy', 'tribunal', 'contract', 'hr', 'employer', 'employee'],
          answer: "Employment issues can be stressful — we're here to help. 💼\n\n**We advise on:**\n• Unfair/wrongful dismissal\n• Redundancy rights\n• Settlement agreements\n• Discrimination claims\n• Employment tribunal representation\n• Contract disputes\n\n📞 **Free initial phone assessment** — call {{PHONE}}\n\nWe act for both employees and employers." },
        { keywords: ['commercial', 'business', 'company', 'lease', 'contract', 'dispute'],
          answer: "We support businesses of all sizes: 🏢\n\n• **Commercial Property** — leases, purchases, sales\n• **Business Contracts** — drafting & review\n• **Company Formation** — structure & governance\n• **Commercial Disputes** — resolution & litigation\n• **Terms & Conditions** — website, B2B, B2C\n\nLet's discuss your business needs. 📞 {{PHONE}}" },
        { keywords: ['hour', 'hours', 'open', 'when', 'time', 'where', 'address', 'book', 'appointment'],
          answer: "Get in touch:\n\n📞 {{PHONE}}\n📧 {{EMAIL}}\n📍 {{ADDRESS}}\n🕐 {{HOURS}}\n\nWe offer **in-person, phone, and video consultations** for your convenience.\n\n{{BUSINESS_NAME}} is authorised and regulated by the Solicitors Regulation Authority." }
      ],
      fallback: "Thank you for your enquiry. For legal advice tailored to your situation:\n\n📞 {{PHONE}}\n📧 {{EMAIL}}\n\nBook a consultation and we'll guide you through your options. ⚖️"
    },

    'trades': {
      botName: 'Project Advisor',
      botEmoji: '🏠',
      theme: 'dark',
      greeting: "Hi there! 👋 Welcome to {{BUSINESS_NAME}}. Looking for a reliable tradesman? I'm here to help. What kind of work do you need?",
      quickReplies: ['Get a quote', 'Services', 'Emergency callout', 'Availability', 'Reviews'],
      responses: [
        { keywords: ['quote', 'price', 'cost', 'estimate', 'how much', 'free quote'],
          answer: "We'd be happy to provide a **free, no-obligation quote**! 📋\n\nJust let us know:\n• What work you need doing\n• Your location\n• Preferred timeframe\n• Any photos (helpful but not essential)\n\nWe'll get back to you within **24 hours** with a clear, itemised quote. No hidden charges, ever.\n\n📞 {{PHONE}}\n📧 {{EMAIL}}" },
        { keywords: ['service', 'services', 'what do you do', 'offer', 'work', 'specialise'],
          answer: "We're your local trusted tradesmen! 🔨\n\nOur services include:\n\n🏠 **General Building** — extensions, conversions, renovations\n🪠 **Plumbing** — repairs, installations, bathrooms\n⚡ **Electrical** — rewiring, upgrades, lighting\n🎨 **Decorating** — interior & exterior\n🏗️ **Carpentry** — kitchens, bespoke joinery\n🧱 **Brickwork** — walls, patios, driveways\n\nAll work fully guaranteed. What project do you have in mind?" },
        { keywords: ['emergency', 'urgent', 'leak', 'flood', 'burst', 'no power', 'broken'],
          answer: "Emergency? We're on it! 🚨\n\n📞 **Call us now:** {{PHONE}}\n\nWe offer:\n• **Same-day emergency callouts**\n• Available **7 days a week**\n• Fast response times\n• Transparent pricing (no rip-off call-out fees)\n\nDescribe the issue and we'll get someone to you ASAP." },
        { keywords: ['available', 'availability', 'when', 'start', 'how soon', 'book', 'diary'],
          answer: "We're currently booking:\n\n⚡ **Emergency work** — same day / next day\n🔧 **Small jobs** — usually within 1-2 weeks\n🏠 **Larger projects** — 2-4 weeks (depending on scope)\n\nThe sooner you get in touch, the sooner we can schedule you in!\n\n📞 {{PHONE}}\n📧 {{EMAIL}}" },
        { keywords: ['review', 'reviews', 'trust', 'reliable', 'recommend', 'checkatrade', 'rating'],
          answer: "We're proud of our reputation! ⭐\n\n• ⭐⭐⭐⭐⭐ **{{RATING_VALUE}} / 5** average ({{REVIEW_COUNT}}+ reviews)\n• Fully **insured and accredited**\n• Work guaranteed\n• References available on request\n\nCheck out our reviews on our website — our customers say it best! 😊" },
        { keywords: ['guarantee', 'warranty', 'insurance', 'insured', 'accredited', 'qualified'],
          answer: "Your peace of mind matters to us! ✅\n\n• **All work guaranteed** — minimum 12 months\n• **Fully insured** — public liability cover\n• **Qualified tradespeople** — certified and experienced\n• **Clean and tidy** — we respect your home\n• **No cowboys** — proper materials, proper job\n\nWant to discuss your project?" },
        { keywords: ['hour', 'hours', 'open', 'when', 'time', 'where', 'area', 'cover', 'location', 'address'],
          answer: "Get in touch:\n\n📞 {{PHONE}}\n📧 {{EMAIL}}\n📍 Based in {{LOCATION}}\n🕐 {{HOURS}}\n\nWe cover {{LOCATION}} and surrounding areas. Free quotes, friendly service! 🔨" }
      ],
      fallback: "Thanks for your message! For a quick response:\n\n📞 {{PHONE}}\n📧 {{EMAIL}}\n\nWe'll get back to you with a free quote within 24 hours! 🔨"
    },

    'solar': {
      botName: 'Solar Advisor',
      botEmoji: '☀️',
      theme: 'dark',
      greeting: "Hi there! ☀️ Welcome to {{BUSINESS_NAME}}. I'm here to help you learn about solar energy and how much you could save. What would you like to know?",
      quickReplies: ['Get a quote', 'How much can I save?', 'Battery storage', 'Installation process', 'Pricing'],
      responses: [
        { keywords: ['quote', 'interested', 'want', 'get started', 'install'],
          answer: "Brilliant — let's get you started! ☀️\n\nFor a personalised solar quote, we'll need:\n\n🏠 Your postcode / address\n📐 Rough roof orientation (south-facing is ideal)\n⚡ Your current electricity bill\n\nWe offer **free, no-obligation surveys** and can usually quote within 24 hours.\n\n📞 {{PHONE}}\n📧 {{EMAIL}}\n\nShall I arrange a free survey?" },
        { keywords: ['save', 'saving', 'bill', 'bills', 'cost', 'money', 'payback', 'roi', 'return'],
          answer: "Solar can save you a fortune! 💰\n\nTypical savings:\n• **£800-£1,200/year** on electricity bills\n• **Payback period:** 5-8 years\n• **Panel lifespan:** 25+ years\n• **SEG payments** — earn money selling excess back to the grid\n\nWith battery storage, you can save even more by using solar power in the evenings.\n\nWant a personalised savings estimate?" },
        { keywords: ['battery', 'storage', 'store', 'evening', 'night'],
          answer: "Battery storage is a game-changer! 🔋\n\nBenefits:\n• Store excess solar energy for evening use\n• Reduce grid dependency to near-zero\n• **Emergency backup** during power cuts\n• Typical batteries: **5-13.5 kWh**\n\nPopular options:\n⚡ Tesla Powerwall — 13.5kWh\n⚡ GivEnergy — 5.2/9.5kWh\n⚡ SolaX — 5.8kWh\n\nWe can add battery to new or existing solar installations." },
        { keywords: ['process', 'how long', 'install', 'installation', 'what happens', 'step'],
          answer: "Our installation process is smooth and professional! 🔧\n\n1️⃣ **Free survey** — we assess your roof & energy needs\n2️⃣ **Custom design** — optimised system for your home\n3️⃣ **Quote** — transparent, all-inclusive pricing\n4️⃣ **Installation** — typically 1-2 days\n5️⃣ **Commissioning** — connected & registered\n6️⃣ **Monitoring** — app to track your generation\n\n**MCS certified** installers. All work guaranteed.\n\n📞 {{PHONE}}" },
        { keywords: ['price', 'pricing', 'how much', 'cost', 'package', 'finance'],
          answer: "Solar is more affordable than you think! ☀️\n\n💰 **Typical system prices:**\n• 3.3kWp (8 panels) — from £4,500\n• 4.2kWp (10 panels) — from £5,500\n• 6.6kWp (16 panels) — from £7,500\n• Battery add-on — from £2,500\n\n📋 **0% finance available** — spread the cost\n🏠 **No VAT** on residential solar (0% rate)\n\nWant a quote tailored to your home?" }
      ],
      fallback: "Great question! For the best advice, speak with our solar experts:\n\n📞 {{PHONE}}\n📧 {{EMAIL}}\n\nWe offer **free, no-obligation surveys**. Shall I arrange one? ☀️"
    }
  };

  // ---- Helper: resolve placeholders ----
  function resolvePlaceholders(text, config) {
    if (!text || !config) return text || '';
    return text.replace(/\{\{(\w+)\}\}/g, function(match, key) {
      return config[key] || config['{{' + key + '}}'] || match;
    });
  }

  // ---- Colour helpers ----
  function hexToHSL(hex) {
    hex = hex.replace('#', '');
    if (hex.length === 3) hex = hex[0]+hex[0]+hex[1]+hex[1]+hex[2]+hex[2];
    var r = parseInt(hex.substr(0,2),16)/255;
    var g = parseInt(hex.substr(2,2),16)/255;
    var b = parseInt(hex.substr(4,2),16)/255;
    var max = Math.max(r,g,b), min = Math.min(r,g,b);
    var h, s, l = (max+min)/2;
    if (max === min) { h = s = 0; } else {
      var d = max - min;
      s = l > 0.5 ? d/(2-max-min) : d/(max+min);
      switch(max) {
        case r: h = ((g-b)/d + (g<b?6:0))/6; break;
        case g: h = ((b-r)/d + 2)/6; break;
        case b: h = ((r-g)/d + 4)/6; break;
      }
    }
    return { h: Math.round(h*360), s: Math.round(s*100), l: Math.round(l*100) };
  }

  function darkenHex(hex, amount) {
    var hsl = hexToHSL(hex);
    var newL = Math.max(0, hsl.l - amount);
    return 'hsl(' + hsl.h + ',' + hsl.s + '%,' + newL + '%)';
  }

  // ---- SVG Icons ----
  var ICON_CHAT = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>';
  var ICON_CLOSE = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>';
  var ICON_SEND = '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/></svg>';

  // ---- Main Widget Class ----
  function ColdLavaChatWidget(userConfig) {
    this.config = userConfig || {};
    this.industry = this.config.industry || 'dental';
    this.primaryColor = this.config.primaryColor || '#4A9B8E';
    this.businessName = this.config.businessName || 'Our Business';
    this.isOpen = false;
    this.messages = [];
    this.quickRepliesShown = false;
    this.unreadCount = 0;

    // If business-specific overrides are provided, use those
    if (this.config.overrides) {
      this.industryConfig = this.config.overrides;
    } else {
      this.industryConfig = INDUSTRY_CONFIGS[this.industry] || INDUSTRY_CONFIGS['dental'];
    }

    // Determine theme: explicit config > industry default > 'light'
    this.theme = this.config.theme || this.industryConfig.theme || 'light';

    // Build placeholder map for template substitution
    this.placeholders = {};
    if (this.config.placeholders) {
      for (var k in this.config.placeholders) {
        this.placeholders[k] = this.config.placeholders[k];
      }
    }
    this.placeholders['BUSINESS_NAME'] = this.businessName;
    this.placeholders['{{BUSINESS_NAME}}'] = this.businessName;

    this.init();
  }

  ColdLavaChatWidget.prototype.init = function() {
    // Set CSS vars on root
    var root = document.documentElement;
    root.style.setProperty('--cl-chat-primary', this.primaryColor);
    root.style.setProperty('--cl-chat-primary-dark', darkenHex(this.primaryColor, 10));

    // Compute RGB for rgba() usage
    var hex = this.primaryColor.replace('#', '');
    if (hex.length === 3) hex = hex[0]+hex[0]+hex[1]+hex[1]+hex[2]+hex[2];
    var r = parseInt(hex.substr(0,2),16);
    var g = parseInt(hex.substr(2,2),16);
    var b = parseInt(hex.substr(4,2),16);
    root.style.setProperty('--cl-chat-primary-rgb', r + ', ' + g + ', ' + b);

    this.createDOM();
    this.bindEvents();

    // Auto-show badge after 2s
    var self = this;
    setTimeout(function() {
      if (!self.isOpen) {
        self.unreadCount = 1;
        self.showBadge();
      }
    }, 2000);
  };

  ColdLavaChatWidget.prototype.createDOM = function() {
    // Container
    var container = document.createElement('div');
    container.id = 'cl-chat-widget';
    container.setAttribute('data-theme', this.theme);

    // Toggle button
    var toggle = document.createElement('button');
    toggle.className = 'cl-chat-toggle';
    toggle.setAttribute('aria-label', 'Open chat');
    toggle.innerHTML =
      '<span class="cl-icon-chat">' + ICON_CHAT + '</span>' +
      '<span class="cl-icon-close">' + ICON_CLOSE + '</span>' +
      '<span class="cl-chat-badge cl-hidden">1</span>';
    container.appendChild(toggle);
    this.toggleBtn = toggle;
    this.badge = toggle.querySelector('.cl-chat-badge');

    // Resolve business name for header (fix {{BUSINESS_NAME}} bug)
    var displayName = resolvePlaceholders(this.businessName, this.placeholders);
    var botEmoji = this.industryConfig.botEmoji || '💬';

    // Chat Panel
    var panel = document.createElement('div');
    panel.className = 'cl-chat-panel';
    panel.innerHTML =
      '<div class="cl-chat-header">' +
        '<div class="cl-chat-avatar">' + botEmoji + '</div>' +
        '<div class="cl-chat-header-info">' +
          '<div class="cl-chat-header-name">' + this.escapeHtml(displayName) + '</div>' +
          '<div class="cl-chat-header-status">Online</div>' +
        '</div>' +
        '<button class="cl-chat-close-btn" aria-label="Close chat">' + ICON_CLOSE + '</button>' +
      '</div>' +
      '<div class="cl-chat-messages"></div>' +
      '<div class="cl-chat-input-area">' +
        '<input type="text" class="cl-chat-input" placeholder="Type a message..." autocomplete="off">' +
        '<button class="cl-chat-send-btn" aria-label="Send message">' + ICON_SEND + '</button>' +
      '</div>' +
      '<div class="cl-chat-footer"><a href="https://coldlava.co.uk" target="_blank" rel="noopener">Powered by Cold Lava</a></div>';

    container.appendChild(panel);
    this.panel = panel;
    this.messagesArea = panel.querySelector('.cl-chat-messages');
    this.inputEl = panel.querySelector('.cl-chat-input');
    this.sendBtn = panel.querySelector('.cl-chat-send-btn');
    this.closeBtn = panel.querySelector('.cl-chat-close-btn');

    document.body.appendChild(container);
  };

  ColdLavaChatWidget.prototype.bindEvents = function() {
    var self = this;

    this.toggleBtn.addEventListener('click', function() {
      self.toggle();
    });

    this.closeBtn.addEventListener('click', function() {
      self.close();
    });

    this.sendBtn.addEventListener('click', function() {
      self.sendUserMessage();
    });

    this.inputEl.addEventListener('keydown', function(e) {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        self.sendUserMessage();
      }
    });
  };

  ColdLavaChatWidget.prototype.toggle = function() {
    if (this.isOpen) {
      this.close();
    } else {
      this.open();
    }
  };

  ColdLavaChatWidget.prototype.open = function() {
    this.isOpen = true;
    this.panel.classList.add('cl-open');
    this.toggleBtn.classList.add('cl-open');
    this.unreadCount = 0;
    this.hideBadge();
    this.inputEl.focus();

    // Show greeting on first open
    if (this.messages.length === 0) {
      var greeting = resolvePlaceholders(this.industryConfig.greeting, this.placeholders);
      this.addBotMessage(greeting, true);
    }
  };

  ColdLavaChatWidget.prototype.close = function() {
    this.isOpen = false;
    this.panel.classList.remove('cl-open');
    this.toggleBtn.classList.remove('cl-open');
  };

  ColdLavaChatWidget.prototype.showBadge = function() {
    if (this.unreadCount > 0) {
      this.badge.textContent = this.unreadCount > 9 ? '9+' : this.unreadCount;
      this.badge.classList.remove('cl-hidden');
    }
  };

  ColdLavaChatWidget.prototype.hideBadge = function() {
    this.badge.classList.add('cl-hidden');
  };

  ColdLavaChatWidget.prototype.scrollToBottom = function() {
    var area = this.messagesArea;
    setTimeout(function() {
      area.scrollTop = area.scrollHeight;
    }, 50);
  };

  ColdLavaChatWidget.prototype.escapeHtml = function(text) {
    var div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  };

  // Simple markdown: **bold**, \n to <br>
  ColdLavaChatWidget.prototype.formatMessage = function(text) {
    var escaped = this.escapeHtml(text);
    escaped = escaped.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
    escaped = escaped.replace(/\n/g, '<br>');
    return escaped;
  };

  ColdLavaChatWidget.prototype.addBotMessage = function(text, showQuickReplies) {
    var msgEl = document.createElement('div');
    msgEl.className = 'cl-chat-msg cl-bot';
    msgEl.innerHTML =
      '<div class="cl-chat-msg-bubble">' + this.formatMessage(text) + '</div>';
    this.messagesArea.appendChild(msgEl);
    this.messages.push({ role: 'bot', text: text });
    this.scrollToBottom();

    // Update badge if not open
    if (!this.isOpen) {
      this.unreadCount++;
      this.showBadge();
    }

    if (showQuickReplies && !this.quickRepliesShown) {
      this.showQuickReplies();
      this.quickRepliesShown = true;
    }
  };

  ColdLavaChatWidget.prototype.addUserMessage = function(text) {
    var msgEl = document.createElement('div');
    msgEl.className = 'cl-chat-msg cl-user';
    msgEl.innerHTML =
      '<div class="cl-chat-msg-bubble">' + this.formatMessage(text) + '</div>';
    this.messagesArea.appendChild(msgEl);
    this.messages.push({ role: 'user', text: text });
    this.scrollToBottom();
  };

  ColdLavaChatWidget.prototype.showTyping = function() {
    var typingEl = document.createElement('div');
    typingEl.className = 'cl-chat-typing';
    typingEl.id = 'cl-typing-indicator';
    typingEl.innerHTML =
      '<div class="cl-chat-typing-dots"><span></span><span></span><span></span></div>';
    this.messagesArea.appendChild(typingEl);
    this.scrollToBottom();
  };

  ColdLavaChatWidget.prototype.hideTyping = function() {
    var el = document.getElementById('cl-typing-indicator');
    if (el) el.remove();
  };

  ColdLavaChatWidget.prototype.showQuickReplies = function() {
    var self = this;
    var container = document.createElement('div');
    container.className = 'cl-chat-quick-replies';

    this.industryConfig.quickReplies.forEach(function(text) {
      var btn = document.createElement('button');
      btn.className = 'cl-chat-quick-reply';
      btn.textContent = text;
      btn.addEventListener('click', function() {
        // Remove quick replies
        var allQR = self.messagesArea.querySelectorAll('.cl-chat-quick-replies');
        allQR.forEach(function(el) { el.remove(); });
        self.processMessage(text);
      });
      container.appendChild(btn);
    });

    this.messagesArea.appendChild(container);
    this.scrollToBottom();
  };

  ColdLavaChatWidget.prototype.sendUserMessage = function() {
    var text = this.inputEl.value.trim();
    if (!text) return;
    this.inputEl.value = '';
    this.processMessage(text);
  };

  ColdLavaChatWidget.prototype.processMessage = function(text) {
    var self = this;
    this.addUserMessage(text);

    // Remove any existing quick replies
    var allQR = this.messagesArea.querySelectorAll('.cl-chat-quick-replies');
    allQR.forEach(function(el) { el.remove(); });

    // Show typing
    var delay = 800 + Math.random() * 1200;
    this.showTyping();

    setTimeout(function() {
      self.hideTyping();
      var response = self.findResponse(text);
      self.addBotMessage(response, false);

      // Show quick replies again after response
      setTimeout(function() {
        self.showQuickReplies();
      }, 300);
    }, delay);
  };

  ColdLavaChatWidget.prototype.findResponse = function(userText) {
    var lower = userText.toLowerCase();
    var responses = this.industryConfig.responses;
    var bestMatch = null;
    var bestScore = 0;

    for (var i = 0; i < responses.length; i++) {
      var score = 0;
      for (var j = 0; j < responses[i].keywords.length; j++) {
        if (lower.indexOf(responses[i].keywords[j]) !== -1) {
          score++;
        }
      }
      if (score > bestScore) {
        bestScore = score;
        bestMatch = responses[i];
      }
    }

    var answer = bestMatch && bestScore > 0
      ? bestMatch.answer
      : this.industryConfig.fallback;

    return resolvePlaceholders(answer, this.placeholders);
  };

  // ---- Expose globally ----
  window.ColdLavaChatWidget = ColdLavaChatWidget;

})();
