// ─── Real financial literacy content ─────────────────────────────
// All questions, game data, and scenarios for the Learn tab

export const PILLAR_QUIZZES = {
  earn: {
    pillar: 'Earn', icon: '🛠️', color: '#F0A04B',
    questions: [
      {
        q: "What is the difference between active and passive income?",
        opts: [
          "Active = you work for money; Passive = money works for you",
          "Active = large amounts; Passive = small amounts",
          "Active = legal; Passive = illegal",
          "There is no real difference",
        ],
        correct: 0,
        explain: "Active income requires your time (jobs, tutoring). Passive income keeps earning even when you're not working — like interest on savings, or a YouTube channel you built years ago.",
      },
      {
        q: "You tutor for 2 hours and earn 100,000 ₫ per hour. How much do you earn?",
        opts: ["100,000 ₫", "150,000 ₫", "200,000 ₫", "250,000 ₫"],
        correct: 2,
        explain: "2 hours × 100,000 ₫ = 200,000 ₫. Simple, but tracking your hourly rate is the first step to valuing your own time.",
      },
      {
        q: "Which of these is a skill a Vietnamese teen can realistically monetize RIGHT NOW?",
        opts: [
          "Designing graphics on Canva for small businesses",
          "Running a hedge fund",
          "Owning a factory",
          "Trading rare stocks professionally",
        ],
        correct: 0,
        explain: "Canva design, tutoring, video editing, social media management — these require skills you can learn this month, not years. Start small and build.",
      },
      {
        q: "You earn 600,000 ₫ and spend 240,000 ₫. What is your savings rate?",
        opts: ["40%", "50%", "60%", "25%"],
        correct: 2,
        explain: "Savings rate = (Saved ÷ Earned) × 100. (600k − 240k) ÷ 600k = 360k ÷ 600k = 60%. A 60% savings rate is excellent!",
      },
      {
        q: "Why is it important to track your income, even small amounts?",
        opts: [
          "It isn't — only big earners need to track",
          "Because habits formed now will scale as your income grows",
          "To impress your parents",
          "Banks require it by law",
        ],
        correct: 1,
        explain: "A teen who tracks 200,000 ₫ allowance will naturally track 20,000,000 ₫ salary later. Financial discipline is a habit, not a skill that appears at adulthood.",
      },
      {
        q: "What does 'opportunity cost' mean?",
        opts: [
          "The cost of a business opportunity",
          "What you give up when you choose one option over another",
          "A fee paid to get a job",
          "The cost of education",
        ],
        correct: 1,
        explain: "If you spend Saturday gaming instead of tutoring (100,000 ₫/hr), the opportunity cost is the money you could have earned. Every choice has a hidden cost.",
      },
    ],
  },

  save: {
    pillar: 'Save', icon: '🐷', color: '#3F8E5C',
    questions: [
      {
        q: "You save 100,000 ₫ every week. How much do you have after 6 months (26 weeks)?",
        opts: ["1,800,000 ₫", "2,400,000 ₫", "2,600,000 ₫", "3,000,000 ₫"],
        correct: 2,
        explain: "100,000 ₫ × 26 weeks = 2,600,000 ₫. That's almost enough for a new bicycle! Consistent small saves add up fast.",
      },
      {
        q: "What is compound interest?",
        opts: [
          "Interest charged on a loan",
          "Earning interest on your interest — money grows exponentially over time",
          "A fee charged by banks every month",
          "A fixed amount paid by your parents",
        ],
        correct: 1,
        explain: "If you save 1,000,000 ₫ at 5% annual interest: Year 1 = 1,050,000 ₫. Year 2 = 1,102,500 ₫ (interest on the 1,050,000, not just the original). It snowballs!",
      },
      {
        q: "The 50/30/20 rule says your money should go where?",
        opts: [
          "50% needs, 30% wants, 20% savings",
          "50% savings, 30% needs, 20% wants",
          "50% wants, 30% savings, 20% needs",
          "50% needs, 20% wants, 30% savings",
        ],
        correct: 0,
        explain: "50% on Needs (food, transport, school), 30% on Wants (fun, clothes, games), 20% saved or invested. Simple framework you can apply to any income.",
      },
      {
        q: "Why should you have an emergency fund?",
        opts: [
          "To buy things on sale",
          "To have 3–6 months of expenses ready for unexpected situations",
          "To invest in the stock market",
          "Emergency funds are only for adults",
        ],
        correct: 1,
        explain: "Phone breaks, medical cost, need bus fare — emergencies happen. Having 3–6 months of expenses saved means you never have to borrow or panic.",
      },
      {
        q: "You want to save 2,000,000 ₫ for a bicycle in 5 months. How much must you save per week?",
        opts: ["~80,000 ₫", "~92,300 ₫", "~100,000 ₫", "~115,000 ₫"],
        correct: 1,
        explain: "5 months ≈ 21.7 weeks. 2,000,000 ÷ 21.7 ≈ 92,300 ₫ per week. Breaking big goals into weekly numbers makes them achievable.",
      },
      {
        q: "What is 'paying yourself first'?",
        opts: [
          "Spending on yourself before others",
          "Moving savings out automatically BEFORE you spend anything",
          "Earning money before saving",
          "Buying what you need first",
        ],
        correct: 1,
        explain: "Transfer your savings amount the moment you receive money — before buying anything. What's left is what you can spend. This removes willpower from the equation.",
      },
    ],
  },

  spend: {
    pillar: 'Spend', icon: '🛒', color: '#E76F62',
    questions: [
      {
        q: "What is an impulse purchase?",
        opts: [
          "A planned purchase you've researched",
          "Buying something unplanned, triggered by emotion or temptation",
          "A purchase made with cash",
          "Buying something on sale",
        ],
        correct: 1,
        explain: "Milk tea because your friends are getting it. A phone case you didn't need. Impulse buying is driven by the moment, not a plan — and it's the #1 budget killer for teens.",
      },
      {
        q: "The best strategy to avoid impulse spending is:",
        opts: [
          "Never go to shopping malls",
          "Wait 24–48 hours before buying anything unplanned",
          "Only carry exact change",
          "Ask your parents first every time",
        ],
        correct: 1,
        explain: "The '24-hour rule' breaks the emotional trigger. If you still want it tomorrow, it might be worth buying. Most of the time, the urge passes.",
      },
      {
        q: "You have 500,000 ₫. Food costs 200,000 ₫, transport 80,000 ₫, a game skin costs 120,000 ₫. How much is left?",
        opts: ["80,000 ₫", "100,000 ₫", "120,000 ₫", "150,000 ₫"],
        correct: 1,
        explain: "500k − 200k − 80k − 120k = 100,000 ₫. Always subtract needs + planned wants first, then see what's truly 'free' to spend.",
      },
      {
        q: "Store A sells 500ml juice for 15,000 ₫. Store B sells 750ml for 20,000 ₫. Which is better value?",
        opts: [
          "Store A — it's cheaper",
          "Store B — lower price per ml",
          "They're the same",
          "Depends on the brand",
        ],
        correct: 1,
        explain: "Store A: 15,000 ÷ 500 = 30 ₫/ml. Store B: 20,000 ÷ 750 = 26.7 ₫/ml. Store B is ~11% cheaper per ml. Unit price thinking saves money across hundreds of purchases.",
      },
      {
        q: "What does 'needs vs wants' mean in budgeting?",
        opts: [
          "Needs = expensive; Wants = cheap",
          "Needs = essential to survive/function; Wants = nice to have but optional",
          "Needs = things parents pay for; Wants = things you pay for",
          "Needs and wants are the same thing",
        ],
        correct: 1,
        explain: "Needs: food, medicine, school supplies, transport to school. Wants: bubble tea, new shoes (when old ones still work), games. Knowing which is which = the foundation of all budgeting.",
      },
      {
        q: "You spent 30% of your 2,000,000 ₫ monthly budget on wants. How much is that?",
        opts: ["400,000 ₫", "500,000 ₫", "600,000 ₫", "700,000 ₫"],
        correct: 2,
        explain: "2,000,000 × 30% = 600,000 ₫. Knowing percentages as money amounts helps you quickly check if you're on track with any budget framework.",
      },
    ],
  },

  invest: {
    pillar: 'Invest', icon: '🌳', color: '#2F6E47',
    questions: [
      {
        q: "What does 'investing' mean?",
        opts: [
          "Spending money on experiences",
          "Putting money into something that can grow in value over time",
          "Saving money in a piggy bank",
          "Borrowing money from a bank",
        ],
        correct: 1,
        explain: "Investing = putting money into assets (stocks, funds, property) expecting it to grow. Unlike a savings account (low interest), investments have higher potential — and higher risk.",
      },
      {
        q: "You invest 1,000,000 ₫ and it grows 10% per year. How much after 1 year?",
        opts: ["1,010,000 ₫", "1,050,000 ₫", "1,100,000 ₫", "1,200,000 ₫"],
        correct: 2,
        explain: "1,000,000 × 1.10 = 1,100,000 ₫. A 10% return is historically average for global stock index funds over long periods. Your money grew 100,000 ₫ without you working.",
      },
      {
        q: "Why is starting to invest earlier better, even with small amounts?",
        opts: [
          "Young people get better interest rates",
          "More time for compound interest to multiply your money",
          "Banks trust younger investors more",
          "Investing early is not actually better",
        ],
        correct: 1,
        explain: "1,000,000 ₫ at 8%/year for 40 years = ~21,700,000 ₫. Wait 10 years and invest the same = ~10,060,000 ₫. The first 10 years doubled the final outcome. Time is your biggest advantage.",
      },
      {
        q: "What is 'diversification' in investing?",
        opts: [
          "Investing all your money in one great company",
          "Spreading money across different assets to reduce risk",
          "Only investing in Vietnamese companies",
          "Changing investments every month",
        ],
        correct: 1,
        explain: "Don't put all eggs in one basket. If you own 1 stock and it crashes, you lose everything. Own 100 stocks (via an index fund) and one crashing barely hurts you.",
      },
      {
        q: "Higher potential return usually means:",
        opts: [
          "Lower risk",
          "The same risk",
          "Higher risk",
          "No risk",
        ],
        correct: 2,
        explain: "Risk and return are linked. Savings accounts: low risk, low return (~5%). Stocks: higher risk, higher potential return (~8–12%). Crypto: very high risk, unpredictable return. Choose based on your time horizon.",
      },
      {
        q: "An 'index fund' is:",
        opts: [
          "A fund that picks only winning stocks",
          "A fund that owns a tiny piece of hundreds of companies automatically",
          "A savings account with higher interest",
          "A loan for teenagers",
        ],
        correct: 1,
        explain: "Index funds (like VN30 or S&P 500 ETFs) buy a slice of the whole market. No one guesses which stocks win — you just own all of them. Low cost, low stress, historically great returns.",
      },
    ],
  },

  give: {
    pillar: 'Give', icon: '🌸', color: '#9B7AC4',
    questions: [
      {
        q: "Why do financial experts recommend including giving in your budget?",
        opts: [
          "It's required by Vietnamese law",
          "It builds generosity as a habit and strengthens community",
          "You get double the amount back",
          "It reduces taxes for adults",
        ],
        correct: 1,
        explain: "Research shows giving improves well-being, builds relationships, and develops an abundance mindset — the opposite of hoarding. Even 1–5% of income, given consistently, has a big impact.",
      },
      {
        q: "Which of these counts as 'giving'?",
        opts: [
          "Only donating money to a charity",
          "Money, time, skills, or items — any form of genuine contribution",
          "Lending money and expecting it back",
          "Buying gifts for yourself",
        ],
        correct: 1,
        explain: "You can give your time (tutoring a classmate for free), your skills (designing a poster for a community event), your items (donating old clothes), or money. All forms count.",
      },
      {
        q: "You receive 2,000,000 ₫ from lì xì (Tết money). You decide to give 5%. How much is that?",
        opts: ["50,000 ₫", "100,000 ₫", "200,000 ₫", "500,000 ₫"],
        correct: 1,
        explain: "2,000,000 × 5% = 100,000 ₫. Even a small percentage, given consistently, can fund a meal for a family in need. Start with a percentage, not a fixed number.",
      },
      {
        q: "What is a good way to decide WHERE to give?",
        opts: [
          "Always give to whoever asks",
          "Research causes you care about and verify they're legitimate",
          "Only give to famous organizations",
          "Give to no one — keep your money",
        ],
        correct: 1,
        explain: "Be intentional: find causes aligned with your values (education, environment, animals). Check if organizations are registered and transparent with funds. Thoughtful giving = more impact.",
      },
      {
        q: "The concept of 'time value of giving' means:",
        opts: [
          "Give only when you're old and rich",
          "Giving regularly now builds a habit worth more than a large one-time gift later",
          "Wait until you earn more to give more",
          "Time is the only thing worth giving",
        ],
        correct: 1,
        explain: "A teen who gives 50,000 ₫/month for 50 years gives 30,000,000 ₫ total — and builds a generous character. A wealthy adult who 'will give later' often never starts.",
      },
    ],
  },

  protect: {
    pillar: 'Protect', icon: '🛡️', color: '#E5B924',
    questions: [
      {
        q: "You get a Zalo message: 'Congratulations! You won 5,000,000 ₫! Click here and enter your bank PIN to claim.' What do you do?",
        opts: [
          "Click immediately — free money!",
          "Send it to friends so they can win too",
          "Ignore and report it — this is a classic scam",
          "Enter your PIN carefully",
        ],
        correct: 2,
        explain: "No legitimate lottery or giveaway asks for your bank PIN. This is a phishing scam. Real prizes are verified through official channels, never random Zalo messages. Always report.",
      },
      {
        q: "Which is the strongest password?",
        opts: [
          "kyle2008",
          "123456",
          "Tr@ng#9!mBxQ2",
          "password",
        ],
        correct: 2,
        explain: "Strong passwords: 12+ characters, mix of uppercase, lowercase, numbers, and symbols. Never use your name, birthday, or 'password'. Use a password manager if you can't remember them.",
      },
      {
        q: "What does 'insurance' do?",
        opts: [
          "Makes you money when you invest",
          "Protects you from large unexpected financial losses",
          "Replaces your income when you stop working",
          "Insurance is only for old people",
        ],
        correct: 1,
        explain: "Insurance = you pay a small regular amount so that if something big goes wrong (health, accident, theft), you don't lose everything. Health insurance is the most important for teens.",
      },
      {
        q: "Someone asks for your bank account details to 'send you money for a job.' You should:",
        opts: [
          "Give them your full account number, name, and PIN",
          "Give them your account number only — that's safe",
          "Verify the person is real via official channels before sharing anything",
          "Share details — they offered you money first",
        ],
        correct: 2,
        explain: "Your account number alone can sometimes be misused. Your PIN should NEVER be shared. Legitimate employers use official onboarding processes. If something feels off, it probably is.",
      },
      {
        q: "What is 'phishing'?",
        opts: [
          "A fishing app for teenagers",
          "Tricking someone into giving personal/financial information through fake messages",
          "A virus that deletes your files",
          "A legal way to earn money online",
        ],
        correct: 1,
        explain: "Phishing = fake messages (email, Zalo, SMS) pretending to be your bank, school, or a company, designed to steal your login or financial info. Check sender details carefully — one wrong letter in a URL = scam.",
      },
      {
        q: "Why is it risky to use the same password across multiple apps?",
        opts: [
          "It isn't risky at all",
          "If one app is hacked, criminals can access all your other accounts",
          "Apps don't store passwords anyway",
          "Only risky if you use the same email",
        ],
        correct: 1,
        explain: "Data breaches happen constantly. If hackers get your password from App A and you use it for your bank too, your money is at risk. Use unique passwords for financial and email accounts.",
      },
    ],
  },
}

