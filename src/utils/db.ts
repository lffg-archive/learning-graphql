type FilterFn<T> = (value: T, index: number, array: T[]) => boolean;

export default class Database<T> {
  private databaseEntries: T[] = [];

  constructor(initialData: T[]) {
    this.databaseEntries = initialData;
  }

  public get entries() {
    return this.databaseEntries;
  }

  public select(filterFn: FilterFn<T>) {
    return this.databaseEntries.filter(filterFn);
  }

  public insert(entry: T) {
    this.databaseEntries.push(entry);
    return entry;
  }

  public delete(filterFn: FilterFn<T>) {
    this.databaseEntries = this.databaseEntries.filter(filterFn);
  }
}
