export function updateObjectInArray(items, itemId, objPropName, newObjProps) {
  items.map((u) => {
    if (u[objPropName] === itemId) {
      return { ...u, ...newObjProps };
    }
    return u;
  });
} // попытка сократить дублирование кода и вынести одинаковую логику в отдельные части, не получилось, надо думать
