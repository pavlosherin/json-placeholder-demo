export class RouteFunctions {
  public static getAbstractPath(path: string[]): string[] {
    return ['/', ...path];
  }

  public static replaceParam(path: string[], paramName: string, value: string | number): string[] {
    return path.join('/').replace(paramName, value.toString()).split('/');
  }
}
