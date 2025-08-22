import { Field, Formik } from 'formik';
import { FilterType } from '../../redux/usersReduser';
import React from 'react';


type PropsType = {
    onFilterChanged: (filter: FilterType) => void
}
type FormType = {
    term: string
    friend: 'true' | 'false' | 'null'
}
const UsersSearchForm: React.FC<PropsType> = React.memo((props) => {
  const submit = (values: FormType, { setSubmitting} :{setSubmitting:(isSubmitting:boolean) => void}) => {
    const filter: FilterType = {
        term: values.term,
        friend: values.friend ==='null' ? null : values.friend ==='true' ? true : false

    }
        props.onFilterChanged(filter)
        setSubmitting(false)
       }
  return(
    <div><Formik
       initialValues={{ term: '', friend: 'null'}}
       validate={values => {
         const errors = {};
       }}
       onSubmit={submit}
     >
       {({
         values,
         errors,
         touched,
         handleChange,
         handleBlur,
         handleSubmit,
         isSubmitting,
         /* and other goodies */
       }) => (
         <form onSubmit={handleSubmit}>
            <Field name="text" as="select">
            <option value="null">All</option>
            <option value="true">Only followed</option>
            <option value="false">Only unfollowed</option>
            </Field>
           <input
             type="text"
             name="term"
             onChange={handleChange}
             onBlur={handleBlur}
             value={values.term}
           />
           {errors.term && touched.term && errors.term}
           <button type="submit" disabled={isSubmitting}>
             Find
           </button>
         </form>
       )}
     </Formik></div>
  )
})
export default UsersSearchForm