// ─── Need vs Want scenarios ───────────────────────────────────────
export const NVW_CARDS = [
  { item: 'Milk tea after school',      price: '30,000 ₫',  sub: 'Your friends are going',             emoji: '🧋', answer: 'want' },
  { item: 'New toothbrush',             price: '25,000 ₫',  sub: 'Old one is worn out',                emoji: '🪥', answer: 'need' },
  { item: 'Grab ride to school',        price: '45,000 ₫',  sub: 'Bus broke down, you\'ll be late',    emoji: '🛵', answer: 'need' },
  { item: 'Limited game skin',          price: '120,000 ₫', sub: 'Only available this weekend',        emoji: '🎮', answer: 'want' },
  { item: 'School notebook',            price: '20,000 ₫',  sub: 'Starting new semester tomorrow',     emoji: '📓', answer: 'need' },
  { item: 'Bubble tea (3rd this week)', price: '40,000 ₫',  sub: 'Walking past your favourite shop',  emoji: '🫧', answer: 'want' },
  { item: 'Paracetamol',               price: '15,000 ₫',  sub: 'You have a headache',                emoji: '💊', answer: 'need' },
  { item: 'New phone case',             price: '85,000 ₫',  sub: 'Old case still works fine',         emoji: '📱', answer: 'want' },
  { item: 'Haircut',                    price: '50,000 ₫',  sub: 'Hair is getting too long',           emoji: '✂️', answer: 'need' },
  { item: 'Trendy sneakers',            price: '650,000 ₫', sub: 'You have 3 pairs already',          emoji: '👟', answer: 'want' },
  { item: 'Replacement earphones',      price: '150,000 ₫', sub: 'Broke during online class',         emoji: '🎧', answer: 'need' },
  { item: 'Sticker pack',              price: '18,000 ₫',  sub: 'Cute design, don\'t really need it', emoji: '🌟', answer: 'want' },
  { item: 'Sunscreen',                 price: '95,000 ₫',  sub: 'Doctor said you need it daily',      emoji: '🧴', answer: 'need' },
  { item: 'Anime poster',              price: '60,000 ₫',  sub: 'Would look cool on your wall',       emoji: '🖼️', answer: 'want' },
  { item: 'Bus monthly pass',          price: '200,000 ₫', sub: 'Cheaper than daily tickets',         emoji: '🚌', answer: 'need' },
]

