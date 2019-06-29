type FilterFn<T> = (value: T, index: number, array: T[]) => boolean;

export default class Database<T> {
  private databaseEntries: T[] = [];

  public get entries() {
    return this.databaseEntries;
  }

  public select(filterFn: FilterFn<T>) {
    return this.databaseEntries.filter(filterFn);
  }

  public insert(data: T | T[]) {
    if (!Array.isArray(data)) {
      data = [data];
    }

    data.forEach((data) => this.databaseEntries.push(data));
  }

  public delete(filterFn: FilterFn<T>) {
    this.databaseEntries = this.databaseEntries.filter(filterFn);
  }
}
