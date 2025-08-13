export const mockDecodeFromImage = async (): Promise<string> => {
  await new Promise(r => setTimeout(r, 500));
  return 'RX-TOKEN-1234-MOCK';
};

export const mockFetchPrescription = async (token: string) => {
  await new Promise(r => setTimeout(r, 400));
  return [
    {
      id: 'rx-ibuprofen-400',
      name: 'Ibuprofen 400mg (Rx)',
      qty: 1,
      price: 4.99,
      token,
    },
    {
      id: 'rx-paracetamol-500',
      name: 'Paracetamol 500mg (Rx)',
      qty: 2,
      price: 3.49,
      token,
    },
    {
      id: 'rx-vitamin-d3',
      name: 'Vitamin D3 1000 IU (Rx)',
      qty: 1,
      price: 7.99,
      token,
    },
  ];
};
