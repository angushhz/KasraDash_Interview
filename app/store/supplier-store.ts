
import { create } from 'zustand';

export type Supplier = {
  id: string;
  name: string;
  email: string;
  status: 'pending' | 'approved' | 'rejected';
  submittedAt: Date;
};

type SupplierStore = {
  suppliers: Supplier[];
  addSupplier: (supplier: Supplier) => void;
  approveSupplier: (id: string) => void;
  rejectSupplier: (id: string) => void;
};

// Generate 20 mock suppliers
const generateMockSuppliers = () => {
  const mockSuppliers: Supplier[] = [];
  const companyTypes = ['Tech', 'Office', 'Manufacturing', 'Retail', 'Food'];
  const companyNames = ['Solutions', 'Enterprises', 'Industries', 'Services', 'Group'];

  for (let i = 1; i <= 20; i++) {
    const companyType = companyTypes[Math.floor(Math.random() * companyTypes.length)];
    const companyName = companyNames[Math.floor(Math.random() * companyNames.length)];
    mockSuppliers.push({
      id: `supplier-${i}`,
      name: `${companyType} ${companyName} ${i}`,
      email: `contact@${companyType.toLowerCase()}${i}.com`,
      status: 'pending',
      submittedAt: new Date(Date.now() - Math.floor(Math.random() * 30) * 24 * 60 * 60 * 1000),
    });
  }
  return mockSuppliers;
};

export const useSupplierStore = create<SupplierStore>((set) => ({
  suppliers: generateMockSuppliers(),
  addSupplier: (supplier) => set((state) => ({ suppliers: [...state.suppliers, supplier] })),
  approveSupplier: (id) => set((state) => ({
    suppliers: state.suppliers.map((supplier) =>
      supplier.id === id ? { ...supplier, status: 'approved' } : supplier
    ),
  })),
  rejectSupplier: (id) => set((state) => ({
    suppliers: state.suppliers.map((supplier) =>
      supplier.id === id ? { ...supplier, status: 'rejected' } : supplier
    ),
  })),
}));