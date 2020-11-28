export interface ProductFilter {
  sortField: string | null;
  sortFieldType: string | null;
  orderType: 'asc' | 'desc';
  globalFieldFilter: string | null;
  globalTextFilter: string | null;
}
