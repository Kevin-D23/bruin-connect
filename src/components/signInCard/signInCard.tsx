"use client";
import styles from "./signInCard.module.scss";
import Image from "next/image";
import signInImage from "../../assets/images/signInImage.png";
import Logo from "@/components/logo/logo";
import { SignIn } from "@/app/api/auth/actions";
import google from "../../assets/icons/google.png";
import { useEffect, useState } from "react";
import Select, { SingleValue } from "react-select";
import { SignOut } from "@/app/api/auth/actions";
import { useRouter } from "next/navigation";

const majorOptions = [
  { value: "undeclared", label: "Undeclared" },
  { value: "aerospace_engineering", label: "Aerospace Engineering" },
  { value: "african_american_studies", label: "African American Studies" },
  {
    value: "african_and_middle_eastern_studies",
    label: "African and Middle Eastern Studies",
  },
  { value: "american_indian_studies", label: "American Indian Studies" },
  {
    value: "american_literature_and_culture",
    label: "American Literature and Culture",
  },
  {
    value: "ancient_near_east_and_egyptology",
    label: "Ancient Near East and Egyptology",
  },
  { value: "anthropology", label: "Anthropology" },
  { value: "architectural_studies", label: "Architectural Studies" },
  { value: "art", label: "Art" },
  { value: "art_history", label: "Art History" },
  { value: "asian_american_studies", label: "Asian American Studies" },
  { value: "asian_humanities", label: "Asian Humanities" },
  {
    value: "asian_languages_and_linguistics",
    label: "Asian Languages and Linguistics",
  },
  { value: "asian_religions", label: "Asian Religions" },
  { value: "asian_studies", label: "Asian Studies" },
  { value: "astrophysics", label: "Astrophysics" },
  {
    value: "atmospheric_and_oceanic_sciences",
    label: "Atmospheric and Oceanic Sciences",
  },
  {
    value: "atmospheric_and_oceanic_sciences_mathematics",
    label: "Atmospheric and Oceanic Sciences/Mathematics",
  },
  { value: "biochemistry", label: "Biochemistry" },
  { value: "bioengineering", label: "Bioengineering" },
  { value: "biology", label: "Biology" },
  { value: "biophysics", label: "Biophysics" },
  { value: "business_economics", label: "Business Economics" },
  {
    value: "central_and_east_european_languages_and_cultures",
    label: "Central and East European Languages and Cultures",
  },
  { value: "chemical_engineering", label: "Chemical Engineering" },
  { value: "chemistry", label: "Chemistry" },
  {
    value: "chemistry_materials_science",
    label: "Chemistry/Materials Science",
  },
  {
    value: "chicana_and_chicano_studies",
    label: "Chicana and Chicano Studies",
  },
  { value: "chinese", label: "Chinese" },
  { value: "civil_engineering", label: "Civil Engineering" },
  { value: "classical_civilization", label: "Classical Civilization" },
  { value: "climate_science", label: "Climate Science" },
  { value: "cognitive_science", label: "Cognitive Science" },
  { value: "communication", label: "Communication" },
  { value: "comparative_literature", label: "Comparative Literature" },
  {
    value: "computational_and_systems_biology",
    label: "Computational and Systems Biology",
  },
  { value: "computer_engineering", label: "Computer Engineering" },
  { value: "computer_science", label: "Computer Science" },
  {
    value: "computer_science_and_engineering",
    label: "Computer Science and Engineering",
  },
  { value: "dance", label: "Dance" },
  { value: "data_theory", label: "Data Theory" },
  { value: "design_media_arts", label: "Design | Media Arts" },
  { value: "disability_studies", label: "Disability Studies" },
  {
    value: "earth_and_environmental_science",
    label: "Earth and Environmental Science",
  },
  {
    value: "ecology_behavior_and_evolution",
    label: "Ecology, Behavior, and Evolution",
  },
  { value: "economics", label: "Economics" },
  {
    value: "education_and_social_transformation",
    label: "Education and Social Transformation",
  },
  { value: "electrical_engineering", label: "Electrical Engineering" },
  { value: "english", label: "English" },
  { value: "environmental_science", label: "Environmental Science" },
  {
    value: "european_language_and_transcultural_studies",
    label: "European Language and Transcultural Studies",
  },
  { value: "film_and_television", label: "Film and Television" },
  { value: "gender_studies", label: "Gender Studies" },
  { value: "geography", label: "Geography" },
  {
    value: "geography_environmental_studies",
    label: "Geography/Environmental Studies",
  },
  { value: "geology", label: "Geology" },
  {
    value: "geology_engineering_geology",
    label: "Geology/Engineering Geology",
  },
  { value: "geophysics", label: "Geophysics" },
  { value: "global_jazz_studies", label: "Global Jazz Studies" },
  { value: "global_studies", label: "Global Studies" },
  { value: "history", label: "History" },
  { value: "human_biology_and_society", label: "Human Biology and Society" },
  {
    value: "individual_field_of_concentration",
    label: "Individual Field of Concentration",
  },
  {
    value: "international_development_studies",
    label: "International Development Studies",
  },
  { value: "iranian_studies", label: "Iranian Studies" },
  { value: "japanese", label: "Japanese" },
  { value: "jewish_studies", label: "Jewish Studies" },
  { value: "korean", label: "Korean" },
  { value: "labor_studies", label: "Labor Studies" },
  { value: "latin", label: "Latin" },
  { value: "latin_american_studies", label: "Latin American Studies" },
  { value: "linguistics", label: "Linguistics" },
  {
    value: "linguistics_and_anthropology",
    label: "Linguistics and Anthropology",
  },
  {
    value: "linguistics_and_asian_languages_and_cultures",
    label: "Linguistics and Asian Languages and Cultures",
  },
  {
    value: "linguistics_and_computer_science",
    label: "Linguistics and Computer Science",
  },
  { value: "linguistics_and_english", label: "Linguistics and English" },
  {
    value: "linguistics_and_philosophy",
    label: "Linguistics and Philosophy",
  },
  {
    value: "linguistics_and_psychology",
    label: "Linguistics and Psychology",
  },
  { value: "linguistics_and_spanish", label: "Linguistics and Spanish" },
  { value: "linguistics_applied", label: "Linguistics, Applied" },
  { value: "marine_biology", label: "Marine Biology" },
  { value: "materials_engineering", label: "Materials Engineering" },
  { value: "mathematics", label: "Mathematics" },
  { value: "mathematics_applied", label: "Mathematics, Applied" },
  {
    value: "mathematics_applied_science",
    label: "Mathematics/Applied Science",
  },
  { value: "mathematics_economics", label: "Mathematics/Economics" },
  {
    value: "mathematics_financial_actuarial",
    label: "Mathematics, Financial Actuarial",
  },
  { value: "mathematics_for_teaching", label: "Mathematics for Teaching" },
  {
    value: "mathematics_of_computation",
    label: "Mathematics of Computation",
  },
  { value: "mechanical_engineering", label: "Mechanical Engineering" },
  {
    value: "microbiology_immunology_and_molecular_genetics",
    label: "Microbiology, Immunology, and Molecular Genetics",
  },
  { value: "middle_eastern_studies", label: "Middle Eastern Studies" },
  {
    value: "molecular_cell_and_developmental_biology",
    label: "Molecular, Cell, and Developmental Biology",
  },
  { value: "music_composition", label: "Music Composition" },
  { value: "music_education", label: "Music Education" },
  { value: "music_industry", label: "Music Industry" },
  { value: "musicology", label: "Musicology" },
  { value: "nursing_prelicensure", label: "Nursing - Prelicensure" },
  { value: "neuroscience", label: "Neuroscience" },
  { value: "philosophy", label: "Philosophy" },
  { value: "physics", label: "Physics" },
  { value: "physiological_science", label: "Physiological Science" },
  { value: "political_science", label: "Political Science" },
  {
    value: "portuguese_and_brazilian_studies",
    label: "Portuguese and Brazilian Studies",
  },
  { value: "psychobiology", label: "Psychobiology" },
  { value: "psychology", label: "Psychology" },
  { value: "public_affairs", label: "Public Affairs" },
  { value: "religion", label: "Religion" },
  {
    value: "russian_language_and_literature",
    label: "Russian Language and Literature",
  },
  { value: "russian_studies", label: "Russian Studies" },
  { value: "scandinavian", label: "Scandinavian" },
  { value: "sociology", label: "Sociology" },
  { value: "south_asian", label: "South Asian" },
  { value: "spanish", label: "Spanish" },
  { value: "statistics", label: "Statistics" },
  { value: "theater", label: "Theater" },
  { value: "world_arts_and_cultures", label: "World Arts and Cultures" },
];

