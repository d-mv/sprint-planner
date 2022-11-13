import { assoc, compose, map, path } from 'ramda';
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
import { getAllItems, getAllScenarioDataIds } from './tools';

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

  const allItems = getAllItems(scenario);

  useEffect(() => {
    return () => {
      setData({});
    };
  }, []);

  function handleValidated(element: string) {
    return function call(status: boolean) {
      // eslint-disable-next-line no-console
      console.log(element, status);

      if (validatedElements[element] !== status) setValidatedElements(assoc(element, status, validatedElements));
    };
  }

  function checkIfRequiredValidated(form: FormData): Result<string> {
    const result: string[] = [];

    const requiredItems = allItems.filter(item => Boolean(item.isRequired));

    requiredItems.forEach(({ dataId }) => {
      const formValue = form.get(dataId);

      if (!formValue) result.push(STRING(TXT('missingValue'), [dataId]));
    });

    if (!result.length) return success('OK');

    return failure(result.join('. '));
  }

  function getAllFormScenarioDataIds(items: (FormItem | SectionFormItem)[]): string[] {
    return items.map(({ dataId }) => dataId);
  }

  function getAllFormScenarioItemsWithValidation(
    items: (FormItem | SectionFormItem)[],
  ): (FormItem | SectionFormItem)[] {
    return items.filter(item => !!item.validation);
  }

  function checkIfValidated() {
    const validatedKeys = Object.keys(validatedElements);

    const dataIds = compose(getAllFormScenarioDataIds, getAllFormScenarioItemsWithValidation)(allItems);

    const result: string[] = [];

    dataIds.forEach(dataId => {
      if (!validatedKeys.includes(dataId)) result.push(STRING(TXT('keyIsNotValid'), [dataId]));
    });

    if (!result.length) return success('OK');

    return failure(result.join('. '));
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const form = new FormData();

    for await (const dataId of getAllScenarioDataIds(scenario)) {
      const value = path(['target', 'elements', dataId, 'value'], e) as string;

      if (value !== undefined) form.set(dataId, value);
    }

    const requiredCheckResult = checkIfRequiredValidated(form);

    if (!requiredCheckResult.isOK) {
      onError && onError(requiredCheckResult.message);
      return;
    }

    const validatedCheckResult = checkIfValidated();

    if (!validatedCheckResult.isOK) {
      onError && onError(validatedCheckResult.message);
      return;
    }

    submit(form);
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
