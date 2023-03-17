export const login = (req, res) => {
  const { email, password } = req.body;
  return res.status(200).json({ message: 'Authentication successful' });
};


export const signUp = async (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  const user = {
    firstName,
    lastName,
    email,
    password,
  };

  return res.status(200).json({
    message: 'User registered successfully',
    user,
  });
};

