import doctorPortrait from '../assets/images/dr_saeed_official_portrait_1788980350987.jpg';
import clinicInterior from '../assets/images/luxury_dental_clinic_1788979543929.jpg';
import smileAfter from '../assets/images/demo-smile-after.svg';
import smileBefore from '../assets/images/demo-smile-before.svg';

import {
  DoctorProfile,
  ServiceItem,
  CaseStudy,
  TechnologyItem,
  JourneyStep,
  Testimonial,
  FaqItem,
  ClinicContact,
  WebsiteStats,
  AppointmentRequest,
  WebsiteContent,
} from '../types';

export const initialDoctorProfile: DoctorProfile = {
  nameEn: 'Dr. Saeed Elmaghlany',
  nameAr: 'د. سعيد المغلاني',
  titleEn: 'Restorative & Cosmetic Dentist',
  titleAr: 'طبيب أسنان متخصص في تجميل وترميم الأسنان',
  degreeEn: '[Degree]',
  degreeAr: '[الدرجة العلمية]',
  universityEn: '[University]',
  universityAr: '[الجامعة]',
  experienceEn: '[Years of Experience]',
  experienceAr: '[سنوات الخبرة]',
  certificationsEn: '[Certifications]',
  certificationsAr: '[الشهادات والاعتمادات]',
  specializationEn: '[Specialization]',
  specializationAr: '[التخصص الدقيق]',
  bioEn:
    'Dedicated to delivering modern dentistry where precision engineering meets organic aesthetics. Every smile is approached as a bespoke architectural design, respecting natural facial harmony, biological preservation, and long-lasting functional perfection.',
  bioAr:
    'مكرس لتقديم طب أسنان حديث يلتقي فيه الفن الهندسي مع الجمال الطبيعي للوجه. يتم التعامل مع كل ابتسامة كعمل معماري فريد، يحترم التناسق الطبيعي لملامح الوجه، ويحافظ على صحة الأسنان لنتائج تدوم طويلاً.',
  photoUrl: doctorPortrait,
};

