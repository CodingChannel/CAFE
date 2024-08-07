import { v4 as uuidv4 } from 'uuid';

export interface CafeDto {
  id?: string; // Optional ID, will be generated if not provided
  name: string;
  description: string;
  employees: number;
  logo?: string; // Optional logo path
  location: string;
}

export const createCafe = (cafeData: Omit<CafeDto, 'id'>): CafeDto => ({
  ...cafeData,
  id: uuidv4(),
});
export const updateCafe = (cafe: CafeDto, updateData: CafeDto): CafeDto => ({
    ...cafe,
    ...updateData,
  });