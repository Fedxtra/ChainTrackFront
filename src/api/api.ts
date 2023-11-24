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
    'DAPP' = 'DAPP',
}

type RecurringTransaction = {
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

type UserRecurringTransaction = RecurringTransaction &{
    isActive: boolean;
    date: Date;
    lastTransactionAt: Date | null;
    notify: boolean;
    confirm: boolean;
}

type Contact = {
    isActive: boolean;
    name: string; // email | telegram
    value: string;
}

type Alert = {
    transaction: string;
    createdAt: Date;
    sentAt: Date;
    confirmedAt: Date;
}

type UserFollow = {
    follower: string;
    following: string;
    createdAt: Date;
    updatedAt: Date;
    addNew: boolean;
    except: string[];
}

type User = {
    id: string;
    walletAddress: string;
    followerCount: number;
    followingCount: number;
    recurringTransactions: string[];
    contacts: string[];
    alerts: string[];
}

type PopularUsers = User[];
type PopularRecurringTransactions = RecurringTransaction[];
type Alerts = Alert[];

// json examples
class API {
    constructor() {}

    // Read Popular RecurringTransactions and Users
    async readPopularRecurringTransactions(): Promise<PopularRecurringTransactions> {
        return [{
            address: '0x244c1844C667949c8634d933bfcD547235D87b2b',
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
            walletAddress: '0x123',
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
            walletAddress: '0x123',
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
            address: '0x123',
            isOutgoing: true,
            chain: '1',
            amount: 0,
            category: TransactionCategory.Faucet,
            date: new Date(),
            isActive: false,
            name: '',
            url: '',
            interval: 0,
            startDate: null,
            endDate: null,
            preconditions: [Preconditions.Twitter],
            lastTransactionAt: null,
            notify: false,
            confirm: false,
        }];
    }

    async createRecurringTransaction(recurringTransaction: UserRecurringTransaction): Promise<UserRecurringTransaction> {
        return recurringTransaction;
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