export const initialServices: ServiceItem[] = [
  {
    id: 'hollywood-smile',
    number: '01',
    nameEn: 'Hollywood Smile',
    nameAr: 'ابتسامة هوليود',
    shortDescEn: 'Comprehensive smile makeover designed to complement your unique facial proportions.',
    shortDescAr: 'تصميم شامل ومخصص للابتسامة ليتناسق بدقة مع خطوط ملامح وجهك الفريدة.',
    fullDescEn: 'A holistic aesthetic transformation aligning tooth color, contour, incisal edges, and gingival display using high-translucency porcelain for an effortlessly natural radiance.',
    fullDescAr: 'تحول جمالي متكامل ينسق لون وشكل وأطراف الأسنان مع خط اللثة باستخدام خزف عالي النقاء لابتسامة طبيعية مفعمة بالحيوية.',
    durationEn: '2 - 3 visits',
    durationAr: '٢ - ٣ جلسات',
    candidateEn: 'Individuals seeking full aesthetic harmony and elevated confidence.',
    candidateAr: 'الراغبون في تناسق جمالي كامل وتعزيز الثقة بالنفس.',
    benefitsEn: ['Digital preview before treatment', 'Stain-resistant porcelain', 'Tailored shade matching', 'Harmonized smile curve'],
    benefitsAr: ['معاينة رقمية مسبقة قبل البدء', 'مقاومة تامة للتصبغات', 'تدرج لوني مخصص', 'انحناءة ابتسامة متناسقة'],
    icon: 'Sparkles',
  },
  {
    id: 'dental-veneers',
    number: '02',
    nameEn: 'Dental Veneers',
    nameAr: 'فينير الأسنان',
    shortDescEn: 'Ultra-thin custom porcelain laminates sculpted to correct gaps, chips, and discoloration.',
    shortDescAr: 'عدسات خزفية فائقة الرقة مصممة خصيصاً لتصحيح الفراغات، الكسور والتصبغات.',
    fullDescEn: 'Custom-crafted E.max ceramic shells requiring minimal tooth reduction. Veneers recreate the organic depth, light reflection, and subtle translucency of natural enamel.',
    fullDescAr: 'رقائق خزفية من مادة E.max مع تحضير أدنى لمينا السن، تعيد الانعكاس الضوئي الطبيعي والشفافية المتدرجة للأسنان الطبيعية.',
    durationEn: '2 appointments',
    durationAr: 'جلستان',
    candidateEn: 'Patients with minor crowding, uneven gaps, or stubborn intrinsic stains.',
    candidateAr: 'أصحاب التصبغات العميقة، الفراغات بين الأسنان، أو التآكل البسيط.',
    benefitsEn: ['Minimal tooth preparation', 'Natural translucency', 'Long-lasting brilliance', 'Individualized micro-texture'],
    benefitsAr: ['حفاظ أقصى على بنية السن', 'شفافية انعكاسية حية', 'لمعان يدوم لسنوات', 'ملمس نسيجي دقيق'],
    icon: 'Layers',
  },
  {
    id: 'teeth-whitening',
    number: '03',
    nameEn: 'Teeth Whitening',
    nameAr: 'تبييض الأسنان',
    shortDescEn: 'Advanced clinical in-office brightening ensuring zero sensitivity and striking results.',
    shortDescAr: 'تفتيح سريري متقدم داخل العيادة يضمن نتائج مبهرة وسريعة بأعلى درجات الراحة.',
    fullDescEn: 'Professional laser and cold-light activation systems that break down deep enamel stains safely without degrading protective surface layers or triggering dentin sensitivity.',
    fullDescAr: 'أنظمة ضوئية وليزرية متطورة تفكك التصبغات العميقة في المينا بأمان فائق دون إضعاف الطبقة الحامية ودون تحسس.',
    durationEn: '45 - 60 mins',
    durationAr: '٤٥ - ٦٠ دقيقة',
    candidateEn: 'Ideal for coffee, tea, smoking stains or pre-event aesthetic boosts.',
    candidateAr: 'مثالي لتصبغات القهوة والتدخين أو قبل المناسبات الخاصة.',
    benefitsEn: ['Up to 8 shades lighter', 'Anti-sensitivity formula', 'Immediate single-visit outcome', 'Safe on enamel'],
    benefitsAr: ['تفتيح حتى ٨ درجات', 'تركيبة حامية ضد التحسس', 'نتيجة فورية في جلسة واحدة', 'آمن تماماً على المينا'],
    icon: 'Sun',
  },
  {
    id: 'root-canal',
    number: '04',
    nameEn: 'Root Canal Treatment',
    nameAr: 'علاج جذور الأسنان',
    shortDescEn: 'Microscopic endodontic therapy preserving infected teeth with painless precision.',
    shortDescAr: 'علاج مجهري دقيق للجذور يحافظ على السن المصاب بدون أي ألم وبأعلى درجات الدقة.',
    fullDescEn: 'Utilizing high-magnification dental microscopes and rotary nickel-titanium instruments to meticulously cleanse, disinfect, and seal root canals, saving natural teeth from extraction.',
    fullDescAr: 'استخدام المجهر الجراحي وأحدث أدوات النيكل-تيتانيوم الدوارة لتنظيف وتعقيم وحشو القنوات الجذرية وإنقاذ السن من الخلع.',
    durationEn: '1 - 2 visits',
    durationAr: '١ - ٢ جلسة',
    candidateEn: 'Patients experiencing pulp inflammation, tooth abscess, or deep nerve pain.',
    candidateAr: 'المرضى الذين يعانون من التهاب العصب أو خراج أو آلام حادة.',
    benefitsEn: ['100% painless procedure', 'Preserves natural tooth anatomy', '3D bioceramic hermetic seal', 'High magnification accuracy'],
    benefitsAr: ['إجراء مريح وبدون ألم', 'إنقاذ بنية السن الطبيعي', 'ختم حيوي ثلاثي الأبعاد', 'دقة مجهرية متناهية'],
    icon: 'Activity',
  },
  {
    id: 'crowns-bridges',
    number: '05',
    nameEn: 'Crowns & Bridges',
    nameAr: 'التيجان والجسور',
    shortDescEn: 'Zirconia and glass-ceramic crowns restoring full masticatory bite and seamless beauty.',
    shortDescAr: 'تيجان الزيركونيا والسيراميك الزجاجي لاستعادة كفاءة العض والجمال الطبيعي.',
    fullDescEn: 'Precision CAD/CAM engineered monolithic restorations custom-milled to reinforce structurally compromised teeth and bridge gaps with zero dark metal margins.',
    fullDescAr: 'تركيبات مصممة بتقنية CAD/CAM الرقمية لتقوية الأسنان الضعيفة وتعويض الفراغات دون أي حواف معدنية داكنة.',
    durationEn: '2 sessions',
    durationAr: 'جلستان',
    candidateEn: 'Heavily restored, fractured, or post-endodontic treated teeth.',
    candidateAr: 'الأسنان المعالجة جذوراً، المتآكلة بشدة أو المكسورة.',
    benefitsEn: ['High fracture resistance', '100% metal-free biocompatibility', 'Seamless margin adaptation', 'Exact anatomical contour'],
    benefitsAr: ['مقاومة فائقة للكسر', 'خالية تماماً من المعادن', 'حواف ناعمة ومتطابقة', 'تشريح طبيعي متناسق'],
    icon: 'Shield',
  },
  {
    id: 'cosmetic-dentistry',
    number: '06',
    nameEn: 'Cosmetic Dentistry',
    nameAr: 'تجميل الأسنان',
    shortDescEn: 'Artistic composite bonding, smile line contouring, and aesthetic micro-adjustments.',
    shortDescAr: 'حشوات تجميلية فنية، إعادة تشكيل حواف الابتسامة، وتعديلات جمالية دقيقة.',
    fullDescEn: 'Direct artistic restorations that subtly reshape small anomalies, close diastemas, and re-sculpt tooth anatomy for a refreshed, youthful, and harmonious smile expression.',
    fullDescAr: 'ترميمات تجميلية مباشرة تعالج الفروقات الصغيرة وتغلق الفراغات وتنسق تشريح السن لابتسامة شابة وأكثر حيوية.',
    durationEn: 'Single visit',
    durationAr: 'جلسة واحدة',
    candidateEn: 'Minor chipped edges, uneven smile lines, or minor spacing.',
    candidateAr: 'الأطراف المكسورة، خط الابتسامة غير المتناسق أو الفراغات البسيطة.',
    benefitsEn: ['Instant same-day results', 'Conservative tissue preservation', 'Affordable enhancement', 'Artistic direct layering'],
    benefitsAr: ['نتائج فورية بنفس اليوم', 'حفاظ كامل على طبقات السن', 'حل تجميلي سريع', 'تطبيق فني بطبقات متعددة'],
    icon: 'Smile',
  },
  {
    id: 'restorative-dentistry',
    number: '07',
    nameEn: 'Restorative & Biomimetic Dentistry',
    nameAr: 'طب الأسنان الترميمي والتحفظي',
    shortDescEn: 'Biomimetic restorations that replicate natural tooth mechanics and biological resilience.',
    shortDescAr: 'ترميمات حيوية تحاكي ميكانيكية السن الطبيعي ومرونته البيولوجية بأحدث المعايير.',
    fullDescEn: 'Minimally invasive restorative protocols focusing on saving natural tooth structure using advanced nano-hybrid composites, microscopic accuracy, and adhesion science.',
    fullDescAr: 'بروتوكولات علاجية تحفظية تركز على إنقاذ بنية السن الطبيعي باستخدام مركبات النانو المجهرية وتقنيات الالتصاق الحيوي المتقدمة.',
    durationEn: 'Single visit',
    durationAr: 'جلسة واحدة',
    candidateEn: 'Patients with cavities, decaying fillings, or structural enamel breakdown.',
    candidateAr: 'المرضى الذين يعانون من تسوس، حشوات قديمة متهالكة، أو تآكل بنيوي للسن.',
    benefitsEn: ['Preserves healthy enamel', 'Microscopic marginal adaptation', 'Natural chewing sensation', 'High resistance to secondary decay'],
    benefitsAr: ['حفاظ تام على المينا السليمة', 'تطابق مجهري للحواف', 'إحساس مضغ طبيعي مريح', 'مقاومة عالية للتسوس الثانوي'],
    icon: 'Sparkles',
  },
  {
    id: 'general-dentistry',
    number: '08',
    nameEn: 'General & Preventive Dentistry',
    nameAr: 'طب الأسنان العام والوقائي',
    shortDescEn: 'Comprehensive oral examinations, preventive prophylaxis, and restorative care.',
    shortDescAr: 'فحوصات شاملة، تنظيف وتلميع وقائي، ورعاية سنية متكاملة لصحة الفم.',
    fullDescEn: 'Holistic preventive healthcare emphasizing periodontal health, deep ultrasonic scaling, cavity detection with digital fluorescence, and durable composite restorations.',
    fullDescAr: 'رعاية وقائية شاملة تركز على صحة اللثة، إزالة الرواسب الجيرية بالموجات فوق الصوتية، واكتشاف التسوس المبكر وحشوات الكومبوزيت.',
    durationEn: '30 - 45 mins',
    durationAr: '٣٠ - ٤٥ دقيقة',
    candidateEn: 'Routine bi-annual dental checkups and proactive prevention for everyone.',
    candidateAr: 'الفحص الدوري الوقائي الموصى به كل ٦ أشهر للجميع.',
    benefitsEn: ['Prevents future dental disease', 'Deep ultrasonic scaling', 'Air-flow stain polishing', 'Comprehensive oral wellness'],
    benefitsAr: ['وقاية استباقية من أمراض اللثة', 'تنظيف بالموجات الصوتية', 'تلميع بتقنية الإيرفلو', 'صحة مستدامة للفم والأسنان'],
    icon: 'CheckCircle2',
  },
];

