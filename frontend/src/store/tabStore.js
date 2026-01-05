import { create } from 'zustand'

export const TabStore = create((set) => ({
    activeTab: "Dashboard",
    setActiveTab: (val) => {
        set(state => ({ activeTab: val }))
    }
}))