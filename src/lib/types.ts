
// Based on the API responses provided by the user

export interface Facility {
  title: string;
  isProvide: boolean;
}

export interface AddOn {
  title: string;
  num: number;
  price: number;
  unit: string;
  image: string;
  _id: string;
}

export interface Room {
  _id: string;
  name: string;
  description: string;
  imageUrl: string;
  imageUrlList: string[];
  areaInfo: string;
  bedInfo: string;
  maxPeople: number;
  price: number;
  status: number;
  bedroomList: Facility[];
  bathList: Facility[];
  livingRoomList: Facility[];
  barList: Facility[];
  workSpaceList: Facility[];
  addOnsList: AddOn[];
  createdAt: string;
  updatedAt: string;
}

export interface User {
  _id: string;
  name: string;
  email: string;
  phone: string;
  birthday: string;
  address: {
    zipcode: string;
    detail: string;
  };
  id: string;
  createdAt: string;
  updatedAt: string;
  password?: string; 
}

export interface OrderData {
  roomId: string;
  checkInDate: string;
  checkOutDate: string;
  peopleNum: number;
  userInfo: {
    name: string;
    phone: string;
    email: string;
    address: {
      zipcode: string;
      detail: string;
    };
  };
  addOns?: { [key: string]: number }; // 選填
}

export interface Order {
  _id: string;
  roomId: Room;
  checkInDate: string;
  checkOutDate: string;
  peopleNum: number;
  orderUserId: string;
  status: number;
  userInfo: {
    name: string;
    phone: string;
    email: string;
    address: {
        zipcode: string;
        detail: string;
    };
  };
  addOns?: { [key: string]: number };
  createdAt: string;
  updatedAt: string;
}

export interface News {
    _id: string;
    title: string;
    description: string;
    image_url: string;
    date: string;
}

export interface Cuisine {
    _id: string;
    name: string;
    description: string;
    price: number;
    image_url: string;
}

// Generic API response structure
export interface ApiResponse<T> {
  status: boolean;
  result?: T;
  user?: T;
  data?: T;
  token?: string;
  // other potential keys
}