export const initialFeaturedTreatments = [
  {
    id: 'veneers-showcase',
    titleEn: 'Veneers',
    titleAr: 'فينير المشاهير',
    taglineEn: 'Micro-Thin Porcelain Custom Sculpted For You',
    taglineAr: 'عدسات خزفية رقيقة صُنعت لملامحك',
    image: smileAfter,
  },
  {
    id: 'hollywood-smile-showcase',
    titleEn: 'Hollywood Smile',
    titleAr: 'ابتسامة هوليود',
    taglineEn: 'Comprehensive Architectural Smile Makeover',
    taglineAr: 'تصميم شامل وتناسق استثنائي للابتسامة',
    image: clinicInterior,
  },
  {
    id: 'whitening-showcase',
    titleEn: 'Whitening',
    titleAr: 'تبييض احترافي',
    taglineEn: 'Instant Radiant Clarity With Zero Enamel Stress',
    taglineAr: 'إشراقة فورية ونقاء بدون حساسية',
    image: smileBefore,
  },
  {
    id: 'crowns-showcase',
    titleEn: 'Crowns',
    titleAr: 'تيجان الزيركون',
    taglineEn: 'Monolithic Zirconia With High Translucency',
    taglineAr: 'زيركونيا عالية الشفافية بصلابة استثنائية',
    image: smileAfter,
  },
  {
    id: 'restorative-showcase',
    titleEn: 'Restorations',
    titleAr: 'الترميم التجميلي',
    taglineEn: 'Conservative Biomimetic Direct Composite Layering',
    taglineAr: 'حشوات تجميلية تحفظية تحاكي الأسنان الطبيعية',
    image: clinicInterior,
  },
];

