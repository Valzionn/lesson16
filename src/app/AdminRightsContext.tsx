import { createContext, useState, useContext } from "react";

type AdminRightsProviderProps = {
    children: React.ReactNode
}

type AdminRightContextType = {
    canDelete: boolean
    toggleCanDelete: () => void
}

export const AdminRightContext = createContext<AdminRightContextType | undefined>(undefined)

export const AdminRightsProvider: React.FC<AdminRightsProviderProps> = ({ children }) => {
    const [canDelete, setCanDelete] = useState(false)

    const toggleCanDelete = () => {
        setCanDelete((prevCanDelete) => !prevCanDelete) 
    }

    return (
        <AdminRightContext.Provider value={{ canDelete, toggleCanDelete }}>
            {children}
        </AdminRightContext.Provider>
    )
}