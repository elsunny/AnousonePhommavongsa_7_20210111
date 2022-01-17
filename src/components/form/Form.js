import React from "react";
import { useForm } from "react-hook-form";
import "./Form.scss";

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
            {props.displayPseudo && 
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
                    />
                    {errors.pseudo && <p>{errors.pseudo.message}</p>}
                </div>
            }
            <div>
                <label htmlFor="email">Email</label>
                <input
                    {...register("email", {
                        required: "Merci de compléter ce champ svp",
                    })}
                    type="email"
                    id="email"
                    name="email"
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
                            message: "8 caractères minimum avec au moins 1 minuscule, 1 majuscule et 1 nombre",
                        },
                    })}
                    type="password"
                    id="password"
                    name="password"
                />
                {errors.password && <p>{errors.password.message}</p>}
            </div>
        </form>
    );
}

export default Form;

