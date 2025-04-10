export type YesNoDetail = {
  yes: boolean;
  details: string;
};

export type YesNoMonths = {
  yes: boolean;
  months: string;
};

export type DependencyLevel = {
  dependent: boolean;
  semiDependent: boolean;
  independent: boolean;
};

export type YesNoDependency = {
  yes: boolean;
  details: string;
  dependencyLevel: DependencyLevel;
};

export type ParentInfo = {
  name: string;
  age: string;
  profession: string;
};

export type Evaluation = {
  evaluationDate: string;
  weekDay: string;
  time: string;
};

export type PatientIdentification = {
  name: string;
  dateOfBirth: string;
  age: string;
  placeOfBirth: string;
  address: string;
  phone: string;
  cityDistrict: string;
  father: ParentInfo;
  mother: ParentInfo;
};

export type FollowUps = {
  speechTherapy: YesNoDetail;
  psychological: YesNoDetail;
  psychopedagogy: YesNoDetail;
  physiotherapy: YesNoDetail;
  musicTherapy: YesNoDetail;
  nutrition: YesNoDetail;
  artTherapy: YesNoDetail;
  occupationalTherapy: YesNoDetail;
  otherTherapies: YesNoDetail;
};

export type Referral = {
  diagnosis: string;
  responsibleDoctor: string;
  currentMedication: string;
  mainComplaint: string;
  followUps: FollowUps;
};

export type MedicalHistory = {
  previousTreatments: YesNoDetail;
  rehabilitation: YesNoDetail;
  familyHistory: YesNoDetail;
  hospitalizations: YesNoDetail;
  surgeries: YesNoDetail;
  seizures: YesNoDetail;
  stereotypy: YesNoDetail;
  respiratoryIssues: YesNoDetail;
  heartConditions: YesNoDetail;
  echolalia: YesNoDetail;
  visualImpairment: YesNoDetail;
  hearingImpairment: YesNoDetail;
};

export type PregnancyHistory = {
  plannedPregnancy: YesNoDetail;
  wantedPregnancy: YesNoDetail;
  prenatalCare: YesNoDetail;
  deliveryType: {
    normal: boolean;
    cSection: boolean;
  };
  gestationalWeeks: string;
  pregnancyComplications: string;
  neonatalPeriod: string;
  breastfeedingDuration: YesNoDetail;
};

export type BabyDevelopment = {
  headControl: YesNoMonths;
  rolledOver: YesNoMonths;
  crawled: YesNoMonths;
  satUp: YesNoMonths;
  walked: YesNoMonths;
  spoke: YesNoMonths;
};

export type ChildDevelopment = {
  climbsStairs: YesNoDetail;
  movesIndependently: YesNoDetail;
  jumpsWithBothFeet: YesNoDetail;
  transfersObjectsBetweenHands: YesNoDetail;
  fitsObjectsTogether: YesNoDetail;
  pencilGrip: YesNoDetail;
  exploresToys: YesNoDetail;
  assignsFunctionToObjects: YesNoDetail;
  maintainsEyeContactWithObjects: YesNoDetail;
  laterality: {
    "left-hand": boolean;
    "right-hand": boolean;
    ambidextrous: boolean;
  };
};

export type DailyRoutine = {
  morning: string;
  afternoon: string;
  night: string;
};

export type ChildProfile = {
  agitated: boolean;
  calm: boolean;
  insecure: boolean;
  impatient: boolean;
  defiant: boolean;
  details: string;
};

export type SocialInteraction = {
  eyeContact: YesNoDetail;
  interactsWithOthers: YesNoDetail;
  sharedAttention: YesNoDetail;
  followsSimpleCommands: YesNoDetail;
  followsComplexCommands: YesNoDetail;
  attendsParties: YesNoDetail;
  visitsShoppingMalls: YesNoDetail;
  visitsSupermarkets: YesNoDetail;
  cooperativeAtSchool: YesNoDetail;
  usesSpeechToCommunicate: YesNoDetail;
  playsWithOtherChildren: YesNoDetail;
  hitsPeers: YesNoDetail;
  hitsAdults: YesNoDetail;
  childProfile: ChildProfile;
};

export type BehavioralManifestations = {
  difficultyMakingFriends: YesNoDetail;
  criesToGetWhatTheyWant: boolean;
  criesWhenDenied: YesNoDetail;
  comfortableAwayFromParents: YesNoDetail;
  needsExtraStimulation: YesNoDetail;
  solitaryBehavior: YesNoDetail;
  adaptsToRoutineChanges: YesNoDetail;
  repetitiveBehaviors: YesNoDetail;
  selfHarm: YesNoDetail;
  notes: string;
};

export type Education = {
  attendsSchool: YesNoDetail;
  schoolName: string;
  grade: string;
  supportTeacher: YesNoDetail;
  participatesInActivities: YesNoDetail;
  goodPeerRelationships: YesNoDetail;
};

export type RecognitionSkills = {
  objects: YesNoDetail;
  animals: YesNoDetail;
  colors: YesNoDetail;
  numbers: YesNoDetail;
  shapes: YesNoDetail;
  letters: YesNoDetail;
  readingWriting: YesNoDetail;
};

