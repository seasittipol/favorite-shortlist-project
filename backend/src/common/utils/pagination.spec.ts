import {
  getPaginationParams,
  generatePaginationMeta,
  MAX_PAGE_SIZE,
} from './pagination';

describe('Pagination Utils', () => {
  describe('getPaginationParams', () => {
    it('should return default values when no parameters provided', () => {
      const result = getPaginationParams();

      expect(result).toEqual({
        skip: 0,
        take: MAX_PAGE_SIZE,
      });
    });

    it('should return correct skip and take for valid page and pageSize', () => {
      const result = getPaginationParams(2, 10);

      expect(result).toEqual({
        skip: 10,
        take: 10,
      });
    });

    it('should cap pageSize at MAX_PAGE_SIZE', () => {
      const result = getPaginationParams(1, 200);

      expect(result).toEqual({
        skip: 0,
        take: MAX_PAGE_SIZE,
      });
    });

    it('should use MAX_PAGE_SIZE when pageSize is 0', () => {
      const result = getPaginationParams(1, 0);

      expect(result).toEqual({
        skip: 0,
        take: MAX_PAGE_SIZE,
      });
    });

    it('should use MAX_PAGE_SIZE when pageSize is negative', () => {
      const result = getPaginationParams(1, -10);

      expect(result).toEqual({
        skip: 0,
        take: MAX_PAGE_SIZE,
      });
    });

    it('should return skip 0 when page is 0', () => {
      const result = getPaginationParams(0, 10);

      expect(result).toEqual({
        skip: 0,
        take: 10,
      });
    });

    it('should return skip 0 when page is negative', () => {
      const result = getPaginationParams(-1, 10);

      expect(result).toEqual({
        skip: 0,
        take: 10,
      });
    });

    it('should calculate correct skip for page 3 with pageSize 20', () => {
      const result = getPaginationParams(3, 20);

      expect(result).toEqual({
        skip: 40,
        take: 20,
      });
    });
  });

  describe('generatePaginationMeta', () => {
    it('should return correct meta for default pagination', () => {
      const result = generatePaginationMeta(150);

      expect(result).toEqual({
        totalItems: 150,
        totalPages: 2,
        page: 1,
        pageSize: MAX_PAGE_SIZE,
      });
    });

    it('should return correct meta for custom pagination', () => {
      const result = generatePaginationMeta(50, 2, 10);

      expect(result).toEqual({
        totalItems: 50,
        totalPages: 5,
        page: 2,
        pageSize: 10,
      });
    });

    it('should cap pageSize at MAX_PAGE_SIZE', () => {
      const result = generatePaginationMeta(100, 1, 200);

      expect(result).toEqual({
        totalItems: 100,
        totalPages: 1,
        page: 1,
        pageSize: MAX_PAGE_SIZE,
      });
    });

    it('should default to page 1 when page is 0', () => {
      const result = generatePaginationMeta(50, 0, 10);

      expect(result).toEqual({
        totalItems: 50,
        totalPages: 5,
        page: 1,
        pageSize: 10,
      });
    });

    it('should default to page 1 when page is negative', () => {
      const result = generatePaginationMeta(50, -1, 10);

      expect(result).toEqual({
        totalItems: 50,
        totalPages: 5,
        page: 1,
        pageSize: 10,
      });
    });

    it('should handle zero total items', () => {
      const result = generatePaginationMeta(0, 1, 10);

      expect(result).toEqual({
        totalItems: 0,
        totalPages: 0,
        page: 1,
        pageSize: 10,
      });
    });

    it('should calculate correct totalPages with remainder', () => {
      const result = generatePaginationMeta(25, 1, 10);

      expect(result).toEqual({
        totalItems: 25,
        totalPages: 3,
        page: 1,
        pageSize: 10,
      });
    });
  });
});