export const initialCaseStudies: CaseStudy[] = [
  {
    id: 'case-01',
    caseNumber: 'CASE 01',
    titleEn: 'Full Smile Makeover',
    titleAr: 'تجديد كامل للابتسامة',
    treatmentEn: 'E.max Ceramic Veneers & Gingival Contouring',
    treatmentAr: 'عدسات إيماكس خزفية مع تنسيق خط اللثة',
    beforeImage: smileBefore,
    afterImage: smileAfter,
    overviewEn:
      'Demonstration clinical case showing correction of worn incisal edges, micro-gaps, and uneven coloration through 10 upper ultra-thin ceramic veneers.',
    overviewAr:
      'حالة توضيحية سريرية تبين تصحيح التآكل في حواف الأسنان والفراغات الدقيقة وتوحيد اللون من خلال ١٠ عدسات خزفية علوية فائقة الدقة.',
    doctorNotesEn:
      '[Demonstration Case - Admin can upload and replace with Dr. Saeed Elmaghlany actual clinical portfolio from the admin dashboard].',
    doctorNotesAr:
      '[حالة تجريبية توضيحية - يمكن لطبيب العيادة أو الأدمن استبدالها بصور الحالات الحقيقية للدكتور سعيد المغلاني من لوحة التحكم].',
    durationEn: '2 visits (10 days)',
    durationAr: 'جلستان (١٠ أيام)',
    isPlaceholder: true,
  },
  {
    id: 'case-02',
    caseNumber: 'CASE 02',
    titleEn: 'Dental Veneers & Harmonization',
    titleAr: 'فينير الأسنان وتناسق الابتسامة',
    treatmentEn: 'Minimally Invasive Porcelain Laminates',
    treatmentAr: 'عدسات خزفية بأدنى حد من التحضير',
    beforeImage: smileBefore,
    afterImage: smileAfter,
    overviewEn:
      'Correction of deep intrinsic staining and minor tooth misalignment using 3D digital smile design and precision-milled porcelain laminates.',
    overviewAr:
      'معالجة التصبغات العميقة وانحراف الأسنان البسيط باستخدام تصميم الابتسامة الرقمي والعدسات المصممة حاسوبياً.',
    doctorNotesEn:
      '[Demonstration Case - High translucency ceramic selected to replicate youthfulness and natural light diffraction].',
    doctorNotesAr:
      '[حالة تجريبية توضيحية - تم اختيار خزف عالي الشفافية ليعكس الضوء الطبيعي لطبقة المينا].',
    durationEn: '14 days total',
    durationAr: '١٤ يوماً في المجمل',
    isPlaceholder: true,
  },
  {
    id: 'case-03',
    caseNumber: 'CASE 03',
    titleEn: 'Clinical Teeth Whitening & Direct Bonding',
    titleAr: 'تبييض سريري وترميم جمالي مباشر',
    treatmentEn: 'Laser Brightening + Composite Edge Refinement',
    treatmentAr: 'تبييض ليزري + تنسيق حواف الكومبوزيت الفني',
    beforeImage: smileBefore,
    afterImage: smileAfter,
    overviewEn:
      'Demonstration of in-office whitening combined with conservative cosmetic bonding to restore broken corner angles on central incisors.',
    overviewAr:
      'توضيح لنتائج التبييض السريري المدمج مع حشوات الكومبوزيت التجميلية لإعادة ترميم الزوايا المكسورة للأسنان الأمامية.',
    doctorNotesEn:
      '[Demonstration Case - Single session protocol resulting in 6 shades improvement without sensitivity].',
    doctorNotesAr:
      '[حالة تجريبية توضيحية - بروتوكول جلسة واحدة أدى إلى تفتيح بمقدار ٦ درجات دون تحسس].',
    durationEn: '1 session (90 mins)',
    durationAr: 'جلسة واحدة (٩٠ دقيقة)',
    isPlaceholder: true,
  },
];

