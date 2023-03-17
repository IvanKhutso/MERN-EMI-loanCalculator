const interestRate = 10 / 100 / 12; 
const paymentPeriod = 18;

function calculateEMI(loanAmount, interestRate, paymentPeriod) {
  const r = 1 + interestRate;
  const n = paymentPeriod;
  const p = loanAmount;

  return p * interestRate * Math.pow(r, n) / (Math.pow(r, n) - 1);
}

export const takeLoan = async (req, res) => {
  const { userId, balance } = req.body;

  // Simulate retrieving loans for a user
  const loans = [{ balance: 0 }];

  if (loans.length === 0 || loans[0].balance <= 0) {
    const emiCal = calculateEMI(balance, interestRate, paymentPeriod);

    const newInstallment = {
      emi: emiCal.toFixed(3),
    };

    const newLoan = {
      userId,
      balance,
      installments: newInstallment,
    };

    return res.status(201).json({ message: 'Loan taken successfully', loan: newLoan });
  }

  return res.status(400).json({ msg: 'You have an outstanding balance on your previous loan' });
};

export const viewLoan = async (req, res) => {
  try {
    const { userId } = req.query;
    const installments = [
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
    ];
    res.status(200).json(installments);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const makePayments = async (req, res) => {
  try {
    const { userId } = req.body;
    const loans = [{
      balance: 15000, installments: [{ emi: 2000, payments: 2, }, { emi: 2000, payments: 3, }, { emi: 2000, payments: 4, },],
    },
    ];

    const openingBalance = loans[0].balance;
    const emi = loans[0].installments[0].emi;

    const interestRate = 0.1;
    const interest = openingBalance * interestRate;
    const principal = emi - interest;
    const closingBalance = openingBalance - principal;
    const installmentCount = loans[0].installments.length;
    const payments = loans[0].installments[installmentCount - 1].payments;

    const newInstallment = {
      emi,
      payments: payments + 1,
      interest: interest.toFixed(3),
      principal: principal.toFixed(3),
      closing: closingBalance.toFixed(3),
    };

    if (newInstallment.payments < 19) {
      loans[0].installments.push(newInstallment);
      const instalment = loans[0].installments;
      return res.status(200).json(newInstallment);
    }
    res.status(400).json({
      msg: "outstanding balance beyond the time frame agreed",
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

