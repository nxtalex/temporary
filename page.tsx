import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import RegisterPreview from "./register-preview";
import { countriesArray } from "./countries-array";
import { Switch } from "@/components/ui/switch";
import { Label } from "./ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Iprops {
  name: string;
  email: string;
  nextPage: () => void;
}

export default function profileSetup1(props: Iprops) {
  const schema = z.object({
    username: z.union([
      z.string().length(0, "Your username must be at least 4 characters long"),
      z.string().min(4),
    ]),

    gender: z.enum(["Male", "Female", "Gender not specified"]).optional(),
    country: z
      .enum([
        "Afghanistan",
        "Albania",
        "Algeria",
        "Andorra",
        "Angola",
        "Argentina",
        "Armenia",
        "Australia",
        "Austria",
        "Azerbaijan",
        "Bahamas",
        "Bahrain",
        "Bangladesh",
        "Barbados",
        "Belarus",
        "Belgium",
        "Belize",
        "Benin",
        "Bhutan",
        "Bolivia",
        "Bosnia and Herzegovina",
        "Botswana",
        "Brazil",
        "Brunei",
        "Bulgaria",
        "Burkina Faso",
        "Burundi",
        "Cambodia",
        "Cameroon",
        "Canada",
        "Cape Verde",
        "Central African Republic",
        "Chad",
        "Chile",
        "China",
        "Colombia",
        "Comoros",
        "Republic of the Congo",
        "Democratic Republic of the Congo",
        "Costa Rica",
        "Croatia",
        "Cuba",
        "Cyprus",
        "Czech Republic",
        "Denmark",
        "Djibouti",
        "Dominica",
        "Dominican Republic",
        "Ecuador",
        "Egypt",
        "El Salvador",
        "Equatorial Guinea",
        "Eritrea",
        "Estonia",
        "Ethiopia",
        "Fiji",
        "Finland",
        "France",
        "Gabon",
        "Gambia",
        "Georgia",
        "Germany",
        "Ghana",
        "Greece",
        "Grenada",
        "Guatemala",
        "Guinea",
        "Guinea-Bissau",
        "Guyana",
        "Haiti",
        "Honduras",
        "Hungary",
        "Iceland",
        "India",
        "Indonesia",
        "Iran",
        "Iraq",
        "Ireland",
        "Israel",
        "Italy",
        "Jamaica",
        "Japan",
        "Jordan",
        "Kazakhstan",
        "Kenya",
        "Kiribati",
        "Kuwait",
        "Kyrgyzstan",
        "Laos",
        "Latvia",
        "Lebanon",
        "Lesotho",
        "Liberia",
        "Libya",
        "Liechtenstein",
        "Lithuania",
        "Luxembourg",
        "North Macedonia",
        "Madagascar",
        "Malawi",
        "Malaysia",
        "Maldives",
        "Mali",
        "Malta",
        "Marshall Islands",
        "Mauritania",
        "Mauritius",
        "Mexico",
        "Micronesia",
        "Moldova",
        "Monaco",
        "Mongolia",
        "Montenegro",
        "Morocco",
        "Mozambique",
        "Myanmar",
        "Namibia",
        "Nauru",
        "Nepal",
        "Netherlands",
        "New Zealand",
        "Nicaragua",
        "Niger",
        "Nigeria",
        "North Korea",
        "Norway",
        "Oman",
        "Pakistan",
        "Palau",
        "Panama",
        "Papua New Guinea",
        "Paraguay",
        "Peru",
        "Philippines",
        "Poland",
        "Portugal",
        "Qatar",
        "Romania",
        "Russia",
        "Rwanda",
        "Saint Kitts and Nevis",
        "Saint Lucia",
        "Saint Vincent and the Grenadines",
        "Samoa",
        "San Marino",
        "Sao Tome and Principe",
        "Saudi Arabia",
        "Senegal",
        "Serbia",
        "Seychelles",
        "Sierra Leone",
        "Singapore",
        "Slovakia",
        "Slovenia",
        "Solomon Islands",
        "Somalia",
        "South Africa",
        "South Korea",
        "South Sudan",
        "Spain",
        "Sri Lanka",
        "Sudan",
        "Suriname",
        "Sweden",
        "Switzerland",
        "Syria",
        "Taiwan",
        "Tajikistan",
        "Tanzania",
        "Thailand",
        "Timor-Leste",
        "Togo",
        "Tonga",
        "Trinidad and Tobago",
        "Tunisia",
        "Turkey",
        "Turkmenistan",
        "Tuvalu",
        "Uganda",
        "Ukraine",
        "United Arab Emirates",
        "United Kingdom",
        "United States",
        "Uruguay",
        "Uzbekistan",
        "Vanuatu",
        "Vatican City",
        "Venezuela",
        "Vietnam",
        "Yemen",
        "Zambia",
        "Zimbabwe",
        "Country not specified",
      ])
      .optional(),
    showName: z.boolean().optional(),
    showEmail: z.boolean().optional(),
  });

  type FormType = z.infer<typeof schema>;

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
    watch,
    getValues,
  } = useForm<FormType>({
    mode: "all",
    reValidateMode: "onChange",
    resolver: zodResolver(schema),
    defaultValues: {
      username: "",
      gender: "Gender not specified",
      country: "Country not specified",
      showName: true,
      showEmail: false,
    },
  });

  const watchUsername = watch("username");
  const watchGender = watch("gender");
  const watchCountry = watch("country");
  const watchShowName = watch("showName");
  const watchShowEmail = watch("showEmail");
  const {
    onChange: onGenderChange,
    ref: refGender,
    ...selectGender
  } = register("gender");
  const {
    onChange: onShowNameChange,
    ref: refShowName,
    ...selectShowName
  } = register("showName");
  const {
    onChange: onShowEmailChange,
    ref: refShowEmail,
    ...selectShowEmail
  } = register("showEmail");
  const {
    onChange: onCountryChange,
    ref: refCountry,
    ...selectCountry
  } = register("country");

  function submit() {
    localStorage.setItem("username", watchUsername!);
    localStorage.setItem("gender", watchGender!);
    localStorage.setItem("country", watchCountry!);
    props.nextPage();
  }

  return (
    <div>
      <div className="justify mt-12 flex flex-row">
        <div className="mr-12 h-full flex-1">
          <form className="tutorial gap-2" onSubmit={handleSubmit(submit)}>
            <div className="mb-4">
              <label
                className={` text-sm ${errors.username && "text-red-800"}`}
              >
                Username
              </label>
              <input
                {...register("username")}
                maxLength={20}
                type="text"
                className="my-1 h-12 w-full rounded-md border border-secondary bg-transparent pl-3 text-sm outline-none focus-visible:border-primary"
              />
              {errors.username && (
                <div className="text-[13px] text-red-800">
                  {errors.username.message}
                </div>
              )}
            </div>
            <div className="mb-4">
              <label className={`text-sm ${errors.gender && "text-red-800"}`}>
                Gender
              </label>

              <Select
                {...selectGender}
                onValueChange={(value) =>
                  onGenderChange({
                    target: { name: selectGender.name, value },
                  })
                }
                defaultValue={getValues("gender")}
              >
                <SelectTrigger className="h-12">
                  <SelectValue placeholder="Click here to open the dropdown" />
                </SelectTrigger>
                <SelectContent ref={refGender}>
                  <SelectItem value="Gender not specified">
                    Do not specify
                  </SelectItem>
                  <SelectItem value="Male">Male</SelectItem>
                  <SelectItem value="Female">Female</SelectItem>
                </SelectContent>
              </Select>

              {errors.gender && (
                <div className="text-[13px] text-red-800">
                  {errors.gender.message}
                </div>
              )}
            </div>
            <div className="mb-4">
              <label className={`text-sm ${errors.country && "text-red-800"}`}>
                Country
              </label>
              <Select
                {...selectCountry}
                onValueChange={(value) =>
                  onCountryChange({
                    target: { name: selectCountry.name, value },
                  })
                }
                defaultValue={getValues("country")}
              >
                <SelectTrigger className="h-12">
                  <SelectValue placeholder="Click here to open the dropdown" />
                </SelectTrigger>
                <SelectContent ref={refCountry}>
                  <SelectItem value="Country not specified">
                    Do not specify
                  </SelectItem>
                  {countriesArray.map((item) => (
                    <SelectItem key={item} value={item}>
                      {item}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.country && (
                <div className="text-[13px] text-red-800">
                  {errors.country.message}
                </div>
              )}
            </div>
            <div className="my-8 flex items-center space-x-2">
              <Switch id="showName" />
              <Label htmlFor="show-name">Make real name public</Label>
            </div>
            <div className="my-8 flex items-center space-x-2">
              <Switch id="showEmail" />
              <Label htmlFor="show-email">Make email public</Label>
            </div>

            <div className="flex flex-row">
              <Button type="submit" disabled className=" mr-2 w-full">
                {isSubmitting ? "Loading..." : "Back"}
              </Button>
              <Button
                type="submit"
                disabled={isSubmitting}
                className="ml-2 w-full"
              >
                {isSubmitting ? "Loading..." : "Continue"}
              </Button>
            </div>
            {errors.root && (
              <div className="text-red-500">{errors.root.message}</div>
            )}
          </form>
        </div>
        <div className="mr-12 flex h-full flex-1 justify-center">
          <div className="w-fit">
            <h1 className="mb-6 text-start text-2xl font-bold">Preview</h1>
            <RegisterPreview
              name={`${props.name}`}
              email={`${props.email}`}
              username={`${watchUsername}`}
              gender={`${watchGender}`}
              country={`${watchCountry}`}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
