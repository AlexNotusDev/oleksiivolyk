import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useEffect, useState } from 'react';
import { Shape } from '@/utils/schemaYupTs';
import Input from '@/components/atoms/input';
import Dropzone from '@/components/atoms/imgDropzone';
import ButtonOutlined from '@/components/atoms/buttonOutlined';
import { LayoutStyle } from '@/utils/constants';
import { NewSkill } from '@/models/skill';

const schema = Yup.object<Shape<NewSkill>>({
  title: Yup.string().required(),
  img: Yup.string().required(),
  frequencyInMonth: Yup.number().min(1).max(6).required(),
});

export default function AddSkillInterface({ saveEvent }: AddSkillInterfaceProps) {
  const [isShowFrom, setIsShowForm] = useState<boolean>(false);
  const [formErrors, setFormErrors] = useState<string[]>([]);

  const formik = useFormik({
    initialValues: {
      title: '',
      img: '',
      frequencyInMonth: 2,
    },
    validationSchema: schema,
    onSubmit: async (values: NewSkill) => {
      saveEvent(values);
      setIsShowForm(false);
    },
  });

  const { dirty, values, handleChange, handleSubmit, validateForm, isValid, setFieldValue, errors } = formik;

  useEffect(() => {
    if (dirty) {
      setFormErrors(Object.values(errors));
    }
  }, [errors, dirty]);

  function handleAddSkillClick() {
    setIsShowForm(true);
  }

  function handleDeclineClick() {
    setIsShowForm(false);
  }

  function handleImageChange(image: string) {
    setFieldValue('img', image);
  }

  function handleInputChange(value: string) {
    setFieldValue('title', value);
  }

  function handleSubmitClick() {
    validateForm().then((e) => {
      if (!isValid || !dirty) {
        setFormErrors(Object.values(e));
      } else {
        handleSubmit(e);
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
                  name='frequencyInMonth'
                  min='1'
                  max='6'
                  value={values.frequencyInMonth}
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

type AddSkillInterfaceProps = {
  saveEvent: (skill: NewSkill) => void;
};