export type FamilyDynamics = {
  hasSiblings: YesNoDetail & { age: string };
  livesWith: string;
  sleepsAlone: YesNoDetail;
  sleepQuality: string;
  favoriteToysAndGames: string;
  playsWith: string;
  hyperfocus: string;
};

export type Hygiene = {
  wearsDiapers: YesNoDetail;
  bladderControl: YesNoDetail;
  asksToUseBathroom: YesNoDetail;
  performsIntimateHygiene: YesNoDetail;
  washesHands: YesNoDependency;
  usesSoap: YesNoDetail & { liquid: boolean };
  playsWithWater: YesNoDetail;
  driesHands: YesNoDependency;
  brushesTeeth: YesNoDependency;
  knowsWhereToothbrushIs: YesNoDetail;
  appliesToothpaste: YesNoDependency;
  cleansMouthProperly: YesNoDependency;
  combsHair: YesNoDependency;
  allowsNailCutting: YesNoDetail;
  allowsHaircuts: YesNoDetail;
  notes: string;
};

export type Bathing = {
  likesTakeBath: YesNoDetail;
  takesBathAlone: YesNoDependency;
  soapsEveryPartOfTheBody: YesNoDependency;
  notes: string;
};

export type Dressing = {
  helpsDress: YesNoDetail;
  helpsUndress: YesNoDetail;
  wearsSleevedShirts: YesNoDetail;
  wearsButtonedShirts: YesNoDetail;
  handlesZippersAndVelcro: YesNoDependency;
  wearsUnderwear: YesNoDependency;
  wearsShortsOrPants: YesNoDependency;
  putsOnAndTakesOffSocks: YesNoDependency;
  handlesShoes: YesNoDependency;
  notes: string;
};

export type Feeding = {
  pickyEater: YesNoDetail;
  eatsEveryTypeOfFood: {
    solid: boolean;
    pureed: boolean;
    liquid: boolean;
  };
  usesBottle: YesNoDetail;
  feedsThemselves: YesNoDetail;
  usesUtensils: {
    fork: boolean;
    knife: boolean;
    spoon: boolean;
  };
  chewsFood: YesNoDetail;
  usesCup: YesNoDetail;
  eatsWithFamily: YesNoDetail;
  mealSetting: string;
  usesScreensDuringMeals: YesNoDetail;
  notes: string;
};

export type DailyLivingActivities = {
  hygiene: Hygiene;
  bathing: Bathing;
  dressing: Dressing;
  feeding: Feeding;
};

export type MotorSkills = {
  grabsAndReleasesObjects: YesNoDetail;
  screwsAndUnscrews: YesNoDetail;
  tearsPaper: YesNoDetail;
  throwsObjects: YesNoDetail;
  usesScissors: YesNoDetail;
};

export type SensoryPerception = {
  sensitiveToNoise: YesNoDetail;
  imitatesSounds: YesNoDetail;
  sensitiveToLights: YesNoDetail;
  staresAtSpinningObjects: YesNoDetail;
};

export type ProprioceptionAndVestibular = {
  likesTightHugs: YesNoDetail;
  dislikesTightClothes: YesNoDetail;
  enjoysSwingingOrRocking: YesNoDetail;
  spinsAroundByThemselves: YesNoDetail;
  bumpsIntoObjectsOrPeople: YesNoDetail;
};

export type TactilePerception = {
  respondsToCaresses: YesNoDetail;
  identifiesPainLocation: YesNoDetail;
  walksOnTiptoes: YesNoDetail;
  avoidsDirt: YesNoDetail;
  reactsAggressivelyToTouch: YesNoDetail;
};

export type ComplementaryExams = {
  schoolReport: boolean;
  medicalReport: boolean;
  neuropsychologicalAssessment: boolean;
  other: string;
};

export type OccupationalTherapyPlan = {
  goals: string;
  expectedSessions: string;
  procedures: string;
};

export type AdditionalInformation = {
  location: string;
  date: string;
  therapist: string;
};

export type Anamnese = {
  evaluation: Evaluation;
  patientIdentification: PatientIdentification;
  referral: Referral;
  medicalHistory: MedicalHistory;
  pregnancyHistory: PregnancyHistory;
  babyDevelopment: BabyDevelopment;
  childDevelopment: ChildDevelopment;
  dailyRoutine: DailyRoutine;
  socialInteraction: SocialInteraction;
  behavioralManifestations: BehavioralManifestations;
  education: Education;
  recognitionSkills: RecognitionSkills;
  familyDynamics: FamilyDynamics;
  complementaryExams: ComplementaryExams;
  dailyLivingActivities: DailyLivingActivities;
  motorSkills: MotorSkills;
  sensoryPerception: SensoryPerception;
  proprioceptionAndVestibular: ProprioceptionAndVestibular;
  tactilePerception: TactilePerception;
  therapeuticOccupationalDiagnosis: string;
  prognosis: string;
  occupationalTherapyPlan: OccupationalTherapyPlan;
  additionalInformation: AdditionalInformation;
};
