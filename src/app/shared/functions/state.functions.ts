export class StateFunctions {
  static addIntoArray<T>(
    stateArray: T[] | undefined | null,
    item: T | T[] | undefined | null
  ): T[] | undefined | null {
    let newArray: T[] = [];
    if (stateArray) {
      newArray = [...stateArray];
    }
    if (item) {
      if (Array.isArray(item)) {
        item.forEach((i) => newArray.unshift(i));
      } else {
        newArray.unshift(item);
      }
    }
    return newArray?.length > 0 ? newArray : stateArray;
  }

  static updateOneProperty<T>(
    state: T | undefined | null,
    updatedPost: T | null
  ): T | undefined | null {
    if (state) {
      return { ...state, ...updatedPost };
    }
    return updatedPost ?? state;
  }

  /**
   * @param stateArray
   * @param updatedPost
   * @param remove
   * @todo Solve generic type hell without "any" type
   */
  static updateArrayProperties<T>(
    stateArray: T[] | undefined | null,
    updatedPost: T | null,
    remove = false
  ): T[] | undefined | null {
    if (stateArray) {
      if (remove) {
        return stateArray.filter((statePost: any) => statePost?.id !== (updatedPost as any)?.id);
      }
      return stateArray.map((statePost: any) => {
        if (statePost?.id === (updatedPost as any)?.id) {
          return updatedPost;
        }
        return statePost;
      });
    }
    return updatedPost ? [updatedPost] : stateArray;
  }
}
