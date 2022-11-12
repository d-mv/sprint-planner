export function validationHasFailed(obj: ValidityState) {
  return !Object.values(obj).some(Boolean);
}
