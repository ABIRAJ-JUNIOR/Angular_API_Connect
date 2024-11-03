
export interface Task{
    id:number,
    title:string,
    description:string,
    dueDate:string,
    priority:string,
    userId:number,
    user:User,
    checkLists:CheckList[]
  }

  export interface CheckList{
    id:number,
    name:string,
    isDone:boolean
  }


  
  export interface User{
    id:number,
    name:string,
    email:string,
    gender:string,
    phone:string,
    address?:Address,
    tasks?:Task[],
    totalTasks:number
  }
  
  export interface Address{
    addressLine1:string,
    addressLine2:string,
    city:string,
    country:string,
    userId:number,
  }


  export interface SignUp{
    fullName:string,
    email:string,
    password:string,
    role:number
  }

  
  export interface SignIn{
    email:string,
    password:string,
  }