export const initialStatistics: WebsiteStats = {
  patientsCount: '+XXX',
  yearsExperience: '+XX',
  casesCount: '+XXX',
  servicesCount: '08',
};

export const initialTechnology: TechnologyItem[] = [
  {
    id: 'digital-smile-design',
    nameEn: 'Digital Smile Design (DSD)',
    nameAr: 'تصميم الابتسامة الرقمي',
    descEn: 'Architectural simulation matching dental aesthetics to facial biometric contours before beginning.',
    descAr: 'محاكاة معمارية رقمية تطابق خطوط الابتسامة مع ملامح الوجه قبل البدء في العلاج.',
    featureEn: 'Live 3D virtual preview with calibrated video analysis',
    featureAr: 'معاينة افتراضية ثلاثية الأبعاد بدقة قياسية عالية',
    icon: 'ScanFace',
  },
  {
    id: 'digital-xray',
    nameEn: 'Digital 3D CBCT & Panoramic X-Ray',
    nameAr: 'الأشعة المقطعية ثلاثية الأبعاد',
    descEn: 'Ultra-low radiation volumetric tomography detailing bone density, nerve paths, and root canal anatomy.',
    descAr: 'تصوير مقطعي فائق الدقة بأقل نسبة إشعاع لفحص عظام الفك ومسارات الأعصاب.',
    featureEn: '90% reduced radiation compared to conventional radiography',
    featureAr: 'تقليل الإشعاع بنسبة تصل إلى ٩٠٪ مقارنة بالأشعة التقليدية',
    icon: 'Cpu',
  },
  {
    id: 'intraoral-scanning',
    nameEn: 'Intraoral Digital Scanning',
    nameAr: 'المسح الرقمي داخل الفم',
    descEn: 'Optical laser impressions eliminating uncomfortable traditional impression paste and gag reflex.',
    descAr: 'أخذ طبعات ضوئية ملونة بالليزر تلغي قوالب المعجون التقليدية المزعجة تماماً.',
    featureEn: 'Sub-20 micron measurement precision in seconds',
    featureAr: 'دقة قياس تتجاوز ٢٠ ميكرون في غضون ثوانٍ معدودة',
    icon: 'Camera',
  },
  {
    id: 'microscopic-restoration',
    nameEn: 'Operating Dental Microscopy',
    nameAr: 'الميكروسكوب الجراحي للترميم',
    descEn: 'High-magnification surgical visualization for conservative tooth preparation, margin precision, and anatomical composite layering.',
    descAr: 'رؤية مجهرية فائقة التكبير تضمن أقصى حفاظ على نسيج السن الطبيعي ودقة متناهية لحواف الحشوات والعدسات.',
    featureEn: 'Up to 25x optical magnification for sub-millimeter biological accuracy',
    featureAr: 'تكبير بصري يصل إلى ٢٥ ضعفاً لدقة ميكرونية فائقة في العلاج',
    icon: 'Microscope',
  },
  {
    id: 'advanced-sterilization',
    nameEn: 'Advanced Sterilization Protocol',
    nameAr: 'التعقيم المتقدم بأعلى المعايير',
    descEn: 'Hospital-grade class B autoclaves with vacuum cycles, biological tracking, and sealed single-use trays.',
    descAr: 'أجهزة تعقيم فئة B بالموجات الفراغية ومراقبة بيولوجية صارمة لكل أداة.',
    featureEn: 'Continuous digital cycle validation exceeding European hospital standards',
    featureAr: 'توثيق رقمي مستمر لدورات التعقيم وفق المعايير الأوروبية',
    icon: 'ShieldCheck',
  },
];

