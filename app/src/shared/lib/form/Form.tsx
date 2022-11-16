import { assoc, isEmpty, isNil, map } from 'ramda';
import { FormEvent, lazy, LazyExoticComponent, useEffect, useState } from 'react';
import { useContextSelector } from 'use-context-selector';

import { RecordObject, AnyValue } from '../../../models';
import { makeMatch, setupText, sortScenarioKeys } from '../../../tools';
import { lazyLoad } from '../render.tools';
import { FormContext, FormInternalContext, FormItemContext } from './contexts';
import { FormItem, FormSection, FormTypes, SectionFormItem } from './models';
import { Buttons, DateInput, Number, Selector, Text } from './renders';
import { TEXT } from './text';
import {
  buildForm,
  buildInitialRequired,
  buildInitialValidation,
  getAllEnteredDataIsValid,
  getAllRequiredAreValid,
} from './tools';

const RENDERS = makeMatch(
  {
    [FormTypes.NUMBER]: Number,
    [FormTypes.TEXT]: Text,
    [FormTypes.DATE]: DateInput,
    [FormTypes.SELECTOR]: Selector,
  },
  () => null,
);

const TXT = setupText(TEXT)(['form']);

export default function Form() {
  const [scenario, submitForm, submitData, initial, components] = useContextSelector(FormContext, c => [
    c.scenario,
    c.submitForm,
    c.submitData,
    c.initial,
    c.components,
  ]);

  const [data, setData] = useState<RecordObject<AnyValue>>({ ...initial });

  const [validated, setValidated] = useState<RecordObject<boolean>>(buildInitialValidation(scenario));

  const [required, setRequired] = useState<RecordObject<boolean>>(buildInitialRequired(scenario));

  const [formValuesValid, setFormValuesValid] = useState(false);

  const [requiredFields, setRequiredFields] = useState(false);

  const [statuses, setStatuses] = useState<RecordObject<boolean>>({ 'submit-disabled': true });

  // check if all fields validated
  useEffect(() => {
    setFormValuesValid(Object.values(validated).every(Boolean));
  }, [validated]);

  // check if all required fields are filled
  useEffect(() => {
    setRequiredFields(Object.values(required).every(Boolean));
  }, [required]);

  // if initial state provided - update statuses
  function validateAndUpdateRequired() {
    // eslint-disable-next-line no-console
    console.log(initial)
    if (!initial || isEmpty(initial)) return;

    Object.keys(initial).forEach(key => {
      if (!isNil(initial[key])) {
        setRequired(state => assoc(key, true, state));
        setValidated(state => assoc(key, true, state));
      }
    });
  }
  useEffect(() => {
    validateAndUpdateRequired();
  }, [initial]);

  // enable/disable form submission
  useEffect(() => {
    const checkRequired = getAllRequiredAreValid(required, validated);

    const checkEntered = getAllEnteredDataIsValid(data, validated);

    // allow submission if all required added and all entered are validated
    if (checkRequired && checkEntered) setStatuses(assoc('submit-disabled', false, statuses));
    else setStatuses(assoc('submit-disabled', true, statuses));
  }, [formValuesValid, requiredFields, validated]);

  if (!submitData && !submitForm) throw new Error(TXT('missingFuncs'));

  // handlers
  function handleValidated(element: string) {
    return function call(status: boolean) {
      // eslint-disable-next-line no-console
      console.log(element, status);
      setValidated(state => assoc(element, status, state));
    };
  }

  function handleChange(key: string) {
    return function call(value: AnyValue) {
      setData({ ...data, [key]: value });

      // if required, update the list of entered required fields
      if (!(key in required)) return;

      if (value !== undefined && !required[key]) setRequired(state => ({ ...state, [key]: true }));
      else if (value === undefined && required[key]) setRequired(state => ({ ...state, [key]: false }));
    };
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (submitData) return submitData(data);

    const form = await buildForm(scenario, e);

    if (submitForm) submitForm(form);
  }

  function selectComponent(dataId: string, type: FormTypes) {
    if (type !== FormTypes.CUSTOM) return lazyLoad(RENDERS[type]);

    if (!components || !(dataId in components)) return <div id={dataId} />;

    return components[dataId]();
  }

  // renders
  function renderFormInputs(item: FormItem | SectionFormItem) {
    const { dataId, type } = item;

    return (
      <div style={{ padding: '1rem 0', ...scenario._form?.inputLineStyle }}>
        <FormItemContext.Provider
          key={dataId}
          value={{
            item,
            onChange: handleChange(dataId),
            onValidation: handleValidated(dataId),
            isValidated: validated[dataId],
            value: data[dataId],
          }}
        >
          {selectComponent(dataId, type)}
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
      <FormInternalContext.Provider value={{ statuses }}>
        {map(renderItems, Object.keys(sortScenarioKeys(scenario.items)))}
        <Buttons />
      </FormInternalContext.Provider>
    </form>
  );
}
