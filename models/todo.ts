interface Todo {
    id: string;
    title: string;
    description?: string;
    createdBy: string;
    completedBy?: string;
    createdAt: Date;
    completedAt?: Date;
    priority: number; 
  }
  