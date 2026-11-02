/**
 * MentalMedi — Client-side Application Script
 * Architecture & Interactions inspired by MentalHub.ge with custom enhanced UX
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
      img: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=700&h=800&q=85",
      bio: "თბილისის სახელმწიფო სამედიცინო უნივერსიტეტის კურსდამთავრებული. სპეციალიზაცია გავლილი აქვს გერმანიასა და ავსტრიაში. ფლობს საერთაშორისო სერტიფიკატებს ფსიქოფარმაკოთერაპიაში.",
      focus: "დეპრესიული მდგომარეობები, ბიპოლარული აფექტური აშლილობა, პანიკური შეტევები, გენერალიზებული შფოთვა, ძილის ქრონიკული დარღვევები.",
      methods: ["კლინიკური ფსიქიატრია", "ფარმაკოთერაპია", "CBT ელემენტები", "დიაგნოსტიკური შეფასება"],
      languages: "ქართული, ინგლისური, გერმანული"
    },
    3: {
      name: "ლევან მაისურაძე",
      nameEn: "Levan Maisuradze",
      role: "სპორტისა და მაღალი შედეგების ფსიქოლოგი",
      roleEn: "Sports & High Performance Psychologist",
      exp: "11 წლიანი გამოცდილება",
      img: "https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&w=700&h=800&q=85",
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
      img: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=700&h=800&q=85",
      bio: "საქართველოს ფსიქიატრთა საზოგადოების წევრი. მრავალწლიანი გამოცდილება აქვს რთული და კომბინირებული ფსიქიკური აშლილობების მკურნალობაში.",
      focus: "ობსესიურ-კომპულსიური აშლილობა (OCD), პოსტტრავმული სტრესული აშლილობა (PTSD), ფსიქოზური რეგისტრის მდგომარეობები.",
      methods: ["თანამედროვე ფარმაკოთერაპია", "მულტიდისციპლინური მართვა", "სამედიცინო ექსპერტიზა"],
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

    testCategoryBadge.textContent = isEn ? test.nameEn : test.name;
    testQuestionCounter.textContent = isEn 
      ? `Question ${currentQuestionIndex + 1} / ${totalQuestions}` 
      : `კითხვა ${currentQuestionIndex + 1} / ${totalQuestions}`;

    // Question Prompt
    const qData = test.questions[currentQuestionIndex];
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
    const maxScore = test.questions.length * 3;
    const isEn = currentLanguage === 'en';
    const resultObj = test.getResults(totalScore, isEn);

    testQuestionArea.style.display = 'none';
    testResultArea.style.display = 'block';

    document.getElementById('resultScoreNum').textContent = totalScore;
    const maxScoreEl = document.getElementById('resultScoreMax') || document.querySelector('.result-score-max');
    if (maxScoreEl) {
      maxScoreEl.textContent = maxScore;
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
    en: {
      crisis_msg: "If you need immediate emergency help: Crisis Hotline: <strong>112</strong> or <strong>116 006</strong>",
      tagline: "Mental Health & Therapy Center",
      nav_services: "Services",
      nav_specialists: "Specialists",
      nav_tests: "Tests <span class='badge-mini'>Quiz</span>",
      score_label: "Score",
      nav_about: "About Us",
      nav_pricing: "Pricing",
      nav_blog: "Blog",
      nav_contact: "Contact",
      btn_book: "Book Visit",
      hero_badge: "Licensed Clinic & 100% Confidentiality",
      hero_title: "Your Inner Peace & <span class='gradient-text'>Mental Resilience</span>",
      hero_desc: "Professional psychological, psychotherapeutic and psychiatric care. Evidence-based methods, compassionate environment, and therapy tailored to you.",
      btn_book_now: "Book Consultation",
      btn_take_test: "Take Self-Assessment Test",
      metric_experts: "Leading Specialists",
      metric_sessions: "Sessions Conducted",
      metric_privacy: "Confidentiality",
      now_accepting: "Appointments available: Online / In-Clinic",
      empathic_care: "Compassionate Care",
      evidence_based: "Evidence-Based",
      quick_booking: "Easy Booking",
      same_day_slot: "Available slots today",
      certified_team: "Certified team ready to help",
      feat_online_title: "Online Consultations",
      feat_online_desc: "Therapy from the comfort of home, anywhere in the world",
      feat_privacy_title: "100% Confidentiality",
      feat_privacy_desc: "Strict adherence to medical ethics and data privacy",
      feat_methods_title: "Evidence-Based Care",
      feat_methods_desc: "CBT, Gestalt, Emotion-Focused & Clinical Psychiatry",
      feat_support_title: "Flexible Schedule",
      feat_support_desc: "Appointments daily from 10:00 to 20:00, including weekends",
      services_tag: "Our Specialties",
      services_title: "Medical & Psychological Services",
      services_subtitle: "Comprehensive spectrum based on MentalHub structure for your mental wellbeing",
      filter_all: "All Specialists",
      filter_psychiatry: "Psychiatry",
      filter_therapy: "Psychotherapy (CBT/Gestalt)",
      filter_sports: "Sports Psychology",
      filter_child: "Children & Teens",
      about_tag: "About Us",
      about_title: "MentalMedi — The New Standard in Mental Wellbeing",
      about_lead: "We created a space where mental health is embraced without stigma, with deep empathy and European clinical excellence.",
      pricing_tag: "Transparent Pricing",
      pricing_title: "Rates & Treatment Packages",
      pricing_subtitle: "No hidden fees. Reimbursable by private health insurances",
      blog_tag: "Psychoeducation & News",
      blog_title: "Helpful Articles & Insights",
      reviews_tag: "Testimonials",
      reviews_title: "What Our Patients Say",
      faq_tag: "FAQ",
      faq_title: "Frequently Asked Questions",
      contact_tag: "Get in Touch",
      contact_title: "We Are Ready to Support You",
      send_msg_title: "Send Us a Message",
      send_msg_sub: "Our coordinator will reply within 15 minutes",
      btn_send_msg: "Send Message"
    },
    ka: {
      crisis_msg: "თუ გჭირდებათ გადაუდებელი დახმარება: კრიზისული ცხელი ხაზი: <strong>112</strong> ან <strong>116 006</strong>",
      tagline: "მენტალური ჯანმრთელობის ცენტრი",
      nav_services: "სერვისები",
      nav_specialists: "სპეციალისტები",
      nav_tests: "ტესტები <span class='badge-mini'>Quiz</span>",
      score_label: "ქულა",
      nav_about: "ჩვენს შესახებ",
      nav_pricing: "ფასები",
      nav_blog: "ბლოგი",
      nav_contact: "კონტაქტი",
      btn_book: "ვიზიტის დაჯავშნა",
      hero_badge: "ლიცენზირებული კლინიკა & 100% კონფიდენციალურობა",
      hero_title: "შენი შინაგანი მშვიდობა და <span class='gradient-text'>მენტალური სიმტკიცე</span>",
      hero_desc: "პროფესიონალური ფსიქოლოგიური, ფსიქოთერაპიული და ფსიქიატრიული მხარდაჭერა. მტკიცებულებებზე დაფუძნებული მეთოდები, უსაფრთხო გარემო და ინდივიდუალურად თქვენზე მორგებული თერაპია.",
      btn_book_now: "დაჯავშნე კონსულტაცია",
      btn_take_test: "გაიარე თვითშეფასების ტესტი",
      metric_experts: "წამყვანი სპეციალისტი",
      metric_sessions: "ჩატარებული სესია",
      metric_privacy: "კონფიდენციალურობა",
      now_accepting: "ვიზიტები ხელმისაწვდომია: ონლაინ / კლინიკაში",
      empathic_care: "ემპათიური მიდგომა",
      evidence_based: "მტკიცებითი მედიცინა",
      quick_booking: "მარტივი დაჯავშნა",
      same_day_slot: "თავისუფალი დროები დღესვე",
      certified_team: "სერტიფიცირებული გუნდი მზადაა დასახმარებლად",
      feat_online_title: "ონლაინ კონსულტაციები",
      feat_online_desc: "თერაპია სახლიდან გაუსვლელად მსოფლიოს ნებისმიერი წერტილიდან",
      feat_privacy_title: "100% კონფიდენციალურობა",
      feat_privacy_desc: "პაციენტის ეთიკური კოდექსისა და პირადი მონაცემების უმკაცრესი დაცვა",
      feat_methods_title: "მტკიცებითი მიდგომები",
      feat_methods_desc: "CBT, გეშტალტი, ემოციურ-ფოკუსირებული და კლინიკური ფსიქიატრია",
      feat_support_title: "მოქნილი გრაფიკი",
      feat_support_desc: "ვიზიტები ყოველდღე 10:00-დან 20:00-მდე, შაბათ-კვირის ჩათვლით",
      services_tag: "ჩვენი მიმართულებები",
      services_title: "სამედიცინო და ფსიქოლოგიური სერვისები",
      services_subtitle: "Mental Hub-ის სტრუქტურაზე დაფუძნებული სრული სპექტრი თქვენი მენტალური კეთილდღეობისთვის",
      filter_all: "ყველა სპეციალისტი",
      filter_psychiatry: "ფსიქიატრია",
      filter_therapy: "ფსიქოთერაპია (CBT/გეშტალტი)",
      filter_sports: "სპორტის ფსიქოლოგია",
      filter_child: "ბავშვები & მოზარდები",
      about_tag: "ჩვენს შესახებ",
      about_title: "MentalMedi — მენტალური კეთილდღეობის ახალი სტანდარტი",
      about_lead: "ჩვენ შევქმენით სივრცე, სადაც ფსიქიკური ჯანმრთელობა სტიგმის გარეშე აღიქმება. აქ თითოეულ ადამიანს ხვდება ღრმა ემპათია, პროფესიონალიზმი და თანამედროვე ევროპული სტანდარტების მომსახურება.",
      pricing_tag: "გამჭვირვალე ფასები",
      pricing_title: "ტარიფები და მომსახურების პაკეტები",
      pricing_subtitle: "არანაირი ფარული გადასახადი. შესაძლებელია კერძო დაზღვევის ანაზღაურებით სარგებლობა",
      blog_tag: "ფსიქოგანათლება & სიახლეები",
      blog_title: "სასარგებლო სტატიები და რჩევები",
      reviews_tag: "გამოხმაურებები",
      reviews_title: "რას ამბობენ ჩვენი პაციენტები",
      faq_tag: "კითხვა-პასუხი",
      faq_title: "ხშირად დასმული კითხვები",
      contact_tag: "დაგვიკავშირდით",
      contact_title: "ჩვენ მზად ვართ თქვენს დასახმარებლად",
      send_msg_title: "მოგვწერეთ შეტყობინება",
      send_msg_sub: "ჩვენი ადმინისტრატორი დაგიკავშირდებათ 15 წუთში",
      btn_send_msg: "შეტყობინების გაგზავნა"
    }
  };

  if (langSwitchBtn) {
    langSwitchBtn.addEventListener('click', () => {
      currentLanguage = (currentLanguage === 'ka') ? 'en' : 'ka';
      document.documentElement.lang = currentLanguage;

      const langCurrent = langSwitchBtn.querySelector('.lang-current');
      const langAlt = langSwitchBtn.querySelector('.lang-alt');

      if (currentLanguage === 'en') {
        langCurrent.textContent = 'EN';
        langAlt.textContent = 'GE';
      } else {
        langCurrent.textContent = 'GE';
        langAlt.textContent = 'EN';
      }

      // Update text nodes with data-i18n
      const dict = translations[currentLanguage];
      document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.dataset.i18n;
        if (dict[key]) {
          el.innerHTML = dict[key];
        }
      });

      // Re-render current test
      renderCurrentQuestion();
      showToast(currentLanguage === 'en' ? "Language changed to English" : "ენა შეიცვალა ქართულზე");
    });
  }

  // ==========================================
  // 11. MentalBot AI Assistant Controller
  // ==========================================

  const mentalBotLauncher = document.getElementById('mentalBotLauncher');
  const mentalBotWindow = document.getElementById('mentalBotWindow');
  const headerBotTrigger = document.getElementById('headerBotTrigger');
  const botCloseBtn = document.getElementById('botCloseBtn');
  const botResetBtn = document.getElementById('botResetBtn');
  const botInputForm = document.getElementById('botInputForm');
  const botInputText = document.getElementById('botInputText');
  const botMessages = document.getElementById('botMessages');
  const botQuickChips = document.getElementById('botQuickChips');

  // Breathing tool elements
  const breathingCard = document.getElementById('breathingCard');
  const closeBreathingBtn = document.getElementById('closeBreathingBtn');
  const toggleBreathingBtn = document.getElementById('toggleBreathingBtn');
  const breathingCircle = document.getElementById('breathingCircle');
  const breathingText = document.getElementById('breathingText');
  const breathingStepDesc = document.getElementById('breathingStepDesc');
  let breathingInterval = null;
  let isBreathingActive = false;

  function openMentalBot() {
    mentalBotWindow.classList.add('open');
    mentalBotWindow.setAttribute('aria-hidden', 'false');
    setTimeout(() => {
      botInputText.focus();
    }, 300);
  }

  function closeMentalBot() {
    mentalBotWindow.classList.remove('open');
    mentalBotWindow.setAttribute('aria-hidden', 'true');
    stopBreathingExercise();
  }

  function toggleMentalBot() {
    if (mentalBotWindow.classList.contains('open')) {
      closeMentalBot();
    } else {
      openMentalBot();
    }
  }

  if (mentalBotLauncher) mentalBotLauncher.addEventListener('click', toggleMentalBot);
  if (headerBotTrigger) headerBotTrigger.addEventListener('click', openMentalBot);
  if (botCloseBtn) botCloseBtn.addEventListener('click', closeMentalBot);

  if (botResetBtn) {
    botResetBtn.addEventListener('click', () => {
      botMessages.innerHTML = `
        <div class="message-row bot-row">
          <div class="msg-avatar">🌿</div>
          <div class="msg-bubble">
            <p>გამარჯობა! მე ვარ <strong>MentalBot</strong> — თქვენი მენტალური ჯანმრთელობის AI ასისტენტი.</p>
            <p>როგორ გრძნობთ თავს დღეს? შემიძლია დაგეხმაროთ შფოთვის დაძლევაში, ექიმის შერჩევაში, ტესტის გავლასა ან ვიზიტის დაჯავშნაში.</p>
          </div>
        </div>
      `;
      botMessages.appendChild(botQuickChips);
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
      <div class="msg-avatar">🌿</div>
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
    if (action === 'anxiety') {
      appendUserMessage("🧘 როგორ დავძლიო შფოთვა და დაძაბულობა?");
      setTimeout(() => {
        appendBotMessage(`
          <p><strong>შფოთვის მართვის 3 სწრაფი ნაბიჯი:</strong></p>
          <p>1. <strong>5-4-3-2-1 დამიწება:</strong> იპოვეთ თქვენ გარშემო 5 საგანი, შეეხეთ 4-ს, მოუსმინეთ 3 ბგერას, იყნოსეთ 2 სუნი და შეიგრძენით 1 გემო.</p>
          <p>2. <strong>ღრმა სუნთქვა:</strong> სუნთქვის შენელება ამცირებს კორტიზოლს.</p>
          <p>3. <strong>ტესტის გავლა:</strong> შეამოწმეთ შფოთვის დონე ვალიდური GAD-7 კითხვარით.</p>
        `, [
          { action: 'start_breathing', label: '🫁 სუნთქვითი ვარჯიშის დაწყება' },
          { action: 'open_tests', label: '📝 შფოთვის ტესტის გავლა' },
          { action: 'open_booking', label: '👩‍⚕️ თერაპევტთან დაჯავშნა' }
        ]);
      }, 400);
    } else if (action === 'breathing') {
      appendUserMessage("🫁 მინდა სუნთქვითი ვარჯიშის გაკეთება");
      setTimeout(() => {
        appendBotMessage(`
          <p>გააქტიურდა <strong>4-7-8 დამამშვიდებელი სუნთქვის</strong> მოდული. დააჭირეთ „სუნთქვის დაწყებას“ და მიჰყევით ანიმაციურ წრეს:</p>
        `);
        startBreathingExercise();
      }, 300);
    } else if (action === 'doctor') {
      appendUserMessage("👩‍⚕️ როგორ შევარჩიო შესაფერისი სპეციალისტი?");
      setTimeout(() => {
        appendBotMessage(`
          <p>სპეციალისტის შერჩევა დამოკიდებულია თქვენს საჭიროებაზე:</p>
          <p>• <strong>წამყვანი ფსიქოთერაპევტი (WAPP):</strong> პოზიტიური ფსიქოთერაპია, ემოციური გადაწვა, შფოთვა, ბალანსის მოდელი (ლალი ბადრიძე).</p>
          <p>• <strong>კლინიკური ფსიქიატრი:</strong> სამედიცინო დიაგნოსტიკა, მედიკამენტური მკურნალობა, მძიმე უძილობა (დოქტ. ნინო კალანდაძე).</p>
          <p>• <strong>წყვილების თერაპევტი:</strong> ურთიერთობის კრიზისები და კონფლიქტები (გიორგი თავაძე).</p>
          <p>• <strong>სპორტის ფსიქოლოგი:</strong> მენტალური გამძლეობა და ფოკუსი (ლევან მაისურაძე).</p>
        `, [
          { action: 'view_specialists', label: 'სპეციალისტების სიის ნახვა' },
          { action: 'open_booking', label: 'დაჯავშნე ვიზიტი ახლავე' }
        ]);
      }, 400);
    } else if (action === 'quiz') {
      appendUserMessage("📝 მინდა თვითშეფასების ტესტის გავლა");
      setTimeout(() => {
        appendBotMessage(`
          <p>ჩვენს საიტზე ხელმისაწვდომია 3 მეცნიერულად ვალიდური ტესტი:</p>
          <p>1. <strong>GAD-7</strong> — შფოთვის სკრინინგი</p>
          <p>2. <strong>PHQ-9</strong> — დეპრესიის შეფასება</p>
          <p>3. <strong>Burnout</strong> — ემოციური გადაწვის ტესტი</p>
          <p>ტესტი ანონიმურია და გრძელდება სულ 2 წუთი.</p>
        `, [
          { action: 'open_tests', label: 'გადასვლა ტესტებზე →' }
        ]);
      }, 400);
    } else if (action === 'booking') {
      appendUserMessage("📅 როგორ დავჯავშნო ვიზიტი?");
      setTimeout(() => {
        appendBotMessage(`
          <p>ვიზიტის დაჯავშნა ხდება 3 მარტივ ნაბიჯში:</p>
          <p>1. ირჩევთ ფორმატს: <strong>კლინიკაში (ი. ჭავჭავაძის გამზ. 2)</strong> ან <strong>ონლაინ ვიდეოზარი</strong>.</p>
          <p>2. ირჩევთ სპეციალისტს ან უახლოეს თავისუფალ დროს.</p>
          <p>3. უთითებთ თარიღს და თქვენს ნომერს. ჩვენი ადმინისტრატორი 15 წუთში დაგიდასტურებთ ვიზიტს.</p>
        `, [
          { action: 'open_booking', label: 'ვიზიტის დაჯავშნის გახსნა' }
        ]);
      }, 400);
    } else if (action === 'price') {
      appendUserMessage("💳 რა ღირს მომსახურება და მოქმედებს თუ არა დაზღვევა?");
      setTimeout(() => {
        appendBotMessage(`
          <p><strong>ტარიფები:</strong></p>
          <p>• პირველადი კონსულტაცია: <strong>90 ₾</strong> (50 წთ)</p>
          <p>• 5-სესიიანი თერაპიული პაკეტი: <strong>390 ₾</strong> (-15% ფასდაკლებით)</p>
          <p>• ფსიქიატრიული შეფასება: <strong>130 ₾</strong> (ფორმა 100-ით)</p>
          <p>🛡️ <strong>დაზღვევა:</strong> ჩვენი ექიმები გასცემენ ფორმა 100-ს, რომლითაც კერძო სადაზღვევოები (არდი, ჯიპიაი, იმედი L, ალდაგი, თიბისი) სრულად ან ნაწილობრივ ანაზღაურებენ თანხას.</p>
        `, [
          { action: 'open_booking', label: 'დაჯავშნე ვიზიტი' }
        ]);
      }, 400);
    }
  }

  // 4-7-8 Breathing Tool Controller
  function startBreathingExercise() {
    breathingCard.style.display = 'block';
    isBreathingActive = true;
    toggleBreathingBtn.textContent = "სუნთქვის შეჩერება";
    runBreathingCycle();
  }

  function stopBreathingExercise() {
    isBreathingActive = false;
    clearTimeout(breathingInterval);
    if (toggleBreathingBtn) toggleBreathingBtn.textContent = "სუნთქვის დაწყება";
    if (breathingCircle) {
      breathingCircle.className = 'breathing-circle';
      breathingText.textContent = "მზადება";
    }
    if (breathingStepDesc) breathingStepDesc.textContent = "დააჭირეთ დაწყებას";
  }

  function runBreathingCycle() {
    if (!isBreathingActive) return;

    // Phase 1: Inhale 4s
    breathingCircle.className = 'breathing-circle inhale';
    breathingText.textContent = "ჩასუნთქვა (4)";
    breathingStepDesc.textContent = "შეისუნთქეთ ცხვირით ნელა და ღრმად...";

    breathingInterval = setTimeout(() => {
      if (!isBreathingActive) return;

      // Phase 2: Hold 7s
      breathingCircle.className = 'breathing-circle hold';
      breathingText.textContent = "შეკავება (7)";
      breathingStepDesc.textContent = "შეიკავეთ სუნთქვა მშვიდად...";

      breathingInterval = setTimeout(() => {
        if (!isBreathingActive) return;

        // Phase 3: Exhale 8s
        breathingCircle.className = 'breathing-circle exhale';
        breathingText.textContent = "ამოსუნთქვა (8)";
        breathingStepDesc.textContent = "ამოისუნთქეთ პირით სრულად...";

        breathingInterval = setTimeout(() => {
          if (isBreathingActive) {
            runBreathingCycle();
          }
        }, 8000);

      }, 7000);

    }, 4000);
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

  // Handle Free-text User Input Form
  if (botInputForm) {
    botInputForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const query = botInputText.value.trim();
      if (!query) return;

      appendUserMessage(query);
      botInputText.value = '';

      // Analyze Query and Provide Empathetic Intelligent Answer
      setTimeout(() => {
        respondToUserQuery(query);
      }, 500);
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

    if (q.includes("გამარჯობა") || q.includes("სალამი") || q.includes("hello") || q.includes("hi")) {
      appendBotMessage(`
        <p>მოგესალმებით! მოხარული ვარ, რომ მომმართეთ. 🌿</p>
        <p>როგორ გრძნობთ დღეს თავს? შემიძლია გაგიწიოთ კონსულტაცია ჩვენს სერვისებზე, დაგეხმაროთ შფოთვის შემცირებაში ან დაჯავშნოთ ვიზიტი.</p>
      `, [
        { action: 'open_tests', label: 'გაიარე ტესტი' },
        { action: 'open_booking', label: 'დაჯავშნე ვიზიტი' }
      ]);
    } else if (q.includes("შფოთვ") || q.includes("ნერვ") || q.includes("პანიკ") || q.includes("anxiety") || q.includes("panic")) {
      appendBotMessage(`
        <p>შფოთვა და პანიკა არის სხეულის ბუნებრივი რეაქცია გადატვირთვაზე, თუმცა მისი მართვა სავსებით შესაძლებელია.</p>
        <p>გირჩევთ სცადოთ ჩვენი <strong>4-7-8 სუნთქვის ტექნიკა</strong> ან გაიაროთ <strong>GAD-7 შფოთვის სკრინინგი</strong>, რის შემდეგაც ჩვენი CBT თერაპევტი დაგეხმარებათ.</p>
      `, [
        { action: 'start_breathing', label: '🫁 სუნთქვის დაწყება' },
        { action: 'open_tests', label: 'ტესტის გავლა' },
        { action: 'open_booking', label: 'სპეციალისტთან დაჯავშნა' }
      ]);
    } else if (q.includes("დეპრესი") || q.includes("მოწყენილ") || q.includes("უიმედო") || q.includes("depression")) {
      appendBotMessage(`
        <p>დეპრესია და ემოციური ენერგიის ნაკლებობა არ არის თქვენი სისუსტე — ეს არის მდგომარეობა, რომელსაც სჭირდება მხარდაჭერა და მზრუნველობა.</p>
        <p>MentalMedi-ში გვყავს როგორც ფსიქოთერაპევტები, ასევე კლინიკური ფსიქიატრები, რომლებიც დაგეხმარებიან ძალების აღდგენაში.</p>
      `, [
        { action: 'open_tests', label: 'PHQ-9 დეპრესიის ტესტი' },
        { action: 'open_booking', label: 'ვიზიტის დაჯავშნა' }
      ]);
    } else if (q.includes("ძილ") || q.includes("უძილობა") || q.includes("sleep") || q.includes("insomnia")) {
      appendBotMessage(`
        <p>უძილობა ხშირად შფოთვისა და გადაღლის მთავარი სიგნალია.</p>
        <p>რეკომენდაცია: დაძინებამდე 1 საათით ადრე გამორთეთ ეკრანები, ოთახში შეინარჩუნეთ 18-20°C ტემპერატურა. თუ პრობლემა 2 კვირაზე მეტია გრძელდება, გაიარეთ კონსულტაცია ფსიქიატრთან მედიკამენტური ან რეჟიმული კორექციისთვის.</p>
      `, [
        { action: 'open_booking', label: 'ფსიქიატრთან დაჯავშნა' }
      ]);
    } else if (q.includes("ფას") || q.includes("ღირს") || q.includes("price") || q.includes("cost") || q.includes("დაზღვევა")) {
      appendBotMessage(`
        <p>პირველადი კონსულტაციის ფასი იწყება <strong>80-90 ₾</strong>-დან. 5 სესიიანი კურსი — <strong>390 ₾</strong> (-15%).</p>
        <p>ჩვენი კლინიკა გასცემს ფორმა 100-ს, რომელსაც ანაზღაურებს ყველა კერძო სადაზღვევო კომპანია.</p>
      `, [
        { action: 'open_booking', label: 'ვიზიტის დაჯავშნა' }
      ]);
    } else if (q.includes("სად ხართ") || q.includes("მისამართი") || q.includes("location") || q.includes("address")) {
      appendBotMessage(`
        <p>📍 ჩვენი მისამართია: <strong>ქ. თბილისი, ი. ჭავჭავაძის გამზირი 2</strong>.</p>
        <p>სამუშაო საათები: ორშაბათი - შაბათი: 10:00 – 20:00.</p>
        <p>ტელეფონი: <strong>+995 598 32 40 20</strong></p>
        <p>ასევე ხელმისაწვდომია <strong>ონლაინ ვიდეო-კონსულტაციები</strong> მსოფლიოს ნებისმიერი წერტილიდან!</p>
      `, [
        { action: 'open_booking', label: 'დაჯავშნე ვიზიტი' }
      ]);
    } else if (q.includes("დაჯავშნ") || q.includes("ვიზიტი") || q.includes("book") || q.includes("appointment")) {
      appendBotMessage(`
        <p>ვიზიტის დასაჯავშნად დააჭირეთ ქვემოთ მოცემულ ღილაკს, აირჩიეთ სასურველი დრო და ექიმი:</p>
      `, [
        { action: 'open_booking', label: '📅 დაჯავშნის ონლაინ ფორმა' }
      ]);
    } else if (q.includes("მადლობა") || q.includes("thanks") || q.includes("thank you")) {
      appendBotMessage(`
        <p>არაფრის! ყოველთვის თქვენს გვერდით ვარ. გაუფრთხილდით თქვენს მენტალურ სიმშვიდეს! 💚</p>
      `);
    } else {
      appendBotMessage(`
        <p>გმადლობთ შეკითხვისთვის. თქვენი შეტყობინება გადაეცა ჩვენს კლინიკურ კოორდინატორს.</p>
        <p>რით შემიძლია ახლა დაგეხმაროთ?</p>
      `, [
        { action: 'start_breathing', label: '🫁 სუნთქვითი ვარჯიში' },
        { action: 'open_tests', label: '📝 ტესტის გავლა' },
        { action: 'open_booking', label: '📅 ვიზიტის დაჯავშნა' }
      ]);
    }
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