// ─── Budget Builder scenario ──────────────────────────────────────
export const BUDGET_SCENARIO = {
  name: "Minh's Monthly Budget",
  income: 2000000,
  description: "Minh receives 2,000,000 ₫/month from part-time tutoring and pocket money combined. Help allocate it using the 50/30/20 rule.",
  categories: [
    { id: 'food',      label: 'Food & Drinks',  icon: '🍜', type: 'need',  suggested: 400000, max: 800000 },
    { id: 'transport', label: 'Transport',       icon: '🚌', type: 'need',  suggested: 200000, max: 400000 },
    { id: 'education', label: 'Books & School',  icon: '📚', type: 'need',  suggested: 200000, max: 400000 },
    { id: 'fun',       label: 'Entertainment',   icon: '🎮', type: 'want',  suggested: 200000, max: 500000 },
    { id: 'clothes',   label: 'Clothes',         icon: '👕', type: 'want',  suggested: 150000, max: 400000 },
    { id: 'social',    label: 'Eating out/café', icon: '☕', type: 'want',  suggested: 150000, max: 400000 },
    { id: 'savings',   label: 'Savings',         icon: '🐷', type: 'save',  suggested: 400000, max: 1000000 },
    { id: 'give',      label: 'Giving',          icon: '🌸', type: 'give',  suggested: 100000, max: 300000 },
  ],
  tips: {
    perfect: "Perfect balance! You're nailing the 50/30/20 rule. Minh's future self will thank you. 🌟",
    oversave: "You're saving a lot — great discipline! Make sure Needs are covered first though.",
    overspend: "Spending too much on Wants. Try shifting some to Savings — even 50,000 ₫ more/month = 600,000 ₫/year.",
    unbalanced: "Check your Needs — they might be underfunded. Needs first, then Wants, then Save.",
  },
}

