import { assoc, map, path } from 'ramda';
import { FormEvent, useEffect, useState } from 'react';
import { useContextSelector } from 'use-context-selector';
import { Result, success, failure } from '../../../entities';
import { RecordObject, AnyValue } from '../../../models';
import { makeMatch, makeString, setupText, sortScenarioKeys } from '../../../tools';
import { lazyLoad } from '../render.tools';
import { FormContext, FormItemContext } from './contexts';
import { FormItem, FormSection, FormTypes, SectionFormItem } from './models';
import { Buttons, DateInput, Number, Text } from './renders';
import { TEXT } from './text';

const RENDERS = makeMatch(
  {
    [FormTypes.NUMBER]: Number,
    [FormTypes.TEXT]: Text,
    [FormTypes.DATE]: DateInput,
    // [FormTypes.PASSWORD]: FormInput,
  },
  () => null,
);

const TXT = setupText(TEXT)(['form']);

const STRING = makeString('Form');

export default function Form() {
  const [scenario, submit, onError] = useContextSelector(FormContext, c => [c.scenario, c.submit, c.onError]);

  const [data, setData] = useState<RecordObject<AnyValue>>({});

  const [validatedElements, setValidatedElements] = useState<RecordObject<boolean>>({});

  useEffect(() => {
    return () => {
      setData({});
    };
  }, []);

  function handleValidated(element: string) {
    return function call(status: boolean) {
      if (validatedElements[element] !== status) setValidatedElements(assoc(element, status, validatedElements));
    };
  }

  // function checkIfRequiredValidated(form: FormData): Result<string> {
  //   const result: string[] = [];

  //   const requiredEntries = Object.entries(scenario.items).filter(([_, value]) => Boolean(value.isRequired));

  //   requiredEntries.forEach(([key]) => {
  //     // if (scenario.items[key].type === FormTypes.DROPZONE) return;

  //     const formValue = form.get(key);

  //     if (!formValue) result.push(STRING(TXT('missingValue'), [key]));
  //   });

  //   if (!result.length) return success('OK');

  //   return failure(result.join('. '));
  // }

  // function checkIfValidated() {
  //   const validatedKeys = Object.keys(validatedElements);

  //   const itemsKeys = Object.entries(scenario.items)
  //     .filter(([_, value]) => !!value.validation)
  //     .map(([key]) => key);

  //   const result: string[] = [];

  //   itemsKeys.forEach(key => {
  //     // if (scenario.items[key].type === FormTypes.DROPZONE) return;

  //     if (!validatedKeys.includes(key)) result.push(STRING(TXT('keyIsNotValid'), [key]));
  //   });

  //   if (!result.length) return success('OK');

  //   return failure(result.join('. '));
  // }

  // function addFilesToFormData(form: FormData, dataKey: string): FormData {
  //   const newForm = form;

  //   const files = data[dataKey];

  //   newForm.set(`${dataKey}[]`, files[0]);

  //   for (const file of files.slice(1)) {
  //     newForm.append(`${dataKey}[]`, file);
  //   }

  //   return newForm;
  // }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    // let form = new FormData();

    // for await (const key of Object.keys(scenario.items)) {
    // const isFiles = scenario.items[key].type === FormTypes.DROPZONE;

    // if (isFiles) form = addFilesToFormData(form, key);
    // else form.set(key, path(['target', 'elements', key, 'value'], e) as string);
    // }

    // const requiredCheckResult = checkIfRequiredValidated(form);

    // if (!requiredCheckResult.isOK) {
    //   onError && onError(requiredCheckResult.message);
    //   return;
    // }

    // const validatedCheckResult = checkIfValidated();

    // if (!validatedCheckResult.isOK) {
    //   onError && onError(validatedCheckResult.message);
    //   return;
    // }

    // submit(form);
  }

  function handleChange(key: string) {
    return function call(value: AnyValue) {
      // eslint-disable-next-line no-console
      console.log(key, value);

      setData({ ...data, [key]: value });
    };
  }

  function renderFormInputs(item: FormItem | SectionFormItem) {
    const { dataId } = item;

    return (
      <div style={{ padding: '1rem 0' }}>
        <FormItemContext.Provider
          key={item.dataId}
          value={{
            item,
            onChange: handleChange(dataId),
            onValidation: handleValidated(dataId),
            isValidated: validatedElements[dataId],
          }}
        >
          {lazyLoad(RENDERS[item.type])}
        </FormItemContext.Provider>
      </div>
    );
  }

  function renderSectionItem(items: RecordObject<SectionFormItem>) {
    return function render(key: string) {
      return renderFormInputs(items[key]);
    };
  }

  function renderSection(sectionKey: string) {
    const section = scenario.items[sectionKey] as FormSection;

    return (
      <div id={`form-section-${sectionKey}`} style={section.style}>
        {map(renderSectionItem(section.items), Object.keys(section.items))}
      </div>
    );
  }

  function renderItems(key: string) {
    const maybeSection = scenario.items[key];

    if ('items' in maybeSection) return renderSection(key);

    return renderFormInputs(maybeSection);
  }

  return (
    <form onSubmit={handleSubmit} style={scenario._form?.style}>
      {map(renderItems, Object.keys(sortScenarioKeys(scenario.items)))}
      <Buttons />
    </form>
  );
}
