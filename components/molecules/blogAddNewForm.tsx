'use client';

import { useFormik } from 'formik';
import * as Yup from 'yup';
import Input from '@/components/atoms/input';
import TextArea from '@/components/atoms/textArea';
import Dropzone from '@/components/atoms/imgDropzone';
import ButtonOutlined from '@/components/atoms/buttonOutlined';
import { useEffect, useState } from 'react';
import { BlogCategory, NEW_BLOG_BODY_LS_KEY, NEW_BLOG_HEADER_LS_KEY } from '@/utils/constants';
import { BlogHeader } from '@/components/organisms/newBlogInterface';
import ButtonOption from '@/components/atoms/buttonOptions';

const schema = Yup.object().shape({
  img: Yup.string().required(),
  title: Yup.string().min(10).required(),
  description: Yup.string().required(),
  category: Yup.string().oneOf([BlogCategory.LIFE, BlogCategory.TECH]).required(),
});

export default function BlogHeaderForm({ cancelEvent, submitEvent }: BlogHeaderForm) {
  const [invalidSubmitAttempt, setInvalidSubmitAttempt] = useState<boolean>(false);
  const [isSaveState, setIsSaveState] = useState<boolean>(true);

  const storedValues = localStorage.getItem(NEW_BLOG_HEADER_LS_KEY);
  const formik = useFormik({
    initialValues: storedValues
      ? JSON.parse(storedValues)
      : {
          schema: '',
          title: '',
          description: '',
          category: '',
        },
    validationSchema: schema,
    onSubmit: async (values) => {
      submitEvent(values);
    },
  });

  const { dirty, values, handleChange, handleSubmit, validateForm, isValid, setFieldValue } = formik;

  useEffect(() => {
    if (isValid && dirty) {
      setInvalidSubmitAttempt(false);
    }

    return () => {
      if (isSaveState) {
        localStorage.setItem(NEW_BLOG_HEADER_LS_KEY, JSON.stringify(values));
      } else {
        localStorage.removeItem(NEW_BLOG_HEADER_LS_KEY);
        localStorage.removeItem(NEW_BLOG_BODY_LS_KEY);
      }
    };
  }, [isValid, dirty, isSaveState, values]);

  function handleSubmitClick(e: any) {
    validateForm().then(() => {
      if (!isValid || (!dirty && !storedValues)) {
        setInvalidSubmitAttempt(true);
      } else {
        handleSubmit(e);
      }
    });
  }

  function handleDeclineClick() {
    setIsSaveState(false);
    cancelEvent();
  }

  function handleImageChange(image: string) {
    setFieldValue('img', image);
  }

  function handleChangeCategory(value: string) {
    setFieldValue('category', value);
  }

  return (
    <div className='bg-white rounded-md mb-4 drop-shadow-md p-4 mx-2'>
      <div className='flex flex-col sm:flex-row w-full sm:space-x-4 space-y-4 sm:space-y-0'>
        <Dropzone
          imageChangeEvent={handleImageChange}
          image={values.img}
        />
        <div className='w-full flex flex-col justify-between'>
          <div className='flex flex-col w-full space-y-2'>
            <Input
              placeholder='Title...'
              changeEvent={handleChange}
              value={values.title}
              id='title'
            />
            <TextArea
              placeholder='Description...'
              value={values.description}
              changeEvent={handleChange}
              id='description'
            />
            <ButtonOption
              options={[{ value: BlogCategory.LIFE }, { value: BlogCategory.TECH }]}
              value={values.category}
              changeEvent={handleChangeCategory}
              wrapperStyles='space-x-2'
              inputStyles='mr-1'
              name='category'
            />
          </div>
          <div className='w-full flex flex-row justify-between'>
            <p className={`text-red-700 ${!invalidSubmitAttempt && 'invisible'} font-light`}>Please feel all.</p>

            <div className='flex flex-row space-x-2'>
              <>
                <ButtonOutlined
                  text='Next'
                  isDisabled={invalidSubmitAttempt}
                  clickEvent={handleSubmitClick}
                />
                <ButtonOutlined
                  text='Decline'
                  clickEvent={handleDeclineClick}
                />
              </>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

type BlogHeaderForm = {
  cancelEvent: () => void;
  submitEvent: (values: BlogHeader) => void;
};
