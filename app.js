/**
 * MentalMedi — Client-side Application Script
 * Modern Evidence-Based Mental Health & Therapy Platform
 */

document.addEventListener('DOMContentLoaded', () => {

  // ==========================================
  // 1. Data Store: Tests, Specialists, Articles
  // ==========================================

  const testData = {
    anxiety: {
      name: "GAD-7 შფოთვის სკრინინგი",
      nameEn: "GAD-7 Anxiety Screening",
      questions: [
        {
          ka: "ნერვიულობა, შფოთვა ან დაძაბულობის შეგრძნება?",
          en: "Feeling nervous, anxious, or on edge?"
        },
        {
          ka: "შფოთვის შეჩერების ან კონტროლის შეუძლებლობა?",
          en: "Not being able to stop or control worrying?"
        },
        {
          ka: "მეტისმეტად ბევრი ნერვიულობა სხვადასხვა საკითხებზე?",
          en: "Worrying too much about different things?"
        },
        {
          ka: "მოდუნებისა და სიმშვიდის შენარჩუნების სირთულე?",
          en: "Trouble relaxing and feeling at ease?"
        },
        {
          ka: "მოუსვენრობა, იმდენად რომ რთულია ერთ ადგილზე გაჩერება?",
          en: "Being so restless that it's hard to sit still?"
        }
      ],
      options: [
        { ka: "საერთოდ არა", en: "Not at all", score: 0 },
        { ka: "რამდენიმე დღე", en: "Several days", score: 1 },
        { ka: "დღეების ნახევარზე მეტი", en: "More than half the days", score: 2 },
        { ka: "თითქმის ყოველდღე", en: "Nearly every day", score: 3 }
      ],
      getResults: (score, isEn) => {
        if (score <= 4) {
          return {
            title: isEn ? "Minimal Anxiety" : "მინიმალური შფოთვა",
            desc: isEn 
              ? "Your responses suggest mild or normal anxiety levels. Keep practicing regular self-care and balanced lifestyle." 
              : "თქვენი პასუხების მიხედვით, შფოთვის დონე ნორმის ფარგლებშია. გააგრძელეთ ჯანსაღი რეჟიმი, სეირნობა და ძილის ჰიგიენა.",
            rec: isEn 
              ? ["Daily meditation and breathing exercises", "Maintain a balanced work-life routine"]
              : ["რეგულარული სუნთქვითი ვარჯიშები", "სამუშაოსა და დასვენების ბალანსის შენარჩუნება"]
          };
        } else if (score <= 9) {
          return {
            title: isEn ? "Mild to Moderate Anxiety" : "ზომიერი შფოთვის დონე",
            desc: isEn
              ? "Noticeable tension and stress symptoms present. A short course of CBT therapy can help prevent escalation."
              : "შეინიშნება შფოთვისა და ემოციური დაძაბულობის ნიშნები. რეკომენდებულია ფსიქოთერაპევტთან კონსულტაცია ეფექტური ტექნიკების ასათვისებლად.",
            rec: isEn
              ? ["1-2 exploratory CBT sessions", "Stress reduction and caffeine limit"]
              : ["1-2 საორიენტაციო სესია CBT სპეციალისტთან", "კოფეინის შეზღუდვა და სტრესის მართვის ტექნიკები"]
          };
        } else {
          return {
            title: isEn ? "High Anxiety Level" : "მაღალი შფოთვის დონე",
            desc: isEn
              ? "Symptoms significantly impact daily functioning. Professional evaluation is strongly recommended."
              : "შფოთვის სიმპტომები ხელს გიშლით ყოველდღიურ ფუნქციონირებაში. მკაცრად რეკომენდებულია სპეციალისტთან ვიზიტის დაჯავშნა.",
            rec: isEn
              ? ["Clinical assessment with a psychotherapist or psychiatrist", "Evidence-based therapy plan"]
              : ["კლინიკური შეფასება ფსიქოთერაპევტთან ან ფსიქიატრთან", "კომპლექსური თერაპიული გეგმის შედგენა"]
          };
        }
      }
    },
    depression: {
      name: "PHQ-9 დეპრესიის სკრინინგი",
      nameEn: "PHQ-9 Depression Screening",
      questions: [
        {
          ka: "ინტერესის ან სიამოვნების დაკარგვა საქმიანობების მიმართ?",
          en: "Little interest or pleasure in doing things?"
        },
        {
          ka: "დათრგუნული განწყობა, სასოწარკვეთა ან უიმედობის შეგრძნება?",
          en: "Feeling down, depressed, or hopeless?"
        },
        {
          ka: "დაძინების გაძნელება, ღამით გაღვიძება ან მეტისმეტად ბევრი ძილი?",
          en: "Trouble falling or staying asleep, or sleeping too much?"
        },
        {
          ka: "დაღლილობის შეგრძნება ან ენერგიის ნაკლებობა?",
          en: "Feeling tired or having little energy?"
        },
        {
          ka: "საკუთარ თავზე ცუდი წარმოდგენა — თითქოს იმედი გაუცრუეთ საკუთარ თავს ან ოჯახს?",
          en: "Feeling bad about yourself — or that you are a failure?"
        }
      ],
      options: [
        { ka: "არასოდეს", en: "Not at all", score: 0 },
        { ka: "იშვიათად", en: "Several days", score: 1 },
        { ka: "ხშირად", en: "More than half days", score: 2 },
        { ka: "თითქმის ყოველდღე", en: "Nearly every day", score: 3 }
      ],
      getResults: (score, isEn) => {
        if (score <= 4) {
          return {
            title: isEn ? "Normal Mood State" : "ნორმალური ემოციური ფონი",
            desc: isEn
              ? "No signs of significant depressive episode. Continue caring for your mental wellbeing."
              : "დეპრესიული სიმპტომები მინიმალურია ან არ ფიქსირდება. გააგრძელეთ თქვენი საყვარელი აქტივობები.",
            rec: isEn
              ? ["Stay physically active", "Social connections with friends"]
              : ["ფიზიკური აქტივობა", "მეგობრებთან ურთიერთობა და სოციალიზაცია"]
          };
        } else if (score <= 9) {
          return {
            title: isEn ? "Mild Subclinical Low Mood" : "მსუბუქი დეპრესიული განწყობა",
            desc: isEn
              ? "Temporary emotional dip or fatigue. Helpful to speak with an empathetic therapist."
              : "შესაძლოა განიცდიდეთ სეზონურ ან ემოციურ გადაღლას. საუბარი სპეციალისტთან დაგეხმარებათ ენერგიის აღდგენაში.",
            rec: isEn
              ? ["Consultation with psychotherapist", "Daily outdoor walks and sunlight"]
              : ["კონსულტაცია ფსიქოლოგთან", "მზის სინათლე, სეირნობა და ძილის რეჟიმი"]
          };
        } else {
          return {
            title: isEn ? "Moderate to Severe Depression Symptoms" : "გამოხატული დეპრესიული მდგომარეობა",
            desc: isEn
              ? "Your results suggest significant depressive symptoms. Please book an appointment with our clinical specialists."
              : "თქვენი მაჩვენებელი მიუთითებს გამოხატულ დეპრესიულ ფონზე. ნუ დარჩებით მარტო ამ მდგომარეობასთან — ჩვენი გუნდი მზადაა მხარდასაჭერად.",
            rec: isEn
              ? ["Immediate consultation with a psychiatrist or therapist", "Personalized therapy package"]
              : ["კონსულტაცია ფსიქიატრთან ან ფსიქოთერაპევტთან", "სრულყოფილი თერაპიული მხარდაჭერა"]
          };
        }
      }
    },
    burnout: {
      name: "Burnout გადაწვის ტესტი",
      nameEn: "Burnout & Exhaustion Test",
      questions: [
        {
          ka: "სამუშაო დღის ბოლოს გრძნობთ თუ არა სრულ ემოციურ გამოფიტვას?",
          en: "Do you feel completely emotionally drained at the end of the day?"
        },
        {
          ka: "გაგიჩნდათ თუ არა ცინიკური ან გულგრილი დამოკიდებულება საქმისადმი?",
          en: "Have you become cynical or indifferent toward your work and tasks?"
        },
        {
          ka: "გიჭირთ თუ არა კონცენტრაცია და გრძნობთ პროდუქტიულობის მკვეთრ ვარდნას?",
          en: "Do you struggle with concentration and feel a drop in performance?"
        },
        {
          ka: "გაღიზიანებთ თუ არა კოლეგებთან ან კლიენტებთან ჩვეულებრივი კომუნიკაცია?",
          en: "Does ordinary communication with colleagues or clients irritate you?"
        },
        {
          ka: "დასვენების შემდეგაც (შაბათ-კვირა) გრძნობთ თუ არა, რომ ძალები არ აღგიდგათ?",
          en: "Even after weekends off, do you feel completely unrested?"
        }
      ],
      options: [
        { ka: "იშვიათად ან არასდროს", en: "Rarely / Never", score: 0 },
        { ka: "თვეში რამდენჯერმე", en: "A few times a month", score: 1 },
        { ka: "კვირაში 1-2-ჯერ", en: "1-2 times a week", score: 2 },
        { ka: "მუდმივად / ყოველდღე", en: "Constantly / Daily", score: 3 }
      ],
      getResults: (score, isEn) => {
        if (score <= 5) {
          return {
            title: isEn ? "Low Burnout Risk" : "გადაწვის დაბალი რისკი",
            desc: isEn
              ? "You maintain healthy boundaries between work and rest. Keep prioritizing recovery."
              : "თქვენ წარმატებით ინარჩუნებთ ჯანსაღ ზღვარს სამუშაოსა და დასვენებას შორის.",
            rec: isEn ? ["Keep current schedule balance"] : ["შეინარჩუნეთ არსებული სამუშაო რიტმი"]
          };
        } else if (score <= 10) {
          return {
            title: isEn ? "Moderate Exhaustion" : "ზომიერი ემოციური გადაღლა",
            desc: isEn
              ? "Burnout warning signs are emerging. Time to reassess workload and establish firm boundaries."
              : "შეინიშნება გადაწვის პირველი ეტაპები. მნიშვნელოვანია ისწავლოთ საზღვრების დაცვა და დროული განტვირთვა.",
            rec: isEn
              ? ["Set clear digital boundaries", "Stress coaching session"]
              : ["ციფრული დეტოქსი სამუშაო საათების შემდეგ", "სტრესის მართვის კონსულტაცია"]
          };
        } else {
          return {
            title: isEn ? "High Burnout Phase" : "ღრმა გადაწვის ფაზა",
            desc: isEn
              ? "You are experiencing chronic burnout syndrome. Taking restorative time and professional guidance is essential."
              : "თქვენ იმყოფებით ქრონიკული ემოციური გადაწვის მდგომარეობაში. აუცილებელია პროფესიონალური დახმარება და ცხოვრების წესის კორექცია.",
            rec: isEn
              ? ["Urgent restorative therapy", "Professional workload audit"]
              : ["ფსიქოთერაპიული სესიები გადაწვის მართვაზე", "გადაუდებელი დასვენება და რეკონფიგურაცია"]
          };
        }
      }    },
    balance: {
      name: "ბალანსის მოდელი",
      nameEn: "Balance Model",
      questions: [
        // Block 0: სხეული და ჯანმრთელობა (Body & Health)
        {
          block: 0,
          blockKa: "სხეული და ჯანმრთელობა",
          blockEn: "Body & Health",
          ka: "ყოველდღიურად მძინავს საკმარისად (7-8 საათი) და გაღვიძებისას თავს დასვენებულად ვგრძნობ.",
          en: "I get adequate sleep (7-8 hours) daily and wake up feeling refreshed and rested."
        },
        {
          block: 0,
          blockKa: "სხეული და ჯანმრთელობა",
          blockEn: "Body & Health",
          ka: "რეგულარულად ვუთმობ დროს ფიზიკურ აქტივობას, სპორტს ან ფეხით სიარულს.",
          en: "I regularly dedicate time to physical activity, sports, or active walking."
        },
        {
          block: 0,
          blockKa: "სხეული და ჯანმრთელობა",
          blockEn: "Body & Health",
          ka: "ვაკონტროლებ ჩემს კვებას და ვცდილობ მივიღო ჩემი ორგანიზმისთვის ჯანსაღი პროდუქტები.",
          en: "I monitor my nutrition and try to consume foods that nourish and energize my body."
        },
        {
          block: 0,
          blockKa: "სხეული და ჯანმრთელობა",
          blockEn: "Body & Health",
          ka: "სამუშაო დღის განმავლობაშიც კი ვპოულობ დროს სრულფასოვანი დასვენებისა და განტვირთვისთვის.",
          en: "Even during busy workdays, I find moments for restorative breaks and relaxation."
        },
        {
          block: 0,
          blockKa: "სხეული და ჯანმრთელობა",
          blockEn: "Body & Health",
          ka: "აქტიურად ვზრუნავ ჩემს გარეგნობაზე, სხეულის მოვლასა და ჯანმრთელობის პრევენციაზე.",
          en: "I actively care for my physical well-being, personal grooming, and preventive health."
        },

        // Block 1: საქმიანობა და მიღწევა (Work & Achievement)
        {
          block: 1,
          blockKa: "საქმიანობა და მიღწევა",
          blockEn: "Work & Achievement",
          ka: "ჩემი პროფესიული საქმიანობა, სამსახური ან სწავლა ჩემი ცხოვრების უმნიშვნელოვანესი ნაწილია.",
          en: "My profession, work, or studies represent a vital and fulfilling cornerstone of my life."
        },
        {
          block: 1,
          blockKa: "საქმიანობა და მიღწევა",
          blockEn: "Work & Achievement",
          ka: "ყოველთვის ვცდილობ დასახულ მიზნებს მივაღწიო და მუდმივად ორიენტირებული ვარ წარმატებაზე.",
          en: "I consistently strive to achieve my goals and remain focused on progress and success."
        },
        {
          block: 1,
          blockKa: "საქმიანობა და მიღწევა",
          blockEn: "Work & Achievement",
          ka: "აქტიურად ვხარჯავ ენერგიას ახალი ცოდნის მისაღებად, წიგნების საკითხავად ან კვალიფიკაციის ასამაღლებლად.",
          en: "I actively invest energy in gaining new knowledge, reading, or advancing my skills."
        },
        {
          block: 1,
          blockKa: "საქმიანობა და მიღწევა",
          blockEn: "Work & Achievement",
          ka: "ეფექტურად ვმართავ ჩემს ფინანსებს, ბიუჯეტს და მუდმივად ვზრუნავ მატერიალურ წინსვლაზე.",
          en: "I manage my personal finances wisely and consistently pursue financial stability."
        },
        {
          block: 1,
          blockKa: "საქმიანობა და მიღწევა",
          blockEn: "Work & Achievement",
          ka: "დიდ ენერგიასა და დროს ვუთმობ საოჯახო საქმეების მოწესრიგებასა და ყოველდღიურ ვალდებულებებს.",
          en: "I dedicate meaningful time and effort to organizing domestic tasks and responsibilities."
        },

        // Block 2: კონტაქტები და ურთიერთობები (Contacts & Relationships)
        {
          block: 2,
          blockKa: "კონტაქტები და ურთიერთობები",
          blockEn: "Contacts & Relationships",
          ka: "მაქვს მჭიდრო, ხარისხიანი და ემოციურად თბილი ურთიერთობა ჩემს ოჯახის წევრებთან ან პარტნიორთან.",
          en: "I maintain deep, supportive, and emotionally warm relationships with family or partner."
        },
        {
          block: 2,
          blockKa: "კონტაქტები და ურთიერთობები",
          blockEn: "Contacts & Relationships",
          ka: "რეგულარულად ვხვდები მეგობრებს და მათთან ერთად დროს აქტიურად ვატარებ.",
          en: "I regularly spend quality, engaging time with my close friends and social circle."
        },
        {
          block: 2,
          blockKa: "კონტაქტები და ურთიერთობები",
          blockEn: "Contacts & Relationships",
          ka: "მარტივად შევდივარ ახალ სოციალურ კონტაქტებში და აქტიურად ვმონაწილეობ საზოგადოებრივ ცხოვრებაში.",
          en: "I connect with new people easily and participate actively in social and community life."
        },
        {
          block: 2,
          blockKa: "კონტაქტები და ურთიერთობები",
          blockEn: "Contacts & Relationships",
          ka: "ახლობელ ადამიანებს ყოველთვის შეუძლიათ ჩემი ემოციური მხარდაჭერისა და თანაგრძნობის იმედი ჰქონდეთ.",
          en: "Loved ones can consistently rely on my emotional empathy, listening, and support."
        },
        {
          block: 2,
          blockKa: "კონტაქტები და ურთიერთობები",
          blockEn: "Contacts & Relationships",
          ka: "ადამიანებთან კომუნიკაცია და სოციალური კონტაქტები მმატებს ენერგიასა და სიხარულს.",
          en: "Socializing and sincere interpersonal communication energizes and inspires me."
        },

        // Block 3: მომავალი და ფანტაზია / საზრისი (Future & Meaning)
        {
          block: 3,
          blockKa: "მომავალი და ფანტაზია",
          blockEn: "Future & Meaning",
          ka: "ხშირად ვფიქრობ ჩემს სამომავლო გეგმებზე, მიზნებსა და გრძელვადიან პერსპექტივებზე.",
          en: "I frequently envision my future, long-term aspirations, and life trajectory."
        },
        {
          block: 3,
          blockKa: "მომავალი და ფანტაზია",
          blockEn: "Future & Meaning",
          ka: "ვუთმობ დროს მედიტაციას, სულიერ პრაქტიკას ან უბრალოდ საკუთარ ფიქრებთან მარტო დარჩენას.",
          en: "I carve out space for meditation, spiritual reflection, or quiet mindfulness."
        },
        {
          block: 3,
          blockKa: "მომავალი და ფანტაზია",
          blockEn: "Future & Meaning",
          ka: "მაქვს შემოქმედებითი ჰობი (ხატვა, წერა, მუსიკა, იდეების გენერირება) ან მიყვარს ოცნება.",
          en: "I practice creative pursuits (art, writing, music, innovation) and cherish dreaming."
        },
        {
          block: 3,
          blockKa: "მომავალი და ფანტაზია",
          blockEn: "Future & Meaning",
          ka: "ხშირად ვუღრმავდები ფილოსოფიურ კითხვებს, ცხოვრების საზრისსა და ჩემს შინაგან მისიას.",
          en: "I contemplate deeper questions about life purpose, personal philosophy, and values."
        },
        {
          block: 3,
          blockKa: "მომავალი და ფანტაზია",
          blockEn: "Future & Meaning",
          ka: "კრიზისულ მომენტებშიც კი მაქვს იმედი და რწმენა, რომ მომავალი უკეთესი იქნება.",
          en: "Even in challenging times, I hold a resilient sense of hope and faith in the future."
        }
      ],
      options: [
        { ka: "საერთოდ არ ვეთანხმები", en: "Strongly disagree", score: 1 },
        { ka: "ნაწილობრივ არ ვეთანხმები", en: "Somewhat disagree", score: 2 },
        { ka: "ნეიტრალური / მიჭირს თქმა", en: "Neutral / Unsure", score: 3 },
        { ka: "ნაწილობრივ ვეთანხმები", en: "Somewhat agree", score: 4 },
        { ka: "სრულად ვეთანხმები", en: "Strongly agree", score: 5 }
      ],
      getResults: (score, isEn, scores) => {
        const sc = Array.isArray(scores) && scores.length === 20 ? scores : [3,3,3,3,3, 3,3,3,3,3, 3,3,3,3,3, 3,3,3,3,3];
        const sBody = sc.slice(0, 5).reduce((a, b) => a + b, 0);
        const sWork = sc.slice(5, 10).reduce((a, b) => a + b, 0);
        const sContact = sc.slice(10, 15).reduce((a, b) => a + b, 0);
        const sFuture = sc.slice(15, 20).reduce((a, b) => a + b, 0);
        const total = sBody + sWork + sContact + sFuture || 60;

        let pBody = Math.round((sBody / total) * 100);
        let pWork = Math.round((sWork / total) * 100);
        let pContact = Math.round((sContact / total) * 100);
        let pFuture = 100 - (pBody + pWork + pContact);

        const spheres = [
          { key: 'body', ka: "სხეული და ჯანმრთელობა", en: "Body & Health", pct: pBody, raw: sBody, color: "#10B981", icon: "🌿" },
          { key: 'work', ka: "საქმიანობა და მიღწევა", en: "Work & Achievement", pct: pWork, raw: sWork, color: "#E58348", icon: "💼" },
          { key: 'contact', ka: "კონტაქტები და ურთიერთობები", en: "Contacts & Relationships", pct: pContact, raw: sContact, color: "#3B82F6", icon: "🤝" },
          { key: 'future', ka: "მომავალი და ფანტაზია / საზრისი", en: "Future & Meaning", pct: pFuture, raw: sFuture, color: "#8B5CF6", icon: "🔮" }
        ];

        const sorted = [...spheres].sort((a, b) => b.pct - a.pct);
        const dominant = sorted[0];
        const depleted = sorted[3];

        const title = isEn
          ? `Balance Model Profile (${dominant.en} Dominant)`
          : `ცხოვრების ბალანსის პროფილი (დომინანტი: ${dominant.ka})`;

        const desc = isEn
          ? `According to Nossrat Peseschkian's Positive Psychotherapy Balance Model, optimal mental well-being aims for ~25% harmonious distribution across all 4 spheres. Your assessment indicates your primary energy share (${dominant.pct}%) is invested in "${dominant.en}", while "${depleted.en}" receives the lowest share (${depleted.pct}%), creating an energetic imbalance.`
          : `ნოსრატ პეზეშკიანის პოზიტიური ფსიქოთერაპიის ბალანსის მოდელის მიხედვით, ჯანსაღი მდგომარეობისას სასიცოცხლო ენერგია თანაბრად (~25%) ნაწილდება 4-ვე სფეროზე. თქვენს შემთხვევაში ენერგიის ყველაზე დიდი წილი (${dominant.pct}%) მიმართულია სფეროზე: „${dominant.ka}“, ხოლო ყველაზე ნაკლები (${depleted.pct}%) ეთმობა სფეროს: „${depleted.ka}“, რაც ქმნის ენერგეტიკულ დისბალანსს.`;

        const rec = isEn ? [
          `Dominant Sphere (${dominant.pct}%): "${dominant.en}" is your primary coping and resource area, but over-reliance can drain reserves.`,
          `Depleted Sphere (${depleted.pct}%): "${depleted.en}" requires mindful attention and scheduled time to restore holistic balance.`,
          `Specialist Alignment: Book a consultation with Lali Badridze (President of the Georgian Association for Positive Psychotherapy & WAPP Trainer) to work on harmonizing your 4 life dimensions.`
        ] : [
          `დომინანტური სფერო (${dominant.pct}%): „${dominant.ka}“ — თქვენი მთავარი რესურსია, თუმცა მასზე ზედმეტმა გადართვამ შესაძლოა გადაღლა გამოიწვიოს.`,
          `დეფიციტური სფერო (${depleted.pct}%): „${depleted.ka}“ — საჭიროებს გააზრებულ გააქტიურებასა და დროის გამოყოფას, რათა აღდგეს ფსიქოლოგიური ჰომეოსტაზი.`,
          `რეკომენდებული სპეციალისტი: ლალი ბადრიძე (პოზიტიური ფსიქოთერაპიის WAPP ეროვნული ტრენერი და ბალანსის მოდელის წამყვანი ექსპერტი).`
        ];

        return {
          title,
          desc,
          rec,
          spheres,
          dominant,
          depleted,
          isBalance: true
        };
      }
    }
  };

  const specialistsData = {
    1: {
      name: "ლალი ბადრიძე",
      nameEn: "Lali Badridze",
      role: "დამფუძნებელი, წამყვანი ფსიქოთერაპევტი • WAPP ეროვნული ტრენერი",
      roleEn: "Founder, Lead Psychotherapist • WAPP National Trainer",
      exp: "15+ წლიანი კლინიკური პრაქტიკა",
      img: "team_lali.png",
      bio: "15-წლიანი პრაქტიკული და აკადემიური გამოცდილება კლინიკურ ფსიქოლოგიასა და პოზიტიურ ფსიქოთერაპიაში. ვისბადენის პოზიტიური ფსიქოთერაპიის აკადემიის (WAPP, გერმანია) სერტიფიცირებული მასტერ-თერაპევტი და ოფიციალური წარმომადგენელი საქართველოში. საქართველოს პოზიტიური ფსიქოთერაპიის ასოციაციის პრეზიდენტი.",
      focus: "პოზიტიური ფსიქოთერაპია, ემოციური გადაწვა, შფოთვითი და დეპრესიული მდგომარეობები, პიროვნული და ეგზისტენციალური კრიზისები, ურთიერთობების ჰარმონიზაცია, ბალანსის მოდელი.",
      methods: ["პოზიტიური ფსიქოთერაპია (WAPP)", "კლინიკური ფსიქოლოგია", "ეგზისტენციალური თერაპია", "ტრანსკულტურული მიდგომა", "ბალანსის მოდელი"],
      languages: "ქართული, ინგლისური, რუსული"
    },
    2: {
      name: "დოქტ. ნინო კალანდაძე",
      nameEn: "Dr. Nino Kalandadze",
      role: "კლინიკური ფსიქიატრი, მედიცინის დოქტორი",
      roleEn: "Clinical Psychiatrist, MD",
      exp: "14 წლიანი კლინიკური პრაქტიკა",
      img: "spec_nino.jpg?v=1",
      bio: "თბილისის სახელმწიფო უნივერსიტეტის მედიცინის მიმართულების კურსდამთავრებული. სპეციალიზაცია გავლილი აქვს გერმანიასა და ავსტრიაში. ფლობს საერთაშორისო სერტიფიკატებს ფსიქოფარმაკოთერაპიაში.",
      focus: "დეპრესიული მდგომარეობები, ბიპოლარული აფექტური აშლილობა, პანიკური შეტევები, გენერალიზებული შფოთვა, ძილის ქრონიკული დარღვევები.",
      methods: ["კლინიკური ფსიქიატრია", "ფარმაკოთერაპია", "CBT ელემენტები", "დიაგნოსტიკური შეფასება"],
      languages: "ქართული, ინგლისური, გერმანული"
    },
    3: {
      name: "ლევან მაისურაძე",
      nameEn: "Levan Maisuradze",
      role: "სპორტისა და მაღალი შედეგების ფსიქოლოგი",
      roleEn: "Sports & High Performance Psychologist",
      exp: "18 წლიანი გამოცდილება",
      img: "spec_levan.jpg?v=1",
      bio: "საქართველოს ოლიმპიური და ახალგაზრდული ნაკრებების მენტალური მწვრთნელი. დაეხმარა ასობით სპორტსმენსა და ბიზნეს ლიდერს სტრესის პირობებში უმაღლესი შედეგების მიღწევაში.",
      focus: "საშეჯიბრო შფოთვის მართვა, ფოკუსის კონტროლი, გამარჯვებულის მენტალიტეტი, ტრავმის შემდგომი ფსიქოლოგიური რეაბილიტაცია.",
      methods: ["მენტალური სიმტკიცის ტრენინგი", "ვიზუალიზაცია", "ბიოუკუკავშირი", "სტრესგამძლეობის სტრატეგიები"],
      languages: "ქართული, ინგლისური"
    },
    4: {
      name: "სალომე გელაშვილი",
      nameEn: "Salome Gelashvili",
      role: "ბავშვთა და მოზარდთა კლინიკური ფსიქოლოგი",
      roleEn: "Child & Adolescent Psychologist",
      exp: "8 წლიანი გამოცდილება",
      img: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=700&h=800&q=85",
      bio: "ბავშვთა ფსიქოლოგიის ექსპერტი. სპეციალიზებულია ქცევითი და ემოციური სირთულეების დიაგნოსტიკასა და მშობელთა საკონსულტაციო მხარდაჭერაში.",
      focus: "ADHD, აუტისტური სპექტრის ნიშნები, სასკოლო შფოთვა, ბულინგის შედეგები, მოზარდობის ასაკობრივი კრიზისი.",
      methods: ["არტ-თერაპია", "თამაშით თერაპია", "ქცევითი მოდიფიკაცია", "მშობელთა ქოუჩინგი"],
      languages: "ქართული, ინგლისური"
    },
    5: {
      name: "გიორგი თავაძე",
      nameEn: "Giorgi Tavadze",
      role: "ფსიქოთერაპევტი, EFT & გეშტალტ პრაქტიკოსი",
      roleEn: "Family & Couples Therapist",
      exp: "12 წლიანი გამოცდილება",
      img: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=700&h=800&q=85",
      bio: "სერტიფიცირებული ოჯახისა და წყვილთა თერაპევტი. ეხმარება პარტნიორებს დაკარგული ემოციური კავშირისა და ნდობის აღდგენაში.",
      focus: "წყვილთა კონფლიქტები, ღალატის შემდგომი კრიზისი, განქორწინების პროცესი, კომუნიკაციური ბარიერები.",
      methods: ["ემოციურ-ფოკუსირებული თერაპია (EFT)", "გეშტალტ-თერაპია", "სისტემური ოჯახური მიდგომა"],
      languages: "ქართული, ინგლისური"
    },
    6: {
      name: "თამარ ჩხეიძე",
      nameEn: "Tamar Chkheidze",
      role: "ფსიქიატრი, ფსიქოფარმაკოლოგი",
      roleEn: "Psychiatrist & Psychopharmacologist",
      exp: "16 წლიანი გამოცდილება",
      img: "https://images.unsplash.com/photo-1573497019236-17f8177b81e8?auto=format&fit=crop&w=800&h=900&q=85",
      bio: "საქართველოს ფსიქიატრთა საზოგადოების წევრი. მრავალწლიანი გამოცდილება აქვს რთული და კომბინირებული ფსიქიკური აშლილობების მკურნალობაში.",
      focus: "ობსესიურ-კომპულსიური აშლილობა (OCD), პოსტტრავმული სტრესული აშლილობა (PTSD), ფსიქოზური რეგისტრის მდგომარეობები.",
      methods: ["თანამედროვე ფარმაკოთერაპია", "მულტიდისციპლინური მართვა", "მენტალური ექსპერტიზა"],
      languages: "ქართული, ინგლისური, გერმანული"
    }
  };

  const articlesData = {
    1: {
      title: "როგორ გავუმკლავდეთ პანიკურ შეტევას: 5-4-3-2-1 დამიწების მეთოდი",
      tag: "შფოთვა",
      img: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=900&q=80",
      content: `
        <p>პანიკური შეტევა არის მოულოდნელი, მწვავე შიშისა და ფიზიკური დისკომფორტის ტალღა, რომელსაც თან ახლავს გულისცემის აჩქარება, ჰაერის უკმარისობა და კანკალი. მნიშვნელოვანია გვახსოვდეს: მიუხედავად იმისა, რომ შეგრძნებები უკიდურესად უსიამოვნოა, პანიკური შეტევა სიცოცხლისთვის საშიში არ არის.</p>
        <h4>5-4-3-2-1 დამიწების ტექნიკა (Grounding):</h4>
        <p>ეს მეთოდი გეხმარებათ ტვინის ყურადღების გადატანაში შინაგანი შიშისგან გარე რეალობაზე:</p>
        <ul>
          <li><strong>5 რამ, რასაც ხედავთ:</strong> იპოვეთ თქვენ გარშემო 5 კონკრეტული საგანი (მაგ. ფანჯრის ჩარჩო, საათი, ფეხსაცმელი).</li>
          <li><strong>4 რამ, რასაც ეხებით:</strong> იგრძენით თქვენი ტანსაცმლის ქსოვილი, სკამის საზურგე ან ცივი წყლის ჭიქა.</li>
          <li><strong>3 ბგერა, რაც გესმით:</strong> მანქანების ხმა ქუჩაში, კონდიციონერის გუგუნი, ჩიტების ჭიკჭიკი.</li>
          <li><strong>2 სუნი, რაც გცემთ:</strong> ყავის სუნი ან სუფთა ჰაერი.</li>
          <li><strong>1 გემო, რასაც გრძნობთ:</strong> პიტნის კანფეტი ან ყლუპი ცივი წყალი.</li>
        </ul>
        <p>გახსოვდეთ დიაფრაგმული სუნთქვა: 4 წამი ჩასუნთქვა ცხვირით, 4 წამი შეკავება და 6 წამი მშვიდი ამოსუნთქვა პირით. რეგულარული პრაქტიკით სიმპტომების მართვა ბევრად მარტივი ხდება.</p>
      `
    },
    2: {
      title: "ჯანსაღი ძილის ჰიგიენა: რატომ არის უძილობა მენტალური სტრესის პირველი ნიშანი",
      tag: "ძილი & ენერგია",
      img: "https://images.unsplash.com/photo-1541199249251-f713e6145474?auto=format&fit=crop&w=900&q=80",
      content: `
        <p>ძილი არის ფსიქიკის მთავარი აღმდგენი მექანიზმი. როდესაც განიცდით ქრონიკულ სტრესს ან შფოთვას, ტვინში კორტიზოლისა და ადრენალინის დონე მაღალი რჩება, რაც აფერხებს მელატონინის გამომუშავებას.</p>
        <h4>ოქროს წესები ხარისხიანი ძილისთვის:</h4>
        <ul>
          <li><strong>ციფრული კარანტინი:</strong> დაძინებამდე 60 წუთით ადრე გამორთეთ სმარტფონი, კომპიუტერი და ტელევიზორი.</li>
          <li><strong>მუდმივი გრაფიკი:</strong> დაიძინეთ და გაიღვიძეთ ერთსა და იმავე დროს, შაბათ-კვირის ჩათვლით.</li>
          <li><strong>საძინებლის ტემპერატურა:</strong> იდეალურია 18-20°C გრილი და სრულიად ბნელი გარემო.</li>
          <li><strong>კოფეინის შეზღუდვა:</strong> ნუ მიიღებთ ყავასა და ენერგეტიკულ სასმელებს 14:00 საათის შემდეგ.</li>
        </ul>
        <p>თუ უძილობა 2 კვირაზე მეტხანს გრძელდება, რეკომენდებულია ფსიქიატრთან ან თერაპევტთან კონსულტაცია მიზეზების გამოსავლენად.</p>
      `
    },
    3: {
      title: "ემოციური გადაწვა (Burnout) სამსახურში: სიმპტომები და საზღვრების დაწესება",
      tag: "გადაწვა",
      img: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=900&q=80",
      content: `
        <p>ჯანდაცვის მსოფლიო ორგანიზაციის (WHO) მიერ გადაწვა აღიარებულია როგორც პროფესიული ფენომენი, რომელიც გამოწვეულია სამუშაო ადგილზე ქრონიკული, არამართვადი სტრესით.</p>
        <h4>გადაწვის 3 მთავარი კომპონენტი:</h4>
        <ul>
          <li>ენერგიის ამოწურვისა და ქრონიკული დაღლილობის განცდა.</li>
          <li>სამუშაოსგან მენტალური დისტანცირება, ნეგატივიზმი ან ცინიზმი.</li>
          <li>პროფესიული ეფექტურობის მკვეთრი დაქვეითება.</li>
        </ul>
        <p>გამოსავალი იწყება მკაცრი პირადი საზღვრების დაწესებით: სამუშაო მეილების შემოწმების შეწყვეტა 19:00 საათის შემდეგ, შვებულების რეალურად გამოყენება და „არა“-ს თქმის უნარის განვითარება.</p>
      `
    }
  };

  // ==========================================
  // 2. Interactive Test Engine Logic
  // ==========================================

  let currentTestKey = 'anxiety';
  let currentQuestionIndex = 0;
  let testScores = [];
  let currentLanguage = 'ka';

  const testTabBtns = document.querySelectorAll('.test-tab-btn');
  const testQuestionArea = document.getElementById('testQuestionArea');
  const testResultArea = document.getElementById('testResultArea');
  const testQuestionText = document.getElementById('testQuestionText');
  const testOptionsGrid = document.getElementById('testOptionsGrid');
  const testProgressFill = document.getElementById('testProgressFill');
  const testCategoryBadge = document.getElementById('testCategoryBadge');
  const testQuestionCounter = document.getElementById('testQuestionCounter');
  const restartTestBtn = document.getElementById('restartTestBtn');

  function initTest(key) {
    currentTestKey = key;
    currentQuestionIndex = 0;
    testScores = [];
    testQuestionArea.style.display = 'block';
    testResultArea.style.display = 'none';

    testTabBtns.forEach(btn => {
      btn.classList.toggle('active', btn.dataset.test === key);
    });

    renderCurrentQuestion();
  }

  function renderCurrentQuestion() {
    const test = testData[currentTestKey];
    const totalQuestions = test.questions.length;
    const isEn = currentLanguage === 'en';

    // Update Progress & Badges
    const progressPercent = ((currentQuestionIndex + 1) / totalQuestions) * 100;
    testProgressFill.style.width = `${progressPercent}%`;

    const qData = test.questions[currentQuestionIndex];

    if (currentTestKey === 'balance' && qData.blockKa) {
      testCategoryBadge.textContent = isEn 
        ? `${qData.blockEn} (${(currentQuestionIndex % 5) + 1}/5)`
        : `${qData.blockKa} (${(currentQuestionIndex % 5) + 1}/5)`;
      const timeEst = document.querySelector('.test-time-est');
      if (timeEst) timeEst.textContent = isEn ? "⏱ ~4-5 mins" : "⏱ დაახლოებით 4-5 წუთი";
    } else {
      testCategoryBadge.textContent = isEn ? test.nameEn : test.name;
      const timeEst = document.querySelector('.test-time-est');
      if (timeEst) timeEst.textContent = isEn ? "⏱ ~2 mins" : "⏱ დაახლოებით 2 წუთი";
    }

    testQuestionCounter.textContent = isEn 
      ? `Question ${currentQuestionIndex + 1} / ${totalQuestions}` 
      : `კითხვა ${currentQuestionIndex + 1} / ${totalQuestions}`;

    // Question Prompt
    testQuestionText.textContent = isEn ? qData.en : qData.ka;

    // Render Options
    testOptionsGrid.innerHTML = '';
    test.options.forEach(opt => {
      const btn = document.createElement('button');
      btn.className = 'test-option-btn';
      btn.innerHTML = `
        <span>${isEn ? opt.en : opt.ka}</span>
        <span class="option-score-pill">+${opt.score}</span>
      `;
      btn.addEventListener('click', () => {
        handleAnswerSelected(opt.score);
      });
      testOptionsGrid.appendChild(btn);
    });
  }

  function handleAnswerSelected(score) {
    testScores.push(score);
    const test = testData[currentTestKey];

    if (currentQuestionIndex < test.questions.length - 1) {
      currentQuestionIndex++;
      renderCurrentQuestion();
    } else {
      showTestResults();
    }
  }

  function showTestResults() {
    const test = testData[currentTestKey];
    const totalScore = testScores.reduce((a, b) => a + b, 0);
    const maxScore = test.questions.length * (currentTestKey === 'balance' ? 5 : 3);
    const isEn = currentLanguage === 'en';
    const resultObj = test.getResults(totalScore, isEn, testScores);

    testQuestionArea.style.display = 'none';
    testResultArea.style.display = 'block';

    const visualArea = document.getElementById('balanceVisualArea');

    if (currentTestKey === 'balance' && resultObj.spheres) {
      document.getElementById('resultScoreNum').textContent = '100';
      const maxScoreEl = document.getElementById('resultScoreMax') || document.querySelector('.result-score-max');
      if (maxScoreEl) maxScoreEl.textContent = '%';
      const scoreLabel = document.getElementById('resultScoreLabel');
      if (scoreLabel) scoreLabel.textContent = isEn ? "Balance" : "ბალანსი";

      if (visualArea) {
        visualArea.style.display = 'block';
        visualArea.innerHTML = `
          <div class="balance-bars-card">
            <h4 class="balance-bars-heading">${isEn ? "Energy Distribution Across 4 Dimensions (Target: ~25% each):" : "ენერგიის განაწილება 4 სფეროში (სასურველია ~25% თითოეულში):"}</h4>
            <div class="balance-bars-list">
              ${resultObj.spheres.map(s => `
                <div class="balance-bar-row">
                  <div class="balance-bar-header">
                    <span class="balance-bar-name">
                      <span class="balance-bar-icon">${s.icon}</span> ${isEn ? s.en : s.ka}
                    </span>
                    <span class="balance-bar-pct" style="color: ${s.color}; font-weight: 700;">${s.pct}%</span>
                  </div>
                  <div class="balance-bar-track">
                    <div class="balance-bar-fill fill-${s.key}" style="width: ${Math.max(s.pct, 4)}%; background: ${s.color};"></div>
                  </div>
                </div>
              `).join('')}
            </div>
            <div class="balance-summary-chips">
              <span class="balance-chip chip-dominant">
                <strong>${isEn ? "Dominant Sphere:" : "დომინანტი:"}</strong> ${isEn ? resultObj.dominant.en : resultObj.dominant.ka} (${resultObj.dominant.pct}%)
              </span>
              <span class="balance-chip chip-depleted">
                <strong>${isEn ? "Depleted Sphere:" : "დეფიციტი:"}</strong> ${isEn ? resultObj.depleted.en : resultObj.depleted.ka} (${resultObj.depleted.pct}%)
              </span>
            </div>
          </div>
        `;
      }

      // Pre-select Lali Badridze for Balance Model consultation
      const bookBtn = testResultArea.querySelector('.open-booking-btn');
      if (bookBtn) {
        bookBtn.onclick = (e) => {
          e.preventDefault();
          openBookingModalWith('ლალი ბადრიძე', 'ინდივიდუალური ფსიქოთერაპია');
        };
      }
    } else {
      if (visualArea) visualArea.style.display = 'none';
      document.getElementById('resultScoreNum').textContent = totalScore;
      const maxScoreEl = document.getElementById('resultScoreMax') || document.querySelector('.result-score-max');
      if (maxScoreEl) maxScoreEl.textContent = maxScore;
      const scoreLabel = document.getElementById('resultScoreLabel');
      if (scoreLabel) scoreLabel.textContent = isEn ? "Score" : "ქულა";

      const bookBtn = testResultArea.querySelector('.open-booking-btn');
      if (bookBtn) {
        bookBtn.onclick = null;
      }
    }

    document.getElementById('resultTitle').textContent = resultObj.title;
    document.getElementById('resultDesc').textContent = resultObj.desc;

    const recBox = document.querySelector('.result-recommendation-box ul');
    recBox.innerHTML = '';
    resultObj.rec.forEach(item => {
      const li = document.createElement('li');
      li.textContent = item;
      recBox.appendChild(li);
    });

    showToast(isEn ? "Test completed! Review your recommendations." : "ტესტი დასრულდა! იხილეთ თქვენი რეკომენდაციები.");
  }

  testTabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      initTest(btn.dataset.test);
    });
  });

  if (restartTestBtn) {
    restartTestBtn.addEventListener('click', () => {
      initTest(currentTestKey);
    });
  }

  // Initialize Default Test
  initTest('anxiety');

  // ==========================================
  // 3. Specialist Filter Functionality
  // ==========================================

  const filterPills = document.querySelectorAll('.filter-pill');
  const specialistCards = document.querySelectorAll('.specialist-card');

  filterPills.forEach(pill => {
    pill.addEventListener('click', () => {
      filterPills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');

      const filterValue = pill.dataset.filter;

      specialistCards.forEach(card => {
        if (filterValue === 'all') {
          card.style.display = 'flex';
        } else {
          const category = card.dataset.category;
          card.style.display = (category === filterValue) ? 'flex' : 'none';
        }
      });
    });
  });

  // ==========================================
  // 4. Specialist Modal Profile Viewer
  // ==========================================

  const specialistModal = document.getElementById('specialistModal');
  const specialistModalBody = document.getElementById('specialistModalBody');
  const closeSpecialistModal = document.getElementById('closeSpecialistModal');
  const viewProfileBtns = document.querySelectorAll('.view-profile-btn');

  viewProfileBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const specId = btn.dataset.id;
      const spec = specialistsData[specId];
      if (!spec) return;

      const isEn = currentLanguage === 'en';

      specialistModalBody.innerHTML = `
        <div class="spec-modal-header">
          <img src="${spec.img}" alt="${spec.name}" class="spec-modal-avatar">
          <div class="spec-modal-title">
            <h3>${isEn ? spec.nameEn : spec.name}</h3>
            <div class="modal-role">${isEn ? spec.roleEn : spec.role}</div>
            <div style="font-size: 0.85rem; color: var(--text-muted); margin-top: 0.4rem;">
              ⏱ ${spec.exp} • 🌐 ${spec.languages}
            </div>
          </div>
        </div>
        <div class="spec-modal-body">
          <h4>${isEn ? "About Specialist" : "სპეციალისტის შესახებ"}</h4>
          <p>${spec.bio}</p>
          <h4>${isEn ? "Clinical Focus & Issues" : "სამუშაო მიმართულებები და სიმპტომები"}</h4>
          <p>${spec.focus}</p>
          <h4>${isEn ? "Methods & Modalities" : "მეთოდები და მიდგომები"}</h4>
          <div class="spec-tags-cloud">
            ${spec.methods.map(m => `<span class="spec-pill">${m}</span>`).join('')}
          </div>
          <div style="margin-top: 2rem;">
            <button class="btn btn-primary btn-block open-booking-btn" data-specialist="${spec.name}">
              ${isEn ? "Book Appointment with this Specialist" : "ამ სპეციალისტთან ვიზიტის დაჯავშნა"}
            </button>
          </div>
        </div>
      `;

      specialistModal.classList.add('active');
      specialistModal.setAttribute('aria-hidden', 'false');

      // Bind dynamic booking button in modal
      specialistModalBody.querySelector('.open-booking-btn').addEventListener('click', (e) => {
        specialistModal.classList.remove('active');
        openBookingModalWith(spec.name);
      });
    });
  });

  if (closeSpecialistModal) {
    closeSpecialistModal.addEventListener('click', () => {
      specialistModal.classList.remove('active');
      specialistModal.setAttribute('aria-hidden', 'true');
    });
  }

  // ==========================================
  // 5. Article Reader Modal
  // ==========================================

  const articleModal = document.getElementById('articleModal');
  const articleModalBody = document.getElementById('articleModalBody');
  const closeArticleModal = document.getElementById('closeArticleModal');
  const readMoreBtns = document.querySelectorAll('.read-more-btn');

  readMoreBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const artId = btn.dataset.article;
      const art = articlesData[artId];
      if (!art) return;

      articleModalBody.innerHTML = `
        <img src="${art.img}" alt="${art.title}" class="article-modal-img">
        <span class="blog-tag">${art.tag}</span>
        <h2 class="article-modal-title">${art.title}</h2>
        <div class="article-modal-content">
          ${art.content}
        </div>
        <div style="margin-top: 2rem; border-top: 1px solid var(--border-light); padding-top: 1.5rem;">
          <button class="btn btn-primary open-booking-btn">
            გაიარეთ კონსულტაცია სპეციალისტთან
          </button>
        </div>
      `;

      articleModal.classList.add('active');
      articleModal.setAttribute('aria-hidden', 'false');

      articleModalBody.querySelector('.open-booking-btn').addEventListener('click', () => {
        articleModal.classList.remove('active');
        openBookingModalWith();
      });
    });
  });

  if (closeArticleModal) {
    closeArticleModal.addEventListener('click', () => {
      articleModal.classList.remove('active');
      articleModal.setAttribute('aria-hidden', 'true');
    });
  }

  // ==========================================
  // 6. Interactive Multi-Step Booking Wizard
  // ==========================================

  const bookingModal = document.getElementById('bookingModal');
  const closeBookingModal = document.getElementById('closeBookingModal');
  const openBookingBtns = document.querySelectorAll('.open-booking-btn');

  const step1 = document.getElementById('wizardStep1');
  const step2 = document.getElementById('wizardStep2');
  const step3 = document.getElementById('wizardStep3');
  const stepSuccess = document.getElementById('wizardStepSuccess');

  const stepBadges = document.querySelectorAll('.modal-steps-indicator .step-badge');

  const wizardNext1 = document.getElementById('wizardNext1');
  const wizardNext2 = document.getElementById('wizardNext2');
  const wizardBack1 = document.getElementById('wizardBack1');
  const wizardBack2 = document.getElementById('wizardBack2');
  const submitBookingBtn = document.getElementById('submitBookingBtn');
  const finishBookingBtn = document.getElementById('finishBookingBtn');

  const modalServiceSelect = document.getElementById('modalServiceSelect');
  const bookDateInput = document.getElementById('bookDateInput');

  // Set default minimum date to tomorrow
  if (bookDateInput) {
    const today = new Date();
    today.setDate(today.getDate() + 1);
    bookDateInput.min = today.toISOString().split('T')[0];
    bookDateInput.value = today.toISOString().split('T')[0];
  }

  function setWizardStep(stepNum) {
    [step1, step2, step3, stepSuccess].forEach(s => s.style.display = 'none');
    stepBadges.forEach(b => {
      const bStep = parseInt(b.dataset.step, 10);
      b.classList.toggle('active', bStep === stepNum);
      b.classList.toggle('completed', bStep < stepNum);
    });

    if (stepNum === 1) step1.style.display = 'block';
    if (stepNum === 2) step2.style.display = 'block';
    if (stepNum === 3) step3.style.display = 'block';
    if (stepNum === 4) stepSuccess.style.display = 'block';
  }

  function openBookingModalWith(specialistName = null, serviceName = null) {
    setWizardStep(1);
    if (serviceName && modalServiceSelect) {
      for (let i = 0; i < modalServiceSelect.options.length; i++) {
        if (modalServiceSelect.options[i].value.includes(serviceName)) {
          modalServiceSelect.selectedIndex = i;
          break;
        }
      }
    }
    if (specialistName) {
      const radio = document.querySelector(`input[name="selectedSpecialist"][value="${specialistName}"]`);
      if (radio) {
        radio.checked = true;
        document.querySelectorAll('.spec-select-card').forEach(c => c.classList.remove('selected'));
        radio.closest('.spec-select-card').classList.add('selected');
      }
    }
    bookingModal.classList.add('active');
    bookingModal.setAttribute('aria-hidden', 'false');
  }

  openBookingBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const spec = btn.dataset.specialist || null;
      const srv = btn.dataset.service || null;
      openBookingModalWith(spec, srv);
    });
  });

  if (closeBookingModal) {
    closeBookingModal.addEventListener('click', () => {
      bookingModal.classList.remove('active');
      bookingModal.setAttribute('aria-hidden', 'true');
    });
  }

  // Format Selection
  document.querySelectorAll('.format-card input').forEach(input => {
    input.addEventListener('change', () => {
      document.querySelectorAll('.format-card').forEach(c => c.classList.remove('selected'));
      input.closest('.format-card').classList.add('selected');
    });
  });

  // Specialist Selection Cards
  document.querySelectorAll('.spec-select-card input').forEach(input => {
    input.addEventListener('change', () => {
      document.querySelectorAll('.spec-select-card').forEach(c => c.classList.remove('selected'));
      input.closest('.spec-select-card').classList.add('selected');
    });
  });

  // Wizard Navigation
  if (wizardNext1) {
    wizardNext1.addEventListener('click', () => setWizardStep(2));
  }
  if (wizardBack1) {
    wizardBack1.addEventListener('click', () => setWizardStep(1));
  }
  if (wizardNext2) {
    wizardNext2.addEventListener('click', () => setWizardStep(3));
  }
  if (wizardBack2) {
    wizardBack2.addEventListener('click', () => setWizardStep(2));
  }

  // Submit Booking
  if (submitBookingBtn) {
    submitBookingBtn.addEventListener('click', () => {
      const fullName = document.getElementById('bookFullName').value.trim();
      const phone = document.getElementById('bookPhone').value.trim();
      const date = document.getElementById('bookDateInput').value;
      const time = document.getElementById('bookTimeSelect').value;
      const service = modalServiceSelect.value;
      const specRadio = document.querySelector('input[name="selectedSpecialist"]:checked');
      const specialist = specRadio ? specRadio.value : "უახლოესი თავისუფალი";
      const formatRadio = document.querySelector('input[name="visitFormat"]:checked');
      const format = formatRadio && formatRadio.value === 'online' ? "💻 ონლაინ ვიზიტი" : "🏥 კლინიკაში ვიზიტი";

      if (!fullName || !phone) {
        showToast("გთხოვთ შეავსოთ სახელი და ტელეფონის ნომერი!", true);
        return;
      }

      const receiptBox = document.getElementById('bookingReceiptBox');
      receiptBox.innerHTML = `
        <div class="receipt-row"><span>პაციენტი:</span> <span>${fullName}</span></div>
        <div class="receipt-row"><span>ტელეფონი:</span> <span>${phone}</span></div>
        <div class="receipt-row"><span>სერვისი:</span> <span>${service}</span></div>
        <div class="receipt-row"><span>სპეციალისტი:</span> <span>${specialist}</span></div>
        <div class="receipt-row"><span>ფორმატი:</span> <span>${format}</span></div>
        <div class="receipt-row"><span>თარიღი & დრო:</span> <span>${date} | ${time}</span></div>
      `;

      setWizardStep(4);
      showToast("ვიზიტი წარმატებით დაიჯავშნა!");
    });
  }

  if (finishBookingBtn) {
    finishBookingBtn.addEventListener('click', () => {
      bookingModal.classList.remove('active');
      bookingModal.setAttribute('aria-hidden', 'true');
    });
  }

  // Close modals when clicking backdrop
  [bookingModal, specialistModal, articleModal].forEach(modal => {
    if (modal) {
      modal.addEventListener('click', (e) => {
        if (e.target === modal) {
          modal.classList.remove('active');
          modal.setAttribute('aria-hidden', 'true');
        }
      });
    }
  });

  // ==========================================
  // 7. FAQ Accordion
  // ==========================================

  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const questionBtn = item.querySelector('.faq-question');
    questionBtn.addEventListener('click', () => {
      const isActive = item.classList.contains('active');
      faqItems.forEach(i => i.classList.remove('active'));
      if (!isActive) {
        item.classList.add('active');
      }
    });
  });

  // Open first FAQ by default
  if (faqItems.length > 0) {
    faqItems[0].classList.add('active');
  }

  // ==========================================
  // 8. Contact Form Handling
  // ==========================================

  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('contactName').value.trim();
      const phone = document.getElementById('contactPhone').value.trim();

      if (!name || !phone) {
        showToast("გთხოვთ მიუთითოთ სახელი და ნომერი", true);
        return;
      }

      showToast("გმადლობთ! შეტყობინება მიღებულია. დაგიკავშირდებით 15 წუთში.");
      contactForm.reset();
    });
  }

  // ==========================================
  // 9. Mobile Menu Drawer
  // ==========================================

  const menuToggle = document.getElementById('menuToggle');
  const mainNav = document.getElementById('mainNav');
  const mobileDrawerBackdrop = document.getElementById('mobileDrawerBackdrop');

  function toggleMobileMenu() {
    const isOpen = mainNav.classList.contains('open');
    mainNav.classList.toggle('open', !isOpen);
    mobileDrawerBackdrop.classList.toggle('active', !isOpen);
  }

  if (menuToggle) {
    menuToggle.addEventListener('click', toggleMobileMenu);
  }
  if (mobileDrawerBackdrop) {
    mobileDrawerBackdrop.addEventListener('click', toggleMobileMenu);
  }

  // Close mobile drawer on navigation click
  document.querySelectorAll('.main-nav .nav-link').forEach(link => {
    link.addEventListener('click', () => {
      mainNav.classList.remove('open');
      mobileDrawerBackdrop.classList.remove('active');
    });
  });

  // Header shadow on scroll
  const header = document.getElementById('header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 20) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });

  // ==========================================
  // 10. Language Switcher (GE / EN)
  // ==========================================

  const langSwitchBtn = document.getElementById('langSwitchBtn');

  const translations = {
    "ka": {
        "crisis_msg": "თუ გჭირდებათ გადაუდებელი დახმარება: კრიზისული ცხელი ხაზი: <strong>112</strong> ან <strong>116 006</strong>",
        "tagline": "მენტალური ცენტრი",
        "nav_services": "სერვისები",
        "nav_specialists": "სპეციალისტები",
        "nav_tests": "ტესტები <span class=\"badge-mini\">Quiz</span>",
        "nav_about": "ჩვენს შესახებ",
        "nav_pricing": "ფასები",
        "nav_blog": "ბლოგი",
        "nav_contact": "კონტაქტი",
        "btn_book_now": "დაჯავშნე კონსულტაცია",
        "btn_book": "დაჯავშნა",
        "hero_badge": "ლიცენზირებული კლინიკა & 100% კონფიდენციალურობა",
        "hero_title": "შენი შინაგანი მშვიდობა და <span class=\"gradient-text\">მენტალური სიმტკიცე</span>",
        "hero_desc": "პროფესიონალური ფსიქოლოგიური, ფსიქოთერაპიული და ფსიქიატრიული მხარდაჭერა. მტკიცებულებებზე დაფუძნებული მეთოდები, უსაფრთხო გარემო და ინდივიდუალურად თქვენზე მორგებული თერაპია.",
        "btn_take_test": "გაიარე თვითშეფასების ტესტი",
        "metric_experts": "წამყვანი სპეციალისტი",
        "metric_sessions": "ჩატარებული სესია",
        "metric_privacy": "კონფიდენციალურობა",
        "now_accepting": "ვიზიტები ხელმისაწვდომია: ონლაინ / კლინიკაში",
        "empathic_care": "ემპათიური მიდგომა",
        "evidence_based": "მტკიცებითი მედიცინა",
        "quick_booking": "მარტივი დაჯავშნა",
        "same_day_slot": "თავისუფალი დროები დღესვე",
        "certified_team": "სერტიფიცირებული გუნდი მზადაა დასახმარებლად",
        "feat_online_title": "ონლაინ კონსულტაციები",
        "feat_online_desc": "თერაპია სახლიდან გაუსვლელად მსოფლიოს ნებისმიერი წერტილიდან",
        "feat_privacy_title": "100% კონფიდენციალურობა",
        "feat_privacy_desc": "პაციენტის ეთიკური კოდექსისა და პირადი მონაცემების უმკაცრესი დაცვა",
        "feat_methods_title": "მტკიცებითი მიდგომები",
        "feat_methods_desc": "CBT, გეშტალტი, ემოციურ-ფოკუსირებული და კლინიკური ფსიქიატრია",
        "feat_support_title": "მოქნილი გრაფიკი",
        "feat_support_desc": "ვიზიტები ყოველდღე 10:00-დან 20:00-მდე, შაბათ-კვირის ჩათვლით",
        "services_tag": "ჩვენი მიმართულებები",
        "services_title": "მენტალური და ფსიქოლოგიური სერვისები",
        "services_subtitle": "მტკიცებულებებზე დაფუძნებული სრული მენტალური სპექტრი თქვენი კეთილდღეობისთვის",
        "pill_popular": "პოპულარული",
        "srv_psychotherapy_title": "ინდივიდუალური ფსიქოთერაპია",
        "srv_psychotherapy_desc": "პირადი სესიები ლიცენზირებულ თერაპევტთან. შფოთვის, პანიკური შეტევების, დეპრესიის, ტრავმის (PTSD), თვითშეფასების და ემოციური გადაღლის დაძლევა.",
        "srv_point_cbt": "კოგნიტურ-ბიჰევიორული თერაპია (CBT)",
        "srv_point_gestalt": "გეშტალტ-თერაპია და ეგზისტენციალური მიდგომა",
        "srv_point_dur50": "ხანგრძლივობა: 50 წუთი (ონლაინ / კლინიკაში)",
        "srv_price_1": "80 ₾ - 140 ₾ / სესია",
        "btn_book_short": "დაჯავშნა",
        "pill_medical": "კლინიკური",
        "srv_psychiatry_title": "კლინიკური ფსიქიატრია",
        "srv_psychiatry_desc": "ფსიქიკური ჯანმრთელობის მენტალური შეფასება, ზუსტი დიაგნოსტიკა და თანამედროვე, უსაფრთხო ფარმაკოთერაპიის შერჩევა-მართვა გამოცდილი ფსიქიატრების მიერ.",
        "srv_point_diag": "განწყობის, ძილისა და ყურადღების აშლილობები",
        "srv_point_medmgmt": "მედიკამენტური მონიტორინგი და კორექცია",
        "srv_point_care": "მკურნალობის უსაფრთხო გეგმა",
        "srv_price_2": "100 ₾ - 160 ₾ / ვიზიტი",
        "pill_relation": "ურთიერთობები",
        "srv_couples_title": "წყვილებისა და ოჯახის თერაპია",
        "srv_couples_desc": "ურთიერთობებში კრიზისების გადალახვა, კონფლიქტების კონსტრუქციული მართვა, ემოციური სიახლოვისა და ჯანსაღი კომუნიკაციის აღდგენა.",
        "srv_point_comm": "კომუნიკაციის ბარიერების დაძლევა",
        "srv_point_eft": "ემოციურ-ფოკუსირებული თერაპია (EFT)",
        "srv_point_dur80": "ხანგრძლივობა: 80 წუთი (წყვილისთვის)",
        "srv_price_3": "130 ₾ - 190 ₾ / სესია",
        "pill_sport": "სპეციალური პროგრამა",
        "srv_sports_title": "სპორტის ფსიქოლოგია",
        "srv_sports_desc": "სპორტსმენებისა და მაღალი შედეგების მაძიებელთათვის: მენტალური მდგრადობა, კონცენტრაციის უნარი, საშეჯიბრო სტრესის მართვა და გამარჯვებულის მენტალიტეტი.",
        "srv_point_mental_grit": "მენტალური სიმტკიცე და ფოკუსი",
        "srv_point_precomp": "შეჯიბრებამდე მზადყოფნის პროგრამა",
        "srv_point_rehab": "ტრავმის შემდგომი ფსიქოლოგიური აღდგენა",
        "srv_price_4": "90 ₾ - 150 ₾ / სესია",
        "pill_testing": "დიაგნოსტიკა",
        "srv_testing_title": "ფსიქოლოგიური ტესტირება და შეფასება",
        "srv_testing_desc": "კოგნიტური და პიროვნული პროფილირება საერთაშორისო ვალიდირებული ტესტებით (MMPI, Wechsler, ADHD სკრინინგი). ოფიციალური დასკვნა და რეკომენდაციები.",
        "srv_point_tests": "ADHD, აუტისტური სპექტრის და კოგნიტური შეფასება",
        "srv_point_report": "სრული წერილობითი დასკვნა",
        "srv_point_feed": "დეტალური ფიდბექ-სესია სპეციალისტთან",
        "srv_price_5": "150 ₾ - 280 ₾ / ტესტ-პაკეტი",
        "pill_kids": "ბავშვები & მოზარდები",
        "srv_child_title": "ბავშვთა და მოზარდთა ფსიქოლოგია",
        "srv_child_desc": "ქცევითი სირთულეები, სასკოლო ადაპტაცია, მოზარდობის კრიზისი, ემოციური რეგულაცია და მშობელთა საკონსულტაციო მხარდაჭერა.",
        "srv_point_art": "არტ-თერაპია და თამაშით თერაპია",
        "srv_point_teens": "მოზარდებთან ნდობითი მუშაობა",
        "srv_point_parenting": "მშობელთა კონსულტაცია",
        "srv_price_6": "80 ₾ - 130 ₾ / სესია",
        "tests_tag": "ინტერაქტიული სკრინინგი",
        "tests_title": "გაიარე მენტალური თვითშეფასების ტესტი",
        "tests_subtitle": "ანონიმური, მეცნიერულ მეთოდებზე დაფუძნებული მოკლე ტესტები თქვენი ემოციური მდგომარეობის შესაფასებლად (2-3 წუთი)",
        "test_tab_anxiety": "შფოთვა (GAD-7)",
        "test_tab_depression": "დეპრესია (PHQ-9)",
        "test_tab_burnout": "გადაწვა (Burnout)",
        "test_tab_balance": "ბალანსის მოდელი",
        "test_duration": "⏱ დაახლოებით 2 წუთი",
        "test_subtext": "აირჩიეთ ერთი პასუხი, რომელიც ყველაზე უკეთ აღწერს თქვენს მდგომარეობას:",
        "score_label": "ქულა",
        "result_rec_title": "ჩვენი რეკომენდაცია თქვენთვის:",
        "result_rec_1": "სასარგებლო იქნება 1 ინდივიდუალური სესია CBT მიმართულების სპეციალისტთან",
        "result_rec_2": "სუნთქვითი ვარჯიშები და ძილის ჰიგიენის მოწესრიგება",
        "btn_book_specialist": "კონსულტაციის დაჯავშნა",
        "btn_restart_test": "ტესტის თავიდან გავლა",
        "test_disclaimer": "* ყურადღება: ონლაინ ტესტი ატარებს მხოლოდ საინფორმაციო-სკრინინგულ ხასიათს და არ წარმოადგენს კლინიკურ დიაგნოზს.",
        "team_tag": "ჩვენი გუნდი",
        "team_title": "გაიცანით MentalMedi-ს სპეციალისტები",
        "team_subtitle": "ლიცენზირებული ექიმები, ფსიქიატრები და ფსიქოთერაპევტები მრავალწლიანი კლინიკური გამოცდილებით",
        "filter_all": "ყველა სპეციალისტი",
        "filter_psychiatry": "ფსიქიატრია",
        "filter_therapy": "ფსიქოთერაპია (CBT/გეშტალტი)",
        "filter_sports": "სპორტის ფსიქოლოგია",
        "filter_child": "ბავშვები & მოზარდები",
        "exp_label": "უსაფრთხო & კონფიდენციალური სივრცე",
        "about_tag": "ჩვენს შესახებ",
        "about_title": "MentalMedi — მენტალური კეთილდღეობის ახალი სტანდარტი",
        "about_lead": "ჩვენ შევქმენით სივრცე, სადაც ფსიქიკური ჯანმრთელობა სტიგმის გარეშე აღიქმება. აქ თითოეულ ადამიანს ხვდება ღრმა ემპათია, პროფესიონალიზმი და თანამედროვე ევროპული სტანდარტების მომსახურება.",
        "val_1_title": "მკაცრი კონფიდენციალურობა",
        "mob_nav_home": "მთავარი",
        "mob_nav_services": "სერვისები",
        "mob_nav_bot": "ბოტი",
        "mob_nav_team": "გუნდი",
        "mob_nav_call": "დარეკვა",
        "val_1_desc": "თქვენი მონაცემები და სესიის შინაარსი დაცულია საერთაშორისო მენტალური და პროფესიული ეთიკის სტანდარტებით.",
        "val_2_title": "მტკიცებითი მედიცინა (Evidence-Based)",
        "val_2_desc": "ვიყენებთ მხოლოდ მეცნიერულად დადასტურებულ თერაპიულ მეთოდებსა და უახლეს პროტოკოლებს.",
        "val_3_title": "მულტიდისციპლინური მიდგომა",
        "val_3_desc": "საჭიროების შემთხვევაში ფსიქოთერაპევტი და ფსიქიატრი ერთობლივად მართავენ პაციენტის გეგმას.",
        "pricing_tag": "გამჭვირვალე ფასები",
        "pricing_title": "ტარიფები და მომსახურების პაკეტები",
        "pricing_subtitle": "არანაირი ფარული გადასახადი. შესაძლებელია კერძო დაზღვევის ანაზღაურებით სარგებლობა",
        "plan_1_label": "საბაზისო",
        "plan_1_name": "პირველადი კონსულტაცია",
        "plan_1_desc": "მდგომარეობის შეფასება, პრობლემის იდენტიფიცირება და თერაპიული გეგმის შედგენა",
        "btn_choose_plan": "დაჯავშნა",
        "most_popular": "რეკომენდებული",
        "plan_2_label": "კურსი",
        "plan_2_name": "თერაპიული პაკეტი (5 სესია)",
        "plan_2_desc": "შედეგზე ორიენტირებული რეგულარული ფსიქოთერაპიული კურსი ფასდაკლებით",
        "plan_3_label": "სპეციალური",
        "plan_3_name": "ფსიქიატრიული შეფასება",
        "plan_3_desc": "კლინიკური ფსიქიატრის სრული გამოკვლევა და რეცეპტების გაცემა",
        "ins_title": "თანამშრომლობა სადაზღვევო კომპანიებთან",
        "ins_desc": "ჩვენი ექიმები გასცემენ ფორმა 100-ს და ყველა საჭირო დოკუმენტაციას კერძო სადაზღვევო კომპანიებში თანხის ასანაზღაურებლად (არდი, ჯიპიაი, იმედი L, ალდაგი, თიბისი დაზღვევა და სხვა).",
        "blog_tag": "ფსიქოგანათლება & სიახლეები",
        "blog_title": "სასარგებლო სტატიები და რჩევები",
        "blog_subtitle": "ჩვენი კლინიკის ექსპერტები რეგულარულად უზიარებენ ცოდნასა და პრაქტიკულ რჩევებს საზოგადოებას",
        "reviews_tag": "გამოხმაურებები",
        "reviews_title": "რას ამბობენ ჩვენი პაციენტები",
        "reviews_subtitle": "კონფიდენციალურობის სრული დაცვით გაზიარებული რეალური ისტორიები",
        "faq_tag": "კითხვა-პასუხი",
        "faq_title": "ხშირად დასმული კითხვები",
        "faq_subtitle": "ყველაფერი, რაც უნდა იცოდეთ ვიზიტამდე",
        "contact_tag": "დაგვიკავშირდით",
        "contact_title": "ჩვენ მზად ვართ თქვენს დასახმარებლად",
        "contact_desc": "მობრძანდით ჩვენს მყუდრო კლინიკაში ან დაგვიკავშირდით ნებისმიერი შეკითხვის შემთხვევაში.",
        "lbl_address": "მისამართი",
        "lbl_phone": "ტელეფონი / ცხელი ხაზი",
        "lbl_email": "ელ-ფოსტა",
        "lbl_hours": "სამუშაო საათები",
        "send_msg_title": "მოგვწერეთ შეტყობინება",
        "send_msg_sub": "ჩვენი ადმინისტრატორი დაგიკავშირდებათ 15 წუთში",
        "field_name": "სახელი და გვარი *",
        "field_phone": "ტელეფონის ნომერი *",
        "field_email": "ელ-ფოსტა",
        "field_topic": "ინტერესის სფერო",
        "field_msg": "შეტყობინება / კითხვა",
        "btn_send_msg": "შეტყობინების გაგზავნა",
        "modal_book_title": "ვიზიტის ონლაინ დაჯავშნა",
        "modal_book_subtitle": "შეარჩიეთ თქვენთვის სასურველი სპეციალისტი და დრო",
        "wiz_step1_head": "აირჩიეთ ვიზიტის ფორმატი და მომსახურება:",
        "lbl_select_service": "სერვისის ტიპი:",
        "wiz_step2_head": "აირჩიეთ სასურველი სპეციალისტი:",
        "wiz_step3_head": "შეარჩიეთ დრო და შეავსეთ საკონტაქტო მონაცემები:",
        "booking_success_title": "ვიზიტი წარმატებით დაიჯავშნა!",
        "footer_desc": "თანამედროვე მენტალური ჯანმრთელობის, ფსიქოთერაპიისა და კლინიკური ფსიქიატრიის ცენტრი. უსაფრთხო გარემო, მზრუნველი სპეციალისტები და მტკიცებულებებზე დაფუძნებული მედიცინა.",
        "footer_services": "სერვისები",
        "footer_nav": "ნავიგაცია",
        "footer_contact": "კონტაქტი & მისამართი",
        "bot_status": "ონლაინ • მენტალური მხარდაჭერა"
    },
    "en": {
        "crisis_msg": "If you need immediate emergency help: Crisis Hotline: <strong>112</strong> or <strong>116 006</strong>",
        "tagline": "Mental Health Center",
        "nav_services": "Services",
        "nav_specialists": "Specialists",
        "nav_tests": "Tests <span class=\"badge-mini\">Quiz</span>",
        "nav_about": "About Us",
        "nav_pricing": "Pricing",
        "nav_blog": "Blog",
        "nav_contact": "Contact",
        "btn_book_now": "Book Consultation",
        "btn_book": "Book Visit",
        "hero_badge": "Licensed Clinic & 100% Confidentiality",
        "hero_title": "Your Inner Peace & <span class=\"gradient-text\">Mental Resilience</span>",
        "hero_desc": "Professional psychological, psychotherapeutic and psychiatric support. Evidence-based methods, safe environment, and personalized therapy.",
        "btn_take_test": "Take Self-Assessment Test",
        "metric_experts": "Leading Specialists",
        "metric_sessions": "Sessions Conducted",
        "metric_privacy": "Confidentiality",
        "now_accepting": "Appointments available: Online / In-Clinic",
        "empathic_care": "Compassionate Care",
        "evidence_based": "Evidence-Based",
        "quick_booking": "Easy Booking",
        "same_day_slot": "Available slots today",
        "certified_team": "Certified team ready to help",
        "feat_online_title": "Online Consultations",
        "feat_online_desc": "Therapy from the comfort of home, anywhere in the world",
        "feat_privacy_title": "100% Confidentiality",
        "feat_privacy_desc": "Strict adherence to medical ethics and data privacy",
        "feat_methods_title": "Evidence-Based Care",
        "feat_methods_desc": "CBT, Gestalt, Emotion-Focused & Clinical Psychiatry",
        "feat_support_title": "Flexible Schedule",
        "feat_support_desc": "Appointments daily from 10:00 to 20:00, including weekends",
        "services_tag": "Our Specialties",
        "services_title": "Mental & Psychological Services",
        "services_subtitle": "Evidence-based comprehensive spectrum for your mental wellbeing",
        "pill_popular": "Popular",
        "pill_medical": "Medical",
        "pill_sport": "Sports",
        "pill_relation": "Relationships",
        "pill_testing": "Diagnostics",
        "pill_kids": "Children",
        "srv_psychotherapy_title": "Individual Psychotherapy",
        "srv_psychotherapy_desc": "Private sessions with licensed psychotherapists. Overcoming anxiety, panic attacks, depression, trauma (PTSD), low self-esteem, and emotional burnout.",
        "srv_point_cbt": "Cognitive Behavioral Therapy (CBT)",
        "srv_point_gestalt": "Gestalt Therapy & Existential Approach",
        "srv_point_dur50": "Duration: 50 minutes • In-clinic / Online",
        "srv_price_1": "From 80 ₾ / session",
        "btn_book_short": "Book",
        "srv_psychiatry_title": "Clinical Psychiatry & Diagnostics",
        "srv_psychiatry_desc": "Doctor of Medicine consultation, comprehensive psychiatric assessment, modern psychopharmacotherapy, and ongoing medical monitoring.",
        "srv_point_diag": "International ICD-11 & DSM-5 diagnostics",
        "srv_point_medmgmt": "Medication prescription & therapeutic monitoring",
        "srv_point_care": "Bipolar, chronic insomnia, clinical anxiety",
        "srv_price_2": "From 120 ₾ / consultation",
        "srv_sports_title": "Sports & High Performance Psychology",
        "srv_sports_desc": "Mental coaching for athletes, business leaders, and teams. Stress resilience, peak focus, and pre-competition mental readiness.",
        "srv_point_mental_grit": "Mental resilience & focus control",
        "srv_point_precomp": "Pre-competition stress & anxiety management",
        "srv_point_rehab": "Psychological recovery after physical injuries",
        "srv_price_3": "From 100 ₾ / session",
        "srv_couples_title": "Couples & Family Therapy",
        "srv_couples_desc": "Resolving partnership crises, rebuilding trust, improving communication, and navigating emotional challenges together.",
        "srv_point_eft": "Emotionally Focused Therapy (EFT)",
        "srv_point_comm": "De-escalating conflicts & communication skills",
        "srv_point_dur80": "Duration: 80 minutes • For Couples",
        "srv_price_4": "From 130 ₾ / session",
        "srv_testing_title": "Psychological Diagnostics & Testing",
        "srv_testing_desc": "Validated psychometric testing, cognitive profiling, personality questionnaires, and clinical reports with formal recommendations.",
        "srv_point_tests": "Validated psychometric test batteries",
        "srv_point_report": "Written psychological evaluation report",
        "srv_point_feed": "Detailed feedback session with psychologist",
        "srv_price_5": "150 ₾ - 280 ₾ / battery",
        "srv_child_title": "Child & Adolescent Psychology",
        "srv_child_desc": "Support for children and teenagers facing behavioral difficulties, ADHD, school anxiety, peer conflicts, and parental guidance.",
        "srv_point_art": "Art & Play Therapy methods",
        "srv_point_teens": "Adolescent identity & emotional crises",
        "srv_point_parenting": "Parent counseling & developmental guidance",
        "srv_price_6": "From 90 ₾ / session",
        "team_tag": "Our Team",
        "team_title": "Leading Psychotherapists & Doctors",
        "team_subtitle": "Certified specialists with European accreditations and extensive clinical experience",
        "filter_all": "All Specialists",
        "filter_psychiatry": "Psychiatry",
        "filter_therapy": "Psychotherapy (CBT/Gestalt)",
        "filter_sports": "Sports Psychology",
        "filter_child": "Children & Teens",
        "exp_label": "Experience",
        "btn_book_specialist": "Book Specialist",
        "tests_tag": "Self-Assessment",
        "tests_title": "Validated Mental Health Screenings",
        "tests_subtitle": "Scientifically validated clinical screening tools to evaluate your anxiety, depression, and burnout levels",
        "test_tab_anxiety": "Anxiety (GAD-7)",
        "test_tab_depression": "Depression (PHQ-9)",
        "test_tab_burnout": "Burnout Test",
        "test_tab_balance": "Balance Model",
        "test_duration": "Takes only 2-3 minutes",
        "test_disclaimer": "Confidential • Not a formal medical diagnosis",
        "test_subtext": "Answer truthfully based on how you felt over the past 2 weeks:",
        "score_label": "Score",
        "btn_restart_test": "Take Another Test",
        "result_rec_title": "Recommended Next Steps:",
        "result_rec_1": "Schedule a preliminary consultation with a clinical therapist",
        "result_rec_2": "Practice daily grounding & breathing exercises",
        "about_tag": "About Us",
        "about_title": "MentalMedi — The New Standard in Mental Wellbeing",
        "about_lead": "We created a space where mental health is embraced without stigma, with deep empathy, European clinical standards, and full confidentiality.",
        "val_1_title": "Evidence-Based Practice",
        "mob_nav_home": "Home",
        "mob_nav_services": "Services",
        "mob_nav_bot": "AI Bot",
        "mob_nav_team": "Team",
        "mob_nav_call": "Call",
        "val_1_desc": "We apply only internationally validated therapeutic methods with proven clinical efficacy.",
        "val_2_title": "Absolute Confidentiality",
        "val_2_desc": "Your medical data and personal conversations are protected with the highest privacy standards.",
        "val_3_title": "Holistic Patient Care",
        "val_3_desc": "Individualized, compassionate treatment tailored to your unique psychological goals and pace.",
        "pricing_tag": "Transparent Pricing",
        "pricing_title": "Rates & Care Packages",
        "pricing_subtitle": "No hidden fees. Covered by private health insurances via Form 100",
        "plan_1_label": "Individual",
        "plan_1_name": "Single Session",
        "plan_1_desc": "Initial consultation and customized therapeutic plan",
        "plan_2_label": "Recommended",
        "plan_2_name": "5-Session Package",
        "plan_2_desc": "Structured therapy course with a 15% discount",
        "most_popular": "Most Popular",
        "plan_3_label": "Specialized",
        "plan_3_name": "Psychiatric Evaluation",
        "plan_3_desc": "Complete assessment by MD psychiatrist and medication management",
        "btn_choose_plan": "Choose Plan",
        "ins_title": "Insurance Reimbursement Coverage",
        "ins_desc": "Our physicians provide Form 100 and all clinical documentation for reimbursement across all private insurance providers (Ardi, GPI, Imedi L, Aldagi, TBC Insurance, etc.).",
        "blog_tag": "Psychoeducation & Articles",
        "blog_title": "Insightful Articles & Resources",
        "blog_subtitle": "Our clinic experts share psychoeducational insights, coping mechanisms, and mental wellbeing advice",
        "reviews_tag": "Testimonials",
        "reviews_title": "What Our Patients Say",
        "reviews_subtitle": "Real patient feedback shared with full privacy protection",
        "faq_tag": "FAQ",
        "faq_title": "Frequently Asked Questions",
        "faq_subtitle": "Everything you need to know before your appointment",
        "contact_tag": "Get in Touch",
        "contact_title": "We Are Ready to Support You",
        "contact_desc": "Visit our modern clinic in central Tbilisi or reach out with any question.",
        "lbl_address": "Address",
        "lbl_phone": "Phone / Hotline",
        "lbl_email": "Email",
        "lbl_hours": "Working Hours",
        "send_msg_title": "Send Us a Message",
        "send_msg_sub": "Our clinic administrator will respond within 15 minutes",
        "field_name": "Full Name *",
        "field_phone": "Phone Number *",
        "field_email": "Email Address",
        "field_topic": "Area of Interest",
        "field_msg": "Message / Inquiry",
        "btn_send_msg": "Send Message",
        "modal_book_title": "Book Appointment Online",
        "modal_book_subtitle": "Select your specialist, service format, and convenient time slot",
        "wiz_step1_head": "Choose consultation format and service:",
        "lbl_select_service": "Service Type:",
        "wiz_step2_head": "Select your preferred specialist:",
        "wiz_step3_head": "Pick a time and enter your contact details:",
        "booking_success_title": "Appointment Successfully Booked!",
        "footer_desc": "Modern mental health, psychotherapy, and psychiatry center in Tbilisi. Compassionate care, safe environment, and evidence-based clinical excellence.",
        "footer_services": "Services",
        "footer_nav": "Navigation",
        "footer_contact": "Contact & Address",
        "bot_status": "Online • Mental Support"
    }
};

  function setLanguage(lang) {
    currentLanguage = (lang === 'en') ? 'en' : 'ka';
    document.documentElement.lang = currentLanguage;

    try {
      localStorage.setItem('mm_lang', currentLanguage);
    } catch (e) {}

    // Update all language toggle buttons on the page (header & mobile drawer)
    document.querySelectorAll('.lang-switch-btn').forEach(btn => {
      const langCurrent = btn.querySelector('.lang-current');
      const langAlt = btn.querySelector('.lang-alt');
      if (langCurrent && langAlt) {
        if (currentLanguage === 'en') {
          langCurrent.textContent = 'EN';
          langAlt.textContent = 'GE';
        } else {
          langCurrent.textContent = 'GE';
          langAlt.textContent = 'EN';
        }
      }
    });

    // Update all text nodes with data-i18n
    const dict = translations[currentLanguage];
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.dataset.i18n;
      if (dict && dict[key]) {
        el.innerHTML = dict[key];
      }
    });

    // Update specialist cards on homepage
    document.querySelectorAll('.specialist-card[data-id]').forEach(card => {
      const id = card.dataset.id;
      const spec = specialistsData[id];
      if (!spec) return;
      const nameEl = card.querySelector('.specialist-name');
      const roleEl = card.querySelector('.specialist-role');
      if (nameEl) nameEl.textContent = currentLanguage === 'en' ? spec.nameEn : spec.name;
      if (roleEl) roleEl.textContent = currentLanguage === 'en' ? spec.roleEn : spec.role;
    });

    // Update specialist cards in booking modal
    document.querySelectorAll('.spec-select-card').forEach(label => {
      const strong = label.querySelector('strong');
      if (strong) {
        for (const [id, spec] of Object.entries(specialistsData)) {
          if (strong.textContent === spec.name || strong.textContent === spec.nameEn) {
            strong.textContent = currentLanguage === 'en' ? spec.nameEn : spec.name;
            break;
          }
        }
      }
    });

    // Re-render current interactive test if active
    if (typeof renderCurrentQuestion === 'function') {
      try { renderCurrentQuestion(); } catch (e) {}
    }

    showToast(currentLanguage === 'en' ? "Language changed to English" : "ენა შეიცვალა ქართულზე");
  }

  // Bind click event to all language switch buttons (header & mobile menu)
  document.querySelectorAll('.lang-switch-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      setLanguage(currentLanguage === 'ka' ? 'en' : 'ka');
    });
  });

  // Check saved language on initial load
  try {
    const savedLang = localStorage.getItem('mm_lang');
    if (savedLang === 'en') {
      setTimeout(() => setLanguage('en'), 50);
    }
  } catch (e) {}

  // ==========================================
  // 11. MentalBot AI Assistant Controller
  // ==========================================

  const mentalBotWidget = document.getElementById('mentalBotWidget');
  const mentalBotLauncher = document.getElementById('mentalBotLauncher');
  const mentalBotMiniLauncher = document.getElementById('mentalBotMiniLauncher');
  const launcherDismissBtn = document.getElementById('launcherDismissBtn');
  const botLauncherWrapper = document.getElementById('botLauncherWrapper');
  const mentalBotWindow = document.getElementById('mentalBotWindow');
  const headerBotTrigger = document.getElementById('headerBotTrigger');
  const botCloseBtn = document.getElementById('botCloseBtn');
  const botResetBtn = document.getElementById('botResetBtn');
  const botInputForm = document.getElementById('botInputForm');
  const botInputText = document.getElementById('botInputText');
  const botMessages = document.getElementById('botMessages');
  const botQuickChips = document.getElementById('botQuickChips');
  const botQuickSection = document.getElementById('botQuickSection') || botQuickChips;

  let isLauncherDismissed = false;

  // Breathing tool elements
  const breathingCard = document.getElementById('breathingCard');
  const closeBreathingBtn = document.getElementById('closeBreathingBtn');
  const toggleBreathingBtn = document.getElementById('toggleBreathingBtn');
  const breathingCircle = document.getElementById('breathingCircle');
  const breathingPhaseTag = document.getElementById('breathingPhaseTag');
  const breathingLiveNumber = document.getElementById('breathingLiveNumber');
  const breathingStepDesc = document.getElementById('breathingStepDesc');
  const clockProgressRing = document.getElementById('clockProgressRing');
  let clockTicks = document.querySelectorAll('.b-tick');

  function openMentalBot() {
    mentalBotWindow.classList.add('open');
    mentalBotWindow.setAttribute('aria-hidden', 'false');
    if (mentalBotWidget) mentalBotWidget.classList.add('chat-open');
    setTimeout(() => {
      botInputText.focus();
    }, 300);
  }

  function closeMentalBot() {
    mentalBotWindow.classList.remove('open');
    mentalBotWindow.setAttribute('aria-hidden', 'true');
    if (mentalBotWidget) mentalBotWidget.classList.remove('chat-open');
    stopBreathingExercise();
    if (isLauncherDismissed) {
      if (botLauncherWrapper) botLauncherWrapper.style.display = 'none';
      if (mentalBotMiniLauncher) mentalBotMiniLauncher.style.display = 'flex';
    } else {
      if (botLauncherWrapper) botLauncherWrapper.style.display = 'inline-flex';
      if (mentalBotMiniLauncher) mentalBotMiniLauncher.style.display = 'none';
    }
  }

  function toggleMentalBot() {
    if (mentalBotWindow.classList.contains('open')) {
      closeMentalBot();
    } else {
      openMentalBot();
    }
  }

  if (mentalBotLauncher) mentalBotLauncher.addEventListener('click', openMentalBot);
  if (mentalBotMiniLauncher) {
    mentalBotMiniLauncher.addEventListener('click', () => {
      isLauncherDismissed = false;
      openMentalBot();
    });
  }
  if (launcherDismissBtn) {
    launcherDismissBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      isLauncherDismissed = true;
      if (botLauncherWrapper) botLauncherWrapper.style.display = 'none';
      if (mentalBotMiniLauncher) mentalBotMiniLauncher.style.display = 'flex';
    });
  }
  if (headerBotTrigger) headerBotTrigger.addEventListener('click', openMentalBot);
  if (botCloseBtn) botCloseBtn.addEventListener('click', closeMentalBot);

  // Mobile Bottom Nav Bot Trigger & Active State Handler
  const mobileBotNavBtn = document.getElementById('mobileBotNavBtn');
  if (mobileBotNavBtn) {
    mobileBotNavBtn.addEventListener('click', (e) => {
      e.preventDefault();
      toggleMentalBot();
    });
  }

  const mobileNavItems = document.querySelectorAll('.mobile-bottom-nav .mobile-nav-item:not(.mobile-nav-bot-btn)');
  mobileNavItems.forEach(item => {
    item.addEventListener('click', function() {
      if (this.dataset.nav !== 'call') {
        mobileNavItems.forEach(i => i.classList.remove('active'));
        this.classList.add('active');
      }
    });
  });

  // Sync mobile bottom nav with scroll position
  window.addEventListener('scroll', () => {
    const scrollPos = window.scrollY + 220;
    const sections = [
      { id: 'specialists', nav: 'specialists' },
      { id: 'services', nav: 'services' },
      { id: 'hero', nav: 'hero' }
    ];

    for (const sec of sections) {
      const el = document.getElementById(sec.id);
      if (el && scrollPos >= el.offsetTop) {
        mobileNavItems.forEach(item => {
          if (item.dataset.nav === sec.nav) {
            item.classList.add('active');
          } else if (item.dataset.nav !== 'call') {
            item.classList.remove('active');
          }
        });
        break;
      }
    }
  });

  if (botResetBtn) {
    botResetBtn.addEventListener('click', () => {
      botMessages.innerHTML = `
        <div class="message-row bot-row">
          <div class="msg-avatar"><img src="logo_emblem.png" alt="MentalBot" class="msg-avatar-img" width="24" height="24" style="width:24px;height:24px;max-width:24px;max-height:24px;object-fit:contain;display:block;"></div>
          <div class="msg-bubble">
            <p>გამარჯობა! მე ვარ <strong>MentalBot</strong> — თქვენი მენტალური ჯანმრთელობის AI ასისტენტი.</p>
            <p>როგორ გრძნობთ თავს დღეს? შემიძლია დაგეხმაროთ შფოთვის დაძლევაში, ექიმის შერჩევაში, ტესტის გავლასა ან ვიზიტის დაჯავშნაში.</p>
          </div>
        </div>
      `;
      if (botQuickSection) {
        botMessages.appendChild(botQuickSection);
      } else if (botQuickChips) {
        botMessages.appendChild(botQuickChips);
      }
      stopBreathingExercise();
      showToast("ჩატი გასუფთავდა");
    });
  }

  function appendBotMessage(textHtml, actionButtons = []) {
    const row = document.createElement('div');
    row.className = 'message-row bot-row';

    let actionsMarkup = '';
    if (actionButtons.length > 0) {
      actionsMarkup = `
        <div class="bot-bubble-actions">
          ${actionButtons.map(btn => `<button class="bot-bubble-btn" data-btn-action="${btn.action}">${btn.label}</button>`).join('')}
        </div>
      `;
    }

    row.innerHTML = `
      <div class="msg-avatar"><img src="logo_emblem.png" alt="MentalBot" class="msg-avatar-img" width="24" height="24" style="width:24px;height:24px;max-width:24px;max-height:24px;object-fit:contain;display:block;"></div>
      <div class="msg-bubble">
        ${textHtml}
        ${actionsMarkup}
      </div>
    `;

    botMessages.appendChild(row);

    // Bind action buttons
    row.querySelectorAll('.bot-bubble-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        handleBubbleAction(btn.dataset.btnAction);
      });
    });

    botMessages.scrollTop = botMessages.scrollHeight;
  }

  function appendUserMessage(text) {
    const row = document.createElement('div');
    row.className = 'message-row user-row';
    row.innerHTML = `
      <div class="msg-bubble">
        <p>${escapeHtml(text)}</p>
      </div>
    `;
    botMessages.appendChild(row);
    botMessages.scrollTop = botMessages.scrollHeight;
  }

  function escapeHtml(str) {
    return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }

  function handleBubbleAction(action) {
    if (action === 'open_booking') {
      closeMentalBot();
      openBookingModalWith();
    } else if (action === 'open_tests') {
      closeMentalBot();
      const el = document.getElementById('tests');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    } else if (action === 'start_breathing') {
      startBreathingExercise();
    } else if (action === 'view_specialists') {
      closeMentalBot();
      const el = document.getElementById('specialists');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  }

  // Quick Action Chips Listener
  document.querySelectorAll('.quick-chip').forEach(chip => {
    chip.addEventListener('click', () => {
      const action = chip.dataset.action;
      executeQuickAction(action);
    });
  });

  function executeQuickAction(action) {
    // სუნთქვითი ვარჯიში
    if (action === 'breathing') {
      appendUserMessage("🫁 მინდა სუნთქვითი ვარჯიშის გაკეთება");
      appendBotMessage(`
        <p>გააქტიურდა <strong>4-7-8 დამამშვიდებელი სუნთქვის</strong> მოდული. დააჭირეთ „სუნთქვის დაწყებას“ და მიჰყევით საათის ციფერბლატს.</p>
        <p>შეგიძლიათ აგრეთვე მომწეროთ ნებისმიერი კითხვა ან სიმპტომი, და დეტალურად გაგესაუბრებით!</p>
      `);
      startBreathingExercise();
      return;
    }
    // დანარჩენი ჩიპები კითხვას n8n-ს აგზავნიან — პასუხს AI აგენტი აგენერირებს დიალოგში
    const chipQuestions = {
      anxiety: "როგორ დავძლიო შფოთვა და დაძაბულობა?",
      doctor: "როგორ შევარჩიო შესაფერისი სპეციალისტი MentalMedi-ში?",
      quiz: "მინდა თვითშეფასების ტესტის გავლა (შფოთვა, დეპრესია, ბალანსი). მირჩიეთ",
      booking: "როგორ დავჯავშნო ვიზიტი სპეციალისტთან?",
      price: "რა ღირს მომსახურება და მოქმედებს თუ არა დაზღვევა?"
    };
    const question = chipQuestions[action];
    if (!question) return;
    appendUserMessage(question);
    askBot(question);
  }

  // 4-7-8 Breathing Tool Controller with Clock Ticks & Live Countdown
  const BREATHING_PHASES = [
    { key: 'inhale', name: 'ჩასუნთქვა', duration: 4, desc: 'შეისუნთქეთ ცხვირით ნელა და ღრმად...' },
    { key: 'hold',   name: 'შეკავება',  duration: 7, desc: 'შეიკავეთ სუნთქვა მშვიდად...' },
    { key: 'exhale', name: 'ამოსუნთქვა', duration: 8, desc: 'ამოისუნთქეთ პირით ნელა და ბოლომდე...' }
  ];

  let isBreathingActive = false;
  let breathingAnimFrame = null;
  let currentPhaseIndex = 0;
  let phaseStartTime = 0;
  let lastSecondDisplayed = -1;
  const RING_CIRCUMFERENCE = 364.42;

  function updateClockTicks(fraction) {
    if (!clockTicks || clockTicks.length === 0) {
      clockTicks = document.querySelectorAll('.b-tick');
    }
    const activeCount = Math.min(60, Math.floor(fraction * 60));
    for (let i = 0; i < clockTicks.length; i++) {
      if (i <= activeCount) {
        clockTicks[i].classList.add('active');
      } else {
        clockTicks[i].classList.remove('active');
      }
    }
  }

  function resetClockTicks() {
    if (!clockTicks || clockTicks.length === 0) {
      clockTicks = document.querySelectorAll('.b-tick');
    }
    clockTicks.forEach(t => t.classList.remove('active'));
    if (clockProgressRing) {
      clockProgressRing.style.strokeDashoffset = RING_CIRCUMFERENCE;
    }
  }

  function setBreathingPhase(index) {
    currentPhaseIndex = index;
    const phase = BREATHING_PHASES[currentPhaseIndex];
    phaseStartTime = performance.now();
    lastSecondDisplayed = -1;

    if (breathingCard) breathingCard.dataset.phase = phase.key;
    if (breathingPhaseTag) breathingPhaseTag.textContent = phase.name;
    if (breathingStepDesc) breathingStepDesc.textContent = phase.desc;
    if (breathingLiveNumber) {
      breathingLiveNumber.textContent = phase.duration;
      breathingLiveNumber.classList.remove('tick-pop');
      void breathingLiveNumber.offsetWidth;
      breathingLiveNumber.classList.add('tick-pop');
    }

    // ფაზის საწყისი ზომა
    if (breathingCircle) {
      if (phase.key === 'inhale') {
        breathingCircle.style.transform = 'scale(1.22)';
      } else if (phase.key === 'hold' || phase.key === 'exhale') {
        breathingCircle.style.transform = 'scale(0.78)';
      }
    }
  }

  function breathingLoop(now) {
    if (!isBreathingActive) return;

    const phase = BREATHING_PHASES[currentPhaseIndex];
    const elapsedSec = (now - phaseStartTime) / 1000;
    const remainingSec = Math.max(1, Math.ceil(phase.duration - elapsedSec));
    const fraction = Math.min(1, elapsedSec / phase.duration);

    // Update countdown number on each full second tick
    if (remainingSec !== lastSecondDisplayed) {
      lastSecondDisplayed = remainingSec;
      if (breathingLiveNumber) {
        breathingLiveNumber.textContent = remainingSec;
        breathingLiveNumber.classList.remove('tick-pop');
        void breathingLiveNumber.offsetWidth;
        breathingLiveNumber.classList.add('tick-pop');
      }
    }

    // წრის დინამიკური მასშტაბირება მოთხოვნის შესაბამისად:
    // • ჩასუნთქვა (inhale): პატარავდება (1.22 -> 0.78)
    // • შეკავება (hold): დგას გაუნძრევლად (0.78)
    // • ამოსუნთქვა (exhale): იზრდება (0.78 -> 1.22)
    if (breathingCircle) {
      let scale = 1.0;
      if (phase.key === 'inhale') {
        scale = 1.22 - (fraction * 0.44);
      } else if (phase.key === 'hold') {
        scale = 0.78;
      } else if (phase.key === 'exhale') {
        scale = 0.78 + (fraction * 0.44);
      }
      breathingCircle.style.transform = `scale(${scale.toFixed(3)})`;
    }

    // Update smooth SVG clock progress ring
    if (clockProgressRing) {
      const offset = RING_CIRCUMFERENCE * (1 - fraction);
      clockProgressRing.style.strokeDashoffset = offset;
    }

    // Update clock tick marks (საათის წამების ტირეები)
    updateClockTicks(fraction);

    // Transition to next phase
    if (elapsedSec >= phase.duration) {
      setBreathingPhase((currentPhaseIndex + 1) % BREATHING_PHASES.length);
    }

    breathingAnimFrame = requestAnimationFrame(breathingLoop);
  }

  function startBreathingExercise() {
    if (breathingCard) breathingCard.style.display = 'block';
    isBreathingActive = true;
    if (toggleBreathingBtn) toggleBreathingBtn.textContent = "სუნთქვის შეჩერება";
    setBreathingPhase(0);
    cancelAnimationFrame(breathingAnimFrame);
    breathingAnimFrame = requestAnimationFrame(breathingLoop);
  }

  function stopBreathingExercise() {
    isBreathingActive = false;
    cancelAnimationFrame(breathingAnimFrame);
    if (toggleBreathingBtn) toggleBreathingBtn.textContent = "სუნთქვის დაწყება";
    if (breathingCard) breathingCard.dataset.phase = 'ready';
    if (breathingPhaseTag) breathingPhaseTag.textContent = "მზადება";
    if (breathingLiveNumber) breathingLiveNumber.textContent = "4";
    if (breathingStepDesc) breathingStepDesc.textContent = "დააჭირეთ „სუნთქვის დაწყებას“ მშვიდი რელაქსაციისთვის";
    if (breathingCircle) breathingCircle.style.transform = 'scale(1.0)';
    resetClockTicks();
  }

  if (toggleBreathingBtn) {
    toggleBreathingBtn.addEventListener('click', () => {
      if (isBreathingActive) {
        stopBreathingExercise();
      } else {
        startBreathingExercise();
      }
    });
  }

  if (closeBreathingBtn) {
    closeBreathingBtn.addEventListener('click', () => {
      stopBreathingExercise();
      breathingCard.style.display = 'none';
    });
  }

  // ==========================================
  // MentalBot → n8n AI backend (webhook)
  // ==========================================
  const BOT_WEBHOOK_URL = 'https://meticulous-oyster.pikapod.net/webhook/mentalmedi-website-chat';
  let botSessionId = null;

  // მომხმარებლის სესიის ID — ბოტმა საუბრის კონტექსტი რომ დაიმახსოვროს
  function getBotSessionId() {
    if (botSessionId) return botSessionId;
    try { botSessionId = localStorage.getItem('mm_bot_session'); } catch (e) {}
    if (!botSessionId) {
      botSessionId = 'web-' + Date.now() + '-' + Math.random().toString(36).slice(2, 8);
      try { localStorage.setItem('mm_bot_session', botSessionId); } catch (e) {}
    }
    return botSessionId;
  }

  // „წერს..." ინდიკატორი (მონაცვლეობით მოხტუნავე წერტილები)
  function appendBotTyping() {
    const row = document.createElement('div');
    row.className = 'message-row bot-row';
    row.id = 'botTypingRow';
    row.innerHTML = `
      <div class="msg-avatar"><img src="logo_emblem.png" alt="MentalBot" class="msg-avatar-img" width="24" height="24" style="width:24px;height:24px;max-width:24px;max-height:24px;object-fit:contain;display:block;"></div>
      <div class="msg-bubble bot-typing-bubble">
        <div class="typing-dots-wave">
          <span class="typing-dot"></span>
          <span class="typing-dot"></span>
          <span class="typing-dot"></span>
        </div>
      </div>
    `;
    botMessages.appendChild(row);
    botMessages.scrollTop = botMessages.scrollHeight;
  }

  function removeBotTyping() {
    const row = document.getElementById('botTypingRow');
    if (row) row.remove();
  }

  // AI პასუხის ლამაზად ფორმატირება (Markdown-ის მხარდაჭერით)
  function formatBotReply(text) {
    if (!text) return '';
    let escaped = escapeHtml(text);
    // **bold** -> <strong>bold</strong>
    escaped = escaped.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    // *italic* -> <em>italic</em>
    escaped = escaped.replace(/(^|[^*])\*(?!\*)([^*]+)\*(?!\*)/g, '$1<em>$2</em>');
    // newlines -> <br>
    escaped = escaped.replace(/\n/g, '<br>');
    return '<p>' + escaped + '</p>';
  }

  // შეტყობინებას აგზავნის n8n-ში და AI აგენტის პასუხს აჩვენებს
  async function askBot(text) {
    appendBotTyping();
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 25000);

      const res = await fetch(BOT_WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: text, sessionId: getBotSessionId() }),
        signal: controller.signal
      });
      clearTimeout(timeoutId);

      const raw = await res.text();
      removeBotTyping();

      let reply = '';
      try {
        const data = JSON.parse(raw);
        if (typeof data === 'string') {
          reply = data;
        } else if (Array.isArray(data) && data.length > 0) {
          const first = data[0];
          if (typeof first === 'string') {
            reply = first;
          } else if (first && typeof first === 'object') {
            reply = first.output || first.text || first.response || first.message || '';
          }
        } else if (data && typeof data === 'object') {
          reply = data.output || data.text || data.response || data.message || '';
        }
      } catch (jsonErr) {
        reply = raw;
      }

      if (reply && reply.trim()) {
        appendBotMessage(formatBotReply(reply.trim()));
      } else {
        appendBotMessage('<p>გმადლობთ შეტყობინებისთვის. პასუხის გენერირება ვერ მოხერხდა. შეგიძლიათ დაგვიკავშირდეთ: 📞 +995 598 32 40 20 ან მკითხოთ სხვა საკითხზე.</p>');
      }
    } catch (err) {
      console.error('MentalBot AI error:', err);
      removeBotTyping();
      appendBotMessage('<p>დროებით კავშირის შეფერხებაა. გთხოვთ, სცადოთ ხელახლა ან დაგვირეკოთ: 📞 +995 598 32 40 20</p>');
    }
  }

  // Handle Free-text User Input Form
  if (botInputForm) {
    botInputForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const query = botInputText.value.trim();
      if (!query) return;

      appendUserMessage(query);
      botInputText.value = '';
      respondToUserQuery(query);
    });
  }

  function respondToUserQuery(text) {
    const q = text.toLowerCase();

    // Crisis check
    if (q.includes("თვითმკვლელ") || q.includes("სიცოცხლე აღარ") || q.includes("თავს მოვიკლავ") || q.includes("suicide") || q.includes("kill myself")) {
      appendBotMessage(`
        <div style="background: rgba(139,30,30,0.15); border-left: 3px solid #8B1E1E; padding: 0.75rem; border-radius: 8px;">
          <p style="color: #8B1E1E; font-weight: 700;">თქვენი სიცოცხლე და უსაფრთხოება უმნიშვნელოვანესია!</p>
          <p>გთხოვთ დაუყოვნებლივ დარეკოთ გადაუდებელი დახმარების ხაზზე:</p>
          <p>📞 <strong>112</strong> ან კრიზისული ცენტრი: <strong>116 006</strong></p>
          <p>ჩვენი კლინიკის ცხელი ხაზი: <strong>+995 598 32 40 20</strong></p>
        </div>
      `);
      return;
    }

    // ყველა სხვა შეტყობინებას n8n-ის AI აგენტი პასუხობს
    askBot(text);
  }

  // ==========================================
  // 12. Helper Toast Function
  // ==========================================

  function showToast(message, isError = false) {
    const container = document.getElementById('toastContainer');
    if (!container) return;

    const toast = document.createElement('div');
    toast.className = 'toast';
    if (isError) {
      toast.style.borderLeftColor = '#E74C3C';
    }
    toast.innerHTML = `
      <span>${isError ? '⚠️' : '✓'}</span>
      <span>${message}</span>
    `;

    container.appendChild(toast);

    setTimeout(() => {
      toast.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(10px)';
      setTimeout(() => toast.remove(), 300);
    }, 3800);
  }

});
