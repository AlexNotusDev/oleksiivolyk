import { FormikErrors, useFormik } from 'formik';
import * as Yup from 'yup';
import { useEffect, useState } from 'react';
import { Shape } from '@/utils/schemaYupTs';
import Input from '@/components/atoms/input';
import Dropzone from '@/components/atoms/imgDropzone';
import ButtonOutlined from '@/components/atoms/buttonOutlined';
import { LayoutStyle } from '@/utils/constants';
import { NewSkillFormData } from '@/models/skill';

const schema = Yup.object<Shape<NewSkillFormData>>({
  title: Yup.string().required(),
  img: Yup.string().required(),
  frequencyInMonths: Yup.number().min(1).max(6).required(),
});

const DEFAULT_FREQUENCY = 2;

export default function AddSkillForm({ saveEvent }: AddSkillFormProps) {
  const [isShowFrom, setIsShowForm] = useState<boolean>(false);
  const [wasSubmitAttempt, setWasSubmitAttempt] = useState(false);
  const [formErrors, setFormErrors] = useState<string[]>([]);

  const formik = useFormik({
    initialValues: {
      title: '',
      img: '',
      frequencyInMonths: DEFAULT_FREQUENCY,
    },
    validationSchema: schema,
    onSubmit: async (values: NewSkillFormData, { resetForm }) => {
      saveEvent(values);
      setIsShowForm(false);
      resetForm();
    },
  });

  const { dirty, values, handleChange, handleSubmit, validateForm, isValid, setFieldValue, errors, resetForm } = formik;

  useEffect(() => {
    if (dirty && wasSubmitAttempt) {
      setFormErrors(Object.values(errors));
    }
  }, [errors, dirty, wasSubmitAttempt]);

  function handleAddSkillClick() {
    setIsShowForm(true);
  }

  function handleDeclineClick() {
    setIsShowForm(false);
    resetForm();
  }

  function handleImageChange(image: string) {
    setFieldValue('img', image);
  }

  function handleInputChange(value: string) {
    setFieldValue('title', value);
  }

  function handleSubmitClick() {
    validateForm().then((error: FormikErrors<NewSkillFormData>) => {
      setWasSubmitAttempt(true);
      if (!isValid || !dirty) {
        setFormErrors(Object.values(error));
      } else {
        handleSubmit();
      }
    });
  }

  return (
    <div className='w-full flex justify-center mb-4'>
      {isShowFrom ? (
        <div className='p-4 drop-shadow-md rounded-md bg-white flex flex-col'>
          <div className='flex flex-row'>
            <Dropzone
              imageChangeEvent={handleImageChange}
              image={values.img}
              wrapperStyles='h-20 w-20'
              changeButtonStyle='mt-8 ml-0 text-sm'
              resizeParams={{ height: 100, width: 100 }}
            />
            <div className='ml-4 space-y-4'>
              <Input
                placeholder='Title'
                changeEvent={handleInputChange}
                value={values.title}
                style={LayoutStyle.PARTICLE}
              />
              <div>
                Repeat every
                <input
                  className='inline-block mx-2 border-gray-500 border-1 p-1 rounded-md'
                  type='number'
                  name='frequencyInMonths'
                  min='1'
                  max='6'
                  value={values.frequencyInMonths}
                  onChange={handleChange}
                />
                month
              </div>
            </div>
          </div>
          <div className='flex flex-row mt-4 space-x-2 justify-end'>
            <div className='max-w-[150px]'>
              {!!formErrors.length && (
                <div>
                  <span className='text-red-600 text-sm'>{formErrors.join(', ')}</span>
                </div>
              )}
            </div>
            <div className='flex flex-row mt-4 space-x-2 justify-end'>
              <ButtonOutlined
                text='Save'
                clickEvent={handleSubmitClick}
                isDisabled={wasSubmitAttempt && !!formErrors.length}
              />
              <ButtonOutlined
                text='Decline'
                clickEvent={handleDeclineClick}
              />
            </div>
          </div>
        </div>
      ) : (
        <button
          className='outline-none block bg-white h-8 rounded-md px-2 text-gray-900 drop-shadow-lg'
          onClick={handleAddSkillClick}
        >
          Add skill
        </button>
      )}
    </div>
  );
}

type AddSkillFormProps = {
  saveEvent: (skill: NewSkillFormData) => void;
};
