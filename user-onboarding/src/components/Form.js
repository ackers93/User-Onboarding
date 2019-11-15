import React, { useState, useEffect } from "react";
import { withFormik, Form, Field } from "formik";
import * as Yup from "yup";
import axios from "axios";

const UserForm = ({ values, errors, touched, status }) => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        status && setUsers(users => [...users, status]);
    }, [status]);

    return (
        <div className="user-form">
            <Form>
                <Field type="text" name="name" placeholder="name" />
                {touched.name && errors.name && (
                    <p className="errors">{errors.name}</p>
                )}
                <Field type="text" name="email" placeholder="email" />
                {touched.email && errors.email && (<p className="errors">{errors.email}</p>)}

                <Field type="text" name="password" placeholder="password" />
                {touched.password && errors.password && (<p className="errors">{errors.password}</p>)}

                <label className="checkbox-container">
                    Terms Of Service
          <Field required type="checkbox" name="terms" checked={values.terms} />
                    <span className="checkmark" />
                </label>
                <Field as="button" type="submit" name="submit">Submit!</Field>
            </Form>
            {users.map(u => (
                <ul key={u.id}>
                    <li>Name: {u.name}</li>
                    <li>Email: {u.email}</li>
                </ul>
            ))}
        </div>
    );
};
const FormikUserForm = withFormik({
    mapPropsToValues({ name, email, password, terms }) {
        return {
            name: name || "",
            email: email || "",
            password: password || "",
            terms: terms || false
        };
    },
    validationSchema: Yup.object().shape({
        name: Yup.string().required(),
        email: Yup.string().required(),
        password: Yup.string().required()
    }),
    handleSubmit(values, { setStatus }) {
        // values is our object with all our data on it
        axios
            .post("https://reqres.in/api/users/", values)
            .then(res => {
                setStatus(res.data);
                console.log(res);
            })
            .catch(err => console.log(err.response));
    }
})(UserForm);
export default FormikUserForm;