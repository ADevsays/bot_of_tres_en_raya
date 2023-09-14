export const hasTwoSimilarElements = (array1, array2) => {
    const intersection = array1.filter((element) => array2.includes(element));
    return intersection.length >= 2;
  };