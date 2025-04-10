// src/lib/store.ts
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Anamnese } from "./types";

// Função para criar uma anamnese vazia
export const createEmptyAnamnese = (): Anamnese => {
  const emptyYesNoDetail = { yes: false, details: "" };
  const emptyYesNoMonths = { yes: false, months: "" };
  const emptyDependencyLevel = {
    dependent: false,
    semiDependent: false,
    independent: false,
  };
  const emptyYesNoDependency = {
    yes: false,
    details: "",
    dependencyLevel: emptyDependencyLevel,
  };

  return {
    evaluation: {
      evaluationDate: "",
      weekDay: "",
      time: "",
    },
    patientIdentification: {
      name: "",
      dateOfBirth: "",
      age: "",
      placeOfBirth: "",
      address: "",
      phone: "",
      cityDistrict: "",
      father: {
        name: "",
        age: "",
        profession: "",
      },
      mother: {
        name: "",
        age: "",
        profession: "",
      },
    },
    referral: {
      diagnosis: "",
      responsibleDoctor: "",
      currentMedication: "",
      mainComplaint: "",
      followUps: {
        speechTherapy: emptyYesNoDetail,
        psychological: emptyYesNoDetail,
        psychopedagogy: emptyYesNoDetail,
        physiotherapy: emptyYesNoDetail,
        musicTherapy: emptyYesNoDetail,
        nutrition: emptyYesNoDetail,
        artTherapy: emptyYesNoDetail,
        occupationalTherapy: emptyYesNoDetail,
        otherTherapies: emptyYesNoDetail,
      },
    },
    medicalHistory: {
      previousTreatments: emptyYesNoDetail,
      rehabilitation: emptyYesNoDetail,
      familyHistory: emptyYesNoDetail,
      hospitalizations: emptyYesNoDetail,
      surgeries: emptyYesNoDetail,
      seizures: emptyYesNoDetail,
      stereotypy: emptyYesNoDetail,
      respiratoryIssues: emptyYesNoDetail,
      heartConditions: emptyYesNoDetail,
      echolalia: emptyYesNoDetail,
      visualImpairment: emptyYesNoDetail,
      hearingImpairment: emptyYesNoDetail,
    },
    pregnancyHistory: {
      plannedPregnancy: emptyYesNoDetail,
      wantedPregnancy: emptyYesNoDetail,
      prenatalCare: emptyYesNoDetail,
      deliveryType: {
        normal: false,
        cSection: false,
      },
      gestationalWeeks: "",
      pregnancyComplications: "",
      neonatalPeriod: "",
      breastfeedingDuration: emptyYesNoDetail,
    },
    babyDevelopment: {
      headControl: emptyYesNoMonths,
      rolledOver: emptyYesNoMonths,
      crawled: emptyYesNoMonths,
      satUp: emptyYesNoMonths,
      walked: emptyYesNoMonths,
      spoke: emptyYesNoMonths,
    },
    childDevelopment: {
      climbsStairs: emptyYesNoDetail,
      movesIndependently: emptyYesNoDetail,
      jumpsWithBothFeet: emptyYesNoDetail,
      transfersObjectsBetweenHands: emptyYesNoDetail,
      fitsObjectsTogether: emptyYesNoDetail,
      pencilGrip: emptyYesNoDetail,
      exploresToys: emptyYesNoDetail,
      assignsFunctionToObjects: emptyYesNoDetail,
      maintainsEyeContactWithObjects: emptyYesNoDetail,
      laterality: {
        "left-hand": false,
        "right-hand": false,
        ambidextrous: false,
      },
    },
    dailyRoutine: {
      morning: "",
      afternoon: "",
      night: "",
    },
    socialInteraction: {
      eyeContact: emptyYesNoDetail,
      interactsWithOthers: emptyYesNoDetail,
      sharedAttention: emptyYesNoDetail,
      followsSimpleCommands: emptyYesNoDetail,
      followsComplexCommands: emptyYesNoDetail,
      attendsParties: emptyYesNoDetail,
      visitsShoppingMalls: emptyYesNoDetail,
      visitsSupermarkets: emptyYesNoDetail,
      cooperativeAtSchool: emptyYesNoDetail,
      usesSpeechToCommunicate: emptyYesNoDetail,
      playsWithOtherChildren: emptyYesNoDetail,
      hitsPeers: emptyYesNoDetail,
      hitsAdults: emptyYesNoDetail,
      childProfile: {
        agitated: false,
        calm: false,
        insecure: false,
        impatient: false,
        defiant: false,
        details: "",
      },
    },
    behavioralManifestations: {
      difficultyMakingFriends: emptyYesNoDetail,
      criesToGetWhatTheyWant: false,
      criesWhenDenied: emptyYesNoDetail,
      comfortableAwayFromParents: emptyYesNoDetail,
      needsExtraStimulation: emptyYesNoDetail,
      solitaryBehavior: emptyYesNoDetail,
      adaptsToRoutineChanges: emptyYesNoDetail,
      repetitiveBehaviors: emptyYesNoDetail,
      selfHarm: emptyYesNoDetail,
      notes: "",
    },
    education: {
      attendsSchool: emptyYesNoDetail,
      schoolName: "",
      grade: "",
      supportTeacher: emptyYesNoDetail,
      participatesInActivities: emptyYesNoDetail,
      goodPeerRelationships: emptyYesNoDetail,
    },
    recognitionSkills: {
      objects: emptyYesNoDetail,
      animals: emptyYesNoDetail,
      colors: emptyYesNoDetail,
      numbers: emptyYesNoDetail,
      shapes: emptyYesNoDetail,
      letters: emptyYesNoDetail,
      readingWriting: emptyYesNoDetail,
    },
    familyDynamics: {
      hasSiblings: { ...emptyYesNoDetail, age: "" },
      livesWith: "",
      sleepsAlone: emptyYesNoDetail,
      sleepQuality: "",
      favoriteToysAndGames: "",
      playsWith: "",
      hyperfocus: "",
    },
    complementaryExams: {
      schoolReport: false,
      medicalReport: false,
      neuropsychologicalAssessment: false,
      other: "",
    },
    dailyLivingActivities: {
      hygiene: {
        wearsDiapers: emptyYesNoDetail,
        bladderControl: emptyYesNoDetail,
        asksToUseBathroom: emptyYesNoDetail,
        performsIntimateHygiene: emptyYesNoDetail,
        washesHands: emptyYesNoDependency,
        usesSoap: { ...emptyYesNoDetail, liquid: false },
        playsWithWater: emptyYesNoDetail,
        driesHands: emptyYesNoDependency,
        brushesTeeth: emptyYesNoDependency,
        knowsWhereToothbrushIs: emptyYesNoDetail,
        appliesToothpaste: emptyYesNoDependency,
        cleansMouthProperly: emptyYesNoDependency,
        combsHair: emptyYesNoDependency,
        allowsNailCutting: emptyYesNoDetail,
        allowsHaircuts: emptyYesNoDetail,
        notes: "",
      },
      bathing: {
        likesTakeBath: emptyYesNoDetail,
        takesBathAlone: emptyYesNoDependency,
        soapsEveryPartOfTheBody: emptyYesNoDependency,
        notes: "",
      },
      dressing: {
        helpsDress: emptyYesNoDetail,
        helpsUndress: emptyYesNoDetail,
        wearsSleevedShirts: emptyYesNoDetail,
        wearsButtonedShirts: emptyYesNoDetail,
        handlesZippersAndVelcro: emptyYesNoDependency,
        wearsUnderwear: emptyYesNoDependency,
        wearsShortsOrPants: emptyYesNoDependency,
        putsOnAndTakesOffSocks: emptyYesNoDependency,
        handlesShoes: emptyYesNoDependency,
        notes: "",
      },
      feeding: {
        pickyEater: emptyYesNoDetail,
        eatsEveryTypeOfFood: {
          solid: false,
          pureed: false,
          liquid: false,
        },
        usesBottle: emptyYesNoDetail,
        feedsThemselves: emptyYesNoDetail,
        usesUtensils: {
          fork: false,
          knife: false,
          spoon: false,
        },
        chewsFood: emptyYesNoDetail,
        usesCup: emptyYesNoDetail,
        eatsWithFamily: emptyYesNoDetail,
        mealSetting: "",
        usesScreensDuringMeals: emptyYesNoDetail,
        notes: "",
      },
    },
    motorSkills: {
      grabsAndReleasesObjects: emptyYesNoDetail,
      screwsAndUnscrews: emptyYesNoDetail,
      tearsPaper: emptyYesNoDetail,
      throwsObjects: emptyYesNoDetail,
      usesScissors: emptyYesNoDetail,
    },
    sensoryPerception: {
      sensitiveToNoise: emptyYesNoDetail,
      imitatesSounds: emptyYesNoDetail,
      sensitiveToLights: emptyYesNoDetail,
      staresAtSpinningObjects: emptyYesNoDetail,
    },
    proprioceptionAndVestibular: {
      likesTightHugs: emptyYesNoDetail,
      dislikesTightClothes: emptyYesNoDetail,
      enjoysSwingingOrRocking: emptyYesNoDetail,
      spinsAroundByThemselves: emptyYesNoDetail,
      bumpsIntoObjectsOrPeople: emptyYesNoDetail,
    },
    tactilePerception: {
      respondsToCaresses: emptyYesNoDetail,
      identifiesPainLocation: emptyYesNoDetail,
      walksOnTiptoes: emptyYesNoDetail,
      avoidsDirt: emptyYesNoDetail,
      reactsAggressivelyToTouch: emptyYesNoDetail,
    },
    therapeuticOccupationalDiagnosis: "",
    prognosis: "",
    occupationalTherapyPlan: {
      goals: "",
      expectedSessions: "",
      procedures: "",
    },
    additionalInformation: {
      location: "",
      date: "",
      therapist: "",
    },
  };
};

type AnamneseState = {
  currentAnamnese: Anamnese;
  isAuthenticated: boolean;
  updateAnamnese: (data: Partial<Anamnese>) => void;
  resetAnamnese: () => void;
  setAuthenticated: (value: boolean) => void;
};

export const useAnamneseStore = create<AnamneseState>()(
  persist(
    (set) => ({
      currentAnamnese: createEmptyAnamnese(),
      isAuthenticated: false,
      updateAnamnese: (data) =>
        set((state) => ({
          currentAnamnese: { ...state.currentAnamnese, ...data },
        })),
      resetAnamnese: () =>
        set(() => ({
          currentAnamnese: createEmptyAnamnese(),
        })),
      setAuthenticated: (value) => {
        console.log("Atualizando estado de autenticação:", value);
        set(() => ({
          isAuthenticated: value,
        }));
      },
    }),
    {
      name: "anamnese-storage",
      // Garantir que o armazenamento seja implementado
      storage: {
        getItem: (name) => {
          const str = localStorage.getItem(name);
          if (!str) return null;
          return str;
        },
        setItem: (name, value) => {
          localStorage.setItem(name, value);
        },
        removeItem: (name) => {
          localStorage.removeItem(name);
        },
      },
    }
  )
);
