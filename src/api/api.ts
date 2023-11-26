type Chain = {
  name: string;
  chainId: number;
}

enum Preconditions {
  'BrightID' = 'BrightID',
  'MainnetBalance' = 'Mainnet Balance',
  'AlchemyAccount' = 'Alchemy Account',
  'ENS' = 'ENS',
  'Twitter' = 'Twitter',
}

enum TransactionCategory {
  'Faucet' = 'Faucet',
  'Bridge' = 'Bridge',
  'DEX' = 'DEX',
  'CEX' = 'CEX',
  'DAPP' = 'DAPP',
}

export type RecurringTransaction = {
  id: string;
  address: string;
  isOutgoing: boolean; // incoming or outgoing
  chain: string;
  amount: number|null;
  category: TransactionCategory;
  name: string;
  url?: string;
  icon?: string;
  interval: number; // hours? days? cron? random?
  startDate: Date | null;
  endDate: Date| null;
  preconditions: string[];
}

// many-to-many relationship between users and recurring transactions
export type UserRecurringTransaction = {
  recurringTransactionId: string;
  userId: string;
  isActive: boolean;
  lastTransactionAt: Date | null;
  notify: boolean;
  confirm: boolean;
}

export type Transaction = Partial<UserRecurringTransaction & RecurringTransaction>;

export type Contact = {
  isActive: boolean;
  name: string; // email | telegram
  value: string;
}

export type Alert = {
  transaction: string;
  createdAt: Date;
  sentAt: Date;
  confirmedAt: Date;
}

export type User = {
  id: string;
  address: string;
  followerCount: number;
  followingCount: number;
  recurringTransactions: string[];
  contacts: string[];
  alerts: string[];
}

export type UserFollow = {
  follower: string;
  following: string;
  createdAt: Date;
  updatedAt: Date;
  addNew: boolean;
  except: string[];
}

export type PopularUsers = User[];
export type PopularRecurringTransactions = RecurringTransaction[];
export type Alerts = Alert[];

// json examples
class API {
  constructor() {}

  // Read Popular RecurringTransactions and Users
  async readPopularRecurringTransactions(): Promise<PopularRecurringTransactions> {
    return [{
      id: '1',
      address: '0x81C8fA3745Cec646C55e3dcfa5989707a7Ade03F',
      isOutgoing: false,
      chain: '1',
      amount: null,
      category: TransactionCategory.Faucet,
      name: 'TESTNET Authenticated Faucet',
      url: 'https://faucet.testnet.lukso.network/',
      interval: 24 * 60 * 60 * 1000,
      startDate: null,
      endDate: null,
      preconditions: ['Twitter']
    }];
  }

  async readPopularUsers(): Promise<PopularUsers> {
    return [{
      id: '0x123',
      address: '0x81C8fA3745Cec646C55e3dcfa5989707a7Ade03F',
      followerCount: 999,
      followingCount: 0,
      recurringTransactions: [],
      contacts: [],
      alerts: [],
    }];
  }

  // CRUD for Alerts, only read and update
  async readAlerts(): Promise<Alerts> {
    return [{
      transaction: '0x123',
      createdAt: new Date(),
      sentAt: new Date(),
      confirmedAt: new Date(),
    }];
  }

  async updateAlert(alert: Alert): Promise<Alert> {
    return alert;
  }

  // CRUD for UserFollow
  async readUserFollows(): Promise<UserFollow[]> {
    return [{
      follower: '0x123',
      following: '0x124',
      createdAt: new Date(),
      updatedAt: new Date(),
      addNew: false,
      except: [],
    }];
  }

  async updateUserFollow(userFollow: UserFollow): Promise<UserFollow> {
    return userFollow;
  }

  async createUserFollow(userFollow: UserFollow): Promise<UserFollow> {
    return userFollow;
  }

  async deleteUserFollow(userFollow: UserFollow): Promise<UserFollow> {
    return userFollow;
  }

  // CRUD for User
  async readUser(id: string): Promise<User> {
    return {
      id,
      address: '0x81C8fA3745Cec646C55e3dcfa5989707a7Ade03F',
      followerCount: 0,
      followingCount: 0,
      recurringTransactions: [],
      contacts: [],
      alerts: [],
    };
  }

  async updateUser(user: User): Promise<User> {
    return user;
  }

  async createUser(user: User): Promise<User> {
    return user;
  }

  async deleteUser(user: User): Promise<User> {
    return user;
  }

  // CRUD for recurring transactions
  async readRecurringTransactions(): Promise<UserRecurringTransaction[]> {
    return [{
      recurringTransactionId: '0x123',
      userId: '0x123',
      isActive: false,
      lastTransactionAt: null,
      notify: false,
      confirm: false,
    }];
  }

  async createRecurringTransaction(recurringTransaction: UserRecurringTransaction): Promise<UserRecurringTransaction> {
    return recurringTransaction;
  }

  async readRecurringTransaction(id: string): Promise<RecurringTransaction> {
    return {
      id,
      address: '0x81C8fA3745Cec646C55e3dcfa5989707a7Ade03F',
      isOutgoing: false,
      chain: '1',
      amount: null,
      category: TransactionCategory.Faucet,
      name: 'TESTNET Authenticated Faucet',
      url: 'https://faucet.testnet.lukso.network/',
      interval: 24 * 60 * 60 * 1000,
      startDate: null,
      endDate: null,
      preconditions: ['Twitter']
    };
  }

  async updateRecurringTransaction(recurringTransaction: UserRecurringTransaction): Promise<UserRecurringTransaction> {
    return recurringTransaction;
  }

  async deleteRecurringTransaction(recurringTransaction: UserRecurringTransaction): Promise<UserRecurringTransaction> {
    return recurringTransaction;
  }

  // CRUD for contacts
  async createContact(contact: Contact): Promise<Contact> {
    return contact;
  }

  async readContacts(): Promise<Contact[]> {
    return [{
      isActive: false,
      name: 'Telegram',
      value: '@nickname',
    }];
  }

  async updateContact(contact: Contact): Promise<Contact> {
    return contact;
  }

  async deleteContact(contact: Contact): Promise<Contact> {
    return contact;
  }

}

const apiService = new API();

export default apiService;
