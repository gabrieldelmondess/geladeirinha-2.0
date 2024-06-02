interface perfil {
    id: string;
    name: string;
    age: number;
    relationship: string;
    familyId: string; // Foreign key p/ familia 
    userId: string; // Foreign key p/ usuario 
}