export const initialJourneySteps: JourneyStep[] = [
  {
    number: '01',
    titleEn: 'Consultation',
    titleAr: 'الاستشارة الشاملة',
    descEn: 'In-depth aesthetic and functional discussion, understanding your expectations, lifestyle, and smile desires.',
    descAr: 'جلسة حوارية متأنية لفهم تطلعاتك الجمالية، نمط حياتك، وأهدافك للوصول للابتسامة المنشودة.',
    durationEn: '45 mins',
    durationAr: '٤٥ دقيقة',
  },
  {
    number: '02',
    titleEn: 'Diagnosis',
    titleAr: 'التشخيص الرقمي',
    descEn: 'High-definition 3D intraoral scans, photography, panoramic evaluation, and comprehensive periodontal mapping.',
    descAr: 'مسح رقمي ثلاثي الأبعاد وتصوير فوتوغرافي عالي الدقة وتقييم شامل لصحة اللثة والأسنان.',
    durationEn: '30 mins',
    durationAr: '٣٠ دقيقة',
  },
  {
    number: '03',
    titleEn: 'Treatment Plan',
    titleAr: 'خطة العلاج المخصصة',
    descEn: 'Interactive 3D smile design preview, clear step-by-step roadmap, transparent timelines, and personalized options.',
    descAr: 'استعراض محاكاة الابتسامة ثلاثية الأبعاد، ووضع خطة واضحة ومدروسة الخطوات والمدد.',
    durationEn: 'Collaborative',
    durationAr: 'تفاعلية بالكامل',
  },
  {
    number: '04',
    titleEn: 'Treatment',
    titleAr: 'التنفيذ العلاجي الدقيق',
    descEn: 'Meticulous execution in a tranquil environment utilizing painless techniques, precision tools, and master ceramists.',
    descAr: 'تنفيذ دقيق في بيئة هادئة ومريحة باستخدام أحدث التقنيات وأفضل الخامات العالمية.',
    durationEn: 'Customized schedule',
    durationAr: 'وفق جدول مخصص',
  },
  {
    number: '05',
    titleEn: 'Follow-up',
    titleAr: 'المتابعة والرعاية المستمرة',
    descEn: 'Post-procedure bite check, scheduled maintenance, protective care instructions, and lasting smile warranty.',
    descAr: 'فحص دوري للإطباق، إرشادات عناية وقائية، ومتابعة مستمرة لضمان بقاء ابتسامتك في أبهى صورها.',
    durationEn: 'Long-term support',
    durationAr: 'دعم ورعاية مستدامة',
  },
];

