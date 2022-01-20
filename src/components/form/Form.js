import React from "react";
import { useForm } from "react-hook-form";
import "./Form.scss";


// mise en place du formulaire pour le login et le signup
function Form(props) {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    return (
        <form
            onSubmit={handleSubmit((data) => {
                props.sending(data);
            })}
            id="user_form"
            method="post"
        >
            {props.displayPseudo && (
                <div>
                    <label htmlFor="pseudo">Pseudo</label>
                    <input
                        {...register("pseudo", {
                            required: "Merci de compléter ce champ svp",
                            minLength: {
                                value: 4,
                                message: "longueur minimal de 4 caractères",
                            },
                        })}
                        type="text"
                        id="pseudo"
                        name="pseudo"
                        pattern="[A-Za-z]{4,12}"
                    />
                    {errors.pseudo && <p>{errors.pseudo.message}</p>}
                </div>
            )}
            <div>
                <label htmlFor="email">Email</label>
                <input
                    {...register("email", {
                        required: "Merci de compléter ce champ svp",
                    })}
                    type="email"
                    id="email"
                    name="email"
                    pattern="[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+"
                />
                {errors.email && <p>{errors.email.message}</p>}
            </div>
            <div>
                <label htmlFor="password">Mot de passe</label>
                <input
                    {...register("password", {
                        required: "Merci de compléter ce champ svp",
                        minLength: {
                            value: 6,
                            message:
                                "8 caractères minimum avec au moins 1 minuscule, 1 majuscule et 1 nombre",
                        },
                    })}
                    type="password"
                    id="password"
                    name="password"
                    pattern="^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,16}$"
                    title="le mot de passe doit contenir entre 8 et 16 lettres mini, au moins 1 minuscule, 1 majuscule et 1 chiffre"
                />
                {errors.password && <p>{errors.password.message}</p>}
            </div>
        </form>
    );
}

export default Form;


// password must contain 1 number (0-9)
// password must contain 1 uppercase letters
// password must contain 1 lowercase letters
// password is 8-16 characters with no space