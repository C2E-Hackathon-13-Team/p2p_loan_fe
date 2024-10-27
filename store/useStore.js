import { create } from 'zustand';
// import create from 'zustand/next';



const useCounterStore = create((set) => ({
    count: 0,
    increment: () => set((state) => ({ count: state.count + 1 })),
    decrement: () => set((state) => ({ count: state.count - 1 })),
    tabledata: [],  
    setTableData: (newData) => (
        // console.log(newData);
        
        set((state) => ({ 
        tabledata: newData 
    }))),  
    addTableData: (...newItems) => set((state) => ({  
      tabledata: [...state.tabledata, ...newItems]  
    })),  
}));

export default useCounterStore;