export const initialTestimonials: Testimonial[] = [
  {
    id: 't-01',
    patientNameEn: 'Demo Patient A',
    patientNameAr: 'مريض تجريبي أ',
    treatmentEn: 'Veneers & Smile Makeover',
    treatmentAr: 'فينير وتصميم ابتسامة',
    rating: 5,
    reviewEn:
      'The attention to detail and natural aesthetics exceeded all my expectations. Dr. Saeed took the time to understand my facial proportions. It feels like my own teeth, but radiant.',
    reviewAr:
      'الاهتمام بأدق التفاصيل والنتيجة الطبيعية فاقت كل توقعاتي. د. سعيد حرص على دراسة ملامح وجهي بدقة. النتيجة تبدو كأنها أسناني الطبيعية ولكن بقمة الإشراق.',
    isDemo: true,
  },
  {
    id: 't-02',
    patientNameEn: 'Demo Patient B',
    patientNameAr: 'مريض تجريبي ب',
    treatmentEn: 'Aesthetic Restorations & Veneers',
    treatmentAr: 'الترميم التجميلي وفينير الأسنان',
    rating: 5,
    reviewEn:
      'I had fractured front teeth and old dark fillings. Dr. Saeed meticulously restored the natural anatomy and color gradation. The modern clinic atmosphere and pain-free care gave me complete peace of mind.',
    reviewAr:
      'كان لدي تآكل في أطراف الأسنان وحشوات قديمة متغيرة اللون. د. سعيد أعاد بناء السن باحترافية وتدرج لوني مطابق تماماً لأسناني. الهدوء والراحة في العيادة يمنحان طمأنينة فائقة.',
    isDemo: true,
  },
  {
    id: 't-03',
    patientNameEn: 'Demo Patient C',
    patientNameAr: 'مريض تجريبي ج',
    treatmentEn: 'In-Office Teeth Whitening',
    treatmentAr: 'تبييض الأسنان بالعيادة',
    rating: 5,
    reviewEn:
      'Quick, comfortable, and remarkable results in less than an hour. Absolutely no lingering tooth sensitivity. Highly recommend Dr. Saeed for anyone looking for elite dental care.',
    reviewAr:
      'جلسة سريعة ومريحة ونتيجة ملحوظة في أقل من ساعة دون أي أثر لحساسية الأسنان. أنصح بشدة بدكتور سعيد لكل من يبحث عن رعاية سنية بمعايير عالمية.',
    isDemo: true,
  },
];

