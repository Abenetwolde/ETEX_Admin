// Define types for Mini Prizes and Grand Prizes
interface RewardItem {
    id: number;
    name: string;
    description: string;
    image_url: string;
    stock: number;
  }
  
  interface CreateRewardItemRequest {
    reward_item: {
      name: string;
      description: string;
      image_url: string;
      stock: number;
    };
  }
  
  interface UpdateMiniPrizeRequest {
    reward_item: {
      stock: number;
    };
  }