'use client';

import TextArea from '@/components/atoms/textArea';
import * as Yup from 'yup';
import { Shape } from '@/utils/schemaYupTs';
import { FormikErrors, useFormik } from 'formik';
import ButtonOutlined from '@/components/atoms/buttonOutlined';
import { useEffect, useState } from 'react';

const schema = Yup.object<Shape<NewQuestionFormData>>({
  text: Yup.string().required(),
  answer: Yup.string().required(),
});

export default function AddQuestionForm({ submitEvent, declineEvent }: AddQuestionFormProps) {
  const [wasSubmitAttempt, setWasSubmitAttempt] = useState(false);
  const [formErrors, setFormErrors] = useState<string[]>([]);

  const formik = useFormik({
    initialValues: {
      text: '',
      answer: '',
    },
    validationSchema: schema,
    onSubmit: async (values: NewQuestionFormData, { resetForm }) => {
      submitEvent(values);
      resetForm();
    },
  });

  const { dirty, values, handleChange, handleSubmit, validateForm, isValid, setFieldValue, errors, resetForm } = formik;

  useEffect(() => {
    if (dirty && wasSubmitAttempt) {
      setFormErrors(Object.values(errors));
    }
  }, [errors, dirty, wasSubmitAttempt]);

  function handleSave() {
    validateForm().then((error: FormikErrors<NewQuestionFormData>) => {
      setWasSubmitAttempt(true);
      if (!isValid || !dirty) {
        setFormErrors(Object.values(error));
      } else {
        handleSubmit();
      }
    });
  }

  function handleDecline() {
    resetForm();
    declineEvent();
  }

  return (
    <div className='mt-4 drop-shadow-lg rounded-md bg-white p-4 flex flex-col space-y-4'>
      <TextArea
        placeholder='Question'
        changeEvent={handleChange}
        value={values.text}
        id='text'
        styles='h-fit w-full'
      />
      <TextArea
        placeholder='Answer'
        changeEvent={handleChange}
        value={values.answer}
        id='answer'
        styles='h-fit w-full'
      />
      {!!formErrors.length && (
        <div>
          <span className='text-red-600 text-sm'>{formErrors.join(', ')}</span>
        </div>
      )}
      <div className='flex flex-row space-x-4 flex justify-end'>
        <ButtonOutlined
          text='Save'
          clickEvent={handleSave}
          isDisabled={wasSubmitAttempt && !!formErrors.length}
        />
        <ButtonOutlined
          text='Decline'
          clickEvent={handleDecline}
        />
      </div>
    </div>
  );
}

type AddQuestionFormProps = {
  submitEvent: (values: NewQuestionFormData) => void;
  declineEvent: () => void;
};