const pronounOptions = [
  { value: "he_him", label: "He/Him" },
  { value: "she_her", label: "She/Her" },
  { value: "they_them", label: "They/Them" },
  { value: "he_they", label: "He/They" },
  { value: "she_they", label: "She/They" },
  { value: "xe_xem", label: "Xe/Xem" },
  { value: "ze_zie_hir", label: "Ze/Zie/Hir" },
  { value: "ey_em", label: "Ey/Em" },
  { value: "ve_ver", label: "Ve/Ver" },
  { value: "fae_faer", label: "Fae/Faer" },
  { value: "per_per", label: "Per/Per" },
  { value: "null", label: "None" },
];

// formats email to hidden email
function formatEmail(email: String) {
  // Split the email into username and domain
  const [username, domain] = email?.split("@");

  // Replace characters in the username with asterisks
  const formattedUsername = username.slice(0, 3) + "****";

  // Return the formatted email
  return `${formattedUsername}@${domain}`;
}

type PageProps = {
  pageName: String;
  userId?: String;
  email?: String | undefined | null;
};

// Type for select options
type OptionType = {
  value: string;
  label: string;
};

export default function SignInCard({ pageName, userId, email }: PageProps) {
  const [formData, setFormData] = useState({
    user_id: userId,
    email: email,
    first_name: "",
    last_name: "",
    major: "",
    pronouns: "",
  });
  const [validForm, setValidForm] = useState(false);
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const [registrationError, setRegistrationError] = useState(false);
  const router = useRouter();

  // POST request to create account
  async function handleSubmit(e: React.SyntheticEvent<HTMLFormElement>) {
    e.preventDefault();

    if (checkForm()) {
      try {
        const response = await fetch("http://localhost:8000/api/user", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });
        if (!response.ok) {
          console.error("Registration response was not ok");
        }
        console.log(response);
        if (response?.status == 200) {
          if (await response.json()) router.push("/");
        } else {
          setErrorMessage("** Error creating account");
        }
      } catch (error) {
        console.error("Error completing registration:", error);
      }
    } else {
      setErrorMessage("* Must complete all fields!");
    }
  }

  // Updates formData per key input
  function handleInput(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  }

  // Updates formData on select
  function handleSelect(e: SingleValue<OptionType>, name: string) {
    setFormData((prevState) => ({
      ...prevState,
      [name]: e?.value,
    }));
  }

  // Checks if form is valid/complete
  function checkForm() {
    if (
      formData.first_name &&
      formData.last_name &&
      formData.major &&
      formData.pronouns
    )
      return true;
    return false;
  }

  // Checks to see if component is mounted so the 'document' can be used
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    setValidForm(checkForm());
  }, [formData]);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <div className={styles.container}>
      <Image
        className={styles.image}
        src={signInImage}
        width={0}
        height={0}
        alt="bruin flags"
      />
      <div className={styles.formContainer}>
        <Logo className={styles.logo} />

        {pageName == "signIn" && (
          <div className={styles.btnContainer}>
            <button className={styles.googleBtn} onClick={() => SignIn()}>
              <Image src={google} width={30} height={30} alt="google" />
              Sign in with Google
            </button>
          </div>
        )}
        {pageName == "register" && (
          <form onSubmit={handleSubmit} className={styles.form}>
            <div>
              {errorMessage && (
                <div className={styles.error}>
                  <p>{errorMessage}</p>
                </div>
              )}
              <input
                className={styles.input}
                name="first_name"
                placeholder="First Name"
                onChange={(e) => handleInput(e)}
              />
              <input
                className={styles.input}
                name="last_name"
                placeholder="Last Name"
                onChange={(e) => handleInput(e)}
              />
              <Select
                className={styles.select}
                isSearchable={true}
                options={majorOptions}
                instanceId={"searchMajor"}
                name="major"
                placeholder="Major"
                onChange={(e) => handleSelect(e, "major")}
                menuPortalTarget={isMounted ? document.body : null}
                styles={{
                  control: (base) => ({
                    ...base,
                    height: "2.5rem",
                    border: "1px solid rgba(0,0,0,.1)",
                  }),
                }}
              />
              <Select
                className={styles.select}
                options={pronounOptions}
                placeholder="Pronouns"
                instanceId={"pronouns"}
                name="pronouns"
                onChange={(e) => handleSelect(e, "pronouns")}
                menuPortalTarget={isMounted ? document.body : null}
                styles={{
                  control: (base) => ({
                    ...base,
                    height: "2.5rem",
                    border: "1px solid rgba(0,0,0,.1)",
                  }),
                }}
              />
              <a
                className={styles.help}
                href={'mailto:nothing@gmail.com'}
              >
                Need help
              </a>
            </div>
            <div className={styles.btnContainer}>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  SignOut("/signIn");
                }}
              >
                Back
              </button>
              <button type="submit" className={validForm ? styles.active : ""}>
                Create
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
