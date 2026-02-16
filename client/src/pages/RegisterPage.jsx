import { Link, useNavigate } from 'react-router';
import { useRegister } from '../api/authApi.js';
import { useUserContext } from '../context/UserContext.js';

const RegisterPage = () => {
  const { register, isPending } = useRegister();
  const { userLoginHandler } = useUserContext();
  const navigate = useNavigate();

  const registerHandler = async (formData) => {
    const values = Object.fromEntries(formData)

    const confirmPassword = formData.get('repeatPassword')

    if (confirmPassword !== values.password) {
      console.log('Passwords mismatch!');
      
      return;
    }

    const authData = await register(values.firstName, values.lastName, values.email, values.password)

    console.log(authData);

    userLoginHandler(authData)

    navigate('/dashboard')
  }

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-6 text-slate-100 font-sans">
      <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-2xl p-8 shadow-2xl">
        <div className="mb-8 text-center">
          <div className="inline-block w-12 h-12 bg-linear-to-r from-teal-400 via-cyan-400 to-indigo-500 rounded-xl mb-4 shadow-[0_0_20px_rgba(20,184,166,0.3)]"></div>
          <h1 className="text-3xl font-bold bg-linear-to-r from-teal-300 to-indigo-300 bg-clip-text text-transparent">
            Join the Future
          </h1>
          <p className="text-slate-400 mt-2">Create your account to start analyzing</p>
        </div>

        <form action={registerHandler} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-400 mb-2">First Name</label>
              <input
                type="text"
                name="firstName"
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-slate-100 focus:outline-none focus:ring-2 focus:ring-teal-500/50 focus:border-teal-500 transition-all"
                placeholder="John"
                autoComplete='firstName'
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-400 mb-2">Last Name</label>
              <input
                type="text"
                name="lastName"
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-slate-100 focus:outline-none focus:ring-2 focus:ring-teal-500/50 focus:border-teal-500 transition-all"
                placeholder="Doe"
                autoComplete='lastName'
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-400 mb-2">Email Address</label>
            <input
              type="email"
              name="email"
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-slate-100 focus:outline-none focus:ring-2 focus:ring-teal-500/50 focus:border-teal-500 transition-all"
              placeholder="john@example.com"
              autoComplete='email'
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-400 mb-2">Password</label>
            <input
              type="password"
              name="password"
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-slate-100 focus:outline-none focus:ring-2 focus:ring-teal-500/50 focus:border-teal-500 transition-all"
              placeholder="••••••••"
              autoComplete='current-password'
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-400 mb-2">Repeat Password</label>
            <input
              type="password"
              name="repeatPassword"
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-slate-100 focus:outline-none focus:ring-2 focus:ring-teal-500/50 focus:border-teal-500 transition-all"
              placeholder="••••••••"
              autoComplete='repeatPassword'
              required
            />
          </div>

          <button
            type="submit"
            disabled={isPending}
            className="w-full mt-4 bg-linear-to-r from-teal-400 via-cyan-400 to-indigo-500 hover:from-teal-500 hover:via-cyan-500 hover:to-indigo-600 text-white font-semibold py-3 px-6 rounded-xl shadow-lg shadow-teal-500/20 active:scale-[0.98] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isPending ? 'Creating Account...' : 'Get Started'}
          </button>
        </form>

        <div className="mt-8 pt-6 border-t border-slate-800 text-center">
          <p className="text-slate-400">
            Already have an account?{' '}
            <Link to='/login' className="text-teal-400 hover:text-teal-300 font-medium transition-colors cursor-pointer">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