export const initialFaqs: FaqItem[] = [
  {
    id: 'faq-1',
    questionEn: 'How can I book an appointment?',
    questionAr: 'كيف يمكنني حجز موعد؟',
    answerEn:
      'You can easily book directly through our online booking section on this website, or connect with our concierge team instantly via WhatsApp or direct phone call. We will confirm your preferred timing promptly.',
    answerAr:
      'يمكنك حجز موعدك بسهولة مباشرة من خلال قسم الحجز على هذا الموقع، أو التواصل الفوري عبر الواتساب أو الاتصال الهاتفي. سيقوم فريق الاستقبال بتأكيد الموعد المناسب لك في أسرع وقت.',
  },
  {
    id: 'faq-2',
    questionEn: 'How does restorative dentistry preserve natural teeth?',
    questionAr: 'كيف يحافظ طب الأسنان التحفظي والترميمي على الأسنان الطبيعية؟',
    answerEn:
      'We follow biomimetic and minimally invasive principles. Instead of aggressive grinding, we utilize microscopic magnification and high-strength bonding materials that fuse seamlessly to your natural tooth structure, removing only damaged tissue while preserving healthy enamel and dentin.',
    answerAr:
      'نتبع مبادئ طب الأسنان التحفظي والمحاكي للطبيعة. بدلاً من البرد المفرط، نعتمد على التكبير المجهري وخامات لاصقة فائقة القوة تندمج مع بنية السن الأصلية، مع الحفاظ الكامل على مينا السن السليمة.',
  },
  {
    id: 'faq-3',
    questionEn: 'Is teeth whitening safe?',
    questionAr: 'هل تبييض الأسنان آمن؟',
    answerEn:
      'Yes, absolutely. Our clinical in-office whitening utilizes premium pH-neutral European formulations activated by cold wavelength technology, which safely breaks down stains without altering enamel hardness or damaging gum tissue.',
    answerAr:
      'نعم، آمن تماماً وبشكل مطلق. نستخدم مركبات سريرية معتمدة ومتعادلة الحموضة تعمل بالضوء البارد لتفتيت التصبغات الداخلية دون التأثير على صلابة المينا أو التسبب في تهيج اللثة.',
  },
  {
    id: 'faq-4',
    questionEn: 'How long do veneers last?',
    questionAr: 'كم يدوم فينير الأسنان؟',
    answerEn:
      'High-grade porcelain and E.max veneers generally last between 15 to 20+ years when maintained with regular oral hygiene, routine dental checkups, and nighttime guard protection if you clench your teeth.',
    answerAr:
      'تدوم عدسات الفينير الخزفية المصنوعة من مادة E.max ما بين ١٥ إلى ٢٠ عاماً وأكثر عند الالتزام بنظافة الفم اليومية، والفحص الدوري المنتظم، واستخدام واقي الأسنان الليلي عند الحاجة.',
  },
  {
    id: 'faq-5',
    questionEn: 'What happens during the first consultation?',
    questionAr: 'ماذا يحدث في الاستشارة الأولى؟',
    answerEn:
      'During your initial visit, Dr. Saeed performs a thorough clinical evaluation, takes high-definition intraoral scans or digital X-rays if required, listens to your specific smile goals, and presents you with tailored digital treatment simulations.',
    answerAr:
      'يقوم د. سعيد بإجراء فحص سريري شامل، وأخذ مسح رقمي عالي الدقة، والاستماع باهتمام إلى توقعاتك وتطلعاتك للابتسامة، ثم استعراض خيارات العلاج والمحاكاة الرقمية المخصصة لحالتك.',
  },
  {
    id: 'faq-6',
    questionEn: 'Do you offer cosmetic dentistry?',
    questionAr: 'هل تتوفر خدمات تجميل الأسنان؟',
    answerEn:
      'Yes, cosmetic and restorative dentistry is our core clinical focus. We offer smile makeovers, Hollywood Smile designs, porcelain veneers, artistic composite bonding, teeth whitening, and aesthetic gum recontouring.',
    answerAr:
      'نعم بالتأكيد، طب الأسنان التجميلي والترميمي هو جوهر تخصصنا واهتمامنا. نقدم تصميم ابتسامة هوليود، عدسات الفينير الخزفية، الحشوات التجميلية الفنية، تبييض الأسنان، وإعادة تشكيل اللثة الجمالي.',
  },
];

export const initialClinicContact: ClinicContact = {
  addressEn: '[Clinic Address]',
  addressAr: '[عنوان العيادة]',
  phone: '[Phone Number]',
  whatsapp: '+20 100 000 0000',
  email: '[Email]',
  workingHoursEn: 'Saturday - Thursday: 10:00 AM - 10:00 PM (Friday Closed)',
  workingHoursAr: 'السبت - الخميس: ١٠:٠٠ صباحاً - ١٠:٠٠ مساءً (الجمعة مغلق)',
  instagramUrl: 'https://instagram.com/[Instagram URL]',
  facebookUrl: 'https://facebook.com/[Facebook URL]',
};

export const initialWebsiteContent: WebsiteContent = {
  heroTitleEn: 'YOUR SMILE.\nREIMAGINED.',
  heroTitleAr: 'ابتسامتك...\nبشكل يليق بك',
  heroSubtitleEn: 'Modern dentistry combining precision, technology and natural-looking results.',
  heroSubtitleAr: 'طب أسنان حديث يجمع بين الدقة، التكنولوجيا والنتائج الطبيعية.',
  philosophyTitleEn: 'DENTISTRY\nWITH PURPOSE.',
  philosophyTitleAr: 'طب أسنان\nبتفاصيل تصنع الفرق.',
  philosophyDescEn:
    'Great dentistry is not only about treating teeth. It is about understanding the patient, preserving natural beauty, and creating results designed specifically for every smile.',
  philosophyDescAr:
    'طب الأسنان المميز لا يقتصر على علاج الأسنان فقط، بل يبدأ بفهم المريض والحفاظ على الجمال الطبيعي والوصول إلى نتيجة تناسب كل ابتسامة.',
};

// Appointment records are intentionally empty in the public portfolio build.
// Real patient information must come from a private, access-controlled backend.
export const initialAppointments: AppointmentRequest[] = [];
