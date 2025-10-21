
export const userData = {
  name: 'John',
  email: 'john.doe@example.com',
};

export const activeChits = [
  {
    id: 'friends-group-chit',
    name: 'Friends Group Chit',
    members: 10,
    contribution: 41500,
    potValue: 415000,
    currentCycle: 8,
    totalCycles: 10,
    imageUrl: 'https://picsum.photos/seed/chit1/100/100',
  },
  {
    id: 'family-chit',
    name: 'Family Chit',
    members: 12,
    contribution: 83000,
    potValue: 996000,
    currentCycle: 5,
    totalCycles: 12,
    imageUrl: 'https://picsum.photos/seed/chit2/100/100',
  },
  {
    id: 'office-chit',
    name: 'Office Chit',
    members: 15,
    contribution: 10000,
    potValue: 150000,
    currentCycle: 10,
    totalCycles: 15,
    imageUrl: 'https://picsum.photos/seed/chit3/100/100',
  },
];

export const upcomingPayments = [
  {
    chitName: 'Friends Group Chit',
    dueDate: '20 July',
    amount: 41500,
  },
  {
    chitName: 'Family Chit',
    dueDate: '25 July',
    amount: 83000,
  },
  {
    chitName: 'Office Chit',
    dueDate: '1 Aug',
    amount: 10000,
  },
];

export const communityChits = [
  {
    id: 'community-1',
    name: 'Friends &amp; Family Chit',
    amount: 250000,
    duration: 25,
    contribution: 10000,
    admin: 'Ramesh K.',
    members: 12,
    maxMembers: 25,
  },
  {
    id: 'community-2',
    name: 'Local Savings Group',
    amount: 100000,
    duration: 20,
    contribution: 5000,
    admin: 'Suresh V.',
    members: 18,
    maxMembers: 20,
  },
];

export const chitDetailsData = {
  'samruddhi-chit': {
    name: 'Samruddhi Chit',
    status: 'Active',
    chitValue: 500000,
    monthlyInstallment: 20000,
    currentMonth: 5,
    totalMonths: 25,
    members: [
      { name: 'Srinivas P.', avatarId: 'member-1', isWinner: false },
      { name: 'Rajesh K.', avatarId: 'member-2', isWinner: true },
      { name: 'Anjali R.', avatarId: 'member-3', isWinner: false },
      { name: 'Sunita M.', avatarId: 'member-4', isWinner: false },
      { name: 'Vijay B.', avatarId: 'user-avatar', isWinner: false },
    ],
    payments: [
      {
        date: 'Jun 20, 2024',
        amount: 20000,
        status: 'Paid',
        transactionId: 'TXN123456',
      },
      {
        date: 'May 20, 2024',
        amount: 20000,
        status: 'Paid',
        transactionId: 'TXN123455',
      },
      {
        date: 'Apr 20, 2024',
        amount: 20000,
        status: 'Paid',
        transactionId: 'TXN123454',
      },
    ],
    dates: {
      nextPayment: 'Jul 20, 2024',
      nextAuction: 'Jul 22, 2024',
    },
  },
};
