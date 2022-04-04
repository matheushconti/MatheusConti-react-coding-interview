import { Button, Input } from 'antd';
import { Formik } from 'formik';
import React from 'react';
import * as Yup from 'yup';
import { Person } from '../../../constants/types';

interface ProfileEditProps {
  save: Function;
  data: Person;
  setShowEdit: Function;
}

const ProfileEdit = ({ save, data, setShowEdit }: ProfileEditProps) => {
  const initialValues: Person = { ...data };
  const validationSchema = Yup.object().shape({
    name: Yup.string().required('This field is required.'),
    email: Yup.string().email('Invalid email format').required('This field is required.'),
    birthday: Yup.string().required('This field is required.'),
    phone: Yup.string().max(50).required('This field is required.'),
    gender: Yup.string().required('This field is required.'),
  });

  const handleFormSubmit = async (values: Person) => {
    try {
      const updatedValues: Partial<Person> = { ...values };
      save(updatedValues);
      console.log('values', values);
    } catch (err) {
      alert(err);
      console.error(err);
    } finally {
      setShowEdit(false);
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleFormSubmit}
    >
      {({ errors, handleBlur, handleChange, handleSubmit, touched, values }) => (
        <form noValidate onSubmit={handleSubmit}>
          <Input
            placeholder="Name"
            name="name"
            value={values.name}
            onBlur={handleBlur}
            onChange={handleChange}
          />
          <Input
            placeholder="Email"
            name="email"
            value={values.email}
            onBlur={handleBlur}
            onChange={handleChange}
          />
          <Input
            placeholder="birthday"
            name="birthday"
            value={values.birthday}
            onBlur={handleBlur}
            onChange={handleChange}
          />
          <Input
            placeholder="Phone"
            name="phone"
            value={values.phone}
            onBlur={handleBlur}
            onChange={handleChange}
          />
          <Input
            placeholder="Gender"
            name="gender"
            value={values.gender}
            onBlur={handleBlur}
            onChange={handleChange}
          />
          <Button type="primary" htmlType="submit">
            Subscribe
          </Button>
        </form>
      )}
    </Formik>
  );
};

export default ProfileEdit;
