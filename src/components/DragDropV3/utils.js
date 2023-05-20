export const getDragInfo = (sourceIndex, targetIndex, index) => {
  const isActive =
    (sourceIndex < targetIndex &&
      index <= targetIndex &&
      sourceIndex <= index) ||
    (sourceIndex > targetIndex && targetIndex <= index && sourceIndex >= index);
  return {
    active: isActive,
    directionMultiplier: sourceIndex < targetIndex ? -1 : 1,
    storedIndex: isActive
      ? index + (sourceIndex < targetIndex ? -1 : 1)
      : index,
  };
};
