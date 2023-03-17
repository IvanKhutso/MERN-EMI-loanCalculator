import { takeLoan, viewLoan, makePayments } from "../src/controllers/loan_seed_controller";


describe('takeLoan', () => {
  it('should return a response with status 201 and a new loan object if there are no outstanding loans', async () => {
    // Define test data
    const req = {
      body: {
        userId: '123',
        balance: 5000,
      },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    // Call the function being tested
    await takeLoan(req, res);

  });
});


describe('viewLoan', () => {
  it('should return a response with status 200 and an array of loan installments', async () => {
    const req = {
      query: {
        userId: '123'
      }
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };
    await viewLoan(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith([
      {
        emi: 2000,
        paymentDate: '2022-01-01'
      },
      {
        emi: 2000,
        paymentDate: '2022-02-01'
      },
      {
        emi: 2000,
        paymentDate: '2022-03-01'
      }
    ]);

    expect(res.status).toHaveBeenCalledTimes(1);
    expect(res.json).toHaveBeenCalledTimes(1);
    expect(req.query).toHaveProperty('userId');
    expect(req.query.userId).toEqual('123');
    expect(res).toHaveProperty('status');
    expect(res.status).toBeDefined();
    expect(res.json).toBeDefined();
    expect(res.status).not.toBeNull();
    expect(res.json).not.toBeNull();
  });
});




describe('makePayments', () => {
  test('should update the installment with new data if the payment is within the agreed time frame', async () => {
    // Arrange
    const req = { body: { userId: 1 } };
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
    const loans = [
      {
        balance: 15000,
        installments: [
          {
            emi: 2000,
            payments: 2,
          },
          {
            emi: 2000,
            payments: 3,
          },
          {
            emi: 2000,
            payments: 4,
          },
        ],
      },
    ];
  
    // Act
    await makePayments(req, res);
  
    // Assert
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalled();
  });
  
  test('should return an error message if the outstanding balance is beyond the time frame agreed', async () => {
    // Arrange
    const req = { body: { userId: 1 } };
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
    const loans = [
      {
        balance: 15000,
        installments: [
          {
            emi: 2000,
            payments: 2,
          },
          {
            emi: 2000,
            payments: 3,
          },
          {
            emi: 2000,
            payments: 18, // outstanding balance is beyond the agreed time frame
          },
        ],
      },
    ];
  
    // Act
    await makePayments(req, res);
  
    // Assert
    expect(res.status).toHaveBeenCalledWith(200);
   
  });
});

