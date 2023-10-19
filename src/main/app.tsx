import { ChangeEvent, FormEvent, useState } from "react";
import "./app.css";
import { PrimaryInput } from "../components/primary-input/primary-input";
// import { PrimaryModal } from "../components/primary-modal/primary-modal";
import { PrimaryButton } from "../components/primary-button/primary-button";
import { userSchema } from "./samplezod";
import { ZodError } from "zod";
import { Cropper } from "../components/cropper/cropper";
import profilePicImg from "../assets/images/profilepic.webp";

interface FormError {
  firstName: string | null;
  lastName: string | null;
  email: string | null;
}

function App() {
  // const [showMdoal, setShowModal] = useState(false);
  const [croppedImage, setCroppedImage] = useState<string | null>(null);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");

  const [formErrors, setFormErrors] = useState<FormError>({
    firstName: null,
    lastName: null,
    email: null,
  });

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    console.log("submit");

    try {
      const user = userSchema.parse({ firstName, lastName, email: email });
      console.log(user, "user");
    } catch (err) {
      if (err instanceof ZodError) {
        console.log(err.errors);
        const errors = err.errors.map((item) => ({
          key: item.path[0].toString(),
          message: item.message,
        }));

        errors.forEach((item) => {
          setFormErrors((prev) => {
            return { ...prev, [item.key]: item.message };
          });
        });
      }
    }
  }

  function onFirstNameChange(e: ChangeEvent<HTMLInputElement>) {
    setFormErrors((prev) => ({ ...prev, firstName: null }));
    setFirstName(e.target.value);
  }

  function onLastNameChange(e: ChangeEvent<HTMLInputElement>) {
    setFormErrors((prev) => ({ ...prev, lastName: null }));
    setLastName(e.target.value);
  }

  function onEmailChange(e: ChangeEvent<HTMLInputElement>) {
    setFormErrors((prev) => ({ ...prev, email: null }));
    setEmail(e.target.value);
  }

  return (
    <div className="App">
      <form onSubmit={handleSubmit}>
        <PrimaryInput
          name="firstName"
          label="First Name"
          placeholder="John"
          type="text"
          value={firstName}
          onChange={onFirstNameChange}
          error={formErrors.firstName || null}
        />

        <PrimaryInput
          name="lastName"
          label="Last Name"
          placeholder="Doe"
          type="text"
          value={lastName}
          onChange={onLastNameChange}
          error={formErrors.lastName || null}
        />

        <PrimaryInput
          name="email"
          label="Email"
          placeholder="johndoe123@gmail.com"
          type="text"
          value={email}
          onChange={onEmailChange}
          error={formErrors.email || null}
        />

        <div>
          <PrimaryButton type="submit" text="signup" showLoader={false} />
        </div>
      </form>

      {/* <div>
        <button onClick={() => setShowModal(true)}>open modal</button>
        <PrimaryModal isOpen={showMdoal} closeModal={() => setShowModal(false)}>
          <div style={{ width: "600px", backgroundColor: "white" }}>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Qui
            eveniet fugit similique magnam, reprehenderit velit omnis quasi
            expedita facilis ipsum neque beatae odit voluptatem corrupti atque
            tenetur quia illum fuga voluptate cum mollitia? Dignissimos nobis
            provident repellendus mollitia quod minus. Numquam quaerat illum
            iure illo, dignissimos cum inventore sapiente ducimus.
          </div>
        </PrimaryModal>
      </div>

      <div>
        <PrimaryButton width="200px" text="BUTTON" showLoader={true} />
      </div>
      <div>
        <PrimaryButton width="200px" text="BUTTON" showLoader={false} />
      </div> */}

      <div style={{ width: "400px" }}>
        <Cropper
          aspectRatio={0.5}
          src={profilePicImg}
          setCroppedImage={setCroppedImage}
        />
      </div>
      <img src={croppedImage || ""} alt="img" />
    </div>
  );
}

export default App;