// ─── Scam Spotter scenarios ───────────────────────────────────────
export const SCAM_CARDS = [
  {
    type: 'zalo',
    from: 'Zalo Unknown +84 908 xxx',
    message: '🎉 CHÚC MỪNG! Bạn đã trúng thưởng 10,000,000 ₫ từ chương trình Cha-Ching Lucky Draw! Nhấn link để nhận: bit.ly/cc-prize-2024 và nhập mã PIN ngân hàng.',
    isScam: true,
    explain: "SCAM. Red flags: unsolicited prize, urgent link, asking for bank PIN. Legitimate contests never ask for your PIN through messaging apps.",
  },
  {
    type: 'email',
    from: 'no-reply@vietcombank-secure.net',
    message: 'Your VietcomBank account has been suspended. Verify your identity immediately at: vietcombank-secure.net/login or your account will be closed in 24 hours.',
    isScam: true,
    explain: "SCAM. Red flag: the domain is 'vietcombank-secure.net', not 'vietcombank.com.vn'. Scammers clone bank branding with slightly different URLs. Always type your bank URL manually.",
  },
  {
    type: 'sms',
    from: 'Viettel: 8755',
    message: 'Your Viettel account has been topped up with 100,000 ₫ on 26/05/2026 at 14:32. Current balance: 145,000 ₫. If you did not make this top-up, call 198.',
    isScam: false,
    explain: "REAL. This is a standard top-up confirmation from Viettel's official shortcode (8755). No links, no requests for information. Informational only.",
  },
  {
    type: 'zalo',
    from: 'Nguyễn Văn A (classmate)',
    message: 'Hey! I\'m stuck abroad and lost my wallet. Can you send 500,000 ₫ to my friend\'s account? I\'ll pay back double tomorrow. Account: 1234567890 MB Bank.',
    isScam: true,
    explain: "SCAM. This is a 'stranded friend' scam — attackers hack or clone accounts to ask for emergency money transfers. Always call your friend directly to verify before sending anything.",
  },
  {
    type: 'app',
    from: 'TikTok Notification',
    message: 'Your TikTok video reached 10,000 views! Claim your 50,000 ₫ creator reward by logging in: tiktok.com/creator-rewards',
    isScam: false,
    explain: "REAL. TikTok does have a Creator Fund/rewards program and this is a genuine notification format. The link goes to tiktok.com (official domain). Always check the base domain.",
  },
  {
    type: 'sms',
    from: '+84 357 482 910',
    message: 'Part-time job opportunity! Earn 500K-1M ₫/day just by liking posts on Shopee. No experience needed. Reply YES to start. Requires 200,000 ₫ deposit to activate account.',
    isScam: true,
    explain: "SCAM. Any 'job' requiring an upfront deposit is a scam. Legitimate employers pay YOU — they never ask for a deposit. 'Like-farming' job scams are extremely common targeting teens.",
  },
  {
    type: 'email',
    from: 'admissions@vinuni.edu.vn',
    message: 'Dear Applicant, your application for the VinUniversity Summer Programme has been received. Please log in to your applicant portal at apply.vinuni.edu.vn to check your status.',
    isScam: false,
    explain: "REAL. The email is from the official VinUniversity domain (.edu.vn) and directs to their official application portal. No financial information requested. Legitimate institutional communication.",
  },
  {
    type: 'zalo',
    from: 'Cha-Ching Official',
    message: 'Your Cha-Ching wallet is at risk! Verify your account in 30 minutes or it will be LOCKED. Send your OTP code to this number: 090-xxx-xxxx immediately.',
    isScam: true,
    explain: "SCAM. Cha-Ching (or any legitimate service) will NEVER ask you to send your OTP to a phone number. OTPs are one-time codes for YOUR login — sharing them gives complete account access.",
  },
]
