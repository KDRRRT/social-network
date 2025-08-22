import { Field } from "formik";
import React from "react";
import { requiredField } from "../../../utils/validators/validators";

export function Textarea(input, meta, ...props) {
  return (
    <div>
      <textarea {...props.input} {...props} />
    </div>
  );
}
