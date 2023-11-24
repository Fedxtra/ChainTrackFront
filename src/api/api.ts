type Chain = {
    name: string;
    chainId: number;
}

enum Preconditions {
    'BrightID' = 'BrightID',
    'MainnetBalance' = 'Mainnet Balance',
    'AlchemyAccount' = 'Alchemy Account',
    'ENS' = 'ENS',
}

enum TransactionCategory {
    'Faucet' = 'Faucet',
    'Bridge' = 'Bridge',
    'DEX' = 'DEX',
    'DAPP' = 'DAPP',
}

type RecurringTransaction = {
    walletAddress: string;
    isOutgoing: boolean; // incoming or outgoing
    chain: string;
    amount: number;
    category: TransactionCategory;
    date: Date;
    confirmed: boolean;
    transactionHash: string;
    blockNumber: number;
    isActive: boolean;
    name: string;
    url: string;
    interval: number; // hours? days? cron? random?
    startDate: Date | null;
    endDate: Date| null;
    precondition: string;
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
    readPopularRecurringTransactions(): PopularRecurringTransactions {
        return [{
            walletAddress: '0x123',
            isOutgoing: true,
            chain: '1',
            amount: 0,
            category: TransactionCategory.Faucet,
            date: new Date(),
            confirmed: false,
            transactionHash: '0x123',
            blockNumber: 0,
            isActive: false,
            name: '',
            url: '',
            interval: 0,
            startDate: null,
            endDate: null,
            precondition: Preconditions.BrightID,
            lastTransactionAt: null,
            notify: false,
            confirm: false,
        }];
    }

    readPopularUsers(): PopularUsers {
        return [{
            id: '0x123',
            walletAddress: '0x123',
            followerCount: 0,
            followingCount: 0,
            recurringTransactions: [],
            contacts: [],
            alerts: [],
        }];
    }

    // CRUD for Alerts, only read and update
    readAlerts(): Alerts {
        return [{
            transaction: '0x123',
            createdAt: new Date(),
            sentAt: new Date(),
            confirmedAt: new Date(),
        }];
    }

    updateAlert(alert: Alert): Alert {
        return alert;
    }

    // CRUD for UserFollow
    readUserFollows(): UserFollow[] {
        return [{
            follower: '0x123',
            following: '0x124',
            createdAt: new Date(),
            updatedAt: new Date(),
            addNew: false,
            except: [],
        }];
    }

    updateUserFollow(userFollow: UserFollow): UserFollow {
        return userFollow;
    }

    createUserFollow(userFollow: UserFollow): UserFollow {
        return userFollow;
    }

    deleteUserFollow(userFollow: UserFollow): UserFollow {
        return userFollow;
    }

    // CRUD for User
    readUser(id: string): User {
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

    updateUser(user: User): User {
        return user;
    }

    createUser(user: User): User {
        return user;
    }

    deleteUser(user: User): User {
        return user;
    }

    // CRUD for recurring transactions
    readRecurringTransactions(): RecurringTransaction[] {
        return [{
            walletAddress: '0x123',
            isOutgoing: true,
            chain: '1',
            amount: 0,
            category: TransactionCategory.Faucet,
            date: new Date(),
            confirmed: false,
            transactionHash: '0x123',
            blockNumber: 0,
            isActive: false,
            name: '',
            url: '',
            interval: 0,
            startDate: null,
            endDate: null,
            precondition: Preconditions.BrightID,
            lastTransactionAt: null,
            notify: false,
            confirm: false,
        }];
    }

    createRecurringTransaction(recurringTransaction: RecurringTransaction): RecurringTransaction {
        return recurringTransaction;
    }

    updateRecurringTransaction(recurringTransaction: RecurringTransaction): RecurringTransaction {
        return recurringTransaction;
    }

    deleteRecurringTransaction(recurringTransaction: RecurringTransaction): RecurringTransaction {
        return recurringTransaction;
    }

    // CRUD for contacts
    createContact(contact: Contact): Contact {
        return contact;
    }

    readContacts(): Contact[] {
        return [{
            isActive: false,
            name: 'Telegram',
            value: '@nickname',
        }];
    }

    updateContact(contact: Contact): Contact {
        return contact;
    }

    deleteContact(contact: Contact): Contact {
        return contact;
    }

}
