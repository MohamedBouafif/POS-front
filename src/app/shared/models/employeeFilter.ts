import { PaginationFilter } from './paginationFilter';

export class EmployeeFilter extends PaginationFilter {
  constructor(
    public page: number = 1,
    public pageSize: number = 10,
    public name_substr: string | undefined = undefined
  ) {
    super(page, pageSize);
  }
}