export interface VisitorStatsModel {
    totalVisitors: number;
    dailyVisits: DailyVisit[];
  }
  
  export interface DailyVisit {
    Name:string;
    Email:string;
    Date: string;
    Count: number;
  }
  
  export interface ConversationStatsModel {
    totalConversations: number;
    dailyConversations: DailyConversation[];
  }
  
  export interface DailyConversation {
    Date: string;
    Count: number;
  }