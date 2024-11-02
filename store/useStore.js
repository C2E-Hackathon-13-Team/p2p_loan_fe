import { create } from 'zustand';
// import create from 'zustand/next';



const useCounterStore = create((set) => ({
    count: 0,
    increment: () => set((state) => ({ count: state.count + 1 })),
    decrement: () => set((state) => ({ count: state.count - 1 })),
    // 存储所有项目数据 表格
    tabledata: [],  
    setTableData: (newData) => (
        // console.log(newData);
        
        set((state) => ({ 
        tabledata: newData 
    }))),  
    addTableData: (...newItems) => set((state) => ({  
      tabledata: [...state.tabledata, ...newItems]  
    })),  
    // 存储单个项目账单数据 
    billData: [],  
    setBillData: (newData) => (
        set((state) => ({ 
          billData: newData 
    }))),  
    // message info
    msgType: 'info',
    setMsgType: (str) => set((state) => ({ msgType: str })),
    msgContent: 'loading',
    setMsgContent: (str) => set((state) => ({ msgContent: str })),
    msgDuration: 0.01,
    setMsgDuration: (num) => set((state) => ({ msgDuration: num })),
}));

export default useCounterStore;

